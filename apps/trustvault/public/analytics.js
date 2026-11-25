/**
 * TrustVault Zero-PII Anonymous Funnel Analytics
 * ----------------------------------------------
 * Strictly cookie-free, session-only ephemeral IDs, zero PII ever transmitted.
 * Never transmits company emails, buyer questionnaires, answers, or `#t=` URL fragments.
 */
window.TrustVaultAnalytics = (function () {
  "use strict";

  const SESSION_KEY = "trustvault_anon_sid";
  const LOCAL_METRICS_KEY = "trustvault_local_metrics_v1";
  const ENTRY_SOURCE_KEY = "trustvault_entry_source";

  let humanVerified = false;

  const ALLOWED_PROPS = new Set([
    "product",
    "preset_id",
    "tab",
    "question_count",
    "high_conf_count",
    "medium_conf_count",
    "coverage_pct",
    "export_format",
    "share_mode",
    "is_embed",
    "plan",
    "billing_cycle",
    "cta_source",
    "referrer_host",
    "viewport_class",
    "entry_source",
    "demo_mode",
    "calc_acv",
    "human_verified",
    "trigger"
  ]);

  function isLikelyBot() {
    try {
      if (typeof navigator !== "undefined" && navigator.webdriver) return true;
      const ua = typeof navigator !== "undefined" ? (navigator.userAgent || "") : "";
      if (/headless|bot|crawler|spider|preview|scanner|proofpoint|mimecast|barracuda|safelinks|lighthouse|curl|wget/i.test(ua)) {
        return true;
      }
      if (typeof window !== "undefined" && window.outerWidth === 0 && window.outerHeight === 0) {
        return true;
      }
    } catch (e) {}
    return false;
  }

  function getSessionDistinctId() {
    try {
      const existing = sessionStorage.getItem(SESSION_KEY);
      if (existing) return existing;
      let id = "";
      if (window.crypto && typeof window.crypto.randomUUID === "function") {
        id = window.crypto.randomUUID();
      } else {
        id = "anon-" + Math.random().toString(16).slice(2) + Date.now().toString(16);
      }
      sessionStorage.setItem(SESSION_KEY, id);
      return id;
    } catch (e) {
      return "anon-ephemeral";
    }
  }

  function getSafeReferrerHost() {
    try {
      if (!document.referrer) return "direct";
      const u = new URL(document.referrer);
      return u.hostname || "direct";
    } catch (e) {
      return "direct";
    }
  }

  function getViewportClass() {
    const w = window.innerWidth || 1280;
    if (w < 640) return "mobile";
    if (w < 1100) return "tablet";
    return "desktop";
  }

  function getEntrySource() {
    try {
      const params = new URLSearchParams(window.location.search || "");
      const rawRef = (params.get("ref") || "").trim().toLowerCase();
      if (/^[a-z0-9_-]{1,40}$/.test(rawRef)) {
        sessionStorage.setItem(ENTRY_SOURCE_KEY, rawRef);
        return rawRef;
      }
      return sessionStorage.getItem(ENTRY_SOURCE_KEY) || "";
    } catch (e) {
      return "";
    }
  }

  function sanitizeProps(rawProps) {
    const out = {
      product: "trustvault",
      referrer_host: getSafeReferrerHost(),
      viewport_class: getViewportClass(),
      human_verified: humanVerified
    };
    const entrySrc = getEntrySource();
    if (entrySrc) out.entry_source = entrySrc;
    if (!rawProps || typeof rawProps !== "object") return out;

    for (const key of Object.keys(rawProps)) {
      if (!ALLOWED_PROPS.has(key) || key === "product" || key === "human_verified") continue;
      const val = rawProps[key];
      if (typeof val === "string") {
        out[key] = val.slice(0, 64);
      } else if (typeof val === "number" && Number.isFinite(val)) {
        out[key] = val;
      } else if (typeof val === "boolean") {
        out[key] = val;
      }
    }
    return out;
  }

  function recordLocalAggregate(eventName) {
    try {
      const raw = localStorage.getItem(LOCAL_METRICS_KEY);
      const data = raw ? JSON.parse(raw) : { counts: {}, lastEventAt: null };
      if (!data.counts || typeof data.counts !== "object") data.counts = {};
      data.counts[eventName] = (Number(data.counts[eventName]) || 0) + 1;
      data.lastEventAt = new Date().toISOString();
      localStorage.setItem(LOCAL_METRICS_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function getLocalSummary() {
    try {
      const raw = localStorage.getItem(LOCAL_METRICS_KEY);
      return raw ? JSON.parse(raw) : { counts: {}, lastEventAt: null };
    } catch (e) {
      return { counts: {}, lastEventAt: null };
    }
  }

  function track(eventName, rawProps) {
    if (!eventName || typeof eventName !== "string") return;
    const cleanEvent = eventName.replace(/[^a-zA-Z0-9_:-]/g, "").slice(0, 64);
    if (!cleanEvent) return;

    const safeProps = sanitizeProps(rawProps);
    recordLocalAggregate(cleanEvent);

    if (isLikelyBot() && (cleanEvent === "studio_loaded" || cleanEvent === "client_demo_opened")) {
      return;
    }

    try {
      const cfg = window.TRUSTVAULT_CONFIG && window.TRUSTVAULT_CONFIG.ANALYTICS;
      const apiKey = cfg && typeof cfg.POSTHOG_PROJECT_KEY === "string" ? cfg.POSTHOG_PROJECT_KEY.trim() : "";
      if (!apiKey || !apiKey.startsWith("phc_")) return;

      const rawHost = (cfg.POSTHOG_HOST || "https://us.i.posthog.com").trim().replace(/\/+$/, "");
      const safeHost = /^https:\/\/[a-z0-9.-]+$/i.test(rawHost) ? rawHost : "https://us.i.posthog.com";
      const safeUrl = `${window.location.origin}${window.location.pathname}`;

      const payload = {
        api_key: apiKey,
        event: cleanEvent,
        distinct_id: getSessionDistinctId(),
        properties: {
          ...safeProps,
          $current_url: safeUrl,
          $process_person_profile: false
        },
        timestamp: new Date().toISOString()
      };

      fetch(`${safeHost}/i/v0/e/`, {
        method: "POST",
        keepalive: true,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch (e) {
      // Telemetry never interrupts user workflows.
    }
  }

  function attachHumanEngagementListener() {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    const cleanup = () => {
      window.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("touchstart", onTouchStart, true);
      window.removeEventListener("scroll", onScroll, true);
    };
    const markHuman = (trigger) => {
      if (humanVerified) return;
      humanVerified = true;
      cleanup();
      track("human_engaged", { trigger });
    };
    const onPointerDown = () => markHuman("pointerdown");
    const onKeyDown = () => markHuman("keydown");
    const onTouchStart = () => markHuman("touchstart");
    const onScroll = () => {
      if ((window.scrollY || window.pageYOffset || 0) > 120) {
        markHuman("scroll");
      }
    };
    window.addEventListener("pointerdown", onPointerDown, { passive: true, capture: true });
    window.addEventListener("keydown", onKeyDown, { passive: true, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
  }

  attachHumanEngagementListener();

  return {
    track,
    getLocalSummary
  };
})();
