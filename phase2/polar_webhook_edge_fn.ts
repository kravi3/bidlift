/**
 * BidLift Phase 2: Polar.sh Webhook Handler (Supabase Edge Function / Deno)
 * ------------------------------------------------------------------------
 * Verifies Polar Standard Webhooks HMAC-SHA256 signature and keeps
 * `public.profiles.plan` + `public.proposals.white_label` in sync automatically.
 *
 * Deploy tomorrow via:
 *   supabase functions deploy polar-webhook --no-verify-jwt
 * Required Supabase Secrets:
 *   POLAR_WEBHOOK_SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const MONTHLY_PRODUCT_NAME = "BidLift Pro Monthly";
const ANNUAL_PRODUCT_NAME = "BidLift Pro Annual";

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

function decodeBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function verifyStandardWebhook(
  secret: string,
  webhookId: string,
  webhookTimestamp: string,
  signatureHeader: string,
  rawBody: string
): Promise<boolean> {
  if (!secret || !webhookId || !webhookTimestamp || !signatureHeader) return false;

  // Reject stale timestamps (>5 mins)
  const tsNum = Number(webhookTimestamp);
  if (!Number.isFinite(tsNum) || Math.abs(Math.floor(Date.now() / 1000) - tsNum) > 300) {
    return false;
  }

  const rawKey = secret.startsWith("whsec_")
    ? decodeBase64(secret.slice(6))
    : new TextEncoder().encode(secret);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    rawKey,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signedContent = `${webhookId}.${webhookTimestamp}.${rawBody}`;
  const macBuf = await crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(signedContent));
  const macBytes = new Uint8Array(macBuf);

  const signatures = signatureHeader.split(" ");
  for (const item of signatures) {
    const [version, b64Sig] = item.split(",");
    if (version === "v1" && b64Sig) {
      try {
        if (timingSafeEqual(macBytes, decodeBase64(b64Sig))) return true;
      } catch (_) {}
    }
  }
  return false;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const webhookSecret = Deno.env.get("POLAR_WEBHOOK_SECRET") ?? "";
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

  const rawBody = await req.text();
  const webhookId = req.headers.get("webhook-id") ?? "";
  const webhookTimestamp = req.headers.get("webhook-timestamp") ?? "";
  const webhookSignature = req.headers.get("webhook-signature") ?? "";

  const valid = await verifyStandardWebhook(
    webhookSecret,
    webhookId,
    webhookTimestamp,
    webhookSignature,
    rawBody
  );
  if (!valid) {
    return new Response("Invalid webhook signature", { status: 401 });
  }

  const event = JSON.parse(rawBody);
  const eventType = event?.type as string;
  const data = event?.data ?? {};
  const customerEmail = (data?.customer?.email || data?.user?.email || "").toLowerCase().trim();
  const productName = String(data?.product?.name || "");
  const interval = String(data?.product?.recurring_interval || "");

  if (!customerEmail) {
    return new Response(JSON.stringify({ ignored: "missing_email" }), { status: 200 });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  let nextPlan: "starter" | "pro_monthly" | "pro_annual" | null = null;
  if (eventType === "subscription.active" || eventType === "subscription.updated" || eventType === "order.created") {
    if (data?.status === "canceled" || data?.status === "revoked") {
      nextPlan = "starter";
    } else if (productName === ANNUAL_PRODUCT_NAME || interval === "year") {
      nextPlan = "pro_annual";
    } else if (productName === MONTHLY_PRODUCT_NAME || interval === "month") {
      nextPlan = "pro_monthly";
    }
  } else if (eventType === "subscription.revoked" || eventType === "subscription.canceled") {
    nextPlan = "starter";
  }

  if (nextPlan) {
    await supabase
      .from("profiles")
      .update({
        plan: nextPlan,
        polar_customer_id: data?.customer_id || null,
        polar_subscription_id: data?.id || null,
        updated_at: new Date().toISOString()
      })
      .eq("email", customerEmail);
  }

  return new Response(JSON.stringify({ received: true, plan: nextPlan }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
});
