-- ============================================
-- COMPREHENSIVE SUPABASE RLS FIX
-- ============================================
-- Run this COMPLETE script in Supabase SQL Editor
-- This will fix all RLS policy issues for form submissions
-- ============================================

-- Step 1: Ensure tables exist with proper structure
CREATE TABLE IF NOT EXISTS creator_applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT NOT NULL,
  primary_platform TEXT NOT NULL,
  social_handle TEXT,
  content_experience TEXT,
  niches TEXT NOT NULL,
  instagram_url TEXT,
  youtube_url TEXT,
  portfolio_video_url TEXT NOT NULL,
  additional_links TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  budget_range TEXT,
  services JSONB,
  message TEXT NOT NULL,
  contact_type TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Create indexes for performance (if not exist)
CREATE INDEX IF NOT EXISTS idx_creator_applications_email ON creator_applications(email);
CREATE INDEX IF NOT EXISTS idx_creator_applications_submitted ON creator_applications(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_email ON contact_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_submitted ON contact_inquiries(submitted_at DESC);

-- Step 3: Enable RLS on both tables
ALTER TABLE creator_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Allow public insert on creator_applications" ON creator_applications;
DROP POLICY IF EXISTS "Allow public inserts on creator_applications" ON creator_applications;
DROP POLICY IF EXISTS "Allow authenticated read on creator_applications" ON creator_applications;
DROP POLICY IF EXISTS "Allow public insert on contact_inquiries" ON contact_inquiries;
DROP POLICY IF EXISTS "Allow public inserts on contact_inquiries" ON contact_inquiries;
DROP POLICY IF EXISTS "Allow authenticated read on contact_inquiries" ON contact_inquiries;

-- Step 5: Create COMPREHENSIVE policies for public form submissions

-- ============================================
-- CREATOR APPLICATIONS POLICIES
-- ============================================

-- Allow ANYONE (anonymous + authenticated) to INSERT creator applications
CREATE POLICY "creator_applications_public_insert"
ON creator_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow authenticated users to SELECT creator applications
CREATE POLICY "creator_applications_authenticated_select"
ON creator_applications
FOR SELECT
TO authenticated
USING (true);

-- Allow service_role to do everything (for admin access)
CREATE POLICY "creator_applications_service_role_all"
ON creator_applications
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================
-- CONTACT INQUIRIES POLICIES
-- ============================================

-- Allow ANYONE (anonymous + authenticated) to INSERT contact inquiries
CREATE POLICY "contact_inquiries_public_insert"
ON contact_inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow authenticated users to SELECT contact inquiries
CREATE POLICY "contact_inquiries_authenticated_select"
ON contact_inquiries
FOR SELECT
TO authenticated
USING (true);

-- Allow service_role to do everything (for admin access)
CREATE POLICY "contact_inquiries_service_role_all"
ON contact_inquiries
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check if RLS is enabled
SELECT 
    schemaname,
    tablename, 
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('creator_applications', 'contact_inquiries');

-- Check all policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd as operation,
    CASE 
        WHEN qual IS NOT NULL THEN 'Has USING clause'
        ELSE 'No USING clause'
    END as using_clause,
    CASE 
        WHEN with_check IS NOT NULL THEN 'Has WITH CHECK clause'
        ELSE 'No WITH CHECK clause'
    END as with_check_clause
FROM pg_policies 
WHERE tablename IN ('creator_applications', 'contact_inquiries')
ORDER BY tablename, policyname;

-- ============================================
-- TEST QUERIES (Run these to verify)
-- ============================================

-- Test 1: Insert as anonymous user (this should work)
-- INSERT INTO creator_applications (
--     full_name, email, city, primary_platform, niches, portfolio_video_url
-- ) VALUES (
--     'Test Creator', 'test@example.com', 'Mumbai', 'Instagram', 'Fashion', 'https://youtube.com/test'
-- );

-- Test 2: Select as authenticated user (this should work when logged in)
-- SELECT COUNT(*) FROM creator_applications;

-- Test 3: Clean up test data
-- DELETE FROM creator_applications WHERE email = 'test@example.com';

-- ============================================
-- EXPECTED RESULTS
-- ============================================
-- After running this script, you should see:
-- 1. RLS enabled on both tables
-- 2. 6 policies total (3 per table)
-- 3. Anonymous users can INSERT
-- 4. Authenticated users can SELECT
-- 5. Service role can do everything

-- ============================================
-- TROUBLESHOOTING
-- ============================================
-- If you still get RLS errors:
-- 1. Check your Supabase project URL and anon key
-- 2. Verify the anon key has proper permissions
-- 3. Check browser network tab for 401/403 errors
-- 4. Ensure Supabase client is properly initialized

COMMENT ON TABLE creator_applications IS 'UGC Creator applications with public insert access';
COMMENT ON TABLE contact_inquiries IS 'Business contact inquiries with public insert access';
