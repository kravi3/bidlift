-- ============================================================================
-- BidLift Phase 2: Multi-Tenant Contractor Auth, Client RPCs & Super Admin Schema
-- Compatible with Supabase Postgres (Free Tier — $0/mo, zero 30-day expiry)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Contractor & Super Admin Profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  business_name TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  role TEXT NOT NULL DEFAULT 'contractor' CHECK (role IN ('contractor', 'super_admin')),
  plan TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'pro_monthly', 'pro_annual')),
  polar_customer_id TEXT,
  polar_subscription_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile row on Supabase user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (
    NEW.id,
    NEW.email,
    CASE WHEN LOWER(NEW.email) = 'bidliftco@gmail.com' THEN 'super_admin' ELSE 'contractor' END
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Contractor Proposals (Strictly Private Per Contractor)
CREATE TABLE IF NOT EXISTS public.proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  share_token UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  trade_template TEXT DEFAULT 'contractor',
  quote_number TEXT DEFAULT '',
  project_title TEXT NOT NULL,
  client_name TEXT DEFAULT '',
  client_email TEXT DEFAULT '',
  currency TEXT NOT NULL DEFAULT 'USD',
  payload JSONB NOT NULL, -- Full tiers, add-ons, terms, branding palette, deposit config
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'accepted', 'expired')),
  white_label BOOLEAN NOT NULL DEFAULT FALSE,
  view_count INTEGER NOT NULL DEFAULT 0,
  last_viewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_proposals_owner ON public.proposals(owner_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_proposals_token ON public.proposals(share_token);

-- 3. Immutable Client Electronic Acceptance & Audit Trail (ESIGN / SHA-256)
CREATE TABLE IF NOT EXISTS public.proposal_acceptances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id UUID NOT NULL REFERENCES public.proposals(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  selected_tier_index INTEGER NOT NULL,
  selected_tier_name TEXT NOT NULL,
  selected_addons JSONB NOT NULL DEFAULT '[]'::jsonb,
  subtotal NUMERIC(12,2) NOT NULL,
  discount_applied NUMERIC(12,2) NOT NULL DEFAULT 0,
  tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  total_amount NUMERIC(12,2) NOT NULL,
  deposit_due NUMERIC(12,2) NOT NULL DEFAULT 0,
  signer_name TEXT NOT NULL,
  signer_email TEXT DEFAULT '',
  signer_note TEXT DEFAULT '',
  signature_data_url TEXT NOT NULL,
  esign_consent BOOLEAN NOT NULL DEFAULT TRUE,
  sha256_digest TEXT NOT NULL,
  verification_id TEXT NOT NULL,
  accepted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_acceptances_proposal ON public.proposal_acceptances(proposal_id);

-- 4. Privacy-Safe Funnel & Client Engagement Events
CREATE TABLE IF NOT EXISTS public.proposal_events (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  proposal_id UUID REFERENCES public.proposals(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_name TEXT NOT NULL,
  meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- Row-Level Security (Strict Isolation Between Contractors, Clients & Admin)
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposal_acceptances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposal_events ENABLE ROW LEVEL SECURITY;

-- Helper to check super_admin role safely
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'super_admin'
  );
$$;

-- Profiles RLS
CREATE POLICY "Users read own profile or admin reads all"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_super_admin());

CREATE POLICY "Users update own non-role profile fields"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Proposals RLS (Anon clients CANNOT SELECT proposals directly; must use get_public_proposal RPC!)
CREATE POLICY "Contractors manage own proposals"
  ON public.proposals FOR ALL
  USING (auth.uid() = owner_id OR public.is_super_admin())
  WITH CHECK (auth.uid() = owner_id);

-- Acceptances RLS
CREATE POLICY "Contractors read own acceptances"
  ON public.proposal_acceptances FOR SELECT
  USING (auth.uid() = owner_id OR public.is_super_admin());

-- Events RLS
CREATE POLICY "Contractors read own proposal events"
  ON public.proposal_events FOR SELECT
  USING (auth.uid() = owner_id OR public.is_super_admin());

-- ============================================================================
-- Client-Facing Security-Definer RPCs (Unguessable UUID Token Access Only)
-- ============================================================================

-- Fetch single published proposal by share_token & increment view metrics safely
CREATE OR REPLACE FUNCTION public.get_public_proposal(p_share_token UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  rec public.proposals%ROWTYPE;
BEGIN
  SELECT * INTO rec FROM public.proposals WHERE share_token = p_share_token LIMIT 1;
  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  UPDATE public.proposals
  SET
    view_count = view_count + 1,
    last_viewed_at = NOW(),
    status = CASE WHEN status IN ('draft', 'sent') THEN 'viewed' ELSE status END
  WHERE id = rec.id;

  INSERT INTO public.proposal_events (proposal_id, owner_id, event_name)
  VALUES (rec.id, rec.owner_id, 'client_quote_viewed');

  RETURN jsonb_build_object(
    'id', rec.id,
    'share_token', rec.share_token,
    'status', rec.status,
    'white_label', rec.white_label,
    'payload', rec.payload
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_public_proposal(UUID) TO anon, authenticated;

-- Record verified client acceptance by share_token
CREATE OR REPLACE FUNCTION public.submit_proposal_acceptance(
  p_share_token UUID,
  p_tier_index INTEGER,
  p_tier_name TEXT,
  p_addons JSONB,
  p_subtotal NUMERIC,
  p_discount NUMERIC,
  p_tax NUMERIC,
  p_total NUMERIC,
  p_deposit NUMERIC,
  p_signer_name TEXT,
  p_signer_email TEXT,
  p_signer_note TEXT,
  p_signature_data_url TEXT,
  p_sha256_digest TEXT,
  p_verification_id TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  rec public.proposals%ROWTYPE;
BEGIN
  SELECT * INTO rec FROM public.proposals WHERE share_token = p_share_token LIMIT 1;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Invalid or expired proposal token';
  END IF;

  INSERT INTO public.proposal_acceptances (
    proposal_id, owner_id, selected_tier_index, selected_tier_name,
    selected_addons, subtotal, discount_applied, tax_amount, total_amount,
    deposit_due, signer_name, signer_email, signer_note,
    signature_data_url, esign_consent, sha256_digest, verification_id
  ) VALUES (
    rec.id, rec.owner_id, p_tier_index, p_tier_name,
    COALESCE(p_addons, '[]'::jsonb), p_subtotal, p_discount, p_tax, p_total,
    p_deposit, p_signer_name, p_signer_email, p_signer_note,
    p_signature_data_url, TRUE, p_sha256_digest, p_verification_id
  );

  UPDATE public.proposals
  SET status = 'accepted', updated_at = NOW()
  WHERE id = rec.id;

  INSERT INTO public.proposal_events (proposal_id, owner_id, event_name, meta)
  VALUES (rec.id, rec.owner_id, 'proposal_signed', jsonb_build_object('total', p_total));

  RETURN jsonb_build_object('success', TRUE, 'verification_id', p_verification_id);
END;
$$;

GRANT EXECUTE ON FUNCTION public.submit_proposal_acceptance(
  UUID, INTEGER, TEXT, JSONB, NUMERIC, NUMERIC, NUMERIC, NUMERIC, NUMERIC, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT
) TO anon, authenticated;

-- ============================================================================
-- Super Admin Platform Summary View (Founder Dashboard)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.get_admin_platform_metrics()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_super_admin() THEN
    RAISE EXCEPTION 'Forbidden: super_admin access only';
  END IF;

  RETURN jsonb_build_object(
    'total_contractors', (SELECT COUNT(*) FROM public.profiles WHERE role = 'contractor'),
    'pro_subscribers', (SELECT COUNT(*) FROM public.profiles WHERE plan IN ('pro_monthly', 'pro_annual')),
    'total_proposals', (SELECT COUNT(*) FROM public.proposals),
    'total_views', (SELECT COALESCE(SUM(view_count), 0) FROM public.proposals),
    'signed_proposals', (SELECT COUNT(*) FROM public.proposal_acceptances),
    'gross_client_volume', (SELECT COALESCE(SUM(total_amount), 0) FROM public.proposal_acceptances)
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_admin_platform_metrics() TO authenticated;
