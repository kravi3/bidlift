/**
 * BidLift Configuration & Monetization Settings
 * ---------------------------------------------
 * Update STRIPE_PRO_MONTHLY_LINK and STRIPE_LIFETIME_LINK with your live
 * Stripe Payment Links (from dashboard.stripe.com/payment-links) or Lemon Squeezy URLs.
 */
window.BIDLIFT_CONFIG = {
  APP_NAME: "BidLift",
  TAGLINE: "Interactive Good / Better / Best Proposals That Boost Deal Size",
  PRO_PRICE_MONTHLY: "$19/mo",
  PRO_PRICE_LIFETIME: "$49 once",
  STRIPE_PRO_MONTHLY_LINK: "", // e.g. "https://buy.stripe.com/your_monthly_link"
  STRIPE_LIFETIME_LINK: "",    // e.g. "https://buy.stripe.com/your_lifetime_link"
  SUPPORT_EMAIL: "hello@bidlift.app",
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
