/**
 * TrustVault Enterprise Deal-Velocity & GRC Savings Calculator
 * Zero inline JS (strict CSP script-src 'self' compatible).
 */
(function () {
  "use strict";

  const ANALYTICS = window.TrustVaultAnalytics || { track: function () {} };
  const TRUSTVAULT_ANNUAL = 1190;
  const TRUSTVAULT_FOUNDER30 = 833;
  let tracked = false;

  function fmt(num) {
    return "$" + Math.round(Number(num) || 0).toLocaleString("en-US");
  }

  function updateCalculator() {
    const presetEl = document.getElementById("calc-preset");
    const bizEl = document.getElementById("calc-biz");
    const acvEl = document.getElementById("calc-acv");
    const qYearEl = document.getElementById("calc-q-year");
    const hoursEl = document.getElementById("calc-hours");
    const rateEl = document.getElementById("calc-rate");
    const delayEl = document.getElementById("calc-delay");
    const legacyEl = document.getElementById("calc-legacy-cost");
    if (!presetEl || !acvEl || !qYearEl || !hoursEl || !rateEl || !delayEl || !legacyEl) return;

    const preset = presetEl.value || "saas";
    const biz = (bizEl && bizEl.value.trim()) || "Acme Cloud Systems";
    const acv = Math.min(2000000, Math.max(1000, Number(acvEl.value) || 36000));
    const qPerYear = Math.min(500, Math.max(1, Number(qYearEl.value) || 18));
    const hrsPerQ = Math.min(100, Math.max(1, Number(hoursEl.value) || 14));
    const engRate = Math.min(1000, Math.max(25, Number(rateEl.value) || 175));
    const delayDays = Math.min(180, Math.max(1, Number(delayEl.value) || 28));
    const legacyCost = Math.max(1190, Number(legacyEl.value) || 15000);

    // 1. Direct GRC software savings vs legacy GRC ($15,000/yr typical)
    const grcSavings = Math.max(0, legacyCost - TRUSTVAULT_ANNUAL);

    // 2. Engineering hours saved (85% automation across questionnaires)
    const hoursSaved = qPerYear * hrsPerQ * 0.85;
    const laborSavings = Math.round(hoursSaved * engRate);

    // 3. Accelerated enterprise pipeline ARR:
    // Cutting security review delay by ~65% pulls forward deal closure & prevents late-quarter slip.
    // Conservative model: ~35% win rate on security-reviewed deals, pulling forward (delayDays * 0.65 / 365) of annual won ARR.
    const wonArr = qPerYear * 0.35 * acv;
    const daysSaved = Math.max(1, Math.round(delayDays * 0.65));
    const accelArr = Math.round(wonArr * (daysSaved / 365));

    const totalImpact = grcSavings + laborSavings + accelArr;
    const roiMultiple = Math.max(1, Math.round(totalImpact / TRUSTVAULT_ANNUAL));
    const newDelay = Math.max(2, delayDays - daysSaved);

    const setEl = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    setEl("res-total-impact", `${fmt(totalImpact)} / yr`);
    setEl("res-roi-sub", `${roiMultiple}x return on TrustVault Pro Annual (${fmt(TRUSTVAULT_ANNUAL)}/yr · or ${fmt(TRUSTVAULT_FOUNDER30)}/yr with FOUNDER30)`);
    setEl("res-grc-savings", `${fmt(grcSavings)} / yr`);
    setEl("res-grc-note", `$1,190/yr TrustVault vs ${fmt(legacyCost)}/yr legacy GRC`);
    setEl("res-hours-saved", `${hoursSaved.toFixed(1)} hrs / yr`);
    setEl("res-labor-val", `${fmt(laborSavings)}/yr engineering capacity unlocked`);
    setEl("res-accel-arr", `${fmt(accelArr)} / yr`);
    setEl("res-delay-note", `Cuts ${delayDays}-day security bottleneck to ~${newDelay} days`);
    setEl("res-payback", hoursSaved >= 7 ? "1st Q&A" : "1 Deal");

    const launchUrl = `./?preset=${encodeURIComponent(preset)}&biz=${encodeURIComponent(biz)}&ref=tv_calc`;
    const demoUrl = `./?preset=${encodeURIComponent(preset)}&biz=${encodeURIComponent(biz)}&demo=1&ref=tv_calc`;

    const studioBtn = document.getElementById("calc-launch-studio");
    const demoBtn = document.getElementById("calc-launch-demo");
    const topBtn = document.getElementById("calc-top-launch");
    if (studioBtn) studioBtn.href = launchUrl;
    if (demoBtn) demoBtn.href = demoUrl;
    if (topBtn) topBtn.href = launchUrl;

    if (!tracked) {
      tracked = true;
      ANALYTICS.track("studio_loaded", {
        preset_id: preset,
        calc_acv: acv,
        entry_source: "tv_calc"
      });
    }
  }

  ["calc-preset", "calc-biz", "calc-acv", "calc-q-year", "calc-hours", "calc-rate", "calc-delay", "calc-legacy-cost"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", updateCalculator);
      el.addEventListener("change", updateCalculator);
    }
  });

  updateCalculator();
})();
