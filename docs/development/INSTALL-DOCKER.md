# 🐳 Docker Installation Guide for macOS

## Quick Installation

### Option 1: Docker Desktop (Recommended)
1. **Download Docker Desktop**: https://www.docker.com/products/docker-desktop/
2. **Install** the downloaded .dmg file
3. **Launch Docker Desktop** from Applications
4. **Wait** for Docker to start (whale icon in menu bar)

### Option 2: Using Homebrew
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Docker Desktop via Homebrew
brew install --cask docker

# Launch Docker Desktop
open /Applications/Docker.app
```

## After Installation

1. **Verify Docker is working**:
   ```bash
   docker --version
   docker-compose --version
   ```

2. **Run the analytics setup**:
   ```bash
   cd /Users/supriyopaul/Downloads/ugcAgency-main
   ./setup-analytics.sh
   ```

3. **Access your analytics**: http://localhost:3000

## Alternative: Cloud-Free Database Option

If you prefer not to use Docker, I can set up a **file-based SQLite version** instead:

```bash
# This would use SQLite instead of PostgreSQL
# No Docker required, but less scalable
npm install -g umami
umami init
umami start
```

## What to Choose?

- **Docker (Recommended)**: More professional, scalable, production-ready
- **SQLite**: Simpler setup, good for testing, less features

Let me know which option you prefer!
