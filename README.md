# MakeUGC Website

A professional UGC (User Generated Content) agency website built with modern web technologies.

## 🚀 Project Structure

```
ugcAgency-main/
├── 📁 public/                    # Static assets and pages
│   ├── 📁 blog/                 # Blog articles
│   ├── 📁 legal/                # Legal pages (privacy, terms, etc.)
│   └── 📁 tools/                # Interactive tools (calculators, etc.)
├── 📁 src/                      # Source code
│   ├── 📁 components/           # Reusable components
│   ├── 📁 pages/               # Main pages
│   └── 📁 layouts/             # Page layouts
├── 📁 assets/                   # Static assets (CSS, JS, images)
├── 📁 analytics/               # Analytics configuration
├── 📁 deployment/              # Deployment scripts and configs
├── 📁 docs/                    # Documentation
└── 📁 scripts/                 # Build and utility scripts
```

## 🛠️ Features

- **Modern Design**: Clean, professional UGC agency website
- **Blog System**: Comprehensive blog with 9+ articles
- **Interactive Tools**: ROI calculators, content calendars, quizzes
- **Analytics**: Privacy-compliant Umami analytics
- **SEO Optimized**: Proper meta tags, sitemap, structured data
- **Mobile Responsive**: Optimized for all devices
- **Performance**: Fast loading with optimized assets

## 🚀 Quick Start

### Development Server
```bash
# Start local development server
python -m http.server 8000
# or
python -m http.server 8001
```

### Production Deployment
```bash
# Deploy to Netlify
npm run deploy

# Or use Docker
cd deployment/docker
docker-compose up -d
```

## 📖 Key Pages

- **Homepage**: `/index.html` - Main landing page
- **Services**: `/services.html` - Service offerings
- **Blog**: `/blog.html` - Content hub
- **Contact**: `/contact.html` - Contact form
- **About**: `/about.html` - Company information
- **Resources**: `/resources.html` - Free resources

## 🔧 Tools & Calculators

- **ROI Calculator**: `/public/tools/roi-calculator.html`
- **Content Cost Calculator**: `/public/tools/content-cost-calculator.html`
- **Service Quiz**: `/public/tools/service-quiz.html`
- **Creator Brief Template**: `/public/tools/creator-brief-template.html`

## 📊 Analytics

The website uses privacy-compliant Umami analytics:
- Dashboard: `http://localhost:3000`
- Configuration: `/analytics/config/`
- Setup scripts: `/deployment/scripts/`

## 🚢 Deployment

### Netlify (Recommended)
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `./`
4. Deploy automatically on push

### Docker
```bash
cd deployment/docker
docker-compose -f docker-compose.prod.yml up -d
```

## 📝 Content Management

### Blog Articles
All blog content is located in `/public/blog/`:
- A/B Testing UGC strategies
- Creator journey case studies  
- ROAS optimization techniques
- Algorithm updates and insights

### Legal Pages
Standard legal documentation in `/public/legal/`:
- Privacy Policy
- Terms & Conditions
- Refund Policy
- Security Information

## 🔒 Security

- HTTPS enforced in production
- Privacy-compliant analytics
- Secure contact forms via Netlify
- Data protection compliance

## 📱 Performance

- **Core Web Vitals**: Optimized
- **Mobile Speed**: 90+ Lighthouse score
- **SEO**: 100/100 Lighthouse score
- **Accessibility**: WCAG compliant

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📧 Support

- **Email**: contact@makeugc.in
- **Phone**: +91 9239161632
- **Address**: 4G KrishtiKunja, Airport, Kolkata, India

## 📄 License

© 2025 MakeUGC. All rights reserved.
