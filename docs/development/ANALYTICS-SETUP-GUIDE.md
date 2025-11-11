# 📊 Professional Umami Analytics Setup Guide for MakeUGC

## Overview

This guide walks you through setting up a professional, privacy-first analytics solution using Umami with PostgreSQL database for your UGC Agency website.

## 🚀 Quick Start

### 1. Prerequisites

- Docker and Docker Compose installed
- Basic terminal/command line knowledge
- Your website domain ready

### 2. Initial Setup

```bash
# Make the setup script executable (if not already)
chmod +x setup-analytics.sh

# Run the setup script
./setup-analytics.sh
```

This will:
- Create secure environment variables
- Start Umami and PostgreSQL containers
- Set up the database automatically
- Provide you with access credentials

### 3. Access Umami Dashboard

1. Open http://localhost:3000 in your browser
2. Login with:
   - **Username**: `admin`
   - **Password**: `umami`
3. **IMPORTANT**: Change the default password immediately!

### 4. Add Your Website

1. In the Umami dashboard, click "Add Website"
2. Enter your website details:
   - **Name**: MakeUGC
   - **Domain**: makeugc.in (or your domain)
   - **Enable share URL**: Optional
3. Click "Save"
4. Copy the **Website ID** (you'll need this)

### 5. Update Configuration

1. Open any HTML file (e.g., `index.html`)
2. Find this line:
   ```javascript
   websiteId: 'YOUR_WEBSITE_ID_HERE',
   ```
3. Replace `YOUR_WEBSITE_ID_HERE` with your actual website ID from step 4
4. For production, update the URLs:
   ```javascript
   scriptUrl: 'https://your-analytics-domain.com/script.js',
   apiUrl: 'https://your-analytics-domain.com/api/collect',
   ```

## 🔧 Advanced Configuration

### Environment Variables

Edit `.env` file to customize:

```bash
# Database password (auto-generated)
POSTGRES_PASSWORD=your_secure_password

# App secret for encryption (auto-generated)
APP_SECRET=your_32_character_secret
```

### Production Deployment

For production, you'll need to:

1. **Deploy Umami to a server**:
   - Use a VPS (DigitalOcean, Linode, etc.)
   - Set up SSL certificate
   - Configure firewall

2. **Update DNS**:
   - Point a subdomain (e.g., analytics.makeugc.in) to your server
   - Update script URLs in HTML files

3. **Secure the setup**:
   - Change default passwords
   - Enable firewall
   - Regular backups

### Custom Domain Setup

If you want to use your own domain (e.g., analytics.makeugc.in):

1. Point your subdomain to your server IP
2. Update `docker-compose.yml`:
   ```yaml
   environment:
     HOSTNAME: analytics.makeugc.in
   ```
3. Set up SSL with Let's Encrypt or similar
4. Update HTML files with new URLs

## 📈 Analytics Features

### Automatic Tracking

The integration automatically tracks:

- **Page views**: Every page visit
- **CTA clicks**: All buttons with `.btn-cta` or `.btn-primary` classes
- **Form submissions**: All form submissions
- **Scroll depth**: 25%, 50%, 75%, 90%, 100%
- **Engagement time**: Time spent actively on page
- **File downloads**: PDF, DOC, ZIP files, etc.

### Custom Events

You can track custom events:

```javascript
// Track a custom conversion
window.ugcAnalytics.trackConversion(299, 'INR');

// Track a custom goal
window.ugcAnalytics.trackGoal('newsletter-signup');

// Track any custom event
window.ugcAnalytics.trackCustomEvent('video-play', {
    video_title: 'UGC Strategy Guide',
    duration: 120
});
```

### Privacy Features

- **GDPR Compliant**: Users can opt-out
- **No Personal Data**: Only anonymous analytics
- **No Cookies**: Uses localStorage for consent
- **Do Not Track**: Respects browser DNT header

## 🛠 Management

### Backup Database

```bash
# Run the backup script
./backup-analytics.sh
```

Backups are stored in `./backups/` directory and automatically cleaned (keeps last 7).

### View Logs

```bash
# View Umami logs
docker-compose logs umami

# View database logs
docker-compose logs db

# Follow logs in real-time
docker-compose logs -f
```

### Restart Services

```bash
# Restart all services
docker-compose restart

# Restart only Umami
docker-compose restart umami
```

### Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (DANGER: deletes data)
docker-compose down -v
```

## 🔍 Troubleshooting

### Common Issues

1. **"Connection refused" error**:
   - Check if Docker is running
   - Verify ports 3000 and 5432 are available
   - Run: `docker-compose ps` to check service status

2. **Database connection error**:
   - Wait longer for PostgreSQL to initialize
   - Check database logs: `docker-compose logs db`
   - Restart services: `docker-compose restart`

3. **Analytics not tracking**:
   - Check browser console for errors
   - Verify website ID is correct
   - Check privacy consent (localStorage)
   - Enable debug mode: `debug: true` in config

4. **Permission denied on scripts**:
   ```bash
   chmod +x setup-analytics.sh
   chmod +x backup-analytics.sh
   chmod +x integrate-analytics.py
   ```

### Debug Mode

Enable debug mode by setting `debug: true` in the analytics configuration. This will log all tracking events to the browser console.

### Health Checks

Check if services are healthy:

```bash
# Check container status
docker-compose ps

# Check Umami health
curl http://localhost:3000/api/heartbeat

# Check database connection
docker exec ugc-postgres pg_isready -U umami
```

## 📊 Analytics Dashboard

### Key Metrics to Monitor

1. **Traffic Sources**: Where visitors come from
2. **Popular Pages**: Most visited pages
3. **User Behavior**: Scroll depth, engagement time
4. **Conversions**: CTA clicks, form submissions
5. **Performance**: Page load times, bounce rates

### Creating Custom Reports

1. Use the Umami dashboard filters
2. Set date ranges for analysis
3. Export data for external analysis
4. Set up automated reports (if needed)

## 🔐 Security Best Practices

1. **Change Default Passwords**: Immediately after setup
2. **Use Strong Passwords**: For database and admin account
3. **Regular Updates**: Keep Docker images updated
4. **Firewall Configuration**: Only expose necessary ports
5. **SSL/TLS**: Use HTTPS in production
6. **Regular Backups**: Automated database backups
7. **Monitor Access**: Review analytics admin access

## 🌐 Production Checklist

Before going live:

- [ ] Change all default passwords
- [ ] Update website ID in all HTML files
- [ ] Configure production domain URLs
- [ ] Set up SSL certificate
- [ ] Configure firewall rules
- [ ] Test all tracking functionality
- [ ] Set up automated backups
- [ ] Configure monitoring/alerts
- [ ] Update privacy policy to mention analytics
- [ ] Test GDPR compliance features

## 📞 Support

If you encounter issues:

1. Check this guide first
2. Review Docker and Umami logs
3. Check the [Umami documentation](https://umami.is/docs)
4. Verify your configuration files

---

## 🎯 Success Metrics

After setup, you should be able to:

✅ View real-time analytics data  
✅ Track user interactions and conversions  
✅ Monitor website performance  
✅ Respect user privacy preferences  
✅ Generate meaningful business insights  

**Happy analyzing! 📈**
