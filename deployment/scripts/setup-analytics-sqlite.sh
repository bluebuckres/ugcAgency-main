#!/bin/bash

# Alternative Umami Setup with SQLite (No Docker Required)
# This is a simpler setup for testing and development

set -e

echo "🚀 Setting up Umami Analytics with SQLite (No Docker)..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Installing via Homebrew..."
    
    # Check if Homebrew is installed
    if ! command -v brew &> /dev/null; then
        print_status "Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    
    print_status "Installing Node.js..."
    brew install node
fi

# Check if git is available
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Installing via Homebrew..."
    brew install git
fi

print_success "Node.js and Git are available"

# Create umami directory
if [ ! -d "umami" ]; then
    print_status "Cloning Umami repository..."
    git clone https://github.com/umami-software/umami.git
    cd umami
else
    print_status "Using existing Umami directory..."
    cd umami
    git pull origin master
fi

# Install dependencies
print_status "Installing dependencies..."
npm install

# Create environment file
if [ ! -f ".env" ]; then
    print_status "Creating environment configuration..."
    
    # Generate secure app secret
    APP_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
    
    cat > .env << EOF
# Umami Configuration
DATABASE_URL=file:./umami.db
DATABASE_TYPE=sqlite
APP_SECRET=$APP_SECRET
TRACKER_SCRIPT_NAME=script.js
COLLECT_API_ENDPOINT=/api/collect
HOSTNAME=localhost
PORT=3000
EOF
    
    print_success "Environment file created"
else
    print_warning "Environment file already exists"
fi

# Build the application
print_status "Building Umami..."
npm run build

# Initialize database
print_status "Initializing SQLite database..."
npx prisma migrate deploy

# Start the application
print_status "Starting Umami Analytics..."
print_success "Umami is starting up..."

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
echo "1. The server is starting in the background"
echo "2. Open http://localhost:3000 in your browser"
echo "3. Login with admin/umami"
echo "4. Change the default password"
echo "5. Add your website (https://makeugc.in)"
echo "6. Copy the tracking script and website ID"
echo "7. Update the HTML files with your tracking configuration"
echo ""

# Start the server in the background
npm start &
UMAMI_PID=$!

echo "Umami process ID: $UMAMI_PID"
echo "To stop Umami: kill $UMAMI_PID"

# Create stop script
cat > ../stop-analytics.sh << EOF
#!/bin/bash
echo "Stopping Umami Analytics..."
pkill -f "npm.*start"
pkill -f "node.*server.js"
echo "Analytics stopped"
EOF

chmod +x ../stop-analytics.sh

print_success "Umami Analytics setup completed! 🎉"
print_status "Server is running at http://localhost:3000"
