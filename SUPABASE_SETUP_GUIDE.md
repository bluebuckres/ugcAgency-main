# 🚀 Supabase Integration Setup Guide for MakeUGC

This guide will help you set up Supabase for handling form submissions on your MakeUGC website.

## 📋 Table of Contents
1. [Overview](#overview)
2. [Supabase Project Setup](#supabase-project-setup)
3. [Database Tables Setup](#database-tables-setup)
4. [Configuration](#configuration)
5. [Netlify Deployment](#netlify-deployment)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

Your website now has Supabase integration for **TWO forms**:

### Form 1: Creator Application (`creator-application.html`)
- Collects creator information and portfolio
- Stores in `creator_applications` table
- Shows success/error messages in Hindi/English mix

### Form 2: Contact Form (`contact.html`)
- Collects business inquiries
- Stores in `contact_inquiries` table
- Tracks contact type and services interested

---

## 🔧 Supabase Project Setup

### Step 1: Create a Supabase Account
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign up (free tier available)
3. Verify your email address

### Step 2: Create a New Project
1. Click "New Project"
2. Fill in the details:
   - **Name**: `makeugc-production` (or your choice)
   - **Database Password**: Create a strong password (save it securely!)
   - **Region**: Choose closest to your users (e.g., Mumbai for India)
   - **Pricing Plan**: Free tier is sufficient to start
3. Click "Create new project"
4. Wait 2-3 minutes for the project to be provisioned

### Step 3: Get Your API Credentials
1. In your Supabase project dashboard, click on **Settings** (gear icon)
2. Go to **API** section
3. You'll need TWO values:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long string)
4. **IMPORTANT**: Keep these credentials safe!

---

## 🗄️ Database Tables Setup

### Step 1: Open SQL Editor
1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **New Query**

### Step 2: Create Table 1 - Creator Applications

Copy and paste this SQL query:

```sql
-- Create creator_applications table
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

-- Create index on email for faster lookups
CREATE INDEX idx_creator_applications_email ON creator_applications(email);

-- Create index on submitted_at for sorting
CREATE INDEX idx_creator_applications_submitted ON creator_applications(submitted_at DESC);

-- Add comment to table
COMMENT ON TABLE creator_applications IS 'Stores UGC creator application submissions from the website';
```

Click **RUN** to execute.

### Step 3: Create Table 2 - Contact Inquiries

Create another new query and paste:

```sql
-- Create contact_inquiries table
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

-- Create index on email for faster lookups
CREATE INDEX idx_contact_inquiries_email ON contact_inquiries(email);

-- Create index on submitted_at for sorting
CREATE INDEX idx_contact_inquiries_submitted ON contact_inquiries(submitted_at DESC);

-- Create index on contact_type for filtering
CREATE INDEX idx_contact_inquiries_type ON contact_inquiries(contact_type);

-- Add comment to table
COMMENT ON TABLE contact_inquiries IS 'Stores business inquiry submissions from the contact form';
```

Click **RUN** to execute.

### Step 4: Set Up Row Level Security (RLS)

For security, we need to enable RLS and create policies:

```sql
-- Enable RLS on both tables
ALTER TABLE creator_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT data (form submissions)
CREATE POLICY "Allow public insert on creator_applications"
ON creator_applications
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow public insert on contact_inquiries"
ON contact_inquiries
FOR INSERT
TO anon
WITH CHECK (true);

-- Only authenticated users (you) can view the data
CREATE POLICY "Allow authenticated read on creator_applications"
ON creator_applications
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated read on contact_inquiries"
ON contact_inquiries
FOR SELECT
TO authenticated
USING (true);
```

Click **RUN** to execute.

### Step 5: Verify Tables
1. Click **Table Editor** in the left sidebar
2. You should see both tables: `creator_applications` and `contact_inquiries`
3. Click on each table to verify the columns are correct

---

## ⚙️ Configuration

### Step 1: Update Local Configuration

1. Open the file: `assets/js/supabase-config.js`
2. Replace the placeholder values with your actual credentials:

```javascript
const SUPABASE_CONFIG = {
    url: 'https://xxxxxxxxxxxxx.supabase.co', // Your Project URL
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // Your anon public key
};
```

3. Save the file

### Step 2: Test Locally

1. Open your website locally (use `npm run dev:8080` or any local server)
2. Navigate to `creator-application.html`
3. Fill out the form with test data
4. Submit and check for success message
5. Go to Supabase **Table Editor** → `creator_applications` to see the data
6. Repeat for `contact.html`

---

## 🌐 Netlify Deployment

### Option A: Environment Variables (Recommended for Production)

1. Log in to your Netlify dashboard
2. Go to your site → **Site settings** → **Environment variables**
3. Add two new variables:
   - **Key**: `SUPABASE_URL` | **Value**: Your Supabase Project URL
   - **Key**: `SUPABASE_ANON_KEY` | **Value**: Your anon public key
4. Save

5. Update `assets/js/supabase-config.js` to use environment variables:

```javascript
const SUPABASE_CONFIG = {
    url: window.ENV?.SUPABASE_URL || 'YOUR_SUPABASE_PROJECT_URL',
    anonKey: window.ENV?.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'
};
```

6. Create a `netlify.toml` file in your project root:

```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Option B: Direct Configuration (Simpler)

Since the anon key is public and safe to expose, you can keep the credentials directly in `supabase-config.js`:

1. Make sure `assets/js/supabase-config.js` has your actual credentials
2. Commit and push to your repository
3. Netlify will automatically deploy

**Note**: The anon key is designed to be public and is safe to include in client-side code.

---

## 🧪 Testing

### Test Creator Application Form

1. Go to `https://your-site.netlify.app/creator-application.html`
2. Fill in all required fields:
   - Full Name: Test Creator
   - Email: test@example.com
   - City: Mumbai
   - Primary Platform: Instagram
   - Niches: Fashion, Beauty
   - Portfolio Video Link: https://drive.google.com/file/d/test
3. Click Submit
4. You should see: "Application Submitted Successfully! 🎉"
5. Check Supabase Table Editor to verify data

### Test Contact Form

1. Go to `https://your-site.netlify.app/contact.html`
2. Select a contact type (e.g., "Prospective Client")
3. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Message: This is a test inquiry
   - Select at least one service
4. Click Send Message
5. You should see: "Message Sent Successfully! 🎉"
6. Check Supabase Table Editor to verify data

---

## 🐛 Troubleshooting

### Issue: "Configuration error" message

**Solution**: 
- Check that `assets/js/supabase-config.js` has correct URL and anon key
- Verify the Supabase CDN script is loading: `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2`
- Open browser console (F12) and check for errors

### Issue: Form submits but no data in Supabase

**Solution**:
- Check browser console for errors
- Verify RLS policies are set correctly (see Step 4 of Database Setup)
- Make sure tables exist with correct column names
- Test the connection in browser console:
  ```javascript
  const client = window.getSupabaseClient();
  console.log(client);
  ```

### Issue: "Network error" or CORS issues

**Solution**:
- Verify your Supabase project URL is correct
- Check that your site domain is allowed in Supabase settings
- Go to Supabase → **Authentication** → **URL Configuration** → Add your Netlify domain

### Issue: Duplicate submissions

**Solution**:
- Add a unique constraint on email if needed:
  ```sql
  ALTER TABLE creator_applications 
  ADD CONSTRAINT unique_creator_email UNIQUE (email);
  ```

### Issue: Form validation not working

**Solution**:
- Check that all required fields have `required` attribute in HTML
- Verify JavaScript is loading (check browser console)
- Make sure form IDs match between HTML and JavaScript

---

## 📊 Viewing Submissions

### Via Supabase Dashboard

1. Go to **Table Editor** in Supabase
2. Click on `creator_applications` or `contact_inquiries`
3. View, filter, and export data

### Set Up Email Notifications (Optional)

You can set up email notifications when new submissions arrive:

1. Go to **Database** → **Webhooks** in Supabase
2. Create a webhook that triggers on INSERT
3. Use a service like Zapier or Make.com to send emails
4. Or use Supabase Edge Functions to send emails directly

---

## 🔒 Security Best Practices

✅ **Implemented**:
- Row Level Security (RLS) enabled
- Public can only INSERT, not read data
- Form validation on client-side
- Error messages don't expose sensitive info

✅ **Additional Recommendations**:
- Set up rate limiting in Supabase (free tier has built-in limits)
- Monitor submissions regularly
- Back up your database weekly
- Use Supabase's built-in logging to track suspicious activity

---

## 📈 Next Steps

1. **Set up email notifications** for new submissions
2. **Create a dashboard** to view submissions (use Supabase + React/Vue)
3. **Add spam protection** (e.g., reCAPTCHA)
4. **Export data regularly** for backup
5. **Monitor usage** in Supabase dashboard

---

## 🆘 Need Help?

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Discord**: https://discord.supabase.com
- **Your Developer**: Contact for custom modifications

---

## ✅ Checklist

Before going live, ensure:

- [ ] Supabase project created
- [ ] Both tables created with correct schema
- [ ] RLS policies enabled and tested
- [ ] Configuration file updated with credentials
- [ ] Tested both forms locally
- [ ] Deployed to Netlify
- [ ] Tested both forms on production
- [ ] Verified data appears in Supabase
- [ ] Set up email notifications (optional)
- [ ] Documented credentials securely

---

**Last Updated**: November 2024  
**Version**: 1.0  
**Maintained by**: MakeUGC Development Team
