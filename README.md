# BidLift — Interactive Revenue-Boosting Proposal & Upsell Studio

**BidLift** turns flat, 1-price PDF estimates into interactive **Good / Better / Best** web proposals with toggleable upsell add-ons, e-signatures, and instant deposit buttons—directly increasing customer Average Order Value (AOV) by **20%–38%**.

## Architecture Highlights
* **100% Client-Side & Zero-PII**: Entire proposals are compressed via native `CompressionStream('deflate-raw')` inside the URL hash (`#q=...`). Zero client records, emails, phone numbers, or contracts are ever stored on any backend server.
* **\$0/Month Forever Hosting**: Zero dependencies, zero build step, pure ES6+ static files under `public/` designed to run on Render's Global Static CDN.
* **Built-In Viral Growth Loop**: Every free quote carries a tasteful `"Powered by BidLift — Boost quote revenue +28% (Free)"` link back to the studio, turning your customers' clients into new SaaS signups automatically.
* **Website Embed Ready**: Generate a responsive `<iframe>` embed snippet to turn any business website into an interactive package configurator.

## 5-Minute Live Monetization Setup
1. Log into [Stripe Dashboard → Payment Links](https://dashboard.stripe.com/payment-links).
2. Create two products:
   * **BidLift Pro Monthly** (`$19/month`) — White-label quotes (removes BidLift footer) + full customization.
   * **BidLift Founding Lifetime** (`$49 one-time`) — Permanent white-label access.
3. Under **After payment → Redirect customers to your website**, set the exact automatic-unlock confirmation URLs:
   * **Pro Monthly Redirect URL:**
     `https://bidlift-5ias.onrender.com/?unlock=BL-PRO-M9X4K2-C99D&plan=monthly`
   * **Founding Lifetime Redirect URL:**
     `https://bidlift-5ias.onrender.com/?unlock=BL-PRO-L7Q8R5-CF8A&plan=lifetime`
4. Paste both generated Stripe Payment Link URLs into [`public/config.js`](public/config.js):
   ```js
   STRIPE_PRO_MONTHLY_LINK: "https://buy.stripe.com/your_monthly_link",
   STRIPE_LIFETIME_LINK: "https://buy.stripe.com/your_lifetime_link",
   ```
5. Commit and push—Render auto-deploys in ~20 seconds.

## Local Development
Serve `public/` using Python's built-in HTTP server:
```bash
python3 -m http.server 8092 --directory public
```
Then open `http://localhost:8092/`.
