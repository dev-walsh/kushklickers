# KushKlicker - Cannabis-Themed Telegram Web Game

A cannabis-themed incremental clicker game optimized for Telegram Web Apps with clean, mobile-first design. Players click to earn KUSH tokens, purchase upgrades, unlock achievements, and compete on leaderboards.

**✅ FULLY FUNCTIONAL** - Game is working perfectly with Telegram integration, visible navigation, and persistent database storage.

**🚫 GAMBLING-FREE** - All casino/gambling features have been removed for Telegram compliance.

## 🎮 Game Features

- **Incremental Clicker Mechanics**: Click to earn KUSH tokens with upgrades
- **Telegram Integration**: Supports Telegram user IDs and @username referrals
- **Achievement System**: Goal-based rewards and progress tracking
- **Leaderboard**: Compete with other players for top rankings
- **Mobile-First Design**: Optimized for Telegram WebView and mobile browsers
- **Responsive Navigation**: Bottom navigation for mobile, sidebar for desktop
- **Real-time Updates**: Live game statistics and progress tracking

## 🚀 Current Status

### ✅ Working Features
- ✅ Core clicking mechanics with visual feedback
- ✅ Upgrade system and shop with scaling costs
- ✅ Achievement tracking with progress bars
- ✅ Leaderboard rankings with real-time updates
- ✅ Telegram user integration (user ID + @username)
- ✅ Mobile responsive design with visible navigation icons
- ✅ PostgreSQL database with persistent storage
- ✅ Bot frameworks ready for activation

### 🔧 Recent Fixes (Latest Session)
- ✅ **Navigation Icons Fixed**: Added Font Awesome, all buttons now visible
- ✅ **Gambling Content Removed**: Complete removal of casino features
- ✅ **Telegram Integration**: Added telegram_user_id field and @username referrals
- ✅ **Database Updated**: Schema supports Telegram user data
- ✅ **Bot Error Handling**: Graceful failure when tokens are invalid

### ⚠️ Minor Issues
- 6 non-blocking TypeScript diagnostics in game.tsx
- Some bot tokens may need updating (handled gracefully)

## 🚀 Quick Start

### Replit Environment (Current)
The application is ready to run! Simply use the "Start application" workflow.

```bash
# The game should already be running on port 5000
# Database is configured and working
# All dependencies are installed
```

**Game URL**: Available through the Replit webview or Telegram WebView

### For Local Development
```bash
# Install dependencies
npm install

# Set up database (if not already done)
npm run db:push

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

## 📱 Telegram Integration

### User System
- **Telegram User IDs**: Automatic detection and storage of Telegram user data
- **Username Integration**: Supports @username format for referrals
- **WebView Optimization**: Optimized for Telegram WebView environment

### Bot Features (Ready for Activation)
- **Telegram Bot**: Framework implemented, ready for commands
- **Discord Bot**: Optional integration with error handling
- **Player Linking**: Connect Telegram accounts to game progress
- **Stats Queries**: View game statistics through bot commands

### Bot Setup (Optional)
Bot tokens are configured in `.env` but may need updating:
```bash
# Telegram Bot (configured but may need new token)
TELEGRAM_BOT_TOKEN=your_new_token_here

# Discord Bot (optional)
DISCORD_BOT_TOKEN=your_discord_token_here
```

## 💰 Solana Integration (Prepared)

Solana wallet connection framework is ready but requires package installation:

```bash
npm install @solana/web3.js @solana/wallet-adapter-base @solana/wallet-adapter-phantom @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets
```

Then enable the implementation in `client/src/components/wallet/solana-wallet.tsx`

## 🗄️ Database Configuration

### Current Setup (PostgreSQL)
- ✅ **Neon PostgreSQL**: Configured and working
- ✅ **Drizzle ORM**: Type-safe database operations
- ✅ **Telegram Fields**: telegram_user_id and username support
- ✅ **Persistent Storage**: Player data survives server restarts

### Database Operations
```bash
# Push schema changes
npm run db:push

# Force push (if warnings about data loss)
npm run db:push --force
```

## 🎯 Game Mechanics

### Core Loop
1. **Click to Earn**: Tap the KUSH button to earn tokens
2. **Buy Upgrades**: Increase click power and passive income
3. **Complete Achievements**: Unlock rewards and bonuses
4. **Climb Leaderboard**: Compete with other players

### Progression System
- **Click Multipliers**: Increase KUSH earned per click
- **Auto Income**: Passive KUSH generation over time
- **Achievement Rewards**: Bonus KUSH for completing goals
- **Scaling Costs**: Upgrades become more expensive as you progress

## 🏗️ Architecture

### Frontend
- **React 18 + TypeScript**: Modern component-based UI
- **Tailwind CSS**: Cannabis-themed green color scheme
- **shadcn/ui**: Accessible component system
- **Font Awesome**: Navigation and UI icons
- **TanStack Query**: Server state management
- **Wouter**: Client-side routing

### Backend
- **Express.js + TypeScript**: RESTful API server
- **PostgreSQL + Drizzle**: Type-safe database operations
- **Zod Validation**: Runtime type checking
- **Bot Frameworks**: Telegram and Discord integration ready

### Key Files
- `client/src/pages/game.tsx` - Main game interface
- `client/src/components/navigation/` - Mobile/desktop navigation
- `server/routes.ts` - API endpoints
- `server/storage.ts` - Database operations
- `shared/schema.ts` - Database schema with Telegram fields

## 🛠️ Development Guidelines

### For AI Agents
1. **Test First**: Always verify the game loads and clicking works
2. **Mobile Priority**: Design for Telegram WebView (mobile-first)
3. **No Gambling**: Do not add casino/gambling features
4. **Telegram Focus**: Consider Telegram user experience in all changes
5. **Database Safety**: Use `npm run db:push` for schema changes

### Common Tasks
- **Add Features**: Start in `client/src/components/game/`
- **UI Changes**: Update `client/src/index.css` for styling
- **API Changes**: Modify `server/routes.ts` and `server/storage.ts`
- **Navigation**: Edit `client/src/components/navigation/`
- **Bot Updates**: Enhance `server/telegram-bot.ts`

## 🔧 Configuration

### Environment Variables
```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# Database (configured automatically in Replit)
DATABASE_URL=postgresql://...

# Bot Tokens (optional, gracefully handled if missing)
TELEGRAM_BOT_TOKEN=your_token_here
DISCORD_BOT_TOKEN=your_token_here

# Solana (for future use)
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_CLUSTER=mainnet-beta
```

## 🚀 Deployment

### Replit (Current)
- ✅ Fully configured and working
- ✅ Database connected and populated
- ✅ All dependencies installed
- ✅ Server optimized for Replit infrastructure

### Telegram Web App
1. Configure bot with web app URL
2. Test in Telegram WebView
3. Verify touch interactions work
4. Ensure all navigation is accessible

### Production Deployment
1. Set up production database
2. Configure environment variables
3. Build application: `npm run build`
4. Start production server: `npm start`
5. Set up monitoring and backups

## 📚 Documentation

- **[DEVELOPER.md](DEVELOPER.md)** - Complete technical documentation
- **[SETUP.md](SETUP.md)** - Detailed setup and deployment guide
- **[replit.md](replit.md)** - Project architecture and preferences

## 🔒 Security

### Current Measures
- Input validation with Zod schemas
- Environment variable configuration
- Graceful bot error handling
- Database query parameterization

### Recommended Improvements
- Rate limiting for API endpoints
- Anti-cheat mechanisms
- Enhanced session management
- Telegram user verification

## 🏆 Future Roadmap

### Phase 1: Polish
- [ ] Fix remaining TypeScript diagnostics
- [ ] Add automated testing
- [ ] Implement rate limiting
- [ ] Enhanced error handling

### Phase 2: Features
- [ ] Complete Solana wallet integration
- [ ] Enhanced bot commands
- [ ] Prestige system
- [ ] Social features expansion

### Phase 3: Scale
- [ ] Performance optimization
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Advanced game mechanics

## 🤝 Support

### For Developers
- Check console logs for errors
- Verify database connection
- Test in both desktop and mobile/Telegram WebView
- Review TypeScript diagnostics for guidance

### For Users
- Game designed for mobile/Telegram WebView
- Click the KUSH button to earn tokens
- Navigate using bottom menu (mobile) or side menu (desktop)
- Check leaderboard to see your ranking

---

**Status**: ✅ Fully functional cannabis-themed clicker game optimized for Telegram WebView with persistent database storage and clean mobile design.

**Last Updated**: September 2025 - Removed gambling features, added Telegram integration, fixed navigation visibility.