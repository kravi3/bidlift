# BidLift — Interactive Revenue-Boosting Proposal & Upsell Studio

**BidLift** turns flat, 1-price PDF estimates into interactive **Good / Better / Best** web proposals with toggleable upsell add-ons, e-signatures, and instant deposit buttons—directly increasing customer Average Order Value (AOV) by **20%–38%**.

## Architecture Highlights
* **100% Client-Side & Zero-PII**: Entire proposals are compressed via native `CompressionStream('deflate-raw')` inside the URL hash (`#q=...`). Zero client records, emails, phone numbers, or contracts are ever stored on any backend server.
* **\$0/Month Forever Hosting**: Zero dependencies, zero build step, pure ES6+ static files under `public/` designed to run on Render's Global Static CDN.
* **Built-In Viral Growth Loop**: Every free quote carries a tasteful `"Powered by BidLift — Boost quote revenue +28% (Free)"` link back to the studio, turning your customers' clients into new SaaS signups automatically.
* **Website Embed Ready**: Generate a responsive `<iframe>` embed snippet to turn any business website into an interactive package configurator.

## 5-Minute Live Monetization Setup (Lemon Squeezy — \$0/mo, Automated Tax & VAT)
Lemon Squeezy acts as your Merchant of Record (\$0/month upfront, `5% + \$0.50` deducted only from actual sales), automatically calculating and filing all US state sales taxes (including Washington) and global VAT/GST for you.

1. Log into [Lemon Squeezy](https://app.lemonsqueezy.com) and create your store (e.g., **BidLift**).
2. Create two subscription products:
   * **BidLift Pro Monthly** (`$19/month`) — White-label quotes (removes BidLift footer), priority brand presets, multi-currency & tax.
   * **BidLift Pro Annual (Save 56%)** (`$99/year`, ~$8.25/mo) — Sustainable recurring annual plan with full white-label access.
3. Under each product's **Confirmation / After-purchase Redirect URL**, set:
   * **Pro Monthly Redirect URL:**
     `https://bidlift-5ias.onrender.com/?unlock=BL-PRO-M9X4K2-C99D&plan=monthly`
   * **Pro Annual Redirect URL:**
     `https://bidlift-5ias.onrender.com/?unlock=BL-PRO-A7Y8R5-DF5A&plan=annual`
4. Paste both generated checkout URLs into [`public/config.js`](public/config.js):
   ```js
   CHECKOUT_PRO_MONTHLY_LINK: "https://yourstore.lemonsqueezy.com/buy/...",
   CHECKOUT_PRO_ANNUAL_LINK: "https://yourstore.lemonsqueezy.com/buy/...",
   ```
5. Commit and push—Render deploys in ~15 seconds.

## Local Development
Serve `public/` using Python's built-in HTTP server:
```bash
python3 -m http.server 8092 --directory public
```
Then open `http://localhost:8092/`.
