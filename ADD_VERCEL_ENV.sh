#!/bin/bash

# Add Supabase credentials to Vercel
# Requires Vercel CLI: npm install -g vercel

# Set your project ID (replace with your actual project ID)
PROJECT_ID="prj_ugcagencymain"

# Add environment variables
vercel env add SUPABASE_URL production
vercel env add SUPABASE_ANON_KEY production

# Redeploy
vercel --prod
