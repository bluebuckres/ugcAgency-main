-- ============================================
-- FIX: Row-Level Security Policy for Form Submissions
-- ============================================
-- Run this in Supabase SQL Editor to fix the error:
-- "new row violates row-level security policy"
-- ============================================

-- Step 1: Enable RLS on tables (if not already enabled)
ALTER TABLE creator_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop existing policies (if any)
DROP POLICY IF EXISTS "Allow public inserts on creator_applications" ON creator_applications;
DROP POLICY IF EXISTS "Allow public inserts on contact_inquiries" ON contact_inquiries;
DROP POLICY IF EXISTS "Allow authenticated read on creator_applications" ON creator_applications;
DROP POLICY IF EXISTS "Allow authenticated read on contact_inquiries" ON contact_inquiries;

-- Step 3: Create NEW policies that allow public form submissions

-- Allow ANYONE (anon users) to INSERT into creator_applications
CREATE POLICY "Allow public inserts on creator_applications"
ON creator_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow ANYONE (anon users) to INSERT into contact_inquiries
CREATE POLICY "Allow public inserts on contact_inquiries"
ON contact_inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow authenticated users (you) to READ creator applications
CREATE POLICY "Allow authenticated read on creator_applications"
ON creator_applications
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users (you) to READ contact inquiries
CREATE POLICY "Allow authenticated read on contact_inquiries"
ON contact_inquiries
FOR SELECT
TO authenticated
USING (true);

-- ============================================
-- VERIFICATION
-- ============================================
-- Check if policies are created correctly
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename IN ('creator_applications', 'contact_inquiries')
ORDER BY tablename, policyname;

-- Expected output:
-- You should see 4 policies:
-- 1. Allow public inserts on creator_applications (INSERT, anon/authenticated)
-- 2. Allow authenticated read on creator_applications (SELECT, authenticated)
-- 3. Allow public inserts on contact_inquiries (INSERT, anon/authenticated)
-- 4. Allow authenticated read on contact_inquiries (SELECT, authenticated)

-- ============================================
-- TEST INSERT (Optional)
-- ============================================
-- Test if insert works (run this as anon user)
-- This should succeed after running the policies above

/*
INSERT INTO creator_applications (
    full_name,
    email,
    city,
    primary_platform,
    niches,
    portfolio_video_url
) VALUES (
    'Test Creator',
    'test@example.com',
    'Mumbai',
    'Instagram',
    'Fashion, Lifestyle',
    'https://youtube.com/watch?v=test'
);
*/

-- If the above works, delete the test entry:
-- DELETE FROM creator_applications WHERE email = 'test@example.com';
