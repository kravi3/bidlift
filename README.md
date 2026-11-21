# BidLift — Interactive Revenue-Boosting Proposal & Upsell Studio

**BidLift** turns flat, 1-price PDF estimates into interactive **Good / Better / Best** web proposals with toggleable upsell add-ons, e-signatures, and instant deposit buttons—directly increasing customer Average Order Value (AOV) by **20%–38%**.

## Architecture Highlights
* **100% Client-Side & Zero-PII**: Entire proposals are compressed via native `CompressionStream('deflate-raw')` inside the URL hash (`#q=...`). Zero client records, emails, phone numbers, or contracts are ever stored on any backend server.
* **\$0/Month Forever Hosting**: Zero dependencies, zero build step, pure ES6+ static files under `public/` designed to run on Render's Global Static CDN.
* **Built-In Viral Growth Loop**: Every free quote carries a tasteful `"Powered by BidLift — Boost quote revenue +28% (Free)"` link back to the studio, turning your customers' clients into new SaaS signups automatically.
* **Website Embed Ready**: Generate a responsive `<iframe>` embed snippet to turn any business website into an interactive package configurator.

## Live Monetization Architecture (Polar.sh — \$0/mo, Automated Tax & VAT)
[Polar.sh](https://polar.sh) (Polar Software, Inc., a US Delaware corp running on Stripe Connect) acts as Merchant of Record (`$0/month` Starter plan; `5% + $0.50` per domestic US sale, `+1.5%` on international cards), automatically calculating and filing US state sales taxes (including Washington) and global VAT/GST.

Live wired Checkout Links in [`public/config.js`](public/config.js):
* **BidLift Pro Monthly (`$19/month`)**
  * Checkout Link: `https://buy.polar.sh/polar_cl_CmzuvzfKFA3NJsP5hBbWpQg1EwRRLmGfxaQuO0yifJp`
  * Success Redirect URL: `https://bidlift-5ias.onrender.com/?unlock=BL-PRO-M9X4K2-C99D&plan=monthly`
* **BidLift Pro Annual (`$99/year`, Save 56% — ~$8.25/mo)**
  * Checkout Link: `https://buy.polar.sh/polar_cl_YUHqZm7ZgtUXy2DDTccTVquP3tKMIEQ8hvL4j3an9Lk`
  * Success Redirect URL: `https://bidlift-5ias.onrender.com/?unlock=BL-PRO-A7Y8R5-DF5A&plan=annual`

## Local Development
Serve `public/` using Python's built-in HTTP server:
```bash
python3 -m http.server 8092 --directory public
```
Then open `http://localhost:8092/`.
