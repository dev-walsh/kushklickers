# Overview

Kush Klicker is a cannabis-themed incremental clicker game built as a full-stack web application. Players click to earn "KUSH" currency, purchase upgrades to increase their earning power, unlock achievements, and compete on leaderboards. The game features a modern web interface with mobile-responsive design, real-time gameplay mechanics, and social features like referrals.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client uses **React 18** with **TypeScript** for the user interface, styled with **Tailwind CSS** and **shadcn/ui** components for a consistent design system. The application follows a single-page application (SPA) pattern with client-side routing using **Wouter**. State management is handled through **TanStack Query** for server state and React hooks for local state.

The frontend is organized into:
- **Pages**: Main game view and error pages
- **Components**: Reusable UI components organized by feature (game, navigation, upgrades, achievements, etc.)
- **Hooks**: Custom React hooks for game state management and UI utilities
- **Lib**: Utility functions for game calculations, formatting, and API communication

## Backend Architecture
The server uses **Express.js** with **TypeScript** running in ESM mode. It provides a RESTful API for game operations including player management, upgrade purchases, and leaderboard queries. The architecture supports both development and production environments with Vite integration for hot module replacement during development.

Routes are organized around core game entities:
- Player operations (CRUD, stats updates)
- Upgrade system (purchase tracking, cost calculations)
- Achievement system (progress tracking, unlocking)
- Leaderboard functionality

## Data Storage Solutions
The application uses **Drizzle ORM** with **PostgreSQL** for persistent data storage. The database schema includes tables for players, upgrades, achievements, and their relationships. For development and testing, an in-memory storage implementation is provided as a fallback.

Database schema includes:
- **Players**: Core user data, game stats, wallet integration
- **Upgrades**: Purchasable improvements with scaling costs
- **Player Upgrades**: Purchase tracking and quantities
- **Achievements**: Goal-based rewards system
- **Player Achievements**: Progress tracking per user

## Authentication and Authorization
Currently implements a basic session-based system using localStorage for player identification. Players are created with auto-generated usernames and persist across browser sessions. The architecture supports future expansion to include proper authentication, wallet connections, and social login systems.

## External Dependencies

### Database Services
- **Neon Database**: PostgreSQL hosting via @neondatabase/serverless
- **Drizzle**: Type-safe ORM with automatic migrations

### UI Framework
- **React**: Component-based UI with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built accessible components using Radix UI primitives
- **Radix UI**: Headless component primitives for complex interactions

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Production bundling for server code

### Game Features
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight client-side routing
- **React Hook Form**: Form handling with validation
- **Zod**: Runtime type validation and schema parsing

### Styling and Icons
- **Font Awesome**: Icon library for game elements
- **Google Fonts**: Typography (Inter, DM Sans, Fira Code, Geist Mono)
- **CSS Variables**: Theme system for dark mode support

### Production Infrastructure
- **Replit**: Hosting platform with integrated development environment
- **Connect-pg-simple**: PostgreSQL session storage for Express
- **Date-fns**: Date manipulation and formatting utilities