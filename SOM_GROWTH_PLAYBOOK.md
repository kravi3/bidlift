# BidLift 90-Day Expedited SOM Growth Playbook

> **Mission:** Compress Year-1 SOM (`\$60K–\$240K ARR` run-rate) into **90 days of execution** by shifting from passive unfeatured directory traffic to **high-intent Google Search**, **interactive calculator onboarding**, **1-to-1 "Quote Makeover" contractor outreach**, and **viral homeowner-to-contractor referrals (`?ref=quote_badge`)**.

---

## 1. Expedited 90-Day SOM Targets & Milestones

| Sprint Window | Primary Lever | Product & Infrastructure Shipped | Target KPI Run-Rate |
| :--- | :--- | :--- | :--- |
| **Days 1–30 (Month 1)** | Direct "2-Min Quote Makeover" Outreach (50 local trades/agencies) + GBB Profit Calculator + Agency Pivot | **BidLift v11 Live:** 10 templates (HVAC, Roofing, Plumbing, Electrical, Remodel, Landscaping, Agency, Cleaning, Real Estate, Media), Monthly Financing Framing, 1-click Buyer Demo, Interactive Calculator + 10 SEO pages, custom domain attached (`bidlift.co` / `getbidlift.com`) | **`30–60`** weekly quoting teams · **`15–30`** Pro accounts (**`\$285–\$570 MRR`**) |
| **Days 31–60 (Month 2)** | Phase 2 Serverless Activation (**Short Links + Instant Open/Sign Notifications**) + Search Console SEO Indexing | Ship [PHASE2_BLUEPRINT.md](phase2/PHASE2_BLUEPRINT.md) (Supabase Free Tier + Polar Webhook): clean SMS links (`/q/abc123`), real-time *"Client viewed / signed!"* email alerts, white-label Pro verification | **`75–150`** Pro accounts (**`\$1,425–\$2,850 MRR`**) |
| **Days 61–90 (Month 3)** | Viral `?ref=quote_badge` Contractor Flywheel + Trade Coach / Jobber-refugee Partnerships + Short-Form Video Clips | Multi-user Team Seats (`\$39–\$49/mo`), SMS client alerts, Optional Financing Partner Referrals (Wisetack/Hearth) | **`200–350`** Pro/Team accounts (**`\$4,000–\$7,500+ MRR` / `\$48K–\$90K+ ARR`**) |

---

## 2. Custom Domain & Search Indexing Checklist (15 Minutes for Founder)

Why first? Homeowners e-signing a `\$4,000–\$16,900` job distrust `.onrender.com` URLs, and Google indexes canonical custom domains cleanly.

1. **Register Short Trust Domain (`~\$10–\$15/yr`):** Register `bidlift.co` or `getbidlift.com`.
2. **Attach on Render (`\$0` config):** Render Dashboard → `bidlift` Static Site → **Settings → Custom Domains** → Add domain → Point CNAME (`bidlift-5ias.onrender.com`) / A record at registrar → wait ~5 minutes for automatic TLS cert.
3. **Update Canonical & Config URLs:** Replace `https://bidlift-5ias.onrender.com` in [index.html](public/index.html), [sitemap.xml](public/sitemap.xml), [robots.txt](public/robots.txt), and all `/templates/*.html` files.
4. **Submit Sitemap Immediately (`Day 1`):**
   * Verify property in [Google Search Console](https://search.google.com/search-console) (DNS TXT record).
   * Submit `https://<your-domain>/sitemap.xml` (covers all **11 canonical URLs**: Studio + Templates Hub + GBB Calculator + 8 Trade/Agency landing pages).
   * Import Google Search Console site into [Bing Webmaster Tools](https://www.bing.com/webmasters) so Microsoft Edge/Bing/AI Search crawlers index within 48 hours.

---

## 3. Ready-to-Send Personalized Outreach Scripts (Do-the-Unscalable Sprint)

> **Golden Rule:** Never blast bulk spam. Pick **50 real businesses** (local HVAC/Roofing/Plumbing companies on Google Maps + boutique web/SEO agencies on LinkedIn), build a customized `#q=` sample quote for each one in 90 seconds, and send the live interactive link!

### Script A — Local Contractor Email / SMS ("I Converted Your Quote")
**Subject:** `Quick interactive 3-option quote mockup for [Company Name]`

```text
Hi [First Name],

I saw [Company Name]'s great reviews on Google for [HVAC / Roofing / Plumbing] around [City].

One quick thing top residential shops do to add +$800 to +$1,800 per job is swap single-price PDFs for Good / Better / Best options with monthly framing and optional add-ons—so homeowners stop shopping purely on lowest price.

I built an interactive 60-second sample quote specifically with [Company Name]'s details + services so you can click through what your homeowner sees on their phone (zero login required):
[PASTE PERSONALIZED #q=... LINK]

Feel free to use or tweak it for your next estimate at [URL]/templates/good-better-best-pricing-calculator.html. If you ever try it on a live bid, I'd love your honest 1-line take!

Best,
[Your Name]
Founder, BidLift
```

### Script B — Boutique Web / Marketing Agency LinkedIn DM
```text
Hey [First Name] — quick founder note: do you still send clients flat PDF or Google Doc proposals for retainers & website builds?

Built a tiny zero-login tool (BidLift) that turns 1-price bids into interactive Good / Better / Best packages with toggleable SEO/copywriting add-ons, e-sign receipt + direct Stripe deposit link (0% fee cut).

Here's a live agency template pre-loaded so you can see the client flow in 10 seconds:
https://bidlift-5ias.onrender.com/?tpl=agency&demo=1&ref=dm_agency

Zero signup needed — curious if something this fast would help speed up your client sign-offs?
```

---

## 4. 30-Second Before-vs-After Short Video Script (Reels / Shorts / TikTok / X / LinkedIn)

* **0:00–0:04 (Hook — Split Screen):** *"Stop sending 1-price PDF estimates like this (`\$4,000`), because your homeowner is just going to get 3 cheaper bids."*
* **0:04–0:14 (Solution — Calculator to Live Studio):** *"Put your `\$4,000` flat quote into this free Good/Better/Best calculator (`bidlift`), pick HVAC or Roofing, and click Generate."*
* **0:14–0:24 (Buyer Payoff — Phone Tap):** *"Now your homeowner sees Essential (`\$4,000`), Signature (`\$5,120` — `~\$109/mo`), and clicks Duct Cleaning (`+\$490`), signs with their finger, and pays their deposit with 0% platform cut."*
* **0:24–0:30 (CTA Overlay):** *"Comment/click the Good-Better-Best Calculator in bio — zero signup, free to send your first quote in 60 seconds."*

---

## 5. Product Hunt Top-Launch Benchmarks & Strategy Recap

* **Historical All-Time / Early Era Benchmark:** *Startup Stash* (~`20,000+` upvotes during peak directory era); top Featured daily winners historically clear `1,000+` points (`5x–6x` Featured feed multiplier).
* **Official Product Hunt API Benchmarks (`2026` YTD):**
  1. `Fundraisly` (`1,499` pts)
  2. `Rork Max` (`1,397` pts)
  3. `Happycapy` (`1,338` pts)
  4. `Brila` (`1,327` pts — *"One-page websites from real Google Maps reviews"*, notice how SMB-focused SaaS wins when framed for makers/agencies!)
  5. `Claude Cowork` (`1,090` pts)
* **November 2026 Monthly Top (`11/01–11/23`):** `#1 Alsona` (`553` pts), `#2 beacon.sh` (`522` pts), `#4 Screen Studio 4.0` (`475` pts). Today (`2026-11-23`): `#1 Letter Visitors` (`232` pts), `#10` (`91` pts).
* **Takeaway:** Product Hunt rewards builder/agency positioning + pre-built warm distribution (`Featured` slot). Use PH/X/LinkedIn to capture agencies & SaaS founders with the **GBB Profit Calculator**, while winning trades (`HVAC`, `Roofing`, `Plumbing`, `Electrical`) via SEO + 1-to-1 Quote Makeovers.

---

## 6. Advisory Verdict on a Buyer-Side "1% Non-Refundable Service Selection Commission"

**Verdict: Strongly advise AGAINST charging buyers a mandatory `1%` non-refundable service-selection commission.**

1. **Buyer Sticker Shock & Abandonment at the Finish Line:** Homeowners reviewing a `\$7,200` HVAC or `\$12,800` roof proposal expect to sign and pay *0 extra platform junk fees*. Adding an unexpected `+\$72` to `+\$169` "non-refundable platform fee" right when they sign drops close rates immediately — defeating BidLift's core value proposition (*higher close rate + larger deal size*).
2. **Card Network & FinTech Economics Break on Small Cuts:** On a `\$2,000` plumbing job, `1%` = `\$20` gross (`~\$19.12` after Stripe `2.9% + \$0.30`). A single disputed/cancelled contractor job incurs a `\$15–\$25` Stripe chargeback fee + merchant underwriting risk, wiping out dozens of transactions. Plus Visa/Mastercard strictly restrict buyer surcharging/non-refundable undisclosed fees in multiple US states.
3. **Architecture & Value Positioning:** Contractors currently join BidLift because it **takes `0%` cut** (`PHASE2_BLUEPRINT.md` + public FAQ vs. `2.9–3.9%` CRM processors).

### How to Safely Capture Transaction Revenue Instead (When Desired in Phase 2)
* **Keep Free & Standard Pro (`\$19/mo` / `\$99/yr`) at `0%` fee cut** — let **Pro** monetize **Clean Short Links (`/q/abc123`) + Instant Client Open/Signed Alerts + Saved Cloud Service Libraries**.
* **Optional "BidLift Instant Deposit / Card-on-File" (`Stripe Connect`):** Let contractors opt *in* (contractor-side, transparent merchant pricing or a capped convenience fee, e.g., **max `\$15–\$25` cap per job**, or `0.5%` platform fee bundled into merchant rate) *only* if they don't want to paste their own external Venmo/Zelle/Stripe link.
* **Financing Partner Bounty:** In Month 3+, earn B2B referral revenue (`\$50–\$150` per funded job/approved contractor) by integrating Wisetack/Hearth/GreenSky pre-qualification inside the `financingUrl` slot we shipped in v11 — zero buyer surcharge!
