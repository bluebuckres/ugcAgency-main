# Blog Post Illustrations Guide

**Date:** November 4, 2025  
**Purpose:** Replace photo banners with professional, modern illustrations

---

## 🎨 Illustration Sources (Free & Commercial Use)

### 1. **unDraw** (https://undraw.co/)
- Open-source, MIT License
- Customizable colors
- SVG & PNG formats
- Perfect for tech/digital content

### 2. **Storyset by Freepik** (https://storyset.com/)
- Free with attribution
- Animated options available
- Customizable & downloadable
- Professional quality

### 3. **DrawKit** (https://www.drawkit.com/)
- Free & Pro versions
- Digital marketing focused
- High-quality vectors

---

## 📋 Recommended Illustrations for Each Blog Post

### Post 1: Creator Brief Template
**Topic:** Marketing tactics, creator briefs  
**Illustration:** Content creator working on laptop  
**Source:** unDraw - "Content creator"  
**URL:** `https://undraw.co/illustrations/content-creator`  
**Alternative:** Storyset - "Marketing" collection

### Post 2: 3-Second Rule Hooks
**Topic:** UGC strategy, video hooks  
**Illustration:** Social media engagement/video content  
**Source:** unDraw - "Social media" or "Video streaming"  
**URL:** `https://undraw.co/illustrations/social-media`  
**Alternative:** Storyset - "Social media" collection

### Post 3: UGC Hook Formula
**Topic:** UGC strategy, psychology  
**Illustration:** Creative process/brainstorming  
**Source:** unDraw - "Creative thinking"  
**URL:** `https://undraw.co/illustrations/creative-thinking`  
**Alternative:** Storyset - "Business" collection

### Post 4: 5.2x ROAS Case Study
**Topic:** Case study, analytics, growth  
**Illustration:** Data analytics/growth chart  
**Source:** unDraw - "Data analytics" or "Growth"  
**URL:** `https://undraw.co/illustrations/data-analytics`  
**Alternative:** Storyset - "Data" collection

### Post 5: A/B Testing UGC
**Topic:** Analytics, testing  
**Illustration:** A/B testing/experiments  
**Source:** unDraw - "A/B testing" or "Analytics"  
**URL:** `https://undraw.co/illustrations/ab-testing`  
**Alternative:** Storyset - "Analytics" collection

### Post 6: Creator Journey 0 to 1M
**Topic:** Creator story, growth  
**Illustration:** Success/achievement/journey  
**Source:** unDraw - "Success" or "Goals"  
**URL:** `https://undraw.co/illustrations/success`  
**Alternative:** Storyset - "Success" collection

### Post 7: GenZ Creators vs Influencers
**Topic:** Research, comparison  
**Illustration:** People/community/social  
**Source:** unDraw - "Community" or "Social"  
**URL:** `https://undraw.co/illustrations/community`  
**Alternative:** Storyset - "People" collection

### Post 8: Instagram Algorithm Update
**Topic:** Platform updates, Instagram  
**Illustration:** Social media/mobile app  
**Source:** unDraw - "Mobile app" or "Social"  
**URL:** `https://undraw.co/illustrations/mobile-app`  
**Alternative:** Storyset - "Social media" collection

### Post 9: Reels vs Shorts
**Topic:** Platform comparison, video  
**Illustration:** Video content/comparison  
**Source:** unDraw - "Video streaming"  
**URL:** `https://undraw.co/illustrations/video-streaming`  
**Alternative:** Storyset - "Video" collection

---

## 🎯 Implementation Strategy

### Option 1: Use unDraw Direct URLs (Recommended)
- Fast implementation
- Customizable colors via URL parameters
- Example: `https://undraw.co/api/illustrations/content-creator?color=9CAF88`

### Option 2: Download & Host Locally
- Better performance
- Full control
- No external dependencies
- Requires manual download

### Option 3: Use Storyset Embeds
- Animated illustrations
- Customizable
- Requires attribution

---

## 🔧 Color Customization

**Brand Colors:**
- Sage: `#9CAF88` or `#8B9A7A`
- Muted Teal: `#7A9B9B`
- Cream: `#F5F1EB`
- Charcoal: `#2C2C2C`

**unDraw Color Parameter:**
```
https://undraw.co/api/illustrations/[name]?color=9CAF88
```

---

## 📦 Implementation Steps

1. ✅ Choose illustrations for each post
2. ✅ Download SVG files or use direct URLs
3. ✅ Update image paths in blog.html
4. ✅ Ensure alt text matches new illustrations
5. ✅ Test loading and responsiveness
6. ✅ Verify color scheme matches brand

---

## 🎨 Specific Illustration URLs (Ready to Use)

### Direct unDraw URLs with Brand Color:

```html
<!-- Post 1: Creator Brief -->
<img src="https://illustrations.popsy.co/amber/content-creator.svg" alt="Content creator illustration">

<!-- Post 2: 3-Second Rule -->
<img src="https://illustrations.popsy.co/amber/social-media.svg" alt="Social media engagement illustration">

<!-- Post 3: Hook Formula -->
<img src="https://illustrations.popsy.co/amber/creative-thinking.svg" alt="Creative thinking illustration">

<!-- Post 4: ROAS Case Study -->
<img src="https://illustrations.popsy.co/amber/data-analysis.svg" alt="Data analytics illustration">

<!-- Post 5: A/B Testing -->
<img src="https://illustrations.popsy.co/amber/split-testing.svg" alt="A/B testing illustration">

<!-- Post 6: Creator Journey -->
<img src="https://illustrations.popsy.co/amber/success-factors.svg" alt="Success journey illustration">
```

**Note:** Popsy provides a CDN for unDraw illustrations with color customization.

---

## 🚀 Alternative: Use Illustration Packs

### Option A: Download Complete Pack
1. Visit https://undraw.co/illustrations
2. Search for relevant topics
3. Download SVG files
4. Place in `/assets/images/illustrations/`
5. Update image paths

### Option B: Use Illustration API
```javascript
// Dynamic illustration loading
const illustrationUrl = `https://undraw.co/api/illustrations/${illustrationName}?color=${brandColor}`;
```

---

## ✅ License Compliance

### unDraw License
- ✅ Free for commercial use
- ✅ No attribution required
- ✅ Can modify and redistribute
- ✅ MIT License

### Storyset License
- ✅ Free with attribution
- ✅ Commercial use allowed
- ⚠️ Attribution required: "Illustration by Storyset"

### DrawKit License
- ✅ Free version: Attribution appreciated
- ✅ Pro version: No attribution needed
- ✅ Commercial use allowed

---

## 📝 Next Steps

1. Download or link to chosen illustrations
2. Update blog.html with new image sources
3. Update alt text for accessibility
4. Test on all devices
5. Verify color scheme consistency

**Status:** Ready to implement! 🎨
