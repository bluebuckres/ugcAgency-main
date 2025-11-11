#!/bin/bash

# ======================================
# MakeUGC Website Development Server
# ======================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print banner
echo -e "${BLUE}"
echo "=================================================="
echo "🚀 MakeUGC Website Development Server"
echo "=================================================="
echo -e "${NC}"

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo -e "${RED}❌ Python is not installed. Please install Python 3.6+${NC}"
    exit 1
fi

# Default port
PORT=8000
ALT_PORT=8001

# Check if port is provided as argument
if [ ! -z "$1" ]; then
    PORT=$1
fi

# Function to check if port is available
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 1
    else
        return 0
    fi
}

# Function to start server
start_server() {
    local port=$1
    echo -e "${YELLOW}📡 Starting development server on port ${port}...${NC}"
    echo -e "${GREEN}✅ Server running at: http://localhost:${port}${NC}"
    echo -e "${GREEN}✅ Blog posts: http://localhost:${port}/public/blog/${NC}"
    echo -e "${GREEN}✅ Tools: http://localhost:${port}/public/tools/${NC}"
    echo -e "${BLUE}📝 Press Ctrl+C to stop the server${NC}"
    echo ""
    
    # Start Python server
    python -m http.server $port
}

# Check if default port is available
if check_port $PORT; then
    start_server $PORT
else
    echo -e "${YELLOW}⚠️  Port ${PORT} is already in use${NC}"
    
    # Try alternative port
    if check_port $ALT_PORT; then
        echo -e "${YELLOW}🔄 Trying alternative port ${ALT_PORT}...${NC}"
        start_server $ALT_PORT
    else
        echo -e "${RED}❌ Both ports ${PORT} and ${ALT_PORT} are in use${NC}"
        echo -e "${YELLOW}💡 Try: ./scripts/dev-server.sh 3000${NC}"
        exit 1
    fi
fi
