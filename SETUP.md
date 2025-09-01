# KushKlicker - Setup Guide for AI Agents

## Overview
KushKlicker is a cannabis-themed incremental clicker game optimized for Telegram Web Apps. This guide helps AI agents understand the current setup and make effective changes.

**✅ CURRENT STATUS**: Fully functional in Replit environment with Telegram integration, visible navigation, and persistent database storage.

## Quick Assessment Checklist

### ✅ Verify Working State
1. **Check Application**: Ensure "Start application" workflow is running
2. **Test Game**: Verify clicking works and earns KUSH tokens
3. **Check Navigation**: All icons should be visible (Mine, Upgrades, Goals, etc.)
4. **Database Status**: PostgreSQL should be connected and working
5. **Mobile Test**: Game should work in mobile/WebView environment

### ⚠️ Known Minor Issues
- 6 TypeScript diagnostics in `client/src/pages/game.tsx` (non-blocking)
- Some bot tokens may be invalid (handled gracefully)

## Current Architecture

### System Requirements Met
- ✅ **Node.js 20**: Installed and working
- ✅ **PostgreSQL Database**: Neon database configured with Telegram support
- ✅ **Dependencies**: All npm packages installed including bot libraries
- ✅ **TypeScript**: Compilation working with minor diagnostics
- ✅ **Font Awesome**: CDN loaded for navigation icons
- ✅ **Mobile Optimization**: Telegram WebView ready

### Database Schema (Current)
```sql
-- Players table with Telegram integration
CREATE TABLE players (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_user_id TEXT,              -- Telegram user ID
  username TEXT NOT NULL UNIQUE,      -- @username format for referrals
  total_kush INTEGER DEFAULT 0,
  total_clicks INTEGER DEFAULT 0,
  per_click_multiplier INTEGER DEFAULT 1,
  auto_income_per_hour INTEGER DEFAULT 0,
  claimable_tokens INTEGER DEFAULT 0,
  wallet_address TEXT,
  referred_by TEXT,                   -- Stores @username of referrer
  created_at TIMESTAMP DEFAULT now(),
  last_active TIMESTAMP DEFAULT now()
);

-- Standard game tables: upgrades, achievements, player_upgrades, player_achievements
```

### Environment Configuration
```bash
# Current .env configuration
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://...          # Configured automatically

# Bot tokens (may need updating)
TELEGRAM_BOT_TOKEN=7837565817:AAFXqggBg2KqdHMlOKWa0D7h-CkvnjRu6cw
DISCORD_BOT_TOKEN=MTQxMjA0MzcxODU5NjIzMTIxMA.GYmxtE.pCU1H4r9__P4OMUgSfDWPw32OZGlQzqDZDPHBc

# Solana (prepared for future use)
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
SOLANA_CLUSTER=mainnet-beta
```

## Recent Changes (Latest Session)

### ✅ Completed Fixes
1. **Navigation Icons**: Added Font Awesome CDN to `client/index.html`
2. **Casino Removal**: Completely removed gambling features
   - Deleted `client/src/components/casino/`
   - Updated navigation components
   - Removed casino-related CSS
3. **Telegram Integration**: 
   - Added `telegram_user_id` field to database
   - Updated user creation to use Telegram data
   - Modified referral system to use @username format
4. **Bot Error Handling**: Discord bot gracefully handles invalid tokens

### Files Modified
- `client/index.html` - Added Font Awesome CDN
- `shared/schema.ts` - Added telegram_user_id field
- `client/src/hooks/use-game-state.ts` - Telegram user detection
- `client/src/components/navigation/` - Removed casino navigation
- `client/src/pages/game.tsx` - Removed casino section
- `server/discord-bot.ts` - Improved error handling

## Development Workflow

### Standard Commands
```bash
# Start development (should already be running)
npm run dev

# Type checking
npm run check

# Database operations
npm run db:push              # Apply schema changes
npm run db:push --force      # Force apply (data loss warning)

# Production build
npm run build
npm start
```

### Testing Checklist
1. **Basic Functionality**:
   - [ ] Game loads without errors
   - [ ] Clicking earns KUSH tokens
   - [ ] Navigation icons are visible
   - [ ] All sections load (Mine, Upgrades, Goals, Leaderboard, Wallet, Referral)

2. **Mobile/Telegram**:
   - [ ] Bottom navigation works on mobile
   - [ ] Touch interactions responsive
   - [ ] Telegram WebView compatibility

3. **Database**:
   - [ ] Player data persists
   - [ ] Upgrades save correctly
   - [ ] Leaderboard updates

## API Endpoints (Current)

### Player Management
- `GET /api/players/:identifier` - Get player by ID or username
- `POST /api/players` - Create player (supports Telegram user data)
- `PATCH /api/players/:id` - Update player stats
- `POST /api/players/:id/click` - Process click (currently working)

### Game Data
- `GET /api/upgrades` - Get available upgrades
- `GET /api/players/:id/upgrades` - Get player upgrades
- `POST /api/players/:id/upgrades` - Purchase upgrade
- `GET /api/achievements` - Get all achievements
- `GET /api/players/:id/achievements` - Get player achievements
- `GET /api/leaderboard` - Get top players

## Component Structure

### Navigation Components
```
client/src/components/navigation/
├── header.tsx              # Top header with logo
├── mobile-nav.tsx          # Bottom navigation for mobile
└── desktop-nav.tsx         # Side navigation for desktop
```

### Game Components
```
client/src/components/game/
├── main-clicker.tsx        # Central clicking interface
└── stats-display.tsx      # Real-time statistics
```

### Feature Components
```
client/src/components/
├── upgrades/upgrade-list.tsx     # Upgrade shop
├── achievements/achievement-list.tsx # Achievement tracking
├── leaderboard/leaderboard.tsx   # Player rankings
├── wallet/wallet-section.tsx     # Solana wallet (framework)
└── referral/referral-section.tsx # Telegram @username referrals
```

## Common AI Agent Tasks

### Adding New Game Features
1. **Location**: Start in `client/src/components/game/`
2. **Pattern**: Follow existing component structure
3. **API**: Add endpoints to `server/routes.ts`
4. **Database**: Update `shared/schema.ts` if needed

### Modifying Navigation
1. **Mobile**: Edit `client/src/components/navigation/mobile-nav.tsx`
2. **Desktop**: Edit `client/src/components/navigation/desktop-nav.tsx`
3. **Header**: Modify `client/src/components/navigation/header.tsx`
4. **Icons**: Ensure Font Awesome classes are used

### Database Changes
1. **Schema**: Update `shared/schema.ts`
2. **Migration**: Run `npm run db:push`
3. **Storage**: Update `server/storage.ts` for new operations
4. **API**: Add routes in `server/routes.ts`

### Styling Updates
1. **Theme**: Edit `client/src/index.css`
2. **Components**: Use Tailwind classes
3. **Icons**: Use Font Awesome (fas fa-*)
4. **Mobile**: Test responsive design

## Bot Integration

### Current Status
- **Telegram Bot**: Framework ready, token configured
- **Discord Bot**: Framework ready with error handling
- **Error Handling**: Graceful failures when tokens invalid

### Bot Commands Framework
```typescript
// Telegram bot commands ready for implementation
/start - Welcome message with game link
/stats - Player statistics
/leaderboard - Top players
/link - Connect Telegram to game account
/help - Command information
```

### Activation Steps (Optional)
1. Update bot tokens in `.env` if needed
2. Test bot functionality
3. Configure webhook URLs for production
4. Add more interactive commands

## Solana Integration (Prepared)

### Installation Ready
```bash
# Install Solana packages when needed
npm install @solana/web3.js @solana/wallet-adapter-base @solana/wallet-adapter-phantom @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets
```

### Implementation Files
- `client/src/components/wallet/solana-wallet.tsx` - Main wallet component
- `client/src/components/wallet/wallet-section.tsx` - UI integration

## Security Considerations

### Current Measures
- Input validation with Zod schemas
- Environment variable configuration
- Database query parameterization via Drizzle
- Bot error handling prevents crashes

### Recommended Additions
- Rate limiting for API endpoints
- Click validation and anti-cheat
- Enhanced Telegram user verification
- Session management improvements

## Performance Optimization

### Current Optimizations
- Efficient database queries with Drizzle ORM
- React Query caching for server state
- Optimized build process with Vite
- Mobile-first responsive design

### Future Improvements
- Redis caching for leaderboards
- Database connection pooling
- Service worker for offline capability
- Image optimization and CDN

## Debugging Guide

### Common Issues and Solutions

**Navigation Icons Not Visible**:
- ✅ Fixed: Font Awesome CDN added to `client/index.html`

**TypeScript Errors**:
- 6 remaining diagnostics in `client/src/pages/game.tsx`
- Non-blocking, game functions correctly
- Fix by updating component prop types

**Database Connection Issues**:
- Check DATABASE_URL environment variable
- Verify PostgreSQL service is running
- Test with `npm run db:push`

**Bot Errors**:
- ✅ Fixed: Graceful error handling implemented
- Invalid tokens no longer crash server
- Check console for bot status messages

**Click Not Working**:
- ✅ Working: API endpoints respond correctly
- Check browser console for errors
- Verify player ID in localStorage

### Development Tools
- **Console Logs**: Check browser and server console
- **Database Query**: Use Replit database interface
- **TypeScript**: `npm run check` for type errors
- **Network**: Browser dev tools for API calls

## Telegram WebView Optimization

### Current Features
- Mobile-first responsive design
- Touch-optimized interactions
- Bottom navigation for mobile
- Telegram user data integration
- WebView-specific CSS optimizations

### Testing in Telegram
1. Configure bot with web app URL
2. Send web app via bot message
3. Test all navigation and clicking
4. Verify touch interactions work
5. Check mobile layout rendering

## AI Agent Best Practices

### Before Making Changes
1. ✅ Verify current game functionality
2. ✅ Check existing TypeScript diagnostics
3. ✅ Test clicking and navigation
4. ✅ Review recent changes in documentation

### Development Priorities
1. **High**: Fix remaining TypeScript diagnostics
2. **High**: Implement rate limiting
3. **Medium**: Complete Solana integration
4. **Medium**: Enhance bot commands
5. **Low**: Add advanced game features

### Code Quality
- Use TypeScript for all new code
- Follow existing component patterns
- Maintain mobile-first design
- Test in Telegram WebView
- Update documentation for major changes

### Database Safety
- Always use `npm run db:push` for schema changes
- Test changes with small datasets first
- Back up before major modifications
- Use Drizzle ORM for type safety

## Current Status Summary

**✅ What's Working**:
- Complete clicking game mechanics
- Persistent PostgreSQL database
- Telegram user integration
- Mobile responsive navigation with visible icons
- Bot frameworks ready for activation
- Clean, gambling-free content

**⚠️ Minor Issues**:
- 6 TypeScript diagnostics (non-blocking)
- Some bot tokens may need refresh

**🔧 Ready for Enhancement**:
- Solana wallet integration
- Advanced bot commands
- Rate limiting implementation
- Performance optimizations

The game is fully functional and ready for Telegram deployment or further development by AI agents.