/**
 * BidLift Phase 2: Instant Contractor Alert Edge Function (Supabase / Deno + Resend Free Tier)
 * ------------------------------------------------------------------------------------------
 *Triggered via Supabase Database Webhook on `public.proposal_events` INSERT
 * (events: `client_quote_viewed`, `proposal_signed`).
 *
 * Uses Resend ($0/mo free tier: 3,000 emails/month) so contractors receive instant
 * notifications the moment a buyer opens or signs a quote — turning Pro into a must-have.
 *
 * Deploy via:
 *   supabase functions deploy notify-proposal-event --no-verify-jwt
 * Required Secrets:
 *   NOTIFY_WEBHOOK_SECRET, RESEND_API_KEY, RESEND_FROM_EMAIL, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, BIDLIFT_APP_URL
 */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

function timingSafeEqualStr(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}

function escapeHtml(str: string): string {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const expectedSecret = Deno.env.get("NOTIFY_WEBHOOK_SECRET") ?? "";
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? auth.slice(7).trim() : "";

  if (!expectedSecret || !token || !timingSafeEqualStr(token, expectedSecret)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const resendKey = Deno.env.get("RESEND_API_KEY") ?? "";
  const fromEmail = Deno.env.get("RESEND_FROM_EMAIL") || "BidLift Alerts <alerts@bidlift.co>";
  const appBaseUrl = (Deno.env.get("BIDLIFT_APP_URL") || "https://bidlift-5ias.onrender.com/").replace(/\/+$/, "/");

  if (!supabaseUrl || !serviceRoleKey || !resendKey) {
    return new Response(JSON.stringify({ skipped: "missing_env" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  const webhook = await req.json();
  const record = webhook?.record ?? webhook ?? {};
  const eventName = String(record.event_name || "");
  const proposalId = String(record.proposal_id || "");
  const ownerId = String(record.owner_id || "");
  const meta = (record.meta && typeof record.meta === "object") ? record.meta : {};

  if (!proposalId || !ownerId || (eventName !== "client_quote_viewed" && eventName !== "proposal_signed")) {
    return new Response(JSON.stringify({ ignored: true, eventName }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const [{ data: owner }, { data: proposal }] = await Promise.all([
    supabase.from("profiles").select("email, business_name, plan").eq("id", ownerId).maybeSingle(),
    supabase.from("proposals").select("share_token, project_title, client_name, quote_number, view_count, currency").eq("id", proposalId).maybeSingle()
  ]);

  if (!owner?.email || !proposal) {
    return new Response(JSON.stringify({ skipped: "owner_or_proposal_not_found" }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  const shareUrl = `${appBaseUrl}#p=${encodeURIComponent(proposal.share_token)}`;
  const clientLabel = proposal.client_name || "Your client";
  const projLabel = proposal.project_title || "Proposal";
  const isSigned = eventName === "proposal_signed";

  const subject = isSigned
    ? `SIGNED: ${clientLabel} approved "${projLabel}"!`
    : `Viewed (${proposal.view_count || 1}x): ${clientLabel} opened "${projLabel}"`;

  const html = isSigned
    ? `
      <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0f172a;border:1px solid #e2e8f0;border-radius:12px;">
        <h2 style="margin:0 0 8px;color:#059669;">Proposal Signed &amp; Locked</h2>
        <p style="margin:0 0 14px;color:#475569;"><strong>${escapeHtml(clientLabel)}</strong> just electronically signed <strong>${escapeHtml(projLabel)}</strong>.</p>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px;font-size:14px;">
          <div><strong>Approved Total:</strong> ${escapeHtml(String(proposal.currency || "USD"))} ${escapeHtml(String(meta.total ?? "—"))}</div>
          ${proposal.quote_number ? `<div><strong>Quote Ref:</strong> ${escapeHtml(proposal.quote_number)}</div>` : ""}
        </div>
        <p style="margin:18px 0 0;"><a href="${escapeHtml(shareUrl)}" style="display:inline-block;background:#0f294a;color:#ffffff;padding:10px 16px;border-radius:8px;text-decoration:none;font-weight:700;">Open Proposal →</a></p>
      </div>
    `
    : `
      <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0f172a;border:1px solid #e2e8f0;border-radius:12px;">
        <h2 style="margin:0 0 8px;color:#0f294a;">Client Opened Your Proposal</h2>
        <p style="margin:0 0 14px;color:#475569;"><strong>${escapeHtml(clientLabel)}</strong> just viewed <strong>${escapeHtml(projLabel)}</strong> (total views: <strong>${Number(proposal.view_count || 1)}</strong>).</p>
        <p style="margin:0 0 14px;font-size:13px;color:#64748b;">Pro tip: a quick friendly check-in text within 15 minutes doubles your close rate.</p>
        <p style="margin:0;"><a href="${escapeHtml(shareUrl)}" style="display:inline-block;background:#0f294a;color:#ffffff;padding:10px 16px;border-radius:8px;text-decoration:none;font-weight:700;">View Live Link →</a></p>
      </div>
    `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${resendKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [owner.email],
      subject,
      html
    })
  });

  const bodyText = await res.text();
  return new Response(JSON.stringify({ sent: res.ok, status: res.status, detail: bodyText.slice(0, 300) }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
});
