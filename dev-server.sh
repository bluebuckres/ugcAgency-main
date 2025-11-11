#!/bin/bash

# MakeUGC Local Development Server
# Serves the site from /public directory

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Default port
PORT=${1:-8080}

echo -e "${BLUE}🚀 Starting MakeUGC Development Server${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check if port is in use
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${YELLOW}⚠️  Port $PORT is already in use${NC}"
    echo -e "${YELLOW}   Killing existing server...${NC}"
    lsof -ti:$PORT | xargs kill -9 2>/dev/null || true
    sleep 1
fi

# Get absolute path to public directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PUBLIC_DIR="$SCRIPT_DIR/public"

# Check if public directory exists
if [ ! -d "$PUBLIC_DIR" ]; then
    echo -e "${RED}❌ Error: /public directory not found!${NC}"
    echo -e "${RED}   Expected at: $PUBLIC_DIR${NC}"
    exit 1
fi

# Check if index.html exists
if [ ! -f "$PUBLIC_DIR/index.html" ]; then
    echo -e "${RED}❌ Error: index.html not found in /public!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Server starting from: /public${NC}"
echo -e "${GREEN}✅ Port: $PORT${NC}"
echo ""
echo -e "${BLUE}📡 Local URLs:${NC}"
echo -e "   ${GREEN}http://localhost:$PORT${NC}"
echo -e "   ${GREEN}http://127.0.0.1:$PORT${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Start server from public directory
cd "$PUBLIC_DIR" && python3 -m http.server $PORT
