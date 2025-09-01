# KushKlicker - Developer Documentation

## Project Overview

KushKlicker is a cannabis-themed incremental clicker game built as a full-stack web application optimized for Telegram Web Apps. Players click to earn "KUSH" currency, purchase upgrades, unlock achievements, and compete on leaderboards. The game features Telegram user integration, mobile-responsive design, and real-time gameplay mechanics.

## Current Implementation Status

**✅ MIGRATION COMPLETED**: Successfully migrated to Replit environment with persistent PostgreSQL database, Telegram integration, and clean mobile-first design.

### Recent Updates (Latest Session - September 2025)
- ✅ **Removed Gambling Features**: Completely removed casino/gambling components for Telegram compliance
- ✅ **Telegram Integration**: Added telegram_user_id field and @username referral system
- ✅ **Database Schema**: Updated for Telegram user data and referral tracking
- ✅ **Navigation Fixed**: Added Font Awesome icons, all navigation buttons now visible and functional
- ✅ **Mobile Optimization**: Improved responsive design for Telegram WebView
- ✅ **Bot Error Handling**: Discord bot gracefully fails when tokens are invalid

### ✅ Completed Features

#### Core Game Mechanics
- **Clicking System**: Players click to earn KUSH tokens with per-click multipliers
- **Upgrade System**: Purchase upgrades to increase earning power and automation
- **Achievement System**: Goal-based rewards with progress tracking
- **Leaderboard**: Real-time ranking of top players by total KUSH earned
- **Player Persistence**: Player data stored with Telegram user integration

#### Telegram Integration
- **User ID Support**: Players can be identified by Telegram user ID
- **Username System**: Supports @username format for referrals
- **WebView Optimization**: Optimized for Telegram WebView environment
- **Bot Framework**: Telegram bot ready for player interactions

#### Frontend Architecture
- **React 18 + TypeScript**: Modern component-based UI with type safety
- **Tailwind CSS + shadcn/ui**: Responsive design system with cannabis theme
- **Font Awesome Icons**: All navigation icons properly loaded and visible
- **Mobile Navigation**: Bottom navigation for mobile, desktop sidebar for larger screens
- **State Management**: TanStack Query for server state, React hooks for local state
- **Client-side Routing**: Wouter for SPA navigation

#### Backend Infrastructure
- **Express.js + TypeScript**: RESTful API with ESM module support
- **PostgreSQL + Drizzle ORM**: Persistent database storage with type-safe queries
- **Telegram Bot Framework**: Ready for activation with proper error handling
- **Real-time Updates**: Server-side game state management
- **Network Accessibility**: Configured for 0.0.0.0:5000 binding

#### UI Components (All Functional)
- **Main Clicker**: Central clicking interface with visual feedback and floating text
- **Stats Display**: Real-time game statistics and progress indicators
- **Upgrade Shop**: Categorized upgrades with cost calculations
- **Achievement Tracker**: Progress bars and completion status
- **Navigation System**: Mobile-responsive navigation with visible icons
- **Wallet Section**: Framework for future Solana integration
- **Referral System**: Telegram @username based referral tracking

### 🚧 Partially Implemented Features

#### Solana Wallet Integration
- **Status**: UI framework complete, blockchain integration pending
- **Current**: Mock wallet connection with proper UI components
- **Files**: `client/src/components/wallet/solana-wallet.tsx`, `client/src/components/wallet/wallet-section.tsx`
- **Next Steps**: 
  - Install Solana packages: `@solana/web3.js`, `@solana/wallet-adapter-*`
  - Implement actual wallet connection logic
  - Add token claim functionality
  - Configure mainnet/devnet switching

#### Bot Integration Expansion
- **Status**: Framework implemented, tokens configured
- **Current**: Basic bot command structure with game integration
- **Files**: `server/telegram-bot.ts`, `server/discord-bot.ts`
- **Next Steps**:
  - Add more interactive bot commands
  - Implement player stat queries via bot
  - Add referral link generation through bot
  - Create admin commands for game management

### ✅ Recently Resolved Issues

#### Fixed in Latest Session
1. **Navigation Button Visibility** - RESOLVED
   - **Issue**: Navigation buttons were invisible due to missing Font Awesome CSS
   - **Fix**: Added Font Awesome CDN link to index.html
   - **Status**: All navigation icons now visible and functional

2. **Casino/Gambling Content Removal** - RESOLVED
   - **Issue**: Gambling features not suitable for Telegram deployment
   - **Fix**: Completely removed casino components, navigation, and related CSS
   - **Status**: Clean, gambling-free game suitable for Telegram

3. **Telegram User Integration** - RESOLVED
   - **Issue**: User system used random UUIDs instead of Telegram data
   - **Fix**: Added telegram_user_id field, @username support for referrals
   - **Status**: Properly integrates with Telegram user data

4. **Database Schema Updates** - RESOLVED
   - **Issue**: Database didn't support Telegram user identification
   - **Fix**: Added telegram_user_id column, updated all related code
   - **Status**: Database fully supports Telegram integration

#### Previously Fixed Issues
1. **Player Lookup Issue** - RESOLVED (Database Migration)
   - Migrated from in-memory to persistent PostgreSQL storage
   - All player data now persists across server restarts

2. **TypeScript Compilation** - MOSTLY RESOLVED
   - Fixed major compilation issues
   - Some minor diagnostics remain in game.tsx (6 remaining)

3. **Bot Error Handling** - RESOLVED
   - Discord bot gracefully handles invalid tokens
   - Server no longer crashes when bot tokens are missing/invalid

## Technology Stack

### Frontend
- **React 18**: Component library with hooks
- **TypeScript**: Type safety and developer experience
- **Tailwind CSS**: Utility-first styling framework with custom cannabis theme
- **shadcn/ui**: Accessible component primitives (Radix UI based)
- **Font Awesome**: Icon library for navigation and UI elements
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight client-side routing
- **Vite**: Fast development server and build tool

### Backend
- **Express.js**: Web application framework
- **TypeScript**: Server-side type safety
- **PostgreSQL**: Persistent database storage
- **Drizzle ORM**: Type-safe database operations
- **Zod**: Runtime type validation
- **ESM Modules**: Modern JavaScript module system

### External Integrations
- **Telegram Bot API**: Chat bot integration framework
- **Discord.js**: Discord bot framework (optional)
- **Font Awesome CDN**: Icon delivery
- **Neon Database**: PostgreSQL hosting service

## Project Structure

```
kushklicker/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── game/         # Core game components (clicker, stats)
│   │   │   ├── navigation/   # Mobile/desktop navigation
│   │   │   ├── upgrades/     # Upgrade shop and listings
│   │   │   ├── achievements/ # Achievement tracking
│   │   │   ├── leaderboard/  # Player rankings
│   │   │   ├── wallet/       # Solana wallet components
│   │   │   ├── referral/     # Telegram username referrals
│   │   │   └── ui/           # shadcn/ui components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions
│   │   ├── pages/            # Route components
│   │   └── index.css         # Global styles and cannabis theme
├── server/                   # Backend Express application
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API route handlers
│   ├── storage.ts           # Database storage with Drizzle ORM
│   ├── telegram-bot.ts      # Telegram bot implementation
│   ├── discord-bot.ts       # Discord bot implementation
│   └── vite.ts              # Vite development integration
├── shared/                   # Shared type definitions
│   └── schema.ts            # Database schema with Telegram fields
├── .env                     # Environment configuration (bot tokens)
├── package.json             # Dependencies and scripts
└── vite.config.ts           # Build configuration
```

## Development Workflow

### Local Development
```bash
# Start development server (includes hot reload)
npm run dev

# Type checking
npm run check

# Database operations
npm run db:push

# Build for production
npm run build

# Start production server
npm start
```

### Database Operations
```bash
# Push schema changes to PostgreSQL
npm run db:push

# Force push (if data loss warning)
npm run db:push --force
```

## API Endpoints

### Player Management
- `GET /api/players/:identifier` - Get player by ID or username
- `POST /api/players` - Create new player (supports Telegram user data)
- `PATCH /api/players/:id` - Update player stats
- `POST /api/players/:id/click` - Process click action

### Game Data
- `GET /api/upgrades` - Get all available upgrades
- `GET /api/players/:id/upgrades` - Get player's purchased upgrades
- `POST /api/players/:id/upgrades` - Purchase upgrade
- `GET /api/achievements` - Get all achievements
- `GET /api/players/:id/achievements` - Get player's achievements
- `GET /api/leaderboard` - Get leaderboard rankings

## Current Status Assessment

### ✅ Ready for Production
- Core clicking mechanics fully functional
- Persistent database storage working
- Mobile-responsive navigation complete
- Telegram integration ready
- Bot frameworks implemented and error-handled
- Clean, gambling-free content

### ⚠️ Minor Issues Remaining
- 6 TypeScript diagnostics in `client/src/pages/game.tsx` (non-blocking)
- Some bot tokens in .env may be invalid (handled gracefully)

### 🔄 Next Development Priorities

#### High Priority
1. **Complete Solana Integration**
   - Install required Solana packages
   - Implement real wallet connection
   - Add token minting and distribution

2. **Enhance Bot Features**
   - Add more interactive commands
   - Implement leaderboard queries
   - Create admin management commands

3. **Performance Optimization**
   - Optimize database queries
   - Add caching strategies
   - Implement rate limiting

#### Medium Priority
1. **Advanced Game Features**
   - Prestige system
   - Multiple currency types
   - Seasonal events and competitions

2. **Social Features**
   - Enhanced referral rewards
   - Player-to-player interactions
   - Guild/team functionality

#### Low Priority
1. **Additional Integrations**
   - Discord rich presence
   - Social media sharing
   - Analytics and metrics

## Security Considerations

### Current Security Measures
- Environment variable configuration for bot tokens
- Input validation with Zod schemas
- CORS configuration for cross-origin requests
- Graceful error handling for bot failures

### Required Security Improvements
1. **Rate Limiting**
   - Prevent clicking spam and API abuse
   - Implement per-user request limits

2. **Authentication Enhancement**
   - Proper session management
   - Telegram user verification
   - Anti-cheat mechanisms

3. **Database Security**
   - Query parameterization (already implemented via Drizzle)
   - Connection encryption
   - Access control improvements

## Performance Considerations

### Current Optimizations
- Efficient database queries with Drizzle ORM
- React component optimization opportunities
- TanStack Query for server state caching
- Vite-optimized build process

### Future Optimizations
- Implement Redis caching for leaderboards
- Database connection pooling
- CDN implementation for static assets
- Service worker for offline functionality

## Deployment Guidelines

### Replit Environment (Current)
- PostgreSQL database configured and running
- Environment variables properly set
- Bot frameworks ready for activation
- Server optimized for Replit infrastructure

### Production Deployment Checklist
- [ ] Configure production database
- [ ] Set up proper environment variables
- [ ] Implement monitoring and logging
- [ ] Configure SSL/HTTPS
- [ ] Set up backup strategies
- [ ] Enable rate limiting
- [ ] Configure bot webhooks (if needed)

### Telegram Web App Deployment
- [ ] Configure Telegram bot with web app URL
- [ ] Test in Telegram WebView environment
- [ ] Optimize for mobile touch interactions
- [ ] Verify all navigation works in Telegram

## Contributing Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing component patterns
- Use shadcn/ui components when possible
- Maintain responsive design principles
- Ensure Telegram WebView compatibility

### Development Priorities for New Contributors
1. Complete remaining TypeScript fixes in game.tsx
2. Implement Solana wallet integration
3. Enhance bot command functionality
4. Add automated testing suite
5. Implement rate limiting and anti-cheat
6. Add advanced game features

### Git Workflow
- Create feature branches for new development
- Use descriptive commit messages
- Test thoroughly before merging
- Update documentation as needed
- Test in Telegram WebView when applicable

## AI Agent Guidance

### For Future AI Agents Working on This Project

#### Quick Start Checklist
1. **Read Current Status**: Game is functional, Telegram-optimized, no gambling content
2. **Check Database**: PostgreSQL is set up and working with Telegram user support
3. **Verify Navigation**: All icons should be visible (Font Awesome loaded)
4. **Test Clicking**: Click functionality should work and earn KUSH tokens
5. **Review Bot Status**: Telegram/Discord bots configured but may need token updates

#### Common Tasks and Locations
- **Add new game features**: Start with `client/src/components/game/`
- **Modify navigation**: Update `client/src/components/navigation/`
- **Database changes**: Update `shared/schema.ts` then run `npm run db:push`
- **API changes**: Modify `server/routes.ts` and `server/storage.ts`
- **Bot enhancements**: Edit `server/telegram-bot.ts` or `server/discord-bot.ts`
- **Styling updates**: Edit `client/src/index.css` for theme changes

#### Key Things to Remember
- This is optimized for Telegram WebView (mobile-first)
- No gambling/casino features (removed for compliance)
- Uses @username format for referrals
- Telegram user IDs are supported alongside regular UUIDs
- All navigation icons require Font Awesome to be loaded
- Bot error handling is important (graceful failures)

#### Before Making Changes
1. Check if the workflow "Start application" is running
2. Verify the game loads at the provided URL
3. Test clicking functionality
4. Check for any console errors
5. Review existing TypeScript diagnostics in `client/src/pages/game.tsx`

This documentation reflects the current working state as of September 2025. The game is fully functional, Telegram-optimized, and ready for further development.