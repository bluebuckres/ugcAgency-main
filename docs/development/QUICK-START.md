# 🚀 Quick Start: Umami Analytics for MakeUGC

## ⚡ Get Started in 5 Minutes

### 1. Run Setup
```bash
./setup-analytics.sh
```

### 2. Access Dashboard
- Open: http://localhost:3000
- Login: admin / umami
- **Change password immediately!**

### 3. Add Website
- Click "Add Website"
- Name: MakeUGC
- Domain: makeugc.in
- Copy the Website ID

### 4. Update Configuration
Replace `YOUR_WEBSITE_ID_HERE` in your HTML files with the actual Website ID from step 3.

**That's it! Your analytics is now tracking visitors.** 📊

## 🎯 What's Already Configured

✅ **31 HTML files** - Analytics integrated automatically  
✅ **Privacy compliance** - GDPR-friendly consent management  
✅ **Advanced tracking** - CTA clicks, forms, scroll depth, engagement  
✅ **Free database** - PostgreSQL with automated backups  
✅ **Professional dashboard** - Real-time analytics and insights  
✅ **Self-hosted** - Complete control over your data  

## 📊 Features Tracking

- Page views and user sessions
- CTA button clicks (conversion tracking)
- Form submissions
- Scroll depth (25%, 50%, 75%, 90%, 100%)
- Time spent on pages
- File downloads
- Custom events and goals

## 🔒 Privacy Features

- No personal data collection
- User consent management
- Respects "Do Not Track"
- GDPR compliant
- No cookies (uses localStorage)

## 📱 Production Ready

When ready for production:
1. Deploy to your server using `docker-compose.prod.yml`
2. Update script URLs in HTML files
3. Configure SSL certificate
4. Update privacy policy

## 📖 Full Documentation

See `ANALYTICS-SETUP-GUIDE.md` for complete setup instructions and troubleshooting.

---

**Need help?** Check the logs: `docker-compose logs -f`
