# BidLift Multi-Channel Launch & Revenue Playbook (`\$0` Free Distribution)

> **Why expand beyond Product Hunt today?** Product Hunt brings makers, founders, and agencies — great for Day-1 links and backlinks, **not** where HVAC technicians, roofers, or local remodelers search for quoting software. Combining **High-Intent Buyer Comparisons** + **Indie/Agency Directories** + **Direct Contractor Outreach & Search** unlocks durable, compounding conversion.

---

## 1. Where Else to Launch (Prioritized by Actual Buyer Intent & `\$0` Cost)

### Tier 1 — High-Intent Buyer Comparison Directories (Highest Ongoing B2B Conversion)
Home-service owners and agencies searching *"Jobber alternative"*, *"PandaDoc alternative"*, or *"proposal software for contractors"* land on these pages daily:

| Platform | Cost | Listing Focus & Tracking URL | Target Angle |
| :--- | :--- | :--- | :--- |
| **AlternativeTo** (`alternativeto.net`) | `\$0` | Submit BidLift (`?ref=dir_alternativeto`) as free/freemium alternative to **Jobber**, **PandaDoc**, **Proposify**, **Joist**, **Better Proposals**, **Housecall Pro** | *"Zero-login Good/Better/Best proposals with 0% payment cut"* |
| **SaaSHub** (`saashub.com`) | `\$0` | List under *Proposal Software* & *Contractor Estimating* (`?ref=dir_saashub`) | Do-follow directory backlink + direct comparisons |
| **G2** (`g2.com`) | `\$0` (basic profile) | Claim vendor profile under *Proposal Software* + *Construction Estimating* (`?ref=dir_g2`) | Collect first 5–10 real user reviews for trust badges |
| **Capterra / GetApp** (`capterra.com`) | `\$0` (free basic listing) | Submit under *Estimate Software* / *Proposal Management* (`?ref=dir_capterra`) | Ranks top-3 for *"free contractor estimate software"* |
| **Google Business Profile / Chrome Web Bookmark** | `\$0` | Once on custom domain, keep Schema `SoftwareApplication` + `sitemap.xml` synced across GSC + Bing | Captures organic local & trade searches |

### Tier 2 — Free Startup & Indie/Agency Launch Platforms (`\$0` Referral Spikes + Backlinks)
Use the **Good / Better / Best Profit Calculator** or **Agency Template** as the lead hook on these communities:

| Platform | Cost | Best Lead URL (`?ref=`) | Why It Converts |
| :--- | :--- | :--- | :--- |
| **MicroLaunch** (`microlaunch.net`) | `\$0` | `https://bidlift-5ias.onrender.com/templates/good-better-best-pricing-calculator.html?ref=dir_microlaunch` | Month-long leaderboard for bootstrapped B2B micro-SaaS |
| **Uneed** (`uneed.best`) | `\$0` queue | `https://bidlift-5ias.onrender.com/?tpl=agency&demo=1&ref=dir_uneed` | Agency & indie tool buyers; clean domain authority backlink |
| **Fazier** (`fazier.com`) | `\$0` | `https://bidlift-5ias.onrender.com/?ref=dir_fazier` | Daily launch feed with permanent SEO product card |
| **Peerlist** (`peerlist.io/launchpad`) | `\$0` | `https://bidlift-5ias.onrender.com/templates/good-better-best-pricing-calculator.html?ref=dir_peerlist` | Weekly Spotlight for builders & freelance designers |
| **Indie Hackers** (`indiehackers.com`) | `\$0` | `https://bidlift-5ias.onrender.com/?tpl=agency&demo=1&ref=dir_indiehackers` | Frame as case study: *"How freelancers lift retainer deals +28% with 3-tier links"* |
| **BetaList / Toolify / There's An AI** | `\$0` standard | `https://bidlift-5ias.onrender.com/templates/?ref=dir_betalist` | Long-tail SaaS discovery + permanent directory backlinks |

### Tier 3 — Where Real Contractors Actually Hang Out (Highest Revenue per Hour)
1. **Local Google Maps 2-Min Quote Makeovers (`OUTREACH_DEMO_LINKS.md`):** Build one personalized Good/Better/Best quote link for 10 local HVAC, roofing, electrical, or plumbing pros per day -> email/SMS link -> offer free setup.
2. **YouTube Shorts / Instagram Reels / TikTok / Facebook Trade Groups:** Show the 30-second before/after clip (`Flat \$4,000 PDF vs. Interactive 3-Tier Link -> Client Clicks Upgrades`). Answer questions in trade forums with value first and link the Calculator (`?ref=yt_calc` / `?ref=fb_trade`).
3. **Trade Coach & Bookkeeper Affiliates (`Polar.sh` `30%` Recurring Commission):** Partner with YouTube HVAC/roofing business coaches, estimator consultants, and agency mentors — pay `30%` via Polar.sh affiliate links when they recommend BidLift to their coaching cohorts.

---

## 2. Copy-Paste Directory Submission Kit

* **Product Name:** `BidLift`
* **Tagline (58 chars):** `Turn 1-price quotes into +28% bigger deals in 60 seconds`
* **Primary Website URL:** `https://bidlift-5ias.onrender.com/?ref=dir_submission`
* **Interactive Calculator URL (great secondary link):** `https://bidlift-5ias.onrender.com/templates/good-better-best-pricing-calculator.html`
* **Pricing Model:** `Freemium` (`\$0` Free core forever · Pro `\$19/mo` or `\$99/yr` · `0%` payment cut)
* **160-Char Short Description:**
  `Turn flat 1-price estimates into interactive Good / Better / Best proposals with toggleable upsells, monthly payment framing, SHA-256 e-signatures & 0% deposit links.`
* **400-Char Medium Description:**
  `Contractors, trades, and boutique agencies lose 20%–38% per job sending static single-price PDF estimates that force buyers to haggle on price. BidLift turns rough notes into itemized Good / Better / Best interactive proposals with monthly payment framing, self-serve checkbox add-ons, ESIGN SHA-256 receipts, and direct Stripe/Venmo/PayPal/Zelle deposit checkout—taking 0% platform cut.`
* **Alternatives To (Tags):** `Jobber`, `PandaDoc`, `Proposify`, `Better Proposals`, `Joist`, `Housecall Pro`, `QuoteRoller`, `FreshBooks Estimates`
* **Support Email:** `bidliftco@gmail.com`

---

## 3. Rapid Conversion Architecture Built in v12
* **⚡ Quick-Quote from Messy Notes:** Turns *"Sarah Johnson, 3-ton AC install at 410 Pine St, base \$5800, add thermostat \$350"* into a scaled 3-tier HVAC quote + custom add-ons in 1 click.
* **Side-by-Side Comparison Matrix + Live Fast-Action Countdown:** Helps analytical homeowners compare Essential vs. Signature vs. Turnkey clearly with urgent incentive timers.
* **WhatsApp One-Tap Pitch + Phase 2 Cloud Short Links (`#p=`) & Instant Open/Sign Email Alerts:** Prepared cleanly across [supabase_schema.sql](phase2/supabase_schema.sql), [polar_webhook_edge_fn.ts](phase2/polar_webhook_edge_fn.ts), [notify_proposal_event_fn.ts](phase2/notify_proposal_event_fn.ts), and [cloud.js](public/cloud.js).
