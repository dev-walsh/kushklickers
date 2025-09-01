# KushKlicker - Portable Setup Guide

## Overview
KushKlicker is a cannabis-themed incremental clicker game with Solana blockchain integration and Telegram bot support. This guide will help you set up the game on any Linux machine for portable deployment.

**✅ REPLIT MIGRATION COMPLETED**: The project has been successfully migrated to the Replit environment with persistent database, bot integrations, and custom branding.

### Latest Updates
- ✅ PostgreSQL database configured and working
- ✅ Telegram and Discord bot frameworks implemented
- ✅ Custom green cannabis theme and logo integration
- ✅ All dependencies installed and TypeScript compilation working

## System Requirements

### Replit Environment (Current)
- ✅ Node.js 20 (installed)
- ✅ All npm dependencies including bot libraries (installed)
- ✅ PostgreSQL database (configured and running)
- ✅ TypeScript compilation (working)
- ✅ Server configuration (optimized for 0.0.0.0:5000)
- ✅ Bot frameworks (Telegram + Discord ready)
- ✅ Custom branding (green cannabis theme and logo)

### Bot Setup ✅ COMPLETED
The bots are now configured via `.env` file:

```env
# Bot Tokens (already configured)
TELEGRAM_BOT_TOKEN=7837565817:AAFXqggBg2KqdHMlOKWa0D7h-CkvnjRu6cw
DISCORD_BOT_TOKEN=MTQxMjA0MzcxODU5NjIzMTIxMA.GYmxtE.pCU1H4r9__P4OMUgSfDWPw32OZGlQzqDZDPHBc

# Server Configuration
PORT=5000
NODE_ENV=development
```

**Status**: ✅ Both bots are active and running

### Database Commands
```bash
# Push schema changes to database
npm run db:push

# Force push (if data loss warning)
npm run db:push --force
```

### For Local/Portable Deployment
- Linux machine (Ubuntu, Debian, or similar)
- Node.js 18+ 
- npm or yarn package manager
- Internet connection for initial setup
- Minimum 2GB RAM, 1GB disk space

## Quick Setup (Portable Installation)

### 1. Copy Game Files
Transfer the entire KushKlicker folder to your target Linux machine:
```bash
# Via USB stick
cp -r /media/usb/kushklicker /home/user/
cd /home/user/kushklicker

# Via SCP
scp -r kushklicker/ user@target-machine:/home/user/
```

### 2. Install Node.js (if not already installed)
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Or download portable Node.js
wget https://nodejs.org/dist/v18.17.0/node-v18.17.0-linux-x64.tar.xz
tar -xf node-v18.17.0-linux-x64.tar.xz
export PATH=$PWD/node-v18.17.0-linux-x64/bin:$PATH
```

### 3. Install Dependencies
```bash
cd kushklicker
npm install
```

### 4. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

Required environment variables:
```bash
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=7837565817:AAFXqggBg2KqdHMlOKWa0D7h-CkvnjRu6cw

# Server Configuration
PORT=5000
NODE_ENV=production

# Solana Configuration (for production)
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_CLUSTER=mainnet-beta
```

### 5. Build for Production
```bash
npm run build
```

### 6. Start the Game
```bash
# Production mode
npm start

# Or development mode (with hot reload)
npm run dev
```

The game will be available at: `http://localhost:5000`

## Network Configuration

### For Local Network Access
To make the game accessible on your local network:
```bash
# The server is already configured to bind to 0.0.0.0:5000
# Find your machine's IP address
ip addr show

# Game will be accessible at: http://YOUR_IP:5000
```

### For Public Access (Optional)
If you want to make the game publicly accessible:

1. **Using ngrok (temporary)**:
```bash
# Install ngrok
wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
unzip ngrok-stable-linux-amd64.zip

# Expose port 5000
./ngrok http 5000
```

2. **Using reverse proxy (permanent)**:
Set up nginx or Apache to proxy requests to port 5000.

## Telegram Bot Setup

### 1. Verify Bot Token
Your bot token is already configured: `7837565817:AAFXqggBg2KqdHMlOKWa0D7h-CkvnjRu6cw`

### 2. Enable Telegram Integration
```bash
# Install Telegram packages
npm install node-telegram-bot-api @types/node-telegram-bot-api dotenv

# Uncomment the Telegram bot code in server/telegram-bot.ts
nano server/telegram-bot.ts
```

### 3. Start Bot
```bash
# Add to server/index.ts
echo "import './telegram-bot';" >> server/index.ts

# Restart the application
npm start
```

### 4. Test Bot
1. Search for your bot on Telegram: `@YourBotName`
2. Send `/start` command
3. Bot should respond with game link and options

## Solana Wallet Integration

### 1. Install Solana Dependencies
```bash
npm install @solana/web3.js @solana/wallet-adapter-base @solana/wallet-adapter-phantom @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets
```

### 2. Enable Solana Features
Uncomment the Solana wallet code in:
- `client/src/components/wallet/solana-wallet.tsx`
- Update import statements

### 3. Configure Network
For mainnet deployment, update `.env`:
```bash
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_CLUSTER=mainnet-beta
```

## Database Configuration (Optional)

### For Persistent Data Storage
By default, the game uses in-memory storage. For production:

1. **Install PostgreSQL**:
```bash
sudo apt-get install postgresql postgresql-contrib
```

2. **Create Database**:
```bash
sudo -u postgres createdb kushklicker
```

3. **Update Environment**:
```bash
DATABASE_URL=postgresql://postgres:password@localhost:5432/kushklicker
```

4. **Run Migrations**:
```bash
npm run db:push
```

## Security Considerations

### 1. Firewall Setup
```bash
# Allow only necessary ports
sudo ufw allow 5000/tcp
sudo ufw enable
```

### 2. SSL/HTTPS (Recommended for production)
Use nginx with Let's Encrypt or place behind a reverse proxy.

### 3. Environment Variables
Never commit `.env` file to version control. Keep your Telegram bot token secure.

## Troubleshooting

### Common Issues

**Port Already in Use**:
```bash
# Find process using port 5000
sudo lsof -i :5000
# Kill the process
sudo kill -9 <PID>
```

**Permission Denied**:
```bash
# Make sure you have proper permissions
chmod +x node_modules/.bin/*
```

**Node.js Version Issues**:
```bash
# Check Node.js version
node --version
# Should be 18+
```

**Memory Issues**:
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
```

## Portable Deployment Checklist

- [ ] Copy all game files to target machine
- [ ] Install Node.js 18+
- [ ] Run `npm install`
- [ ] Configure `.env` file
- [ ] Build with `npm run build`
- [ ] Test with `npm start`
- [ ] Verify game loads at http://localhost:5000
- [ ] Test Telegram bot (if enabled)
- [ ] Test Solana wallet connection (if enabled)
- [ ] Configure network access as needed

## Performance Optimization

### For Low-Resource Machines
```bash
# Use production build only
NODE_ENV=production npm start

# Reduce memory usage
export NODE_OPTIONS="--max-old-space-size=1024"
```

### For High-Traffic Deployment
- Use PM2 for process management
- Set up load balancing with nginx
- Consider Redis for session storage

## Support

For technical support or questions:
- Check the logs: `tail -f server.log`
- Review browser console for frontend issues
- Verify all environment variables are set correctly

The game is designed to be fully self-contained and portable once properly configured.