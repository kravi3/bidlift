/**
 * BidLift Phase 2 Cloud Client (Zero-Dependency Supabase REST & Auth Client)
 * --------------------------------------------------------------------------
 * Uses native fetch() against Supabase REST/Auth APIs with strict CSP safety
 * (zero external third-party CDN scripts). Automatically dormant at $0/mo when
 * `BIDLIFT_CONFIG.SUPABASE.URL` and `ANON_KEY` are empty.
 */
window.BidLiftCloud = (function () {
  "use strict";

  const SESSION_STORAGE_KEY = "bidlift_supabase_session_v1";

  function getCfg() {
    const sb = window.BIDLIFT_CONFIG && window.BIDLIFT_CONFIG.SUPABASE;
    const rawUrl = sb && typeof sb.URL === "string" ? sb.URL.trim().replace(/\/+$/, "") : "";
    const rawKey = sb && typeof sb.ANON_KEY === "string" ? sb.ANON_KEY.trim() : "";
    const validUrl = /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(rawUrl) ? rawUrl : "";
    return { url: validUrl, anonKey: rawKey };
  }

  function isConfigured() {
    const { url, anonKey } = getCfg();
    return Boolean(url && anonKey);
  }

  function getSession() {
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.access_token) return null;
      if (parsed.expires_at && Date.now() / 1000 > Number(parsed.expires_at) - 30) {
        return null;
      }
      return parsed;
    } catch (e) {
      return null;
    }
  }

  function saveSession(sessionObj) {
    try {
      if (!sessionObj) {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        return;
      }
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionObj));
    } catch (e) {}
  }

  function buildHeaders(useSessionToken) {
    const { anonKey } = getCfg();
    const sess = useSessionToken ? getSession() : null;
    const bearer = sess?.access_token || anonKey;
    return {
      "apikey": anonKey,
      "Authorization": `Bearer ${bearer}`,
      "Content-Type": "application/json"
    };
  }

  async function handleAuthCallbackFromHash() {
    if (!isConfigured()) return null;
    const hash = window.location.hash || "";
    if (!hash.includes("access_token=")) return null;
    try {
      const params = new URLSearchParams(hash.replace(/^#/, ""));
      const accessToken = params.get("access_token");
      if (!accessToken) return null;
      const expiresIn = Number(params.get("expires_in")) || 3600;
      const refreshToken = params.get("refresh_token") || "";

      const { url } = getCfg();
      const userRes = await fetch(`${url}/auth/v1/user`, {
        headers: {
          "apikey": getCfg().anonKey,
          "Authorization": `Bearer ${accessToken}`
        }
      });
      const userObj = userRes.ok ? await userRes.json() : null;
      const session = {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_at: Math.floor(Date.now() / 1000) + expiresIn,
        user: userObj
      };
      saveSession(session);
      window.history.replaceState({}, "", `${window.location.pathname}${window.location.search}`);
      return session;
    } catch (e) {
      return null;
    }
  }

  async function signInMagicLink(email) {
    if (!isConfigured()) {
      throw new Error("Supabase is not configured yet in config.js.");
    }
    const cleanEmail = String(email || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      throw new Error("Please enter a valid email address.");
    }
    const { url } = getCfg();
    const redirectTo = `${window.location.origin}${window.location.pathname}`;
    const res = await fetch(`${url}/auth/v1/otp`, {
      method: "POST",
      headers: buildHeaders(false),
      body: JSON.stringify({
        email: cleanEmail,
        create_user: true,
        options: { emailRedirectTo: redirectTo }
      })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.msg || err.error_description || "Failed to send magic sign-in link.");
    }
    return true;
  }

  async function signOut() {
    saveSession(null);
  }

  async function publishCloudProposal(proposal) {
    const sess = getSession();
    if (!isConfigured() || !sess || !sess.user?.id) {
      throw new Error("Sign in with Cloud Sync first to create a tracked short link.");
    }
    const { url } = getCfg();
    const record = {
      owner_id: sess.user.id,
      trade_template: String(proposal.id || "contractor").slice(0, 60),
      quote_number: String(proposal.quoteNumber || "").slice(0, 60),
      project_title: String(proposal.projectTitle || "Service Proposal").slice(0, 160),
      client_name: String(proposal.clientName || "").slice(0, 120),
      currency: String(proposal.currency || "USD").slice(0, 8),
      payload: proposal,
      status: "sent",
      white_label: Boolean(proposal.whiteLabel)
    };
    const res = await fetch(`${url}/rest/v1/proposals`, {
      method: "POST",
      headers: {
        ...buildHeaders(true),
        "Prefer": "return=representation"
      },
      body: JSON.stringify(record)
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(`Could not publish cloud proposal (${res.status}): ${msg.slice(0, 140)}`);
    }
    const rows = await res.json();
    const created = Array.isArray(rows) ? rows[0] : rows;
    if (!created || !created.share_token) {
      throw new Error("Cloud response missing share_token.");
    }
    return created;
  }

  async function listMyCloudProposals() {
    const sess = getSession();
    if (!isConfigured() || !sess) return [];
    const { url } = getCfg();
    const res = await fetch(`${url}/rest/v1/proposals?select=id,share_token,project_title,client_name,status,view_count,last_viewed_at,updated_at&order=updated_at.desc&limit=25`, {
      headers: buildHeaders(true)
    });
    if (!res.ok) return [];
    return await res.json();
  }

  async function fetchCloudProposal(shareToken) {
    if (!isConfigured()) return null;
    const cleanToken = String(shareToken || "").trim();
    if (!/^[0-9a-f-]{20,64}$/i.test(cleanToken)) return null;
    const { url } = getCfg();
    const res = await fetch(`${url}/rest/v1/rpc/get_public_proposal`, {
      method: "POST",
      headers: buildHeaders(false),
      body: JSON.stringify({ p_share_token: cleanToken })
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.payload ? data : null;
  }

  async function submitCloudAcceptance(shareToken, rec, totals) {
    if (!isConfigured()) return null;
    const cleanToken = String(shareToken || "").trim();
    if (!/^[0-9a-f-]{20,64}$/i.test(cleanToken)) return null;
    const { url } = getCfg();
    const res = await fetch(`${url}/rest/v1/rpc/submit_proposal_acceptance`, {
      method: "POST",
      headers: buildHeaders(false),
      body: JSON.stringify({
        p_share_token: cleanToken,
        p_tier_index: Number(rec.tierIndex ?? 1),
        p_tier_name: String(rec.tierName || ""),
        p_addons: Array.isArray(rec.addons) ? rec.addons : [],
        p_subtotal: Number(totals?.subtotal ?? rec.total ?? 0),
        p_discount: Number(totals?.discountApplied ?? 0),
        p_tax: Number(totals?.taxAmount ?? 0),
        p_total: Number(rec.total ?? 0),
        p_deposit: Number(rec.depositDue ?? 0),
        p_signer_name: String(rec.signerName || ""),
        p_signer_email: String(rec.signerEmail || ""),
        p_signer_note: String(rec.note || ""),
        p_signature_data_url: String(rec.signatureDataUrl || ""),
        p_sha256_digest: String(rec.sha256Digest || ""),
        p_verification_id: String(rec.verificationId || "")
      })
    });
    if (!res.ok) return null;
    return await res.json();
  }

  async function fetchAdminMetrics() {
    const sess = getSession();
    if (!isConfigured() || !sess) {
      throw new Error("Sign in as Super Admin (bidliftco@gmail.com) first.");
    }
    const { url } = getCfg();
    const res = await fetch(`${url}/rest/v1/rpc/get_admin_platform_metrics`, {
      method: "POST",
      headers: buildHeaders(true),
      body: JSON.stringify({})
    });
    if (!res.ok) {
      throw new Error("Super Admin access required (`role = super_admin`).");
    }
    return await res.json();
  }

  return {
    isConfigured,
    getSession,
    signInMagicLink,
    signOut,
    handleAuthCallbackFromHash,
    publishCloudProposal,
    listMyCloudProposals,
    fetchCloudProposal,
    submitCloudAcceptance,
    fetchAdminMetrics
  };
})();
