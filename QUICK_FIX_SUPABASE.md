# 🚨 QUICK FIX: Supabase Connection Issues

## 🔍 **Your Current Errors**
- `ERR_CONNECTION_REFUSED` - Network/connection issue
- `401 Unauthorized` - RLS policies not applied yet

## ⚡ **IMMEDIATE FIX (2 minutes)**

### **Step 1: Run SQL Fix in Supabase Dashboard**

1. **Go to**: https://supabase.com/dashboard
2. **Select project**: `dsmathkrbbyfxalgsuel`
3. **Click**: SQL Editor → New Query
4. **Paste and run this**:

```sql
-- Enable RLS
ALTER TABLE creator_applications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (if any)
DROP POLICY IF EXISTS "creator_applications_public_insert" ON creator_applications;
DROP POLICY IF EXISTS "creator_applications_authenticated_select" ON creator_applications;

-- Create new policies
CREATE POLICY "creator_applications_public_insert"
ON creator_applications FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "creator_applications_authenticated_select"
ON creator_applications FOR SELECT TO authenticated USING (true);
```

### **Step 2: Test the Fix**

1. **Open**: `public/creator-application.html` in browser
2. **Check console** (F12) - you should see:
   - `✅ Supabase library loaded successfully`
   - `✅ Supabase config loaded successfully`
   - `✅ Supabase client created successfully`
   - `✅ Connection to Supabase successful`

3. **Fill and submit** the form

## 🔧 **Enhanced Initialization**

I've improved the Supabase initialization:

✅ **Fixed script loading order** - Added `defer` to prevent race conditions  
✅ **Added debug script** - Shows connection status in real-time  
✅ **Better error detection** - Identifies specific issues  

## 🎯 **Expected Results**

After running the SQL fix:
- ✅ Form submits without errors
- ✅ Success message appears
- ✅ Data appears in Supabase dashboard
- ✅ Green "Supabase Connected" indicator shows

## 🚨 **If Still Not Working**

### Check Network:
```bash
# Test if Supabase is reachable
curl -I https://dsmathkrbbyfxalgsuel.supabase.co
```

### Verify Credentials:
- URL: `https://dsmathkrbbyfxalgsuel.supabase.co` ✅
- Anon Key: Check it's not expired in Supabase Settings → API

### Manual Test:
Open browser console and run:
```javascript
window.debugSupabaseConnection()
```

## 📞 **Contact**
If issues persist: connect@makeugc.in

**The fix should work immediately after running the SQL! 🚀**
