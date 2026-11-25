/**
 * ScopeLock — Interactive Field & Agency Change-Order Authorization Studio
 * Zero-backend / zero-PII static client application.
 */
(function () {
  "use strict";

  const CONFIG = window.SCOPELOCK_CONFIG || {};
  const TEMPLATES = window.SCOPELOCK_TEMPLATES || {};
  const CODEC = window.ScopeLockCodec;
  const TELEMETRY = window.ScopeLockTelemetry;

  const CATEGORY_ORDER = [
    "Home Trades & Construction",
    "Agencies, Tech & Advisory"
  ];
  const FLAGSHIP_PILLS = ["roofing_co", "hvac_co", "remodel_co", "agency_co"];
  const REASON_CODES = ["Hidden Condition", "Client Request", "Code Required"];

  const DEMO_SAMPLE_PHOTOS = [
    {
      caption: "Field Discovery Photo #1 — Exposed Condition",
      dataUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 480 300'%3E%3Cdefs%3E%3ClinearGradient id='g1' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%231e293b'/%3E%3Cstop offset='100%25' stop-color='%23334155'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='480' height='300' fill='url(%23g1)'/%3E%3Crect x='26' y='24' width='168' height='30' rx='15' fill='%23f59e0b'/%3E%3Ctext x='110' y='44' text-anchor='middle' fill='%230f172a' font-family='sans-serif' font-size='13' font-weight='800'%3EFIELD EVIDENCE %231%3C/text%3E%3Crect x='60' y='88' width='360' height='150' rx='12' fill='%230f172a' stroke='%2364748b' stroke-width='2' stroke-dasharray='8 6'/%3E%3Ccircle cx='240' cy='150' r='34' fill='none' stroke='%23fbbf24' stroke-width='3'/%3E%3Cpath d='M224 150h32M240 134v32' stroke='%23fbbf24' stroke-width='3'/%3E%3Ctext x='240' y='212' text-anchor='middle' fill='%23cbd5e1' font-family='monospace' font-size='13'%3EDocumented Site Condition &amp; Scale%3C/text%3E%3C/svg%3E"
    },
    {
      caption: "Field Measurement #2 — Code / Scope Verification",
      dataUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 480 300'%3E%3Cdefs%3E%3ClinearGradient id='g2' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%230f294a'/%3E%3Cstop offset='100%25' stop-color='%231e3a5f'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='480' height='300' fill='url(%23g2)'/%3E%3Crect x='26' y='24' width='168' height='30' rx='15' fill='%2334d399'/%3E%3Ctext x='110' y='44' text-anchor='middle' fill='%2308172b' font-family='sans-serif' font-size='13' font-weight='800'%3ESITE PROOF %232%3C/text%3E%3Crect x='56' y='88' width='368' height='150' rx='12' fill='%2308172b' stroke='%2338bdf8' stroke-width='2'/%3E%3Cpath d='M92 178h296M92 164v28M190 168v20M290 168v20M388 164v28' stroke='%2338bdf8' stroke-width='3'/%3E%3Ctext x='240' y='136' text-anchor='middle' fill='%23ffffff' font-family='sans-serif' font-size='16' font-weight='700'%3ELinear / Unit Verification Stamp%3C/text%3E%3Ctext x='240' y='214' text-anchor='middle' fill='%2394a3b8' font-family='monospace' font-size='12'%3ECompressed &lt; 8KB for Zero-Server URL%3C/text%3E%3C/svg%3E"
    }
  ];

  const state = {
    mode: "studio", // "studio" | "client"
    isSharedLink: false,
    isDemoPreview: false,
    theme: "light",
    isPro: false,
    proPlanLabel: "",
    co: null,
    drafts: [],
    generatedShareUrl: "",
    receipt: null,
    sigHasStroke: false
  };

  /* ------------------------------------------------------------------------
     Helpers: Formatting, Sanitizing & Arithmetic
     ------------------------------------------------------------------------ */
  function escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function sanitizeHref(rawUrl) {
    const clean = String(rawUrl || "").trim();
    if (!clean) return "";
    try {
      const parsed = new URL(clean);
      if (parsed.protocol === "https:" || parsed.protocol === "http:") {
        return parsed.href;
      }
      return "";
    } catch (e) {
      return "";
    }
  }

  function getCurrencySymbol(code) {
    const map = CONFIG.CURRENCIES || {};
    return (map[code] && map[code].symbol) || "$";
  }

  function formatMoney(amount, currencyCode) {
    const sym = getCurrencySymbol(currencyCode || (state.co && state.co.currency) || "USD");
    const num = Number(amount) || 0;
    const absStr = Math.abs(num).toLocaleString("en-US", {
      minimumFractionDigits: Number.isInteger(num) ? 0 : 2,
      maximumFractionDigits: 2
    });
    return (num < 0 ? "-" : "") + sym + absStr;
  }

  function defaultBaseDateIso() {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().slice(0, 10);
  }

  function computeRevisedDate(baseDateStr, deltaDays) {
    const base = baseDateStr && /^\d{4}-\d{2}-\d{2}$/.test(baseDateStr)
      ? new Date(baseDateStr + "T12:00:00")
      : new Date(defaultBaseDateIso() + "T12:00:00");
    const d = new Date(base.getTime());
    d.setDate(d.getDate() + Math.max(0, Math.round(Number(deltaDays) || 0)));
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  function formatBaseDateLabel(baseDateStr) {
    const base = baseDateStr && /^\d{4}-\d{2}-\d{2}$/.test(baseDateStr)
      ? new Date(baseDateStr + "T12:00:00")
      : new Date(defaultBaseDateIso() + "T12:00:00");
    return base.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  function recalcCoDelta(co) {
    const items = Array.isArray(co.lineItems) ? co.lineItems : [];
    const sum = items.reduce((acc, it) => {
      const q = Math.max(0, Number(it.qty) || 0);
      const p = Math.max(0, Number(it.unitPrice) || 0);
      return acc + Math.round(q * p * 100) / 100;
    }, 0);
    co.coDeltaPrice = Math.round(sum * 100) / 100;
    return co.coDeltaPrice;
  }

  function computeLedgerTotals(co) {
    const orig = Math.max(0, Number(co.originalContractPrice) || 0);
    const prior = Math.max(0, Number(co.priorApprovedCos) || 0);
    const delta = recalcCoDelta(co);
    const revised = Math.round((orig + prior + delta) * 100) / 100;
    return { orig, prior, delta, revised };
  }

  function cloneTemplate(tplId) {
    const tpl = TEMPLATES[tplId] || TEMPLATES.roofing_co || Object.values(TEMPLATES)[0];
    const cloned = JSON.parse(JSON.stringify(tpl));
    cloned.currency = cloned.currency || "USD";
    cloned.baseCompletionDate = cloned.baseCompletionDate || defaultBaseDateIso();
    cloned.projectCity = cloned.projectCity || "";
    cloned.photos = Array.isArray(cloned.photos) ? cloned.photos : [];
    cloned.whiteLabel = Boolean(state.isPro);
    cloned.createdAt = Date.now();
    recalcCoDelta(cloned);
    return cloned;
  }

  function applyExactDeltaOverride(co, targetDelta) {
    const cleanTarget = Math.max(10, Math.round(Number(targetDelta) || 0));
    const current = recalcCoDelta(co);
    if (!current || current === cleanTarget || !Array.isArray(co.lineItems) || co.lineItems.length === 0) {
      if (current !== cleanTarget) {
        co.lineItems = [
          {
            name: `${co.label || "Authorized Change Order"} Scope`,
            qty: 1,
            unit: "job",
            unitPrice: cleanTarget,
            note: "Configured via Margin Leak Calculator"
          }
        ];
        recalcCoDelta(co);
      }
      return;
    }
    const ratio = cleanTarget / current;
    let running = 0;
    co.lineItems.forEach((item, idx) => {
      if (idx < co.lineItems.length - 1) {
        const q = Math.max(1, Number(item.qty) || 1);
        const scaledSub = Math.round((q * (Number(item.unitPrice) || 0) * ratio));
        item.qty = 1;
        item.unitPrice = Math.max(0, scaledSub);
        running += item.unitPrice;
      } else {
        const rem = Math.max(0, cleanTarget - running);
        item.qty = 1;
        item.unitPrice = rem;
      }
    });
    recalcCoDelta(co);
  }

  function getReasonBadgeClass(reasonCode) {
    if (reasonCode === "Code Required") return "reason-code";
    if (reasonCode === "Client Request") return "reason-client";
    return "reason-hidden";
  }

  function showToast(msg) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(() => {
      el.remove();
    }, 3000);
  }

  function copyToClipboard(text, successMsg) {
    const done = () => showToast(successMsg || "Copied to clipboard!");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
      return;
    }
    fallbackCopy(text, done);
  }

  function fallbackCopy(text, onDone) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      onDone();
    } catch (e) {}
    ta.remove();
  }

  /* ------------------------------------------------------------------------
     Quick-CO Single-Line Parser
     Example: "6 sheets rotted OSB @ $115 + flashing $220, +2 days"
     ------------------------------------------------------------------------ */
  function parseQuickCoInput(rawText) {
    let text = String(rawText || "").trim();
    if (!text) return null;

    let scheduleDays = null;
    const schedMatch = text.match(/(?:,|\band\b|\+)?\s*\+?\s*(\d+)\s*(?:business\s*)?(?:days?|d)\b\s*$/i);
    if (schedMatch) {
      scheduleDays = Math.min(365, Math.max(0, parseInt(schedMatch[1], 10)));
      text = text.slice(0, schedMatch.index).trim();
    }

    // Protect thousands commas like $1,250 before splitting clauses
    const protectedText = text.replace(/(\d),(\d{3})/g, "$1$2");
    const parts = protectedText
      .split(/\s*\+\s*|\s*;\s*|\s*,\s*(?=[a-z0-9])/i)
      .map((s) => s.trim())
      .filter(Boolean);

    const knownUnits = new Set(["sheets", "sheet", "hrs", "hr", "hours", "hour", "lf", "sf", "units", "unit", "pages", "page", "seats", "seat", "days", "day", "bays", "bay", "tons", "ton", "edits", "edit", "months", "month", "locations", "breakers", "kits", "kit", "job", "set", "pack"]);
    const parsedItems = [];

    for (const part of parts) {
      // Pattern 1: "6 sheets rotted OSB @ $115" or "flashing @ $220"
      let m = part.match(/^(.+?)\s*@\s*\$?\s*(\d+(?:\.\d{1,2})?)\s*$/);
      let left = "";
      let price = 0;

      if (m) {
        left = m[1].trim();
        price = parseFloat(m[2]);
      } else {
        // Pattern 2: "flashing $220" or "2 breakers $135"
        m = part.match(/^(.+?)\s+\$\s*(\d+(?:\.\d{1,2})?)\s*$/);
        if (m) {
          left = m[1].trim();
          price = parseFloat(m[2]);
        }
      }

      if (!left || !Number.isFinite(price)) continue;

      let qty = 1;
      let unit = "item";
      let name = left;

      const qtyMatch = left.match(/^(\d+(?:\.\d+)?)\s+(?:([a-zA-Z]+)\s+)?(.+)$/);
      if (qtyMatch) {
        qty = Math.max(0.1, parseFloat(qtyMatch[1]));
        const candidateUnit = (qtyMatch[2] || "").toLowerCase();
        if (candidateUnit && knownUnits.has(candidateUnit)) {
          unit = candidateUnit;
          name = qtyMatch[3].trim();
        } else {
          name = ((qtyMatch[2] ? qtyMatch[2] + " " : "") + qtyMatch[3]).trim();
        }
      }

      if (name) {
        name = name.charAt(0).toUpperCase() + name.slice(1);
        parsedItems.push({
          name,
          qty,
          unit,
          unitPrice: Math.round(price * 100) / 100,
          note: "Parsed via Quick-CO"
        });
      }
    }

    if (parsedItems.length === 0 && scheduleDays === null) return null;
    return { items: parsedItems, scheduleDays };
  }

  /* ------------------------------------------------------------------------
     Local Persistence (Zero-Server)
     ------------------------------------------------------------------------ */
  function saveCurrentLocal() {
    try {
      const key = (CONFIG.STORAGE_KEYS && CONFIG.STORAGE_KEYS.CURRENT) || "scopelock_current_v1";
      localStorage.setItem(key, JSON.stringify(state.co));
    } catch (e) {}
  }

  function loadCurrentLocal() {
    try {
      const key = (CONFIG.STORAGE_KEYS && CONFIG.STORAGE_KEYS.CURRENT) || "scopelock_current_v1";
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.lineItems)) {
        recalcCoDelta(parsed);
        return parsed;
      }
    } catch (e) {}
    return null;
  }

  function loadDrafts() {
    try {
      const key = (CONFIG.STORAGE_KEYS && CONFIG.STORAGE_KEYS.DRAFTS) || "scopelock_drafts_v1";
      const raw = localStorage.getItem(key);
      state.drafts = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(state.drafts)) state.drafts = [];
    } catch (e) {
      state.drafts = [];
    }
  }

  function saveDraftToList() {
    loadDrafts();
    const copy = JSON.parse(JSON.stringify(state.co));
    copy.savedAt = Date.now();
    const idx = state.drafts.findIndex((d) => d.contractRef === copy.contractRef && d.coNumber === copy.coNumber);
    if (idx >= 0) {
      state.drafts[idx] = copy;
    } else {
      state.drafts.unshift(copy);
    }
    state.drafts = state.drafts.slice(0, 12);
    try {
      const key = (CONFIG.STORAGE_KEYS && CONFIG.STORAGE_KEYS.DRAFTS) || "scopelock_drafts_v1";
      localStorage.setItem(key, JSON.stringify(state.drafts));
      showToast(`Saved ${copy.coNumber || "Change Order"} to browser drafts`);
    } catch (e) {
      showToast("Storage full — remove an older draft or photo.");
    }
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
    const match = /^SL-PRO-([A-Z0-9]{6})-([A-F0-9]{4})$/.exec(clean);
    if (!match) return false;
    const expected = computeFnv1aHex(`SCOPELOCK_V1|${match[1]}`).slice(0, 4);
    return match[2] === expected;
  }

  function activateProState(cleanKey, planLabel) {
    const label = planLabel || "ScopeLock Pro";
    state.isPro = true;
    state.proPlanLabel = label;
    if (state.co) state.co.whiteLabel = true;
    try {
      const key = (CONFIG.STORAGE_KEYS && CONFIG.STORAGE_KEYS.PRO_LICENSE) || "scopelock_pro_v1";
      localStorage.setItem(key, JSON.stringify({ active: true, label, key: cleanKey }));
    } catch (e) {}
  }

  function loadProState() {
    try {
      const key = (CONFIG.STORAGE_KEYS && CONFIG.STORAGE_KEYS.PRO_LICENSE) || "scopelock_pro_v1";
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && parsed.active && verifyLicenseKey(parsed.key)) {
        state.isPro = true;
        state.proPlanLabel = parsed.label || "ScopeLock Pro";
      } else {
        localStorage.removeItem(key);
      }
    } catch (e) {}
  }

  function loadTheme() {
    try {
      const key = (CONFIG.STORAGE_KEYS && CONFIG.STORAGE_KEYS.THEME) || "scopelock_theme_v1";
      const saved = localStorage.getItem(key);
      if (saved === "dark" || saved === "light") {
        state.theme = saved;
      }
    } catch (e) {}
    document.documentElement.setAttribute("data-theme", state.theme);
  }

  function toggleTheme() {
    state.theme = state.theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", state.theme);
    try {
      const key = (CONFIG.STORAGE_KEYS && CONFIG.STORAGE_KEYS.THEME) || "scopelock_theme_v1";
      localStorage.setItem(key, state.theme);
    } catch (e) {}
    render();
  }

  /* ------------------------------------------------------------------------
     Checkout / Pro Modal Actions (Polar.sh or Mailto Concierge)
     ------------------------------------------------------------------------ */
  function handleCheckoutPlan(planKey) {
    if (TELEMETRY) {
      TELEMETRY.track("pro_checkout_clicked", { plan: planKey });
    }
    const linkMap = {
      pro_monthly: CONFIG.CHECKOUT_PRO_MONTHLY_LINK,
      pro_annual: CONFIG.CHECKOUT_PRO_ANNUAL_LINK,
      suite_monthly: CONFIG.CHECKOUT_SUITE_MONTHLY_LINK,
      suite_annual: CONFIG.CHECKOUT_SUITE_ANNUAL_LINK,
      dfy: CONFIG.CHECKOUT_DFY_LINK
    };
    const safeUrl = sanitizeHref(linkMap[planKey]);
    if (safeUrl) {
      window.open(safeUrl, "_blank", "noopener,noreferrer");
      return;
    }

    const planLabels = {
      pro_monthly: `ScopeLock Pro Monthly (${CONFIG.PRO_PRICE_MONTHLY || "$29/mo"})`,
      pro_annual: `ScopeLock Pro Annual (${CONFIG.PRO_PRICE_ANNUAL || "$179/yr"})`,
      suite_monthly: `BidLift + ScopeLock Margin Suite Monthly (${CONFIG.SUITE_PRICE_MONTHLY || "$39/mo"})`,
      suite_annual: `BidLift + ScopeLock Margin Suite Annual (${CONFIG.SUITE_PRICE_ANNUAL || "$249/yr"})`,
      dfy: `Done-For-You ScopeLock + BidLift Setup (${CONFIG.DFY_PRICE || "$499"})`
    };
    const label = planLabels[planKey] || "ScopeLock Pro";
    const email = CONFIG.SUPPORT_EMAIL || "bidliftco@gmail.com";
    const promo = CONFIG.PROMO_CODE || "PH30";
    const subject = encodeURIComponent(`ScopeLock Activation Request: ${label} (${promo})`);
    const body = encodeURIComponent(
      `Hi ScopeLock team,\n\nI'd like to activate ${label} with promo code ${promo} (30% off through Nov 30).\n\nPlease send my direct checkout link & license key.\n\nThank you!`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    showToast(`Opening concierge checkout email (${promo} applied)...`);
  }

  function activateLicenseKey(rawCode) {
    const clean = String(rawCode || "").trim().toUpperCase();
    const prefix = CONFIG.LICENSE_PREFIX || "SL-PRO-";
    if (verifyLicenseKey(clean)) {
      activateProState(clean, "ScopeLock Pro");
      if (TELEMETRY) TELEMETRY.track("pro_unlocked", { method: "manual" });
      closeModal("modal-pro");
      showToast("ScopeLock Pro white-label activated!");
      render();
      return;
    }
    showToast(`Enter a valid signed license key (e.g. ${prefix}XXXXXX-XXXX).`);
  }

  function deactivateLicense() {
    state.isPro = false;
    state.proPlanLabel = "";
    if (state.co) state.co.whiteLabel = false;
    try {
      const key = (CONFIG.STORAGE_KEYS && CONFIG.STORAGE_KEYS.PRO_LICENSE) || "scopelock_pro_v1";
      localStorage.removeItem(key);
    } catch (e) {}
    showToast("Switched back to Free Forever ($0).");
    render();
  }

  /* ------------------------------------------------------------------------
     Render Helpers: Topbar, Template Selector, Pricing Matrix, Modal
     ------------------------------------------------------------------------ */
  function renderTopbar() {
    const promo = CONFIG.PROMO_CODE || "PH30";
    const proPill = state.isPro
      ? `<button type="button" id="btn-pro-pill" class="pro-pill active-pro" data-action="open-modal" data-modal="modal-pro">✓ ${escapeHtml(state.proPlanLabel || "Pro Active")}</button>`
      : `<button type="button" id="btn-pro-pill" class="pro-pill" data-action="open-modal" data-modal="modal-pro">★ Upgrade to Pro · 30% Off (${escapeHtml(promo)})</button>`;

    return `
      <header class="topbar no-print">
        <div class="topbar-inner">
          <a class="brand-link" href="./">
            <span class="brand-mark" aria-hidden="true">SL</span>
            <span>
              <strong class="brand-title">ScopeLock</strong>
              <small class="brand-sub">Change-Order Studio</small>
            </span>
          </a>
          <div class="topbar-actions">
            ${proPill}
            <a class="btn btn-ghost btn-sm" href="./calculator.html?ref=studio_nav">Margin Leak Calculator</a>
            <button type="button" class="btn btn-outline btn-sm" data-action="open-demo">Try Live Client Sign-Off View</button>
            <button type="button" class="btn btn-ghost btn-sm" data-action="save-draft">Save Draft</button>
            <button type="button" class="btn btn-ghost btn-sm" data-action="toggle-theme" aria-label="Toggle color theme">${state.theme === "dark" ? "☀ Light" : "☾ Dark"}</button>
          </div>
        </div>
      </header>
    `;
  }

  function renderTemplateSelectorBar() {
    const allTemplates = Object.values(TEMPLATES);
    const selectedId = (state.co && state.co.id) || "roofing_co";
    const groups = new Map();
    CATEGORY_ORDER.forEach((cat) => groups.set(cat, []));
    allTemplates.forEach((tpl) => {
      const cat = tpl.category || "Agencies, Tech & Advisory";
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

    const pillsHtml = FLAGSHIP_PILLS
      .filter((id) => TEMPLATES[id])
      .map((id) => {
        const tpl = TEMPLATES[id];
        return `<button type="button" class="template-pill ${id === selectedId ? "active" : ""}" data-action="load-template" data-template-id="${escapeHtml(id)}">${escapeHtml(tpl.shortLabel || tpl.label)}</button>`;
      })
      .join("");

    return `
      <div class="template-bar">
        <label class="template-select-wrap">
          <span class="template-select-label">CO Template (${allTemplates.length}):</span>
          <select id="template-dropdown" class="template-select" aria-label="Select Change-Order Template">
            ${optGroupsHtml}
          </select>
        </label>
        <div class="template-pills" aria-label="Flagship Quick Templates">
          ${pillsHtml}
        </div>
      </div>
    `;
  }

  function renderPricingCompareHtml(isModal) {
    const promo = CONFIG.PROMO_CODE || "PH30";
    const rows = [
      ["Unlimited Post-Award Change Orders", true, true, true],
      ["All 12 Trade, Tech, Agency & Advisory CO Templates", true, true, true],
      ["Quick-CO Single-Line Parser & Schedule Shift Math", true, true, true],
      ["Sequential Contract Rollup Ledger (Orig + Prior + Delta)", true, true, true],
      ["Up to 4 Compressed Field Evidence Photos (<=640px)", true, true, true],
      ["ESIGN Consent + SHA-256 Authorization Receipt & PDF", true, true, true],
      ["0% Fee Direct Payment Links (Stripe / Venmo / PayPal)", true, true, true],
      ["100% White-Label Client View (Removes ScopeLock Badge)", false, true, true],
      ["Multi-Currency Presets & Priority Support", false, true, true],
      ["BidLift Good / Better / Best Quoting Suite Included", false, false, true],
      ["Done-For-You Trade Catalog & Payout Link Setup ($499 opt.)", false, false, true]
    ];

    const mark = (ok) => ok
      ? `<span class="chk-yes" aria-label="Included">✓</span>`
      : `<span class="chk-no" aria-label="Not included">✕</span>`;

    const innerHtml = `
      <div class="thanksgiving-banner">
        <strong>Promo Extended Through Nov 30:</strong> Use code <span class="thanksgiving-code">${escapeHtml(promo)}</span> for <strong>30% Off ScopeLock Pro or Margin Suite</strong>. Need $0? Stay on <strong>Free Forever</strong> with unlimited Change Orders.
      </div>

      ${isModal ? "" : `
        <div class="pricing-section-head">
          <div>
            <h2>Transparent Plans — Free Forever, Pro, and Margin Suite</h2>
            <p class="pricing-free-reassurance">Lock scope changes free forever with zero time limits, upgrade for white-label branding, or bundle BidLift + ScopeLock.</p>
          </div>
          ${!state.isPro
            ? `<button type="button" class="btn btn-accent btn-sm" data-action="checkout-plan" data-plan="pro_annual">Upgrade to Pro · 30% Off (${escapeHtml(promo)})</button>`
            : `<span class="pro-pill active-pro">✓ ${escapeHtml(state.proPlanLabel || "Pro Active")}</span>`}
        </div>
      `}

      <div class="pricing-grid">
        <div class="plan-box">
          <span class="plan-badge">Always $0</span>
          <strong>Free Forever</strong>
          <div class="plan-price">$0 <span style="font-size:12px;font-weight:500;color:var(--text-muted);">/ forever</span></div>
          <ul class="plan-bullets">
            <li>Unlimited COs, 12 templates &amp; 4 evidence photos</li>
            <li>SHA-256 ESIGN receipts &amp; print PDF exports</li>
            <li>0% fee direct payment links</li>
          </ul>
          ${state.isPro
            ? `<button type="button" class="btn btn-outline btn-sm" style="margin-top:auto;" data-action="deactivate-license">Switch to Free Forever</button>`
            : isModal
              ? `<button type="button" class="btn btn-outline btn-sm" style="margin-top:auto;" data-action="close-modal" data-modal="modal-pro">✓ Active — Continue Free</button>`
              : `<span class="btn btn-outline btn-sm" style="margin-top:auto;cursor:default;">✓ Active — Free Forever</span>`}
        </div>

        <div class="plan-box featured">
          <span class="plan-badge">Most Popular · Save 48% Annual</span>
          <strong>ScopeLock Pro</strong>
          <div class="plan-price">${escapeHtml(CONFIG.PRO_PRICE_MONTHLY || "$29/mo")} <span style="font-size:12px;font-weight:600;color:var(--success);">or ${escapeHtml(CONFIG.PRO_PRICE_ANNUAL || "$179/yr")}</span></div>
          <ul class="plan-bullets">
            <li>Everything in Free Forever</li>
            <li>Removes all ScopeLock footer/header branding</li>
            <li>30% off with code <strong>${escapeHtml(promo)}</strong> thru Nov 30</li>
          </ul>
          <div style="display:grid;gap:6px;margin-top:auto;">
            <button type="button" class="btn btn-accent btn-sm" data-action="checkout-plan" data-plan="pro_annual">Get Pro Annual (${escapeHtml(CONFIG.PRO_PRICE_ANNUAL || "$179/yr")})</button>
            <button type="button" class="btn btn-primary btn-sm" data-action="checkout-plan" data-plan="pro_monthly">Get Pro Monthly (${escapeHtml(CONFIG.PRO_PRICE_MONTHLY || "$29/mo")})</button>
          </div>
        </div>

        <div class="plan-box">
          <span class="plan-badge">BidLift + ScopeLock Bundle</span>
          <strong>Margin Suite</strong>
          <div class="plan-price">${escapeHtml(CONFIG.SUITE_PRICE_MONTHLY || "$39/mo")} <span style="font-size:12px;font-weight:600;color:var(--success);">or ${escapeHtml(CONFIG.SUITE_PRICE_ANNUAL || "$249/yr")}</span></div>
          <ul class="plan-bullets">
            <li>Full BidLift Pro + ScopeLock Pro access</li>
            <li>Covers pre-award quoting + post-award COs</li>
            <li>Optional ${escapeHtml(CONFIG.DFY_PRICE || "$499")} DFY template &amp; payout setup</li>
          </ul>
          <div style="display:grid;gap:6px;margin-top:auto;">
            <button type="button" class="btn btn-primary btn-sm" data-action="checkout-plan" data-plan="suite_annual">Get Suite Annual (${escapeHtml(CONFIG.SUITE_PRICE_ANNUAL || "$249/yr")})</button>
            <button type="button" class="btn btn-outline btn-sm" data-action="checkout-plan" data-plan="suite_monthly">Suite Monthly (${escapeHtml(CONFIG.SUITE_PRICE_MONTHLY || "$39/mo")})</button>
            <button type="button" class="btn btn-outline btn-sm" data-action="checkout-plan" data-plan="dfy">Book ${escapeHtml(CONFIG.DFY_PRICE || "$499")} DFY Setup →</button>
          </div>
        </div>
      </div>

      <div class="pricing-compare-wrap">
        <table class="pricing-compare-table" aria-label="ScopeLock Plan Comparison">
          <thead>
            <tr>
              <th>Capability</th>
              <th>Free Forever ($0)</th>
              <th>ScopeLock Pro ($29/mo · $179/yr)</th>
              <th>Margin Suite ($39/mo · $249/yr)</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map(([cap, f, p, s]) => `
              <tr>
                <td>${escapeHtml(cap)}</td>
                <td>${mark(f)}</td>
                <td>${mark(p)}</td>
                <td>${mark(s)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;

    if (isModal) return innerHtml;
    return `<section id="pricing-compare" class="pricing-section">${innerHtml}</section>`;
  }

  function renderProModal() {
    const prefix = CONFIG.LICENSE_PREFIX || "SL-PRO-";
    return `
      <div id="modal-pro" class="modal-backdrop hidden" role="dialog" aria-modal="true" aria-labelledby="modal-pro-title">
        <div class="modal-dialog">
          <div class="modal-header">
            <div>
              <h2 id="modal-pro-title">ScopeLock Pro &amp; Margin Suite</h2>
              <p class="card-sub">Merchant-of-Record checkout via Polar.sh or instant concierge activation.</p>
            </div>
            <button type="button" class="btn btn-ghost btn-sm" data-action="close-modal" data-modal="modal-pro" aria-label="Close modal">✕ Close</button>
          </div>

          ${renderPricingCompareHtml(true)}

          <div class="card" style="margin-top:16px;margin-bottom:0;">
            <div class="card-head" style="margin-bottom:8px;">
              <h3>Already have a Pro license key?</h3>
              <span class="card-sub">Activates locally with zero server login</span>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <input id="pro-license-input" class="input" style="flex:1;min-width:200px;" type="text" placeholder="Enter license key (e.g. ${escapeHtml(prefix)}XXXXXX)" />
              <button type="button" class="btn btn-primary" data-action="activate-license">Activate Key</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderLegalModal() {
    const supportEmail = CONFIG.SUPPORT_EMAIL || "bidliftco@gmail.com";
    return `
      <div id="modal-legal" class="modal-backdrop hidden" role="dialog" aria-modal="true" aria-labelledby="modal-legal-title">
        <div class="modal-dialog" style="max-width:620px;">
          <div class="modal-header">
            <div>
              <h2 id="modal-legal-title">Privacy, ESIGN &amp; 14-Day Refund Policy</h2>
              <p class="card-sub">ScopeLock zero-server architecture &amp; Merchant-of-Record terms</p>
            </div>
            <button type="button" class="btn btn-ghost btn-sm" data-action="close-modal" data-modal="modal-legal" aria-label="Close modal">✕ Close</button>
          </div>
          <div style="display:grid;gap:12px;font-size:13px;line-height:1.6;color:var(--text-secondary);">
            <div><strong style="color:var(--text-primary);">1. Zero-Server Privacy:</strong> All Change Orders, contract rollups, photos, and client signatures live exclusively in your browser storage or compressed <code>#c=</code> URL fragments, never on our servers.</div>
            <div><strong style="color:var(--text-primary);">2. ESIGN &amp; SHA-256 Digest:</strong> Clients check explicit ESIGN electronic acceptance prior to signing, locking line items, schedule delta, and totals under a cryptographic <code>SHA-256</code> integrity hash.</div>
            <div><strong style="color:var(--text-primary);">3. Polar.sh Billing &amp; 14-Day Refund Guarantee:</strong> Paid Pro and Suite subscriptions are processed securely by Polar.sh (Merchant of Record). Cancel anytime or email <a href="mailto:${escapeHtml(supportEmail)}">${escapeHtml(supportEmail)}</a> within 14 days for a full refund.</div>
          </div>
        </div>
      </div>
    `;
  }

  /* ------------------------------------------------------------------------
     Render Studio View
     ------------------------------------------------------------------------ */
  function renderStudioView() {
    const co = state.co;
    const totals = computeLedgerTotals(co);
    const budget = CODEC.estimatePayloadBytes(co);
    const revisedDateLabel = computeRevisedDate(co.baseCompletionDate, co.scheduleDeltaDays);
    const baseDateLabel = formatBaseDateLabel(co.baseCompletionDate);
    const budgetClass = budget.pct >= 92 ? "over" : budget.pct >= 72 ? "warn" : "";
    const budgetKb = (budget.estimatedEncodedChars / 1024).toFixed(1);
    const maxKb = (budget.budgetChars / 1024).toFixed(1);

    const lineItemsHtml = co.lineItems.map((it, idx) => {
      const sub = Math.round((Number(it.qty) || 0) * (Number(it.unitPrice) || 0) * 100) / 100;
      return `
        <div class="line-item-row" data-item-index="${idx}">
          <div class="line-item-top">
            <input type="text" class="input" data-field="item-name" data-idx="${idx}" value="${escapeHtml(it.name)}" placeholder="Line item description" aria-label="Line item description" />
            <input type="number" class="input mono" data-field="item-qty" data-idx="${idx}" value="${escapeHtml(it.qty)}" min="0" step="0.5" aria-label="Quantity" />
            <input type="text" class="input" data-field="item-unit" data-idx="${idx}" value="${escapeHtml(it.unit)}" placeholder="unit" aria-label="Unit" />
            <input type="number" class="input mono" data-field="item-price" data-idx="${idx}" value="${escapeHtml(it.unitPrice)}" min="0" step="1" aria-label="Unit price" />
            <div class="line-item-subtotal">${escapeHtml(formatMoney(sub, co.currency))}</div>
            <button type="button" class="btn btn-danger-ghost btn-sm" data-action="remove-item" data-idx="${idx}" aria-label="Remove item">✕</button>
          </div>
          <div class="line-item-note">
            <input type="text" class="input" data-field="item-note" data-idx="${idx}" value="${escapeHtml(it.note || "")}" placeholder="Field / scope justification note (optional)" aria-label="Item note" />
          </div>
        </div>
      `;
    }).join("");

    const photosHtml = (co.photos || []).map((ph, idx) => {
      const kb = (String(ph.dataUrl || "").length / 1024).toFixed(1);
      return `
        <div class="evidence-card">
          <img src="${escapeHtml(ph.dataUrl)}" alt="${escapeHtml(ph.caption || `Field evidence ${idx + 1}`)}" />
          <div class="evidence-meta">
            <input type="text" class="input" data-field="photo-caption" data-idx="${idx}" value="${escapeHtml(ph.caption || "")}" placeholder="Photo caption..." aria-label="Photo caption" />
            <div class="evidence-foot">
              <span class="mono">${escapeHtml(kb)} KB</span>
              <button type="button" class="btn btn-danger-ghost btn-sm" data-action="remove-photo" data-idx="${idx}">Remove</button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    const draftsOptions = state.drafts.length > 0
      ? state.drafts.map((d, i) => `<option value="${i}">${escapeHtml(d.coNumber || "CO")} · ${escapeHtml(d.clientName || d.label)} (${escapeHtml(formatMoney(d.coDeltaPrice, d.currency))})</option>`).join("")
      : `<option value="">No saved browser drafts yet</option>`;

    return `
      ${renderTopbar()}

      <section class="studio-hero">
        <div class="studio-hero-inner">
          <div>
            <span class="hero-eyebrow">Zero-Server • Photo-Backed • SHA-256 ESIGN</span>
            <h1>Lock Scope Changes Before Crew Hours Vanish</h1>
            <p>Turn jobsite discoveries or out-of-scope client requests into a sequential contract rollup ledger with compressed photo proof, schedule impact, and 1-tap ESIGN authorization.</p>
            <div style="margin-top:12px;display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;font-size:12px;">
              <span style="color:rgba(255,255,255,0.72);font-weight:600;">Guides:</span>
              <a href="./construction-change-order-template.html" style="color:#fde68a;font-weight:600;text-decoration:underline;">Construction CO</a>
              <a href="./roofing-decking-change-order-template.html" style="color:#fde68a;font-weight:600;text-decoration:underline;">Roofing Decking CO</a>
              <a href="./agency-scope-creep-change-order-template.html" style="color:#fde68a;font-weight:600;text-decoration:underline;">Agency Scope-Creep CO</a>
            </div>
          </div>
          <div class="hero-quick-panel">
            <label for="quick-co-input">Quick-CO Single-Line Parser</label>
            <div class="quick-co-row">
              <input id="quick-co-input" type="text" placeholder="6 sheets rotted OSB @ $115 + flashing $220, +2 days" />
              <button type="button" class="btn btn-accent" data-action="parse-quick-co">Apply</button>
            </div>
            <div class="quick-co-hint">Try: <code>3 hrs framing @ $125 + permit $180, +1 day</code></div>
          </div>
        </div>
      </section>

      <main class="main-shell">
        ${renderTemplateSelectorBar()}

        <div class="studio-grid">
          <div>
            <section class="card">
              <div class="card-head">
                <h2>1. Parties &amp; Contract Reference</h2>
                <span class="card-sub">Stays 100% inside your browser &amp; compressed link</span>
              </div>
              <div class="field-grid-2">
                <div class="field-group">
                  <label for="f-biz-name">Your Business Name</label>
                  <input id="f-biz-name" class="input" type="text" data-co-field="businessName" value="${escapeHtml(co.businessName)}" />
                </div>
                <div class="field-group">
                  <label for="f-biz-email">Your Email</label>
                  <input id="f-biz-email" class="input" type="email" data-co-field="businessEmail" value="${escapeHtml(co.businessEmail)}" />
                </div>
                <div class="field-group">
                  <label for="f-client-name">Client Name</label>
                  <input id="f-client-name" class="input" type="text" data-co-field="clientName" value="${escapeHtml(co.clientName)}" />
                </div>
                <div class="field-group">
                  <label for="f-city">Project City / Site Location</label>
                  <input id="f-city" class="input" type="text" data-co-field="projectCity" value="${escapeHtml(co.projectCity || "")}" placeholder="e.g. Austin, TX" />
                </div>
              </div>
              <div class="field-grid-3">
                <div class="field-group">
                  <label for="f-contract-ref">Original Contract / Job Ref</label>
                  <input id="f-contract-ref" class="input mono" type="text" data-co-field="contractRef" value="${escapeHtml(co.contractRef)}" />
                </div>
                <div class="field-group">
                  <label for="f-co-num">Change-Order #</label>
                  <input id="f-co-num" class="input mono" type="text" data-co-field="coNumber" value="${escapeHtml(co.coNumber || "CO-01")}" />
                </div>
                <div class="field-group">
                  <label for="f-currency">Currency</label>
                  <select id="f-currency" class="input" data-co-field="currency">
                    ${Object.values(CONFIG.CURRENCIES || { USD: { code: "USD", label: "USD ($)" } }).map((c) => `
                      <option value="${escapeHtml(c.code)}" ${c.code === co.currency ? "selected" : ""}>${escapeHtml(c.label)}</option>
                    `).join("")}
                  </select>
                </div>
              </div>
            </section>

            <section class="card">
              <div class="card-head">
                <h2>2. Contract Rollup, Schedule &amp; Reason Badge</h2>
                <span class="reason-badge ${getReasonBadgeClass(co.reasonCode)}">${escapeHtml(co.reasonCode)}</span>
              </div>
              <div class="field-grid-3">
                <div class="field-group">
                  <label for="f-orig-price">Original Contract ($)</label>
                  <input id="f-orig-price" class="input mono" type="number" min="0" step="50" data-co-num="originalContractPrice" value="${escapeHtml(co.originalContractPrice)}" />
                </div>
                <div class="field-group">
                  <label for="f-prior-cos">Prior Approved COs ($)</label>
                  <input id="f-prior-cos" class="input mono" type="number" min="0" step="25" data-co-num="priorApprovedCos" value="${escapeHtml(co.priorApprovedCos)}" />
                </div>
                <div class="field-group">
                  <label for="f-sched-days">Schedule Delta (+Days)</label>
                  <input id="f-sched-days" class="input mono" type="number" min="0" max="365" step="1" data-co-num="scheduleDeltaDays" value="${escapeHtml(co.scheduleDeltaDays)}" />
                </div>
              </div>
              <div class="field-grid-2">
                <div class="field-group">
                  <label for="f-base-date">Current Baseline Completion Date</label>
                  <input id="f-base-date" class="input mono" type="date" data-co-field="baseCompletionDate" value="${escapeHtml(co.baseCompletionDate || defaultBaseDateIso())}" />
                </div>
                <div class="field-group">
                  <label>Reason Code</label>
                  <div class="reason-group" role="group" aria-label="Change Order Reason Code">
                    ${REASON_CODES.map((rc) => `
                      <button type="button" class="reason-btn ${co.reasonCode === rc ? "active" : ""}" data-action="set-reason" data-reason="${escapeHtml(rc)}">${escapeHtml(rc)}</button>
                    `).join("")}
                  </div>
                </div>
              </div>
              <div class="field-group" style="margin-bottom:0;">
                <label for="f-summary-note">Discovery / Scope Change Summary</label>
                <textarea id="f-summary-note" class="textarea" data-co-field="summaryNote">${escapeHtml(co.summaryNote || "")}</textarea>
              </div>
            </section>

            <section class="card">
              <div class="card-head">
                <div>
                  <h2>3. Itemized Change-Order Scope</h2>
                  <span class="card-sub">Line totals automatically reconcile to <strong class="mono">${escapeHtml(formatMoney(totals.delta, co.currency))}</strong></span>
                </div>
                <button type="button" class="btn btn-outline btn-sm" data-action="add-item">+ Add Line Item</button>
              </div>
              <div class="line-items-list">
                ${lineItemsHtml}
              </div>
            </section>

            <section class="card">
              <div class="card-head">
                <div>
                  <h2>4. Field Photo Evidence (${(co.photos || []).length}/4)</h2>
                  <span class="card-sub">Auto-compressed to &le;640px WebP/JPEG (~5–8KB) inside the link</span>
                </div>
              </div>

              <div class="budget-box">
                <div class="budget-top">
                  <span>URL Payload Budget</span>
                  <span class="mono">${escapeHtml(budgetKb)} KB / ${escapeHtml(maxKb)} KB (${escapeHtml(budget.pct)}%)</span>
                </div>
                <div class="budget-track">
                  <div class="budget-fill ${budgetClass}" style="width:${Math.min(100, budget.pct)}%;"></div>
                </div>
              </div>

              <div class="upload-row">
                <label class="btn btn-outline btn-sm" for="photo-upload-input">
                  + Upload Field Photo(s)
                </label>
                <input id="photo-upload-input" class="hidden" type="file" accept="image/*" multiple ${(co.photos || []).length >= 4 ? "disabled" : ""} />
                <button type="button" class="btn btn-ghost btn-sm" data-action="add-sample-photo" ${(co.photos || []).length >= 4 ? "disabled" : ""}>Load Sample Field Photo</button>
              </div>

              ${(co.photos || []).length > 0 ? `<div class="evidence-grid">${photosHtml}</div>` : `<p class="card-sub">No jobsite photos attached yet. Upload up to 4 photos or click "Load Sample Field Photo" to test.</p>`}
            </section>

            <section class="card">
              <div class="card-head">
                <h2>5. Direct Payment Handoff (0% Fee) &amp; Terms</h2>
                <span class="card-sub">Clients pay your own payment link directly</span>
              </div>
              <div class="field-grid-2">
                <div class="field-group">
                  <label for="f-pay-provider">Payment Provider</label>
                  <select id="f-pay-provider" class="input" data-co-field="paymentProvider">
                    <option value="stripe" ${co.paymentProvider === "stripe" ? "selected" : ""}>Stripe Payment Link</option>
                    <option value="paypal" ${co.paymentProvider === "paypal" ? "selected" : ""}>PayPal.me</option>
                    <option value="square" ${co.paymentProvider === "square" ? "selected" : ""}>Square Checkout</option>
                    <option value="venmo" ${co.paymentProvider === "venmo" ? "selected" : ""}>Venmo Business</option>
                    <option value="zelle" ${co.paymentProvider === "zelle" ? "selected" : ""}>Zelle / Invoice Net</option>
                  </select>
                </div>
                <div class="field-group">
                  <label for="f-pay-link">Direct HTTPS Payment URL (Optional)</label>
                  <input id="f-pay-link" class="input" type="url" data-co-field="paymentLink" value="${escapeHtml(co.paymentLink || "")}" placeholder="https://buy.stripe.com/..." />
                </div>
              </div>
              <div class="field-group">
                <label for="f-terms">Change-Order Terms &amp; Authorization Clause</label>
                <textarea id="f-terms" class="textarea" data-co-field="terms">${escapeHtml(co.terms || "")}</textarea>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;">
                <span class="card-sub">${state.isPro ? "✓ White-Label Mode active on client links" : "Upgrade to Pro to remove ScopeLock footer branding on client links"}</span>
                ${!state.isPro ? `<button type="button" class="btn btn-outline btn-sm" data-action="open-modal" data-modal="modal-pro">Unlock White-Label</button>` : ""}
              </div>
            </section>
          </div>

          <aside class="sticky-panel">
            <div class="ledger-card">
              <div class="ledger-head">
                <h3>Sequential Contract Ledger</h3>
                <span class="mono" style="font-size:12px;color:#cbd5e1;">${escapeHtml(co.coNumber || "CO-01")}</span>
              </div>
              <div class="ledger-rows">
                <div class="ledger-row">
                  <span>Original Contract</span>
                  <span class="mono">${escapeHtml(formatMoney(totals.orig, co.currency))}</span>
                </div>
                <div class="ledger-row">
                  <span>+ Prior Approved COs</span>
                  <span class="mono">${escapeHtml(formatMoney(totals.prior, co.currency))}</span>
                </div>
                <div class="ledger-row is-delta">
                  <span>+ This Change Order Delta</span>
                  <span class="mono">+${escapeHtml(formatMoney(totals.delta, co.currency))}</span>
                </div>
                <hr class="ledger-divider" />
                <div class="ledger-total">
                  <span>New Revised Total</span>
                  <strong class="mono">${escapeHtml(formatMoney(totals.revised, co.currency))}</strong>
                </div>
              </div>
              <div class="ledger-schedule">
                <span>Schedule Shift: <strong class="mono">+${escapeHtml(co.scheduleDeltaDays)} day${Number(co.scheduleDeltaDays) === 1 ? "" : "s"}</strong></span>
                <span class="mono">${escapeHtml(baseDateLabel)} → <strong>${escapeHtml(revisedDateLabel)}</strong></span>
              </div>
            </div>

            <div class="card share-actions-card">
              <button type="button" id="btn-copy-co-link" class="btn btn-primary btn-lg" data-action="generate-share-link">
                Generate &amp; Copy Client Sign-Off Link
              </button>
              <button type="button" class="btn btn-accent" data-action="open-demo">
                Try Live Client Sign-Off View →
              </button>
              ${state.generatedShareUrl ? `
                <div class="generated-link-box">
                  <strong>Shareable Zero-Server Link Ready:</strong>
                  <div class="mono" style="margin-top:4px;">${escapeHtml(state.generatedShareUrl.slice(0, 140))}${state.generatedShareUrl.length > 140 ? "..." : ""}</div>
                </div>
              ` : ""}

              <hr style="border:0;border-top:1px solid var(--border-subtle);margin:4px 0;" />

              <div class="field-group" style="margin-bottom:4px;">
                <label for="drafts-select">Load Browser Draft (${state.drafts.length})</label>
                <div style="display:flex;gap:6px;">
                  <select id="drafts-select" class="input" style="flex:1;">${draftsOptions}</select>
                  <button type="button" class="btn btn-outline btn-sm" data-action="load-draft">Load</button>
                </div>
              </div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <button type="button" class="btn btn-ghost btn-sm" data-action="export-json">Export JSON Backup</button>
                <button type="button" class="btn btn-ghost btn-sm" data-action="reset-template">Reset Template</button>
              </div>
            </div>
          </aside>
        </div>

        ${renderPricingCompareHtml(false)}
      </main>

      <footer class="site-footer no-print">
        <div class="site-footer-inner">
          <span><strong>ScopeLock</strong> — Zero-Server Change-Order Authorization Studio</span>
          <div class="footer-links">
            <a href="./calculator.html?ref=footer">Scope-Creep Margin Calculator</a>
            <a href="./construction-change-order-template.html">Construction CO Template</a>
            <a href="./roofing-decking-change-order-template.html">Roofing Decking CO</a>
            <a href="./agency-scope-creep-change-order-template.html">Agency Scope-Creep CO</a>
            <a href="${escapeHtml((CONFIG.CROSS_LINKS && CONFIG.CROSS_LINKS.BIDLIFT_URL) || "https://bidlift-5ias.onrender.com/")}" target="_blank" rel="noopener noreferrer">BidLift Quoting</a>
            <a href="${escapeHtml((CONFIG.CROSS_LINKS && CONFIG.CROSS_LINKS.TRUSTVAULT_URL) || "https://trustvault-zdof.onrender.com/")}" target="_blank" rel="noopener noreferrer">TrustVault</a>
            <button type="button" class="btn btn-ghost btn-sm" data-action="open-modal" data-modal="modal-legal">Privacy &amp; 14-Day Refund</button>
          </div>
        </div>
      </footer>

      ${renderProModal()}
      ${renderLegalModal()}
    `;
  }

  /* ------------------------------------------------------------------------
     Render Client Sign-Off View
     ------------------------------------------------------------------------ */
  function renderClientView() {
    const co = state.co;
    const totals = computeLedgerTotals(co);
    const baseDateLabel = formatBaseDateLabel(co.baseCompletionDate);
    const revisedDateLabel = computeRevisedDate(co.baseCompletionDate, co.scheduleDeltaDays);
    const safePayLink = sanitizeHref(co.paymentLink);
    const providerNames = {
      stripe: "Stripe",
      paypal: "PayPal",
      square: "Square",
      venmo: "Venmo",
      zelle: "Direct Payment"
    };
    const payLabel = providerNames[co.paymentProvider] || "Direct Payment";

    const photosToDisplay = (co.photos && co.photos.length > 0)
      ? co.photos
      : (state.isDemoPreview ? DEMO_SAMPLE_PHOTOS : []);

    const photoStripHtml = photosToDisplay.length > 0
      ? `
        <h3 style="font-size:15px;margin-bottom:6px;">Field / Scope Evidence Photos (${photosToDisplay.length})</h3>
        <div class="client-photo-strip">
          ${photosToDisplay.map((ph, idx) => `
            <figure class="client-photo-item" style="margin:0;">
              <img src="${escapeHtml(ph.dataUrl)}" alt="${escapeHtml(ph.caption || `Evidence Photo ${idx + 1}`)}" />
              <figcaption>${escapeHtml(ph.caption || `Evidence Photo #${idx + 1}`)}</figcaption>
            </figure>
          `).join("")}
        </div>
      `
      : "";

    const rowsHtml = co.lineItems.map((it) => {
      const sub = Math.round((Number(it.qty) || 0) * (Number(it.unitPrice) || 0) * 100) / 100;
      return `
        <tr>
          <td>
            <strong>${escapeHtml(it.name)}</strong>
            ${it.note ? `<div style="font-size:12px;color:var(--text-muted);margin-top:2px;">${escapeHtml(it.note)}</div>` : ""}
          </td>
          <td class="num mono">${escapeHtml(it.qty)} ${escapeHtml(it.unit || "")}</td>
          <td class="num mono">${escapeHtml(formatMoney(it.unitPrice, co.currency))}</td>
          <td class="num mono"><strong>${escapeHtml(formatMoney(sub, co.currency))}</strong></td>
        </tr>
      `;
    }).join("");

    const receipt = state.receipt;
    const authSectionHtml = receipt
      ? `
        <div class="receipt-box">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <h2 style="color:var(--success);font-size:20px;">✓ Change Order Authorized &amp; Locked</h2>
            <span class="mono" style="font-size:12px;font-weight:700;">${escapeHtml(receipt.signedAtUtc)}</span>
          </div>
          <p style="margin:6px 0 10px;font-size:13.5px;">
            Authorized by <strong>${escapeHtml(receipt.signerName)}</strong>${receipt.signerTitle ? ` (${escapeHtml(receipt.signerTitle)})` : ""} — Revised Contract Total: <strong class="mono">${escapeHtml(formatMoney(totals.revised, co.currency))}</strong> (${escapeHtml(revisedDateLabel)}).
          </p>
          ${receipt.sigDataUrl ? `
            <div style="background:#ffffff;border:1px solid var(--border-subtle);border-radius:8px;padding:8px;display:inline-block;margin-bottom:8px;">
              <img src="${escapeHtml(receipt.sigDataUrl)}" alt="Client electronic signature" style="max-height:76px;display:block;" />
            </div>
          ` : ""}
          <div class="receipt-digest">
            <div style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;margin-bottom:3px;">SHA-256 Authorization Digest</div>
            <code class="mono">${escapeHtml(receipt.sha256Digest)}</code>
          </div>
          <div class="receipt-actions no-print">
            ${safePayLink ? `<a class="btn btn-primary" href="${escapeHtml(safePayLink)}" target="_blank" rel="noopener noreferrer">Pay ${escapeHtml(formatMoney(totals.delta, co.currency))} via ${escapeHtml(payLabel)} (0% Fee) →</a>` : ""}
            <button type="button" class="btn btn-outline" data-action="print-receipt">Print / Save PDF Receipt</button>
            <button type="button" class="btn btn-accent" data-action="copy-sms-receipt">Copy SMS Receipt</button>
          </div>
          <div class="cross-promo-bar no-print">
            <span>Powered by <strong>ScopeLock</strong> &amp; <strong>BidLift</strong> (0% transaction cut)</span>
            <div style="display:flex;gap:12px;flex-wrap:wrap;">
              <a href="${escapeHtml((CONFIG.CROSS_LINKS && CONFIG.CROSS_LINKS.BIDLIFT_URL) || "https://bidlift-5ias.onrender.com/")}" target="_blank" rel="noopener noreferrer">Create 3-Tier Quotes with BidLift →</a>
              <a href="${escapeHtml((CONFIG.CROSS_LINKS && CONFIG.CROSS_LINKS.TRUSTVAULT_URL) || "https://trustvault-zdof.onrender.com/")}" target="_blank" rel="noopener noreferrer">TrustVault Proof →</a>
            </div>
          </div>
        </div>
      `
      : `
        <div class="esign-box no-print">
          <h2 style="font-size:18px;margin-bottom:6px;">Electronic Change-Order Authorization</h2>
          <p class="card-sub" style="margin-bottom:14px;">Review the revised contract total and schedule shift above, sign below, and generate your SHA-256 verification receipt.</p>

          <div class="field-grid-2">
            <div class="field-group">
              <label for="client-signer-name">Full Name (Required)</label>
              <input id="client-signer-name" class="input" type="text" value="${escapeHtml(co.clientName || "")}" placeholder="Enter your full legal name" />
            </div>
            <div class="field-group">
              <label for="client-signer-title">Title / Role (Optional)</label>
              <input id="client-signer-title" class="input" type="text" placeholder="e.g. Homeowner / Project Sponsor" />
            </div>
          </div>

          <label class="esign-consent-row">
            <input id="client-esign-consent" type="checkbox" />
            <span>I consent to execute this Change Order electronically under the U.S. ESIGN Act &amp; UETA, authorizing the <strong class="mono">+${escapeHtml(formatMoney(totals.delta, co.currency))}</strong> adjustment (new revised total <strong class="mono">${escapeHtml(formatMoney(totals.revised, co.currency))}</strong>) and <strong class="mono">+${escapeHtml(co.scheduleDeltaDays)} day${Number(co.scheduleDeltaDays) === 1 ? "" : "s"}</strong> completion shift.</span>
          </label>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <span style="font-size:12px;font-weight:700;color:var(--text-secondary);">Draw Signature Below</span>
            <button type="button" class="btn btn-ghost btn-sm" data-action="clear-sig">Clear Pad</button>
          </div>
          <div class="sig-pad-wrap">
            <canvas id="sig-canvas" class="sig-canvas" width="780" height="145" aria-label="Electronic signature pad"></canvas>
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
            <button type="button" id="btn-authorize-co" class="btn btn-success btn-lg" data-action="sign-co">
              Authorize &amp; Lock Scope (${escapeHtml(formatMoney(totals.revised, co.currency))}) →
            </button>
            ${safePayLink ? `<span class="card-sub">Direct ${escapeHtml(payLabel)} payment link unlocks immediately upon sign-off (0% platform cut).</span>` : ""}
          </div>
        </div>
      `;

    return `
      <div class="client-banner no-print">
        <div class="client-banner-inner">
          <div style="font-size:13px;font-weight:600;">
            ${state.isSharedLink
              ? "🔒 Zero-Server SHA-256 Protected Change Order"
              : "👁 Previewing Live Client Sign-Off View (Interactive Demo)"}
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            ${!state.isSharedLink
              ? `<button type="button" class="btn btn-accent btn-sm" data-action="back-to-studio">← Back to Studio Editor</button>`
              : `<a class="btn btn-outline btn-sm" href="./?ref=client_footer">Create Free Change Orders</a>`}
          </div>
        </div>
      </div>

      <main class="client-shell">
        <article class="client-doc">
          <div class="client-doc-header">
            <div>
              <span class="reason-badge ${getReasonBadgeClass(co.reasonCode)}">${escapeHtml(co.reasonCode)}</span>
              <h1>${escapeHtml(co.businessName || "Service Provider")} — ${escapeHtml(co.coNumber || "CO-01")}</h1>
              <div style="color:var(--text-secondary);font-size:13.5px;">${escapeHtml(co.label || "Change Order Authorization")}${co.projectCity ? ` • ${escapeHtml(co.projectCity)}` : ""}</div>
            </div>
            <div style="text-align:right;">
              <div class="card-sub">Contract Reference</div>
              <strong class="mono" style="font-size:16px;">${escapeHtml(co.contractRef || "CONTRACT-01")}</strong>
            </div>
          </div>

          <div class="client-meta-grid">
            <div class="client-meta-tile">
              <small>Client</small>
              <strong>${escapeHtml(co.clientName || "Authorized Client")}</strong>
            </div>
            <div class="client-meta-tile">
              <small>Provider Contact</small>
              <strong>${escapeHtml(co.businessEmail || "Direct")}</strong>
            </div>
            <div class="client-meta-tile">
              <small>Baseline Completion</small>
              <strong class="mono">${escapeHtml(baseDateLabel)}</strong>
            </div>
            <div class="client-meta-tile">
              <small>Revised Completion</small>
              <strong class="mono">${escapeHtml(revisedDateLabel)} (+${escapeHtml(co.scheduleDeltaDays)}d)</strong>
            </div>
          </div>

          <div class="ledger-card">
            <div class="ledger-head">
              <h3>Before &amp; After Contract Ledger</h3>
              <span class="mono" style="font-size:12px;color:#cbd5e1;">${escapeHtml(co.coNumber || "CO-01")}</span>
            </div>
            <div class="ledger-rows">
              <div class="ledger-row">
                <span>Original Contract Price</span>
                <span class="mono">${escapeHtml(formatMoney(totals.orig, co.currency))}</span>
              </div>
              <div class="ledger-row">
                <span>+ Prior Approved Change Orders</span>
                <span class="mono">${escapeHtml(formatMoney(totals.prior, co.currency))}</span>
              </div>
              <div class="ledger-row is-delta">
                <span>+ This Change Order Delta</span>
                <span class="mono">+${escapeHtml(formatMoney(totals.delta, co.currency))}</span>
              </div>
              <hr class="ledger-divider" />
              <div class="ledger-total">
                <span>New Revised Contract Total</span>
                <strong class="mono">${escapeHtml(formatMoney(totals.revised, co.currency))}</strong>
              </div>
            </div>
            <div class="ledger-schedule">
              <span>Schedule Impact: <strong class="mono">+${escapeHtml(co.scheduleDeltaDays)} day${Number(co.scheduleDeltaDays) === 1 ? "" : "s"}</strong></span>
              <span class="mono">New Target Date: <strong>${escapeHtml(revisedDateLabel)}</strong></span>
            </div>
          </div>

          ${co.summaryNote ? `
            <div style="margin-bottom:18px;">
              <h3 style="font-size:15px;margin-bottom:6px;">Scope Discovery &amp; Justification</h3>
              <p style="margin:0;color:var(--text-secondary);">${escapeHtml(co.summaryNote)}</p>
            </div>
          ` : ""}

          ${photoStripHtml}

          <h3 style="font-size:15px;margin-bottom:8px;">Itemized Change-Order Breakdown</h3>
          <div class="scope-table-wrap">
            <table class="scope-table">
              <thead>
                <tr>
                  <th>Description &amp; Justification</th>
                  <th class="num">Qty</th>
                  <th class="num">Unit Price</th>
                  <th class="num">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
                <tr>
                  <td colspan="3" class="num"><strong>Change Order Total</strong></td>
                  <td class="num mono"><strong>+${escapeHtml(formatMoney(totals.delta, co.currency))}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          ${co.terms ? `
            <div class="terms-box">
              <strong style="display:block;color:var(--text-primary);margin-bottom:4px;">Terms &amp; Warranty</strong>
              ${escapeHtml(co.terms)}
            </div>
          ` : ""}

          ${authSectionHtml}

          ${!co.whiteLabel && !state.isPro ? `
            <div class="no-print" style="text-align:center;margin-top:20px;font-size:12px;color:var(--text-muted);">
              Authorized via <a href="./?ref=client_badge" style="color:var(--brand);font-weight:700;">ScopeLock</a> — Zero-Server Change-Order Studio
            </div>
          ` : ""}
        </article>
      </main>
    `;
  }

  /* ------------------------------------------------------------------------
     Canvas Signature Pad
     ------------------------------------------------------------------------ */
  function initSignaturePad() {
    const canvas = document.getElementById("sig-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 2.6;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    let drawing = false;
    state.sigHasStroke = false;

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    };

    canvas.addEventListener("pointerdown", (e) => {
      drawing = true;
      canvas.setPointerCapture(e.pointerId);
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      state.sigHasStroke = true;
    });

    canvas.addEventListener("pointermove", (e) => {
      if (!drawing) return;
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    });

    const stopDraw = () => { drawing = false; };
    canvas.addEventListener("pointerup", stopDraw);
    canvas.addEventListener("pointercancel", stopDraw);
  }

  function clearSignaturePad() {
    const canvas = document.getElementById("sig-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    state.sigHasStroke = false;
  }

  async function handleSignChangeOrder() {
    const nameEl = document.getElementById("client-signer-name");
    const titleEl = document.getElementById("client-signer-title");
    const consentEl = document.getElementById("client-esign-consent");
    const canvas = document.getElementById("sig-canvas");

    const signerName = (nameEl && nameEl.value || "").trim();
    const signerTitle = (titleEl && titleEl.value || "").trim();
    if (!signerName) {
      showToast("Please enter your full printed name.");
      if (nameEl) nameEl.focus();
      return;
    }
    if (!consentEl || !consentEl.checked) {
      showToast("Please check the ESIGN electronic authorization box.");
      return;
    }
    if (!state.sigHasStroke || !canvas) {
      showToast("Please draw your signature on the pad.");
      return;
    }

    const totals = computeLedgerTotals(state.co);
    const signedAtUtc = new Date().toISOString();
    const sigDataUrl = canvas.toDataURL("image/png");

    const digestPayload = {
      contractRef: state.co.contractRef,
      coNumber: state.co.coNumber,
      reasonCode: state.co.reasonCode,
      originalContractPrice: totals.orig,
      priorApprovedCos: totals.prior,
      coDeltaPrice: totals.delta,
      revisedTotal: totals.revised,
      scheduleDeltaDays: state.co.scheduleDeltaDays,
      lineItems: state.co.lineItems,
      terms: state.co.terms,
      signerName,
      signedAtUtc
    };

    const sha256Digest = await CODEC.computeSha256Digest(digestPayload);
    state.receipt = {
      signerName,
      signerTitle,
      signedAtUtc,
      sigDataUrl,
      sha256Digest
    };

    if (TELEMETRY) {
      TELEMETRY.track("co_signed", {
        template_id: state.co.id || "custom",
        reason_code: state.co.reasonCode,
        schedule_delta_days: Number(state.co.scheduleDeltaDays) || 0,
        photo_count: (state.co.photos || []).length,
        has_payment_link: Boolean(sanitizeHref(state.co.paymentLink))
      });
    }

    showToast("Change Order authorized with SHA-256 digest!");
    render();
  }

  /* ------------------------------------------------------------------------
     Modal Controls & Event Listeners
     ------------------------------------------------------------------------ */
  function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove("hidden");
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  }

  function refreshLedgerDisplayOnly() {
    const totals = computeLedgerTotals(state.co);
    const revisedDateLabel = computeRevisedDate(state.co.baseCompletionDate, state.co.scheduleDeltaDays);
    const baseDateLabel = formatBaseDateLabel(state.co.baseCompletionDate);
    const budget = CODEC.estimatePayloadBytes(state.co);

    const ledgerCard = document.querySelector(".sticky-panel .ledger-card");
    if (ledgerCard) {
      ledgerCard.innerHTML = `
        <div class="ledger-head">
          <h3>Sequential Contract Ledger</h3>
          <span class="mono" style="font-size:12px;color:#cbd5e1;">${escapeHtml(state.co.coNumber || "CO-01")}</span>
        </div>
        <div class="ledger-rows">
          <div class="ledger-row"><span>Original Contract</span><span class="mono">${escapeHtml(formatMoney(totals.orig, state.co.currency))}</span></div>
          <div class="ledger-row"><span>+ Prior Approved COs</span><span class="mono">${escapeHtml(formatMoney(totals.prior, state.co.currency))}</span></div>
          <div class="ledger-row is-delta"><span>+ This Change Order Delta</span><span class="mono">+${escapeHtml(formatMoney(totals.delta, state.co.currency))}</span></div>
          <hr class="ledger-divider" />
          <div class="ledger-total"><span>New Revised Total</span><strong class="mono">${escapeHtml(formatMoney(totals.revised, state.co.currency))}</strong></div>
        </div>
        <div class="ledger-schedule">
          <span>Schedule Shift: <strong class="mono">+${escapeHtml(state.co.scheduleDeltaDays)} day${Number(state.co.scheduleDeltaDays) === 1 ? "" : "s"}</strong></span>
          <span class="mono">${escapeHtml(baseDateLabel)} → <strong>${escapeHtml(revisedDateLabel)}</strong></span>
        </div>
      `;
    }

    const budgetBox = document.querySelector(".budget-box");
    if (budgetBox) {
      const budgetClass = budget.pct >= 92 ? "over" : budget.pct >= 72 ? "warn" : "";
      const budgetKb = (budget.estimatedEncodedChars / 1024).toFixed(1);
      const maxKb = (budget.budgetChars / 1024).toFixed(1);
      budgetBox.innerHTML = `
        <div class="budget-top">
          <span>URL Payload Budget</span>
          <span class="mono">${escapeHtml(budgetKb)} KB / ${escapeHtml(maxKb)} KB (${escapeHtml(budget.pct)}%)</span>
        </div>
        <div class="budget-track">
          <div class="budget-fill ${budgetClass}" style="width:${Math.min(100, budget.pct)}%;"></div>
        </div>
      `;
    }
  }

  function bindEvents() {
    const app = document.getElementById("app");
    if (!app) return;

    app.addEventListener("input", (e) => {
      const target = e.target;
      if (!target || !state.co) return;

      if (target.dataset.coField) {
        state.co[target.dataset.coField] = target.value;
        state.generatedShareUrl = "";
        saveCurrentLocal();
        refreshLedgerDisplayOnly();
        return;
      }

      if (target.dataset.coNum) {
        state.co[target.dataset.coNum] = Math.max(0, Number(target.value) || 0);
        state.generatedShareUrl = "";
        saveCurrentLocal();
        refreshLedgerDisplayOnly();
        return;
      }

      const idx = Number(target.dataset.idx);
      if (target.dataset.field && Number.isInteger(idx) && state.co.lineItems[idx]) {
        const item = state.co.lineItems[idx];
        if (target.dataset.field === "item-name") item.name = target.value;
        if (target.dataset.field === "item-qty") item.qty = Math.max(0, Number(target.value) || 0);
        if (target.dataset.field === "item-unit") item.unit = target.value;
        if (target.dataset.field === "item-price") item.unitPrice = Math.max(0, Number(target.value) || 0);
        if (target.dataset.field === "item-note") item.note = target.value;
        recalcCoDelta(state.co);
        state.generatedShareUrl = "";
        saveCurrentLocal();

        const row = target.closest(".line-item-row");
        const subEl = row && row.querySelector(".line-item-subtotal");
        if (subEl) {
          const sub = Math.round((Number(item.qty) || 0) * (Number(item.unitPrice) || 0) * 100) / 100;
          subEl.textContent = formatMoney(sub, state.co.currency);
        }
        refreshLedgerDisplayOnly();
        return;
      }

      if (target.dataset.field === "photo-caption" && Number.isInteger(idx) && state.co.photos[idx]) {
        state.co.photos[idx].caption = target.value;
        saveCurrentLocal();
      }
    });

    app.addEventListener("change", async (e) => {
      const target = e.target;
      if (!target) return;

      if (target.id === "template-dropdown") {
        state.co = cloneTemplate(target.value);
        state.generatedShareUrl = "";
        state.receipt = null;
        saveCurrentLocal();
        render();
        return;
      }

      if (target.dataset.coField === "currency" || target.dataset.coField === "baseCompletionDate") {
        state.co[target.dataset.coField] = target.value;
        saveCurrentLocal();
        render();
        return;
      }

      if (target.id === "photo-upload-input" && target.files && target.files.length > 0) {
        const remainingSlots = Math.max(0, 4 - (state.co.photos || []).length);
        const files = Array.from(target.files).slice(0, remainingSlots);
        for (const file of files) {
          try {
            const dataUrl = await CODEC.downscaleEvidencePhoto(file);
            state.co.photos = state.co.photos || [];
            state.co.photos.push({
              caption: file.name.replace(/\.[^.]+$/, "").slice(0, 60) || `Evidence #${state.co.photos.length + 1}`,
              dataUrl
            });
          } catch (err) {
            showToast(err.message || "Could not process photo.");
          }
        }
        saveCurrentLocal();
        render();
      }
    });

    app.addEventListener("keydown", (e) => {
      if (e.target && e.target.id === "quick-co-input" && e.key === "Enter") {
        e.preventDefault();
        applyQuickCoFromInput();
      }
    });

    app.addEventListener("click", async (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) {
        if (e.target.classList.contains("modal-backdrop")) {
          e.target.classList.add("hidden");
        }
        return;
      }

      const action = btn.dataset.action;
      if (action === "load-template") {
        state.co = cloneTemplate(btn.dataset.templateId);
        state.generatedShareUrl = "";
        state.receipt = null;
        saveCurrentLocal();
        render();
      } else if (action === "parse-quick-co") {
        applyQuickCoFromInput();
      } else if (action === "set-reason") {
        state.co.reasonCode = btn.dataset.reason || "Hidden Condition";
        saveCurrentLocal();
        render();
      } else if (action === "add-item") {
        state.co.lineItems.push({ name: "Additional Scope Item", qty: 1, unit: "job", unitPrice: 250, note: "" });
        recalcCoDelta(state.co);
        saveCurrentLocal();
        render();
      } else if (action === "remove-item") {
        const idx = Number(btn.dataset.idx);
        if (state.co.lineItems.length <= 1) {
          showToast("At least one line item is required.");
          return;
        }
        state.co.lineItems.splice(idx, 1);
        recalcCoDelta(state.co);
        saveCurrentLocal();
        render();
      } else if (action === "remove-photo") {
        const idx = Number(btn.dataset.idx);
        state.co.photos.splice(idx, 1);
        saveCurrentLocal();
        render();
      } else if (action === "add-sample-photo") {
        state.co.photos = state.co.photos || [];
        if (state.co.photos.length >= 4) return;
        const sample = DEMO_SAMPLE_PHOTOS[state.co.photos.length % DEMO_SAMPLE_PHOTOS.length];
        state.co.photos.push({ caption: sample.caption, dataUrl: sample.dataUrl });
        saveCurrentLocal();
        render();
      } else if (action === "generate-share-link") {
        try {
          const encoded = await CODEC.encodeChangeOrder(state.co);
          const url = `${window.location.origin}${window.location.pathname}#c=${encoded}`;
          state.generatedShareUrl = url;
          copyToClipboard(url, "Client sign-off link copied to clipboard!");
          if (TELEMETRY) {
            TELEMETRY.track("co_link_created", {
              template_id: state.co.id || "custom",
              reason_code: state.co.reasonCode,
              photo_count: (state.co.photos || []).length,
              has_payment_link: Boolean(sanitizeHref(state.co.paymentLink))
            });
          }
          render();
        } catch (err) {
          showToast(err.message || "Payload exceeds 24,000-char limit.");
        }
      } else if (action === "open-demo") {
        state.mode = "client";
        state.isDemoPreview = true;
        state.receipt = null;
        if (TELEMETRY) {
          TELEMETRY.track("client_demo_opened", {
            template_id: state.co.id || "custom",
            reason_code: state.co.reasonCode,
            is_demo: true
          });
        }
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (action === "back-to-studio") {
        state.mode = "studio";
        state.isDemoPreview = false;
        state.receipt = null;
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (action === "clear-sig") {
        clearSignaturePad();
      } else if (action === "sign-co") {
        await handleSignChangeOrder();
      } else if (action === "print-receipt") {
        window.print();
      } else if (action === "copy-sms-receipt") {
        const totals = computeLedgerTotals(state.co);
        const rec = state.receipt;
        const sms = `APPROVED: ${state.co.coNumber || "CO-01"} for ${state.co.contractRef || "Contract"} (+${formatMoney(totals.delta, state.co.currency)}, Revised Total ${formatMoney(totals.revised, state.co.currency)}, +${state.co.scheduleDeltaDays}d). Signed by ${rec.signerName}. SHA-256: ${rec.sha256Digest.slice(0, 16)}`;
        copyToClipboard(sms, "SMS authorization receipt copied!");
      } else if (action === "save-draft") {
        saveDraftToList();
        render();
      } else if (action === "load-draft") {
        const sel = document.getElementById("drafts-select");
        const idx = sel ? parseInt(sel.value, 10) : NaN;
        if (Number.isInteger(idx) && state.drafts[idx]) {
          state.co = JSON.parse(JSON.stringify(state.drafts[idx]));
          recalcCoDelta(state.co);
          saveCurrentLocal();
          showToast("Loaded saved draft.");
          render();
        }
      } else if (action === "export-json") {
        const blob = new Blob([JSON.stringify(state.co, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${(state.co.contractRef || "scopelock").toLowerCase()}-${(state.co.coNumber || "co").toLowerCase()}.json`;
        a.click();
        URL.revokeObjectURL(a.href);
        showToast("Exported local JSON backup.");
      } else if (action === "reset-template") {
        state.co = cloneTemplate(state.co.id || "roofing_co");
        state.generatedShareUrl = "";
        saveCurrentLocal();
        showToast("Template reset to clean defaults.");
        render();
      } else if (action === "toggle-theme") {
        toggleTheme();
      } else if (action === "open-modal") {
        openModal(btn.dataset.modal);
      } else if (action === "close-modal") {
        closeModal(btn.dataset.modal);
      } else if (action === "checkout-plan") {
        handleCheckoutPlan(btn.dataset.plan);
      } else if (action === "activate-license") {
        const input = document.getElementById("pro-license-input");
        activateLicenseKey(input && input.value);
      } else if (action === "deactivate-license") {
        deactivateLicense();
      }
    });
  }

  function applyQuickCoFromInput() {
    const input = document.getElementById("quick-co-input");
    if (!input) return;
    const parsed = parseQuickCoInput(input.value);
    if (!parsed) {
      showToast('Format example: "6 sheets rotted OSB @ $115 + flashing $220, +2 days"');
      return;
    }
    if (parsed.items.length > 0) {
      state.co.lineItems = parsed.items;
      recalcCoDelta(state.co);
    }
    if (parsed.scheduleDays !== null) {
      state.co.scheduleDeltaDays = parsed.scheduleDays;
    }
    saveCurrentLocal();
    if (TELEMETRY) {
      TELEMETRY.track("quick_co_parsed", {
        template_id: state.co.id || "custom",
        quick_co_used: true
      });
    }
    showToast(`Applied ${parsed.items.length} line item(s) — Delta: ${formatMoney(state.co.coDeltaPrice, state.co.currency)}`);
    render();
  }

  /* ------------------------------------------------------------------------
     Render & Bootstrap
     ------------------------------------------------------------------------ */
  function render() {
    const app = document.getElementById("app");
    if (!app || !state.co) return;
    if (state.mode === "client") {
      app.innerHTML = renderClientView();
      if (!state.receipt) {
        initSignaturePad();
      }
    } else {
      app.innerHTML = renderStudioView();
    }
  }

  async function boot() {
    loadTheme();
    loadProState();
    loadDrafts();

    // Check URL Hash (#c=z1_... or #c=b1_...)
    const rawHash = window.location.hash || "";
    if (rawHash.startsWith("#c=")) {
      const encoded = rawHash.slice(3);
      const decoded = await CODEC.decodeChangeOrder(encoded);
      if (decoded) {
        state.co = decoded;
        recalcCoDelta(state.co);
        state.mode = "client";
        state.isSharedLink = true;
        bindEvents();
        render();
        if (TELEMETRY) {
          TELEMETRY.track("client_demo_opened", {
            template_id: state.co.id || "shared",
            reason_code: state.co.reasonCode,
            is_demo: false
          });
        }
        return;
      }
    }

    // Check Query Params (?unlock=&plan=&tpl=&biz=&city=&orig=&delta=&demo=1&ref=)
    const params = new URLSearchParams(window.location.search || "");
    const unlockParam = (params.get("unlock") || "").trim();
    const planParam = (params.get("plan") || "").trim().toLowerCase();
    let unlockedToast = "";
    if (unlockParam && verifyLicenseKey(unlockParam)) {
      const slLabelMap = {
        annual: "ScopeLock Pro Annual",
        monthly: "ScopeLock Pro Monthly",
        dfy: "ScopeLock DFY Setup License"
      };
      const label = slLabelMap[planParam] || "ScopeLock Pro";
      activateProState(unlockParam.toUpperCase(), label);
      unlockedToast = `${label} activated automatically!`;
      if (TELEMETRY) {
        TELEMETRY.track("pro_unlocked", { method: "redirect", plan: planParam || "pro" });
      }
      try {
        params.delete("unlock");
        params.delete("plan");
        params.delete("checkout_id");
        const rem = params.toString();
        const cleanUrl = `${window.location.pathname}${rem ? "?" + rem : ""}${window.location.hash || ""}`;
        window.history.replaceState({}, "", cleanUrl);
      } catch (e) {}
    }

    const tplParam = (params.get("tpl") || "").trim();
    const bizParam = (params.get("biz") || "").trim();
    const cityParam = (params.get("city") || "").trim();
    const origParam = Number(params.get("orig"));
    const deltaParam = Number(params.get("delta"));
    const demoParam = params.get("demo") === "1";

    if (tplParam && TEMPLATES[tplParam]) {
      state.co = cloneTemplate(tplParam);
    } else if (!bizParam && !cityParam && !origParam && !deltaParam && !demoParam) {
      state.co = loadCurrentLocal() || cloneTemplate("roofing_co");
    } else {
      state.co = cloneTemplate("roofing_co");
    }

    if (bizParam) state.co.businessName = bizParam.slice(0, 120);
    if (cityParam) state.co.projectCity = cityParam.slice(0, 100);
    if (Number.isFinite(origParam) && origParam > 0) {
      state.co.originalContractPrice = Math.round(origParam);
    }
    if (Number.isFinite(deltaParam) && deltaParam > 0) {
      applyExactDeltaOverride(state.co, deltaParam);
    }

    if (demoParam) {
      state.mode = "client";
      state.isDemoPreview = true;
    }

    bindEvents();
    render();
    if (unlockedToast) {
      showToast(unlockedToast);
    }

    if (TELEMETRY) {
      if (demoParam) {
        TELEMETRY.track("client_demo_opened", {
          template_id: state.co.id || "custom",
          reason_code: state.co.reasonCode,
          is_demo: true
        });
      } else {
        TELEMETRY.track("studio_loaded", {
          template_id: state.co.id || "custom"
        });
      }
    }
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
