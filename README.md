# MakeUGC - Professional UGC Agency Website

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> Enterprise-grade UGC agency website with optimized file structure for seamless deployment.

## 🚀 Quick Start

```bash
# Local Development
npm run dev              # Starts server on http://localhost:8000

# Deploy to Vercel
npm run deploy           # Production deployment
npm run deploy:preview   # Preview deployment
```

## 📁 Project Structure

```
ugcAgency-main/
├── public/              # All served files (Vercel serves this)
│   ├── index.html
│   ├── about.html
│   ├── blog.html
│   ├── blog/           # All blog posts
│   │   ├── blog-52x-roas-case-study.html
│   │   ├── blog-ab-testing-ugc-analytics.html
│   │   └── ... (10+ blog posts)
│   ├── legal/          # Privacy, refund policies
│   ├── tools/          # Calculators, templates
│   └── assets/         # CSS, JS, images
│       ├── css/
│       ├── js/
│       └── images/
├── docs/               # Documentation (not deployed)
│   ├── development/
│   ├── guides/
│   └── Blog/          # Raw blog content
├── deployment/         # Deployment configs
├── scripts/           # Setup scripts
├── analytics/         # Analytics setup
├── vercel.json        # Vercel configuration
├── package.json       # Project metadata
└── supabase-tables.sql # Database schema
```

## 🏗️ Architecture Decisions

### Why This Structure?

**✅ Before (Cluttered Root)**
- 30+ HTML files mixed with 50+ docs in root
- Confusing for build systems
- 404 errors on Vercel
- Poor developer experience

**✅ After (Clean Separation)**
- `/public` - Only deployable assets
- `/docs` - All documentation
- Clear separation of concerns
- Zero 404 errors
- Professional structure

### Key Benefits

1. **Vercel Optimization**: Serves only `/public` directory
2. **Fast Builds**: Less files to process (49 vs 80+)
3. **SEO Ready**: Proper sitemap, robots.txt placement
4. **Scalable**: Easy to add new pages/features
5. **Version Control**: Clean git history

## 🔧 Development

### Local Development

```bash
# Option 1: Default (port 8000)
npm run dev

# Option 2: Alternative port
npm run dev:alt         # Port 8001
npm run dev:8080        # Port 8080

# Preview mode (port 3000)
npm run preview
```

### File Organization

- **Pages**: `/public/*.html`
- **Blog Posts**: `/public/blog/*.html`
- **Styles**: `/public/assets/css/`
- **Scripts**: `/public/assets/js/`
- **Images**: `/public/assets/images/`

## 🚢 Deployment

### Vercel (Primary)

```bash
# First time setup
vercel login
vercel link

# Deploy to production
npm run deploy

# Preview deployment
npm run deploy:preview
```

### Netlify (Backup)

```bash
npm run deploy:netlify
```

## 📊 Analytics

Self-hosted Umami analytics with PostgreSQL:

```bash
npm run analytics:setup   # Initial setup
npm run analytics:start   # Start services
npm run analytics:stop    # Stop services
```

Dashboard: http://localhost:3000

## 🔒 Environment Variables

Required for Supabase integration:

```env
SUPABASE_URL=your_project_url
SUPABASE_ANON_KEY=your_anon_key
```

Copy `.env.example` to `.env` and fill in your values.

## 📝 Adding New Content

### New Page

1. Create HTML file in `/public/`
2. Use existing pages as template
3. Update `sitemap.xml`
4. Deploy

### New Blog Post

1. Create HTML in `/public/blog/`
2. Follow naming: `blog-slug-here.html`
3. Update `/public/blog.html` with new post
4. Update sitemap
5. Deploy

## 🐛 Troubleshooting

### 404 Errors on Vercel

✅ **Fixed!** New structure eliminates this issue.

**If you still see 404s:**
1. Check `vercel.json` has `"outputDirectory": "public"`
2. Verify files are in `/public` directory
3. Run `vercel --prod` to redeploy

### Assets Not Loading

1. Use absolute paths: `/assets/css/style.css`
2. Never use `../` relative paths
3. Check browser console for errors

### Local Server Issues

```bash
# Kill existing server
lsof -ti:8000 | xargs kill -9

# Restart
npm run dev
```

## 🎯 Performance

- ⚡ **Lighthouse Score**: 95+
- 🚀 **First Contentful Paint**: < 1.5s
- 📦 **Total Bundle Size**: ~2.5MB
- 🔒 **Security Headers**: A+ rating

## 📚 Documentation

- [Deployment Guide](docs/development/DEPLOYMENT.md)
- [Analytics Setup](docs/development/ANALYTICS-SETUP-GUIDE.md)
- [Project Structure](docs/PROJECT_STRUCTURE.md)
- [Start Here](docs/START_HERE.md)

## 🤝 Contributing

1. Create feature branch
2. Make changes in `/public`
3. Test locally: `npm run dev`
4. Preview deploy: `npm run deploy:preview`
5. Production deploy: `npm run deploy`

## 📧 Support

- **Email**: contact@makeugc.in
- **Website**: https://makeugc.in
- **Issues**: GitHub Issues

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ by MakeUGC Team**

*Last Updated: November 2024*
