/**
 * BidLift Configuration & Monetization Settings
 * ---------------------------------------------
 * Live Polar.sh Merchant-of-Record Checkout Links ($0/month upfront,
 * automatic US/global sales tax & VAT compliance, Stripe Connect payouts).
 */
window.BIDLIFT_CONFIG = {
  APP_NAME: "BidLift",
  TAGLINE: "Interactive Good / Better / Best Proposals That Boost Revenue",
  PRO_PRICE_MONTHLY: "$19/mo",
  PRO_PRICE_ANNUAL: "$99/yr",
  CHECKOUT_PRO_MONTHLY_LINK: "https://buy.polar.sh/polar_cl_CmzuvzfKFA3NJsP5hBbWpQg1EwRRLmGfxaQuO0yifJp",
  CHECKOUT_PRO_ANNUAL_LINK: "https://buy.polar.sh/polar_cl_YUHqZm7ZgtUXy2DDTccTVquP3tKMIEQ8hvL4j3an9Lk",
  SUPPORT_EMAIL: "kravi3@hotmail.com",
  LICENSE_PREFIX: "BL-PRO-",
  CURRENCIES: {
    USD: { code: "USD", symbol: "$", label: "USD ($)" },
    EUR: { code: "EUR", symbol: "€", label: "EUR (€)" },
    GBP: { code: "GBP", symbol: "£", label: "GBP (£)" },
    CAD: { code: "CAD", symbol: "CA$", label: "CAD (CA$)" },
    AUD: { code: "AUD", symbol: "A$", label: "AUD (A$)" }
  },
  STORAGE_KEYS: {
    DRAFTS: "bidlift_drafts_v1",
    CURRENT: "bidlift_current_v1",
    THEME: "bidlift_theme_v1",
    PRO_LICENSE: "bidlift_pro_v1",
    HERO_COLLAPSED: "bidlift_hero_collapsed_v1"
  }
};
