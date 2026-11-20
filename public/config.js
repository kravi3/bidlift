/**
 * BidLift Configuration & Monetization Settings
 * ---------------------------------------------
 * Update CHECKOUT_PRO_MONTHLY_LINK and CHECKOUT_PRO_ANNUAL_LINK with your live
 * Lemon Squeezy checkout URLs (e.g., https://yourstore.lemonsqueezy.com/buy/...)
 * or Stripe Payment Links.
 */
window.BIDLIFT_CONFIG = {
  APP_NAME: "BidLift",
  TAGLINE: "Interactive Good / Better / Best Proposals That Boost Revenue",
  PRO_PRICE_MONTHLY: "$19/mo",
  PRO_PRICE_ANNUAL: "$99/yr",
  CHECKOUT_PRO_MONTHLY_LINK: "", // e.g. "https://bidlift.lemonsqueezy.com/buy/..."
  CHECKOUT_PRO_ANNUAL_LINK: "",  // e.g. "https://bidlift.lemonsqueezy.com/buy/..."
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
