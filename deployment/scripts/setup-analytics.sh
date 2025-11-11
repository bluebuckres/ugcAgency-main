#!/bin/bash

# Professional Umami Analytics Setup Script for MakeUGC
# This script sets up and configures Umami analytics with PostgreSQL

set -e

echo "🚀 Setting up Umami Analytics for MakeUGC..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    if ! docker compose version &> /dev/null; then
        print_error "Docker Compose is not available. Please install Docker Compose."
        exit 1
    fi
    DOCKER_COMPOSE_CMD="docker compose"
else
    DOCKER_COMPOSE_CMD="docker-compose"
fi

print_success "Docker and Docker Compose are available"

# Create environment file if it doesn't exist
if [ ! -f ".env" ]; then
    print_status "Creating environment configuration..."
    
    # Generate secure passwords and secrets
    POSTGRES_PASSWORD=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-25)
    APP_SECRET=$(openssl rand -hex 32)
    
    cat > .env << EOF
# Umami Analytics Configuration
POSTGRES_PASSWORD=$POSTGRES_PASSWORD
APP_SECRET=$APP_SECRET
EOF
    
    print_success "Environment file created with secure passwords"
else
    print_warning "Environment file already exists, using existing configuration"
fi

# Start the services
print_status "Starting Umami Analytics and PostgreSQL..."
$DOCKER_COMPOSE_CMD up -d

# Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 15

# Check if services are running
if $DOCKER_COMPOSE_CMD ps | grep -q "Up"; then
    print_success "Services are running!"
    
    echo ""
    echo "📊 Umami Analytics Dashboard: http://localhost:3000"
    echo ""
    echo "🔐 Default Login Credentials:"
    echo "   Username: admin"
    echo "   Password: umami"
    echo ""
    print_warning "Please change the default password after first login!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Open http://localhost:3000 in your browser"
    echo "2. Login with admin/umami"
    echo "3. Change the default password"
    echo "4. Add your website (https://makeugc.in)"
    echo "5. Copy the tracking script and website ID"
    echo "6. Update the HTML files with your tracking configuration"
    echo ""
    
    # Create a tracking configuration template
    cat > tracking-config.js << EOF
// Add this to your HTML files in the <head> section
// Replace YOUR_WEBSITE_ID with the ID from Umami dashboard

window.UMAMI_CONFIG = {
    websiteId: 'YOUR_WEBSITE_ID', // Get this from Umami dashboard
    scriptUrl: 'http://localhost:3000/script.js', // Update to your domain in production
    apiUrl: 'http://localhost:3000/api/collect', // Update to your domain in production
    trackingEnabled: true,
    debug: false // Set to true for development
};
EOF
    
    print_success "Tracking configuration template created: tracking-config.js"
    
else
    print_error "Failed to start services. Check the logs:"
    $DOCKER_COMPOSE_CMD logs
    exit 1
fi

# Create backup script
cat > backup-analytics.sh << 'EOF'
#!/bin/bash
# Backup Umami Analytics Database

BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/umami_backup_$DATE.sql"

mkdir -p $BACKUP_DIR

echo "Creating backup: $BACKUP_FILE"
docker exec ugc-postgres pg_dump -U umami umami > $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo "Backup created successfully: $BACKUP_FILE"
    
    # Keep only last 7 backups
    ls -t $BACKUP_DIR/umami_backup_*.sql | tail -n +8 | xargs -r rm
    echo "Old backups cleaned up"
else
    echo "Backup failed!"
    exit 1
fi
EOF

chmod +x backup-analytics.sh
print_success "Backup script created: backup-analytics.sh"

echo ""
print_success "Umami Analytics setup completed successfully! 🎉"
