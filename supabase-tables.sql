-- ============================================
-- MakeUGC Supabase Database Schema
-- ============================================
-- Run this entire file in Supabase SQL Editor
-- to set up both tables with proper security
-- ============================================

-- ============================================
-- TABLE 1: Creator Applications
-- ============================================

CREATE TABLE creator_applications (
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

-- Create indexes for better performance
CREATE INDEX idx_creator_applications_email ON creator_applications(email);
CREATE INDEX idx_creator_applications_submitted ON creator_applications(submitted_at DESC);
CREATE INDEX idx_creator_applications_city ON creator_applications(city);
CREATE INDEX idx_creator_applications_platform ON creator_applications(primary_platform);

-- Add table comment
COMMENT ON TABLE creator_applications IS 'Stores UGC creator application submissions from the website';

-- ============================================
-- TABLE 2: Contact Inquiries
-- ============================================

CREATE TABLE contact_inquiries (
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

-- Create indexes for better performance
CREATE INDEX idx_contact_inquiries_email ON contact_inquiries(email);
CREATE INDEX idx_contact_inquiries_submitted ON contact_inquiries(submitted_at DESC);
CREATE INDEX idx_contact_inquiries_type ON contact_inquiries(contact_type);

-- Add table comment
COMMENT ON TABLE contact_inquiries IS 'Stores business inquiry submissions from the contact form';

-- ============================================
-- ROW LEVEL SECURITY (RLS) SETUP
-- ============================================

-- Enable RLS on both tables
ALTER TABLE creator_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLICIES: Allow public to submit forms
-- ============================================

-- Allow anonymous users to INSERT creator applications
CREATE POLICY "Allow public insert on creator_applications"
ON creator_applications
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow anonymous users to INSERT contact inquiries
CREATE POLICY "Allow public insert on contact_inquiries"
ON contact_inquiries
FOR INSERT
TO anon
WITH CHECK (true);

-- ============================================
-- POLICIES: Only authenticated users can read
-- ============================================

-- Allow authenticated users (you) to read creator applications
CREATE POLICY "Allow authenticated read on creator_applications"
ON creator_applications
FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users (you) to read contact inquiries
CREATE POLICY "Allow authenticated read on contact_inquiries"
ON contact_inquiries
FOR SELECT
TO authenticated
USING (true);

-- ============================================
-- OPTIONAL: Add unique email constraint
-- ============================================
-- Uncomment if you want to prevent duplicate emails

-- ALTER TABLE creator_applications 
-- ADD CONSTRAINT unique_creator_email UNIQUE (email);

-- ALTER TABLE contact_inquiries 
-- ADD CONSTRAINT unique_contact_email UNIQUE (email);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these to verify everything is set up correctly

-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('creator_applications', 'contact_inquiries');

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('creator_applications', 'contact_inquiries');

-- Check policies exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE tablename IN ('creator_applications', 'contact_inquiries');

-- ============================================
-- SAMPLE QUERIES FOR VIEWING DATA
-- ============================================

-- View recent creator applications (last 10)
-- SELECT * FROM creator_applications 
-- ORDER BY submitted_at DESC 
-- LIMIT 10;

-- View recent contact inquiries (last 10)
-- SELECT * FROM contact_inquiries 
-- ORDER BY submitted_at DESC 
-- LIMIT 10;

-- Count total creator applications
-- SELECT COUNT(*) as total_applications FROM creator_applications;

-- Count total contact inquiries
-- SELECT COUNT(*) as total_inquiries FROM contact_inquiries;

-- Group creator applications by platform
-- SELECT primary_platform, COUNT(*) as count 
-- FROM creator_applications 
-- GROUP BY primary_platform 
-- ORDER BY count DESC;

-- Group contact inquiries by type
-- SELECT contact_type, COUNT(*) as count 
-- FROM contact_inquiries 
-- GROUP BY contact_type 
-- ORDER BY count DESC;

-- ============================================
-- SETUP COMPLETE! 🎉
-- ============================================
-- Your database is now ready to receive form submissions
-- Next steps:
-- 1. Update assets/js/supabase-config.js with your credentials
-- 2. Test the forms locally
-- 3. Deploy to Netlify
-- ============================================
