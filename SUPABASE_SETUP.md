# 🔧 Supabase Setup Guide - Fix Form Submission

## 🚨 Current Issue

Your creator form is failing because Supabase credentials are not configured.

**Errors:**
```
❌ Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL
❌ Failed to load resource: 404 (analytics-setup.js)
```

---

## ✅ Quick Fix (3 Steps)

### Step 1: Get Supabase Credentials

1. **Go to Supabase Dashboard**
   ```
   https://supabase.com/dashboard
   ```

2. **Select Your Project** (or create new)

3. **Get Credentials**
   - Go to: **Settings** → **API**
   - Copy:
     - **Project URL** (e.g., `https://xxxxx.supabase.co`)
     - **anon public key** (starts with `eyJ...`)

---

### Step 2: Configure for Local Development

Edit `/public/env-config.js`:

```javascript
// For local development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.ENV = {
        SUPABASE_URL: 'https://YOUR_PROJECT.supabase.co',  // ← Paste your URL
        SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'  // ← Paste your key
    };
}
```

**Save the file** and refresh your browser.

---

### Step 3: Configure for Vercel Production

1. **Go to Vercel Dashboard**
   ```
   https://vercel.com/dashboard
   ```

2. **Select Your Project**

3. **Go to Settings → Environment Variables**

4. **Add Variables:**
   ```
   Name: SUPABASE_URL
   Value: https://YOUR_PROJECT.supabase.co
   Environment: Production, Preview, Development
   ```

   ```
   Name: SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   Environment: Production, Preview, Development
   ```

5. **Redeploy**
   ```bash
   vercel --prod
   ```

---

## 🗄️ Database Setup

### Create Tables in Supabase

1. **Go to SQL Editor** in Supabase Dashboard

2. **Run this SQL:**

```sql
-- Creator Applications Table
CREATE TABLE IF NOT EXISTS creator_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    city TEXT NOT NULL,
    primary_platform TEXT NOT NULL,
    social_handle TEXT,
    content_experience TEXT,
    niches TEXT NOT NULL,
    equipment TEXT,
    availability TEXT,
    why_join TEXT,
    portfolio_link TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Form Submissions Table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    message TEXT NOT NULL,
    service_interest TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_creator_email ON creator_applications(email);
CREATE INDEX IF NOT EXISTS idx_creator_created ON creator_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at DESC);
```

3. **Click "Run"**

---

## 🔒 Security Setup (Row Level Security)

Enable RLS for security:

```sql
-- Enable Row Level Security
ALTER TABLE creator_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (form submissions)
CREATE POLICY "Allow public inserts" ON creator_applications
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "Allow public inserts" ON contact_submissions
    FOR INSERT TO anon
    WITH CHECK (true);

-- Only authenticated users can read
CREATE POLICY "Allow authenticated reads" ON creator_applications
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated reads" ON contact_submissions
    FOR SELECT TO authenticated
    USING (true);
```

---

## ✅ Test the Setup

### Local Testing

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Open browser:**
   ```
   http://localhost:8000/creator-application
   ```

3. **Fill out form and submit**

4. **Check console** - Should see:
   ```
   ✅ Form submitted successfully
   ```

5. **Check Supabase** - Go to Table Editor, you should see the new entry

---

### Production Testing

After deploying to Vercel:

1. **Visit your site:**
   ```
   https://yourdomain.vercel.app/creator-application
   ```

2. **Submit form**

3. **Check Supabase** - Entry should appear in database

---

## 🐛 Troubleshooting

### Issue: "Invalid supabaseUrl"

**Solution:**
```javascript
// Check env-config.js has correct values
console.log(window.ENV);
// Should show: { SUPABASE_URL: "https://...", SUPABASE_ANON_KEY: "eyJ..." }
```

### Issue: "Failed to load analytics-setup.js"

**Solution:** Already fixed! The file is now at `/public/assets/js/analytics-setup.js`

### Issue: "Network error" when submitting

**Checklist:**
- ✅ Supabase project is active
- ✅ Tables are created
- ✅ RLS policies are set
- ✅ Credentials are correct
- ✅ Internet connection is working

### Issue: Form submits but no data in Supabase

**Check:**
1. **Table name matches:**
   ```javascript
   // In creator-form-handler.js
   const { data, error } = await client
       .from('creator_applications')  // ← Must match table name
       .insert([formData]);
   ```

2. **RLS policy allows inserts:**
   ```sql
   -- Run in SQL Editor
   SELECT * FROM pg_policies WHERE tablename = 'creator_applications';
   ```

---

## 📊 View Submissions

### In Supabase Dashboard

1. **Go to Table Editor**
2. **Select `creator_applications`**
3. **See all submissions**

### Export Data

```sql
-- Export as CSV
COPY creator_applications TO '/tmp/creators.csv' CSV HEADER;
```

---

## 🔐 Security Best Practices

### ✅ DO:
- Use environment variables for credentials
- Enable Row Level Security (RLS)
- Use `anon` key for public forms
- Validate data on client and server

### ❌ DON'T:
- Commit credentials to git
- Hardcode API keys in files
- Disable RLS in production
- Trust client-side validation alone

---

## 📝 Files Modified

```
✅ /public/env-config.js          - Environment configuration
✅ /public/assets/js/supabase-config.js  - Supabase client setup
✅ /public/assets/js/analytics-setup.js  - Moved to correct location
✅ /public/creator-application.html      - Fixed script paths
```

---

## 🚀 Quick Commands

```bash
# Local development
npm run dev

# Deploy to Vercel
vercel --prod

# Check Supabase connection
# Open browser console and run:
window.getSupabaseClient()
```

---

## 📚 Resources

- **Supabase Docs:** https://supabase.com/docs
- **Supabase Dashboard:** https://supabase.com/dashboard
- **Vercel Env Vars:** https://vercel.com/docs/environment-variables
- **SQL Reference:** https://supabase.com/docs/guides/database

---

## ✅ Checklist

Before deploying:

- [ ] Supabase project created
- [ ] Database tables created
- [ ] RLS policies enabled
- [ ] Local env-config.js updated
- [ ] Vercel environment variables set
- [ ] Form tested locally
- [ ] Form tested on production
- [ ] Submissions appearing in Supabase

---

## 💬 Need Help?

If you're still having issues:

1. Check browser console for errors
2. Check Supabase logs (Dashboard → Logs)
3. Verify environment variables are set
4. Test with a simple insert in SQL Editor

---

**Your forms will work perfectly after this setup! 🎉**
