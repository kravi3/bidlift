# BidLift Phase 2 Blueprint (Tomorrow Execution Plan)

This directory preps **BidLift v2** (Contractor Accounts + Client Portal Isolation + Polar Server-Verified Subscriptions + Founder Super Admin Portal) while keeping Day-1 static launch live at `$0/mo`.

---

## 1. Create Supabase Project ($0/month Free Tier, Zero 30-Day Expiry)
1. Sign into [Supabase](https://supabase.com/dashboard) using `bidliftco@gmail.com`.
2. Create a new project named **`bidlift-prod`** in `us-west-1` (or closest region).
3. Open **SQL Editor** $\rightarrow$ paste and run [`supabase_schema.sql`](supabase_schema.sql).
   * Enables strict Row-Level Security (`RLS`):
     * **Contractors (`authenticated`):** Read/write strictly their own `proposals`, `proposal_acceptances`, and `proposal_events`.
     * **End Users / Clients (`anon`):** Never query tables directly; fetch ONLY a single proposal via `get_public_proposal(share_token)` and lock acceptances via `submit_proposal_acceptance(...)`.
     * **Super Admin (`bidliftco@gmail.com`):** Auto-assigned `role = 'super_admin'`, accessing `get_admin_platform_metrics()`.
4. Enable **Google OAuth** and **Magic Link Email** under **Authentication → Providers**.

---

## 2. Deploy Polar Server Webhook Verification
1. Deploy [`polar_webhook_edge_fn.ts`](polar_webhook_edge_fn.ts) as a Supabase Edge Function (`polar-webhook`).
2. Inside Polar (**Settings → Webhooks**), add the Edge Function HTTPS endpoint subscribing to:
   * `subscription.active`
   * `subscription.updated`
   * `subscription.revoked`
   * `order.created`
3. Store `POLAR_WEBHOOK_SECRET` in Supabase Secrets so Pro upgrades/cancellations sync securely server-side instead of relying on client license keys.

---

## 3. Frontend Wiring (Tomorrow ~1–2 Hours)
1. Add `@supabase/supabase-js` ESM client cleanly (CSP `script-src` + `connect-src` updated for your `*.supabase.co` URL).
2. Add optional **Sign In / Sync Cloud Drafts** in Studio header (preserving zero-login local testing so visitors still convert without friction, while letting active contractors save across phone & laptop and receive *"Client opened & signed your proposal"* emails).
3. Add `#admin` route gated by `role === 'super_admin'` displaying live KPIs from `get_admin_platform_metrics()`:
   * Total Contractors, Pro Subscribers, Total Quotes Built, Client Views, Signed Proposals, and Gross Client Volume!
4. Keep existing `#q=...` compressed URLs working cleanly alongside new `#p=<uuid>` token URLs for 100% backward compatibility.
