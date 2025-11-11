# ⚡ Supabase Quick Start Guide - 5 Minutes Setup

Get your forms working in just 5 minutes!

## 🎯 What You Need

- [ ] Supabase account (free)
- [ ] 5 minutes of your time
- [ ] Your website files

---

## 📝 Step-by-Step (5 Minutes)

### 1️⃣ Create Supabase Project (2 min)

1. Go to [supabase.com](https://supabase.com) → Sign up (free)
2. Click **"New Project"**
3. Fill in:
   - Name: `makeugc`
   - Password: (create a strong one, save it!)
   - Region: `Mumbai` (or closest to you)
4. Click **"Create new project"**
5. ⏰ Wait 2 minutes for setup...

### 2️⃣ Create Database Tables (1 min)

1. Click **"SQL Editor"** in left sidebar
2. Click **"New Query"**
3. Copy **ALL** content from `supabase-tables.sql` file
4. Paste into the editor
5. Click **"RUN"** (bottom right)
6. ✅ You should see "Success. No rows returned"

### 3️⃣ Get Your Credentials (30 sec)

1. Click **"Settings"** (gear icon) → **"API"**
2. Copy these TWO values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public**: `eyJhbGc...` (long key)

### 4️⃣ Update Configuration (30 sec)

1. Open file: `assets/js/supabase-config.js`
2. Replace:
   ```javascript
   const SUPABASE_CONFIG = {
       url: 'YOUR_SUPABASE_PROJECT_URL',  // ← Paste Project URL here
       anonKey: 'YOUR_SUPABASE_ANON_KEY'  // ← Paste anon key here
   };
   ```
3. Save the file

### 5️⃣ Test It! (1 min)

1. Open `creator-application.html` in browser
2. Fill the form with test data
3. Click Submit
4. ✅ See success message? **You're done!**
5. Go to Supabase → **Table Editor** → `creator_applications` to see your data

---

## 🚀 Deploy to Vercel (or Netlify)

Already done! Just:

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Add Supabase integration"
   git push
   ```

2. Deploy:
   - **Vercel**: `vercel --prod` (See `VERCEL_DEPLOYMENT.md`)
   - **Netlify**: Auto-deploys on push

3. Test on your live site!

---

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] SQL file executed successfully
- [ ] Credentials updated in `supabase-config.js`
- [ ] Creator form tested locally
- [ ] Contact form tested locally
- [ ] Data visible in Supabase Table Editor
- [ ] Deployed to Netlify
- [ ] Forms working on live site

---

## 🆘 Something Not Working?

### Error: "Configuration error"
→ Check `assets/js/supabase-config.js` has correct URL and key

### Error: "Network error"
→ Check your internet connection and Supabase project is active

### Form submits but no data
→ Check Supabase → **Table Editor** → Refresh the page

### Still stuck?
→ Read full guide: `SUPABASE_SETUP_GUIDE.md`

---

## 📊 View Your Submissions

**Supabase Dashboard**:
1. Go to **Table Editor**
2. Click `creator_applications` or `contact_inquiries`
3. See all submissions!

**Export Data**:
- Click table → **Export** → Choose CSV or JSON

---

## 🎉 You're All Set!

Your forms are now:
- ✅ Saving to database
- ✅ Secure (RLS enabled)
- ✅ Working on Netlify
- ✅ Showing success/error messages

**Next**: Set up email notifications when forms are submitted!

---

**Need the detailed guide?** → See `SUPABASE_SETUP_GUIDE.md`
