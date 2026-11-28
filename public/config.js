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
  PRO_ADVANCED_PRICE_MONTHLY: "$39/mo",
  PRO_ADVANCED_PRICE_ANNUAL: "$249/yr",
  DFY_SETUP_PRICE: "$1,499",
  PROMO_CODE: "PH30",
  PROMO_DEADLINE_LABEL: "Launch Offer · 30% Off Thru Dec 7",
  CHECKOUT_PRO_MONTHLY_LINK: "https://buy.polar.sh/polar_cl_CmzuvzfKFA3NJsP5hBbWpQg1EwRRLmGfxaQuO0yifJp",
  CHECKOUT_PRO_ANNUAL_LINK: "https://buy.polar.sh/polar_cl_YUHqZm7ZgtUXy2DDTccTVquP3tKMIEQ8hvL4j3an9Lk",
  CHECKOUT_SUITE_MONTHLY_LINK: "https://buy.polar.sh/polar_cl_DRpXrTa6Futy9tmH6RK960bo0u2f1TV3Z1noS2VrQQb",
  CHECKOUT_SUITE_ANNUAL_LINK: "https://buy.polar.sh/polar_cl_yX5SEsSkbr2d2S1u5SbhLPuyF8N8A51b6tjp5249JZf",
  CHECKOUT_DFY_LINK: "https://buy.polar.sh/polar_cl_oY1oDFJUtStsdEjpo4vMoWbIyL5GD7bP2TzmL3PF2Ff",
  CROSS_LINKS: {
    SCOPELOCK_URL: "https://scopelock-kgt9.onrender.com/",
    TRUSTVAULT_URL: "https://trustvault-zdof.onrender.com/"
  },
  SUPPORT_EMAIL: "bidliftco@gmail.com",
  LICENSE_PREFIX: "BL-PRO-",
  SUPABASE: {
    URL: "",
    ANON_KEY: ""
  },
  CLOUD_SHORT_LINK_ENABLED: false,
  ANALYTICS: {
    PROVIDER: "posthog",
    POSTHOG_PROJECT_KEY: "phc_oLaVNBcBBDBxGZUSsgLdDbpbSoXSPikzyuMFZY6MoRGD",
    POSTHOG_HOST: "https://us.i.posthog.com"
  },
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
    HERO_COLLAPSED: "bidlift_hero_collapsed_v1",
    SERVICES_CATALOG: "bidlift_services_catalog_v1"
  }
};
