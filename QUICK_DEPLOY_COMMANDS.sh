#!/bin/bash

# ============================================
# MakeUGC - Quick Deploy to GitHub & Vercel
# ============================================
# Copy and paste these commands one by one
# ============================================

echo "🚀 Starting deployment process..."

# Step 1: Navigate to project directory
cd /Users/supriyopaul/Downloads/ugcAgency-main
echo "✅ In project directory"

# Step 2: Check Git status
git status
echo "📊 Git status checked"

# Step 3: Initialize Git (if needed - skip if already initialized)
# git init
# echo "✅ Git initialized"

# Step 4: Add remote repository
git remote add origin https://github.com/bluebuckres/ugcAgency-main.git
echo "✅ Remote repository added"

# If remote already exists, use this instead:
# git remote remove origin
# git remote add origin https://github.com/bluebuckres/ugcAgency-main.git

# Step 5: Stage all files
git add .
echo "✅ All files staged"

# Step 6: Commit changes
git commit -m "Initial commit: MakeUGC website with Supabase integration

- Added Supabase form integration for creator applications and contact form
- Configured Vercel deployment
- Added comprehensive documentation
- Implemented Row Level Security
- Mobile responsive design
- SEO optimized"
echo "✅ Changes committed"

# Step 7: Set default branch to main
git branch -M main
echo "✅ Branch set to main"

# Step 8: Push to GitHub
git push -u origin main
echo "✅ Pushed to GitHub"

# Step 9: Deploy to Vercel (requires Vercel CLI installed)
# Install Vercel CLI first if needed:
# npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

echo "🎉 Deployment complete!"
echo "📝 Check your Vercel dashboard for the production URL"
