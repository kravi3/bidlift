/**
 * BidLift — Interactive Revenue-Boosting Proposal Studio & Client Presentation App
 * Pure ES6+ SPA with Zero Backend Requirements & Zero-PII URL Hash Architecture.
 */
(function () {
  "use strict";

  const CONFIG = window.BIDLIFT_CONFIG || {};
  const PALETTES = window.BIDLIFT_PALETTES || {};
  const TEMPLATES = window.BIDLIFT_TEMPLATES || {};
  const CODEC = window.BidLiftCodec;
  const ANALYTICS = window.BidLiftAnalytics;
  const CLOUD = window.BidLiftCloud;
  let studioLoadTracked = false;
  let countdownIntervalId = null;

  function trackEvent(name, props) {
    try {
      if (ANALYTICS && typeof ANALYTICS.track === "function") {
        ANALYTICS.track(name, props);
      }
    } catch (e) {}
  }

  const ICONS = {
    check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    sparkle: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.8L20 10.7l-5.2 3.3 1.9 5.9L12 16.5l-4.7 3.4 1.9-5.9L4 10.7l6.1-1.9L12 3z"/></svg>`,
    share: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
    folder: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
    code: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    sun: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
    moon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
    plus: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    trash: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>`,
    print: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`,
    copy: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
    clock: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    bolt: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    shield: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    external: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
    list: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
    bookmark: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`
  };

  // Application State
  const state = {
    mode: "studio", // "studio" | "client" | "error" | "admin"
    embedMode: false,
    demoPreviewReturn: false,
    quickQuoteOpen: true,
    quickNotesText: "",
    showCompareMatrix: false,
    activeCloudToken: "",
    cloudShareUrl: "",
    cloudSession: CLOUD && typeof CLOUD.getSession === "function" ? CLOUD.getSession() : null,
    cloudProposals: [],
    adminMetrics: null,
    adminError: "",
    mobileView: "builder", // "builder" | "preview"
    activeTab: "business", // "business" | "tiers" | "addons" | "close"
    heroCollapsed: false,
    theme: "light",
    isPro: false,
    proPlanLabel: "",
    proposal: null,
    selectedTierIdx: 1,
    clientSignerName: "",
    clientSignerEmail: "",
    clientSignerNote: "",
    esignConsent: false,
    approved: false,
    approvalReceipt: null,
    signatureDataUrl: "",
    hasSignatureInk: false,
    drafts: [],
    serviceCatalog: [],
    showCatForm: false,
    editingCatIdx: -1,
    catForm: { name: "", category: "", qty: 1, unit: "job", unitPrice: 250, note: "" },
    shareUrl: "",
    shareTab: "link", // "link" | "embed"
    pendingToast: ""
  };

  // =========================================================================
  // Security Sanitizers, License Verification & SHA-256 Digest Helpers
  // =========================================================================
  function sanitizeImageSrc(src) {
    const val = String(src || "").trim();
    if (!val) return "";
    if (/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/i.test(val)) {
      return val;
    }
    try {
      const u = new URL(val);
      if (u.protocol === "https:") return u.href;
    } catch (e) {}
    return "";
  }

  function sanitizeHttpsUrl(url) {
    const val = String(url || "").trim();
    if (!val) return "";
    try {
      const u = new URL(val);
      if (u.protocol === "https:") return u.href;
    } catch (e) {}
    return "";
  }

  function sanitizeHexColor(hex) {
    const val = String(hex || "").trim();
    return /^#[0-9a-fA-F]{6}$/.test(val) ? val : "";
  }

  function computeFnv1aHex(inputStr) {
    let hash = 2166136261;
    for (let i = 0; i < inputStr.length; i++) {
      hash ^= inputStr.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16).toUpperCase().padStart(8, "0");
  }

  function verifyLicenseKey(rawKey) {
    const clean = String(rawKey || "").trim().toUpperCase();
    const match = /^BL-PRO-([A-Z0-9]{6})-([A-F0-9]{4})$/.exec(clean);
    if (!match) return false;
    const body = match[1];
    const checksum = match[2];
    const expected = computeFnv1aHex(`BIDLIFT_V1|${body}`).slice(0, 4);
    return checksum === expected;
  }

  async function computeSha256Fingerprint(payloadObj) {
    const json = JSON.stringify(payloadObj);
    if (window.crypto && window.crypto.subtle && typeof window.crypto.subtle.digest === "function") {
      try {
        const encoded = new TextEncoder().encode(json);
        const digestBuf = await window.crypto.subtle.digest("SHA-256", encoded);
        const bytes = Array.from(new Uint8Array(digestBuf));
        return bytes.map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase();
      } catch (e) {}
    }
    return `FNV-${computeFnv1aHex(json)}${computeFnv1aHex(json.split("").reverse().join(""))}`;
  }

  window.BidLiftSecurity = {
    sanitizeImageSrc,
    sanitizeHttpsUrl,
    verifyLicenseKey,
    computeSha256Fingerprint
  };

  // =========================================================================
  // Helpers & Utilities
  // =========================================================================
  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatMoney(num, currencyCode) {
    const code = currencyCode || state.proposal?.currency || "USD";
    const cur = (CONFIG.CURRENCIES && CONFIG.CURRENCIES[code]) || { symbol: "$" };
    const val = Math.round((Number(num) || 0) * 100) / 100;
    return cur.symbol + val.toLocaleString("en-US", {
      minimumFractionDigits: val % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2
    });
  }

  function darkenHex(hex, factor = 0.35) {
    const clean = (hex || "").replace("#", "");
    if (!/^[0-9a-fA-F]{6}$/.test(clean)) return "#08172b";
    const r = Math.max(0, Math.round(parseInt(clean.slice(0, 2), 16) * (1 - factor)));
    const g = Math.max(0, Math.round(parseInt(clean.slice(2, 4), 16) * (1 - factor)));
    const b = Math.max(0, Math.round(parseInt(clean.slice(4, 6), 16) * (1 - factor)));
    return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
  }

  function applyTheme(themeName) {
    state.theme = themeName === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", state.theme);
    try {
      localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, state.theme);
    } catch (e) {}
  }

  function applyBrandPalette(proposal) {
    const p = proposal || state.proposal;
    if (!p) return;
    const pal = PALETTES[p.paletteId] || PALETTES["navy-gold"];
    const custom = sanitizeHexColor(p.customBrandColor);
    const brand = custom || pal.brand;
    const brandDark = custom ? darkenHex(custom, 0.38) : pal.brandDark;
    const root = document.documentElement.style;
    root.setProperty("--brand", brand);
    root.setProperty("--brand-dark", brandDark);
    root.setProperty("--brand-soft", pal.brandSoft);
    root.setProperty("--accent", pal.accent);
  }

  function showToast(message) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span style="color:#34d399;display:inline-flex;">${ICONS.check}</span><span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(8px)";
      toast.style.transition = "all 0.2s ease";
      setTimeout(() => toast.remove(), 220);
    }, 2900);
  }

  async function copyText(text, successMsg) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        showToast(successMsg || "Copied to clipboard");
        return true;
      }
    } catch (e) {}
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast(successMsg || "Copied to clipboard");
      ta.remove();
      return true;
    } catch (err) {
      ta.remove();
      showToast("Please copy the text manually.");
      return false;
    }
  }

  function loadStorage() {
    try {
      const savedTheme = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME);
      if (savedTheme) applyTheme(savedTheme);

      state.heroCollapsed = localStorage.getItem(CONFIG.STORAGE_KEYS.HERO_COLLAPSED) === "1";

      const proRaw = localStorage.getItem(CONFIG.STORAGE_KEYS.PRO_LICENSE);
      if (proRaw) {
        const proObj = JSON.parse(proRaw);
        if (proObj && proObj.active && verifyLicenseKey(proObj.key)) {
          state.isPro = true;
          state.proPlanLabel = proObj.label || "Pro Unlocked";
        }
      }

      const draftsRaw = localStorage.getItem(CONFIG.STORAGE_KEYS.DRAFTS);
      if (draftsRaw) {
        const parsed = JSON.parse(draftsRaw);
        if (Array.isArray(parsed)) state.drafts = parsed;
      }

      const catKey = CONFIG.STORAGE_KEYS.SERVICES_CATALOG || "bidlift_services_catalog_v1";
      const catRaw = localStorage.getItem(catKey);
      if (catRaw) {
        const parsedCat = JSON.parse(catRaw);
        if (Array.isArray(parsedCat)) {
          state.serviceCatalog = parsedCat.map((item) => normalizeServiceItem(item));
        }
      }
    } catch (e) {}
  }

  function normalizeServiceItem(item, fallbackCategory) {
    const it = item && typeof item === "object" ? item : {};
    return {
      id: String(it.id || `svc-${Math.random().toString(16).slice(2, 8)}`),
      name: String(it.name || it.title || "Custom Service"),
      category: String(it.category || fallbackCategory || "Core Service"),
      qty: Math.max(0, Number(it.qty) || 1),
      unit: String(it.unit || "job"),
      unitPrice: Math.max(0, Number(it.unitPrice ?? it.price) || 0),
      note: String(it.note || it.description || "")
    };
  }

  function getLineItemTotal(item) {
    const qty = Math.max(0, Number(item?.qty) || 0);
    const rate = Math.max(0, Number(item?.unitPrice) || 0);
    return Math.round(qty * rate * 100) / 100;
  }

  function getTierItemsSubtotal(tier) {
    const items = Array.isArray(tier?.lineItems) ? tier.lineItems : [];
    return Math.round(items.reduce((sum, it) => sum + getLineItemTotal(it), 0) * 100) / 100;
  }

  function syncTierPriceFromItems(tier) {
    if (!tier || !tier.autoCalcPrice) return;
    if (Array.isArray(tier.lineItems) && tier.lineItems.length > 0) {
      tier.price = getTierItemsSubtotal(tier);
    }
  }

  function normalizeProposalServices(p) {
    if (!p || typeof p !== "object") return p;
    p.financingEnabled = Boolean(p.financingEnabled);
    p.financingMonths = Math.min(180, Math.max(3, Number(p.financingMonths) || 60));
    p.financingApr = p.financingApr === undefined ? 9.99 : Math.min(36, Math.max(0, Number(p.financingApr) || 0));
    p.financingUrl = String(p.financingUrl || "");
    if (Array.isArray(p.tiers)) {
      p.tiers = p.tiers.map((tier) => {
        const items = Array.isArray(tier.lineItems)
          ? tier.lineItems.map((it) => normalizeServiceItem(it))
          : [];
        return {
          ...tier,
          autoCalcPrice: Boolean(tier.autoCalcPrice),
          features: Array.isArray(tier.features) ? tier.features : [],
          lineItems: items
        };
      });
    }
    if (Array.isArray(p.addons)) {
      p.addons = p.addons.map((a) => ({
        ...a,
        category: String(a.category || "Upgrade"),
        qty: Math.max(1, Number(a.qty) || 1),
        unit: String(a.unit || "pkg")
      }));
    }
    return p;
  }

  function saveServiceCatalog() {
    try {
      const catKey = CONFIG.STORAGE_KEYS.SERVICES_CATALOG || "bidlift_services_catalog_v1";
      localStorage.setItem(catKey, JSON.stringify(state.serviceCatalog));
    } catch (e) {}
  }

  function saveCurrentDraftLocal() {
    if (state.mode !== "studio" || !state.proposal) return;
    try {
      localStorage.setItem(CONFIG.STORAGE_KEYS.CURRENT, JSON.stringify(state.proposal));
    } catch (e) {}
  }

  function saveDraftsList() {
    try {
      localStorage.setItem(CONFIG.STORAGE_KEYS.DRAFTS, JSON.stringify(state.drafts));
    } catch (e) {}
  }

  function createProposalFromTemplate(templateId) {
    const base = TEMPLATES[templateId] || TEMPLATES.contractor;
    const p = normalizeProposalServices(deepClone(base));
    p.createdAt = Date.now();
    p.whiteLabel = Boolean(state.isPro);
    return p;
  }

  function activateProState(validKey, planLabel) {
    const cleanKey = String(validKey).trim().toUpperCase();
    state.isPro = true;
    state.proPlanLabel = planLabel || "Pro License Active";
    if (state.proposal) state.proposal.whiteLabel = true;
    try {
      localStorage.setItem(
        CONFIG.STORAGE_KEYS.PRO_LICENSE,
        JSON.stringify({ active: true, label: state.proPlanLabel, key: cleanKey })
      );
    } catch (err) {}
    saveCurrentDraftLocal();
  }

  // =========================================================================
  // Math & Revenue-Lift Projections
  // =========================================================================
  function getVisibleTiers(p) {
    if (!p || !Array.isArray(p.tiers) || p.tiers.length === 0) return [];
    if (p.singleTierMode) {
      const idx = Math.min(Math.max(0, Number(p.recommendedTierIndex) || 0), p.tiers.length - 1);
      return [{ tier: p.tiers[idx], originalIdx: idx }];
    }
    return p.tiers.map((tier, idx) => ({ tier, originalIdx: idx }));
  }

  function calculateTotals(p) {
    const visible = getVisibleTiers(p);
    let chosenEntry = visible.find((x) => x.originalIdx === state.selectedTierIdx);
    if (!chosenEntry && visible.length > 0) {
      const fallbackIdx = Math.min(Math.max(0, Number(p.recommendedTierIndex) || 0), visible.length - 1);
      chosenEntry = visible[fallbackIdx] || visible[0];
      state.selectedTierIdx = chosenEntry.originalIdx;
    }
    const basePrice = chosenEntry ? Math.max(0, Number(chosenEntry.tier.price) || 0) : 0;
    const selectedAddons = (p.addons || []).filter((a) => a.selected);
    const addonsTotal = selectedAddons.reduce((sum, a) => sum + Math.max(0, Number(a.price) || 0), 0);
    const subtotal = Math.round((basePrice + addonsTotal) * 100) / 100;

    const rawDiscount = Math.max(0, Number(p.fastActionDiscount) || 0);
    const createdAt = Number(p.createdAt) || Date.now();
    const fastWindowMs = (Number(p.fastActionHours) || 48) * 3600 * 1000;
    const isFastEligible = rawDiscount > 0 && Date.now() - createdAt <= fastWindowMs;
    const discountApplied = isFastEligible ? Math.min(rawDiscount, Math.max(0, subtotal - 1)) : 0;

    const afterDiscount = Math.max(0, Math.round((subtotal - discountApplied) * 100) / 100);
    const taxRate = Math.min(50, Math.max(0, Number(p.taxRate) || 0));
    const taxAmount = Math.round(afterDiscount * (taxRate / 100) * 100) / 100;
    const total = Math.round((afterDiscount + taxAmount) * 100) / 100;

    const depositPct = Math.min(100, Math.max(0, Number(p.depositPercent) || 0));
    const depositDue = Math.round(total * (depositPct / 100) * 100) / 100;
    const balanceDue = Math.max(0, Math.round((total - depositDue) * 100) / 100);

    return {
      chosenTier: chosenEntry ? chosenEntry.tier : null,
      chosenTierIdx: chosenEntry ? chosenEntry.originalIdx : 0,
      basePrice,
      selectedAddons,
      addonsTotal,
      subtotal,
      isFastEligible,
      discountApplied,
      afterDiscount,
      taxRate,
      taxLabel: (p.taxLabel || "Sales Tax").trim() || "Sales Tax",
      taxAmount,
      total,
      depositPct,
      depositDue,
      balanceDue
    };
  }

  function calculateLiftMetrics(p) {
    const tiers = p.tiers || [];
    const addonsPool = (p.addons || []).reduce((s, a) => s + Math.max(0, Number(a.price) || 0), 0);
    const flatBase = Math.max(0, Number(tiers[0]?.price) || 0);

    let expectedDeal = flatBase;
    if (p.singleTierMode) {
      const idx = Math.min(Math.max(0, Number(p.recommendedTierIndex) || 0), tiers.length - 1);
      expectedDeal = (Number(tiers[idx]?.price) || flatBase) + addonsPool * 0.35;
    } else if (tiers.length >= 3) {
      const t0 = Number(tiers[0].price) || 0;
      const t1 = Number(tiers[1].price) || 0;
      const t2 = Number(tiers[2].price) || 0;
      expectedDeal = t0 * 0.25 + t1 * 0.55 + t2 * 0.20 + addonsPool * 0.35;
    } else if (tiers.length === 2) {
      expectedDeal = (Number(tiers[0].price) || 0) * 0.4 + (Number(tiers[1].price) || 0) * 0.6 + addonsPool * 0.35;
    } else {
      expectedDeal = flatBase + addonsPool * 0.35;
    }

    const liftDollar = Math.max(0, Math.round(expectedDeal - flatBase));
    const liftPct = flatBase > 0 ? Math.round((liftDollar / flatBase) * 100) : 0;

    return {
      flatBase,
      expectedDeal: Math.round(expectedDeal),
      liftDollar,
      liftPct
    };
  }

  function generateVerificationId(name, total) {
    const hex = computeFnv1aHex(`${name}|${total}|${Date.now()}`);
    return `BL-${hex.slice(0, 4)}-${hex.slice(4, 8)}`;
  }

  function getBaseStudioUrl() {
    return `${window.location.origin}${window.location.pathname}`;
  }

  function getPaymentActionLabel(provider, depositDue, total, currency) {
    const amountLabel = depositDue > 0 ? formatMoney(depositDue, currency) : formatMoney(total, currency);
    const map = {
      stripe: `Pay Deposit Now (${amountLabel})`,
      venmo: `Pay via Venmo (${amountLabel})`,
      paypal: `Pay via PayPal (${amountLabel})`,
      square: `Pay via Square (${amountLabel})`,
      zelle: `View Zelle Payment Info (${amountLabel})`
    };
    return map[provider] || `Pay Deposit Now (${amountLabel})`;
  }

  function computeMonthlyPayment(principal, months, apr) {
    const amt = Math.max(0, Number(principal) || 0);
    const term = Math.min(180, Math.max(3, Math.round(Number(months) || 60)));
    const annualRate = apr === undefined ? 9.99 : Math.min(36, Math.max(0, Number(apr) || 0));
    if (amt <= 0) return 0;
    if (annualRate <= 0) return Math.ceil(amt / term);
    const r = annualRate / 100 / 12;
    const factor = Math.pow(1 + r, term);
    return Math.ceil((amt * r * factor) / (factor - 1));
  }

  function applyFlatBudgetScaling(proposal, flatAmount) {
    const flat = Number(flatAmount);
    if (!proposal || !Array.isArray(proposal.tiers) || !Number.isFinite(flat) || flat < 100 || flat > 500000) {
      return proposal;
    }
    const baseT0 = Math.max(1, Number(proposal.tiers[0]?.price) || flat);
    const targets = [
      Math.round(flat),
      Math.round((flat * 1.28) / 10) * 10,
      Math.round((flat * 1.62) / 10) * 10
    ];
    if (targets[1] <= targets[0]) targets[1] = Math.round(flat * 1.28);
    if (targets[2] <= targets[1]) targets[2] = Math.round(flat * 1.62);
    const ratio = flat / baseT0;

    proposal.tiers.forEach((tier, tIdx) => {
      const origPrice = Math.max(1, Number(tier.price) || baseT0);
      const tierTarget = targets[tIdx] || Math.round((origPrice * ratio) / 10) * 10;
      if (Array.isArray(tier.lineItems) && tier.lineItems.length > 0) {
        const scaleFactor = tierTarget / origPrice;
        let runningSum = 0;
        tier.lineItems.forEach((it) => {
          const q = Math.max(1, Number(it.qty) || 1);
          const lineOrig = q * Math.max(0, Number(it.unitPrice) || 0);
          const scaledLine = Math.max(0, Math.round(lineOrig * scaleFactor));
          it.unitPrice = Math.round((scaledLine / q) * 100) / 100;
          runningSum += Math.round((q * it.unitPrice) * 100) / 100;
        });
        const diff = Math.round((tierTarget - runningSum) * 100) / 100;
        if (Math.abs(diff) > 0.001) {
          const unitOneItem = tier.lineItems.find((it) => (Number(it.qty) || 1) === 1);
          if (unitOneItem) {
            unitOneItem.unitPrice = Math.max(0, Math.round((unitOneItem.unitPrice + diff) * 100) / 100);
          }
        }
        tier.price = getTierItemsSubtotal(tier);
      } else {
        tier.price = tierTarget;
      }
    });
    return proposal;
  }

  function formatCountdown(msRemaining) {
    const ms = Math.max(0, Number(msRemaining) || 0);
    if (ms <= 0) return "Expired";
    const totalSec = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    const pad = (n) => String(n).padStart(2, "0");
    return `${hrs}h ${pad(mins)}m ${pad(secs)}s`;
  }

  function startCountdownTicker() {
    if (countdownIntervalId) {
      clearInterval(countdownIntervalId);
      countdownIntervalId = null;
    }
    const nodes = document.querySelectorAll(".countdown-clock[data-deadline-ms]");
    if (!nodes || nodes.length === 0) return;
    const updateAll = () => {
      document.querySelectorAll(".countdown-clock[data-deadline-ms]").forEach((el) => {
        const deadline = Number(el.dataset.deadlineMs) || 0;
        el.textContent = formatCountdown(deadline - Date.now());
      });
    };
    updateAll();
    countdownIntervalId = setInterval(updateAll, 1000);
  }

  function parseQuickQuoteNotes(rawText) {
    const text = String(rawText || "").trim();
    if (!text) return null;
    const lower = text.toLowerCase();

    const tradeRules = [
      { id: "ai_automation", re: /\b(ai agent|ai workflow|automation|zapier|make\.com|n8n|rag|llm agent)\b/i },
      { id: "ai_training", re: /\b(ai training|ai workshop|prompt|enablement|chatgpt training|ai bootcamp)\b/i },
      { id: "it_msp", re: /\b(msp|managed it|cybersecurity|endpoint|helpdesk|soc2|network security)\b/i },
      { id: "tutoring", re: /\b(tutor|tutoring|sat prep|act prep|math prep|test prep|homework)\b/i },
      { id: "coaching", re: /\b(coach|coaching|executive coach|leadership coach|career coach)\b/i },
      { id: "accounting", re: /\b(cfo|bookkeep|accounting|cpa|tax prep|quickbooks|payroll)\b/i },
      { id: "legal_consulting", re: /\b(legal|contract review|msa|redline|attorney|counsel|trademark)\b/i },
      { id: "events", re: /\b(event|conference|gala|wedding|av|uplighting|livestream|run of show)\b/i },
      { id: "hvac", re: /\b(hvac|ac|a\/c|air condition|furnace|heat pump|seer|condenser|duct|ton)\b/i },
      { id: "roofing", re: /\b(roof|roofing|shingle|gutter|skylight|squares|hail|flashing)\b/i },
      { id: "plumbing", re: /\b(plumb|plumbing|water heater|tankless|pipe|drain|sewer|valve|leak)\b/i },
      { id: "electrical", re: /\b(electric|electrical|panel|200a|breaker|ev charger|wiring|recessed|outlet)\b/i },
      { id: "landscaping", re: /\b(landscap|lawn|sod|mulch|patio|paver|irrigation|yard|tree|pergola)\b/i },
      { id: "cleaning", re: /\b(clean|cleaning|maid|deep clean|move-out|carpet|window|housekeeping)\b/i },
      { id: "agency", re: /\b(website|web design|seo|agency|marketing|funnel|landing page|retainer|google ads)\b/i },
      { id: "realestate", re: /\b(staging|mls|real estate|twilight|drone|3d tour|virtual tour)\b/i },
      { id: "media", re: /\b(photo|photography|video|shoot|reel|cinema|editorial)\b/i }
    ];
    let matchedTrade = "contractor";
    for (const rule of tradeRules) {
      if (rule.re.test(lower) && TEMPLATES[rule.id]) {
        matchedTrade = rule.id;
        break;
      }
    }

    const segments = text.split(/[,;\n]+/).map((s) => s.trim()).filter(Boolean);
    let clientName = "";
    let projectLocation = "";
    let projectTitle = "";
    let basePrice = 0;
    const parsedAddons = [];

    segments.forEach((seg, idx) => {
      const atMatch = /\bat\s+([^,;]+)$/i.exec(seg);
      if (atMatch && !projectLocation) {
        projectLocation = atMatch[1].trim().slice(0, 120);
      }

      const moneyMatch = /\$\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)/.exec(seg);
      const numVal = moneyMatch ? Number(moneyMatch[1].replace(/,/g, "")) : 0;

      if (idx === 0 && !moneyMatch && !/\bat\s+/i.test(seg)) {
        const words = seg.split(/\s+/);
        if (words.length >= 1 && words.length <= 4 && !/\b(install|repair|replace|quote|base|add)\b/i.test(seg)) {
          clientName = seg.replace(/^(client|for)[:\s]+/i, "").trim().slice(0, 100);
          return;
        }
      }

      const isExplicitAdd = /^\s*(add|plus|\+|upgrade|upsell|extra)\b/i.test(seg);
      const isBaseHint = /\b(base|package|main|total|quote|flat|install|replace)\b/i.test(seg);

      if (moneyMatch && numVal > 0) {
        if (basePrice === 0 && !isExplicitAdd && (isBaseHint || parsedAddons.length === 0) && numVal >= 100) {
          basePrice = numVal;
          const cleanedTitle = seg
            .replace(/\$\s*[0-9][0-9,]*(?:\.[0-9]{1,2})?/g, "")
            .replace(/\bat\s+[^,;]+$/i, "")
            .replace(/\b(base|quote|price)\b/gi, "")
            .replace(/^[-:\s]+|[-:\s]+$/g, "")
            .trim();
          if (cleanedTitle && !projectTitle) projectTitle = cleanedTitle;
        } else {
          const addonTitle = seg
            .replace(/\$\s*[0-9][0-9,]*(?:\.[0-9]{1,2})?/g, "")
            .replace(/^\s*(add|plus|\+|upgrade|upsell|extra)[:\s]*/i, "")
            .replace(/\s+(?:for|at)$/i, "")
            .replace(/\s{2,}/g, " ")
            .trim();
          if (addonTitle) {
            parsedAddons.push({
              id: `qq-${Date.now()}-${parsedAddons.length}`,
              title: addonTitle.replace(/\b\w/g, (c) => c.toUpperCase()).slice(0, 90),
              description: "Custom upgrade added from project notes.",
              category: "Quick Add-On",
              qty: 1,
              unit: "pkg",
              price: Math.round(numVal),
              selected: false
            });
          }
        }
      } else if (!projectTitle && seg !== clientName) {
        const cleanScope = seg.replace(/\bat\s+[^,;]+$/i, "").trim();
        if (cleanScope) projectTitle = cleanScope;
      }
    });

    if (basePrice === 0) {
      const anyPrice = /\$\s*([0-9][0-9,]{2,})/.exec(text);
      if (anyPrice) basePrice = Number(anyPrice[1].replace(/,/g, "")) || 0;
    }

    const proposal = createProposalFromTemplate(matchedTrade);
    if (clientName) proposal.clientName = clientName;
    if (projectLocation) proposal.projectLocation = projectLocation;
    if (projectTitle && projectTitle.length >= 4) {
      const cleanT = projectTitle.replace(/\b\w/g, (c) => c.toUpperCase()).slice(0, 120);
      proposal.projectTitle = /proposal|quote|install|upgrade|package/i.test(cleanT) ? cleanT : `${cleanT} Proposal`;
    }
    if (basePrice >= 100 && basePrice <= 500000) {
      applyFlatBudgetScaling(proposal, basePrice);
    }
    if (parsedAddons.length > 0) {
      proposal.addons = [...parsedAddons, ...(proposal.addons || [])].slice(0, 8);
    }
    return { proposal, tradeId: matchedTrade, basePrice, parsedAddonsCount: parsedAddons.length };
  }

  // =========================================================================
  // Render Proposal Sheet (Shared between Studio Preview & Standalone Client)
  // =========================================================================
  function renderProposalSheetHtml(p, options = {}) {
    const isClientStandalone = Boolean(options.isClientStandalone);
    const totals = calculateTotals(p);
    const visibleTiers = getVisibleTiers(p);
    const createdDate = new Date(Number(p.createdAt) || Date.now());
    const validDays = Number(p.validDays) || 7;
    const expiryDate = new Date(createdDate.getTime() + validDays * 86400000);
    const msLeft = Math.max(0, expiryDate.getTime() - Date.now());
    const daysLeft = Math.ceil(msLeft / 86400000);
    const cur = p.currency || "USD";
    const fastWindowMs = (Number(p.fastActionHours) || 48) * 3600 * 1000;
    const fastDeadlineMs = (Number(p.createdAt) || Date.now()) + fastWindowMs;

    const initials = (p.businessName || "BL")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("");

    const safeLogoSrc = sanitizeImageSrc(p.logoData);
    const logoHtml = safeLogoSrc
      ? `<img src="${escapeHtml(safeLogoSrc)}" alt="${escapeHtml(p.businessName)} logo" />`
      : `<span>${escapeHtml(initials || "BL")}</span>`;

    const trustBadges = (Array.isArray(p.trustBadges) ? p.trustBadges : [])
      .map((b) => String(b || "").trim())
      .filter(Boolean);

    const trustHtml = trustBadges.length > 0
      ? `<div class="trust-badges-bar">${trustBadges.map((b) => `<span class="trust-badge-item">${ICONS.shield}<span>${escapeHtml(b)}</span></span>`).join("")}</div>`
      : "";

    const introHtml = (p.introText || "").trim()
      ? `<div class="proposal-intro-box">${escapeHtml(p.introText)}</div>`
      : "";

    const hasAddons = (p.addons || []).length > 0;
    const itemSecNum = hasAddons ? 3 : 2;
    const closeSecNum = hasAddons ? 4 : 3;

    const badgeText = (p.recommendedBadge || "Most Popular Choice").trim() || "Most Popular Choice";
    const tiersHtml = visibleTiers
      .map(({ tier, originalIdx }) => {
        const isSelected = originalIdx === totals.chosenTierIdx;
        const isRec = !p.singleTierMode && visibleTiers.length > 1 && originalIdx === Number(p.recommendedTierIndex);
        const items = Array.isArray(tier.lineItems) ? tier.lineItems : [];
        const hasLineItems = items.length > 0;

        const featuresHtml = hasLineItems
          ? items
              .filter((it) => it && (it.name || "").trim())
              .map((it) => {
                const qtyLabel = `${Number(it.qty) || 1}${it.unit ? " " + it.unit : ""}`;
                return `
                  <li>
                    ${ICONS.check}
                    <div class="tier-service-line">
                      <div class="tier-service-head">
                        <strong>${escapeHtml(it.name)}</strong>
                        <span class="tier-item-meta">${escapeHtml(qtyLabel)}</span>
                      </div>
                      ${it.note ? `<div class="tier-service-note">${escapeHtml(it.note)}</div>` : ""}
                    </div>
                  </li>
                `;
              })
              .join("")
          : (tier.features || [])
              .filter((f) => f && f.trim())
              .map((f) => `<li>${ICONS.check}<span>${escapeHtml(f)}</span></li>`)
              .join("");

        const showMonthly = Boolean(p.financingEnabled) && Number(tier.price) > 0;
        const tierMonthly = showMonthly ? computeMonthlyPayment(tier.price, p.financingMonths, p.financingApr) : 0;

        return `
          <div class="tier-card ${isSelected ? "selected" : ""} ${isRec ? "recommended" : ""}"
               data-action="select-tier" data-tier-idx="${originalIdx}" role="button" tabindex="0">
            ${isRec ? `<div class="tier-ribbon">★ ${escapeHtml(badgeText)}</div>` : ""}
            ${visibleTiers.length > 1 ? `<div class="tier-eyebrow">Option ${originalIdx + 1}</div>` : ""}
            <div class="tier-top-row">
              <div>
                <div class="tier-name">${escapeHtml(tier.name || `Option ${originalIdx + 1}`)}</div>
                <div class="tier-subtitle">${escapeHtml(tier.subtitle || "")}</div>
              </div>
              <div class="tier-radio">${isSelected ? ICONS.check : ""}</div>
            </div>
            <div class="tier-price-row">
              <div class="tier-price">${formatMoney(tier.price, cur)}</div>
              ${tier.timeline ? `<span class="tier-timeline">${escapeHtml(tier.timeline)}</span>` : ""}
            </div>
            ${showMonthly ? `<div class="tier-monthly-pill">or est. <strong class="mono">${formatMoney(tierMonthly, cur)}/mo*</strong></div>` : ""}
            <ul class="tier-features">${featuresHtml}</ul>
            ${hasLineItems ? `<div class="tier-scope-footnote">${items.length} itemized service${items.length === 1 ? "" : "s"} • full breakdown below</div>` : ""}
            <div class="tier-select-cta">${isSelected ? "✓ Selected Package" : "Select This Option"}</div>
          </div>
        `;
      })
      .join("");

    const addonsHtml = (p.addons || [])
      .map((addon, idx) => {
        const active = Boolean(addon.selected);
        const cat = (addon.category || "").trim();
        const unitLabel = addon.unit ? `${Number(addon.qty) || 1} ${addon.unit}` : "";
        return `
          <div class="addon-card ${active ? "active" : ""}" data-action="toggle-addon" data-addon-idx="${idx}" role="button" tabindex="0">
            <div class="addon-check">${active ? ICONS.check : ""}</div>
            <div class="addon-info">
              <div class="addon-meta-tags">
                ${cat ? `<span class="addon-cat-pill">${escapeHtml(cat)}</span>` : ""}
                ${unitLabel ? `<span class="addon-unit-pill">${escapeHtml(unitLabel)}</span>` : ""}
              </div>
              <div class="addon-title">${escapeHtml(addon.title)}</div>
              ${addon.description ? `<div class="addon-desc">${escapeHtml(addon.description)}</div>` : ""}
            </div>
            <div class="addon-price">+${formatMoney(addon.price, cur)}</div>
          </div>
        `;
      })
      .join("");

    // Itemized Services Breakdown Rows (Live for Currently Selected Tier + Checked Upgrades)
    const activeTier = totals.chosenTier || {};
    const activeLineItems = Array.isArray(activeTier.lineItems) ? activeTier.lineItems.filter((it) => it && (it.name || "").trim()) : [];
    const activeLegacyFeatures = Array.isArray(activeTier.features) ? activeTier.features.filter((f) => f && f.trim()) : [];
    const itemsCalculatedSum = getTierItemsSubtotal(activeTier);
    const tierDiff = Math.round((totals.basePrice - itemsCalculatedSum) * 100) / 100;

    let coreRowsHtml = "";
    if (activeLineItems.length > 0) {
      coreRowsHtml = activeLineItems.map((it) => {
        const qtyVal = Math.max(0, Number(it.qty) || 0);
        const rateVal = Math.max(0, Number(it.unitPrice) || 0);
        const lineAmt = getLineItemTotal(it);
        const qtyText = `${qtyVal}${it.unit ? " " + it.unit : ""}`;
        return `
          <tr>
            <td data-label="Service &amp; Scope">
              <div class="itemized-svc-name">${escapeHtml(it.name)}</div>
              ${it.note ? `<div class="itemized-svc-note">${escapeHtml(it.note)}</div>` : ""}
            </td>
            <td data-label="Category"><span class="itemized-cat-pill">${escapeHtml(it.category || "Core Service")}</span></td>
            <td data-label="Qty / Unit" class="mono">${escapeHtml(qtyText)}</td>
            <td data-label="Rate" class="mono">${rateVal > 0 ? formatMoney(rateVal, cur) : "—"}</td>
            <td data-label="Amount" class="itemized-amt">${lineAmt > 0 ? `<span class="mono">${formatMoney(lineAmt, cur)}</span>` : `<span class="itemized-included-pill">Included</span>`}</td>
          </tr>
        `;
      }).join("");

      if (Math.abs(tierDiff) >= 0.01) {
        const isSavings = tierDiff < 0;
        coreRowsHtml += `
          <tr class="itemized-adjust-row ${isSavings ? "is-savings" : ""}">
            <td data-label="Service &amp; Scope">
              <div class="itemized-svc-name">${isSavings ? "Multi-Service Package Savings" : "Package Bundle Adjustment"}</div>
              <div class="itemized-svc-note">Reconciles itemized services to your fixed ${escapeHtml(activeTier.name || "package")} price</div>
            </td>
            <td data-label="Category"><span class="itemized-cat-pill">Bundle</span></td>
            <td data-label="Qty / Unit" class="mono">1 pkg</td>
            <td data-label="Rate" class="mono">—</td>
            <td data-label="Amount" class="itemized-amt mono">${isSavings ? "-" + formatMoney(Math.abs(tierDiff), cur) : "+" + formatMoney(tierDiff, cur)}</td>
          </tr>
        `;
      }
    } else {
      coreRowsHtml = `
        <tr>
          <td data-label="Service &amp; Scope">
            <div class="itemized-svc-name">${escapeHtml(activeTier.name || "Selected Package")} — Full Base Scope</div>
            ${activeTier.subtitle ? `<div class="itemized-svc-note">${escapeHtml(activeTier.subtitle)}</div>` : ""}
          </td>
          <td data-label="Category"><span class="itemized-cat-pill">Core Package</span></td>
          <td data-label="Qty / Unit" class="mono">1 pkg</td>
          <td data-label="Rate" class="mono">${formatMoney(totals.basePrice, cur)}</td>
          <td data-label="Amount" class="itemized-amt mono">${formatMoney(totals.basePrice, cur)}</td>
        </tr>
        ${activeLegacyFeatures.map((feat) => `
          <tr>
            <td data-label="Service &amp; Scope"><div class="itemized-svc-name">${escapeHtml(feat)}</div></td>
            <td data-label="Category"><span class="itemized-cat-pill">Deliverable</span></td>
            <td data-label="Qty / Unit" class="mono">1 item</td>
            <td data-label="Rate" class="mono">—</td>
            <td data-label="Amount" class="itemized-amt"><span class="itemized-included-pill">Included</span></td>
          </tr>
        `).join("")}
      `;
    }

    const upgradeRowsHtml = totals.selectedAddons.length > 0
      ? totals.selectedAddons.map((a) => `
          <tr class="itemized-upgrade-row">
            <td data-label="Service &amp; Scope">
              <div class="itemized-svc-name">+ ${escapeHtml(a.title)}</div>
              ${a.description ? `<div class="itemized-svc-note">${escapeHtml(a.description)}</div>` : ""}
            </td>
            <td data-label="Category"><span class="itemized-cat-pill accent">${escapeHtml(a.category || "Upgrade")}</span></td>
            <td data-label="Qty / Unit" class="mono">${escapeHtml(`${Number(a.qty) || 1}${a.unit ? " " + a.unit : " pkg"}`)}</td>
            <td data-label="Rate" class="mono">${formatMoney(a.price, cur)}</td>
            <td data-label="Amount" class="itemized-amt mono">+${formatMoney(a.price, cur)}</td>
          </tr>
        `).join("")
      : `
        <tr class="itemized-empty-upgrade-row">
          <td colspan="5">No optional upgrades added yet — click any upgrade card above to include it here automatically.</td>
        </tr>
      `;

    const itemizedServiceCount = activeLineItems.length || activeLegacyFeatures.length;

    let closeRightColumnHtml = "";
    if (state.approved && state.approvalReceipt) {
      const rec = state.approvalReceipt;
      const mailSubject = encodeURIComponent(`Approved Proposal${p.quoteNumber ? ` ${p.quoteNumber}` : ""}: ${p.projectTitle} (${rec.verificationId})`);
      const addonsText = rec.addons.length ? rec.addons.map((a) => `- ${a.title} (+${formatMoney(a.price, cur)})`).join("\n") : "None";
      const svcText = Array.isArray(rec.lineItems) && rec.lineItems.length
        ? `\nIncluded Services:\n${rec.lineItems.map((it) => `- ${it.name} (${it.qty} ${it.unit})`).join("\n")}\n`
        : "";
      const mailBody = encodeURIComponent(
        `Hi ${p.businessName},\n\nI have reviewed and electronically signed the proposal for "${p.projectTitle}".\n\n` +
        (p.quoteNumber ? `Quote Reference: ${p.quoteNumber}\n` : "") +
        `Selected Package: ${rec.tierName} (${formatMoney(rec.basePrice, cur)})\n` +
        svcText +
        `Selected Upgrades:\n${addonsText}\n` +
        (rec.taxAmount > 0 ? `${rec.taxLabel} (${rec.taxRate}%): ${formatMoney(rec.taxAmount, cur)}\n` : "") +
        `Total Approved: ${formatMoney(rec.total, cur)}\n` +
        (rec.depositDue > 0 ? `Deposit Due: ${formatMoney(rec.depositDue, cur)}\n` : "") +
        `\n--- ESIGN Audit Record ---\n` +
        `Signed By: ${rec.signerName}\n` +
        (rec.signerEmail ? `Signer Email: ${rec.signerEmail}\n` : "") +
        `Timestamp: ${rec.isoTimestamp}\n` +
        `Verification ID: ${rec.verificationId}\n` +
        `SHA-256 Digest: ${rec.sha256Digest}\n` +
        (rec.note ? `Client Note: ${rec.note}\n` : "")
      );
      const payLabel = getPaymentActionLabel(p.paymentProvider, rec.depositDue, rec.total, cur);
      const safePayUrl = sanitizeHttpsUrl(p.paymentLink);
      const hasZelleInfo = p.paymentProvider === "zelle" && Boolean((p.paymentLink || p.businessEmail || "").trim());

      let paymentCtaHtml = "";
      if (hasZelleInfo) {
        paymentCtaHtml = `<button type="button" class="btn btn-accent btn-lg" data-action="show-zelle-info">${ICONS.bolt} ${escapeHtml(payLabel)}</button>`;
      } else if (safePayUrl) {
        paymentCtaHtml = `<a class="btn btn-accent btn-lg" href="${escapeHtml(safePayUrl)}" target="_blank" rel="noopener noreferrer">${ICONS.bolt} ${escapeHtml(payLabel)} ${ICONS.external}</a>`;
      } else {
        paymentCtaHtml = `
          <div style="width:100%;padding:10px 12px;border-radius:8px;background:var(--bg-surface);border:1px solid var(--border-subtle);font-size:12.5px;color:var(--text-secondary);">
            Deposit invoice / payment instructions will be sent by <strong>${escapeHtml(p.businessName || "your service provider")}</strong> shortly.
          </div>
        `;
      }

      const safeSigImg = sanitizeImageSrc(rec.signatureDataUrl);
      closeRightColumnHtml = `
        <div class="approved-card">
          <div class="approved-badge">${ICONS.check} Proposal Signed &amp; Locked</div>
          <h3 style="font-size:19px;margin-bottom:4px;">Thank You, ${escapeHtml(rec.signerName)}!</h3>
          <p style="margin:0;color:var(--text-secondary);font-size:13px;">
            Your <strong>${escapeHtml(rec.tierName)}</strong> package${rec.addons.length ? ` + ${rec.addons.length} upgrade(s)` : ""} is locked at <strong class="mono">${formatMoney(rec.total, cur)}</strong>.
          </p>

          ${safeSigImg ? `<div style="margin-top:12px;"><img src="${escapeHtml(safeSigImg)}" alt="Client signature" style="max-height:54px;background:#fff;padding:4px 12px;border-radius:6px;border:1px solid #cbd5e1;" /></div>` : ""}

          <div class="audit-trail-box">
            <div class="audit-trail-title">${ICONS.shield} Electronic Acceptance Audit Trail</div>
            <div class="audit-row"><span>Verification ID</span><strong class="mono">${escapeHtml(rec.verificationId)}</strong></div>
            <div class="audit-row"><span>Signed By</span><strong>${escapeHtml(rec.signerName)}</strong></div>
            ${rec.signerEmail ? `<div class="audit-row"><span>Signer Email</span><span>${escapeHtml(rec.signerEmail)}</span></div>` : ""}
            <div class="audit-row"><span>Timestamp (UTC)</span><span class="mono">${escapeHtml(rec.isoTimestamp)}</span></div>
            <div class="audit-row"><span>ESIGN Consent</span><span style="color:var(--success);font-weight:700;">Verified Electronic Acceptance</span></div>
            <div class="audit-row">
              <span>SHA-256 Digest</span>
              <span class="mono" title="${escapeHtml(rec.sha256Digest)}">${escapeHtml(rec.sha256Digest.slice(0, 24))}…</span>
            </div>
          </div>

          <div class="approved-actions no-print">
            ${paymentCtaHtml}
            ${p.businessEmail
              ? `<a class="btn btn-primary" href="mailto:${escapeHtml(p.businessEmail)}?subject=${mailSubject}&body=${mailBody}">Send Signed Confirmation</a>`
              : ""
            }
            <button type="button" class="btn btn-outline" data-action="copy-sms-receipt">${ICONS.copy} Copy SMS Receipt</button>
            <button type="button" class="btn btn-outline" data-action="print-proposal">${ICONS.print} Download PDF</button>
            <button type="button" class="btn btn-ghost btn-sm" data-action="reset-approval">Edit Selection</button>
          </div>
        </div>
      `;
    } else {
      const signerVal = state.clientSignerName || p.clientName || "";
      closeRightColumnHtml = `
        <div class="signature-box">
          <h3 style="font-size:15px;font-weight:800;margin-bottom:4px;">Approve &amp; Lock In Pricing</h3>
          <p style="margin:0 0 12px;font-size:12px;color:var(--text-muted);">Sign below to lock your selected package, upgrades, and schedule slot.</p>
          <div class="field-grid">
            <div class="field-row-2">
              <div class="field">
                <label for="client-signer-name">Full Name (Printed) *</label>
                <input id="client-signer-name" type="text" placeholder="Your full name" value="${escapeHtml(signerVal)}" />
              </div>
              <div class="field">
                <label for="client-signer-email">Your Email (Optional)</label>
                <input id="client-signer-email" type="email" placeholder="you@email.com" value="${escapeHtml(state.clientSignerEmail)}" />
              </div>
            </div>
            <div class="field">
              <label for="client-signer-note">Preferred Start Dates / Notes (Optional)</label>
              <input id="client-signer-note" type="text" placeholder="e.g., Next Monday works great" value="${escapeHtml(state.clientSignerNote)}" />
            </div>
            <div class="field">
              <label>Signature *</label>
              <div class="sig-pad-wrap">
                <canvas id="signature-canvas" class="sig-canvas"></canvas>
                <span class="sig-placeholder" id="sig-placeholder" style="${state.hasSignatureInk ? "display:none;" : ""}">Sign here with mouse or finger</span>
                <button type="button" class="sig-clear-btn no-print" data-action="clear-signature">Clear</button>
              </div>
            </div>
            <label class="esign-consent-row">
              <input type="checkbox" id="client-esign-consent" ${state.esignConsent ? "checked" : ""} />
              <span>I consent to use electronic records and agree that my electronic signature is legally binding on this proposal.</span>
            </label>
            <button type="button" class="btn btn-primary btn-lg" style="width:100%;" data-action="approve-proposal">
              ${ICONS.check} Approve &amp; Lock Proposal (${formatMoney(totals.total, cur)})
            </button>
          </div>
        </div>
      `;
    }

    const showViralFooter = !p.whiteLabel && !state.isPro;
    const badgeRefHref = `${getBaseStudioUrl()}?ref=quote_badge&tpl=${encodeURIComponent(p.id || "contractor")}`;
    const finMonths = Math.min(180, Math.max(3, Math.round(Number(p.financingMonths) || 60)));
    const finApr = p.financingApr === undefined ? 9.99 : Math.min(36, Math.max(0, Number(p.financingApr) || 0));
    const summaryMonthly = p.financingEnabled && totals.total > 0
      ? computeMonthlyPayment(totals.total, finMonths, finApr)
      : 0;
    const safeFinUrl = sanitizeHttpsUrl(p.financingUrl);

    const compareRowsHtml = (!p.singleTierMode && visibleTiers.length > 1 && state.showCompareMatrix)
      ? `
        <div class="compare-matrix-wrap">
          <table class="compare-matrix-table">
            <thead>
              <tr>
                <th>Comparison Factor</th>
                ${visibleTiers.map(({ tier, originalIdx }) => `
                  <th class="${originalIdx === totals.chosenTierIdx ? "is-selected-col" : ""}">
                    ${escapeHtml(tier.name || `Option ${originalIdx + 1}`)}
                  </th>
                `).join("")}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Total Package Price</strong></td>
                ${visibleTiers.map(({ tier }) => `<td class="mono"><strong>${formatMoney(tier.price, cur)}</strong></td>`).join("")}
              </tr>
              <tr>
                <td>Est. Monthly Payment</td>
                ${visibleTiers.map(({ tier }) => {
                  const m = p.financingEnabled && Number(tier.price) > 0 ? computeMonthlyPayment(tier.price, finMonths, finApr) : 0;
                  return `<td class="mono">${m > 0 ? `~${formatMoney(m, cur)}/mo*` : "Lump sum / Deposit"}</td>`;
                }).join("")}
              </tr>
              <tr>
                <td>Estimated Timeline</td>
                ${visibleTiers.map(({ tier }) => `<td>${escapeHtml(tier.timeline || "TBD")}</td>`).join("")}
              </tr>
              <tr>
                <td>Included Scope Items</td>
                ${visibleTiers.map(({ tier }) => {
                  const cnt = (Array.isArray(tier.lineItems) && tier.lineItems.length) ? tier.lineItems.length : (tier.features || []).length;
                  return `<td>${cnt} itemized service${cnt === 1 ? "" : "s"}</td>`;
                }).join("")}
              </tr>
              <tr>
                <td>Best Designed For</td>
                ${visibleTiers.map(({ tier }) => `<td>${escapeHtml(tier.subtitle || "—")}</td>`).join("")}
              </tr>
              <tr>
                <td>Select Package</td>
                ${visibleTiers.map(({ originalIdx }) => `
                  <td>
                    <button type="button" class="btn btn-sm ${originalIdx === totals.chosenTierIdx ? "btn-primary" : "btn-outline"}" data-action="select-tier" data-tier-idx="${originalIdx}">
                      ${originalIdx === totals.chosenTierIdx ? "✓ Selected" : "Choose Option"}
                    </button>
                  </td>
                `).join("")}
              </tr>
            </tbody>
          </table>
        </div>
      `
      : "";

    return `
      <article class="proposal-sheet">
        <header class="proposal-hero">
          <div class="proposal-hero-top">
            <div class="proposal-biz">
              <div class="proposal-logo">${logoHtml}</div>
              <div>
                <div class="proposal-biz-name">${escapeHtml(p.businessName || "Your Business Name")}</div>
                <div class="proposal-biz-tag">${escapeHtml(p.businessTagline || "")}</div>
                ${(p.businessPhone || p.businessEmail)
                  ? `<div style="font-size:11.5px;color:rgba(255,255,255,0.72);margin-top:4px;">${[p.businessPhone, p.businessEmail].filter(Boolean).map(escapeHtml).join(" • ")}</div>`
                  : ""}
              </div>
            </div>
            <div class="proposal-status-stack">
              <div class="validity-pill">${ICONS.clock} ${daysLeft > 0 ? `Valid for ${daysLeft} day${daysLeft === 1 ? "" : "s"}` : "Quote Expiring Today"}</div>
              ${totals.isFastEligible
                ? `<div class="fast-bonus-pill">${ICONS.bolt} Fast-Action Bonus: Save ${formatMoney(totals.discountApplied, cur)} • Ends <span class="countdown-clock mono" data-deadline-ms="${fastDeadlineMs}">${formatCountdown(fastDeadlineMs - Date.now())}</span></div>`
                : ""}
            </div>
          </div>

          <div class="proposal-meta-bar">
            <div class="meta-cell">
              <span>Prepared For</span>
              <strong>${escapeHtml(p.clientName || "Valued Client")}</strong>
            </div>
            <div class="meta-cell">
              <span>Project Scope</span>
              <strong>${escapeHtml(p.projectTitle || "Service Proposal")}</strong>
            </div>
            <div class="meta-cell">
              <span>Location / Reference</span>
              <strong>${escapeHtml([p.projectLocation, p.quoteNumber].filter(Boolean).join(" • ") || "On-Site / Remote")}</strong>
            </div>
            <div class="meta-cell">
              <span>Proposal Date</span>
              <strong>${createdDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</strong>
            </div>
          </div>
        </header>

        ${trustHtml}

        <div class="buyer-nav-strip no-print" aria-label="Proposal Sections">
          <div class="buyer-nav-pills">
            <button type="button" class="buyer-nav-pill" data-action="scroll-to-section" data-target="sec-packages">1. Packages</button>
            ${hasAddons ? `<button type="button" class="buyer-nav-pill" data-action="scroll-to-section" data-target="sec-upgrades">2. Upgrades</button>` : ""}
            <button type="button" class="buyer-nav-pill" data-action="scroll-to-section" data-target="sec-itemization">${itemSecNum}. Itemized Scope</button>
            <button type="button" class="buyer-nav-pill" data-action="scroll-to-section" data-target="sec-signoff">${closeSecNum}. Sign &amp; Approve</button>
          </div>
          <div class="buyer-live-pill">
            <span><strong>${escapeHtml(totals.chosenTier?.name || "")}</strong>${totals.selectedAddons.length ? ` • +${totals.selectedAddons.length} upgrade${totals.selectedAddons.length === 1 ? "" : "s"}` : ""}</span>
            <strong class="mono buyer-live-total">${formatMoney(totals.total, cur)}</strong>
          </div>
        </div>

        ${introHtml}

        <section class="proposal-section" id="sec-packages">
          <div class="section-heading">
            <div>
              <h2>1. Choose Your Package</h2>
              <p>${visibleTiers.length === 1 ? "Customized scope prepared specifically for your project." : "Compare options below—click any package to update your live quote &amp; itemized scope."}</p>
            </div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
              ${visibleTiers.length > 1 ? `<button type="button" class="btn btn-outline btn-sm no-print" data-action="toggle-compare-matrix">${ICONS.list} ${state.showCompareMatrix ? "Hide Comparison" : "Compare All 3 Tiers"}</button>` : ""}
              ${!isClientStandalone ? `<span class="badge-count" style="border-radius:8px;padding:4px 10px;height:auto;">Interactive Preview</span>` : ""}
            </div>
          </div>
          <div class="tiers-grid ${visibleTiers.length === 1 ? "single-tier" : ""}">
            ${tiersHtml}
          </div>
          ${compareRowsHtml}
        </section>

        ${hasAddons ? `
          <section class="proposal-section" id="sec-upgrades">
            <div class="section-heading">
              <div>
                <h2>2. Customize With Optional Upgrades</h2>
                <p>Click any add-on below to include it in your itemized quote automatically.</p>
              </div>
              ${totals.selectedAddons.length > 0
                ? `<span class="selection-summary-pill">${totals.selectedAddons.length} Selected (+${formatMoney(totals.addonsTotal, cur)})</span>`
                : `<span class="selection-muted-pill">Optional Enhancements</span>`}
            </div>
            <div class="addons-grid">
              ${addonsHtml}
            </div>
          </section>
        ` : ""}

        <section class="proposal-section" id="sec-itemization">
          <div class="section-heading">
            <div>
              <h2>${itemSecNum}. Detailed Services &amp; Itemized Breakdown</h2>
              <p>Complete line-by-line scope for your selected <strong>${escapeHtml(activeTier.name || "package")}</strong>${totals.selectedAddons.length ? ` plus ${totals.selectedAddons.length} selected upgrade${totals.selectedAddons.length === 1 ? "" : "s"}` : ""}.</p>
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
              <span class="itemized-tier-badge">${ICONS.list} ${itemizedServiceCount} Service Item${itemizedServiceCount === 1 ? "" : "s"}</span>
              ${activeTier.timeline ? `<span class="tier-timeline">ETA: ${escapeHtml(activeTier.timeline)}</span>` : ""}
            </div>
          </div>

          <div class="itemized-card">
            <table class="itemized-table">
              <thead>
                <tr>
                  <th>Service &amp; Scope</th>
                  <th>Category</th>
                  <th>Qty / Unit</th>
                  <th>Rate</th>
                  <th style="text-align:right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr class="itemized-group-row">
                  <td colspan="4">Included Scope — ${escapeHtml(activeTier.name || "Package")}</td>
                  <td class="mono" style="text-align:right;">${formatMoney(totals.basePrice, cur)}</td>
                </tr>
                ${coreRowsHtml}
                <tr class="itemized-group-row">
                  <td colspan="4">Optional Upgrades Selected (${totals.selectedAddons.length})</td>
                  <td class="mono" style="text-align:right;">${totals.addonsTotal > 0 ? "+" + formatMoney(totals.addonsTotal, cur) : formatMoney(0, cur)}</td>
                </tr>
                ${upgradeRowsHtml}
              </tbody>
            </table>

            <div class="itemized-totals-bar">
              <div class="itemized-total-chip">
                <span>Package Scope</span>
                <strong class="mono">${formatMoney(totals.basePrice, cur)}</strong>
              </div>
              ${totals.addonsTotal > 0 ? `
                <div class="itemized-total-chip">
                  <span>Upgrades (${totals.selectedAddons.length})</span>
                  <strong class="mono">+${formatMoney(totals.addonsTotal, cur)}</strong>
                </div>
              ` : ""}
              ${totals.discountApplied > 0 ? `
                <div class="itemized-total-chip is-discount">
                  <span>Fast-Action Bonus</span>
                  <strong class="mono">-${formatMoney(totals.discountApplied, cur)}</strong>
                </div>
              ` : ""}
              ${totals.taxAmount > 0 ? `
                <div class="itemized-total-chip">
                  <span>${escapeHtml(totals.taxLabel)} (${totals.taxRate}%)</span>
                  <strong class="mono">+${formatMoney(totals.taxAmount, cur)}</strong>
                </div>
              ` : ""}
              <div class="itemized-total-chip is-grand">
                <span>Total Investment</span>
                <strong class="mono">${formatMoney(totals.total, cur)}</strong>
              </div>
              ${totals.depositPct > 0 ? `
                <div class="itemized-total-chip is-deposit">
                  <span>Deposit (${totals.depositPct}%)</span>
                  <strong class="mono">${formatMoney(totals.depositDue, cur)}</strong>
                </div>
              ` : ""}
            </div>
          </div>
        </section>

        <section class="proposal-section" id="sec-signoff" style="border-bottom:none;">
          <div class="section-heading">
            <div>
              <h2>${closeSecNum}. Investment Summary &amp; Sign-Off</h2>
              <p>Transparent breakdown with zero hidden fees.</p>
            </div>
          </div>
          <div class="close-grid">
            <div class="summary-box">
              <div class="summary-line">
                <span>Selected Package: <strong>${escapeHtml(totals.chosenTier?.name || "")}</strong></span>
                <strong class="mono">${formatMoney(totals.basePrice, cur)}</strong>
              </div>
              ${totals.selectedAddons.map((a) => `
                <div class="summary-line">
                  <span>+ ${escapeHtml(a.title)}</span>
                  <span class="mono">+${formatMoney(a.price, cur)}</span>
                </div>
              `).join("")}
              ${totals.discountApplied > 0 ? `
                <div class="summary-line discount">
                  <span>★ Fast-Action Booking Savings</span>
                  <span class="mono">-${formatMoney(totals.discountApplied, cur)}</span>
                </div>
              ` : ""}
              ${totals.taxAmount > 0 ? `
                <div class="summary-line">
                  <span>${escapeHtml(totals.taxLabel)} (${totals.taxRate}%)</span>
                  <span class="mono">${formatMoney(totals.taxAmount, cur)}</span>
                </div>
              ` : ""}
              <hr class="summary-divider" />
              <div class="summary-total-row">
                <span class="summary-total-label">Total Investment</span>
                <span class="summary-total-value">${formatMoney(totals.total, cur)}</span>
              </div>
              ${totals.depositPct > 0 ? `
                <div class="deposit-callout">
                  <span>Deposit to Reserve (${totals.depositPct}%)</span>
                  <strong>${formatMoney(totals.depositDue, cur)}</strong>
                </div>
                <div class="summary-line" style="margin-top:6px;font-size:12px;">
                  <span>Remaining Balance Later</span>
                  <span class="mono">${formatMoney(totals.balanceDue, cur)}</span>
                </div>
              ` : ""}
              ${summaryMonthly > 0 ? `
                <div class="financing-summary-box">
                  <div class="financing-summary-top">
                    <span>Est. Monthly Financing (${finMonths} mos @ ${finApr}%* APR)</span>
                    <strong class="mono">${formatMoney(summaryMonthly, cur)}/mo*</strong>
                  </div>
                  <div class="financing-summary-sub">
                    <span>*Estimated payment; subject to lender credit approval.</span>
                    ${safeFinUrl ? `<a class="financing-link" href="${escapeHtml(safeFinUrl)}" target="_blank" rel="noopener noreferrer">Check Financing Options →</a>` : ""}
                  </div>
                </div>
              ` : ""}
              ${p.paymentNote ? `<p class="terms-note" style="margin-top:10px;color:var(--text-secondary);"><strong>Payment Schedule:</strong> ${escapeHtml(p.paymentNote)}</p>` : ""}
              ${p.terms ? `<p class="terms-note">${ICONS.shield} <strong>Guarantee &amp; Terms:</strong> ${escapeHtml(p.terms)}</p>` : ""}
            </div>
            <div>
              ${closeRightColumnHtml}
            </div>
          </div>
        </section>

        <footer class="proposal-footer">
          <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
            <span>© ${new Date().getFullYear()} ${escapeHtml(p.businessName || "Service Provider")} • Client-Private Proposal</span>
            <button type="button" class="btn btn-ghost btn-sm no-print" style="padding:2px 6px;font-size:11.5px;" data-action="open-modal" data-modal="modal-legal">Privacy &amp; ESIGN Terms</button>
          </div>
          ${showViralFooter ? `
            <a class="viral-badge no-print" href="${escapeHtml(badgeRefHref)}" target="_blank" rel="noopener noreferrer">
              <span style="color:var(--accent);display:inline-flex;">${ICONS.bolt}</span>
              <span>Powered by <strong>BidLift</strong> — Send Good / Better / Best quotes free in 60s →</span>
            </a>
          ` : `<div>Verified Digital Acceptance Enabled</div>`}
        </footer>
      </article>
    `;
  }

  // =========================================================================
  // Builder Pane Rendering
  // =========================================================================
  function renderServiceCatalogBoxHtml(p, cur) {
    const sym = (CONFIG.CURRENCIES && CONFIG.CURRENCIES[cur]?.symbol) || "$";
    const tplLabel = TEMPLATES[p.id]?.label || "Trade";
    const cf = state.catForm || { name: "", category: "", qty: 1, unit: "job", unitPrice: 250, note: "" };
    const tiers = Array.isArray(p.tiers) ? p.tiers : [];

    const formHtml = state.showCatForm ? `
      <div class="catalog-form-box">
        <div style="font-size:12px;font-weight:700;margin-bottom:8px;color:var(--text-primary);">
          ${state.editingCatIdx >= 0 ? "Update Saved Service" : "Add Custom Reusable Service"}
        </div>
        <div class="field-grid">
          <div class="field-row-2">
            <div class="field">
              <label>Service Name *</label>
              <input type="text" id="cat-f-name" data-cat-field="name" placeholder="e.g., Accent Wall Trim & Paint" value="${escapeHtml(cf.name)}" />
            </div>
            <div class="field">
              <label>Category</label>
              <input type="text" id="cat-f-category" data-cat-field="category" placeholder="e.g., Custom Finish" value="${escapeHtml(cf.category)}" />
            </div>
          </div>
          <div class="line-item-metrics-row">
            <div class="field">
              <label>Qty</label>
              <input type="number" min="0" step="any" id="cat-f-qty" data-cat-field="qty" value="${Number(cf.qty) || 1}" />
            </div>
            <div class="field">
              <label>Unit</label>
              <input type="text" id="cat-f-unit" data-cat-field="unit" placeholder="job / sq ft" value="${escapeHtml(cf.unit)}" />
            </div>
            <div class="field">
              <label>Rate (${escapeHtml(sym)})</label>
              <input type="number" min="0" step="any" id="cat-f-rate" data-cat-field="unitPrice" value="${Number(cf.unitPrice) || 0}" />
            </div>
          </div>
          <div class="field">
            <label>Included Scope Note</label>
            <input type="text" id="cat-f-note" data-cat-field="note" placeholder="Materials, prep & quality standard..." value="${escapeHtml(cf.note)}" />
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button type="button" class="btn btn-primary btn-sm" data-action="save-cat-service">${state.editingCatIdx >= 0 ? "Save Changes" : "Save to My Library"}</button>
            <button type="button" class="btn btn-ghost btn-sm" data-action="cancel-cat-form">Cancel</button>
          </div>
        </div>
      </div>
    ` : "";

    const listHtml = state.serviceCatalog.length > 0
      ? `
        <div class="catalog-list">
          ${state.serviceCatalog.map((svc, cIdx) => {
            const totalAmt = getLineItemTotal(svc);
            const tierBtns = tiers.map((t, ti) => `
              <button type="button" class="btn btn-outline btn-xs" data-action="catalog-to-tier" data-cat-idx="${cIdx}" data-tier-idx="${ti}" title="Add to Option ${ti + 1}: ${escapeHtml(t.name)}">+ T${ti + 1}</button>
            `).join("");
            return `
              <div class="catalog-item-row">
                <div class="catalog-item-top">
                  <div>
                    <div class="catalog-item-title">${escapeHtml(svc.name)}</div>
                    <div class="catalog-item-meta">
                      <span class="itemized-cat-pill">${escapeHtml(svc.category || "Core")}</span>
                      <span class="mono">${Number(svc.qty) || 1} ${escapeHtml(svc.unit || "job")} × ${formatMoney(svc.unitPrice, cur)} = <strong>${formatMoney(totalAmt, cur)}</strong></span>
                    </div>
                  </div>
                  <div style="display:flex;gap:4px;">
                    <button type="button" class="btn btn-ghost btn-xs" data-action="edit-cat-service" data-cat-idx="${cIdx}">Edit</button>
                    <button type="button" class="btn btn-danger-ghost btn-xs" data-action="delete-cat-service" data-cat-idx="${cIdx}" title="Delete service">×</button>
                  </div>
                </div>
                ${svc.note ? `<div class="catalog-item-note">${escapeHtml(svc.note)}</div>` : ""}
                <div class="catalog-item-actions">
                  ${tierBtns}
                  <button type="button" class="btn btn-outline btn-xs" data-action="catalog-to-addon" data-cat-idx="${cIdx}" title="Add as optional buyer upgrade">+ Upsell</button>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      `
      : `
        <div class="catalog-empty">
          <p>Save your own repeatable services &amp; rates once, then insert them into any tier or upsell in 1 click.</p>
          <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
            <button type="button" class="btn btn-outline btn-sm" data-action="load-starter-services">${ICONS.sparkle} Load ${escapeHtml(tplLabel)} Starter Services</button>
            <button type="button" class="btn btn-primary btn-sm" data-action="toggle-cat-form">${ICONS.plus} Create Custom Service</button>
          </div>
        </div>
      `;

    return `
      <div class="card-box catalog-box">
        <div class="card-box-head" style="flex-wrap:wrap;gap:8px;">
          <span class="card-box-title">${ICONS.bookmark} My Services Library <span class="badge-count">${state.serviceCatalog.length}</span></span>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            <button type="button" class="btn btn-primary btn-xs" data-action="toggle-cat-form">${ICONS.plus} Add Service</button>
            <button type="button" class="btn btn-outline btn-xs" data-action="save-quote-services-to-catalog" title="Bookmark all services from this quote into your library">Save Quote Items</button>
            ${state.serviceCatalog.length > 0 ? `<button type="button" class="btn btn-ghost btn-xs" data-action="load-starter-services">+ ${escapeHtml(tplLabel)} Presets</button>` : ""}
          </div>
        </div>
        ${formHtml}
        ${listHtml}
      </div>
    `;
  }

  function renderBuilderBodyHtml() {
    const p = state.proposal;
    const cur = p.currency || "USD";

    if (state.activeTab === "business") {
      const swatchesHtml = Object.values(PALETTES)
        .map((pal) => `
          <button type="button" class="palette-chip ${p.paletteId === pal.id && !p.customBrandColor ? "active" : ""}"
                  data-action="pick-palette" data-palette-id="${pal.id}">
            <span class="swatch-dual" style="background:linear-gradient(135deg, ${pal.brand} 55%, ${pal.accent} 55%);"></span>
            <span>${escapeHtml(pal.name)}</span>
          </button>
        `)
        .join("");

      const currencyOptionsHtml = Object.values(CONFIG.CURRENCIES || {})
        .map((c) => `<option value="${c.code}" ${cur === c.code ? "selected" : ""}>${escapeHtml(c.label)}</option>`)
        .join("");

      const safeLogo = sanitizeImageSrc(p.logoData);
      const trustArr = [0, 1, 2].map((i) => (Array.isArray(p.trustBadges) ? p.trustBadges[i] || "" : ""));

      return `
        <div class="card-box">
          <div class="card-box-head">
            <span class="card-box-title">Your Business Brand</span>
          </div>
          <div class="field-grid">
            <div class="field">
              <label for="f-biz-name">Business Name</label>
              <input id="f-biz-name" type="text" data-bind="businessName" value="${escapeHtml(p.businessName)}" />
            </div>
            <div class="field">
              <label for="f-biz-tag">Value Prop / Warranty Tagline</label>
              <input id="f-biz-tag" type="text" data-bind="businessTagline" value="${escapeHtml(p.businessTagline)}" />
            </div>
            <div class="field-row-2">
              <div class="field">
                <label for="f-biz-email">Reply-To Email</label>
                <input id="f-biz-email" type="email" data-bind="businessEmail" value="${escapeHtml(p.businessEmail)}" />
              </div>
              <div class="field">
                <label for="f-biz-phone">Phone Number</label>
                <input id="f-biz-phone" type="tel" data-bind="businessPhone" value="${escapeHtml(p.businessPhone)}" />
              </div>
            </div>
            <div class="field-row-2">
              <div class="field">
                <label for="f-currency">Currency</label>
                <select id="f-currency" data-bind="currency">${currencyOptionsHtml}</select>
              </div>
              <div class="field">
                <label for="f-quote-num">Quote Reference #</label>
                <input id="f-quote-num" type="text" placeholder="Q-2026-101" data-bind="quoteNumber" value="${escapeHtml(p.quoteNumber || "")}" />
              </div>
            </div>
            <div class="field">
              <label>Business Logo <span style="font-weight:400;color:var(--text-muted);">Auto-optimized for SMS/URL</span></label>
              <div class="logo-upload-row">
                <div class="logo-thumb">
                  ${safeLogo ? `<img src="${escapeHtml(safeLogo)}" alt="Logo" />` : escapeHtml((p.businessName || "B")[0].toUpperCase())}
                </div>
                <div style="flex:1;display:flex;gap:6px;flex-wrap:wrap;">
                  <label class="btn btn-outline btn-sm" style="cursor:pointer;">
                    Upload Logo
                    <input type="file" id="logo-file-input" accept="image/*" class="sr-only" />
                  </label>
                  ${safeLogo ? `<button type="button" class="btn btn-danger-ghost btn-sm" data-action="remove-logo">Remove</button>` : ""}
                </div>
              </div>
            </div>
            <div class="field">
              <label>Brand Theme Palette</label>
              <div class="palette-grid">${swatchesHtml}</div>
            </div>
            <div class="field-row-2" style="align-items:end;">
              <div class="field">
                <label for="f-custom-color">Custom Hex Accent</label>
                <input id="f-custom-color" type="text" placeholder="#0f294a" data-bind="customBrandColor" value="${escapeHtml(p.customBrandColor)}" />
              </div>
              <div class="field">
                <label for="f-color-picker">Pick Color</label>
                <input id="f-color-picker" type="color" value="${escapeHtml(sanitizeHexColor(p.customBrandColor) || PALETTES[p.paletteId]?.brand || "#0f294a")}" style="height:36px;width:100%;padding:2px;border-radius:8px;border:1px solid var(--border-strong);background:var(--bg-input);cursor:pointer;" />
              </div>
            </div>
          </div>
        </div>

        <div class="card-box">
          <div class="card-box-head">
            <span class="card-box-title">Client, Scope Intro &amp; Trust Badges</span>
          </div>
          <div class="field-grid">
            <div class="field">
              <label for="f-client-name">Prepared For (Client Name)</label>
              <input id="f-client-name" type="text" data-bind="clientName" value="${escapeHtml(p.clientName)}" />
            </div>
            <div class="field">
              <label for="f-proj-title">Project / Proposal Title</label>
              <input id="f-proj-title" type="text" data-bind="projectTitle" value="${escapeHtml(p.projectTitle)}" />
            </div>
            <div class="field">
              <label for="f-proj-loc">Property Address / Location</label>
              <input id="f-proj-loc" type="text" data-bind="projectLocation" value="${escapeHtml(p.projectLocation)}" />
            </div>
            <div class="field">
              <label for="f-intro-text">Executive Intro Note</label>
              <textarea id="f-intro-text" rows="2" placeholder="Warm intro & scope summary..." data-bind="introText">${escapeHtml(p.introText || "")}</textarea>
            </div>
            <div class="field">
              <label>3 Credibility Badges (Shown Under Header)</label>
              ${trustArr.map((tb, idx) => `
                <input type="text" data-trust-idx="${idx}" value="${escapeHtml(tb)}" placeholder="Trust badge #${idx + 1}" />
              `).join("")}
            </div>
          </div>
        </div>
      `;
    }

    if (state.activeTab === "tiers") {
      const sym = (CONFIG.CURRENCIES && CONFIG.CURRENCIES[cur]?.symbol) || "$";
      const catalogBoxHtml = renderServiceCatalogBoxHtml(p, cur);
      const tierCardsHtml = (p.tiers || []).map((tier, tIdx) => {
        const isRec = Number(p.recommendedTierIndex) === tIdx;
        const lineItems = Array.isArray(tier.lineItems) ? tier.lineItems : [];
        const itemsSum = getTierItemsSubtotal(tier);

        const lineItemsHtml = lineItems.map((it, lIdx) => {
          const lineAmt = getLineItemTotal(it);
          return `
            <div class="line-item-editor-card">
              <div class="line-item-top-row">
                <input type="text" value="${escapeHtml(it.name)}" data-line-bind="${tIdx}:${lIdx}:name" placeholder="Service name (e.g., Cabinet Spray Finish)" />
                <span class="line-item-sum mono" id="line-sum-${tIdx}-${lIdx}">${lineAmt > 0 ? formatMoney(lineAmt, cur) : "Incl."}</span>
                <button type="button" class="btn btn-ghost btn-xs" data-action="save-item-to-catalog" data-tier-idx="${tIdx}" data-line-idx="${lIdx}" title="Save to My Services Library">★</button>
                <button type="button" class="btn btn-danger-ghost btn-xs" data-action="remove-line-item" data-tier-idx="${tIdx}" data-line-idx="${lIdx}" title="Remove service">×</button>
              </div>
              <div class="line-item-metrics-4">
                <input type="text" value="${escapeHtml(it.category)}" data-line-bind="${tIdx}:${lIdx}:category" placeholder="Category" title="Service category" />
                <input type="number" min="0" step="any" value="${Number(it.qty) ?? 1}" data-line-bind="${tIdx}:${lIdx}:qty" placeholder="Qty" title="Quantity" />
                <input type="text" value="${escapeHtml(it.unit)}" data-line-bind="${tIdx}:${lIdx}:unit" placeholder="Unit" title="Unit (job, sq ft, hr)" />
                <input type="number" min="0" step="any" value="${Number(it.unitPrice) || 0}" data-line-bind="${tIdx}:${lIdx}:unitPrice" placeholder="Rate" title="Unit Rate (${escapeHtml(sym)})" />
              </div>
              <input type="text" value="${escapeHtml(it.note)}" data-line-bind="${tIdx}:${lIdx}:note" placeholder="1-line scope & materials detail for buyer..." />
            </div>
          `;
        }).join("");

        const featuresListHtml = (tier.features || []).map((feat, fIdx) => `
          <div class="feature-item-row">
            <input type="text" value="${escapeHtml(feat)}" data-tier-feat="${tIdx}:${fIdx}" placeholder="Deliverable bullet..." />
            <button type="button" class="btn btn-danger-ghost btn-sm" data-action="remove-feature" data-tier-idx="${tIdx}" data-feat-idx="${fIdx}" title="Remove bullet">×</button>
          </div>
        `).join("");

        return `
          <div class="card-box">
            <div class="card-box-head">
              <span class="card-box-title">Option ${tIdx + 1}: ${escapeHtml(tier.name || "")}</span>
              <div style="display:flex;gap:6px;">
                <button type="button" class="btn btn-sm ${isRec ? "btn-accent" : "btn-outline"}" data-action="set-recommended-tier" data-tier-idx="${tIdx}">
                  ${isRec ? "★ Most Popular" : "Mark Popular"}
                </button>
                ${(p.tiers || []).length > 1 ? `<button type="button" class="btn btn-danger-ghost btn-sm" data-action="remove-tier" data-tier-idx="${tIdx}" title="Remove package">×</button>` : ""}
              </div>
            </div>
            <div class="field-grid">
              <div class="field-row-2">
                <div class="field">
                  <label>Package Name</label>
                  <input type="text" value="${escapeHtml(tier.name)}" data-tier-bind="${tIdx}:name" />
                </div>
                <div class="field">
                  <label>Price (${escapeHtml(sym)})</label>
                  <input id="tier-price-input-${tIdx}" type="number" min="0" step="any" value="${Number(tier.price) || 0}" data-tier-bind="${tIdx}:price" />
                </div>
              </div>
              <div class="field-row-2">
                <div class="field">
                  <label>Short Positioning</label>
                  <input type="text" value="${escapeHtml(tier.subtitle)}" data-tier-bind="${tIdx}:subtitle" />
                </div>
                <div class="field">
                  <label>Timeline / ETA</label>
                  <input type="text" value="${escapeHtml(tier.timeline)}" data-tier-bind="${tIdx}:timeline" />
                </div>
              </div>

              <div class="toggle-row" style="padding:7px 10px;">
                <div>
                  <span style="font-size:12px;font-weight:600;display:block;">Auto-sum price from itemized services</span>
                  <span style="font-size:11px;color:var(--text-muted);" id="tier-items-sum-${tIdx}">Services sum: <strong class="mono">${formatMoney(itemsSum, cur)}</strong></span>
                </div>
                <label class="switch">
                  <input type="checkbox" data-tier-autocalc="${tIdx}" ${tier.autoCalcPrice ? "checked" : ""} />
                  <span class="slider"></span>
                </label>
              </div>

              <div class="field">
                <label>Itemized Services (${lineItems.length})</label>
                <div class="line-item-list">${lineItemsHtml}</div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                  <button type="button" class="btn btn-outline btn-sm" data-action="add-line-item" data-tier-idx="${tIdx}">
                    ${ICONS.plus} Add Service Item
                  </button>
                  ${lineItems.length === 0 && (tier.features || []).length > 0 ? `
                    <button type="button" class="btn btn-primary btn-sm" data-action="convert-features-to-items" data-tier-idx="${tIdx}">Convert Bullets to Services</button>
                  ` : ""}
                </div>
              </div>

              <details class="legacy-bullets-details">
                <summary>Summary Highlight Bullets (${(tier.features || []).length})</summary>
                <div style="margin-top:8px;">
                  <div>${featuresListHtml}</div>
                  <button type="button" class="btn btn-outline btn-xs" data-action="add-feature" data-tier-idx="${tIdx}">
                    ${ICONS.plus} Add Highlight Bullet
                  </button>
                </div>
              </details>
            </div>
          </div>
        `;
      }).join("");

      return `
        <div class="toggle-row">
          <div>
            <strong style="font-size:13px;display:block;">Multi-Tier Comparison Mode</strong>
            <span style="font-size:11.5px;color:var(--text-muted);">Anchoring 3 options increases average deal size by 22%–38%.</span>
          </div>
          <label class="switch">
            <input type="checkbox" id="toggle-multi-tier" ${!p.singleTierMode ? "checked" : ""} />
            <span class="slider"></span>
          </label>
        </div>
        <div class="field-row-2" style="align-items:end;">
          <div class="field">
            <label for="f-rec-badge">Highlight Ribbon Text</label>
            <input id="f-rec-badge" type="text" data-bind="recommendedBadge" value="${escapeHtml(p.recommendedBadge || "Most Popular Choice")}" />
          </div>
          <div class="field">
            ${(p.tiers || []).length < 3
              ? `<button type="button" class="btn btn-primary" style="width:100%;" data-action="add-tier">${ICONS.plus} Add Package Tier</button>`
              : `<span style="font-size:11.5px;color:var(--text-muted);display:block;padding-bottom:8px;">Maximum 3 tiers active</span>`
            }
          </div>
        </div>
        ${catalogBoxHtml}
        ${tierCardsHtml}
      `;
    }

    if (state.activeTab === "addons") {
      const sym = (CONFIG.CURRENCIES && CONFIG.CURRENCIES[cur]?.symbol) || "$";
      const quickCatalogChips = state.serviceCatalog.length > 0
        ? `
          <div class="card-box">
            <div style="font-size:11.5px;font-weight:700;color:var(--text-secondary);margin-bottom:6px;">Quick-Add From My Services Library:</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;">
              ${state.serviceCatalog.map((svc, cIdx) => `
                <button type="button" class="btn btn-outline btn-xs" data-action="catalog-to-addon" data-cat-idx="${cIdx}">+ ${escapeHtml(svc.name)} (${formatMoney(getLineItemTotal(svc), cur)})</button>
              `).join("")}
            </div>
          </div>
        `
        : "";

      const addonsHtml = (p.addons || []).map((addon, aIdx) => `
        <div class="card-box">
          <div class="card-box-head">
            <span class="card-box-title">Upsell #${aIdx + 1}</span>
            <button type="button" class="btn btn-danger-ghost btn-sm" data-action="remove-addon" data-addon-idx="${aIdx}">${ICONS.trash} Remove</button>
          </div>
          <div class="field-grid">
            <div class="field-row-2">
              <div class="field">
                <label>Add-On Title</label>
                <input type="text" value="${escapeHtml(addon.title)}" data-addon-bind="${aIdx}:title" />
              </div>
              <div class="field">
                <label>Upgrade Price (${escapeHtml(sym)})</label>
                <input type="number" min="0" step="1" value="${Number(addon.price) || 0}" data-addon-bind="${aIdx}:price" />
              </div>
            </div>
            <div class="line-item-metrics-row">
              <div class="field">
                <label>Category</label>
                <input type="text" value="${escapeHtml(addon.category || "Upgrade")}" data-addon-bind="${aIdx}:category" placeholder="Priority / Upgrade" />
              </div>
              <div class="field">
                <label>Qty</label>
                <input type="number" min="1" step="1" value="${Number(addon.qty) || 1}" data-addon-bind="${aIdx}:qty" />
              </div>
              <div class="field">
                <label>Unit</label>
                <input type="text" value="${escapeHtml(addon.unit || "pkg")}" data-addon-bind="${aIdx}:unit" placeholder="pkg / visit" />
              </div>
            </div>
            <div class="field">
              <label>Value Description</label>
              <input type="text" value="${escapeHtml(addon.description)}" data-addon-bind="${aIdx}:description" />
            </div>
            <div class="toggle-row" style="padding:6px 10px;">
              <span style="font-size:12px;color:var(--text-secondary);">Pre-checked by default</span>
              <label class="switch">
                <input type="checkbox" data-addon-check="${aIdx}" ${addon.selected ? "checked" : ""} />
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </div>
      `).join("");

      return `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
          <span style="font-size:12.5px;color:var(--text-muted);">Clients love toggling upgrades themselves instead of feeling pressured.</span>
          <button type="button" class="btn btn-primary btn-sm" data-action="add-addon">${ICONS.plus} Add Upsell</button>
        </div>
        ${quickCatalogChips}
        ${addonsHtml || `<div class="card-box" style="text-align:center;color:var(--text-muted);">No add-ons yet. Click "+ Add Upsell" to boost your average order size.</div>`}
      `;
    }

    // Tab 4: Close & Deposit
    const needsPayLinkHint = p.paymentProvider !== "zelle" && !sanitizeHttpsUrl(p.paymentLink);
    return `
      <div class="card-box">
        <div class="card-box-head">
          <span class="card-box-title">Instant Deposit Collection</span>
        </div>
        <div class="field-grid">
          <div class="field">
            <label for="f-deposit-pct">Deposit Due Upon Approval <strong class="mono">${Number(p.depositPercent) || 0}%</strong></label>
            <input id="f-deposit-pct" type="range" min="0" max="100" step="5" value="${Number(p.depositPercent) || 0}" data-bind="depositPercent" />
            <div style="display:flex;gap:6px;margin-top:4px;">
              ${[0, 25, 30, 50, 100].map((pct) => `
                <button type="button" class="btn btn-outline btn-sm" data-action="set-deposit-pct" data-pct="${pct}">${pct}%</button>
              `).join("")}
            </div>
          </div>
          <div class="field-row-2">
            <div class="field">
              <label for="f-pay-provider">Payment Method</label>
              <select id="f-pay-provider" data-bind="paymentProvider">
                <option value="stripe" ${p.paymentProvider === "stripe" ? "selected" : ""}>Stripe Payment Link</option>
                <option value="venmo" ${p.paymentProvider === "venmo" ? "selected" : ""}>Venmo Link (https://)</option>
                <option value="paypal" ${p.paymentProvider === "paypal" ? "selected" : ""}>PayPal.me Link (https://)</option>
                <option value="square" ${p.paymentProvider === "square" ? "selected" : ""}>Square Checkout (https://)</option>
                <option value="zelle" ${p.paymentProvider === "zelle" ? "selected" : ""}>Zelle / Direct Info</option>
              </select>
            </div>
            <div class="field">
              <label for="f-valid-days">Quote Valid (Days)</label>
              <input id="f-valid-days" type="number" min="1" max="365" data-bind="validDays" value="${Number(p.validDays) || 7}" />
            </div>
          </div>
          ${needsPayLinkHint ? `
            <div class="callout-hint">
              Tip: Paste your real <code>https://</code> Stripe, Venmo, PayPal, or Square link below so clients can pay their deposit immediately after signing.
            </div>
          ` : ""}
          <div class="field">
            <label for="f-pay-link">${p.paymentProvider === "zelle" ? "Zelle Email or Phone Instructions" : "Your HTTPS Checkout / Deposit URL"}</label>
            <input id="f-pay-link" type="text" data-bind="paymentLink" value="${escapeHtml(p.paymentLink)}" placeholder="${p.paymentProvider === "zelle" ? "pay@yourcompany.com" : "https://buy.stripe.com/..."}" />
          </div>
          <div class="field">
            <label for="f-pay-note">Payment Schedule Note</label>
            <input id="f-pay-note" type="text" data-bind="paymentNote" value="${escapeHtml(p.paymentNote)}" />
          </div>
        </div>
      </div>

      <div class="card-box">
        <div class="card-box-head">
          <span class="card-box-title">Monthly Payment Framing (Financing Display)</span>
        </div>
        <div class="field-grid">
          <div class="toggle-row">
            <div>
              <div style="font-size:12.5px;font-weight:700;">Show Est. Monthly Payment on Tiers</div>
              <div style="font-size:11.5px;color:var(--text-muted);">Frames project totals into affordable monthly figures so buyers pick higher tiers.</div>
            </div>
            <label class="switch">
              <input type="checkbox" data-toggle-financing ${p.financingEnabled ? "checked" : ""} />
              <span class="slider"></span>
            </label>
          </div>
          ${p.financingEnabled ? `
            <div class="field-row-2">
              <div class="field">
                <label for="f-fin-months">Term (Months)</label>
                <select id="f-fin-months" data-bind="financingMonths">
                  ${[12, 24, 36, 48, 60, 84, 120].map((m) => `<option value="${m}" ${Number(p.financingMonths || 60) === m ? "selected" : ""}>${m} months</option>`).join("")}
                </select>
              </div>
              <div class="field">
                <label for="f-fin-apr">Est. APR (%)</label>
                <input id="f-fin-apr" type="number" min="0" max="36" step="0.1" data-bind="financingApr" value="${p.financingApr === undefined ? 9.99 : Number(p.financingApr)}" />
              </div>
            </div>
            <div class="field">
              <label for="f-fin-url">Optional Pre-Qualification URL (Wisetack / Hearth / Affirm)</label>
              <input id="f-fin-url" type="text" data-bind="financingUrl" value="${escapeHtml(p.financingUrl || "")}" placeholder="https://apply.yourlender.com/..." />
            </div>
          ` : ""}
        </div>
      </div>

      <div class="card-box">
        <div class="card-box-head">
          <span class="card-box-title">Tax, Fast-Action Urgency &amp; Guarantee</span>
        </div>
        <div class="field-grid">
          <div class="field-row-2">
            <div class="field">
              <label for="f-tax-rate">Sales Tax / VAT (%)</label>
              <input id="f-tax-rate" type="number" min="0" max="50" step="0.1" data-bind="taxRate" value="${Number(p.taxRate) || 0}" />
            </div>
            <div class="field">
              <label for="f-tax-label">Tax Label</label>
              <input id="f-tax-label" type="text" placeholder="Sales Tax" data-bind="taxLabel" value="${escapeHtml(p.taxLabel || "Sales Tax")}" />
            </div>
          </div>
          <div class="field-row-2">
            <div class="field">
              <label for="f-fast-disc">Fast-Action Savings</label>
              <input id="f-fast-disc" type="number" min="0" step="5" data-bind="fastActionDiscount" value="${Number(p.fastActionDiscount) || 0}" />
            </div>
            <div class="field">
              <label for="f-fast-hrs">Deadline Window (Hours)</label>
              <input id="f-fast-hrs" type="number" min="1" max="720" data-bind="fastActionHours" value="${Number(p.fastActionHours) || 48}" />
            </div>
          </div>
          <div class="field">
            <label for="f-terms">Warranty / Terms</label>
            <textarea id="f-terms" rows="3" data-bind="terms">${escapeHtml(p.terms)}</textarea>
          </div>
          <button type="button" class="btn btn-primary" data-action="save-draft">${ICONS.folder} Save Quote to Local Drafts</button>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // Modals HTML (Share/Embed, Saved Drafts, Pro/Pricing, Zelle, Legal)
  // =========================================================================
  function renderModalsHtml() {
    const p = state.proposal || {};
    const draftItemsHtml = state.drafts.length
      ? state.drafts.map((d, idx) => `
          <div class="draft-item">
            <div>
              <strong style="font-size:13.5px;display:block;">${escapeHtml(d.title || d.proposal.projectTitle || "Untitled Proposal")}</strong>
              <span style="font-size:11.5px;color:var(--text-muted);">${escapeHtml(d.proposal.clientName || "")} • Saved ${new Date(d.savedAt).toLocaleDateString()}</span>
            </div>
            <div style="display:flex;gap:6px;">
              <button type="button" class="btn btn-primary btn-sm" data-action="load-draft" data-draft-idx="${idx}">Load</button>
              <button type="button" class="btn btn-danger-ghost btn-sm" data-action="delete-draft" data-draft-idx="${idx}">Delete</button>
            </div>
          </div>
        `).join("")
      : `<p style="color:var(--text-muted);font-size:13px;">No saved drafts yet. Click "Save Current Quote" above to bookmark a proposal locally in your browser.</p>`;

    const embedUrl = state.shareUrl ? `${state.shareUrl}&embed=1` : `${getBaseStudioUrl()}#q=...`;
    const iframeSnippet = `<iframe src="${escapeHtml(embedUrl)}" width="100%" height="920" style="border:0;border-radius:16px;box-shadow:0 12px 32px rgba(0,0,0,0.08);" loading="lazy"></iframe>`;
    const activeShareUrl = state.cloudShareUrl || state.shareUrl;
    const pitchText = `Hi ${(p.clientName || "there").split(/\s+/)[0]}, here is your custom interactive proposal for ${p.projectTitle || "your project"}. You can compare packages, toggle optional upgrades, and lock in your start date in 60 seconds: ${activeShareUrl}`;
    const waShareUrl = `https://wa.me/?text=${encodeURIComponent(pitchText)}`;
    const cloudReady = Boolean(CLOUD && CLOUD.isConfigured());
    const cloudLoggedIn = Boolean(state.cloudSession && state.cloudSession.user);

    return `
      <!-- Share & Embed Modal -->
      <div class="modal-backdrop" id="modal-share" role="dialog" aria-modal="true">
        <div class="modal-card">
          <div class="modal-header">
            <h3>Share Interactive Client Proposal</h3>
            <button type="button" class="btn btn-ghost btn-sm" data-action="close-modal" data-modal="modal-share">✕</button>
          </div>
          <p style="margin:0 0 12px;font-size:13px;color:var(--text-secondary);">
            <strong>100% Zero-Server Privacy:</strong> Your compressed <code>#q=</code> link stores client data cleanly in the URL hash—every quote runs privately in your browser with zero server storage.
          </p>
          <div style="display:flex;gap:8px;margin-bottom:12px;">
            <button type="button" class="btn btn-sm ${state.shareTab === "link" ? "btn-primary" : "btn-outline"}" data-action="switch-share-tab" data-tab="link">${ICONS.share} Client Proposal Link</button>
            <button type="button" class="btn btn-sm ${state.shareTab === "embed" ? "btn-primary" : "btn-outline"}" data-action="switch-share-tab" data-tab="embed">${ICONS.code} Website Iframe Embed</button>
          </div>

          <div id="share-panel-link" style="${state.shareTab === "link" ? "" : "display:none;"}">
            <div style="font-size:12px;font-weight:600;margin-bottom:5px;display:flex;justify-content:space-between;">
              <span>Shareable Client URL</span>
              <span class="mono" id="share-url-len" style="color:var(--success);font-size:11px;">${state.shareUrl.length} chars</span>
            </div>
            <div class="code-box" id="share-url-box">${escapeHtml(state.shareUrl)}</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;">
              <button type="button" class="btn btn-primary" data-action="copy-share-url">${ICONS.copy} Copy Client Link</button>
              <a class="btn btn-outline" id="open-client-link" href="${escapeHtml(state.shareUrl)}" target="_blank" rel="noopener noreferrer">${ICONS.external} Open Client View</a>
              <button type="button" class="btn btn-outline" data-action="copy-rich-email-link">${ICONS.copy} Copy Clean Email Link</button>
              <a class="btn btn-outline" href="${escapeHtml(waShareUrl)}" target="_blank" rel="noopener noreferrer">Share via WhatsApp</a>
            </div>
            ${cloudReady ? `
            <div class="cloud-status-card" style="margin-top:14px;">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
                <strong style="font-size:12.5px;">Tracked Short Link &amp; Instant Open/Sign Alerts</strong>
                ${cloudLoggedIn
                  ? `<button type="button" class="btn btn-accent btn-sm" data-action="publish-cloud-proposal">${ICONS.bolt} Publish Tracked Short Link</button>`
                  : `<button type="button" class="btn btn-outline btn-sm" data-action="open-modal" data-modal="modal-cloud">Sign In for Short Links</button>`}
              </div>
              ${state.cloudShareUrl ? `
                <div style="margin-top:8px;">
                  <div class="code-box" style="margin-bottom:6px;">${escapeHtml(state.cloudShareUrl)}</div>
                  <button type="button" class="btn btn-primary btn-xs" data-action="copy-cloud-share-url">${ICONS.copy} Copy Short Cloud Link</button>
                </div>
              ` : `<div style="font-size:11.5px;color:var(--text-muted);margin-top:5px;">${cloudLoggedIn ? "Publish once to create a short tracked URL with instant view &amp; signature alerts." : "Sign in cleanly via Magic Link to track client opens &amp; signatures."}</div>`}
            </div>` : `
            <div class="cloud-status-card" style="margin-top:14px;">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
                <div>
                  <strong style="font-size:12.5px;">Want Short Links + Instant Client Open &amp; Sign Alerts?</strong>
                  <div style="font-size:11.5px;color:var(--text-muted);margin-top:2px;">Included in <strong>BidLift Advanced Pro</strong> alongside cross-device sync &amp; team seats.</div>
                </div>
                <button type="button" class="btn btn-outline btn-sm" data-action="open-modal" data-modal="modal-pro">Compare Plans →</button>
              </div>
            </div>`}
            <div style="margin-top:16px;">
              <div style="font-size:12px;font-weight:600;margin-bottom:5px;">Ready-to-Send SMS / WhatsApp / Email Pitch</div>
              <div class="code-box" style="font-family:var(--font-body);">${escapeHtml(pitchText)}</div>
              <button type="button" class="btn btn-outline btn-sm" style="margin-top:8px;" data-action="copy-pitch-text">${ICONS.copy} Copy Message + Link</button>
            </div>
          </div>

          <div id="share-panel-embed" style="${state.shareTab === "embed" ? "" : "display:none;"}">
            <div style="font-size:12px;font-weight:600;margin-bottom:5px;">Paste Into Any Webflow, WordPress, Wix, or Squarespace Page</div>
            <div class="code-box">${escapeHtml(iframeSnippet)}</div>
            <button type="button" class="btn btn-primary" style="margin-top:10px;" data-action="copy-embed-code">${ICONS.copy} Copy Website Embed Snippet</button>
          </div>
        </div>
      </div>

      <!-- Saved Drafts Modal -->
      <div class="modal-backdrop" id="modal-drafts" role="dialog" aria-modal="true">
        <div class="modal-card">
          <div class="modal-header">
            <h3>Saved Local Proposals</h3>
            <button type="button" class="btn btn-ghost btn-sm" data-action="close-modal" data-modal="modal-drafts">✕</button>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;">
            <button type="button" class="btn btn-primary btn-sm" data-action="save-draft">${ICONS.plus} Save Current Quote</button>
            <button type="button" class="btn btn-outline btn-sm" data-action="export-drafts-json">Export Backup (.json)</button>
            <label class="btn btn-outline btn-sm" style="cursor:pointer;">
              Import Backup
              <input type="file" id="import-drafts-input" accept="application/json" class="sr-only" />
            </label>
          </div>
          <div>${draftItemsHtml}</div>
        </div>
      </div>

      <!-- Monetization / Go Pro Modal -->
      <div class="modal-backdrop" id="modal-pro" role="dialog" aria-modal="true">
        <div class="modal-card" style="max-width:860px;">
          <div class="modal-header">
            <h3>BidLift Plans — Free Forever vs. Pro &amp; Advanced Pro</h3>
            <button type="button" class="btn btn-ghost btn-sm" data-action="close-modal" data-modal="modal-pro">✕</button>
          </div>
          ${renderPricingCompareHtml(true)}

          <div class="card-box" style="margin-top:12px;">
            <div style="font-size:12.5px;font-weight:700;margin-bottom:6px;">
              ${state.isPro ? `✓ Active License: ${escapeHtml(state.proPlanLabel)}` : "Already purchased? Enter your license key:"}
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <input id="pro-license-input" type="text" placeholder="BL-PRO-XXXXXX-XXXX" style="flex:1;min-width:200px;padding:8px 10px;border-radius:8px;border:1px solid var(--border-strong);background:var(--bg-input);color:var(--text-primary);" />
              <button type="button" class="btn btn-primary btn-sm" data-action="activate-license">Activate</button>
              ${state.isPro ? `<button type="button" class="btn btn-outline btn-sm" data-action="deactivate-license">Reset to Free</button>` : ""}
            </div>
          </div>
        </div>
      </div>

      <!-- Zelle / Payment Instructions Modal -->
      <div class="modal-backdrop" id="modal-zelle" role="dialog" aria-modal="true">
        <div class="modal-card" style="max-width:460px;">
          <div class="modal-header">
            <h3>Deposit Payment Instructions</h3>
            <button type="button" class="btn btn-ghost btn-sm" data-action="close-modal" data-modal="modal-zelle">✕</button>
          </div>
          <p style="font-size:13px;color:var(--text-secondary);">Send your deposit using the details below and include your Verification ID:</p>
          <div class="code-box" id="zelle-details-box">${escapeHtml(p.paymentLink || p.businessEmail || "Contact business for deposit details")}</div>
          <div style="display:flex;gap:8px;margin-top:12px;">
            <button type="button" class="btn btn-primary" data-action="copy-zelle">${ICONS.copy} Copy Payment Info</button>
          </div>
        </div>
      </div>

      <!-- Tracked Cloud Quotes & Open Alerts Modal -->
      <div class="modal-backdrop" id="modal-cloud" role="dialog" aria-modal="true">
        <div class="modal-card" style="max-width:560px;">
          <div class="modal-header">
            <h3>Saved Cloud Quotes &amp; Open Alerts</h3>
            <button type="button" class="btn btn-ghost btn-sm" data-action="close-modal" data-modal="modal-cloud">✕</button>
          </div>
          ${cloudReady ? `
            ${cloudLoggedIn ? `
              <div class="cloud-status-card">
                <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
                  <div>
                    <strong style="font-size:13px;color:var(--success);">✓ Connected: ${escapeHtml(state.cloudSession.user?.email || "Contractor")}</strong>
                    <div style="font-size:12px;color:var(--text-muted);">Saved quotes generate short tracked links with instant view &amp; e-sign email alerts.</div>
                  </div>
                  <div style="display:flex;gap:6px;">
                    <button type="button" class="btn btn-outline btn-xs" data-action="cloud-signout">Sign Out</button>
                  </div>
                </div>
              </div>
              <div style="margin-top:12px;display:flex;justify-content:space-between;align-items:center;">
                <strong style="font-size:13px;">Recent Cloud Quotes (${state.cloudProposals.length})</strong>
                <button type="button" class="btn btn-primary btn-xs" data-action="publish-cloud-proposal">${ICONS.plus} Save &amp; Publish Current</button>
              </div>
              <div style="margin-top:8px;display:grid;gap:8px;">
                ${state.cloudProposals.length ? state.cloudProposals.map((cp) => `
                  <div class="draft-item">
                    <div>
                      <strong style="font-size:13px;">${escapeHtml(cp.project_title)}</strong>
                      <div style="font-size:11.5px;color:var(--text-muted);">${escapeHtml(cp.client_name || "Client")} • Status: <strong>${escapeHtml(cp.status)}</strong> • Views: <strong>${Number(cp.view_count || 0)}</strong></div>
                    </div>
                    <a class="btn btn-outline btn-xs" href="#p=${escapeHtml(cp.share_token)}" target="_blank">Open Link</a>
                  </div>
                `).join("") : `<p style="font-size:12.5px;color:var(--text-muted);">No cloud quotes published yet.</p>`}
              </div>
            ` : `
              <p style="font-size:13px;color:var(--text-secondary);margin:0 0 12px;">
                Sign in with a 1-click Magic Link email to sync quotes across phone &amp; laptop, send short tracked URLs, and receive instant alerts when clients view or sign.
              </p>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <input id="cloud-login-email" type="email" placeholder="you@company.com" style="flex:1;min-width:210px;padding:9px 11px;border-radius:8px;border:1px solid var(--border-strong);background:var(--bg-input);color:var(--text-primary);" />
                <button type="button" class="btn btn-primary btn-sm" data-action="cloud-magic-login">Send Magic Link</button>
              </div>
            `}
          ` : `
            <div class="cloud-status-card">
              <strong style="font-size:13.5px;display:block;margin-bottom:6px;">BidLift Advanced Pro — Cloud Sync &amp; Open Alerts</strong>
              <p style="margin:0 0 10px;font-size:12.5px;color:var(--text-secondary);line-height:1.55;">
                Upgrade to Advanced Pro for instant client view &amp; ESIGN alerts, short tracked proposal links, cross-device draft sync, and multi-user team seats. Need unlimited local quotes right now? Free Forever requires zero login.
              </p>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <button type="button" class="btn btn-primary btn-sm" data-action="open-modal" data-modal="modal-pro">Compare Plans &amp; Early Access</button>
              </div>
            </div>
          `}
        </div>
      </div>

      <!-- Legal / Privacy & ESIGN Modal -->
      <div class="modal-backdrop" id="modal-legal" role="dialog" aria-modal="true">
        <div class="modal-card" style="max-width:640px;">
          <div class="modal-header">
            <h3>Privacy Architecture &amp; ESIGN Terms</h3>
            <button type="button" class="btn btn-ghost btn-sm" data-action="close-modal" data-modal="modal-legal">✕</button>
          </div>
          <div style="font-size:13px;color:var(--text-secondary);line-height:1.65;display:flex;flex-direction:column;gap:12px;">
            <div>
              <strong style="color:var(--text-primary);">1. Zero-Server Privacy Policy (Zero PII Stored)</strong><br />
              BidLift operates 100% client-side in your web browser. Proposal text, client names, pricing, drafts, and signature images are stored strictly in your own browser storage or compressed inside the <code>#q=...</code> URL fragment (which browsers do not transmit in HTTP requests to origin servers). Optional cookie-free, strictly anonymous aggregate event counters (zero PII, zero client names, zero pricing, zero <code>#q=</code> fragments) may be recorded to measure template and conversion funnel reliability.
            </div>
            <div>
              <strong style="color:var(--text-primary);">2. Electronic Signature &amp; Audit Trail (ESIGN / UETA)</strong><br />
              By checking the electronic consent box and applying a digital signature, the signing party affirms intent to execute the proposal electronically and acknowledges that a cryptographic <code>SHA-256</code> digest binds the printed name, UTC timestamp, selected tier, optional upgrades, tax, total, and business terms at the time of signing.
            </div>
            <div>
              <strong style="color:var(--text-primary);">3. Direct Third-Party Deposit Payments</strong><br />
              BidLift does not custody funds or process credit cards. Any payment link opens the service provider's independent checkout processor (such as Stripe, Square, PayPal, Venmo, or Zelle) over verified <code>https://</code> links.
            </div>
            <div style="font-size:12px;color:var(--text-muted);">
              Questions or support: <a href="mailto:${escapeHtml(CONFIG.SUPPORT_EMAIL || "bidliftco@gmail.com")}" style="color:var(--brand);">${escapeHtml(CONFIG.SUPPORT_EMAIL || "bidliftco@gmail.com")}</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  const TEMPLATE_CATEGORY_ORDER = [
    "Home Trades & Construction",
    "AI, Tech & Digital Agencies",
    "Education, Coaching & Advisory",
    "Creative, Real Estate & Events"
  ];
  const HERO_QUICK_TEMPLATE_IDS = ["hvac", "agency", "ai_training", "tutoring"];

  function applyTemplateSelection(tplId) {
    if (!tplId || !TEMPLATES[tplId]) return;
    state.proposal = createProposalFromTemplate(tplId);
    state.selectedTierIdx = state.proposal.recommendedTierIndex ?? 1;
    state.approved = false;
    state.approvalReceipt = null;
    state.hasSignatureInk = false;
    state.signatureDataUrl = "";
    state.clientSignerName = "";
    state.clientSignerEmail = "";
    state.esignConsent = false;
    saveCurrentDraftLocal();
    renderApp();
    trackEvent("template_selected", { template_id: tplId });
    showToast(`Loaded "${TEMPLATES[tplId]?.label}" template`);
  }

  function renderTemplateDropdownHtml(selectedId) {
    const allTemplates = Object.values(TEMPLATES);
    const groups = new Map();
    TEMPLATE_CATEGORY_ORDER.forEach((cat) => groups.set(cat, []));
    allTemplates.forEach((tpl) => {
      const cat = tpl.category || "Other Services";
      if (!groups.has(cat)) groups.set(cat, []);
      groups.get(cat).push(tpl);
    });

    const optGroupsHtml = Array.from(groups.entries())
      .filter(([, list]) => list.length > 0)
      .map(([cat, list]) => `
        <optgroup label="${escapeHtml(cat)}">
          ${list.map((tpl) => `<option value="${escapeHtml(tpl.id)}" ${tpl.id === selectedId ? "selected" : ""}>${escapeHtml(tpl.label)}</option>`).join("")}
        </optgroup>
      `)
      .join("");

    const quickBtnsHtml = HERO_QUICK_TEMPLATE_IDS
      .filter((id) => TEMPLATES[id])
      .map((id) => {
        const tpl = TEMPLATES[id];
        return `
          <button type="button" class="template-pill ${id === selectedId ? "active" : ""}"
                  data-action="load-template" data-template-id="${escapeHtml(id)}">
            <span>${escapeHtml(tpl.label)}</span>
          </button>
        `;
      })
      .join("");

    return `
      <div class="template-dropdown-bar">
        <label class="template-select-wrap">
          <span class="template-select-label">Template (${allTemplates.length}):</span>
          <select id="template-dropdown" class="template-select" aria-label="Choose Industry Template">
            ${optGroupsHtml}
          </select>
        </label>
        <div class="template-quick-picks" aria-label="Popular Quick Templates">
          ${quickBtnsHtml}
        </div>
      </div>
    `;
  }

  function renderPricingCompareHtml(isModal) {
    const promoCode = CONFIG.PROMO_CODE || "PH30";
    const rows = [
      ["Unlimited Good / Better / Best Quotes", true, true, true],
      ["All 18 Industry, Tech, AI & Advisory Templates", true, true, true],
      ["Client-Toggleable Add-Ons & Monthly Financing Framing", true, true, true],
      ["ESIGN Consent + SHA-256 Verified PDF Receipt", true, true, true],
      ["0% Fee Direct Deposit Links (Stripe / PayPal / Zelle)", true, true, true],
      ["Browser Drafts & Local JSON Backup Export", true, true, true],
      ["100% White-Label (Removes BidLift Footer & Logo)", false, true, true],
      ["Multi-Currency & Custom Tax Presets", false, true, true],
      ["Short Tracked Client Proposal Links", false, false, true],
      ["Instant Client Open & E-Sign Email Alerts", false, false, true],
      ["Cross-Device Cloud Sync & Team Seats", false, false, true]
    ];
    const mark = (ok) => ok
      ? `<span class="chk-yes" aria-label="Included">✓</span>`
      : `<span class="chk-no" aria-label="Not included">✕</span>`;

    const innerHtml = `
      <div class="thanksgiving-banner">
        <div>
          <strong>Thanksgiving Deal Extended (Ends Nov 30):</strong> Use code <span class="thanksgiving-code">${escapeHtml(promoCode)}</span> for <strong>30% Off Pro</strong>. Need $0? You can stay on <strong>Free Forever</strong> with unlimited quotes.
        </div>
      </div>

      ${isModal ? "" : `
        <div class="pricing-section-head">
          <div>
            <h2>Simple Plans — Free Forever, Pro, and Advanced Pro</h2>
            <p class="pricing-free-reassurance">Use Free Forever without limits, upgrade to remove BidLift branding on client quotes, or join Advanced Pro for instant client open alerts.</p>
          </div>
          ${!state.isPro ? `<button type="button" class="btn btn-accent btn-sm" data-action="checkout-pro" data-plan="annual">Upgrade to Pro · 30% Off (${escapeHtml(promoCode)})</button>` : `<span class="pro-pill active-pro">✓ ${escapeHtml(state.proPlanLabel || "Pro Active")}</span>`}
        </div>
      `}

      <div class="pricing-grid">
        <div class="plan-box">
          <span class="plan-badge">Always $0</span>
          <strong>Free Forever</strong>
          <div class="plan-price">$0 <span style="font-size:12px;font-weight:500;color:var(--text-muted);">/ forever</span></div>
          <ul class="plan-bullets">
            <li>Unlimited 3-tier quotes &amp; all 18 templates</li>
            <li>SHA-256 ESIGN receipts &amp; PDF exports</li>
            <li>0% BidLift cut on direct deposit links</li>
          </ul>
          ${state.isPro
            ? `<button type="button" class="btn btn-outline btn-sm" style="margin-top:auto;" data-action="deactivate-license">Switch to Free Forever</button>`
            : isModal
              ? `<button type="button" class="btn btn-outline btn-sm" style="margin-top:auto;" data-action="close-modal" data-modal="modal-pro">✓ Active — Continue Free</button>`
              : `<span class="btn btn-outline btn-sm" style="margin-top:auto;cursor:default;">✓ Active — Free Forever</span>`}
        </div>

        <div class="plan-box featured">
          <span class="plan-badge">Most Popular · Save 56% Annual</span>
          <strong>Pro White-Label</strong>
          <div class="plan-price">${escapeHtml(CONFIG.PRO_PRICE_MONTHLY || "$19/mo")} <span style="font-size:12px;font-weight:600;color:var(--success);">or ${escapeHtml(CONFIG.PRO_PRICE_ANNUAL || "$99/yr")}</span></div>
          <ul class="plan-bullets">
            <li>Everything in Free Forever</li>
            <li>Removes all BidLift branding on client quotes</li>
            <li>Instant checkout unlock (code <strong>${escapeHtml(promoCode)}</strong> thru Nov 30)</li>
          </ul>
          <div style="display:grid;gap:6px;margin-top:auto;">
            <button type="button" class="btn btn-accent btn-sm" data-action="checkout-pro" data-plan="annual">Get Pro Annual (${escapeHtml(CONFIG.PRO_PRICE_ANNUAL || "$99/yr")})</button>
            <button type="button" class="btn btn-primary btn-sm" data-action="checkout-pro" data-plan="monthly">Get Pro Monthly (${escapeHtml(CONFIG.PRO_PRICE_MONTHLY || "$19/mo")})</button>
          </div>
        </div>

        <div class="plan-box">
          <span class="plan-badge">Team &amp; Alerts</span>
          <strong>Advanced Pro</strong>
          <div class="plan-price">${escapeHtml(CONFIG.PRO_ADVANCED_PRICE_MONTHLY || "$39/mo")} <span style="font-size:12px;font-weight:500;color:var(--text-muted);">or ${escapeHtml(CONFIG.PRO_ADVANCED_PRICE_ANNUAL || "$299/yr")}</span></div>
          <ul class="plan-bullets">
            <li>Everything in Pro White-Label</li>
            <li>Short tracked URLs + instant view/sign email alerts</li>
            <li>Cloud draft sync across devices &amp; team seats</li>
          </ul>
          <button type="button" class="btn btn-outline btn-sm" style="margin-top:auto;" data-action="checkout-pro" data-plan="advanced">Request Early Access →</button>
        </div>
      </div>

      <div class="pricing-compare-wrap">
        <table class="pricing-compare-table" aria-label="BidLift Plan Comparison">
          <thead>
            <tr>
              <th>Capability</th>
              <th>Free Forever ($0)</th>
              <th>Pro ($19/mo · $99/yr)</th>
              <th>Advanced Pro ($39/mo)</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map(([cap, f, p, a]) => `
              <tr>
                <td>${escapeHtml(cap)}</td>
                <td>${mark(f)}</td>
                <td>${mark(p)}</td>
                <td>${mark(a)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;

    return isModal
      ? innerHtml
      : `<section class="pricing-section no-print" id="pricing-compare" aria-label="Plans and Feature Comparison">${innerHtml}</section>`;
  }

  // =========================================================================
  // Below-the-Fold Studio Traction, ROI & FAQ Section (SEO & Conversion)
  // =========================================================================
  function renderStudioTractionHtml() {
    return `
      <section class="studio-traction-section no-print" aria-label="Why Interactive Quotes Convert Higher">
        <div class="traction-head">
          <h2>Built to Increase Customer Revenue From Quote #1</h2>
          <p>Why thousands of contractors, educators, agencies, and advisory teams switch from flat PDF estimates to Good / Better / Best interactive links.</p>
        </div>

        <div class="roi-grid">
          <div class="roi-card">
            <h3>${ICONS.bolt} 3-Option Price Anchoring</h3>
            <p>Sending a single flat price forces buyers into a yes/no discount debate. Showing Good / Better / Best side-by-side naturally steers ~55% of buyers to the middle Signature package and ~20% to top tier.</p>
          </div>
          <div class="roi-card">
            <h3>${ICONS.sparkle} Frictionless Self-Serve Upsells</h3>
            <p>Clients dislike feeling pushed on the phone, yet gladly click checkbox upgrades—rush delivery, extended warranties, drone aerials, or deep-clean extras—when they control the live total themselves.</p>
          </div>
          <div class="roi-card">
            <h3>${ICONS.shield} Zero Server PII &amp; ESIGN Proof</h3>
            <p>Zero logins, zero customer database leaks, and zero hosting bloat. Every approved quote locks pricing with ESIGN consent, a UTC timestamp, and a SHA-256 verification digest ready for deposit checkout.</p>
          </div>
        </div>

        <div class="faq-list">
          <details class="faq-item" open>
            <summary>Why do Good / Better / Best quotes raise average deal size by 20%–38%?</summary>
            <p>Instead of competing solely on lowest bid, three structured packages reframe the buyer's decision from "Should I hire them?" to "Which level of result fits me best?" Combined with checkbox upgrades and a fast-action booking bonus, average ticket value rises immediately.</p>
          </details>
          <details class="faq-item">
            <summary>Does BidLift store my client names, pricing, or signatures on a server?</summary>
            <p>Never. BidLift runs 100% locally in your browser. Proposals serialize directly into the compressed <code>#q=...</code> URL fragment, which web servers never see. You can also export/import your saved drafts as a local JSON backup anytime.</p>
          </details>
          <details class="faq-item">
            <summary>Are BidLift electronic signatures verifiable?</summary>
            <p>Yes. Clients must check an explicit ESIGN consent box before signing on the canvas. BidLift immediately computes a cryptographic SHA-256 integrity digest across the quote scope, totals, terms, and UTC timestamp for your PDF receipt.</p>
          </details>
          <details class="faq-item">
            <summary>How do I collect deposits right after my client signs?</summary>
            <p>Open <strong>4. Close</strong> in the builder, set your deposit percentage (e.g., 25%–50%), and paste your existing HTTPS Stripe Payment Link, Venmo, PayPal.me, Square link, or Zelle instructions. BidLift takes 0% transaction fees.</p>
          </details>
        </div>
        <div class="seo-templates-bar">
          <div class="seo-templates-head">
            <h3>Free Industry Templates &amp; Good / Better / Best Deal-Lift Calculator</h3>
            <p>Explore ready-to-customize multi-option proposal templates across 18 industries or calculate your exact revenue lift first.</p>
          </div>
          <div class="seo-links-grid">
            <a class="seo-link-chip is-primary" href="templates/good-better-best-pricing-calculator.html">GBB Profit &amp; Deal-Lift Calculator →</a>
            <a class="seo-link-chip" href="templates/">All 18 Templates Hub</a>
            <a class="seo-link-chip" href="templates/hvac-estimate-template.html">HVAC Estimate Template</a>
            <a class="seo-link-chip" href="templates/roofing-proposal-template.html">Roofing Proposal Template</a>
            <a class="seo-link-chip" href="templates/plumbing-quote-template.html">Plumbing Quote Template</a>
            <a class="seo-link-chip" href="templates/electrical-estimate-template.html">Electrical Estimate Template</a>
            <a class="seo-link-chip" href="templates/landscaping-proposal-template.html">Landscaping Proposal Template</a>
            <a class="seo-link-chip" href="templates/contractor-estimate-template.html">Contractor Remodel Template</a>
            <a class="seo-link-chip" href="templates/web-design-proposal-template.html">Web Design &amp; Agency Template</a>
            <a class="seo-link-chip" href="templates/cleaning-proposal-template.html">Cleaning Proposal Template</a>
          </div>
        </div>
      </section>

      ${renderPricingCompareHtml(false)}

      <footer class="studio-footer no-print">
        <div class="studio-footer-inner">
          <div>© ${new Date().getFullYear()} <strong>BidLift</strong> • Client-Private Interactive Proposal Studio</div>
          <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;">
            <a href="templates/" class="btn btn-ghost btn-sm">Free Templates</a>
            <a href="templates/good-better-best-pricing-calculator.html" class="btn btn-ghost btn-sm">Profit Calculator</a>
            <button type="button" class="btn btn-ghost btn-sm" data-action="open-modal" data-modal="modal-legal">Privacy Policy &amp; ESIGN Terms</button>
            <button type="button" class="btn btn-ghost btn-sm" data-action="open-modal" data-modal="modal-pro">Pricing</button>
            <a href="mailto:${escapeHtml(CONFIG.SUPPORT_EMAIL || "bidliftco@gmail.com")}" class="btn btn-ghost btn-sm">${escapeHtml(CONFIG.SUPPORT_EMAIL || "bidliftco@gmail.com")}</a>
          </div>
        </div>
      </footer>
    `;
  }

  // =========================================================================
  // Root Shell & Targeted Partial Updaters
  // =========================================================================
  function renderStudioShell() {
    const p = state.proposal;
    const cur = p.currency || "USD";
    const lift = calculateLiftMetrics(p);
    const cloudReady = Boolean(CLOUD && CLOUD.isConfigured());
    const templateDropdownHtml = renderTemplateDropdownHtml(p.id);

    return `
      <header class="topbar no-print">
        <div class="brand-lockup">
          <a href="${escapeHtml(getBaseStudioUrl())}" class="brand-home-link">
            <div class="brand-mark">${ICONS.bolt}</div>
            <div>
              <div class="brand-title">BidLift</div>
              <div class="brand-sub">Good / Better / Best Revenue Studio</div>
            </div>
          </a>
          <button type="button" class="pro-pill ${state.isPro ? "active-pro" : ""}" data-action="open-modal" data-modal="modal-pro">
            ${state.isPro ? "PRO WHITE-LABEL" : "Upgrade to Pro · 30% Off (PH30)"}
          </button>
        </div>

        <div class="topbar-actions">
          ${cloudReady ? `
            <button type="button" class="btn btn-outline btn-sm" data-action="open-modal" data-modal="modal-cloud">
              ${ICONS.bolt} ${state.cloudSession ? "Cloud ●" : "Saved Cloud"}
            </button>
          ` : ""}
          <button type="button" class="btn btn-outline btn-sm" data-action="open-modal" data-modal="modal-drafts">
            ${ICONS.folder} Drafts <span class="badge-count">${state.drafts.length}</span>
          </button>
          <button type="button" class="btn btn-outline btn-sm" data-action="open-embed-modal">
            ${ICONS.code} Embed
          </button>
          <button type="button" class="btn btn-outline btn-sm" data-action="toggle-theme" title="Toggle Dark/Light Theme">
            ${state.theme === "dark" ? ICONS.sun : ICONS.moon}
          </button>
          <button type="button" class="btn btn-primary" data-action="open-share-modal">
            ${ICONS.share} Share Client Link
          </button>
        </div>
      </header>

      <section class="hero-banner no-print ${state.heroCollapsed ? "collapsed" : ""}" id="hero-banner">
        <div class="hero-inner">
          <div class="hero-copy">
            ${state.heroCollapsed
              ? `<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;"><strong>Quick Switch:</strong> ${templateDropdownHtml}</div>`
              : `
                <h1>Turn Flat Quotes Into +28% Bigger Deals <span style="font-size:12px;padding:3px 9px;border-radius:999px;background:rgba(255,255,255,0.16);font-weight:700;">Zero Signup • Free Forever</span></h1>
                <p>Stop sending 1-price PDFs that push clients to shop on price. Pick from 18 industry templates—trades, AI consulting, tutoring, coaching, agencies—frame monthly options &amp; add-ons, and send a live ESIGN + deposit link in 60 seconds.</p>
                <div class="hero-cta-row">
                  <button type="button" class="btn btn-accent btn-sm" data-action="open-live-client-demo">${ICONS.bolt} Try Live Client View (Demo)</button>
                  <button type="button" class="btn btn-outline btn-sm hero-pro-btn" data-action="open-modal" data-modal="modal-pro">Free Forever vs. Pro (PH30 30% Off thru Nov 30)</button>
                  <a class="hero-calc-link" href="templates/good-better-best-pricing-calculator.html">GBB Profit Calculator →</a>
                  <a class="hero-calc-link" href="templates/">18 Free Industry Templates →</a>
                </div>
                ${templateDropdownHtml}
              `
            }
          </div>
          <button type="button" class="hero-toggle-btn" data-action="toggle-hero">
            ${state.heroCollapsed ? "Show Intro" : "Compact Bar"}
          </button>
        </div>
      </section>

      <div class="mobile-mode-bar no-print">
        <button type="button" class="mobile-mode-btn ${state.mobileView === "builder" ? "active" : ""}" data-action="set-mobile-view" data-view="builder">1. Edit Quote</button>
        <button type="button" class="mobile-mode-btn ${state.mobileView === "preview" ? "active" : ""}" data-action="set-mobile-view" data-view="preview">2. Live Client View</button>
      </div>

      <main class="studio-workspace" id="studio-workspace" data-mobile-view="${state.mobileView}">
        <aside class="builder-pane no-print">
          <div class="lift-coach" id="lift-coach">
            <div class="lift-coach-head">
              <span class="lift-badge">${ICONS.sparkle} Revenue-Lift Coach</span>
              <span class="lift-delta" id="lift-delta">+${formatMoney(lift.liftDollar, cur)}/deal (+${lift.liftPct}%)</span>
            </div>
            <div class="lift-metrics">
              <div class="lift-stat">
                <span>Old 1-Price Bid</span>
                <strong id="lift-flat">${formatMoney(lift.flatBase, cur)}</strong>
              </div>
              <div class="lift-stat">
                <span>Projected BidLift Avg</span>
                <strong id="lift-expected" style="color:var(--success);">${formatMoney(lift.expectedDeal, cur)}</strong>
              </div>
            </div>
          </div>

          <div class="quick-quote-box">
            <div class="quick-quote-head">
              <span>${ICONS.bolt} <strong>Quick-Quote from Messy Job Notes</strong></span>
              <button type="button" class="btn btn-ghost btn-xs" data-action="toggle-quick-quote">${state.quickQuoteOpen ? "Hide" : "Expand"}</button>
            </div>
            ${state.quickQuoteOpen ? `
              <div class="quick-quote-body">
                <textarea id="quick-notes-input" rows="2" placeholder="Paste rough notes (e.g. Sarah Johnson, 3-ton AC install at 410 Pine St, base $5800, add smart thermostat $350, duct cleaning $490)">${escapeHtml(state.quickNotesText)}</textarea>
                <div class="quick-quote-actions">
                  <div class="quick-presets">
                    <button type="button" class="btn btn-outline btn-xs" data-action="quick-preset" data-preset-note="Sarah Johnson, 3-ton AC install at 410 Pine St, base $5800, add smart thermostat $350, duct cleaning $490">HVAC $5.8k</button>
                    <button type="button" class="btn btn-outline btn-xs" data-action="quick-preset" data-preset-note="Marcus Reid, architectural roof replacement at 82 Cedar Rd, base $11500, add gutter guards $980, solar attic fan $640">Roof $11.5k</button>
                    <button type="button" class="btn btn-outline btn-xs" data-action="quick-preset" data-preset-note="Apex Dental, website redesign &amp; SEO funnel, base $3200, add conversion copywriting $600, Google Business 3-pack $450">Agency $3.2k</button>
                  </div>
                  <button type="button" class="btn btn-primary btn-xs" data-action="run-quick-quote">${ICONS.sparkle} Auto-Build 3 Tiers</button>
                </div>
              </div>
            ` : ""}
          </div>

          <nav class="builder-tabs" role="tablist">
            <button type="button" class="builder-tab ${state.activeTab === "business" ? "active" : ""}" data-action="switch-tab" data-tab="business">1. Brand</button>
            <button type="button" class="builder-tab ${state.activeTab === "tiers" ? "active" : ""}" data-action="switch-tab" data-tab="tiers">2. Services</button>
            <button type="button" class="builder-tab ${state.activeTab === "addons" ? "active" : ""}" data-action="switch-tab" data-tab="addons">3. Upsells</button>
            <button type="button" class="builder-tab ${state.activeTab === "close" ? "active" : ""}" data-action="switch-tab" data-tab="close">4. Close</button>
          </nav>

          <div class="builder-body" id="builder-body">
            ${renderBuilderBodyHtml()}
          </div>
        </aside>

        <section class="preview-pane">
          <div class="preview-chrome-bar no-print">
            <div class="preview-chrome-left">
              <span class="live-dot"></span>
              <span>Interactive Client View — Click packages, toggle upgrades &amp; test ESIGN below</span>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button type="button" class="btn btn-accent btn-sm" data-action="open-live-client-demo">${ICONS.external} Fullscreen Client View</button>
              <button type="button" class="btn btn-outline btn-sm" data-action="print-proposal">${ICONS.print} Print / PDF</button>
              <button type="button" class="btn btn-primary btn-sm" data-action="open-share-modal">${ICONS.share} Send to Client</button>
            </div>
          </div>
          <div id="proposal-preview-container">
            ${renderProposalSheetHtml(p, { isClientStandalone: false })}
          </div>
        </section>
      </main>

      ${renderStudioTractionHtml()}
      ${renderModalsHtml()}
    `;
  }

  function renderClientStandalone() {
    const p = state.proposal;
    const badgeRefHref = `${getBaseStudioUrl()}?ref=quote_badge&tpl=${encodeURIComponent(p.id || "contractor")}`;
    return `
      <div class="client-mode-wrapper ${state.embedMode ? "embed-mode" : ""}">
        ${!state.embedMode ? `
          <div class="client-floating-bar no-print">
            ${state.demoPreviewReturn
              ? `<button type="button" class="btn btn-primary btn-sm back-studio-btn" data-action="back-to-studio">← Customize This Quote in Studio</button>`
              : `
                <a href="${escapeHtml(badgeRefHref)}" class="viral-badge" title="Build your own interactive proposal free">
                  <span style="color:var(--accent);display:inline-flex;">${ICONS.bolt}</span>
                  <span>Built with <strong>BidLift</strong> • Send Good / Better / Best quotes free →</span>
                </a>
              `}
            <div style="display:flex;gap:8px;">
              <button type="button" class="btn btn-outline btn-sm" data-action="toggle-theme">${state.theme === "dark" ? ICONS.sun : ICONS.moon}</button>
              <button type="button" class="btn btn-outline btn-sm" data-action="print-proposal">${ICONS.print} Print / PDF</button>
            </div>
          </div>
        ` : ""}
        <div id="proposal-preview-container">
          ${renderProposalSheetHtml(p, { isClientStandalone: true })}
        </div>
      </div>
      ${renderModalsHtml()}
    `;
  }

  function renderAdminPortalView() {
    const m = state.adminMetrics;
    const isConfigured = Boolean(CLOUD && CLOUD.isConfigured());
    return `
      <div class="client-mode-wrapper">
        <div class="proposal-sheet" style="max-width:900px;padding:28px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:18px;">
            <div>
              <h2 style="font-size:22px;">BidLift Platform Telemetry</h2>
              <p style="margin:4px 0 0;font-size:13px;color:var(--text-secondary);">Restricted owner telemetry view.</p>
            </div>
            <a class="btn btn-outline btn-sm" href="${escapeHtml(getBaseStudioUrl())}">← Back to Studio</a>
          </div>
          ${!isConfigured ? `
            <div class="cloud-status-card">
              <strong>Cloud Telemetry Offline</strong>
              <p style="margin:6px 0 0;font-size:13px;color:var(--text-secondary);">Active quotes run strictly client-side in your browser.</p>
            </div>
          ` : state.adminError ? `
            <div class="cloud-status-card">
              <strong style="color:var(--danger);">${escapeHtml(state.adminError)}</strong>
            </div>
          ` : m ? `
            <div class="admin-kpi-grid">
              <div class="calc-kpi"><span>Total Contractors</span><strong class="mono">${Number(m.total_contractors || 0)}</strong></div>
              <div class="calc-kpi"><span>Pro Subscribers</span><strong class="mono">${Number(m.pro_subscribers || 0)}</strong></div>
              <div class="calc-kpi"><span>Total Cloud Quotes</span><strong class="mono">${Number(m.total_proposals || 0)}</strong></div>
              <div class="calc-kpi"><span>Total Client Views</span><strong class="mono">${Number(m.total_views || 0)}</strong></div>
              <div class="calc-kpi"><span>Signed Proposals</span><strong class="mono">${Number(m.signed_proposals || 0)}</strong></div>
              <div class="calc-kpi"><span>Gross Client Volume</span><strong class="mono">$${Number(m.gross_client_volume || 0).toLocaleString()}</strong></div>
            </div>
          ` : `<p>Loading platform metrics…</p>`}
        </div>
      </div>
    `;
  }

  function renderErrorView() {
    return `
      <div class="client-mode-wrapper" style="display:flex;align-items:center;justify-content:center;">
        <div class="proposal-sheet" style="max-width:520px;padding:32px;text-align:center;">
          <div class="brand-mark" style="margin:0 auto 14px;width:48px;height:48px;">${ICONS.bolt}</div>
          <h2 style="font-size:20px;margin-bottom:8px;">Proposal Link Incomplete or Corrupted</h2>
          <p style="color:var(--text-secondary);font-size:13.5px;margin-bottom:20px;">
            This BidLift proposal URL may have been cut off during messaging. Ask the sender to resend the full link, or build a fresh interactive quote in Studio.
          </p>
          <a href="${escapeHtml(getBaseStudioUrl())}" class="btn btn-primary btn-lg">Open BidLift Studio</a>
        </div>
      </div>
    `;
  }

  function refreshLiftCoach() {
    if (state.mode !== "studio" || !state.proposal) return;
    const cur = state.proposal.currency || "USD";
    const lift = calculateLiftMetrics(state.proposal);
    const dEl = document.getElementById("lift-delta");
    const fEl = document.getElementById("lift-flat");
    const eEl = document.getElementById("lift-expected");
    if (dEl) dEl.textContent = `+${formatMoney(lift.liftDollar, cur)}/deal (+${lift.liftPct}%)`;
    if (fEl) fEl.textContent = formatMoney(lift.flatBase, cur);
    if (eEl) eEl.textContent = formatMoney(lift.expectedDeal, cur);
  }

  function refreshPreviewOnly() {
    const container = document.getElementById("proposal-preview-container");
    if (!container || !state.proposal) return;
    container.innerHTML = renderProposalSheetHtml(state.proposal, {
      isClientStandalone: state.mode === "client"
    });
    initSignaturePad();
    refreshLiftCoach();
    startCountdownTicker();
  }

  function renderApp() {
    const root = document.getElementById("app");
    if (!root) return;
    applyBrandPalette(state.proposal);

    if (state.mode === "admin") {
      root.innerHTML = renderAdminPortalView();
    } else if (state.mode === "error") {
      root.innerHTML = renderErrorView();
    } else if (state.mode === "client") {
      root.innerHTML = renderClientStandalone();
      initSignaturePad();
      startCountdownTicker();
    } else {
      root.innerHTML = renderStudioShell();
      initSignaturePad();
      startCountdownTicker();
    }

    if (state.pendingToast) {
      const msg = state.pendingToast;
      state.pendingToast = "";
      showToast(msg);
    }
  }

  // =========================================================================
  // Signature Canvas Controller (HiDPI Retina Safe)
  // =========================================================================
  function initSignaturePad() {
    const canvas = document.getElementById("signature-canvas");
    if (!canvas) return;

    const dpr = Math.max(window.devicePixelRatio || 1, 1);
    const rect = canvas.getBoundingClientRect();
    const cssWidth = rect.width || 360;
    const cssHeight = rect.height || 125;

    canvas.width = Math.round(cssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);

    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = "#0f172a";

    const safeInk = sanitizeImageSrc(state.signatureDataUrl);
    if (safeInk && state.hasSignatureInk) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, cssWidth, cssHeight);
      };
      img.src = safeInk;
    }

    let drawing = false;
    let lastX = 0;
    let lastY = 0;

    function getPos(e) {
      const r = canvas.getBoundingClientRect();
      return {
        x: e.clientX - r.left,
        y: e.clientY - r.top
      };
    }

    canvas.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      canvas.setPointerCapture(e.pointerId);
      const pos = getPos(e);
      drawing = true;
      lastX = pos.x;
      lastY = pos.y;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 1.1, 0, Math.PI * 2);
      ctx.fillStyle = "#0f172a";
      ctx.fill();
      state.hasSignatureInk = true;
      const ph = document.getElementById("sig-placeholder");
      if (ph) ph.style.display = "none";
    });

    canvas.addEventListener("pointermove", (e) => {
      if (!drawing) return;
      e.preventDefault();
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      lastX = pos.x;
      lastY = pos.y;
    });

    const stopDraw = () => {
      if (!drawing) return;
      drawing = false;
      try {
        state.signatureDataUrl = canvas.toDataURL("image/png");
      } catch (err) {}
    };

    canvas.addEventListener("pointerup", stopDraw);
    canvas.addEventListener("pointercancel", stopDraw);
  }

  function refreshBuilderAndPreview() {
    saveCurrentDraftLocal();
    const body = document.getElementById("builder-body");
    if (body) body.innerHTML = renderBuilderBodyHtml();
    refreshPreviewOnly();
  }

  // =========================================================================
  // Event Delegation (Clicks, Inputs, Changes)
  // =========================================================================
  document.addEventListener("click", async (e) => {
    const target = e.target.closest("[data-action]");
    if (!target) {
      if (e.target.classList.contains("modal-backdrop")) {
        e.target.classList.remove("open");
      }
      return;
    }

    const action = target.dataset.action;

    if (action === "toggle-theme") {
      applyTheme(state.theme === "dark" ? "light" : "dark");
      renderApp();
      return;
    }

    if (action === "toggle-hero") {
      state.heroCollapsed = !state.heroCollapsed;
      try {
        localStorage.setItem(CONFIG.STORAGE_KEYS.HERO_COLLAPSED, state.heroCollapsed ? "1" : "0");
      } catch (err) {}
      renderApp();
      return;
    }

    if (action === "set-mobile-view") {
      state.mobileView = target.dataset.view;
      const ws = document.getElementById("studio-workspace");
      if (ws) ws.setAttribute("data-mobile-view", state.mobileView);
      document.querySelectorAll(".mobile-mode-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.view === state.mobileView);
      });
      if (state.mobileView === "preview") initSignaturePad();
      return;
    }

    if (action === "toggle-quick-quote") {
      state.quickQuoteOpen = !state.quickQuoteOpen;
      renderApp();
      return;
    }

    if (action === "quick-preset") {
      state.quickNotesText = target.dataset.presetNote || "";
      const box = document.getElementById("quick-notes-input");
      if (box) box.value = state.quickNotesText;
      const res = parseQuickQuoteNotes(state.quickNotesText);
      if (res) {
        state.proposal = res.proposal;
        state.selectedTierIdx = state.proposal.recommendedTierIndex ?? 1;
        state.approved = false;
        saveCurrentDraftLocal();
        renderApp();
        trackEvent("quick_quote_used", { template_id: res.tradeId, quick_quote_used: true });
        showToast(`Built 3 ${TEMPLATES[res.tradeId]?.label || ""} tiers + ${res.parsedAddonsCount} add-on(s)!`);
      }
      return;
    }

    if (action === "run-quick-quote") {
      const box = document.getElementById("quick-notes-input");
      const raw = (box ? box.value : state.quickNotesText || "").trim();
      if (!raw) {
        showToast("Type or pick a sample job note first (e.g. 'Sarah, HVAC install, base $5800').");
        if (box) box.focus();
        return;
      }
      state.quickNotesText = raw;
      const res = parseQuickQuoteNotes(raw);
      if (res) {
        state.proposal = res.proposal;
        state.selectedTierIdx = state.proposal.recommendedTierIndex ?? 1;
        state.approved = false;
        saveCurrentDraftLocal();
        renderApp();
        trackEvent("quick_quote_used", { template_id: res.tradeId, quick_quote_used: true });
        showToast(`Auto-built ${TEMPLATES[res.tradeId]?.label || ""} quote with ${res.parsedAddonsCount} parsed add-on(s)!`);
      }
      return;
    }

    if (action === "toggle-compare-matrix") {
      state.showCompareMatrix = !state.showCompareMatrix;
      if (state.showCompareMatrix) {
        trackEvent("compare_matrix_opened", { compare_matrix_opened: true });
      }
      refreshPreviewOnly();
      return;
    }

    if (action === "open-live-client-demo") {
      state.demoPreviewReturn = true;
      state.mode = "client";
      state.embedMode = false;
      renderApp();
      window.scrollTo({ top: 0, behavior: "smooth" });
      trackEvent("buyer_demo_opened", {
        template_id: state.proposal?.id || "custom",
        has_financing: Boolean(state.proposal?.financingEnabled)
      });
      return;
    }

    if (action === "back-to-studio") {
      state.demoPreviewReturn = false;
      state.mode = "studio";
      try {
        const u = new URL(window.location.href);
        if (u.searchParams.has("demo")) {
          u.searchParams.delete("demo");
          window.history.replaceState({}, "", `${u.pathname}${u.search}${u.hash}`);
        }
      } catch (err) {}
      renderApp();
      return;
    }

    if (action === "load-template") {
      applyTemplateSelection(target.dataset.templateId);
      return;
    }

    if (action === "switch-tab") {
      state.activeTab = target.dataset.tab;
      document.querySelectorAll(".builder-tab").forEach((b) => {
        b.classList.toggle("active", b.dataset.tab === state.activeTab);
      });
      const body = document.getElementById("builder-body");
      if (body) body.innerHTML = renderBuilderBodyHtml();
      return;
    }

    if (action === "pick-palette") {
      state.proposal.paletteId = target.dataset.paletteId;
      state.proposal.customBrandColor = "";
      saveCurrentDraftLocal();
      applyBrandPalette(state.proposal);
      const body = document.getElementById("builder-body");
      if (body) body.innerHTML = renderBuilderBodyHtml();
      refreshPreviewOnly();
      return;
    }

    if (action === "remove-logo") {
      state.proposal.logoData = "";
      saveCurrentDraftLocal();
      const body = document.getElementById("builder-body");
      if (body) body.innerHTML = renderBuilderBodyHtml();
      refreshPreviewOnly();
      return;
    }

    if (action === "set-recommended-tier") {
      state.proposal.recommendedTierIndex = Number(target.dataset.tierIdx);
      state.selectedTierIdx = state.proposal.recommendedTierIndex;
      saveCurrentDraftLocal();
      const body = document.getElementById("builder-body");
      if (body) body.innerHTML = renderBuilderBodyHtml();
      refreshPreviewOnly();
      return;
    }

    if (action === "scroll-to-section") {
      const targetEl = document.getElementById(target.dataset.target);
      if (targetEl) targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (action === "toggle-cat-form") {
      state.showCatForm = !state.showCatForm;
      state.editingCatIdx = -1;
      state.catForm = { name: "", category: "", qty: 1, unit: "job", unitPrice: 250, note: "" };
      const body = document.getElementById("builder-body");
      if (body) body.innerHTML = renderBuilderBodyHtml();
      return;
    }

    if (action === "cancel-cat-form") {
      state.showCatForm = false;
      state.editingCatIdx = -1;
      const body = document.getElementById("builder-body");
      if (body) body.innerHTML = renderBuilderBodyHtml();
      return;
    }

    if (action === "edit-cat-service") {
      const cIdx = Number(target.dataset.catIdx);
      const svc = state.serviceCatalog[cIdx];
      if (!svc) return;
      state.editingCatIdx = cIdx;
      state.showCatForm = true;
      state.catForm = deepClone(svc);
      const body = document.getElementById("builder-body");
      if (body) body.innerHTML = renderBuilderBodyHtml();
      return;
    }

    if (action === "save-cat-service") {
      const cf = state.catForm || {};
      const cleanName = String(cf.name || "").trim();
      if (!cleanName) {
        showToast("Please enter a service name.");
        const el = document.getElementById("cat-f-name");
        if (el) el.focus();
        return;
      }
      const entry = normalizeServiceItem(cf);
      if (state.editingCatIdx >= 0 && state.serviceCatalog[state.editingCatIdx]) {
        entry.id = state.serviceCatalog[state.editingCatIdx].id;
        state.serviceCatalog[state.editingCatIdx] = entry;
        showToast(`Updated "${entry.name}" in My Services Library`);
      } else {
        state.serviceCatalog.unshift(entry);
        showToast(`Added "${entry.name}" to My Services Library`);
      }
      saveServiceCatalog();
      state.showCatForm = false;
      state.editingCatIdx = -1;
      state.catForm = { name: "", category: "", qty: 1, unit: "job", unitPrice: 250, note: "" };
      const body = document.getElementById("builder-body");
      if (body) body.innerHTML = renderBuilderBodyHtml();
      return;
    }

    if (action === "delete-cat-service") {
      const cIdx = Number(target.dataset.catIdx);
      state.serviceCatalog.splice(cIdx, 1);
      if (state.editingCatIdx === cIdx) {
        state.editingCatIdx = -1;
        state.showCatForm = false;
      }
      saveServiceCatalog();
      const body = document.getElementById("builder-body");
      if (body) body.innerHTML = renderBuilderBodyHtml();
      showToast("Service removed from library.");
      return;
    }

    if (action === "load-starter-services") {
      const starters = (window.BIDLIFT_STARTER_SERVICES && window.BIDLIFT_STARTER_SERVICES[state.proposal.id || "contractor"])
        || (window.BIDLIFT_STARTER_SERVICES && window.BIDLIFT_STARTER_SERVICES.contractor)
        || [];
      const existingNames = new Set(state.serviceCatalog.map((s) => s.name.trim().toLowerCase()));
      let added = 0;
      starters.forEach((st) => {
        if (!existingNames.has(String(st.name || "").trim().toLowerCase())) {
          state.serviceCatalog.push(normalizeServiceItem(st));
          existingNames.add(String(st.name || "").trim().toLowerCase());
          added += 1;
        }
      });
      saveServiceCatalog();
      const body = document.getElementById("builder-body");
      if (body) body.innerHTML = renderBuilderBodyHtml();
      showToast(added > 0 ? `Loaded ${added} trade starter services into library!` : "Trade starter services already in library.");
      return;
    }

    if (action === "save-quote-services-to-catalog") {
      const existingNames = new Set(state.serviceCatalog.map((s) => s.name.trim().toLowerCase()));
      let added = 0;
      (state.proposal.tiers || []).forEach((t) => {
        (t.lineItems || []).forEach((it) => {
          const nm = String(it.name || "").trim();
          if (nm && !existingNames.has(nm.toLowerCase())) {
            state.serviceCatalog.push(normalizeServiceItem(it));
            existingNames.add(nm.toLowerCase());
            added += 1;
          }
        });
      });
      saveServiceCatalog();
      const body = document.getElementById("builder-body");
      if (body) body.innerHTML = renderBuilderBodyHtml();
      showToast(added > 0 ? `Saved ${added} quote service(s) to your library!` : "All current quote services are already saved.");
      return;
    }

    if (action === "save-item-to-catalog") {
      const tIdx = Number(target.dataset.tierIdx);
      const lIdx = Number(target.dataset.lineIdx);
      const item = state.proposal.tiers[tIdx]?.lineItems?.[lIdx];
      if (!item || !(item.name || "").trim()) {
        showToast("Enter a service name before saving to library.");
        return;
      }
      state.serviceCatalog.unshift(normalizeServiceItem(item));
      saveServiceCatalog();
      const body = document.getElementById("builder-body");
      if (body) body.innerHTML = renderBuilderBodyHtml();
      showToast(`Saved "${item.name}" to My Services Library!`);
      return;
    }

    if (action === "catalog-to-tier") {
      const cIdx = Number(target.dataset.catIdx);
      const tIdx = Number(target.dataset.tierIdx);
      const svc = state.serviceCatalog[cIdx];
      const tier = state.proposal.tiers[tIdx];
      if (!svc || !tier) return;
      if (!Array.isArray(tier.lineItems)) tier.lineItems = [];
      if (tier.lineItems.length >= 15) {
        showToast("Maximum 15 service items per package.");
        return;
      }
      tier.lineItems.push(normalizeServiceItem(svc));
      syncTierPriceFromItems(tier);
      state.selectedTierIdx = tIdx;
      refreshBuilderAndPreview();
      showToast(`Added "${svc.name}" to ${tier.name || `Option ${tIdx + 1}`}`);
      return;
    }

    if (action === "catalog-to-addon") {
      const cIdx = Number(target.dataset.catIdx);
      const svc = state.serviceCatalog[cIdx];
      if (!svc) return;
      if (!Array.isArray(state.proposal.addons)) state.proposal.addons = [];
      state.proposal.addons.push({
        id: `addon-${Date.now()}`,
        title: svc.name,
        description: svc.note || "",
        category: svc.category || "Upgrade",
        qty: Math.max(1, Number(svc.qty) || 1),
        unit: svc.unit || "pkg",
        price: getLineItemTotal(svc),
        selected: false
      });
      refreshBuilderAndPreview();
      showToast(`Added "${svc.name}" to Optional Upsells!`);
      return;
    }

    if (action === "add-tier") {
      if ((state.proposal.tiers || []).length >= 3) return;
      state.proposal.tiers.push({
        name: `Package ${state.proposal.tiers.length + 1}`,
        subtitle: "Expanded service option",
        price: 2500,
        timeline: "5 Days",
        autoCalcPrice: true,
        features: ["Full core scope included", "Priority scheduling support"],
        lineItems: [
          normalizeServiceItem({ name: "Core Project Delivery", category: "Core Scope", qty: 1, unit: "pkg", unitPrice: 2000, note: "Primary materials, labor & quality supervision" }),
          normalizeServiceItem({ name: "Priority Prep & Cleanup", category: "Prep & Care", qty: 1, unit: "job", unitPrice: 500, note: "Dedicated scheduling & final walkthrough" })
        ]
      });
      state.proposal.singleTierMode = false;
      refreshBuilderAndPreview();
      return;
    }

    if (action === "remove-tier") {
      if ((state.proposal.tiers || []).length <= 1) return;
      const tIdx = Number(target.dataset.tierIdx);
      state.proposal.tiers.splice(tIdx, 1);
      const maxIdx = state.proposal.tiers.length - 1;
      state.proposal.recommendedTierIndex = Math.min(maxIdx, Math.max(0, Number(state.proposal.recommendedTierIndex) || 0));
      state.selectedTierIdx = Math.min(maxIdx, Math.max(0, state.selectedTierIdx));
      saveCurrentDraftLocal();
      const body = document.getElementById("builder-body");
      if (body) body.innerHTML = renderBuilderBodyHtml();
      refreshPreviewOnly();
      return;
    }

    if (action === "add-feature") {
      const tIdx = Number(target.dataset.tierIdx);
      state.proposal.tiers[tIdx].features.push("Additional included deliverable");
      saveCurrentDraftLocal();
      const body = document.getElementById("builder-body");
      if (body) body.innerHTML = renderBuilderBodyHtml();
      refreshPreviewOnly();
      return;
    }

    if (action === "remove-feature") {
      const tIdx = Number(target.dataset.tierIdx);
      const fIdx = Number(target.dataset.featIdx);
      state.proposal.tiers[tIdx].features.splice(fIdx, 1);
      saveCurrentDraftLocal();
      const body = document.getElementById("builder-body");
      if (body) body.innerHTML = renderBuilderBodyHtml();
      refreshPreviewOnly();
      return;
    }

    if (action === "add-line-item") {
      const tIdx = Number(target.dataset.tierIdx);
      const tier = state.proposal.tiers[tIdx];
      if (!tier) return;
      if (!Array.isArray(tier.lineItems)) tier.lineItems = [];
      if (tier.lineItems.length >= 15) {
        showToast("Maximum 15 service items per package.");
        return;
      }
      tier.lineItems.push(normalizeServiceItem({
        name: "Custom Service Line",
        category: "Service",
        qty: 1,
        unit: "job",
        unitPrice: 250,
        note: ""
      }));
      syncTierPriceFromItems(tier);
      refreshBuilderAndPreview();
      return;
    }

    if (action === "remove-line-item") {
      const tIdx = Number(target.dataset.tierIdx);
      const lIdx = Number(target.dataset.lineIdx);
      const tier = state.proposal.tiers[tIdx];
      if (!tier || !Array.isArray(tier.lineItems)) return;
      tier.lineItems.splice(lIdx, 1);
      syncTierPriceFromItems(tier);
      refreshBuilderAndPreview();
      return;
    }

    if (action === "convert-features-to-items") {
      const tIdx = Number(target.dataset.tierIdx);
      const tier = state.proposal.tiers[tIdx];
      if (!tier) return;
      const bullets = (tier.features || []).filter((f) => f && f.trim());
      tier.autoCalcPrice = false;
      tier.lineItems = bullets.map((b, idx) => normalizeServiceItem({
        name: b.slice(0, 100),
        category: idx === 0 ? "Core Scope" : "Included",
        qty: 1,
        unit: "item",
        unitPrice: idx === 0 ? Number(tier.price) || 0 : 0,
        note: ""
      }));
      refreshBuilderAndPreview();
      showToast(`Converted ${tier.lineItems.length} bullets into itemized services!`);
      return;
    }

    if (action === "add-addon") {
      state.proposal.addons.push({
        id: `addon-${Date.now()}`,
        title: "Priority Service Upgrade",
        description: "Optional add-on to elevate final results.",
        category: "Upgrade",
        qty: 1,
        unit: "pkg",
        price: 250,
        selected: false
      });
      refreshBuilderAndPreview();
      return;
    }

    if (action === "remove-addon") {
      const aIdx = Number(target.dataset.addonIdx);
      state.proposal.addons.splice(aIdx, 1);
      saveCurrentDraftLocal();
      const body = document.getElementById("builder-body");
      if (body) body.innerHTML = renderBuilderBodyHtml();
      refreshPreviewOnly();
      return;
    }

    if (action === "set-deposit-pct") {
      state.proposal.depositPercent = Number(target.dataset.pct);
      saveCurrentDraftLocal();
      const body = document.getElementById("builder-body");
      if (body) body.innerHTML = renderBuilderBodyHtml();
      refreshPreviewOnly();
      return;
    }

    // Proposal Preview & Client Interactions
    if (action === "select-tier") {
      if (state.approved) return;
      state.selectedTierIdx = Number(target.dataset.tierIdx);
      if (state.mode === "client") {
        trackEvent("client_tier_changed", { tier_index: state.selectedTierIdx });
      }
      refreshPreviewOnly();
      return;
    }

    if (action === "toggle-addon") {
      if (state.approved) return;
      const aIdx = Number(target.dataset.addonIdx);
      if (state.proposal.addons[aIdx]) {
        state.proposal.addons[aIdx].selected = !state.proposal.addons[aIdx].selected;
        if (state.mode === "studio") {
          saveCurrentDraftLocal();
        } else if (state.mode === "client") {
          const selectedCount = (state.proposal.addons || []).filter((a) => a.selected).length;
          trackEvent("client_addon_toggled", { selected_addons_count: selectedCount });
        }
        refreshPreviewOnly();
      }
      return;
    }

    if (action === "clear-signature") {
      state.hasSignatureInk = false;
      state.signatureDataUrl = "";
      initSignaturePad();
      const ph = document.getElementById("sig-placeholder");
      if (ph) ph.style.display = "";
      return;
    }

    if (action === "approve-proposal") {
      const nameInput = document.getElementById("client-signer-name");
      const emailInput = document.getElementById("client-signer-email");
      const noteInput = document.getElementById("client-signer-note");
      const consentInput = document.getElementById("client-esign-consent");

      const signerName = (nameInput ? nameInput.value : state.clientSignerName || "").trim();
      const signerEmail = (emailInput ? emailInput.value : state.clientSignerEmail || "").trim();
      const signerNote = (noteInput ? noteInput.value : state.clientSignerNote || "").trim();
      const consentChecked = Boolean(consentInput ? consentInput.checked : state.esignConsent);

      if (!signerName) {
        showToast("Please enter your full name before signing.");
        if (nameInput) nameInput.focus();
        return;
      }
      if (!state.hasSignatureInk) {
        showToast("Please draw your signature in the box first.");
        return;
      }
      if (!consentChecked) {
        showToast("Please check the ESIGN electronic signature consent box.");
        if (consentInput) consentInput.focus();
        return;
      }

      const p = state.proposal;
      const totals = calculateTotals(p);
      const isoTimestamp = new Date().toISOString();

      const integrityPayload = {
        quoteNumber: p.quoteNumber || "",
        businessName: p.businessName || "",
        clientName: p.clientName || "",
        tierName: totals.chosenTier?.name || "",
        lineItems: Array.isArray(totals.chosenTier?.lineItems)
          ? totals.chosenTier.lineItems.map((it) => ({ name: it.name, qty: it.qty, unit: it.unit, unitPrice: it.unitPrice }))
          : [],
        addons: totals.selectedAddons.map((a) => ({ title: a.title, price: a.price })),
        subtotal: totals.subtotal,
        discount: totals.discountApplied,
        taxRate: totals.taxRate,
        taxAmount: totals.taxAmount,
        total: totals.total,
        terms: p.terms || "",
        signerName,
        signerEmail,
        isoTimestamp
      };
      const sha256Digest = await computeSha256Fingerprint(integrityPayload);

      state.clientSignerName = signerName;
      state.clientSignerEmail = signerEmail;
      state.clientSignerNote = signerNote;
      state.esignConsent = true;
      state.approved = true;
      state.approvalReceipt = {
        verificationId: generateVerificationId(signerName, totals.total),
        sha256Digest,
        signerName,
        signerEmail,
        note: signerNote,
        isoTimestamp,
        tierName: totals.chosenTier?.name || "Selected Option",
        tierIndex: totals.chosenTierIdx,
        basePrice: totals.basePrice,
        lineItems: deepClone(totals.chosenTier?.lineItems || []),
        addons: deepClone(totals.selectedAddons),
        taxRate: totals.taxRate,
        taxLabel: totals.taxLabel,
        taxAmount: totals.taxAmount,
        total: totals.total,
        depositDue: totals.depositDue,
        signatureDataUrl: state.signatureDataUrl
      };
      if (state.activeCloudToken && CLOUD && CLOUD.isConfigured()) {
        try {
          await CLOUD.submitCloudAcceptance(state.activeCloudToken, state.approvalReceipt, totals);
        } catch (err) {}
      }
      refreshPreviewOnly();
      trackEvent("proposal_signed", {
        tier_index: totals.chosenTierIdx,
        selected_addons_count: totals.selectedAddons.length,
        has_deposit_cta: Boolean(sanitizeHttpsUrl(p.paymentLink) || p.paymentProvider === "zelle")
      });
      showToast("Proposal approved with verified ESIGN SHA-256 audit!");
      return;
    }

    if (action === "reset-approval") {
      state.approved = false;
      state.approvalReceipt = null;
      refreshPreviewOnly();
      return;
    }

    if (action === "copy-sms-receipt") {
      const rec = state.approvalReceipt;
      if (!rec) return;
      const cur = state.proposal.currency || "USD";
      const addonSummary = rec.addons.length ? ` + ${rec.addons.map((a) => a.title).join(", ")}` : "";
      const txt = `Approved ${state.proposal.projectTitle} (${rec.tierName}${addonSummary}) for ${formatMoney(rec.total, cur)}. Signed by ${rec.signerName} [${rec.verificationId} | SHA256:${rec.sha256Digest.slice(0, 12)}].`;
      copyText(txt, "SMS acceptance receipt copied!");
      return;
    }

    if (action === "print-proposal") {
      window.print();
      return;
    }

    // Share & Embed Modals
    if (action === "open-share-modal" || action === "open-embed-modal") {
      state.shareTab = action === "open-embed-modal" ? "embed" : "link";
      state.cloudShareUrl = "";
      const encoded = await CODEC.encodeProposal(state.proposal);
      state.shareUrl = `${getBaseStudioUrl()}#q=${encoded}`;
      renderApp();
      trackEvent("share_link_created", {
        share_mode: state.shareTab,
        tier_count: (state.proposal.tiers || []).length,
        addon_count: (state.proposal.addons || []).length,
        currency: state.proposal.currency || "USD",
        has_deposit_link: Boolean(sanitizeHttpsUrl(state.proposal.paymentLink) || state.proposal.paymentProvider === "zelle")
      });
      const modal = document.getElementById("modal-share");
      if (modal) modal.classList.add("open");
      return;
    }

    if (action === "publish-cloud-proposal") {
      if (!CLOUD || !CLOUD.isConfigured()) {
        showToast("Short tracked links require BidLift Advanced Pro.");
        return;
      }
      try {
        const created = await CLOUD.publishCloudProposal(state.proposal);
        state.cloudShareUrl = `${getBaseStudioUrl()}#p=${encodeURIComponent(created.share_token)}`;
        state.cloudProposals = await CLOUD.listMyCloudProposals();
        renderApp();
        const modal = document.getElementById("modal-share");
        if (modal) modal.classList.add("open");
        trackEvent("share_link_created", { share_mode: "cloud_short", cloud_mode: true });
        showToast("Short cloud link #p= published with open/sign alerts!");
      } catch (err) {
        showToast(err.message || "Cloud publish failed.");
      }
      return;
    }

    if (action === "copy-cloud-share-url") {
      if (state.cloudShareUrl) {
        copyText(state.cloudShareUrl, "Short Cloud proposal link copied!");
      }
      return;
    }

    if (action === "cloud-magic-login") {
      const emailInput = document.getElementById("cloud-login-email");
      const rawEmail = emailInput ? emailInput.value : "";
      if (!CLOUD) return;
      try {
        await CLOUD.signInMagicLink(rawEmail);
        showToast("Check your email for your 1-click BidLift Cloud sign-in link!");
      } catch (err) {
        showToast(err.message || "Unable to send sign-in email.");
      }
      return;
    }

    if (action === "cloud-signout") {
      if (CLOUD) await CLOUD.signOut();
      state.cloudSession = null;
      state.cloudProposals = [];
      renderApp();
      showToast("Signed out.");
      return;
    }

    if (action === "switch-share-tab") {
      state.shareTab = target.dataset.tab;
      const lp = document.getElementById("share-panel-link");
      const ep = document.getElementById("share-panel-embed");
      if (lp) lp.style.display = state.shareTab === "link" ? "" : "none";
      if (ep) ep.style.display = state.shareTab === "embed" ? "" : "none";
      target.parentElement.querySelectorAll("button").forEach((btn) => {
        btn.classList.toggle("btn-primary", btn.dataset.tab === state.shareTab);
        btn.classList.toggle("btn-outline", btn.dataset.tab !== state.shareTab);
      });
      return;
    }

    if (action === "copy-share-url") {
      copyText(state.shareUrl, "Client proposal link copied!");
      return;
    }

    if (action === "copy-rich-email-link") {
      const p = state.proposal;
      const activeUrl = state.cloudShareUrl || state.shareUrl;
      const linkLabel = `View Your Custom Interactive Proposal — ${p.projectTitle || "Project"}`;
      const htmlStr = `<a href="${escapeHtml(activeUrl)}">${escapeHtml(linkLabel)} →</a>`;
      const plainStr = `${linkLabel}: ${activeUrl}`;
      (async () => {
        try {
          if (navigator.clipboard && navigator.clipboard.write && typeof ClipboardItem !== "undefined") {
            await navigator.clipboard.write([
              new ClipboardItem({
                "text/html": new Blob([htmlStr], { type: "text/html" }),
                "text/plain": new Blob([plainStr], { type: "text/plain" })
              })
            ]);
            showToast("Clean clickable email link copied!");
            return;
          }
        } catch (err) {}
        copyText(activeUrl, "Client proposal link copied!");
      })();
      return;
    }

    if (action === "copy-pitch-text") {
      const p = state.proposal;
      const pitch = `Hi ${(p.clientName || "there").split(/\s+/)[0]}, here is your custom interactive proposal for ${p.projectTitle || "your project"}. You can compare packages, toggle optional upgrades, and lock in your start date in 60 seconds: ${state.cloudShareUrl || state.shareUrl}`;
      copyText(pitch, "Pitch message + link copied!");
      return;
    }

    if (action === "copy-embed-code") {
      const embedUrl = `${state.shareUrl}&embed=1`;
      const snippet = `<iframe src="${embedUrl}" width="100%" height="920" style="border:0;border-radius:16px;box-shadow:0 12px 32px rgba(0,0,0,0.08);" loading="lazy"></iframe>`;
      copyText(snippet, "Website embed code copied!");
      return;
    }

    // Drafts Management
    if (action === "open-modal") {
      const m = document.getElementById(target.dataset.modal);
      if (m) m.classList.add("open");
      if (target.dataset.modal === "modal-pro") {
        trackEvent("pro_modal_opened");
      }
      return;
    }

    if (action === "close-modal") {
      const m = document.getElementById(target.dataset.modal);
      if (m) m.classList.remove("open");
      return;
    }

    if (action === "save-draft") {
      const p = deepClone(state.proposal);
      const entry = {
        id: `draft-${Date.now()}`,
        title: `${p.projectTitle || "Proposal"} — ${p.clientName || "Client"}`,
        savedAt: Date.now(),
        proposal: p
      };
      state.drafts.unshift(entry);
      saveDraftsList();
      renderApp();
      showToast("Saved quote to local browser drafts!");
      return;
    }

    if (action === "load-draft") {
      const idx = Number(target.dataset.draftIdx);
      if (state.drafts[idx]) {
        state.proposal = normalizeProposalServices(deepClone(state.drafts[idx].proposal));
        state.proposal.whiteLabel = state.isPro;
        state.selectedTierIdx = state.proposal.recommendedTierIndex ?? 1;
        state.approved = false;
        saveCurrentDraftLocal();
        renderApp();
        showToast("Draft loaded into Studio!");
      }
      return;
    }

    if (action === "delete-draft") {
      const idx = Number(target.dataset.draftIdx);
      state.drafts.splice(idx, 1);
      saveDraftsList();
      renderApp();
      const m = document.getElementById("modal-drafts");
      if (m) m.classList.add("open");
      showToast("Draft removed.");
      return;
    }

    if (action === "export-drafts-json") {
      const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), current: state.proposal, drafts: state.drafts }, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `bidlift-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Downloaded local backup JSON!");
      return;
    }

    // Monetization / Pro License
    if (action === "checkout-pro") {
      const plan = target.dataset.plan === "annual"
        ? "annual"
        : (target.dataset.plan === "advanced" ? "advanced" : "monthly");
      trackEvent("pro_checkout_clicked", { plan });
      if (plan === "advanced") {
        const supportEmail = CONFIG.SUPPORT_EMAIL || "bidliftco@gmail.com";
        const subj = encodeURIComponent("BidLift Advanced Pro Early Access (PH30)");
        const body = encodeURIComponent("Hi BidLift Team,\n\nI'd like Early Access to BidLift Advanced Pro (tracked short links, instant open alerts & cloud sync) with promo code PH30.\n");
        window.location.href = `mailto:${supportEmail}?subject=${subj}&body=${body}`;
        showToast(`Opening Advanced Pro Early Access request to ${supportEmail}`);
        return;
      }
      const rawUrl = plan === "annual" ? CONFIG.CHECKOUT_PRO_ANNUAL_LINK : CONFIG.CHECKOUT_PRO_MONTHLY_LINK;
      const safeUrl = sanitizeHttpsUrl(rawUrl);
      if (safeUrl) {
        window.open(safeUrl, "_blank", "noopener,noreferrer");
      } else {
        showToast(`Checkout links unavailable right now—email ${CONFIG.SUPPORT_EMAIL || "bidliftco@gmail.com"} for instant activation.`);
      }
      return;
    }

    if (action === "activate-license") {
      const input = document.getElementById("pro-license-input");
      const val = (input ? input.value : "").trim().toUpperCase();
      if (verifyLicenseKey(val)) {
        activateProState(val, "Pro White-Label License");
        trackEvent("pro_unlocked", { method: "manual", plan: val.startsWith("BL-PRO-A") ? "annual" : "monthly" });
        renderApp();
        showToast("Pro White-Label unlocked! BidLift footer removed.");
      } else {
        showToast("Invalid license key format. Check your order confirmation receipt.");
      }
      return;
    }

    if (action === "deactivate-license") {
      state.isPro = false;
      state.proPlanLabel = "";
      state.proposal.whiteLabel = false;
      try {
        localStorage.removeItem(CONFIG.STORAGE_KEYS.PRO_LICENSE);
      } catch (err) {}
      saveCurrentDraftLocal();
      renderApp();
      showToast("Switched back to Starter Free plan.");
      return;
    }

    if (action === "show-zelle-info") {
      const m = document.getElementById("modal-zelle");
      if (m) m.classList.add("open");
      return;
    }

    if (action === "copy-zelle") {
      copyText(state.proposal.paymentLink || state.proposal.businessEmail || "", "Payment info copied!");
      return;
    }
  });

  // Live Input Binding (Updates Preview + Lift Coach cleanly WITHOUT resetting Builder focus)
  document.addEventListener("input", (e) => {
    const el = e.target;

    if (el.id === "client-signer-name") {
      state.clientSignerName = el.value;
      return;
    }
    if (el.id === "client-signer-email") {
      state.clientSignerEmail = el.value;
      return;
    }
    if (el.id === "client-signer-note") {
      state.clientSignerNote = el.value;
      return;
    }

    if (el.id === "quick-notes-input") {
      state.quickNotesText = el.value;
      return;
    }

    if (state.mode !== "studio" || !state.proposal) return;

    if (el.id === "f-color-picker") {
      state.proposal.customBrandColor = el.value;
      const textBox = document.getElementById("f-custom-color");
      if (textBox) textBox.value = el.value;
      applyBrandPalette(state.proposal);
      saveCurrentDraftLocal();
      refreshPreviewOnly();
      return;
    }

    if (el.dataset.trustIdx !== undefined) {
      const idx = Number(el.dataset.trustIdx);
      if (!Array.isArray(state.proposal.trustBadges)) state.proposal.trustBadges = ["", "", ""];
      state.proposal.trustBadges[idx] = el.value;
      saveCurrentDraftLocal();
      refreshPreviewOnly();
      return;
    }

    if (el.dataset.bind) {
      const field = el.dataset.bind;
      state.proposal[field] = el.type === "number" || el.type === "range" ? Number(el.value) || 0 : el.value;
      if (field === "depositPercent") {
        const lbl = el.previousElementSibling?.querySelector("strong");
        if (lbl) lbl.textContent = `${state.proposal.depositPercent}%`;
      }
      if (field === "customBrandColor") applyBrandPalette(state.proposal);
      saveCurrentDraftLocal();
      refreshPreviewOnly();
      return;
    }

    if (el.dataset.catField) {
      const field = el.dataset.catField;
      if (!state.catForm) state.catForm = { name: "", category: "", qty: 1, unit: "job", unitPrice: 250, note: "" };
      state.catForm[field] = el.type === "number" ? Math.max(0, Number(el.value) || 0) : el.value;
      return;
    }

    if (el.dataset.tierBind) {
      const [tIdxStr, key] = el.dataset.tierBind.split(":");
      const tIdx = Number(tIdxStr);
      const tier = state.proposal.tiers[tIdx];
      if (tier) {
        tier[key] = el.type === "number" ? Number(el.value) || 0 : el.value;
        if (key === "price" && tier.autoCalcPrice) {
          tier.autoCalcPrice = false;
          const autoCb = document.querySelector(`input[data-tier-autocalc="${tIdx}"]`);
          if (autoCb) autoCb.checked = false;
        }
        saveCurrentDraftLocal();
        refreshPreviewOnly();
      }
      return;
    }

    if (el.dataset.lineBind) {
      const [tIdxStr, lIdxStr, key] = el.dataset.lineBind.split(":");
      const tIdx = Number(tIdxStr);
      const lIdx = Number(lIdxStr);
      const tier = state.proposal.tiers[tIdx];
      const item = tier?.lineItems?.[lIdx];
      if (item) {
        item[key] = el.type === "number" ? Math.max(0, Number(el.value) || 0) : el.value;
        const cur = state.proposal.currency || "USD";
        const lineAmt = getLineItemTotal(item);
        const lineSumEl = document.getElementById(`line-sum-${tIdx}-${lIdx}`);
        if (lineSumEl) lineSumEl.textContent = lineAmt > 0 ? formatMoney(lineAmt, cur) : "Incl.";

        const itemsSum = getTierItemsSubtotal(tier);
        const tierSumEl = document.getElementById(`tier-items-sum-${tIdx}`);
        if (tierSumEl) {
          tierSumEl.innerHTML = `Services sum: <strong class="mono">${escapeHtml(formatMoney(itemsSum, cur))}</strong>`;
        }
        if (tier.autoCalcPrice) {
          syncTierPriceFromItems(tier);
          const priceInput = document.getElementById(`tier-price-input-${tIdx}`);
          if (priceInput) priceInput.value = String(tier.price);
        }
        saveCurrentDraftLocal();
        refreshPreviewOnly();
      }
      return;
    }

    if (el.dataset.tierFeat) {
      const [tIdxStr, fIdxStr] = el.dataset.tierFeat.split(":");
      const tIdx = Number(tIdxStr);
      const fIdx = Number(fIdxStr);
      if (state.proposal.tiers[tIdx]) {
        state.proposal.tiers[tIdx].features[fIdx] = el.value;
        saveCurrentDraftLocal();
        refreshPreviewOnly();
      }
      return;
    }

    if (el.dataset.addonBind) {
      const [aIdxStr, key] = el.dataset.addonBind.split(":");
      const aIdx = Number(aIdxStr);
      if (state.proposal.addons[aIdx]) {
        state.proposal.addons[aIdx][key] = el.type === "number" ? Math.max(key === "qty" ? 1 : 0, Number(el.value) || 0) : el.value;
        saveCurrentDraftLocal();
        refreshPreviewOnly();
      }
    }
  });

  // Change events (checkboxes, selects, file uploads)
  document.addEventListener("change", async (e) => {
    const el = e.target;

    if (el.id === "template-dropdown") {
      applyTemplateSelection(el.value);
      return;
    }

    if (el.id === "client-esign-consent") {
      state.esignConsent = el.checked;
      return;
    }

    if (el.id === "toggle-multi-tier") {
      state.proposal.singleTierMode = !el.checked;
      saveCurrentDraftLocal();
      refreshPreviewOnly();
      return;
    }

    if (el.dataset.bind === "currency") {
      state.proposal.currency = el.value;
      saveCurrentDraftLocal();
      const body = document.getElementById("builder-body");
      if (body) body.innerHTML = renderBuilderBodyHtml();
      refreshPreviewOnly();
      return;
    }

    if (el.dataset.bind === "paymentProvider") {
      state.proposal.paymentProvider = el.value;
      saveCurrentDraftLocal();
      const body = document.getElementById("builder-body");
      if (body) body.innerHTML = renderBuilderBodyHtml();
      refreshPreviewOnly();
      return;
    }

    if (el.dataset.bind === "financingMonths") {
      state.proposal.financingMonths = Math.min(180, Math.max(3, Number(el.value) || 60));
      saveCurrentDraftLocal();
      refreshPreviewOnly();
      return;
    }

    if (el.hasAttribute("data-toggle-financing")) {
      state.proposal.financingEnabled = el.checked;
      saveCurrentDraftLocal();
      const body = document.getElementById("builder-body");
      if (body) body.innerHTML = renderBuilderBodyHtml();
      refreshPreviewOnly();
      return;
    }

    if (el.dataset.tierAutocalc !== undefined) {
      const tIdx = Number(el.dataset.tierAutocalc);
      const tier = state.proposal.tiers[tIdx];
      if (tier) {
        tier.autoCalcPrice = el.checked;
        if (tier.autoCalcPrice) {
          syncTierPriceFromItems(tier);
          const priceInput = document.getElementById(`tier-price-input-${tIdx}`);
          if (priceInput) priceInput.value = String(tier.price);
        }
        saveCurrentDraftLocal();
        refreshPreviewOnly();
      }
      return;
    }

    if (el.dataset.addonCheck !== undefined) {
      const aIdx = Number(el.dataset.addonCheck);
      if (state.proposal.addons[aIdx]) {
        state.proposal.addons[aIdx].selected = el.checked;
        saveCurrentDraftLocal();
        refreshPreviewOnly();
      }
      return;
    }

    if (el.id === "logo-file-input" && el.files && el.files[0]) {
      try {
        const dataUrl = await CODEC.downscaleLogoFile(el.files[0]);
        state.proposal.logoData = dataUrl;
        saveCurrentDraftLocal();
        const body = document.getElementById("builder-body");
        if (body) body.innerHTML = renderBuilderBodyHtml();
        refreshPreviewOnly();
        showToast("Logo optimized & applied!");
      } catch (err) {
        showToast(err.message || "Could not process logo.");
      }
      return;
    }

    if (el.id === "import-drafts-input" && el.files && el.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const obj = JSON.parse(reader.result);
          if (Array.isArray(obj.drafts)) {
            state.drafts = obj.drafts;
            saveDraftsList();
          }
          if (obj.current && Array.isArray(obj.current.tiers)) {
            state.proposal = normalizeProposalServices(obj.current);
            saveCurrentDraftLocal();
          }
          renderApp();
          showToast("Backup restored successfully!");
        } catch (err) {
          showToast("Invalid backup JSON file.");
        }
      };
      reader.readAsText(el.files[0]);
    }
  });

  // Keyboard activation for clickable cards
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const card = e.target.closest(".tier-card, .addon-card");
      if (card) {
        e.preventDefault();
        card.click();
      }
    }
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-backdrop.open").forEach((m) => m.classList.remove("open"));
    }
  });

  // =========================================================================
  // Router & Initialization (Including Automatic Stripe Return Fulfillment)
  // =========================================================================
  async function handleRoute() {
    if (CLOUD && CLOUD.isConfigured()) {
      const authSess = await CLOUD.handleAuthCallbackFromHash();
      if (authSess) {
        state.cloudSession = authSess;
        state.pendingToast = `Signed in as ${authSess.user?.email || "Contractor"}!`;
      } else {
        state.cloudSession = CLOUD.getSession();
      }
      if (state.cloudSession && (!state.cloudProposals || state.cloudProposals.length === 0)) {
        CLOUD.listMyCloudProposals().then((rows) => {
          state.cloudProposals = rows || [];
        }).catch(() => {});
      }
    }

    const hash = window.location.hash || "";
    const search = new URLSearchParams(window.location.search);

    if (hash === "#admin") {
      state.mode = "admin";
      state.adminMetrics = null;
      state.adminError = "";
      renderApp();
      if (CLOUD && CLOUD.isConfigured()) {
        try {
          state.adminMetrics = await CLOUD.fetchAdminMetrics();
        } catch (err) {
          state.adminError = err.message || "Admin sign-in required.";
        }
        renderApp();
      }
      return;
    }

    if (hash.startsWith("#p=")) {
      const cloudToken = hash.slice(3).split("&")[0].trim();
      const cloudRow = CLOUD && CLOUD.isConfigured() ? await CLOUD.fetchCloudProposal(cloudToken) : null;
      if (!cloudRow || !cloudRow.payload) {
        state.mode = "error";
        renderApp();
        return;
      }
      state.activeCloudToken = cloudToken;
      state.demoPreviewReturn = false;
      state.embedMode = search.get("embed") === "1";
      state.mode = "client";
      state.proposal = normalizeProposalServices(cloudRow.payload);
      if (cloudRow.white_label) state.proposal.whiteLabel = true;
      state.selectedTierIdx = Math.min(state.proposal.tiers.length - 1, Math.max(0, Number(state.proposal.recommendedTierIndex ?? 1)));
      state.approved = false;
      state.approvalReceipt = null;
      state.hasSignatureInk = false;
      state.signatureDataUrl = "";
      state.clientSignerName = "";
      state.clientSignerEmail = "";
      state.esignConsent = false;
      renderApp();
      trackEvent("client_quote_viewed", {
        is_embed: state.embedMode,
        cloud_mode: true,
        tier_count: getVisibleTiers(state.proposal).length,
        addon_count: (state.proposal.addons || []).length,
        has_financing: Boolean(state.proposal.financingEnabled)
      });
      return;
    }

    state.activeCloudToken = "";

    // Handle automated post-checkout redirect (?unlock=<key>&plan=monthly|annual)
    const unlockParam = search.get("unlock");
    const planParam = search.get("plan");
    if (unlockParam && verifyLicenseKey(unlockParam)) {
      const normalizedPlan = planParam === "annual" ? "annual" : "monthly";
      const label = normalizedPlan === "annual" ? "Pro Annual License" : "Pro Monthly License";
      activateProState(unlockParam, label);
      trackEvent("pro_unlocked", { method: "redirect", plan: normalizedPlan });
      state.pendingToast = `${label} activated automatically! Welcome to BidLift Pro.`;
      try {
        search.delete("unlock");
        search.delete("plan");
        const remainingSearch = search.toString();
        const cleanUrl = `${window.location.pathname}${remainingSearch ? "?" + remainingSearch : ""}${hash}`;
        window.history.replaceState({}, "", cleanUrl);
      } catch (err) {}
    }

    if (hash.startsWith("#q=")) {
      const rawHash = hash.slice(3);
      const [encodedPart, ...rest] = rawHash.split("&");
      const hasEmbedFlag = search.get("embed") === "1" || rest.includes("embed=1");
      state.embedMode = hasEmbedFlag;

      const decoded = await CODEC.decodeProposal(encodedPart);
      if (!decoded) {
        state.mode = "error";
        renderApp();
        return;
      }

      state.demoPreviewReturn = false;
      state.mode = "client";
      state.proposal = normalizeProposalServices(decoded);
      state.selectedTierIdx = Math.min(decoded.tiers.length - 1, Math.max(0, Number(decoded.recommendedTierIndex ?? 1)));
      state.approved = false;
      state.approvalReceipt = null;
      state.hasSignatureInk = false;
      state.signatureDataUrl = "";
      state.clientSignerName = "";
      state.clientSignerEmail = "";
      state.esignConsent = false;
      renderApp();
      trackEvent("client_quote_viewed", {
        is_embed: state.embedMode,
        tier_count: getVisibleTiers(decoded).length,
        addon_count: (decoded.addons || []).length,
        has_financing: Boolean(state.proposal.financingEnabled)
      });
      return;
    }

    // Studio / Deep-Linked Template Mode
    const tplParam = (search.get("tpl") || search.get("template") || "").trim().toLowerCase();
    const flatParam = search.get("flat");
    const bizParam = (search.get("biz") || "").trim().slice(0, 80);
    const cityParam = (search.get("city") || "").trim().slice(0, 80);
    const projParam = (search.get("proj") || "").trim().slice(0, 100);
    const demoParam = search.get("demo") === "1";

    state.embedMode = false;
    state.proposal = null;

    if (tplParam && TEMPLATES[tplParam]) {
      state.proposal = createProposalFromTemplate(tplParam);
    } else {
      try {
        const savedCurrent = localStorage.getItem(CONFIG.STORAGE_KEYS.CURRENT);
        if (savedCurrent) {
          const parsed = JSON.parse(savedCurrent);
          if (parsed && Array.isArray(parsed.tiers) && parsed.tiers.length > 0) {
            state.proposal = normalizeProposalServices(parsed);
          }
        }
      } catch (err) {}
    }

    if (!state.proposal) {
      state.proposal = createProposalFromTemplate("contractor");
    }
    if (flatParam !== null && flatParam !== "") {
      applyFlatBudgetScaling(state.proposal, Number(flatParam));
    }
    if (bizParam) {
      state.proposal.businessName = bizParam;
    }
    if (cityParam) {
      state.proposal.projectLocation = cityParam;
    }
    if (projParam) {
      state.proposal.projectTitle = projParam;
    }
    if (state.isPro) {
      state.proposal.whiteLabel = true;
    }

    state.demoPreviewReturn = demoParam;
    state.mode = demoParam ? "client" : "studio";
    state.selectedTierIdx = Math.min(state.proposal.tiers.length - 1, Math.max(0, Number(state.proposal.recommendedTierIndex ?? 1)));
    if (!demoParam && (tplParam || flatParam || bizParam || cityParam || projParam)) {
      saveCurrentDraftLocal();
    }
    renderApp();
    if (!studioLoadTracked) {
      studioLoadTracked = true;
      trackEvent(demoParam ? "buyer_demo_opened" : "studio_loaded", {
        template_id: state.proposal.id || "custom",
        entry_template: state.proposal.id || "custom",
        has_financing: Boolean(state.proposal.financingEnabled)
      });
    }
  }

  window.addEventListener("hashchange", handleRoute);

  loadStorage();
  handleRoute();
})();
