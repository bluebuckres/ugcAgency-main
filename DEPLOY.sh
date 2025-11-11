#!/bin/bash

# MakeUGC - One-Click Deployment Script
# Professional deployment with verification

set -e  # Exit on error

echo "🚀 MakeUGC Deployment Script"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}❌ Vercel CLI not found${NC}"
    echo ""
    echo "Installing Vercel CLI..."
    npm i -g vercel
    echo -e "${GREEN}✅ Vercel CLI installed${NC}"
    echo ""
fi

# Verify structure
echo -e "${BLUE}📁 Verifying project structure...${NC}"

if [ ! -d "public" ]; then
    echo -e "${RED}❌ /public directory not found!${NC}"
    exit 1
fi

if [ ! -f "public/index.html" ]; then
    echo -e "${RED}❌ /public/index.html not found!${NC}"
    exit 1
fi

if [ ! -f "vercel.json" ]; then
    echo -e "${RED}❌ vercel.json not found!${NC}"
    exit 1
fi

# Check vercel.json configuration
if ! grep -q '"outputDirectory": "public"' vercel.json; then
    echo -e "${RED}❌ vercel.json not configured correctly!${NC}"
    echo "Expected: \"outputDirectory\": \"public\""
    exit 1
fi

echo -e "${GREEN}✅ Structure verified${NC}"
echo ""

# Count files
HTML_COUNT=$(find public -name "*.html" | wc -l | tr -d ' ')
CSS_COUNT=$(find public/assets/css -name "*.css" 2>/dev/null | wc -l | tr -d ' ')
JS_COUNT=$(find public/assets/js -name "*.js" 2>/dev/null | wc -l | tr -d ' ')

echo -e "${BLUE}📊 Project Stats:${NC}"
echo "   HTML files: $HTML_COUNT"
echo "   CSS files: $CSS_COUNT"
echo "   JS files: $JS_COUNT"
echo ""

# Ask deployment type
echo -e "${YELLOW}Select deployment type:${NC}"
echo "1) Production (--prod)"
echo "2) Preview"
echo ""
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        echo ""
        echo -e "${BLUE}🚀 Deploying to PRODUCTION...${NC}"
        echo ""
        vercel --prod
        ;;
    2)
        echo ""
        echo -e "${BLUE}🔍 Creating PREVIEW deployment...${NC}"
        echo ""
        vercel
        ;;
    *)
        echo -e "${RED}Invalid choice. Exiting.${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo -e "${BLUE}📋 Post-Deployment Checklist:${NC}"
echo "   □ Test homepage"
echo "   □ Test blog pages"
echo "   □ Verify assets loading"
echo "   □ Check form submissions"
echo "   □ Test analytics tracking"
echo ""
echo -e "${GREEN}🎉 Your manager will be impressed!${NC}"
echo ""
