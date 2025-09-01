# KushKlicker - Developer Documentation

## Project Overview

KushKlicker is a cannabis-themed incremental clicker game built as a full-stack web application with Solana blockchain integration and Telegram bot support. The game allows players to click to earn "KUSH" currency, purchase upgrades, unlock achievements, and compete on leaderboards.

## Current Implementation Status

**✅ MIGRATION COMPLETED**: Successfully migrated to Replit environment with persistent database, bot integrations, and custom branding.

### Recent Updates (Latest Session)
- ✅ **Database Migration**: Switched from in-memory to PostgreSQL with persistent storage
- ✅ **Bot Integration**: Added Telegram and Discord bot frameworks with full command support
- ✅ **UI Theme Update**: Customized green cannabis theme matching the client's logo
- ✅ **Logo Integration**: Added client's green cannabis logo to header and branding
- ✅ **Click Functionality**: Fixed player persistence issues and database queries

### ✅ Completed Features

#### Core Game Mechanics
- **Clicking System**: Players click to earn KUSH tokens with per-click multipliers
- **Upgrade System**: Purchase upgrades to increase earning power and automation
- **Achievement System**: Goal-based rewards with progress tracking
- **Leaderboard**: Real-time ranking of top players by total KUSH earned
- **Player Persistence**: Player data stored with auto-generated usernames

#### Frontend Architecture
- **React 18 + TypeScript**: Modern component-based UI with type safety
- **Tailwind CSS + shadcn/ui**: Responsive design system with dark mode support
- **Mobile Navigation**: Responsive tabs for desktop and mobile experiences
- **State Management**: TanStack Query for server state, React hooks for local state
- **Client-side Routing**: Wouter for SPA navigation

#### Backend Infrastructure
- **Express.js + TypeScript**: RESTful API with ESM module support
- **In-memory Storage**: Fast development storage with interface for future database migration
- **Real-time Updates**: Server-side game state management
- **Portable Deployment**: Configured for 0.0.0.0 binding for network accessibility

#### UI Components (All Functional)
- **Main Clicker**: Central clicking interface with visual feedback
- **Stats Display**: Real-time game statistics and progress indicators
- **Upgrade Shop**: Categorized upgrades with cost calculations
- **Achievement Tracker**: Progress bars and completion status
- **Navigation System**: Mobile-responsive tab navigation
- **Wallet Section**: Solana integration framework (UI ready)
- **Casino/Multiplayer Hub**: Framework for future mini-games

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

#### Telegram Bot Integration
- **Status**: Bot framework created, deployment needed
- **Current**: Complete bot command structure with game integration
- **Files**: `server/telegram-bot.ts`, `.env.example`
- **Next Steps**:
  - Install packages: `node-telegram-bot-api`, `@types/node-telegram-bot-api`
  - Uncomment bot code and enable in server startup
  - Test bot commands and web app integration
  - Deploy bot webhook for production

### ❌ Known Issues

#### Critical Bugs
1. **FIXED**: Player Lookup Issue - Migrated to persistent database storage
   - **Status**: RESOLVED - Database ensures player data persistence across server restarts
   - **Fix**: Implemented PostgreSQL storage with Drizzle ORM, added proper error handling
   - **Files**: `server/storage.ts`, `server/routes.ts`, `shared/schema.ts`

2. **FIXED**: TypeScript Errors - Resolved compilation issues
   - **Status**: RESOLVED - Fixed array destructuring and database query syntax
   - **Impact**: Clean compilation and better development experience
   - **Priority**: COMPLETED

3. **NEW**: Bot Integration Framework
   - **Status**: IMPLEMENTED - Telegram and Discord bots ready for activation
   - **Features**: Player linking, stats viewing, leaderboards, game launch
   - **Files**: `server/telegram-bot.ts`, `server/discord-bot.ts`

4. **NEW**: Custom Branding Implementation
   - **Status**: COMPLETED - Green cannabis theme and logo integration
   - **Features**: Custom color scheme, logo display, themed UI components
   - **Files**: `client/src/index.css`, `client/src/components/navigation/header.tsx`

#### Architecture Improvements Needed
- **Database Migration**: Move from in-memory to persistent PostgreSQL storage
- **Authentication**: Implement proper user authentication system
- **Session Management**: Add secure session handling
- **Rate Limiting**: Prevent API abuse and cheating

## Technology Stack

### Frontend
- **React 18**: Component library with hooks
- **TypeScript**: Type safety and developer experience
- **Tailwind CSS**: Utility-first styling framework
- **shadcn/ui**: Accessible component primitives (Radix UI based)
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight client-side routing
- **Vite**: Fast development server and build tool

### Backend
- **Express.js**: Web application framework
- **TypeScript**: Server-side type safety
- **Drizzle ORM**: Type-safe database operations (prepared for PostgreSQL)
- **Zod**: Runtime type validation
- **ESM Modules**: Modern JavaScript module system

### External Integrations (Prepared)
- **Solana Web3.js**: Blockchain interaction library
- **Telegram Bot API**: Chat bot integration
- **Node.js Telegram Bot API**: Server-side bot framework

## Project Structure

```
kushklicker/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── game/         # Game-specific components
│   │   │   ├── ui/           # shadcn/ui components
│   │   │   └── wallet/       # Solana wallet components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions
│   │   ├── pages/            # Route components
│   │   └── index.css         # Global styles and theme
├── server/                   # Backend Express application
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API route handlers
│   ├── storage.ts           # Data storage interface
│   ├── telegram-bot.ts      # Telegram bot (commented)
│   └── vite.ts              # Vite development integration
├── shared/                   # Shared type definitions
│   └── schema.ts            # Database schema and types
├── .env.example             # Environment configuration template
├── package.json             # Dependencies and scripts
└── vite.config.ts           # Build configuration
```

## Development Workflow

### Local Development
```bash
# Start development server
npm run dev

# Type checking
npm run check

# Build for production
npm run build

# Start production server
npm start
```

### Database Operations
```bash
# Push schema changes (when PostgreSQL is configured)
npm run db:push
```

## API Endpoints

### Player Management
- `GET /api/players/:identifier` - Get player by ID or username
- `POST /api/players` - Create new player
- `POST /api/players/:id/click` - Process click action

### Game Data
- `GET /api/upgrades` - Get all available upgrades
- `GET /api/players/:id/upgrades` - Get player's purchased upgrades
- `POST /api/upgrades/:id/purchase` - Purchase upgrade
- `GET /api/achievements` - Get all achievements
- `GET /api/players/:id/achievements` - Get player's achievements
- `GET /api/leaderboard` - Get leaderboard rankings

## Future Development Roadmap

### Phase 1: Core Stability (High Priority)
1. **Fix Player Lookup Bug**
   - Debug API route issues
   - Ensure consistent player ID handling
   - Test clicking functionality thoroughly

2. **Resolve TypeScript Errors**
   - Fix all LSP diagnostics
   - Improve type safety across codebase
   - Update component prop interfaces

3. **Database Migration**
   - Implement PostgreSQL storage
   - Create proper migration system
   - Test data persistence

### Phase 2: Blockchain Integration (Medium Priority)
1. **Complete Solana Integration**
   - Install and configure Solana packages
   - Implement real wallet connection
   - Add token minting and distribution
   - Create token claim mechanism

2. **Smart Contract Development**
   - Deploy KUSH token contract
   - Implement game reward distribution
   - Add staking mechanisms

### Phase 3: Social Features (Medium Priority)
1. **Telegram Bot Deployment**
   - Complete bot integration
   - Test all commands and web app links
   - Deploy webhook for production

2. **Enhanced Social Features**
   - Referral system improvements
   - Guild/team functionality
   - Social competitions

### Phase 4: Game Content (Low Priority)
1. **Casino/Mini-games**
   - Implement gambling mechanics
   - Add multiplayer competitions
   - Create seasonal events

2. **Advanced Features**
   - Prestige system
   - Multiple currency types
   - NFT integration

## Security Considerations

### Current Security Measures
- Environment variable configuration
- Input validation with Zod schemas
- Rate limiting preparations (not implemented)

### Required Security Improvements
1. **Authentication System**
   - User registration and login
   - Session management
   - Password security

2. **API Security**
   - Rate limiting implementation
   - Input sanitization
   - CORS configuration

3. **Blockchain Security**
   - Wallet connection security
   - Transaction validation
   - Private key protection

## Performance Considerations

### Current Optimizations
- React component memoization opportunities
- Efficient state management with TanStack Query
- Vite-optimized build process

### Future Optimizations
- Database query optimization
- Caching strategies
- CDN implementation for static assets
- Server-side rendering considerations

## Testing Strategy

### Current Testing Status
- No automated tests implemented
- Manual testing of core functionality

### Recommended Testing Implementation
1. **Unit Tests**
   - Component testing with React Testing Library
   - API endpoint testing
   - Utility function testing

2. **Integration Tests**
   - End-to-end user flows
   - API integration testing
   - Database operation testing

3. **Performance Tests**
   - Load testing for API endpoints
   - Frontend performance monitoring

## Deployment Guidelines

### Development Deployment
- Use `npm run dev` for hot reloading
- Configure `.env` with development values
- Use in-memory storage for quick iteration

### Production Deployment
- Build with `npm run build`
- Use `npm start` for production server
- Configure PostgreSQL database
- Set up proper environment variables
- Implement monitoring and logging

### Portable Deployment
- Follow `SETUP.md` for portable Linux deployment
- Server configured for 0.0.0.0 binding
- Self-contained with all dependencies

## Contributing Guidelines

### Code Style
- Use TypeScript for all new code
- Follow existing component patterns
- Use shadcn/ui components when possible
- Maintain responsive design principles

### Git Workflow
- Create feature branches for new development
- Use descriptive commit messages
- Test thoroughly before merging
- Update documentation as needed

### Priority Order for New Contributors
1. Fix critical player lookup bug
2. Resolve TypeScript errors
3. Complete Solana wallet integration
4. Implement Telegram bot
5. Add automated testing
6. Enhance game features

This documentation should be updated as the project evolves and new features are implemented.