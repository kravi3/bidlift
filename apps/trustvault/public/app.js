/**
 * TrustVault Studio, Enterprise Buyer Trust Portal & Questionnaire Auto-Filler
 * Zero backend, zero PII transmitted, strict CSP (script-src 'self') compliant.
 */
(function () {
  "use strict";

  const CFG = window.TRUSTVAULT_CONFIG || {};
  const KB = window.TRUSTVAULT_KNOWLEDGE || {};
  const CODEC = window.TrustVaultCodec || {};
  const ANALYTICS = window.TrustVaultAnalytics || { track: function () {} };

  const STORAGE_KEYS = CFG.STORAGE_KEYS || {
    PORTAL: "trustvault_portal_v1",
    QUESTIONNAIRE: "trustvault_qa_v1",
    PRO_LICENSE: "trustvault_pro_v1"
  };

  let state = {
    viewMode: "studio", // "studio" | "buyer"
    isEmbed: false,
    activeTab: "portal", // "portal" | "autofill"
    billingCycle: "annual", // "annual" | "monthly"
    proUnlocked: false,
    proPlanLabel: "",
    proModalOpen: false,
    legalModalOpen: false,
    proFocusTier: "pro", // "pro" | "dfy"
    ndaModalOpen: false,
    editingPillarId: "",
    buyerSearchQuery: "",
    portalDigest: "computing...",
    qaDigest: "computing...",
    cachedPortalUrl: "",
    portal: null,
    qa: {
      rawInput: "",
      filterConfidence: "all",
      rows: []
    }
  };

  function escHtml(val) {
    return String(val == null ? "" : val)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function showToast(msg) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const el = document.createElement("div");
    el.className = "tv-toast";
    el.textContent = String(msg || "");
    container.appendChild(el);
    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 4200);
  }

  function buildPortalFromPreset(presetId, overrides) {
    const presets = KB.INDUSTRY_PRESETS || {};
    const p = presets[presetId] || presets.saas;
    const ov = overrides || {};
    const domain = String(ov.domain || p.defaultDomain || "acmecloud.io").trim();
    const cleanDomain = domain.replace(/^https?:\/\//i, "").split("/")[0] || "acmecloud.io";

    return {
      presetId: p.id,
      company: String(ov.company || p.defaultCompany || "Acme Cloud Systems"),
      domain: cleanDomain,
      securityEmail: String(ov.securityEmail || "security@" + cleanDomain),
      tagline: String(ov.tagline || p.defaultTagline || ""),
      hostingRegion: String(ov.hostingRegion || p.hostingRegion || "AWS US-East (Multi-AZ)"),
      complianceFrame: String(ov.complianceFrame || p.complianceFrame || "SOC 2 Type II & GDPR"),
      logoData: String(ov.logoData || ""),
      badges: Array.isArray(p.badges) ? p.badges.slice() : [],
      pillarSummaries: Object.assign({}, p.pillarSummaries || {}),
      subprocessors: (p.subprocessors || []).map((s) => Object.assign({}, s)),
      whiteLabel: Boolean(ov.whiteLabel),
      updatedAt: Date.now()
    };
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
    const match = /^TV-PRO-([A-Z0-9]{6})-([A-F0-9]{4})$/.exec(clean);
    if (!match) return false;
    const expected = computeFnv1aHex(`TRUSTVAULT_V1|${match[1]}`).slice(0, 4);
    return match[2] === expected;
  }

  function activateProState(cleanKey, planLabel) {
    const label = planLabel || "TrustVault Pro Enterprise";
    state.proUnlocked = true;
    state.proPlanLabel = label;
    if (state.portal) state.portal.whiteLabel = true;
    try {
      localStorage.setItem(STORAGE_KEYS.PRO_LICENSE, JSON.stringify({ active: true, label, key: cleanKey }));
    } catch (e) {}
  }

  function loadProState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRO_LICENSE);
      if (!saved) return;
      if (saved.startsWith("{")) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.active && verifyLicenseKey(parsed.key)) {
          state.proUnlocked = true;
          state.proPlanLabel = parsed.label || "TrustVault Pro Enterprise";
          return;
        }
      } else if (verifyLicenseKey(saved)) {
        state.proUnlocked = true;
        state.proPlanLabel = "TrustVault Pro Enterprise";
        return;
      }
      localStorage.removeItem(STORAGE_KEYS.PRO_LICENSE);
    } catch (e) {}
  }

  function savePortalState() {
    try {
      localStorage.setItem(STORAGE_KEYS.PORTAL, JSON.stringify(state.portal));
    } catch (e) {}
  }

  function saveQaState() {
    try {
      localStorage.setItem(STORAGE_KEYS.QUESTIONNAIRE, JSON.stringify(state.qa));
    } catch (e) {}
  }

  function refreshPortalDigest() {
    if (!CODEC.computeAttestationDigest || !state.portal) return;
    const payload = {
      company: state.portal.company,
      domain: state.portal.domain,
      badges: state.portal.badges,
      pillarSummaries: state.portal.pillarSummaries,
      subprocessors: state.portal.subprocessors
    };
    CODEC.computeAttestationDigest(payload).then((hex) => {
      state.portalDigest = hex;
      const el = document.getElementById("portal-digest-val");
      if (el) el.textContent = hex;
    });
  }

  function refreshQaDigest() {
    if (!CODEC.computeAttestationDigest) return;
    const payload = {
      company: state.portal ? state.portal.company : "",
      count: state.qa.rows.length,
      rows: state.qa.rows.map((r) => ({ q: r.originalQuestion, a: r.suggestedAnswer, id: r.matchedId }))
    };
    CODEC.computeAttestationDigest(payload).then((hex) => {
      state.qaDigest = hex;
      const el = document.getElementById("qa-digest-val");
      if (el) el.textContent = hex.slice(0, 18) + "…";
      const fullEl = document.getElementById("qa-digest-full");
      if (fullEl) fullEl.textContent = hex;
    });
  }

  function getCompanyContext() {
    const p = state.portal || {};
    return {
      company: p.company,
      domain: p.domain,
      securityEmail: p.securityEmail,
      hostingRegion: p.hostingRegion,
      complianceFrame: p.complianceFrame
    };
  }

  function parseQuestionsText(raw) {
    const lines = String(raw || "")
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    return lines.slice(0, 200);
  }

  /**
   * RFC-4180 aware CSV parser for uploaded buyer questionnaires.
   */
  function parseCsvQuestions(csvText) {
    const rows = [];
    let currentRow = [];
    let currentCell = "";
    let inQuotes = false;
    const text = String(csvText || "");

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const next = text[i + 1];
      if (inQuotes) {
        if (ch === '"' && next === '"') {
          currentCell += '"';
          i++;
        } else if (ch === '"') {
          inQuotes = false;
        } else {
          currentCell += ch;
        }
      } else {
        if (ch === '"') {
          inQuotes = true;
        } else if (ch === ",") {
          currentRow.push(currentCell.trim());
          currentCell = "";
        } else if (ch === "\n" || ch === "\r") {
          if (ch === "\r" && next === "\n") i++;
          currentRow.push(currentCell.trim());
          if (currentRow.some((c) => c.length > 0)) rows.push(currentRow);
          currentRow = [];
          currentCell = "";
        } else {
          currentCell += ch;
        }
      }
    }
    if (currentCell.length > 0 || currentRow.length > 0) {
      currentRow.push(currentCell.trim());
      if (currentRow.some((c) => c.length > 0)) rows.push(currentRow);
    }

    if (rows.length === 0) return [];

    // Detect likely question column from header or longest average text column
    let qCol = 0;
    let startIdx = 0;
    const firstRow = rows[0].map((c) => c.toLowerCase());
    const headerMatch = firstRow.findIndex((c) =>
      /question|requirement|control|inquiry|prompt|description/.test(c)
    );
    if (headerMatch !== -1) {
      qCol = headerMatch;
      startIdx = 1;
    } else {
      if (firstRow.some((c) => /^(id|#|no|number|category|pillar)$/i.test(c))) {
        startIdx = 1;
      }
      const colScores = [];
      const sampleEnd = Math.min(rows.length, 15);
      for (let r = startIdx; r < sampleEnd; r++) {
        for (let c = 0; c < rows[r].length; c++) {
          colScores[c] = (colScores[c] || 0) + rows[r][c].length;
        }
      }
      let bestLen = -1;
      for (let c = 0; c < colScores.length; c++) {
        if ((colScores[c] || 0) > bestLen) {
          bestLen = colScores[c];
          qCol = c;
        }
      }
    }

    const extracted = [];
    for (let r = startIdx; r < rows.length; r++) {
      const cell = (rows[r][qCol] || "").trim();
      if (cell.length >= 6) extracted.push(cell);
    }
    return extracted.slice(0, 200);
  }

  function runAutoFill(rawTextOverride) {
    const raw = typeof rawTextOverride === "string" ? rawTextOverride : state.qa.rawInput;
    state.qa.rawInput = raw;
    const questions = parseQuestionsText(raw);
    if (questions.length === 0) {
      showToast("Paste or upload at least one security question first.");
      return;
    }
    const matched = KB.matchSecurityQuestions(questions, getCompanyContext());
    state.qa.rows = matched;
    state.qa.filterConfidence = "all";
    saveQaState();
    refreshQaDigest();

    const highCount = matched.filter((r) => r.confidence === "High").length;
    const medCount = matched.filter((r) => r.confidence === "Medium").length;
    const coveragePct = Math.round(((highCount + medCount) / matched.length) * 100);

    ANALYTICS.track("questionnaire_autofilled", {
      preset_id: state.portal.presetId,
      question_count: matched.length,
      high_conf_count: highCount,
      medium_conf_count: medCount,
      coverage_pct: coveragePct
    });

    render();
    showToast(`Auto-matched ${highCount + medCount}/${matched.length} questions (${coveragePct}% coverage).`);
  }

  function csvCell(val) {
    const s = String(val == null ? "" : val).replace(/\r?\n/g, " ");
    return '"' + s.replace(/"/g, '""') + '"';
  }

  function exportCsv() {
    const rows = state.qa.rows || [];
    if (rows.length === 0) {
      showToast("Load or auto-fill a questionnaire before exporting.");
      return;
    }

    const freeCap = 10;
    const isCapped = !state.proUnlocked && rows.length > freeCap;
    const exportRows = isCapped ? rows.slice(0, freeCap) : rows;
    const timestamp = new Date().toISOString();

    const lines = [
      [
        "TrustVault SHA-256 Attestation",
        state.qaDigest,
        "Company",
        state.portal.company,
        "Generated",
        timestamp
      ].map(csvCell).join(","),
      ["#", "Buyer Question", "Confidence", "Security Pillar", "Evidence Reference", "Approved Response"]
        .map(csvCell)
        .join(",")
    ];

    exportRows.forEach((r) => {
      lines.push(
        [
          r.index,
          r.originalQuestion,
          r.confidence,
          r.pillar,
          r.evidenceTag,
          r.suggestedAnswer
        ]
          .map(csvCell)
          .join(",")
      );
    });

    const blob = new Blob([lines.join("\r\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const slug = (state.portal.company || "trustvault").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    a.href = url;
    a.download = `${slug}-security-questionnaire.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    ANALYTICS.track("csv_exported", {
      preset_id: state.portal.presetId,
      question_count: exportRows.length,
      export_format: "csv"
    });

    if (isCapped) {
      showToast(`Exported ${freeCap}/${rows.length} Q&As (Free Forever cap). Unlock Pro (${CFG.PROMO_CODE}) for unlimited exports.`);
    } else {
      showToast(`Exported ${exportRows.length} attested answers to CSV.`);
    }
  }

  async function buildShareableUrl(forEmbed) {
    const encoded = await CODEC.encodePortal(state.portal);
    const base = window.location.origin + window.location.pathname;
    const query = forEmbed ? "?embed=1" : "";
    return `${base}${query}#t=${encoded}`;
  }

  function copyText(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => showToast(successMsg),
        () => showToast(successMsg)
      );
    } else {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch (e) {}
      document.body.removeChild(ta);
      showToast(successMsg);
    }
  }

  function getCheckoutHref(tierKey) {
    const cycle = state.billingCycle;
    let url = "";
    let planLabel = "";
    let priceLabel = "";

    if (tierKey === "dfy") {
      url = CFG.CHECKOUT_DFY_LINK || "";
      planLabel = "Done-For-You 48-Hr Trust Portal & 100-Q Vault Concierge";
      priceLabel = CFG.DFY_SETUP_PRICE || "$1,499";
    } else if (tierKey === "scale") {
      url = cycle === "annual" ? CFG.CHECKOUT_SCALE_ANNUAL_LINK : CFG.CHECKOUT_SCALE_MONTHLY_LINK;
      planLabel = `TrustVault Scale (${cycle === "annual" ? CFG.SCALE_PRICE_ANNUAL : CFG.SCALE_PRICE_MONTHLY})`;
      priceLabel = cycle === "annual" ? CFG.SCALE_PRICE_ANNUAL : CFG.SCALE_PRICE_MONTHLY;
    } else {
      url = cycle === "annual" ? CFG.CHECKOUT_PRO_ANNUAL_LINK : CFG.CHECKOUT_PRO_MONTHLY_LINK;
      planLabel = `TrustVault Pro Enterprise (${cycle === "annual" ? CFG.PRO_PRICE_ANNUAL : CFG.PRO_PRICE_MONTHLY})`;
      priceLabel = cycle === "annual" ? CFG.PRO_PRICE_ANNUAL : CFG.PRO_PRICE_MONTHLY;
    }

    if (url && /^https:\/\//i.test(url)) {
      return { href: url, isExternal: true, planLabel, priceLabel };
    }

    const email = CFG.SUPPORT_EMAIL || "bidliftco@gmail.com";
    const subject = encodeURIComponent(`Activate ${planLabel} (${CFG.PROMO_CODE || "FOUNDER30"})`);
    const body = encodeURIComponent(
      `Hi TrustVault Team,\n\nPlease send an instant activation link for:\n- Plan: ${planLabel}\n- Promo Code: ${CFG.PROMO_CODE || "FOUNDER30"} (${CFG.PROMO_LABEL || "30% Off Thru Nov 30"})\n- Company: ${state.portal.company || ""}\n- Domain: ${state.portal.domain || ""}\n\nThank you!`
    );
    return {
      href: `mailto:${email}?subject=${subject}&body=${body}`,
      isExternal: false,
      planLabel,
      priceLabel
    };
  }

  function renderShieldSvg(size) {
    const s = size || 20;
    return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`;
  }

  function computeReadinessScore(portal) {
    const p = portal || state.portal || {};
    const presets = KB.INDUSTRY_PRESETS || {};
    const defaultCompanies = new Set(
      Object.keys(presets).map((k) => String((presets[k] && presets[k].defaultCompany) || "").trim().toLowerCase())
    );
    const defaultDomains = new Set(
      Object.keys(presets).map((k) => String((presets[k] && presets[k].defaultDomain) || "").trim().toLowerCase())
    );

    const companyTrim = String(p.company || "").trim();
    const cleanDomain = String(p.domain || "")
      .trim()
      .replace(/^https?:\/\//i, "")
      .split("/")[0]
      .toLowerCase();
    const domainLabel = cleanDomain || "yourdomain.com";

    let score = 0;
    const blockers = [];

    // 1. Customized non-default company & domain (15 pts)
    const isCustomCompany = companyTrim.length >= 2 && !defaultCompanies.has(companyTrim.toLowerCase());
    const isCustomDomain = cleanDomain.includes(".") && !defaultDomains.has(cleanDomain) && !cleanDomain.endsWith(".onrender.com");
    const brandPts = (isCustomCompany ? 8 : 0) + (isCustomDomain ? 7 : 0);
    score += brandPts;
    if (brandPts < 15) {
      blockers.push({
        pts: 15 - brandPts,
        text: `Using starter preset brand/domain — set your live company & domain for +${15 - brandPts} pts`,
        fixTarget: "brand"
      });
    }

    // 2. Verified corporate security email (10 pts)
    const email = String(p.securityEmail || "").trim().toLowerCase();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    const isFreeWebmail = /@(gmail|yahoo|hotmail|outlook|icloud|aol)\.com$/i.test(email);
    if (validEmail && !isFreeWebmail) {
      score += 10;
    } else if (validEmail) {
      score += 5;
      blockers.push({
        pts: 5,
        text: `Security contact uses consumer webmail — use security@${domainLabel} for +5 pts`,
        fixTarget: "email"
      });
    } else {
      blockers.push({
        pts: 10,
        text: `Missing valid security contact email — add security@${domainLabel} for +10 pts`,
        fixTarget: "email"
      });
    }

    // 3. Compliance badges count (15 pts)
    const badges = Array.isArray(p.badges) ? p.badges : [];
    const badgeCount = badges.length;
    const badgePts = badgeCount >= 4 ? 15 : badgeCount >= 2 ? 9 : badgeCount === 1 ? 4 : 0;
    score += badgePts;
    if (badgeCount < 4) {
      blockers.push({
        pts: 15 - badgePts,
        text: `Only ${badgeCount}/4 compliance posture badges enabled — select at least 4 for +${15 - badgePts} pts`,
        fixTarget: "badges"
      });
    }

    // 4. SOC2 / GDPR / AI Zero-Training coverage (15 pts)
    const badgeSet = new Set(badges.map((b) => String(b).toLowerCase()));
    const frameLower = String(p.complianceFrame || "").toLowerCase();
    const hasSoc2 = badgeSet.has("soc2 type ii ready") || /soc\s*2/.test(frameLower);
    const hasGdpr = badgeSet.has("gdpr") || /gdpr/.test(frameLower);
    const hasAiZero = badgeSet.has("zero-training ai");
    if (hasSoc2) {
      score += 5;
    } else {
      blockers.push({ pts: 5, text: "Missing SOC2 Type II Ready badge or framework coverage (+5 pts)", fixTarget: "badges" });
    }
    if (hasGdpr) {
      score += 5;
    } else {
      blockers.push({ pts: 5, text: "Missing GDPR compliance posture badge (+5 pts)", fixTarget: "badges" });
    }
    if (hasAiZero) {
      score += 5;
    } else {
      blockers.push({ pts: 5, text: "Missing AI Zero-Training badge — enterprise buyers flag AI vendors without ZDR (+5 pts)", fixTarget: "badges" });
    }

    // 5. Compliance pillar summaries >= 4 filled (15 pts)
    const pillars = KB.PILLARS || [];
    const filledPillars = pillars.filter(
      (pil) => String((p.pillarSummaries && p.pillarSummaries[pil.id]) || "").trim().length >= 25
    ).length;
    if (filledPillars >= 6) {
      score += 15;
    } else if (filledPillars >= 4) {
      score += 12;
      blockers.push({
        pts: 3,
        text: `${filledPillars}/6 compliance pillar summaries documented — complete all 6 for +3 pts`,
        fixTarget: "pillars"
      });
    } else {
      const pPts = Math.round((filledPillars / 4) * 10);
      score += pPts;
      blockers.push({
        pts: 15 - pPts,
        text: `Only ${filledPillars}/6 compliance pillars filled (need >=4 for buyer review) for +${15 - pPts} pts`,
        fixTarget: "pillars"
      });
    }

    // 6. Subprocessors list >= 3 (15 pts)
    const validSubprocs = (Array.isArray(p.subprocessors) ? p.subprocessors : []).filter(
      (sp) => String(sp.name || "").trim().length > 0 && String(sp.purpose || "").trim().length > 0
    ).length;
    if (validSubprocs >= 3) {
      score += 15;
    } else if (validSubprocs >= 1) {
      score += 8;
      blockers.push({
        pts: 7,
        text: `Subprocessor registry lists ${validSubprocs}/3 vendors — add at least 3 with DPA status for +7 pts`,
        fixTarget: "subprocessors"
      });
    } else {
      blockers.push({
        pts: 15,
        text: "Subprocessor registry is empty — list >=3 authorized vendors for +15 pts",
        fixTarget: "subprocessors"
      });
    }

    // 7. Custom domain / white-label portal vs free .onrender.com (15 pts)
    const hasCustomDomainMapping = Boolean(state.proUnlocked && p.whiteLabel);
    if (hasCustomDomainMapping) {
      score += 15;
    } else {
      blockers.push({
        pts: 15,
        text: `Hosting trust portal on .onrender.com — map trust.${domainLabel} for +15 pts`,
        fixTarget: "dfy"
      });
    }

    blockers.sort((a, b) => b.pts - a.pts);
    const finalScore = Math.max(0, Math.min(100, score));
    const isReady = finalScore >= 75;
    return {
      score: finalScore,
      statusLabel: isReady ? "Procurement Ready" : "Needs Review",
      statusTone: isReady ? "ready" : finalScore >= 55 ? "review" : "critical",
      blockers: blockers.slice(0, 3)
    };
  }

  function renderReadinessGraderHtml() {
    const res = computeReadinessScore(state.portal);
    const dfyCheckout = getCheckoutHref("dfy");
    const topFixTarget = res.blockers.length ? res.blockers[0].fixTarget : "dfy";
    const blockersHtml = res.blockers.length
      ? res.blockers
          .map(
            (b) => `
            <li class="tv-grader-blocker">
              <span class="tv-grader-pts">+${b.pts} pts</span>
              <span>${escHtml(b.text)}</span>
            </li>
          `
          )
          .join("")
      : `<li class="tv-grader-blocker pass"><span class="tv-grader-pts pass">100%</span><span>All 7 procurement readiness checks passed — ready for enterprise CISO review.</span></li>`;

    return `
      <div class="tv-grader-card no-print">
        <div class="tv-grader-top">
          <div>
            <div class="tv-grader-kicker">Enterprise Security Readiness Grader</div>
            <div class="tv-grader-sub">Live procurement audit based on your active controls, badges, subprocessors &amp; domain posture</div>
          </div>
          <div class="tv-score-pill ${res.statusTone}" aria-live="polite">
            <span class="mono">${res.score} / 100</span>
            <span>— ${escHtml(res.statusLabel)}</span>
          </div>
        </div>
        <div class="tv-grader-bar-track" aria-hidden="true">
          <div class="tv-grader-bar-fill ${res.statusTone}" style="width:${res.score}%;"></div>
        </div>
        <div class="tv-grader-body">
          <div class="tv-grader-blockers-wrap">
            <div class="tv-grader-list-label">${res.blockers.length ? "Top Procurement Blockers" : "Procurement Audit Status"}</div>
            <ul class="tv-grader-list">${blockersHtml}</ul>
          </div>
          <div class="tv-grader-actions">
            <a href="${escHtml(dfyCheckout.href)}" ${dfyCheckout.isExternal ? 'target="_blank" rel="noopener noreferrer"' : ""} class="btn btn-primary btn-sm" data-action="checkout-track" data-plan="dfy">Fix All Gaps in 48 Hrs (DFY ${escHtml(CFG.DFY_SETUP_PRICE || "$1,499")})</a>
            <button type="button" class="btn btn-outline btn-sm" data-action="fix-missing-controls" data-fix-target="${escHtml(topFixTarget)}">Add Missing Controls</button>
          </div>
        </div>
      </div>
    `;
  }

  function buildWebsiteBadgeHtml(portalUrl) {
    const p = state.portal || {};
    const label = state.proUnlocked
      ? `Verified Security Posture · ${p.company || "Enterprise"}`
      : "Verified Security Posture · TrustVault";
    const fallbackUrl =
      typeof window !== "undefined" && window.location
        ? window.location.origin + window.location.pathname
        : "https://trustvault-zdof.onrender.com/";
    const safeUrl = escHtml(portalUrl || state.cachedPortalUrl || fallbackUrl);
    const safeLabel = escHtml(label);
    const safeTitle = escHtml(`${p.company || "Company"} Security Trust Portal`);
    return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" title="${safeTitle}" style="display:inline-flex;align-items:center;gap:8px;padding:7px 13px;border-radius:999px;background:#071224;color:#ffffff;border:1px solid #10b981;font-family:system-ui,-apple-system,sans-serif;font-size:12px;font-weight:600;text-decoration:none;line-height:1;"><span style="width:8px;height:8px;border-radius:50%;background:#34d399;display:inline-block;"></span><span>${safeLabel}</span></a>`;
  }

  function renderEmbedBadgeCardHtml() {
    const p = state.portal || {};
    const badgeLabel = state.proUnlocked
      ? `Verified Security Posture · ${p.company || "Enterprise"}`
      : "Verified Security Posture · TrustVault";
    const snippet = buildWebsiteBadgeHtml(state.cachedPortalUrl);

    return `
      <div id="embed-badge-area" class="tv-card tv-embed-badge-card no-print">
        <div class="tv-card-title">
          <span>Embed Security Trust Badge on Your Website</span>
          <span class="tv-conf-badge tv-conf-high">Zero External JS</span>
        </div>
        <p class="tv-embed-badge-desc">
          Paste this minimal inline-style <code>&lt;a&gt;</code> footer badge onto your marketing site, checkout, or pricing page. It links directly to your live <code>#t=</code> Trust Portal URL with zero third-party scripts.
        </p>
        <div class="tv-embed-badge-preview-row">
          <div class="tv-embed-badge-preview-box">
            <span class="tv-embed-preview-label">Live Footer Preview:</span>
            <span class="tv-website-badge-preview" id="website-badge-preview-pill">
              <span class="tv-cert-dot"></span>
              <span>${escHtml(badgeLabel)}</span>
            </span>
          </div>
          <div class="tv-toolbar-group">
            <button type="button" class="btn btn-primary btn-sm" data-action="copy-website-badge">Copy Website Badge HTML</button>
            ${
              !state.proUnlocked
                ? `<button type="button" class="btn btn-outline btn-sm" data-action="open-pro-modal">Brand Badge with ${escHtml(p.company || "Your Company")} (Pro)</button>`
                : ""
            }
          </div>
        </div>
        <textarea id="badge-html-code" class="tv-textarea tv-badge-code-box" readonly rows="3" aria-label="Embeddable website badge HTML snippet">${escHtml(snippet)}</textarea>
      </div>
    `;
  }

  function refreshWebsiteBadgeSnippet() {
    if (!CODEC.encodePortal || !state.portal) return;
    buildShareableUrl(false).then((url) => {
      state.cachedPortalUrl = url;
      const box = document.getElementById("badge-html-code");
      if (box) {
        box.value = buildWebsiteBadgeHtml(url);
      }
    }).catch(() => {});
  }

  function handleFixMissingControls(target) {
    if (target === "brand") {
      const el = document.getElementById("inp-company");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus();
        showToast("Update Company Name & Primary Domain to earn +15 pts.");
        return;
      }
    }
    if (target === "email") {
      const el = document.getElementById("inp-sec-email");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus();
        showToast("Set a dedicated corporate security email (e.g. security@yourdomain.com).");
        return;
      }
    }
    if (target === "badges") {
      const el = document.querySelector("[data-badge-toggle]");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        showToast("Toggle missing compliance badges (e.g. Zero-Training AI, SOC2, GDPR).");
        return;
      }
    }
    if (target === "subprocessors") {
      const el = document.querySelector("[data-action='add-subproc']");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        showToast("Add at least 3 authorized subprocessors with DPA status.");
        return;
      }
    }
    if (target === "pillars") {
      if (state.activeTab !== "portal") {
        state.activeTab = "portal";
        render();
      }
      const el = document.getElementById("portal-preview-area");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("Click Edit Pillar on any security pillar to complete your summaries.");
      return;
    }
    state.proModalOpen = true;
    state.proFocusTier = "dfy";
    render();
  }

  function renderTrustPortalCardHtml(isBuyerMode) {
    const p = state.portal;
    const pillars = KB.PILLARS || [];
    const initials = (p.company || "TV")
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0] || "")
      .join("")
      .toUpperCase() || "TV";

    const logoHtml = p.logoData
      ? `<img src="${escHtml(p.logoData)}" alt="${escHtml(p.company)} logo" />`
      : `<span>${escHtml(initials)}</span>`;

    const badgesHtml = (p.badges || [])
      .map((b) => `<span class="tv-cert-badge"><span class="tv-cert-dot"></span>${escHtml(b)}</span>`)
      .join("");

    const pillarsHtml = pillars
      .map((pil) => {
        const summary = (p.pillarSummaries && p.pillarSummaries[pil.id]) || pil.description;
        const isEditing = !isBuyerMode && state.editingPillarId === pil.id;
        return `
          <div class="tv-pillar-card">
            <div class="tv-pillar-head">
              <span class="tv-pillar-title">${escHtml(pil.name)}</span>
              <span class="tv-pillar-status">Verified Control</span>
            </div>
            ${
              isEditing
                ? `<textarea class="tv-textarea" data-pillar-edit="${escHtml(pil.id)}" rows="3">${escHtml(summary)}</textarea>
                   <div style="margin-top:6px;text-align:right;">
                     <button type="button" class="btn btn-sm btn-primary" data-action="save-pillar" data-pillar="${escHtml(pil.id)}">Done</button>
                   </div>`
                : `<p class="tv-pillar-text">${escHtml(summary)}</p>
                   ${
                     !isBuyerMode
                       ? `<div style="margin-top:8px;"><button type="button" class="btn btn-sm btn-outline" data-action="edit-pillar" data-pillar="${escHtml(pil.id)}">Edit Pillar</button></div>`
                       : ""
                   }`
            }
          </div>
        `;
      })
      .join("");

    const subprocRows = (p.subprocessors || [])
      .map(
        (sp) => `
          <tr>
            <td><strong>${escHtml(sp.name)}</strong></td>
            <td>${escHtml(sp.purpose)}</td>
            <td>${escHtml(sp.location)}</td>
            <td><span class="tv-conf-badge tv-conf-high">${escHtml(sp.dpaStatus || "DPA Executed")}</span></td>
          </tr>
        `
      )
      .join("");

    let buyerControlsSection = "";
    if (isBuyerMode) {
      const q = (state.buyerSearchQuery || "").trim().toLowerCase();
      const entries = (KB.KB_ENTRIES || []).filter((item) => {
        if (!q) return true;
        return (
          item.question.toLowerCase().includes(q) ||
          item.pillar.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q)
        );
      });
      const shown = entries.slice(0, q ? 12 : 6);
      buyerControlsSection = `
        <div style="margin-top:26px;padding-top:22px;border-top:1px solid var(--tv-border);">
          <div class="tv-section-heading">
            <span>Verified Security Controls Directory (${KB.KB_ENTRIES ? KB.KB_ENTRIES.length : 64} Controls)</span>
            <input id="buyer-control-search" type="search" class="tv-input" style="max-width:300px;" placeholder="Search SOC2, AES-256, AI, SAML, RPO..." value="${escHtml(state.buyerSearchQuery)}" />
          </div>
          <div style="display:grid;gap:10px;">
            ${shown
              .map(
                (entry) => `
                <div class="tv-pillar-card" style="background:#ffffff;">
                  <div class="tv-pillar-head">
                    <span class="tv-pillar-title">${escHtml(entry.id)} · ${escHtml(entry.question)}</span>
                    <span class="tv-pillar-status">${escHtml(entry.pillar)}</span>
                  </div>
                  <p class="tv-pillar-text">${escHtml(KB.applyTemplateVars(entry.answer, getCompanyContext()))}</p>
                  <span class="tv-evidence-tag">${escHtml(entry.evidenceTag)}</span>
                </div>
              `
              )
              .join("")}
          </div>
        </div>
      `;
    }

    const showPoweredBy = !p.whiteLabel || !state.proUnlocked;

    return `
      <div class="tv-portal-shell" id="portal-preview-card">
        <div class="tv-portal-banner">
          <div class="tv-portal-top">
            <div class="tv-portal-ident">
              <div class="tv-portal-logo">${logoHtml}</div>
              <div>
                <span class="tv-verified-chip">${renderShieldSvg(14)} Verified Enterprise Trust Portal</span>
                <h2 class="tv-portal-name">${escHtml(p.company)}</h2>
                <div class="tv-portal-meta">${escHtml(p.domain)} · Security Contact: <a href="mailto:${escHtml(p.securityEmail)}" style="color:#34d399;">${escHtml(p.securityEmail)}</a> · Hosting: ${escHtml(p.hostingRegion)}</div>
              </div>
            </div>
            <div class="no-print" style="display:flex;gap:8px;flex-wrap:wrap;">
              <button type="button" class="btn btn-primary" data-action="open-nda">Request Full Security Packet / NDA</button>
            </div>
          </div>
          <p class="tv-portal-tagline">${escHtml(p.tagline)}</p>
          <div class="tv-portal-badges">${badgesHtml}</div>
        </div>
        <div class="tv-digest-bar">
          <span><strong>SHA-256 Attestation Digest:</strong> <span id="portal-digest-val" class="tv-digest-code">${escHtml(state.portalDigest)}</span></span>
          <span>Framework: <strong style="color:#e2e8f0;">${escHtml(p.complianceFrame)}</strong></span>
        </div>
        <div class="tv-portal-body">
          <div class="tv-section-heading">
            <span>6 Security &amp; Compliance Control Pillars</span>
            <span style="font-size:12px;font-weight:600;color:var(--tv-text-subtle);">Last Attested: ${new Date(p.updatedAt || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
          </div>
          <div class="tv-pillars-grid">${pillarsHtml}</div>

          <div class="tv-section-heading">
            <span>Authorized Subprocessor Registry (${(p.subprocessors || []).length})</span>
            <span style="font-size:12px;font-weight:600;color:var(--tv-text-subtle);">30-Day Advance Change Notice Policy</span>
          </div>
          <div class="tv-table-wrap">
            <table class="tv-table">
              <thead>
                <tr>
                  <th>Subprocessor</th>
                  <th>Purpose / Data Scope</th>
                  <th>Hosting Location</th>
                  <th>DPA / Safeguard</th>
                </tr>
              </thead>
              <tbody>
                ${subprocRows || `<tr><td colspan="4" style="color:var(--tv-text-subtle);">No subprocessors listed.</td></tr>`}
              </tbody>
            </table>
          </div>
          ${buyerControlsSection}
        </div>
        <div class="tv-portal-footer">
          <span>Questions or custom vendor forms? Email <strong>${escHtml(p.securityEmail)}</strong></span>
          ${
            showPoweredBy
              ? `<span>Verified &amp; Attested via <strong>TrustVault</strong> · Zero-Server Architecture</span>`
              : `<span>${escHtml(p.company)} Security Trust Center</span>`
          }
        </div>
      </div>
    `;
  }

  function renderAutoFillTabHtml() {
    const rows = state.qa.rows || [];
    const highCount = rows.filter((r) => r.confidence === "High").length;
    const medCount = rows.filter((r) => r.confidence === "Medium").length;
    const revCount = rows.filter((r) => r.confidence === "Needs Review").length;
    const coveragePct = rows.length ? Math.round(((highCount + medCount) / rows.length) * 100) : 0;
    const hoursSaved = ((highCount + medCount) * 0.3).toFixed(1);

    const filter = state.qa.filterConfidence || "all";
    const visibleRows = rows.filter((r) => {
      if (filter === "high") return r.confidence === "High";
      if (filter === "medium") return r.confidence === "Medium";
      if (filter === "review") return r.confidence === "Needs Review";
      return true;
    });

    const summaryHtml = rows.length
      ? `
        <div class="tv-summary-bar">
          <div class="tv-kpi-card">
            <div class="tv-kpi-val emerald">${highCount}/${rows.length}</div>
            <div class="tv-kpi-lbl">Matched High Confidence</div>
          </div>
          <div class="tv-kpi-card">
            <div class="tv-kpi-val">${coveragePct}%</div>
            <div class="tv-kpi-lbl">High + Medium Coverage</div>
          </div>
          <div class="tv-kpi-card">
            <div class="tv-kpi-val">${hoursSaved} hrs</div>
            <div class="tv-kpi-lbl">Estimated Eng Hours Saved</div>
          </div>
          <div class="tv-kpi-card">
            <div class="tv-kpi-val" style="font-size:12px;word-break:break-all;" id="qa-digest-val">${escHtml(state.qaDigest.slice(0, 24))}…</div>
            <div class="tv-kpi-lbl">SHA-256 Attestation Header</div>
          </div>
        </div>

        <div class="tv-filter-row no-print">
          <div class="tv-filter-pills">
            <button type="button" class="tv-filter-pill ${filter === "all" ? "active" : ""}" data-filter="all">All (${rows.length})</button>
            <button type="button" class="tv-filter-pill ${filter === "high" ? "active" : ""}" data-filter="high">High (${highCount})</button>
            <button type="button" class="tv-filter-pill ${filter === "medium" ? "active" : ""}" data-filter="medium">Medium (${medCount})</button>
            <button type="button" class="tv-filter-pill ${filter === "review" ? "active" : ""}" data-filter="review">Needs Review (${revCount})</button>
          </div>
          <div class="tv-toolbar-group">
            <button type="button" class="btn btn-primary" data-action="export-csv">Export Procurement-Ready .CSV</button>
            <button type="button" class="btn btn-outline" data-action="print-pdf">Print Executive Q&amp;A PDF</button>
          </div>
        </div>

        <div class="tv-portal-shell">
          <div class="tv-digest-bar">
            <span><strong>Questionnaire Attestation (SHA-256):</strong> <span id="qa-digest-full" class="tv-digest-code">${escHtml(state.qaDigest)}</span></span>
            <span>${!state.proUnlocked && rows.length > 10 ? "Free Forever exports up to 10 Q&As · Pro unlocks unlimited" : "Full Procurement Export Ready"}</span>
          </div>
          <div class="tv-table-wrap" style="border:none;border-radius:0;">
            <table class="tv-table">
              <thead>
                <tr>
                  <th style="width:44px;">#</th>
                  <th style="width:32%;">Enterprise Buyer Question</th>
                  <th style="width:130px;">Match</th>
                  <th>Tailored Procurement Response (Editable)</th>
                </tr>
              </thead>
              <tbody>
                ${visibleRows
                  .map((r) => {
                    const confClass =
                      r.confidence === "High"
                        ? "tv-conf-high"
                        : r.confidence === "Medium"
                        ? "tv-conf-medium"
                        : "tv-conf-review";
                    return `
                      <tr>
                        <td class="mono"><strong>${r.index}</strong></td>
                        <td>
                          <div style="font-weight:600;color:var(--tv-navy-900);margin-bottom:4px;">${escHtml(r.originalQuestion)}</div>
                          <div style="font-size:11.5px;color:var(--tv-text-subtle);">${escHtml(r.pillar)} · ${escHtml(r.matchedId)}</div>
                        </td>
                        <td>
                          <span class="tv-conf-badge ${confClass}">${escHtml(r.confidence)}</span>
                          <div style="font-size:11px;color:var(--tv-text-subtle);margin-top:4px;">Score: ${Math.round(r.score * 100)}%</div>
                        </td>
                        <td>
                          <textarea class="tv-qa-answer-box" data-qa-answer="${r.index}">${escHtml(r.suggestedAnswer)}</textarea>
                          <span class="tv-evidence-tag">${escHtml(r.evidenceTag)}</span>
                        </td>
                      </tr>
                    `;
                  })
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
      `
      : `
        <div class="tv-card" style="text-align:center;padding:34px 20px;">
          <h3 style="margin:0 0 8px;font-family:var(--tv-font-display);">Ready to Auto-Fill Your Buyer's Security Questionnaire</h3>
          <p style="margin:0 0 16px;color:var(--tv-text-muted);max-width:560px;margin-left:auto;margin-right:auto;">
            Click <strong>Load 20-Question Enterprise SIG-Lite Sample</strong> above, upload a buyer's <code>.csv</code> spreadsheet, or paste numbered security questions to match against our 64-control enterprise vault in milliseconds.
          </p>
          <button type="button" class="btn btn-primary btn-lg" data-action="load-sig-sample">Load 20-Question Enterprise SIG-Lite Sample →</button>
        </div>
      `;

    return `
      <div class="tv-qa-input-card no-print">
        <div class="tv-card-title">
          <span>Security Questionnaire Auto-Filler (64-Control Enterprise Vault)</span>
          <span style="font-size:12px;font-weight:600;color:var(--tv-emerald-700);">100% Browser-Local · Zero Buyer PII Sent</span>
        </div>
        <div class="tv-qa-actions">
          <button type="button" class="btn btn-primary" data-action="load-sig-sample">Load 20-Question Enterprise SIG-Lite Sample</button>
          <label class="btn btn-outline" style="cursor:pointer;">
            Upload Buyer .CSV
            <input id="qa-csv-upload" type="file" accept=".csv,.txt" class="sr-only" />
          </label>
          <button type="button" class="btn btn-navy" data-action="run-autofill">Auto-Fill Pasted Questions</button>
          <button type="button" class="btn btn-outline" data-action="clear-qa">Clear</button>
        </div>
        <textarea id="qa-raw-input" class="tv-textarea" rows="5" placeholder="Paste numbered or newline buyer security questions here (e.g. '1. How is customer data encrypted at rest?') or upload a .csv file...">${escHtml(state.qa.rawInput)}</textarea>
      </div>
      ${summaryHtml}
    `;
  }

  function renderPricingComparisonHtml(insideModal) {
    const isAnnual = state.billingCycle === "annual";
    const proPrice = isAnnual ? CFG.PRO_PRICE_ANNUAL || "$1,190/yr" : CFG.PRO_PRICE_MONTHLY || "$149/mo";
    const scalePrice = isAnnual ? CFG.SCALE_PRICE_ANNUAL || "$2,490/yr" : CFG.SCALE_PRICE_MONTHLY || "$299/mo";
    const proSub = isAnnual ? "Equivalent to $99/mo · Save $598/yr" : "Or $1,190/yr (save $598/yr)";
    const scaleSub = isAnnual ? "Includes Multi-Product + Custom Domain · +$1,499 DFY option" : "Or $2,490/yr · +$1,499 DFY option";

    const proCheckout = getCheckoutHref("pro");
    const scaleCheckout = getCheckoutHref("scale");
    const dfyCheckout = getCheckoutHref("dfy");

    const rows = [
      ["Interactive B2B Trust Portal (#t= URL)", "✓ (1 Portal)", "✓ Unlimited", "✓ Multi-Product"],
      ["6 Industry Presets & Subprocessor Registry", "✓", "✓", "✓"],
      ["Security Questionnaire Auto-Filler", "✓ (10 Q&As/export)", "✓ Full 64+ KB Unlimited", "✓ Custom 100-Q Vault"],
      ["Procurement-Ready .CSV & PDF Exports", "✓ (Up to 10 rows)", "✓ Unlimited", "✓ Unlimited"],
      ["White-Label Portal (trust.yourdomain.com Iframe)", "✕", "✓", "✓ Custom Domain"],
      ["Cryptographic SHA-256 Attestation Headers", "✓", "✓", "✓ + Signed Packet"],
      ["Done-For-You 48-Hr Portal & 100-Q Setup", "✕", "Optional (+$1,499)", "✓ Concierge Ready (+$1,499)"]
    ];

    return `
      <div class="${insideModal ? "" : "tv-pricing-box"}">
        <div class="tv-pricing-header">
          <div>
            <h2>${insideModal ? "Upgrade TrustVault — Close Enterprise Security Reviews 3× Faster" : "Transparent Pricing — Start on Free Forever ($0)"}</h2>
            <p style="margin:0;color:var(--tv-text-muted);font-size:13.5px;">
              Start on <strong>Free Forever ($0)</strong> with zero credit card or trial expiry. Apply code <span class="mono" style="background:var(--tv-emerald-100);color:var(--tv-emerald-700);padding:2px 7px;border-radius:6px;font-weight:700;">${escHtml(CFG.PROMO_CODE || "FOUNDER30")}</span> for <strong>${escHtml(CFG.PROMO_LABEL || "30% Off Thru Nov 30")}</strong>.
            </p>
          </div>
          <div class="tv-billing-toggle" role="group" aria-label="Billing cycle">
            <button type="button" class="tv-billing-btn ${isAnnual ? "active" : ""}" data-billing="annual">Annual (Save 33%)</button>
            <button type="button" class="tv-billing-btn ${!isAnnual ? "active" : ""}" data-billing="monthly">Monthly</button>
          </div>
        </div>

        <div class="tv-tiers-grid">
          <div class="tv-tier-card">
            <div>
              <span class="tv-tier-badge" style="background:#e2e8f0;color:#334155;">Free Forever</span>
              <div style="font-weight:800;font-size:16px;color:var(--tv-navy-900);">Starter Trust Center</div>
              <div class="tv-tier-price">$0</div>
              <div class="tv-tier-sub">No credit card · No expiry · Zero PII</div>
              <ul style="margin:0 0 16px;padding-left:18px;font-size:12.5px;color:var(--tv-text-muted);display:grid;gap:6px;">
                <li>1 Live Trust Portal (#t= shareable link)</li>
                <li>Up to 10 auto-answered Q&amp;As per CSV export</li>
                <li>TrustVault verification footer badge</li>
              </ul>
            </div>
            <button type="button" class="btn btn-outline" data-action="start-free">Use Free Forever ($0)</button>
          </div>

          <div class="tv-tier-card featured">
            <div>
              <span class="tv-tier-badge">Most Popular · ${escHtml(CFG.PROMO_CODE || "FOUNDER30")}</span>
              <div style="font-weight:800;font-size:16px;color:var(--tv-navy-900);">Pro Enterprise</div>
              <div class="tv-tier-price">${escHtml(proPrice)}</div>
              <div class="tv-tier-sub">${escHtml(proSub)}</div>
              <ul style="margin:0 0 16px;padding-left:18px;font-size:12.5px;color:var(--tv-text-muted);display:grid;gap:6px;">
                <li>Unlimited white-label Portal &amp; iframe embed</li>
                <li>Full 64+ KB Auto-Filler &amp; unlimited .CSV exports</li>
                <li>Cryptographic SHA-256 attestation headers</li>
              </ul>
            </div>
            <a href="${escHtml(proCheckout.href)}" ${proCheckout.isExternal ? 'target="_blank" rel="noopener noreferrer"' : ""} class="btn btn-primary" data-action="checkout-track" data-plan="pro">Activate Pro (${escHtml(proPrice)}) →</a>
          </div>

          <div class="tv-tier-card" style="background:var(--tv-navy-900);color:#ffffff;border-color:var(--tv-navy-700);">
            <div>
              <span class="tv-tier-badge" style="background:rgba(52,211,153,0.18);color:var(--tv-emerald-400);">Scale + Done-For-You</span>
              <div style="font-weight:800;font-size:16px;color:#ffffff;">Scale &amp; 48-Hr DFY Setup</div>
              <div class="tv-tier-price" style="color:var(--tv-emerald-400);">${escHtml(scalePrice)}</div>
              <div class="tv-tier-sub" style="color:#cbd5e1;">${escHtml(scaleSub)}</div>
              <ul style="margin:0 0 16px;padding-left:18px;font-size:12.5px;color:#e2e8f0;display:grid;gap:6px;">
                <li>Custom domain framing &amp; multi-product portals</li>
                <li>Executive security packet concierge</li>
                <li>Optional <strong>$1,499</strong> 48-Hr 100-Q Vault DFY Launch</li>
              </ul>
            </div>
            <div style="display:grid;gap:8px;">
              <a href="${escHtml(scaleCheckout.href)}" ${scaleCheckout.isExternal ? 'target="_blank" rel="noopener noreferrer"' : ""} class="btn btn-primary" data-action="checkout-track" data-plan="scale">Activate Scale (${escHtml(scalePrice)})</a>
              <a href="${escHtml(dfyCheckout.href)}" ${dfyCheckout.isExternal ? 'target="_blank" rel="noopener noreferrer"' : ""} class="btn btn-dfy btn-sm" data-action="checkout-track" data-plan="dfy">Book 48-Hr DFY Setup (${escHtml(CFG.DFY_SETUP_PRICE || "$1,499")})</a>
              <a href="mailto:${escHtml(CFG.SUPPORT_EMAIL || "bidliftco@gmail.com")}?subject=Free%2010-Q%20TrustVault%20Pilot&amp;body=Hi%20Ravi%2C%20attaching%20our%20buyer%20security%20questionnaire%20for%20the%20free%2010-Q%2024-hr%20pilot." data-action="pilot-inquiry" style="font-size:12px;color:#a7f3d0;text-align:center;text-decoration:underline;margin-top:2px;">Active SIG-Lite right now? Email for a Free 10-Q Pilot (24-hr) →</a>
            </div>
          </div>
        </div>

        <div class="tv-table-wrap">
          <table class="tv-matrix-table">
            <thead>
              <tr>
                <th>Enterprise Capability</th>
                <th>Free Forever ($0)</th>
                <th>Pro Enterprise (${escHtml(proPrice)})</th>
                <th>Scale + DFY (${escHtml(scalePrice)})</th>
              </tr>
            </thead>
            <tbody>
              ${rows
                .map((r) => {
                  const fmtCell = (c) => {
                    if (c === "✓") return `<span class="tv-check">✓</span>`;
                    if (c === "✕") return `<span class="tv-cross">✕</span>`;
                    return escHtml(c).replace(/^✓/, '<span class="tv-check">✓</span>');
                  };
                  return `<tr><td>${escHtml(r[0])}</td><td>${fmtCell(r[1])}</td><td>${fmtCell(r[2])}</td><td>${fmtCell(r[3])}</td></tr>`;
                })
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderPartnerProgramHtml() {
    const supportEmail = CFG.SUPPORT_EMAIL || "bidliftco@gmail.com";
    const subject = encodeURIComponent("TrustVault vCISO Partner Program");
    const body = encodeURIComponent(
      "Hi Ravi,\n\n" +
        "I'd like to join the TrustVault vCISO / Agency Partner Program (30% recurring + $450 DFY referral).\n\n" +
        "Firm / Practice: \n" +
        "Clients served per year: "
    );
    return `
      <section id="partner-program" class="tv-partner-section no-print">
        <div class="tv-partner-box">
          <div class="tv-partner-head">
            <div>
              <span class="tv-tier-badge" style="background:rgba(52,211,153,0.18);color:var(--tv-emerald-400);">vCISO &amp; Agency Partner Program</span>
              <h2>Fractional CISO, SOC 2 Advisor, or B2B Agency? Partner &amp; Earn 30% Recurring + $450/DFY</h2>
              <p class="tv-partner-sub">
                Equip pre-Series A startups with an instant Trust Portal and 64-control SIG-Lite Auto-Filler during discovery calls instead of stalling deals on $15,000/yr GRC contracts.
              </p>
            </div>
            <a href="mailto:${escHtml(supportEmail)}?subject=${subject}&amp;body=${body}" class="btn btn-primary" data-action="partner-inquiry">Apply as vCISO Partner →</a>
          </div>
          <div class="tv-partner-grid">
            <div class="tv-partner-card">
              <div class="tv-partner-metric">$0</div>
              <h3>Free Forever Client Portals</h3>
              <p>Spin up zero-server #t= Trust Portals for pre-seed clients in 60 seconds during discovery calls with zero backend PII.</p>
            </div>
            <div class="tv-partner-card">
              <div class="tv-partner-metric">30%</div>
              <h3>Lifetime Recurring Share</h3>
              <p>Earn $45/mo per Pro Enterprise ($149/mo) or $90/mo per Scale ($299/mo) client account referred through your practice.</p>
            </div>
            <div class="tv-partner-card">
              <div class="tv-partner-metric">$450</div>
              <h3>Cash Referral Per DFY Setup</h3>
              <p>Refer any founder needing our 48-Hr Done-For-You 100-Q Vault + Branded Trust Portal ($1,499) and earn $450 per closed setup.</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderModalsHtml() {
    let html = "";

    if (state.proModalOpen) {
      html += `
        <div class="tv-modal-backdrop" id="modal-pro" role="dialog" aria-modal="true" aria-label="TrustVault Pricing & Pro Activation">
          <div class="tv-modal">
            <div class="tv-modal-head">
              <div>
                <span class="tv-verified-chip" style="margin-bottom:4px;color:var(--tv-emerald-700);background:var(--tv-emerald-50);border-color:var(--tv-emerald-500);">Merchant-of-Record Checkout · ${escHtml(CFG.PROMO_CODE || "FOUNDER30")}</span>
                <h2>Unlock Unlimited Enterprise Trust Portals &amp; 64+ Q&amp;A Exports</h2>
              </div>
              <button type="button" class="tv-close-btn" data-action="close-modals" aria-label="Close modal">×</button>
            </div>
            ${renderPricingComparisonHtml(true)}
            <div style="margin-top:18px;padding-top:16px;border-top:1px solid var(--tv-border);display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                ${
                  state.proUnlocked
                    ? `<span class="tv-conf-badge tv-conf-high">Pro Active: ${escHtml(state.proPlanLabel || "TrustVault Pro Enterprise")}</span>
                       <button type="button" class="btn btn-outline btn-sm" data-action="deactivate-pro">Switch to Free Forever</button>`
                    : `<label for="pro-license-input" style="font-size:12.5px;font-weight:600;color:var(--tv-text-muted);">Already have a Pro key?</label>
                       <input id="pro-license-input" type="text" class="tv-input" style="width:200px;" placeholder="TV-PRO-XXXX" />
                       <button type="button" class="btn btn-navy btn-sm" data-action="activate-license">Unlock Key</button>`
                }
              </div>
              <span style="font-size:12px;color:var(--tv-text-subtle);">Concierge invoicing &amp; PO support: <a href="mailto:${escHtml(CFG.SUPPORT_EMAIL || "bidliftco@gmail.com")}">${escHtml(CFG.SUPPORT_EMAIL || "bidliftco@gmail.com")}</a></span>
            </div>
          </div>
        </div>
      `;
    }

    if (state.ndaModalOpen) {
      const p = state.portal;
      html += `
        <div class="tv-modal-backdrop" id="modal-nda" role="dialog" aria-modal="true" aria-label="Request Full Security Packet">
          <div class="tv-modal narrow">
            <div class="tv-modal-head">
              <div>
                <h2>Request Full Security Packet / NDA</h2>
                <div style="font-size:12.5px;color:var(--tv-text-muted);">Direct security request to ${escHtml(p.company)} (${escHtml(p.securityEmail)})</div>
              </div>
              <button type="button" class="tv-close-btn" data-action="close-modals" aria-label="Close modal">×</button>
            </div>
            <form id="nda-request-form">
              <div class="tv-field">
                <label class="tv-label" for="nda-buyer-company">Your Company Name</label>
                <input id="nda-buyer-company" type="text" class="tv-input" required placeholder="e.g., Enterprise Procurement Corp" />
              </div>
              <div class="tv-field">
                <label class="tv-label" for="nda-buyer-email">Your Work Email</label>
                <input id="nda-buyer-email" type="email" class="tv-input" required placeholder="security-review@buyer.com" />
              </div>
              <div class="tv-field">
                <label class="tv-label">Requested Artifacts</label>
                <div style="display:grid;gap:6px;font-size:12.5px;">
                  <label><input type="checkbox" name="nda_item" value="SOC 2 / Compliance Attestation Summary" checked /> SOC 2 / Compliance Attestation Summary</label>
                  <label><input type="checkbox" name="nda_item" value="Latest Penetration Test Executive Summary" checked /> Latest Penetration Test Executive Summary</label>
                  <label><input type="checkbox" name="nda_item" value="GDPR DPA &amp; Standard Contractual Clauses" checked /> GDPR DPA &amp; Standard Contractual Clauses</label>
                  <label><input type="checkbox" name="nda_item" value="Signed SIG-Lite / CAIQ Questionnaire" /> Signed SIG-Lite / CAIQ Questionnaire</label>
                </div>
              </div>
              <div class="tv-field">
                <label class="tv-label" for="nda-buyer-note">Notes / Mutual NDA Link (Optional)</label>
                <textarea id="nda-buyer-note" class="tv-textarea" rows="2" placeholder="Include deal timeline or attach your vendor NDA link..."></textarea>
              </div>
              <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:14px;">
                <button type="button" class="btn btn-outline" data-action="close-modals">Cancel</button>
                <button type="submit" class="btn btn-primary">Send Packet Request via Email →</button>
              </div>
            </form>
          </div>
        </div>
      `;
    }

    if (state.legalModalOpen) {
      const supportEmail = CFG.SUPPORT_EMAIL || "bidliftco@gmail.com";
      html += `
        <div class="tv-modal-backdrop" id="modal-legal" role="dialog" aria-modal="true" aria-label="Privacy, Security & 14-Day Refund Policy">
          <div class="tv-modal narrow">
            <div class="tv-modal-head">
              <div>
                <h2>Privacy, Security &amp; 14-Day Refund Policy</h2>
                <div style="font-size:12.5px;color:var(--tv-text-muted);">TrustVault Zero-Backend Architecture &amp; Polar.sh Billing Terms</div>
              </div>
              <button type="button" class="tv-close-btn" data-action="close-modals" aria-label="Close modal">×</button>
            </div>
            <div style="display:grid;gap:12px;font-size:13px;line-height:1.6;color:var(--tv-text-secondary);">
              <div><strong style="color:var(--tv-text-primary);">1. Zero-Server Privacy:</strong> Trust Portal data, subprocessors, CSV question uploads, and answers remain strictly inside your browser storage and compressed <code>#t=</code> URL fragments—never stored on or trained into external servers.</div>
              <div><strong style="color:var(--tv-text-primary);">2. SHA-256 Attestation Digest:</strong> Exports and live portals compute client-side <code>SHA-256</code> integrity hashes so enterprise security reviewers can verify exact timestamped disclosures.</div>
              <div><strong style="color:var(--tv-text-primary);">3. Polar.sh Billing &amp; 14-Day Refund Guarantee:</strong> Pro, Scale, and Done-For-You orders are fulfilled via Polar.sh (Merchant of Record) with global VAT/sales tax compliance. Cancel anytime or email <a href="mailto:${escHtml(supportEmail)}">${escHtml(supportEmail)}</a> within 14 days for a full refund.</div>
            </div>
          </div>
        </div>
      `;
    }

    return html;
  }

  function renderStudioSidebarHtml() {
    const p = state.portal;
    const allBadges = KB.ALL_BADGES || [];
    const subprocs = p.subprocessors || [];

    return `
      <aside class="tv-sidebar">
        <div class="tv-card">
          <div class="tv-card-title">
            <span>Company &amp; Trust Branding</span>
            ${state.proUnlocked ? `<span class="tv-conf-badge tv-conf-high">PRO ACTIVE</span>` : `<span style="font-size:11px;color:var(--tv-text-subtle);">Live Preview</span>`}
          </div>
          <div class="tv-field">
            <label class="tv-label" for="inp-company">Company Name</label>
            <input id="inp-company" type="text" class="tv-input" value="${escHtml(p.company)}" data-portal-field="company" />
          </div>
          <div class="tv-field-row">
            <div class="tv-field">
              <label class="tv-label" for="inp-domain">Primary Domain</label>
              <input id="inp-domain" type="text" class="tv-input" value="${escHtml(p.domain)}" data-portal-field="domain" />
            </div>
            <div class="tv-field">
              <label class="tv-label" for="inp-sec-email">Security Email</label>
              <input id="inp-sec-email" type="email" class="tv-input" value="${escHtml(p.securityEmail)}" data-portal-field="securityEmail" />
            </div>
          </div>
          <div class="tv-field-row">
            <div class="tv-field">
              <label class="tv-label" for="inp-region">Hosting Region</label>
              <input id="inp-region" type="text" class="tv-input" value="${escHtml(p.hostingRegion)}" data-portal-field="hostingRegion" />
            </div>
            <div class="tv-field">
              <label class="tv-label" for="inp-frame">Compliance Posture</label>
              <input id="inp-frame" type="text" class="tv-input" value="${escHtml(p.complianceFrame)}" data-portal-field="complianceFrame" />
            </div>
          </div>
          <div class="tv-field">
            <label class="tv-label" for="inp-tagline">Executive Security Tagline</label>
            <textarea id="inp-tagline" class="tv-textarea" rows="2" data-portal-field="tagline">${escHtml(p.tagline)}</textarea>
          </div>
          <div class="tv-field">
            <label class="tv-label">Company Logo (Auto-Optimized)</label>
            <div class="tv-logo-row">
              <div class="tv-logo-preview">${p.logoData ? `<img src="${escHtml(p.logoData)}" alt="Logo" />` : escHtml((p.company || "TV").slice(0, 2).toUpperCase())}</div>
              <label class="btn btn-outline btn-sm" style="cursor:pointer;">
                Upload Logo
                <input id="inp-logo-file" type="file" accept="image/*" class="sr-only" />
              </label>
              ${p.logoData ? `<button type="button" class="btn btn-danger-soft btn-sm" data-action="remove-logo">Remove</button>` : ""}
            </div>
          </div>
          <div class="tv-field">
            <label style="display:flex;align-items:center;gap:8px;font-size:12.5px;font-weight:600;cursor:pointer;">
              <input type="checkbox" id="chk-whitelabel" ${p.whiteLabel ? "checked" : ""} />
              White-Label Portal (Remove TrustVault Badge · Pro)
            </label>
          </div>
        </div>

        <div class="tv-card">
          <div class="tv-card-title"><span>Compliance Posture Badges</span></div>
          <div class="tv-badge-grid">
            ${allBadges
              .map((badge) => {
                const active = (p.badges || []).indexOf(badge) !== -1;
                return `
                  <label class="tv-badge-toggle ${active ? "active" : ""}">
                    <input type="checkbox" data-badge-toggle="${escHtml(badge)}" ${active ? "checked" : ""} />
                    <span>${escHtml(badge)}</span>
                  </label>
                `;
              })
              .join("")}
          </div>
        </div>

        <div class="tv-card">
          <div class="tv-card-title">
            <span>Subprocessor Registry (${subprocs.length})</span>
            <button type="button" class="btn btn-outline btn-sm" data-action="add-subproc">+ Add Vendor</button>
          </div>
          ${subprocs
            .map(
              (sp, idx) => `
              <div class="tv-subproc-item">
                <div class="tv-subproc-grid">
                  <input type="text" class="tv-input" placeholder="Vendor Name" value="${escHtml(sp.name)}" data-subproc-idx="${idx}" data-subproc-key="name" />
                  <input type="text" class="tv-input" placeholder="Location" value="${escHtml(sp.location)}" data-subproc-idx="${idx}" data-subproc-key="location" />
                </div>
                <div class="tv-subproc-grid" style="margin-bottom:0;">
                  <input type="text" class="tv-input" placeholder="Purpose" value="${escHtml(sp.purpose)}" data-subproc-idx="${idx}" data-subproc-key="purpose" />
                  <div style="display:flex;gap:6px;">
                    <input type="text" class="tv-input" placeholder="DPA Status" value="${escHtml(sp.dpaStatus)}" data-subproc-idx="${idx}" data-subproc-key="dpaStatus" />
                    <button type="button" class="btn btn-danger-soft btn-sm" data-action="remove-subproc" data-idx="${idx}" title="Remove vendor">×</button>
                  </div>
                </div>
              </div>
            `
            )
            .join("")}
        </div>
      </aside>
    `;
  }

  function render() {
    const appEl = document.getElementById("app");
    if (!appEl || !state.portal) return;

    const presets = KB.INDUSTRY_PRESETS || {};
    const presetList = Object.keys(presets).map((k) => presets[k]);

    if (state.viewMode === "buyer") {
      const topBar = state.isEmbed
        ? ""
        : `
          <div class="tv-buyer-bar no-print">
            <div class="tv-buyer-bar-inner">
              <div style="display:flex;align-items:center;gap:10px;">
                <span style="color:var(--tv-emerald-400);display:inline-flex;">${renderShieldSvg(18)}</span>
                <strong>Live Enterprise Buyer Trust Portal</strong>
                <span style="color:#94a3b8;font-size:12.5px;">Zero-Server Cryptographic View</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                <button type="button" class="btn btn-ghost-dark btn-sm" data-action="print-pdf">Print Security One-Pager (PDF)</button>
                <button type="button" class="btn btn-primary btn-sm" data-action="exit-buyer">← Edit in TrustVault Studio</button>
              </div>
            </div>
          </div>
        `;

      appEl.innerHTML = `
        ${topBar}
        <main class="tv-buyer-wrap">
          ${renderTrustPortalCardHtml(true)}
        </main>
        ${renderModalsHtml()}
      `;
      bindEvents();
      return;
    }

    const activePreset = state.portal.presetId || "saas";
    const tabContentHtml =
      state.activeTab === "portal"
        ? `
          <div class="tv-toolbar no-print">
            <div class="tv-toolbar-group">
              <button type="button" class="btn btn-primary" data-action="copy-portal-link">Copy Shareable Trust Portal Link (#t=)</button>
              <button type="button" class="btn btn-outline" data-action="copy-embed-code">Copy Website Iframe Embed</button>
            </div>
            <div class="tv-toolbar-group">
              <button type="button" class="btn btn-outline" data-action="print-pdf">Print Executive Security PDF</button>
              <button type="button" class="btn btn-navy" data-action="open-buyer-view">Live Buyer View →</button>
            </div>
          </div>
          <div id="portal-preview-area">${renderTrustPortalCardHtml(false)}</div>
          ${renderEmbedBadgeCardHtml()}
        `
        : renderAutoFillTabHtml();

    appEl.innerHTML = `
      <header class="tv-header no-print">
        <div class="tv-header-inner">
          <a href="./" class="tv-brand">
            <div class="tv-brand-mark">${renderShieldSvg(21)}</div>
            <div>
              <span class="tv-brand-title">TrustVault <span class="tv-brand-tag">Zero-PII GRC</span></span>
              <span class="tv-brand-sub">B2B Trust Portal &amp; 64-Q SIG-Lite Auto-Filler</span>
            </div>
          </a>
          <nav class="tv-header-actions" aria-label="Primary actions">
            <a href="calculator.html" class="tv-nav-link">Deal-Velocity Calculator</a>
            <a href="#pricing-compare" class="tv-nav-link">Pricing</a>
            <button type="button" class="btn btn-ghost-dark btn-sm" data-action="open-buyer-view">Live Buyer Demo</button>
            <button type="button" class="btn btn-dfy btn-sm" data-action="open-dfy-modal">Done-For-You Portal (${escHtml(CFG.DFY_SETUP_PRICE || "$1,499")})</button>
            <button type="button" class="btn btn-primary btn-sm" data-action="open-pro-modal">Upgrade to Pro · 30% Off (${escHtml(CFG.PROMO_CODE || "FOUNDER30")})</button>
          </nav>
        </div>
      </header>

      <section class="tv-hero no-print">
        <div class="tv-hero-inner">
          <div>
            <span class="tv-hero-kicker">${renderShieldSvg(14)} Built for B2B SaaS, AI Platforms &amp; Agencies</span>
            <h1>Close Enterprise Deals 3× Faster — Without $15,000/yr GRC Bloat</h1>
            <p>Launch a verifiable, zero-server <strong>Trust Portal</strong> and auto-fill 20–100+ buyer <strong>SIG-Lite &amp; CSV security questionnaires</strong> in 60 seconds with SHA-256 attestation headers.</p>
          </div>
          <div class="tv-hero-metrics">
            <div class="tv-stat-box">
              <div class="tv-stat-val">64</div>
              <div class="tv-stat-lbl">Curated Security Q&amp;As</div>
            </div>
            <div class="tv-stat-box">
              <div class="tv-stat-val">$13.8K</div>
              <div class="tv-stat-lbl">Saved vs Legacy GRC</div>
            </div>
            <div class="tv-stat-box">
              <div class="tv-stat-val">60 sec</div>
              <div class="tv-stat-lbl">SIG-Lite Turnaround</div>
            </div>
          </div>
        </div>

        <div class="tv-preset-strip">
          <div class="tv-preset-pills" role="group" aria-label="Industry starter presets">
            ${presetList
              .map(
                (pr) => `
                <button type="button" class="tv-preset-pill ${pr.id === activePreset ? "active" : ""}" data-preset-pick="${escHtml(pr.id)}">${escHtml(pr.shortLabel)}</button>
              `
              )
              .join("")}
          </div>
          <div class="tv-preset-select-wrap">
            <label for="preset-select">Industry Preset:</label>
            <select id="preset-select" class="tv-preset-select">
              ${presetList
                .map(
                  (pr) => `<option value="${escHtml(pr.id)}" ${pr.id === activePreset ? "selected" : ""}>${escHtml(pr.label)}</option>`
                )
                .join("")}
            </select>
          </div>
        </div>
      </section>

      <main class="tv-container">
        <div class="tv-studio-grid">
          ${renderStudioSidebarHtml()}
          <section class="tv-workspace">
            <div id="readiness-grader-area">${renderReadinessGraderHtml()}</div>
            <div class="tv-tabs no-print" role="tablist">
              <button type="button" class="tv-tab-btn ${state.activeTab === "portal" ? "active" : ""}" data-tab="portal" role="tab">
                <span>1. Public Trust Portal &amp; Embed</span>
                <span class="tv-tab-pill">#t= Link</span>
              </button>
              <button type="button" class="tv-tab-btn ${state.activeTab === "autofill" ? "active" : ""}" data-tab="autofill" role="tab">
                <span>2. Security Questionnaire Auto-Filler</span>
                <span class="tv-tab-pill">64-Q Vault</span>
              </button>
            </div>
            ${tabContentHtml}
          </section>
        </div>
      </main>

      <section id="pricing-compare" class="tv-pricing-section no-print">
        ${renderPricingComparisonHtml(false)}
      </section>

      ${renderPartnerProgramHtml()}

      <footer class="tv-footer no-print">
        <div class="tv-footer-inner">
          <div>
            <strong>TrustVault</strong> · Zero-Backend Enterprise Security Trust Portal &amp; Auto-Filler · Support: <a href="mailto:${escHtml(CFG.SUPPORT_EMAIL || "bidliftco@gmail.com")}" style="color:#34d399;">${escHtml(CFG.SUPPORT_EMAIL || "bidliftco@gmail.com")}</a>
          </div>
          <div class="tv-footer-links">
            <a href="calculator.html">Deal-Velocity &amp; GRC Calculator</a>
            <a href="sig-lite-security-questionnaire-autofill.html">SIG-Lite Auto-Filler</a>
            <a href="vanta-safebase-alternative-trust-center.html">Vanta/SafeBase Alternative</a>
            <a href="ai-vendor-security-trust-portal-template.html">AI Trust Portal Template</a>
            <a href="${escHtml((CFG.CROSS_LINKS && CFG.CROSS_LINKS.BIDLIFT_URL) || "https://bidlift-5ias.onrender.com/")}" target="_blank" rel="noopener noreferrer">BidLift Proposals</a>
            <a href="${escHtml((CFG.CROSS_LINKS && CFG.CROSS_LINKS.SCOPELOCK_URL) || "https://scopelock-kgt9.onrender.com/")}" target="_blank" rel="noopener noreferrer">ScopeLock SOWs</a>
            <button type="button" class="btn btn-outline btn-xs" style="color:#e2e8f0;border-color:rgba(255,255,255,0.22);background:transparent;" data-action="open-legal-modal">Privacy &amp; 14-Day Refund</button>
          </div>
        </div>
      </footer>

      ${renderModalsHtml()}
    `;

    bindEvents();
    if (state.activeTab === "portal") {
      refreshWebsiteBadgeSnippet();
    }
  }

  function applyPreset(presetId) {
    state.portal = buildPortalFromPreset(presetId);
    savePortalState();
    refreshPortalDigest();
    if (state.qa.rows.length > 0 && state.qa.rawInput) {
      state.qa.rows = KB.matchSecurityQuestions(parseQuestionsText(state.qa.rawInput), getCompanyContext());
      saveQaState();
      refreshQaDigest();
    }
    render();
    showToast(`Loaded ${(KB.INDUSTRY_PRESETS[presetId] || {}).label || presetId} posture preset.`);
  }

  function bindCheckoutTrackActions(scopeEl) {
    const root = scopeEl || document;
    root.querySelectorAll("[data-action='checkout-track']").forEach((link) => {
      link.addEventListener("click", () => {
        const plan = link.getAttribute("data-plan") || "pro";
        ANALYTICS.track("pro_checkout_clicked", {
          plan,
          billing_cycle: state.billingCycle,
          preset_id: state.portal.presetId
        });
        showToast(`Opening ${plan.toUpperCase()} activation with promo ${CFG.PROMO_CODE || "FOUNDER30"}...`);
      });
    });
  }

  function bindReadinessActions(scopeEl) {
    const root = scopeEl || document;
    bindCheckoutTrackActions(root);
    root.querySelectorAll("[data-action='fix-missing-controls']").forEach((btn) => {
      btn.addEventListener("click", () => {
        handleFixMissingControls(btn.getAttribute("data-fix-target") || "brand");
      });
    });
  }

  function refreshLivePortalPreviewOnly() {
    const area = document.getElementById("portal-preview-area");
    if (area) {
      area.innerHTML = renderTrustPortalCardHtml(false);
      bindPortalPreviewActions(area);
    }
    const graderArea = document.getElementById("readiness-grader-area");
    if (graderArea) {
      graderArea.innerHTML = renderReadinessGraderHtml();
      bindReadinessActions(graderArea);
    }
    const badgePill = document.getElementById("website-badge-preview-pill");
    if (badgePill) {
      const label = state.proUnlocked
        ? `Verified Security Posture · ${state.portal.company || "Enterprise"}`
        : "Verified Security Posture · TrustVault";
      const spans = badgePill.querySelectorAll("span");
      if (spans.length >= 2) spans[1].textContent = label;
    }
    refreshPortalDigest();
    refreshWebsiteBadgeSnippet();
  }

  function bindPortalPreviewActions(scopeEl) {
    const root = scopeEl || document;
    root.querySelectorAll("[data-action='open-nda']").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.ndaModalOpen = true;
        render();
      });
    });
    root.querySelectorAll("[data-action='edit-pillar']").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.editingPillarId = btn.getAttribute("data-pillar") || "";
        refreshLivePortalPreviewOnly();
      });
    });
    root.querySelectorAll("[data-action='save-pillar']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const pid = btn.getAttribute("data-pillar");
        const ta = root.querySelector(`[data-pillar-edit="${pid}"]`);
        if (ta && pid) {
          state.portal.pillarSummaries[pid] = ta.value.trim();
          state.portal.updatedAt = Date.now();
          savePortalState();
        }
        state.editingPillarId = "";
        refreshLivePortalPreviewOnly();
        showToast("Control pillar updated.");
      });
    });
  }

  function bindEvents() {
    // Preset pills & select
    document.querySelectorAll("[data-preset-pick]").forEach((btn) => {
      btn.addEventListener("click", () => applyPreset(btn.getAttribute("data-preset-pick")));
    });
    const presetSel = document.getElementById("preset-select");
    if (presetSel) {
      presetSel.addEventListener("change", () => applyPreset(presetSel.value));
    }

    // Tabs
    document.querySelectorAll("[data-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeTab = btn.getAttribute("data-tab") || "portal";
        render();
      });
    });

    // Live portal field editing without breaking cursor focus
    document.querySelectorAll("[data-portal-field]").forEach((el) => {
      el.addEventListener("input", () => {
        const key = el.getAttribute("data-portal-field");
        state.portal[key] = el.value;
        state.portal.updatedAt = Date.now();
        savePortalState();
        refreshLivePortalPreviewOnly();
      });
    });

    // Logo upload & removal
    const logoInput = document.getElementById("inp-logo-file");
    if (logoInput) {
      logoInput.addEventListener("change", () => {
        const file = logoInput.files && logoInput.files[0];
        if (!file) return;
        CODEC.downscaleLogoFile(file)
          .then((dataUrl) => {
            state.portal.logoData = dataUrl;
            state.portal.updatedAt = Date.now();
            savePortalState();
            refreshPortalDigest();
            render();
            showToast("Logo optimized & embedded locally.");
          })
          .catch((err) => showToast(err.message || "Unable to load logo."));
      });
    }
    const rmLogoBtn = document.querySelector("[data-action='remove-logo']");
    if (rmLogoBtn) {
      rmLogoBtn.addEventListener("click", () => {
        state.portal.logoData = "";
        savePortalState();
        refreshPortalDigest();
        render();
      });
    }

    // White-label checkbox
    const wlChk = document.getElementById("chk-whitelabel");
    if (wlChk) {
      wlChk.addEventListener("change", () => {
        if (wlChk.checked && !state.proUnlocked) {
          showToast(`White-label mode previewed. Activate Pro (${CFG.PROMO_CODE}) to publish white-label links.`);
        }
        state.portal.whiteLabel = wlChk.checked;
        savePortalState();
        refreshLivePortalPreviewOnly();
      });
    }

    // Badge toggles
    document.querySelectorAll("[data-badge-toggle]").forEach((chk) => {
      chk.addEventListener("change", () => {
        const badge = chk.getAttribute("data-badge-toggle");
        const set = new Set(state.portal.badges || []);
        if (chk.checked) set.add(badge);
        else set.delete(badge);
        state.portal.badges = Array.from(set);
        savePortalState();
        refreshPortalDigest();
        render();
      });
    });

    // Subprocessors editing
    document.querySelectorAll("[data-subproc-idx]").forEach((inp) => {
      inp.addEventListener("input", () => {
        const idx = Number(inp.getAttribute("data-subproc-idx"));
        const key = inp.getAttribute("data-subproc-key");
        if (state.portal.subprocessors[idx]) {
          state.portal.subprocessors[idx][key] = inp.value;
          savePortalState();
          refreshLivePortalPreviewOnly();
        }
      });
    });
    const addSpBtn = document.querySelector("[data-action='add-subproc']");
    if (addSpBtn) {
      addSpBtn.addEventListener("click", () => {
        state.portal.subprocessors.push({
          name: "New Vendor",
          purpose: "Cloud Telemetry / Support",
          location: "United States",
          dpaStatus: "DPA Executed"
        });
        savePortalState();
        refreshPortalDigest();
        render();
      });
    }
    document.querySelectorAll("[data-action='remove-subproc']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-idx"));
        state.portal.subprocessors.splice(idx, 1);
        savePortalState();
        refreshPortalDigest();
        render();
      });
    });

    // Portal toolbar actions
    const copyPortalBtn = document.querySelector("[data-action='copy-portal-link']");
    if (copyPortalBtn) {
      copyPortalBtn.addEventListener("click", async () => {
        const url = await buildShareableUrl(false);
        ANALYTICS.track("trust_link_created", {
          preset_id: state.portal.presetId,
          share_mode: "url_hash",
          is_embed: false
        });
        copyText(url, `Copied compressed Trust Portal link (${url.length} chars). Zero server PII!`);
      });
    }
    const copyEmbedBtn = document.querySelector("[data-action='copy-embed-code']");
    if (copyEmbedBtn) {
      copyEmbedBtn.addEventListener("click", async () => {
        const url = await buildShareableUrl(true);
        const snippet = `<iframe src="${url}" title="${escHtml(state.portal.company)} Security Trust Center" width="100%" height="820" style="border:1px solid #dbe3ee;border-radius:14px;"></iframe>`;
        ANALYTICS.track("trust_link_created", {
          preset_id: state.portal.presetId,
          share_mode: "iframe_embed",
          is_embed: true
        });
        copyText(snippet, "Copied iframe embed snippet for trust.yourdomain.com!");
      });
    }
    const copyBadgeBtn = document.querySelector("[data-action='copy-website-badge']");
    if (copyBadgeBtn) {
      copyBadgeBtn.addEventListener("click", async () => {
        const url = await buildShareableUrl(false);
        state.cachedPortalUrl = url;
        const snippet = buildWebsiteBadgeHtml(url);
        const box = document.getElementById("badge-html-code");
        if (box) box.value = snippet;
        ANALYTICS.track("badge_copied", { preset_id: state.portal.presetId });
        copyText(snippet, "Copied Verified Security Posture website badge HTML!");
      });
    }

    document.querySelectorAll("[data-action='print-pdf']").forEach((btn) => {
      btn.addEventListener("click", () => window.print());
    });

    document.querySelectorAll("[data-action='open-buyer-view']").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.viewMode = "buyer";
        ANALYTICS.track("client_demo_opened", {
          preset_id: state.portal.presetId,
          demo_mode: true
        });
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    const exitBuyerBtn = document.querySelector("[data-action='exit-buyer']");
    if (exitBuyerBtn) {
      exitBuyerBtn.addEventListener("click", () => {
        state.viewMode = "studio";
        state.isEmbed = false;
        render();
      });
    }

    // Buyer search input
    const buyerSearch = document.getElementById("buyer-control-search");
    if (buyerSearch) {
      buyerSearch.addEventListener("input", () => {
        const pos = buyerSearch.selectionStart;
        state.buyerSearchQuery = buyerSearch.value;
        render();
        const nextEl = document.getElementById("buyer-control-search");
        if (nextEl) {
          nextEl.focus();
          try {
            nextEl.setSelectionRange(pos, pos);
          } catch (e) {}
        }
      });
    }

    // Questionnaire Auto-Filler actions
    const loadSigBtn = document.querySelector("[data-action='load-sig-sample']");
    if (loadSigBtn) {
      loadSigBtn.addEventListener("click", () => {
        const sampleText = (KB.SAMPLE_SIG_LITE || []).join("\n");
        runAutoFill(sampleText);
      });
    }
    const runAfBtn = document.querySelector("[data-action='run-autofill']");
    if (runAfBtn) {
      runAfBtn.addEventListener("click", () => {
        const ta = document.getElementById("qa-raw-input");
        runAutoFill(ta ? ta.value : state.qa.rawInput);
      });
    }
    const clearQaBtn = document.querySelector("[data-action='clear-qa']");
    if (clearQaBtn) {
      clearQaBtn.addEventListener("click", () => {
        state.qa = { rawInput: "", filterConfidence: "all", rows: [] };
        saveQaState();
        render();
      });
    }
    const qaRawInput = document.getElementById("qa-raw-input");
    if (qaRawInput) {
      qaRawInput.addEventListener("input", () => {
        state.qa.rawInput = qaRawInput.value;
        saveQaState();
      });
    }
    const csvUpload = document.getElementById("qa-csv-upload");
    if (csvUpload) {
      csvUpload.addEventListener("change", () => {
        const file = csvUpload.files && csvUpload.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          const qs = parseCsvQuestions(reader.result);
          if (qs.length === 0) {
            showToast("No valid security questions found in uploaded file.");
            return;
          }
          runAutoFill(qs.join("\n"));
        };
        reader.readAsText(file);
      });
    }

    document.querySelectorAll("[data-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.qa.filterConfidence = btn.getAttribute("data-filter") || "all";
        render();
      });
    });

    document.querySelectorAll("[data-qa-answer]").forEach((ta) => {
      ta.addEventListener("input", () => {
        const qIndex = Number(ta.getAttribute("data-qa-answer"));
        const target = state.qa.rows.find((r) => r.index === qIndex);
        if (target) {
          target.suggestedAnswer = ta.value;
          saveQaState();
          refreshQaDigest();
        }
      });
    });

    const exportCsvBtn = document.querySelector("[data-action='export-csv']");
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener("click", exportCsv);
    }

    // Pricing & modals
    document.querySelectorAll("[data-billing]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.billingCycle = btn.getAttribute("data-billing") || "annual";
        render();
      });
    });

    document.querySelectorAll("[data-action='open-pro-modal']").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.proModalOpen = true;
        state.proFocusTier = "pro";
        render();
      });
    });
    document.querySelectorAll("[data-action='open-dfy-modal']").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.proModalOpen = true;
        state.proFocusTier = "dfy";
        render();
      });
    });
    document.querySelectorAll("[data-action='start-free']").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.proModalOpen = false;
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
        showToast("Free Forever ($0) workspace ready — zero credit card required.");
      });
    });

    bindCheckoutTrackActions(document);
    document.querySelectorAll("[data-action='fix-missing-controls']").forEach((btn) => {
      btn.addEventListener("click", () => {
        handleFixMissingControls(btn.getAttribute("data-fix-target") || "brand");
      });
    });

    document.querySelectorAll("[data-action='open-legal-modal']").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.legalModalOpen = true;
        render();
      });
    });

    const actBtn = document.querySelector("[data-action='activate-license']");
    if (actBtn) {
      actBtn.addEventListener("click", () => {
        const inp = document.getElementById("pro-license-input");
        const val = (inp ? inp.value : "").trim().toUpperCase();
        const prefix = CFG.LICENSE_PREFIX || "TV-PRO-";
        if (verifyLicenseKey(val)) {
          activateProState(val, "TrustVault Pro Enterprise");
          ANALYTICS.track("pro_unlocked", { method: "manual" });
          state.proModalOpen = false;
          render();
          showToast("TrustVault Pro Enterprise unlocked!");
        } else {
          showToast(`Enter a valid signed key (e.g. ${prefix}XXXXXX-XXXX) or email ${CFG.SUPPORT_EMAIL}.`);
        }
      });
    }

    const deactBtn = document.querySelector("[data-action='deactivate-pro']");
    if (deactBtn) {
      deactBtn.addEventListener("click", () => {
        try {
          localStorage.removeItem(STORAGE_KEYS.PRO_LICENSE);
        } catch (e) {}
        state.proUnlocked = false;
        state.proPlanLabel = "";
        if (state.portal) {
          state.portal.whiteLabel = false;
          savePortalState();
        }
        state.proModalOpen = false;
        render();
        showToast("Switched back to Free Forever ($0) plan.");
      });
    }

    document.querySelectorAll("[data-action='partner-inquiry']").forEach((link) => {
      link.addEventListener("click", () => {
        ANALYTICS.track("partner_cta_clicked", { source: "pricing_strip" });
      });
    });

    document.querySelectorAll("[data-action='pilot-inquiry']").forEach((link) => {
      link.addEventListener("click", () => {
        ANALYTICS.track("pilot_cta_clicked", { source: "pricing_tier" });
      });
    });

    document.querySelectorAll("[data-action='close-modals']").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.proModalOpen = false;
        state.ndaModalOpen = false;
        state.legalModalOpen = false;
        render();
      });
    });

    document.querySelectorAll(".tv-modal-backdrop").forEach((backdrop) => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) {
          state.proModalOpen = false;
          state.ndaModalOpen = false;
          state.legalModalOpen = false;
          render();
        }
      });
    });

    const ndaForm = document.getElementById("nda-request-form");
    if (ndaForm) {
      ndaForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const buyerCo = (document.getElementById("nda-buyer-company") || {}).value || "";
        const buyerEmail = (document.getElementById("nda-buyer-email") || {}).value || "";
        const buyerNote = (document.getElementById("nda-buyer-note") || {}).value || "";
        const checked = Array.from(ndaForm.querySelectorAll("input[name='nda_item']:checked")).map((i) => i.value);
        const subject = encodeURIComponent(`Security Packet & NDA Request from ${buyerCo} — ${state.portal.company}`);
        const body = encodeURIComponent(
          `Hello ${state.portal.company} Security Team,\n\n` +
            `We reviewed your Trust Portal (${state.portal.domain}, SHA-256 Digest: ${state.portalDigest}).\n\n` +
            `Requester: ${buyerCo} (${buyerEmail})\n` +
            `Requested Artifacts:\n- ${checked.join("\n- ")}\n\n` +
            (buyerNote ? `Notes: ${buyerNote}\n\n` : "") +
            `Thank you!`
        );
        window.location.href = `mailto:${state.portal.securityEmail}?subject=${subject}&body=${body}`;
        state.ndaModalOpen = false;
        render();
        showToast(`Prepared Security Packet request to ${state.portal.securityEmail}.`);
      });
    }

    bindPortalPreviewActions(document.getElementById("portal-preview-area") || document);
  }

  async function init() {
    loadProState();

    const params = new URLSearchParams(window.location.search || "");
    const hash = window.location.hash || "";

    const unlockParam = (params.get("unlock") || "").trim();
    const planParam = (params.get("plan") || "").trim().toLowerCase();
    let unlockedToast = "";
    if (unlockParam && verifyLicenseKey(unlockParam)) {
      const tvPlanMap = {
        annual: "TrustVault Pro Enterprise (Annual)",
        monthly: "TrustVault Pro Enterprise (Monthly)",
        scale_annual: "TrustVault Scale (Annual)",
        scale_monthly: "TrustVault Scale (Monthly)",
        dfy: "TrustVault 48-Hr DFY Concierge License"
      };
      const label = tvPlanMap[planParam] || "TrustVault Pro Enterprise";
      activateProState(unlockParam.toUpperCase(), label);
      unlockedToast = `${label} activated automatically! Unlimited CSV exports & white-label unlocked.`;
      ANALYTICS.track("pro_unlocked", { method: "redirect", plan: planParam || "pro" });
      try {
        params.delete("unlock");
        params.delete("plan");
        params.delete("checkout_id");
        const rem = params.toString();
        const cleanUrl = `${window.location.pathname}${rem ? "?" + rem : ""}${hash}`;
        window.history.replaceState({}, "", cleanUrl);
      } catch (e) {}
    }

    if (params.get("embed") === "1") {
      state.isEmbed = true;
      state.viewMode = "buyer";
    }

    if (hash.startsWith("#t=")) {
      const decoded = await CODEC.decodePortal(hash.slice(3));
      if (decoded) {
        state.portal = decoded;
        state.viewMode = "buyer";
      }
    }

    if (!state.portal) {
      try {
        const savedPortal = localStorage.getItem(STORAGE_KEYS.PORTAL);
        if (savedPortal) state.portal = JSON.parse(savedPortal);
      } catch (e) {}
    }

    const qPreset = (params.get("preset") || "").trim().toLowerCase();
    const qBiz = (params.get("biz") || params.get("company") || "").trim();
    const qDomain = (params.get("domain") || "").trim();
    const qDemo = params.get("demo") === "1";

    if (!state.portal || (qPreset && KB.INDUSTRY_PRESETS[qPreset])) {
      state.portal = buildPortalFromPreset(KB.INDUSTRY_PRESETS[qPreset] ? qPreset : "saas", {
        company: qBiz || undefined,
        domain: qDomain || undefined
      });
    } else if (qBiz || qDomain) {
      if (qBiz) state.portal.company = qBiz.slice(0, 120);
      if (qDomain) {
        const clean = qDomain.replace(/^https?:\/\//i, "").split("/")[0];
        state.portal.domain = clean;
        state.portal.securityEmail = "security@" + clean;
      }
    }

    if (qDemo) {
      state.viewMode = "buyer";
    }

    try {
      const savedQa = localStorage.getItem(STORAGE_KEYS.QUESTIONNAIRE);
      if (savedQa) {
        const parsed = JSON.parse(savedQa);
        if (parsed && Array.isArray(parsed.rows)) state.qa = parsed;
      }
    } catch (e) {}

    refreshPortalDigest();
    refreshQaDigest();
    render();
    if (unlockedToast) {
      showToast(unlockedToast);
    }

    ANALYTICS.track("studio_loaded", {
      preset_id: state.portal.presetId,
      demo_mode: state.viewMode === "buyer",
      is_embed: state.isEmbed
    });

    if (state.viewMode === "buyer") {
      ANALYTICS.track("client_demo_opened", {
        preset_id: state.portal.presetId,
        demo_mode: true,
        is_embed: state.isEmbed
      });
    }

    window.addEventListener("hashchange", async () => {
      const h = window.location.hash || "";
      if (h.startsWith("#t=")) {
        const dec = await CODEC.decodePortal(h.slice(3));
        if (dec) {
          state.portal = dec;
          state.viewMode = "buyer";
          refreshPortalDigest();
          render();
        }
      }
    });
  }

  init();
})();
