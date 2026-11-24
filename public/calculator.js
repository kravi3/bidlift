/**
 * BidLift Interactive Good / Better / Best Pricing & Profit Lift Calculator
 * Zero inline JS (strict CSP script-src 'self' compatible).
 */
(function () {
  "use strict";

  const TEMPLATES = window.BIDLIFT_TEMPLATES || {};
  const ANALYTICS = window.BidLiftAnalytics;

  const SPREADS = {
    conservative: { mid: 1.20, top: 1.45, upsellRate: 0.06, label: "Conservative (+20% / +45%)" },
    recommended: { mid: 1.28, top: 1.62, upsellRate: 0.08, label: "Recommended (+28% / +62%)" },
    premium: { mid: 1.35, top: 1.80, upsellRate: 0.11, label: "Premium Anchored (+35% / +80%)" }
  };

  let trackedOnce = false;
  let lastShareText = "";

  function fmt(num) {
    const val = Math.round(Number(num) || 0);
    return "$" + val.toLocaleString("en-US");
  }

  function calcMonthly(principal, months, apr) {
    const amt = Math.max(0, Number(principal) || 0);
    if (amt <= 0) return 0;
    const r = (Number(apr) || 9.99) / 100 / 12;
    const n = Math.max(3, Number(months) || 60);
    const f = Math.pow(1 + r, n);
    return Math.ceil((amt * r * f) / (f - 1));
  }

  function updateCalculator() {
    const tradeEl = document.getElementById("calc-trade");
    const flatEl = document.getElementById("calc-flat");
    const quotesEl = document.getElementById("calc-quotes");
    const closeEl = document.getElementById("calc-close");
    const spreadEl = document.getElementById("calc-spread");
    if (!tradeEl || !flatEl || !quotesEl || !closeEl || !spreadEl) return;

    const trade = tradeEl.value || "hvac";
    const flat = Math.min(500000, Math.max(100, Number(flatEl.value) || 4000));
    const quotesPerMo = Math.min(500, Math.max(1, Number(quotesEl.value) || 12));
    const closePct = Math.min(95, Math.max(5, Number(closeEl.value) || 35));
    const spread = SPREADS[spreadEl.value] || SPREADS.recommended;

    const goodPrice = Math.round(flat);
    const betterPrice = Math.round((flat * spread.mid) / 10) * 10;
    const bestPrice = Math.round((flat * spread.top) / 10) * 10;

    // Empirical mix: ~25% choose Good, ~55% choose Better, ~20% choose Best + toggle upsells
    const weightedAvgPackage = goodPrice * 0.25 + betterPrice * 0.55 + bestPrice * 0.20;
    const upsellAvg = weightedAvgPackage * spread.upsellRate;
    const projectedAvgDeal = Math.round(weightedAvgPackage + upsellAvg);
    const perDealLift = Math.max(0, projectedAvgDeal - flat);
    const liftPct = Math.round((perDealLift / flat) * 100);

    const closedDealsPerMo = quotesPerMo * (closePct / 100);
    const monthlyLift = Math.round(closedDealsPerMo * perDealLift);
    const annualLift = monthlyLift * 12;
    const proRoi = Math.max(1, Math.round(annualLift / 99));

    const tplObj = TEMPLATES[trade] || {};
    const tplLabel = tplObj.label || trade.toUpperCase();
    const finMonths = tplObj.financingMonths || 60;

    const elAvg = document.getElementById("res-avg-deal");
    const elLiftPct = document.getElementById("res-lift-pct");
    const elMonth = document.getElementById("res-month-lift");
    const elYear = document.getElementById("res-year-lift");
    const elRoi = document.getElementById("res-roi-note");
    const elGood = document.getElementById("res-tier-good");
    const elBetter = document.getElementById("res-tier-better");
    const elBest = document.getElementById("res-tier-best");
    const elGoodMo = document.getElementById("res-good-mo");
    const elBetterMo = document.getElementById("res-better-mo");
    const elBestMo = document.getElementById("res-best-mo");
    const studioBtn = document.getElementById("calc-launch-studio-btn");
    const demoBtn = document.getElementById("calc-demo-btn");

    if (elAvg) elAvg.textContent = fmt(projectedAvgDeal);
    if (elLiftPct) elLiftPct.textContent = `+${fmt(perDealLift)} / deal (+${liftPct}%)`;
    if (elMonth) elMonth.textContent = `+${fmt(monthlyLift)} / mo`;
    if (elYear) elYear.textContent = `+${fmt(annualLift)} / yr`;
    if (elRoi) {
      elRoi.textContent = `Based on ~${closedDealsPerMo.toFixed(1)} won jobs/mo (25% Good / 55% Better / 20% Best). Pays back a $99/yr BidLift Pro plan ~${proRoi}x over.`;
    }

    if (elGood) elGood.textContent = fmt(goodPrice);
    if (elBetter) elBetter.textContent = fmt(betterPrice);
    if (elBest) elBest.textContent = fmt(bestPrice);
    if (elGoodMo) elGoodMo.textContent = `~${fmt(calcMonthly(goodPrice, finMonths, 9.99))}/mo (${finMonths}m)`;
    if (elBetterMo) elBetterMo.textContent = `~${fmt(calcMonthly(betterPrice, finMonths, 9.99))}/mo (${finMonths}m)`;
    if (elBestMo) elBestMo.textContent = `~${fmt(calcMonthly(bestPrice, finMonths, 9.99))}/mo (${finMonths}m)`;

    if (studioBtn) {
      studioBtn.href = `../?tpl=${encodeURIComponent(trade)}&flat=${encodeURIComponent(goodPrice)}&ref=seo_calc`;
      studioBtn.textContent = `Generate My 3-Tier ${tplLabel} Quote Free →`;
    }
    if (demoBtn) {
      demoBtn.href = `../?tpl=${encodeURIComponent(trade)}&flat=${encodeURIComponent(goodPrice)}&demo=1&ref=seo_calc`;
    }

    lastShareText = `Switching from ${fmt(goodPrice)} flat ${tplLabel} bids to Good/Better/Best adds ~+${fmt(perDealLift)}/job (+${fmt(annualLift)}/yr) — run your own numbers free: https://bidlift-5ias.onrender.com/templates/good-better-best-pricing-calculator.html?ref=calc_share`;

    if (!trackedOnce && ANALYTICS && typeof ANALYTICS.track === "function") {
      trackedOnce = true;
      ANALYTICS.track("calculator_used", { template_id: trade, entry_source: "seo_calc" });
    }
  }

  function copyShareSummary(btn) {
    if (!lastShareText) return;
    const prevLabel = btn.textContent;
    const markCopied = () => {
      btn.textContent = "✓ Result Copied for Sharing!";
      setTimeout(() => { btn.textContent = prevLabel; }, 2200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(lastShareText).then(markCopied).catch(() => {
        fallbackCopy(lastShareText, markCopied);
      });
      return;
    }
    fallbackCopy(lastShareText, markCopied);
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
    ["calc-trade", "calc-flat", "calc-quotes", "calc-close", "calc-spread"].forEach((id) => {
      const node = document.getElementById(id);
      if (node) {
        node.addEventListener("input", updateCalculator);
        node.addEventListener("change", updateCalculator);
      }
    });

    document.querySelectorAll("[data-calc-preset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const trade = btn.dataset.presetTrade || "hvac";
        const flat = Number(btn.dataset.calcPreset) || 4000;
        const tradeEl = document.getElementById("calc-trade");
        const flatEl = document.getElementById("calc-flat");
        if (tradeEl) tradeEl.value = trade;
        if (flatEl) flatEl.value = String(flat);
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
