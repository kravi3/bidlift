/**
 * ScopeLock Configuration, Monetization & Cookieless Telemetry
 * -----------------------------------------------------------
 * Zero-server static client architecture with Polar.sh Merchant-of-Record
 * subscription checkout and zero-PII PostHog funnel tracking.
 */
window.SCOPELOCK_CONFIG = {
  APP_NAME: "ScopeLock",
  TAGLINE: "Interactive Field & Agency Change-Order Authorization Studio",
  PRO_PRICE_MONTHLY: "$29/mo",
  PRO_PRICE_ANNUAL: "$179/yr",
  SUITE_PRICE_MONTHLY: "$39/mo",
  SUITE_PRICE_ANNUAL: "$249/yr",
  DFY_PRICE: "$499",
  PROMO_CODE: "PH30",
  PROMO_DEADLINE_LABEL: "Extended through Nov 30",
  CHECKOUT_PRO_MONTHLY_LINK: "https://buy.polar.sh/polar_cl_vw3jh8FmH5R6IeLTQ7khlYnbDDQhgIj8MWagM1i6Qs2",
  CHECKOUT_PRO_ANNUAL_LINK: "https://buy.polar.sh/polar_cl_U9tev0C5eYeEdWFRPemJUpwr92JTP76GYL3q52Wg1vz",
  CHECKOUT_SUITE_MONTHLY_LINK: "https://buy.polar.sh/polar_cl_DRpXrTa6Futy9tmH6RK960bo0u2f1TV3Z1noS2VrQQb",
  CHECKOUT_SUITE_ANNUAL_LINK: "https://buy.polar.sh/polar_cl_yX5SEsSkbr2d2S1u5SbhLPuyF8N8A51b6tjp5249JZf",
  CHECKOUT_DFY_LINK: "https://buy.polar.sh/polar_cl_Tb8GUmag934FNppZOitBxA4GAVet6qCjjyMhV0E647j",
  SUPPORT_EMAIL: "bidliftco@gmail.com",
  LICENSE_PREFIX: "SL-PRO-",
  CROSS_LINKS: {
    BIDLIFT_URL: "https://bidlift-5ias.onrender.com/",
    TRUSTVAULT_URL: "https://trustvault-zdof.onrender.com/"
  },
  ANALYTICS: {
    PROVIDER: "posthog",
    POSTHOG_PROJECT_KEY: "phc_oLaVNBcBBDBxGZUSsgLdDbpbSoXSPikzyuMFZY6MoRGD",
    POSTHOG_HOST: "https://us.i.posthog.com"
  },
  CURRENCIES: {
    USD: { code: "USD", symbol: "$", label: "USD ($)" },
    EUR: { code: "EUR", symbol: "€", label: "EUR (€)" },
    GBP: { code: "GBP", symbol: "£", label: "GBP (£)" },
    CAD: { code: "CAD", symbol: "CA$", label: "CAD (CA$)" },
    AUD: { code: "AUD", symbol: "A$", label: "AUD (A$)" }
  },
  STORAGE_KEYS: {
    DRAFTS: "scopelock_drafts_v1",
    CURRENT: "scopelock_current_v1",
    THEME: "scopelock_theme_v1",
    PRO_LICENSE: "scopelock_pro_v1",
    ANON_SID: "scopelock_anon_sid",
    ENTRY_SOURCE: "scopelock_entry_source",
    LOCAL_METRICS: "scopelock_local_metrics_v1"
  }
};

window.ScopeLockTelemetry = (function () {
  "use strict";

  const ALLOWED_PROPS = new Set([
    "product",
    "template_id",
    "reason_code",
    "plan",
    "method",
    "viewport_class",
    "referrer_host",
    "entry_source",
    "photo_count",
    "has_payment_link",
    "quick_co_used",
    "schedule_delta_days",
    "is_demo"
  ]);

  function getKeys() {
    return (window.SCOPELOCK_CONFIG && window.SCOPELOCK_CONFIG.STORAGE_KEYS) || {};
  }

  function getSessionDistinctId() {
    const sidKey = getKeys().ANON_SID || "scopelock_anon_sid";
    try {
      const existing = sessionStorage.getItem(sidKey);
      if (existing) return existing;
      let id = "";
      if (window.crypto && typeof window.crypto.randomUUID === "function") {
        id = window.crypto.randomUUID();
      } else {
        id = "anon-" + Math.random().toString(16).slice(2) + Date.now().toString(16);
      }
      sessionStorage.setItem(sidKey, id);
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
    const srcKey = getKeys().ENTRY_SOURCE || "scopelock_entry_source";
    try {
      const params = new URLSearchParams(window.location.search || "");
      const rawRef = (params.get("ref") || "").trim().toLowerCase();
      if (/^[a-z0-9_-]{1,40}$/.test(rawRef)) {
        sessionStorage.setItem(srcKey, rawRef);
        return rawRef;
      }
      return sessionStorage.getItem(srcKey) || "";
    } catch (e) {
      return "";
    }
  }

  function sanitizeProps(rawProps) {
    const out = {
      product: "scopelock",
      referrer_host: getSafeReferrerHost(),
      viewport_class: getViewportClass()
    };
    const entrySrc = getEntrySource();
    if (entrySrc) out.entry_source = entrySrc;
    if (!rawProps || typeof rawProps !== "object") return out;

    for (const key of Object.keys(rawProps)) {
      if (!ALLOWED_PROPS.has(key)) continue;
      const val = rawProps[key];
      if (typeof val === "string") {
        out[key] = val.slice(0, 64);
      } else if (typeof val === "number" && Number.isFinite(val)) {
        out[key] = val;
      } else if (typeof val === "boolean") {
        out[key] = val;
      }
    }
    out.product = "scopelock";
    return out;
  }

  function recordLocalAggregate(eventName) {
    const mKey = getKeys().LOCAL_METRICS || "scopelock_local_metrics_v1";
    try {
      const raw = localStorage.getItem(mKey);
      const data = raw ? JSON.parse(raw) : { counts: {}, lastEventAt: null };
      if (!data.counts || typeof data.counts !== "object") data.counts = {};
      data.counts[eventName] = (Number(data.counts[eventName]) || 0) + 1;
      data.lastEventAt = new Date().toISOString();
      localStorage.setItem(mKey, JSON.stringify(data));
    } catch (e) {}
  }

  function track(eventName, rawProps) {
    if (!eventName || typeof eventName !== "string") return;
    const cleanEvent = eventName.replace(/[^a-zA-Z0-9_:-]/g, "").slice(0, 64);
    if (!cleanEvent) return;

    const safeProps = sanitizeProps(rawProps);
    recordLocalAggregate(cleanEvent);

    try {
      const cfg = window.SCOPELOCK_CONFIG && window.SCOPELOCK_CONFIG.ANALYTICS;
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch (e) {
      // Never block UI if telemetry is filtered.
    }
  }

  return {
    track,
    getEntrySource
  };
})();
