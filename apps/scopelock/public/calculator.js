/**
 * ScopeLock Scope-Creep Margin Leak Calculator
 * Strict CSP compatible (zero inline JS).
 */
(function () {
  "use strict";

  const TEMPLATES = window.SCOPELOCK_TEMPLATES || {};
  const TELEMETRY = window.ScopeLockTelemetry;

  let trackedOnce = false;
  let lastShareText = "";

  function fmt(num) {
    const val = Math.round(Number(num) || 0);
    return "$" + val.toLocaleString("en-US");
  }

  function updateCalculator() {
    const tradeEl = document.getElementById("calc-trade");
    const origEl = document.getElementById("calc-orig");
    const jobsEl = document.getElementById("calc-jobs");
    const leakEl = document.getElementById("calc-leak-pct");
    const marginEl = document.getElementById("calc-margin");
    const recEl = document.getElementById("calc-recovery");
    if (!tradeEl || !origEl || !jobsEl || !leakEl || !marginEl || !recEl) return;

    const trade = tradeEl.value || "roofing_co";
    const orig = Math.min(1000000, Math.max(250, Number(origEl.value) || 14800));
    const jobsPerMo = Math.min(500, Math.max(1, Number(jobsEl.value) || 6));
    const leakPct = Math.min(60, Math.max(1, Number(leakEl.value) || 12));
    const marginPct = Math.min(90, Math.max(10, Number(marginEl.value) || 42));
    const recoveryPct = Math.min(98, Math.max(20, Number(recEl.value) || 80));

    const coDelta = Math.max(50, Math.round((orig * (leakPct / 100)) / 10) * 10);
    const annualUnbilledRev = Math.round(coDelta * jobsPerMo * 12);
    const annualMarginLeaked = Math.round(annualUnbilledRev * (marginPct / 100));
    const recoverableNetProfit = Math.round(annualMarginLeaked * (recoveryPct / 100));
    const monthlyProfitRecovered = Math.round(recoverableNetProfit / 12);
    const proRoiMultiple = Math.max(1, Math.round(recoverableNetProfit / 179));

    const tplObj = TEMPLATES[trade] || {};
    const tplLabel = tplObj.shortLabel || tplObj.label || trade;

    const setTxt = (id, text) => {
      const node = document.getElementById(id);
      if (node) node.textContent = text;
    };

    setTxt("res-unbilled-rev", `${fmt(annualUnbilledRev)} / yr`);
    setTxt("res-margin-leaked", `${fmt(annualMarginLeaked)} / yr`);
    setTxt("res-recoverable-profit", `+${fmt(recoverableNetProfit)} / yr`);
    setTxt("res-roi-multiple", `${proRoiMultiple.toLocaleString("en-US")}x ROI`);
    setTxt("res-co-delta", fmt(coDelta));
    setTxt("res-monthly-profit", `+${fmt(monthlyProfitRecovered)} / mo`);
    setTxt(
      "res-roi-note",
      `Across ${jobsPerMo} active jobs/mo at ${fmt(orig)} avg contract, locking ${recoveryPct}% of ${leakPct}% scope creep saves +${fmt(recoverableNetProfit)}/yr in net margin — paying back ScopeLock Pro ($179/yr) ${proRoiMultiple}x over.`
    );

    const studioBtn = document.getElementById("calc-launch-studio-btn");
    const demoBtn = document.getElementById("calc-demo-btn");
    const query = `tpl=${encodeURIComponent(trade)}&orig=${encodeURIComponent(orig)}&delta=${encodeURIComponent(coDelta)}&ref=seo_calc`;
    if (studioBtn) {
      studioBtn.href = `./?${query}`;
      studioBtn.textContent = `Launch ${tplLabel} (${fmt(coDelta)}) in Studio →`;
    }
    if (demoBtn) {
      demoBtn.href = `./?${query}&demo=1`;
    }

    lastShareText = `Our ${tplLabel} Scope-Creep Diagnostic: ${leakPct}% unbilled scope creep on ${fmt(orig)} jobs leaks ~${fmt(annualMarginLeaked)}/yr in margin. Capturing ${recoveryPct}% recovers +${fmt(recoverableNetProfit)}/yr (${proRoiMultiple}x Pro ROI): https://scopelock-kgt9.onrender.com/calculator.html?ref=calc_share`;

    if (!trackedOnce && TELEMETRY && typeof TELEMETRY.track === "function") {
      trackedOnce = true;
      TELEMETRY.track("calculator_used", { template_id: trade, entry_source: "seo_calc" });
    }
  }

  function copyShareSummary(btn) {
    if (!lastShareText) return;
    const prev = btn.textContent;
    const done = () => {
      btn.textContent = "✓ Copied Shareable Result!";
      setTimeout(() => {
        btn.textContent = prev;
      }, 2200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(lastShareText).then(done).catch(() => fallbackCopy(lastShareText, done));
      return;
    }
    fallbackCopy(lastShareText, done);
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

  document.addEventListener("DOMContentLoaded", () => {
    ["calc-trade", "calc-orig", "calc-jobs", "calc-leak-pct", "calc-margin", "calc-recovery"].forEach((id) => {
      const node = document.getElementById(id);
      if (node) {
        node.addEventListener("input", updateCalculator);
        node.addEventListener("change", updateCalculator);
      }
    });

    document.querySelectorAll("[data-calc-preset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const orig = Number(btn.dataset.calcPreset) || 14800;
        const trade = btn.dataset.presetTrade || "roofing_co";
        const leak = Number(btn.dataset.presetLeak) || 12;
        const tradeEl = document.getElementById("calc-trade");
        const origEl = document.getElementById("calc-orig");
        const leakEl = document.getElementById("calc-leak-pct");
        if (tradeEl) tradeEl.value = trade;
        if (origEl) origEl.value = String(orig);
        if (leakEl) leakEl.value = String(leak);
        updateCalculator();
      });
    });

    const copyBtn = document.getElementById("calc-copy-result-btn");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => copyShareSummary(copyBtn));
    }

    updateCalculator();
  });
})();
