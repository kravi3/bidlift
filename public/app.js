/**
 * BidLift — Interactive Revenue-Boosting Proposal Studio & Client Presentation App
 * Pure ES6+ SPA with Zero Backend Requirements.
 */
(function () {
  "use strict";

  const CONFIG = window.BIDLIFT_CONFIG || {};
  const PALETTES = window.BIDLIFT_PALETTES || {};
  const TEMPLATES = window.BIDLIFT_TEMPLATES || {};
  const CODEC = window.BidLiftCodec;

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
    crown: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 17l2-11 5 5 3-7 3 7 5-5 2 11z"/><rect x="3" y="19" width="18" height="2" rx="1"/></svg>`
  };

  // Application State
  const state = {
    mode: "studio", // "studio" | "client" | "error"
    embedMode: false,
    mobileView: "builder", // "builder" | "preview"
    activeTab: "business", // "business" | "tiers" | "addons" | "close"
    heroCollapsed: false,
    theme: "light",
    isPro: false,
    proPlanLabel: "",
    proposal: null,
    selectedTierIdx: 1,
    clientSignerName: "",
    clientSignerNote: "",
    approved: false,
    approvalReceipt: null,
    signatureDataUrl: "",
    hasSignatureInk: false,
    drafts: [],
    shareUrl: "",
    shareTab: "link" // "link" | "embed"
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

  function formatMoney(num) {
    const val = Math.round((Number(num) || 0) * 100) / 100;
    return "$" + val.toLocaleString("en-US", {
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
    const custom = /^#[0-9a-fA-F]{6}$/.test((p.customBrandColor || "").trim())
      ? p.customBrandColor.trim()
      : "";
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
    }, 2600);
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
        if (proObj && proObj.active) {
          state.isPro = true;
          state.proPlanLabel = proObj.label || "Pro Unlocked";
        }
      }

      const draftsRaw = localStorage.getItem(CONFIG.STORAGE_KEYS.DRAFTS);
      if (draftsRaw) {
        const parsed = JSON.parse(draftsRaw);
        if (Array.isArray(parsed)) state.drafts = parsed;
      }
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
    const p = deepClone(base);
    p.createdAt = Date.now();
    p.whiteLabel = Boolean(state.isPro);
    return p;
  }

  // =========================================================================
  // Math & Revenue-Lift Projections
  // =========================================================================
  function getVisibleTiers(p) {
    if (!p || !Array.isArray(p.tiers) || p.tiers.length === 0) return [];
    if (p.singleTierMode) {
      const idx = Math.min(Math.max(0, p.recommendedTierIndex || 0), p.tiers.length - 1);
      return [{ tier: p.tiers[idx], originalIdx: idx }];
    }
    return p.tiers.map((tier, idx) => ({ tier, originalIdx: idx }));
  }

  function calculateTotals(p) {
    const visible = getVisibleTiers(p);
    let chosenEntry = visible.find((x) => x.originalIdx === state.selectedTierIdx);
    if (!chosenEntry && visible.length > 0) {
      chosenEntry = visible[Math.min(p.recommendedTierIndex || 0, visible.length - 1)] || visible[0];
      state.selectedTierIdx = chosenEntry.originalIdx;
    }
    const basePrice = chosenEntry ? Number(chosenEntry.tier.price) || 0 : 0;
    const selectedAddons = (p.addons || []).filter((a) => a.selected);
    const addonsTotal = selectedAddons.reduce((sum, a) => sum + (Number(a.price) || 0), 0);
    const subtotal = basePrice + addonsTotal;

    const rawDiscount = Number(p.fastActionDiscount) || 0;
    const createdAt = Number(p.createdAt) || Date.now();
    const fastWindowMs = (Number(p.fastActionHours) || 48) * 3600 * 1000;
    const isFastEligible = rawDiscount > 0 && Date.now() - createdAt <= fastWindowMs;
    const discountApplied = isFastEligible ? Math.min(rawDiscount, Math.max(0, subtotal - 1)) : 0;

    const total = Math.max(0, subtotal - discountApplied);
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
      total,
      depositPct,
      depositDue,
      balanceDue
    };
  }

  function calculateLiftMetrics(p) {
    const tiers = p.tiers || [];
    const addonsPool = (p.addons || []).reduce((s, a) => s + (Number(a.price) || 0), 0);
    const flatBase = Number(tiers[0]?.price) || 0;

    let expectedDeal = flatBase;
    if (p.singleTierMode) {
      const idx = Math.min(Math.max(0, p.recommendedTierIndex || 0), tiers.length - 1);
      expectedDeal = (Number(tiers[idx]?.price) || flatBase) + addonsPool * 0.35;
    } else if (tiers.length >= 3) {
      const t0 = Number(tiers[0].price) || 0;
      const t1 = Number(tiers[1].price) || 0;
      const t2 = Number(tiers[2].price) || 0;
      expectedDeal = t0 * 0.25 + t1 * 0.55 + t2 * 0.20 + addonsPool * 0.35;
    } else if (tiers.length === 2) {
      expectedDeal = (Number(tiers[0].price) || 0) * 0.4 + (Number(tiers[1].price) || 0) * 0.6 + addonsPool * 0.35;
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
    const seed = `${name}|${total}|${Date.now()}`;
    let hash = 2166136261;
    for (let i = 0; i < seed.length; i++) {
      hash ^= seed.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    const hex = (hash >>> 0).toString(16).toUpperCase().padStart(8, "0");
    return `BL-${hex.slice(0, 4)}-${hex.slice(4, 8)}`;
  }

  function getBaseStudioUrl() {
    return `${window.location.origin}${window.location.pathname}`;
  }

  function getPaymentActionLabel(provider, depositDue, total) {
    const amountLabel = depositDue > 0 ? formatMoney(depositDue) : formatMoney(total);
    const map = {
      stripe: `Pay Deposit Now (${amountLabel})`,
      venmo: `Pay via Venmo (${amountLabel})`,
      paypal: `Pay via PayPal (${amountLabel})`,
      square: `Pay via Square (${amountLabel})`,
      zelle: `View Zelle Payment Info (${amountLabel})`
    };
    return map[provider] || `Pay Deposit Now (${amountLabel})`;
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

    const initials = (p.businessName || "BL")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("");

    const logoHtml = p.logoData
      ? `<img src="${escapeHtml(p.logoData)}" alt="${escapeHtml(p.businessName)} logo" />`
      : `<span>${escapeHtml(initials || "BL")}</span>`;

    const tiersHtml = visibleTiers
      .map(({ tier, originalIdx }) => {
        const isSelected = originalIdx === totals.chosenTierIdx;
        const isRec = !p.singleTierMode && originalIdx === Number(p.recommendedTierIndex);
        const featuresHtml = (tier.features || [])
          .filter((f) => f && f.trim())
          .map((f) => `<li>${ICONS.check}<span>${escapeHtml(f)}</span></li>`)
          .join("");

        return `
          <div class="tier-card ${isSelected ? "selected" : ""} ${isRec ? "recommended" : ""}"
               data-action="select-tier" data-tier-idx="${originalIdx}" role="button" tabindex="0">
            ${isRec ? `<div class="tier-ribbon">★ Most Popular Choice</div>` : ""}
            <div class="tier-top-row">
              <div>
                <div class="tier-name">${escapeHtml(tier.name || `Option ${originalIdx + 1}`)}</div>
                <div class="tier-subtitle">${escapeHtml(tier.subtitle || "")}</div>
              </div>
              <div class="tier-radio">${isSelected ? ICONS.check : ""}</div>
            </div>
            <div class="tier-price-row">
              <div class="tier-price">${formatMoney(tier.price)}</div>
              ${tier.timeline ? `<span class="tier-timeline">${escapeHtml(tier.timeline)}</span>` : ""}
            </div>
            <ul class="tier-features">${featuresHtml}</ul>
            <div class="tier-select-cta">${isSelected ? "✓ Selected Package" : "Select This Option"}</div>
          </div>
        `;
      })
      .join("");

    const addonsHtml = (p.addons || [])
      .map((addon, idx) => {
        const active = Boolean(addon.selected);
        return `
          <div class="addon-card ${active ? "active" : ""}" data-action="toggle-addon" data-addon-idx="${idx}" role="button" tabindex="0">
            <div class="addon-check">${active ? ICONS.check : ""}</div>
            <div class="addon-info">
              <div class="addon-title">${escapeHtml(addon.title)}</div>
              ${addon.description ? `<div class="addon-desc">${escapeHtml(addon.description)}</div>` : ""}
            </div>
            <div class="addon-price">+${formatMoney(addon.price)}</div>
          </div>
        `;
      })
      .join("");

    let closeRightColumnHtml = "";
    if (state.approved && state.approvalReceipt) {
      const rec = state.approvalReceipt;
      const mailSubject = encodeURIComponent(`Approved Proposal: ${p.projectTitle} (${rec.verificationId})`);
      const addonsText = rec.addons.length ? rec.addons.map((a) => `- ${a.title} (+${formatMoney(a.price)})`).join("\n") : "None";
      const mailBody = encodeURIComponent(
        `Hi ${p.businessName},\n\nI have reviewed and signed the proposal for "${p.projectTitle}".\n\n` +
        `Selected Package: ${rec.tierName} (${formatMoney(rec.basePrice)})\n` +
        `Selected Upgrades:\n${addonsText}\n\n` +
        `Total Approved: ${formatMoney(rec.total)}\n` +
        (rec.depositDue > 0 ? `Deposit Due: ${formatMoney(rec.depositDue)}\n` : "") +
        `Signed By: ${rec.signerName}\n` +
        `Timestamp: ${rec.timestamp}\n` +
        `Verification ID: ${rec.verificationId}\n` +
        (rec.note ? `Client Note: ${rec.note}\n` : "")
      );
      const payLabel = getPaymentActionLabel(p.paymentProvider, rec.depositDue, rec.total);
      const hasValidLink = /^https?:\/\//i.test((p.paymentLink || "").trim());

      closeRightColumnHtml = `
        <div class="approved-card">
          <div class="approved-badge">${ICONS.check} Proposal Signed & Locked</div>
          <h3 style="font-size:19px;margin-bottom:4px;">Thank You, ${escapeHtml(rec.signerName)}!</h3>
          <p style="margin:0;color:var(--text-secondary);font-size:13px;">
            Your <strong>${escapeHtml(rec.tierName)}</strong> package${rec.addons.length ? ` + ${rec.addons.length} upgrade(s)` : ""} is locked at <strong class="mono">${formatMoney(rec.total)}</strong>.
          </p>

          <div class="receipt-meta">
            <div>Verification ID: <strong class="mono">${escapeHtml(rec.verificationId)}</strong> • ${escapeHtml(rec.timestamp)}</div>
            ${rec.signatureDataUrl ? `<img src="${rec.signatureDataUrl}" alt="Client signature" style="max-height:54px;margin-top:8px;background:#fff;padding:4px 10px;border-radius:6px;border:1px solid #cbd5e1;" />` : ""}
          </div>

          <div class="approved-actions no-print">
            ${p.paymentProvider === "zelle" || !hasValidLink
              ? `<button class="btn btn-accent btn-lg" data-action="show-zelle-info">${ICONS.bolt} ${escapeHtml(payLabel)}</button>`
              : `<a class="btn btn-accent btn-lg" href="${escapeHtml(p.paymentLink)}" target="_blank" rel="noopener">${ICONS.bolt} ${escapeHtml(payLabel)} ${ICONS.external}</a>`
            }
            ${p.businessEmail
              ? `<a class="btn btn-primary" href="mailto:${escapeHtml(p.businessEmail)}?subject=${mailSubject}&body=${mailBody}">Send Signed Confirmation</a>`
              : ""
            }
            <button class="btn btn-outline" data-action="copy-sms-receipt">${ICONS.copy} Copy SMS Receipt</button>
            <button class="btn btn-outline" data-action="print-proposal">${ICONS.print} Download PDF</button>
            <button class="btn btn-ghost btn-sm" data-action="reset-approval">Edit Selection</button>
          </div>
        </div>
      `;
    } else {
      const signerVal = state.clientSignerName || p.clientName || "";
      closeRightColumnHtml = `
        <div class="signature-box">
          <h3 style="font-size:15px;font-weight:800;margin-bottom:4px;">Approve & Lock In Pricing</h3>
          <p style="margin:0 0 12px;font-size:12px;color:var(--text-muted);">Sign below to lock your selected package, upgrades, and schedule slot.</p>
          <div class="field-grid">
            <div class="field">
              <label for="client-signer-name">Full Name (Printed) *</label>
              <input id="client-signer-name" type="text" placeholder="Enter your full name" value="${escapeHtml(signerVal)}" />
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
            <button type="button" class="btn btn-primary btn-lg" style="width:100%;" data-action="approve-proposal">
              ${ICONS.check} Approve & Lock Proposal (${formatMoney(totals.total)})
            </button>
          </div>
        </div>
      `;
    }

    const showViralFooter = !p.whiteLabel && !state.isPro;

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
                ? `<div class="fast-bonus-pill">${ICONS.bolt} Fast-Action Bonus: Save ${formatMoney(totals.discountApplied)} (${p.fastActionHours}h)</div>`
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
              <strong>${escapeHtml(p.projectLocation || "On-Site / Remote")}</strong>
            </div>
            <div class="meta-cell">
              <span>Proposal Date</span>
              <strong>${createdDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</strong>
            </div>
          </div>
        </header>

        <section class="proposal-section">
          <div class="section-heading">
            <div>
              <h2>1. Choose Your Package</h2>
              <p>${p.singleTierMode ? "Customized scope prepared specifically for your project." : "Compare options below—click any package to update your live quote."}</p>
            </div>
            ${!isClientStandalone ? `<span class="badge-count" style="border-radius:8px;padding:4px 10px;height:auto;">Interactive Preview</span>` : ""}
          </div>
          <div class="tiers-grid ${p.singleTierMode ? "single-tier" : ""}">
            ${tiersHtml}
          </div>
        </section>

        ${(p.addons || []).length > 0 ? `
          <section class="proposal-section">
            <div class="section-heading">
              <div>
                <h2>2. Customize With Optional Upgrades</h2>
                <p>Click any add-on below to include it in your project automatically.</p>
              </div>
            </div>
            <div class="addons-grid">
              ${addonsHtml}
            </div>
          </section>
        ` : ""}

        <section class="proposal-section" style="border-bottom:none;">
          <div class="section-heading">
            <div>
              <h2>${(p.addons || []).length > 0 ? "3." : "2."} Investment Summary & Sign-Off</h2>
              <p>Transparent breakdown with zero hidden fees.</p>
            </div>
          </div>
          <div class="close-grid">
            <div class="summary-box">
              <div class="summary-line">
                <span>Selected Package: <strong>${escapeHtml(totals.chosenTier?.name || "")}</strong></span>
                <strong class="mono">${formatMoney(totals.basePrice)}</strong>
              </div>
              ${totals.selectedAddons.map((a) => `
                <div class="summary-line">
                  <span>+ ${escapeHtml(a.title)}</span>
                  <span class="mono">+${formatMoney(a.price)}</span>
                </div>
              `).join("")}
              ${totals.discountApplied > 0 ? `
                <div class="summary-line discount">
                  <span>★ Fast-Action Booking Savings</span>
                  <span class="mono">-${formatMoney(totals.discountApplied)}</span>
                </div>
              ` : ""}
              <hr class="summary-divider" />
              <div class="summary-total-row">
                <span class="summary-total-label">Total Investment</span>
                <span class="summary-total-value">${formatMoney(totals.total)}</span>
              </div>
              ${totals.depositPct > 0 ? `
                <div class="deposit-callout">
                  <span>Deposit to Reserve (${totals.depositPct}%)</span>
                  <strong>${formatMoney(totals.depositDue)}</strong>
                </div>
                <div class="summary-line" style="margin-top:6px;font-size:12px;">
                  <span>Remaining Balance Later</span>
                  <span class="mono">${formatMoney(totals.balanceDue)}</span>
                </div>
              ` : ""}
              ${p.paymentNote ? `<p class="terms-note" style="margin-top:10px;color:var(--text-secondary);"><strong>Payment Schedule:</strong> ${escapeHtml(p.paymentNote)}</p>` : ""}
              ${p.terms ? `<p class="terms-note">${ICONS.shield} <strong>Guarantee & Terms:</strong> ${escapeHtml(p.terms)}</p>` : ""}
            </div>
            <div>
              ${closeRightColumnHtml}
            </div>
          </div>
        </section>

        <footer class="proposal-footer">
          <div>© ${new Date().getFullYear()} ${escapeHtml(p.businessName || "Service Provider")} • Client-Private Proposal</div>
          ${showViralFooter ? `
            <a class="viral-badge no-print" href="${escapeHtml(getBaseStudioUrl())}" target="_blank" rel="noopener">
              <span style="color:var(--accent);display:inline-flex;">${ICONS.bolt}</span>
              <span>Powered by <strong>BidLift</strong> — Boost quote revenue +28% (Free)</span>
            </a>
          ` : `<div>Verified Digital Acceptance Enabled</div>`}
        </footer>
      </article>
    `;
  }

  // =========================================================================
  // Builder Pane Rendering
  // =========================================================================
  function renderBuilderBodyHtml() {
    const p = state.proposal;
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
            <div class="field">
              <label>Business Logo <span style="font-weight:400;color:var(--text-muted);">Auto-optimized for SMS/URL</span></label>
              <div class="logo-upload-row">
                <div class="logo-thumb">
                  ${p.logoData ? `<img src="${escapeHtml(p.logoData)}" alt="Logo" />` : escapeHtml((p.businessName || "B")[0].toUpperCase())}
                </div>
                <div style="flex:1;display:flex;gap:6px;flex-wrap:wrap;">
                  <label class="btn btn-outline btn-sm" style="cursor:pointer;">
                    Upload Logo
                    <input type="file" id="logo-file-input" accept="image/*" class="sr-only" />
                  </label>
                  ${p.logoData ? `<button type="button" class="btn btn-danger-ghost btn-sm" data-action="remove-logo">Remove</button>` : ""}
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
                <input id="f-color-picker" type="color" value="${escapeHtml(p.customBrandColor || PALETTES[p.paletteId]?.brand || "#0f294a")}" style="height:36px;width:100%;padding:2px;border-radius:8px;border:1px solid var(--border-strong);background:var(--bg-input);cursor:pointer;" />
              </div>
            </div>
          </div>
        </div>

        <div class="card-box">
          <div class="card-box-head">
            <span class="card-box-title">Client & Project Details</span>
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
          </div>
        </div>
      `;
    }

    if (state.activeTab === "tiers") {
      const tierCardsHtml = (p.tiers || []).map((tier, tIdx) => {
        const isRec = Number(p.recommendedTierIndex) === tIdx;
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
              <button type="button" class="btn btn-sm ${isRec ? "btn-accent" : "btn-outline"}" data-action="set-recommended-tier" data-tier-idx="${tIdx}">
                ${isRec ? "★ Most Popular" : "Mark Popular"}
              </button>
            </div>
            <div class="field-grid">
              <div class="field-row-2">
                <div class="field">
                  <label>Package Name</label>
                  <input type="text" value="${escapeHtml(tier.name)}" data-tier-bind="${tIdx}:name" />
                </div>
                <div class="field">
                  <label>Price ($)</label>
                  <input type="number" min="0" step="1" value="${Number(tier.price) || 0}" data-tier-bind="${tIdx}:price" />
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
              <div class="field">
                <label>Included Deliverables</label>
                <div>${featuresListHtml}</div>
                <button type="button" class="btn btn-outline btn-sm" data-action="add-feature" data-tier-idx="${tIdx}" style="align-self:flex-start;">
                  ${ICONS.plus} Add Deliverable
                </button>
              </div>
            </div>
          </div>
        `;
      }).join("");

      return `
        <div class="toggle-row">
          <div>
            <strong style="font-size:13px;display:block;">3-Tier Good / Better / Best Mode</strong>
            <span style="font-size:11.5px;color:var(--text-muted);">Anchoring 3 options increases average deal size by 22%–38%.</span>
          </div>
          <label class="switch">
            <input type="checkbox" id="toggle-multi-tier" ${!p.singleTierMode ? "checked" : ""} />
            <span class="slider"></span>
          </label>
        </div>
        ${tierCardsHtml}
      `;
    }

    if (state.activeTab === "addons") {
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
                <label>Upgrade Price ($)</label>
                <input type="number" min="0" step="1" value="${Number(addon.price) || 0}" data-addon-bind="${aIdx}:price" />
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
        ${addonsHtml || `<div class="card-box" style="text-align:center;color:var(--text-muted);">No add-ons yet. Click "+ Add Upsell" to boost your average order size.</div>`}
      `;
    }

    // Tab 4: Close & Deposit
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
                <option value="venmo" ${p.paymentProvider === "venmo" ? "selected" : ""}>Venmo Link</option>
                <option value="paypal" ${p.paymentProvider === "paypal" ? "selected" : ""}>PayPal.me Link</option>
                <option value="square" ${p.paymentProvider === "square" ? "selected" : ""}>Square Checkout</option>
                <option value="zelle" ${p.paymentProvider === "zelle" ? "selected" : ""}>Zelle / Direct Info</option>
              </select>
            </div>
            <div class="field">
              <label for="f-valid-days">Quote Valid (Days)</label>
              <input id="f-valid-days" type="number" min="1" max="90" data-bind="validDays" value="${Number(p.validDays) || 7}" />
            </div>
          </div>
          <div class="field">
            <label for="f-pay-link">${p.paymentProvider === "zelle" ? "Zelle Email or Phone Instructions" : "Your Checkout / Deposit URL"}</label>
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
          <span class="card-box-title">Fast-Action Urgency & Guarantee</span>
        </div>
        <div class="field-grid">
          <div class="field-row-2">
            <div class="field">
              <label for="f-fast-disc">Fast-Action Savings ($)</label>
              <input id="f-fast-disc" type="number" min="0" step="5" data-bind="fastActionDiscount" value="${Number(p.fastActionDiscount) || 0}" />
            </div>
            <div class="field">
              <label for="f-fast-hrs">Deadline Window (Hours)</label>
              <input id="f-fast-hrs" type="number" min="1" max="168" data-bind="fastActionHours" value="${Number(p.fastActionHours) || 48}" />
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
  // Modals HTML (Share/Embed, Saved Drafts, Pro/Pricing, Zelle)
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
      : `<p style="color:var(--text-muted);font-size:13px;">No saved drafts yet. Click "Save Current Quote" below to bookmark a proposal locally in your browser.</p>`;

    const embedUrl = state.shareUrl ? `${state.shareUrl}&embed=1` : `${getBaseStudioUrl()}#q=...`;
    const iframeSnippet = `<iframe src="${escapeHtml(embedUrl)}" width="100%" height="920" style="border:0;border-radius:16px;box-shadow:0 12px 32px rgba(0,0,0,0.08);" loading="lazy"></iframe>`;
    const pitchText = `Hi ${(p.clientName || "there").split(/\s+/)[0]}, here is your custom interactive proposal for ${p.projectTitle || "your project"}. You can compare packages, toggle optional upgrades, and lock in your start date in 60 seconds: ${state.shareUrl}`;

    return `
      <!-- Share & Embed Modal -->
      <div class="modal-backdrop" id="modal-share" role="dialog" aria-modal="true">
        <div class="modal-card">
          <div class="modal-header">
            <h3>Share Interactive Client Proposal</h3>
            <button type="button" class="btn btn-ghost btn-sm" data-action="close-modal" data-modal="modal-share">✕</button>
          </div>
          <p style="margin:0 0 12px;font-size:13px;color:var(--text-secondary);">
            <strong>100% Zero-Server Privacy:</strong> The entire proposal is compressed securely inside the URL link itself—no client data ever touches a database.
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
              <a class="btn btn-outline" id="open-client-link" href="${escapeHtml(state.shareUrl)}" target="_blank" rel="noopener">${ICONS.external} Open Client View</a>
            </div>
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
        <div class="modal-card" style="max-width:720px;">
          <div class="modal-header">
            <h3>Upgrade to BidLift Pro</h3>
            <button type="button" class="btn btn-ghost btn-sm" data-action="close-modal" data-modal="modal-pro">✕</button>
          </div>
          <p style="margin:0 0 10px;font-size:13px;color:var(--text-secondary);">
            One single upgraded job pays for BidLift Pro for years. Remove BidLift branding and present 100% white-label luxury quotes.
          </p>
          <div class="pricing-grid">
            <div class="plan-box">
              <strong>Starter</strong>
              <div class="plan-price">$0</div>
              <span style="font-size:12px;color:var(--text-muted);">Unlimited Good/Better/Best quotes, add-ons, e-sign & deposit links. Includes tasteful "Powered by BidLift" footer.</span>
            </div>
            <div class="plan-box">
              <strong>Pro Monthly</strong>
              <div class="plan-price">${escapeHtml(CONFIG.PRO_PRICE_MONTHLY || "$19/mo")}</div>
              <span style="font-size:12px;color:var(--text-muted);">100% White-Label (removes BidLift footer), custom brand hex, priority templates.</span>
              <button type="button" class="btn btn-primary btn-sm" style="margin-top:auto;" data-action="checkout-pro" data-plan="monthly">Get Pro Monthly</button>
            </div>
            <div class="plan-box featured">
              <strong>Founding Lifetime</strong>
              <div class="plan-price">${escapeHtml(CONFIG.PRO_PRICE_LIFETIME || "$49 once")}</div>
              <span style="font-size:12px;color:var(--text-muted);">Pay once, own Pro White-Label forever. Limited early-adopter founder pass.</span>
              <button type="button" class="btn btn-accent btn-sm" style="margin-top:auto;" data-action="checkout-pro" data-plan="lifetime">Claim Lifetime Deal</button>
            </div>
          </div>

          <div class="card-box" style="margin-top:12px;">
            <div style="font-size:12.5px;font-weight:700;margin-bottom:6px;">
              ${state.isPro ? `✓ Active License: ${escapeHtml(state.proPlanLabel)}` : "Already have a Pro / Founder license key?"}
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <input id="pro-license-input" type="text" placeholder="Enter license key (try FOUNDER2026)" style="flex:1;min-width:200px;padding:8px 10px;border-radius:8px;border:1px solid var(--border-strong);background:var(--bg-input);color:var(--text-primary);" />
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
    `;
  }

  // =========================================================================
  // Root Shell & Targeted Partial Updaters
  // =========================================================================
  function renderStudioShell() {
    const p = state.proposal;
    const lift = calculateLiftMetrics(p);
    const templatePillsHtml = Object.values(TEMPLATES)
      .map((tpl) => `
        <button type="button" class="template-pill ${p.id === tpl.id ? "active" : ""}"
                data-action="load-template" data-template-id="${tpl.id}">
          <span>${escapeHtml(tpl.label)}</span>
        </button>
      `)
      .join("");

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
            ${state.isPro ? "PRO WHITE-LABEL" : "GO PRO"}
          </button>
        </div>

        <div class="topbar-actions">
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
              ? `<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;"><strong>Quick Templates:</strong> <div class="template-pills" style="margin-top:0;">${templatePillsHtml}</div></div>`
              : `
                <h1>Turn Flat Quotes Into +28% Bigger Deals <span style="font-size:12px;padding:3px 9px;border-radius:999px;background:rgba(255,255,255,0.16);font-weight:700;">Zero Signup • 100% Client-Private</span></h1>
                <p>Stop sending 1-price PDFs that push clients to shop on price. Pick an industry template, customize packages & optional add-ons, and send a live e-sign + deposit link in 60 seconds.</p>
                <div class="template-pills">${templatePillsHtml}</div>
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
              <span class="lift-delta" id="lift-delta">+${formatMoney(lift.liftDollar)}/deal (+${lift.liftPct}%)</span>
            </div>
            <div class="lift-metrics">
              <div class="lift-stat">
                <span>Old 1-Price Bid</span>
                <strong id="lift-flat">${formatMoney(lift.flatBase)}</strong>
              </div>
              <div class="lift-stat">
                <span>Projected BidLift Avg</span>
                <strong id="lift-expected" style="color:var(--success);">${formatMoney(lift.expectedDeal)}</strong>
              </div>
            </div>
          </div>

          <nav class="builder-tabs" role="tablist">
            <button type="button" class="builder-tab ${state.activeTab === "business" ? "active" : ""}" data-action="switch-tab" data-tab="business">1. Brand</button>
            <button type="button" class="builder-tab ${state.activeTab === "tiers" ? "active" : ""}" data-action="switch-tab" data-tab="tiers">2. Tiers</button>
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
              <span>Interactive Client View — Click packages, toggle upgrades & test e-sign below</span>
            </div>
            <div style="display:flex;gap:8px;">
              <button type="button" class="btn btn-outline btn-sm" data-action="print-proposal">${ICONS.print} Print / PDF</button>
              <button type="button" class="btn btn-primary btn-sm" data-action="open-share-modal">${ICONS.share} Send to Client</button>
            </div>
          </div>
          <div id="proposal-preview-container">
            ${renderProposalSheetHtml(p, { isClientStandalone: false })}
          </div>
        </section>
      </main>

      ${renderModalsHtml()}
    `;
  }

  function renderClientStandalone() {
    const p = state.proposal;
    return `
      <div class="client-mode-wrapper ${state.embedMode ? "embed-mode" : ""}">
        ${!state.embedMode ? `
          <div class="client-floating-bar no-print">
            <a href="${escapeHtml(getBaseStudioUrl())}" class="viral-badge" title="Build your own interactive proposal free">
              <span style="color:var(--accent);display:inline-flex;">${ICONS.bolt}</span>
              <span>Built with <strong>BidLift</strong> • Create Your Own Free</span>
            </a>
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
    const lift = calculateLiftMetrics(state.proposal);
    const dEl = document.getElementById("lift-delta");
    const fEl = document.getElementById("lift-flat");
    const eEl = document.getElementById("lift-expected");
    if (dEl) dEl.textContent = `+${formatMoney(lift.liftDollar)}/deal (+${lift.liftPct}%)`;
    if (fEl) fEl.textContent = formatMoney(lift.flatBase);
    if (eEl) eEl.textContent = formatMoney(lift.expectedDeal);
  }

  function refreshPreviewOnly() {
    const container = document.getElementById("proposal-preview-container");
    if (!container || !state.proposal) return;
    container.innerHTML = renderProposalSheetHtml(state.proposal, {
      isClientStandalone: state.mode === "client"
    });
    initSignaturePad();
    refreshLiftCoach();
  }

  function renderApp() {
    const root = document.getElementById("app");
    if (!root) return;
    applyBrandPalette(state.proposal);

    if (state.mode === "error") {
      root.innerHTML = renderErrorView();
      return;
    }
    if (state.mode === "client") {
      root.innerHTML = renderClientStandalone();
      initSignaturePad();
      return;
    }
    root.innerHTML = renderStudioShell();
    initSignaturePad();
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

    // Re-draw prior ink if user toggled a tier or add-on after signing
    if (state.signatureDataUrl && state.hasSignatureInk) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, cssWidth, cssHeight);
      };
      img.src = state.signatureDataUrl;
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

  // =========================================================================
  // Event Delegation (Clicks, Inputs, Changes)
  // =========================================================================
  document.addEventListener("click", async (e) => {
    const target = e.target.closest("[data-action]");
    if (!target) {
      // Close modal when clicking backdrop directly
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

    if (action === "load-template") {
      const tplId = target.dataset.templateId;
      state.proposal = createProposalFromTemplate(tplId);
      state.selectedTierIdx = state.proposal.recommendedTierIndex ?? 1;
      state.approved = false;
      state.approvalReceipt = null;
      state.hasSignatureInk = false;
      state.signatureDataUrl = "";
      state.clientSignerName = "";
      saveCurrentDraftLocal();
      renderApp();
      showToast(`Loaded "${TEMPLATES[tplId]?.label}" template`);
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

    if (action === "add-addon") {
      state.proposal.addons.push({
        id: `addon-${Date.now()}`,
        title: "Priority Service Upgrade",
        description: "Optional add-on to elevate final results.",
        price: 250,
        selected: false
      });
      saveCurrentDraftLocal();
      const body = document.getElementById("builder-body");
      if (body) body.innerHTML = renderBuilderBodyHtml();
      refreshPreviewOnly();
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
      refreshPreviewOnly();
      return;
    }

    if (action === "toggle-addon") {
      if (state.approved) return;
      const aIdx = Number(target.dataset.addonIdx);
      if (state.proposal.addons[aIdx]) {
        state.proposal.addons[aIdx].selected = !state.proposal.addons[aIdx].selected;
        if (state.mode === "studio") saveCurrentDraftLocal();
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
      const noteInput = document.getElementById("client-signer-note");
      const signerName = (nameInput ? nameInput.value : state.clientSignerName || "").trim();
      const signerNote = (noteInput ? noteInput.value : state.clientSignerNote || "").trim();

      if (!signerName) {
        showToast("Please enter your full name before signing.");
        if (nameInput) nameInput.focus();
        return;
      }
      if (!state.hasSignatureInk) {
        showToast("Please draw your signature in the box first.");
        return;
      }

      const totals = calculateTotals(state.proposal);
      state.clientSignerName = signerName;
      state.clientSignerNote = signerNote;
      state.approved = true;
      state.approvalReceipt = {
        verificationId: generateVerificationId(signerName, totals.total),
        signerName,
        note: signerNote,
        timestamp: new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
        tierName: totals.chosenTier?.name || "Selected Option",
        basePrice: totals.basePrice,
        addons: deepClone(totals.selectedAddons),
        total: totals.total,
        depositDue: totals.depositDue,
        signatureDataUrl: state.signatureDataUrl
      };
      refreshPreviewOnly();
      showToast("Proposal approved & locked! Ready for deposit.");
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
      const addonSummary = rec.addons.length ? ` + ${rec.addons.map((a) => a.title).join(", ")}` : "";
      const txt = `Approved ${state.proposal.projectTitle} (${rec.tierName}${addonSummary}) for ${formatMoney(rec.total)}. Signed by ${rec.signerName} [${rec.verificationId}].`;
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
      const encoded = await CODEC.encodeProposal(state.proposal);
      state.shareUrl = `${getBaseStudioUrl()}#q=${encoded}`;
      renderApp();
      const modal = document.getElementById("modal-share");
      if (modal) modal.classList.add("open");
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

    if (action === "copy-pitch-text") {
      const p = state.proposal;
      const pitch = `Hi ${(p.clientName || "there").split(/\s+/)[0]}, here is your custom interactive proposal for ${p.projectTitle || "your project"}. You can compare packages, toggle optional upgrades, and lock in your start date in 60 seconds: ${state.shareUrl}`;
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
        state.proposal = deepClone(state.drafts[idx].proposal);
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
      const plan = target.dataset.plan;
      const url = plan === "lifetime" ? CONFIG.STRIPE_LIFETIME_LINK : CONFIG.STRIPE_PRO_MONTHLY_LINK;
      if (/^https?:\/\//i.test((url || "").trim())) {
        window.open(url, "_blank", "noopener");
      } else {
        showToast("Stripe link placeholder: add your URL in config.js — or enter FOUNDER2026 below to test Pro now!");
      }
      return;
    }

    if (action === "activate-license") {
      const input = document.getElementById("pro-license-input");
      const val = (input ? input.value : "").trim().toUpperCase();
      if (val === (CONFIG.DEMO_UNLOCK_CODE || "FOUNDER2026") || /^BL-PRO-[A-Z0-9]{4,}$/.test(val)) {
        state.isPro = true;
        state.proPlanLabel = val === "FOUNDER2026" ? "Founding Lifetime Pass" : "Pro License Active";
        state.proposal.whiteLabel = true;
        try {
          localStorage.setItem(CONFIG.STORAGE_KEYS.PRO_LICENSE, JSON.stringify({ active: true, label: state.proPlanLabel }));
        } catch (err) {}
        saveCurrentDraftLocal();
        renderApp();
        showToast("Pro White-Label unlocked! BidLift footer removed.");
      } else {
        showToast("Invalid key. Try FOUNDER2026 to preview Pro mode.");
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
    if (el.id === "client-signer-note") {
      state.clientSignerNote = el.value;
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

    if (el.dataset.tierBind) {
      const [tIdxStr, key] = el.dataset.tierBind.split(":");
      const tIdx = Number(tIdxStr);
      if (state.proposal.tiers[tIdx]) {
        state.proposal.tiers[tIdx][key] = el.type === "number" ? Number(el.value) || 0 : el.value;
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
        state.proposal.addons[aIdx][key] = el.type === "number" ? Number(el.value) || 0 : el.value;
        saveCurrentDraftLocal();
        refreshPreviewOnly();
      }
    }
  });

  // Change events (checkboxes, selects, file uploads)
  document.addEventListener("change", async (e) => {
    const el = e.target;

    if (el.id === "toggle-multi-tier") {
      state.proposal.singleTierMode = !el.checked;
      saveCurrentDraftLocal();
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
            state.proposal = obj.current;
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
  // Router & Initialization
  // =========================================================================
  async function handleRoute() {
    const hash = window.location.hash || "";
    const search = new URLSearchParams(window.location.search);

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

      state.mode = "client";
      state.proposal = decoded;
      state.selectedTierIdx = Number(decoded.recommendedTierIndex ?? 1);
      state.approved = false;
      state.approvalReceipt = null;
      state.hasSignatureInk = false;
      state.signatureDataUrl = "";
      state.clientSignerName = "";
      renderApp();
      return;
    }

    // Studio Mode
    state.mode = "studio";
    state.embedMode = false;
    try {
      const savedCurrent = localStorage.getItem(CONFIG.STORAGE_KEYS.CURRENT);
      if (savedCurrent) {
        const parsed = JSON.parse(savedCurrent);
        if (parsed && Array.isArray(parsed.tiers)) {
          state.proposal = parsed;
        }
      }
    } catch (err) {}

    if (!state.proposal) {
      state.proposal = createProposalFromTemplate("contractor");
    }
    state.selectedTierIdx = Number(state.proposal.recommendedTierIndex ?? 1);
    renderApp();
  }

  window.addEventListener("hashchange", handleRoute);

  loadStorage();
  handleRoute();
})();
