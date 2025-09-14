# Cryptocurrency Tracker

A modern, responsive web application for tracking cryptocurrency prices and market data with offline support using IndexedDB. Built with Next.js 15, TypeScript, and modern web technologies for optimal performance and user experience.

## ✨ Features

- 📊 **Real-time Data**: Fetches live cryptocurrency data from CoinMarketCap API
- 💾 **Offline Support**: Stores data locally using IndexedDB for offline access
- 🔄 **Auto-refresh**: Automatically updates data every 5 minutes
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast Loading**: Skeleton loading states for better UX
- 🎨 **Modern UI**: Clean, modern interface built with Tailwind CSS
- 📄 **Pagination**: Load more cryptocurrencies with pagination support
- 🌙 **Dark Mode**: Built-in dark mode support
- ♿ **Accessibility**: Proper ARIA labels and keyboard navigation
- 🔒 **Type Safety**: Full TypeScript implementation for better development experience

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Data Storage**: IndexedDB
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **Package Manager**: pnpm
- **Linting**: ESLint with Next.js config

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 18.0.0 or higher
- **pnpm**: Version 8.0.0 or higher (recommended)
  - Install pnpm: `npm install -g pnpm`
- **Git**: For cloning the repository

### Installation & Run Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd coin-task
   ```

2. **Install dependencies:**
   ```bash
   # Using pnpm (recommended)
   pnpm install
   
   # Or using npm
   npm install
   ```

3. **Start the development server:**
   ```bash
   # Using pnpm
   pnpm dev
   
   # Or using npm
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production with Turbopack
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint errors automatically
pnpm type-check   # Run TypeScript type checking
```

### Production Build

To create a production build:

```bash
pnpm build
pnpm start
```

The application will be available at `http://localhost:3000` in production mode.

## 🏗 Project Architecture

### Directory Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API routes
│   │   └── crypto/        # Crypto API endpoint
│   │       └── route.ts   # CoinMarketCap proxy
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with fonts
│   └── page.tsx           # Home page component
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   └── Skeleton.tsx  # Loading skeleton component
│   ├── CryptocurrencyCard.tsx    # Individual crypto card
│   ├── CryptocurrencyList.tsx    # Crypto list container
│   ├── ErrorBoundary.tsx         # Error handling component
│   ├── Header.tsx                # App header
│   └── Pagination.tsx            # Pagination controls
├── hooks/                # Custom React hooks
│   └── useCryptoData.ts  # Crypto data management hook
├── services/             # External services
│   ├── api.ts           # CoinMarketCap API service
│   └── indexedDB.ts     # IndexedDB storage service
├── store/               # State management
│   └── cryptoStore.ts   # Zustand store configuration
├── types/               # TypeScript type definitions
│   └── crypto.ts        # Crypto data types
└── utils/               # Utility functions
    ├── cn.ts           # Class name utility (clsx + tailwind-merge)
    └── formatters.ts   # Data formatting utilities
```

### Architecture Overview

The application follows a **modular, component-based architecture** with clear separation of concerns:

#### 1. **Presentation Layer** (`/components`)
- **UI Components**: Reusable, styled components with proper TypeScript interfaces
- **Business Components**: Feature-specific components that handle crypto data display
- **Error Handling**: Comprehensive error boundaries for graceful failure handling

#### 2. **Data Layer** (`/services`, `/hooks`)
- **API Service**: Centralized API communication with CoinMarketCap
- **Storage Service**: IndexedDB abstraction for offline data persistence
- **Custom Hooks**: Encapsulated data fetching and state management logic

#### 3. **State Management** (`/store`)
- **Zustand Store**: Lightweight, type-safe state management
- **Persistence**: Automatic state persistence across browser sessions
- **Optimistic Updates**: Smooth UI updates during data operations

#### 4. **API Layer** (`/app/api`)
- **Next.js API Routes**: Server-side API proxy for CORS handling
- **Error Handling**: Comprehensive error handling and response formatting
- **Rate Limiting**: Built-in protection against API abuse

#### 5. **Type Safety** (`/types`)
- **TypeScript Interfaces**: Comprehensive type definitions for all data structures
- **API Contracts**: Strict typing for external API responses
- **Component Props**: Type-safe component interfaces

## 🔧 Technology Choices & Rationale

### **Next.js 15 with App Router**
**Why chosen:**
- **Performance**: Built-in optimizations, automatic code splitting, and image optimization
- **SEO**: Server-side rendering capabilities for better search engine visibility
- **Developer Experience**: Hot reload, TypeScript support, and excellent debugging tools
- **App Router**: Modern routing system with better performance and developer experience
- **Turbopack**: Faster builds and development server (used in this project)

**Alternative considered:** Create React App, but Next.js provides better performance and SEO out of the box.

### **TypeScript 5**
**Why chosen:**
- **Type Safety**: Prevents runtime errors and improves code reliability
- **Developer Experience**: Better IDE support, autocomplete, and refactoring
- **Maintainability**: Self-documenting code with clear interfaces
- **Team Collaboration**: Easier to understand and maintain codebase

**Alternative considered:** JavaScript, but TypeScript provides better long-term maintainability.

### **Tailwind CSS 4**
**Why chosen:**
- **Utility-First**: Rapid UI development with consistent design system
- **Performance**: Purges unused styles in production builds
- **Responsive Design**: Built-in responsive utilities
- **Customization**: Easy theme customization and component styling
- **Developer Experience**: IntelliSense support and consistent naming

**Alternative considered:** Styled Components, but Tailwind offers better performance and consistency.

### **Zustand**
**Why chosen:**
- **Simplicity**: Minimal boilerplate compared to Redux
- **TypeScript Support**: Excellent TypeScript integration
- **Performance**: Lightweight and fast
- **Persistence**: Built-in persistence middleware
- **Bundle Size**: Smaller bundle size compared to Redux

**Alternative considered:** Redux Toolkit, but Zustand is simpler and more lightweight for this use case.

### **IndexedDB**
**Why chosen:**
- **Offline Support**: Enables full offline functionality
- **Storage Capacity**: Large storage capacity (hundreds of MB)
- **Performance**: Asynchronous, non-blocking operations
- **Browser Support**: Widely supported across modern browsers
- **Structured Data**: Better for complex data structures than localStorage

**Alternative considered:** localStorage, but IndexedDB offers better performance and storage capacity.

### **Axios**
**Why chosen:**
- **Promise-based**: Clean async/await syntax
- **Request/Response Interceptors**: Easy error handling and request modification
- **TypeScript Support**: Excellent TypeScript definitions
- **Browser Compatibility**: Works across all modern browsers
- **Feature Rich**: Built-in request cancellation, timeout handling

**Alternative considered:** Fetch API, but Axios provides better error handling and interceptors.

### **Lucide React**
**Why chosen:**
- **Tree Shaking**: Only imports used icons, reducing bundle size
- **TypeScript Support**: Full TypeScript definitions
- **Consistency**: Consistent design language across all icons
- **Performance**: Optimized SVG icons with minimal overhead
- **Customization**: Easy to customize size, color, and stroke width

**Alternative considered:** React Icons, but Lucide React offers better performance and consistency.

### **pnpm**
**Why chosen:**
- **Performance**: Faster installation and dependency resolution
- **Disk Efficiency**: Uses hard links to save disk space
- **Strict**: Prevents phantom dependencies
- **Monorepo Support**: Better support for monorepos
- **Compatibility**: Drop-in replacement for npm

**Alternative considered:** npm, but pnpm offers better performance and disk efficiency.

## 🚀 Key Features Implementation

### 1. **Data Management & Caching**
- **IndexedDB Integration**: Stores cryptocurrency data locally for offline access
- **Smart Caching**: 5-minute refresh intervals with stale-while-revalidate strategy
- **API Integration**: Seamless CoinMarketCap API integration with error handling
- **Offline-First**: Application works completely offline after initial data load
- **Data Persistence**: State and data persist across browser sessions

### 2. **State Management Architecture**
- **Zustand Store**: Lightweight, type-safe state management
- **Persistence Middleware**: Automatic state persistence with selective serialization
- **Optimistic Updates**: Smooth UI updates during data loading operations
- **Error State Management**: Centralized error handling and user feedback

### 3. **User Experience & Performance**
- **Skeleton Loading**: Perceived performance improvements with loading states
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **Performance Monitoring**: Built-in performance optimizations

### 4. **Technical Implementation**
- **Type Safety**: Comprehensive TypeScript implementation throughout
- **Error Boundaries**: Graceful error handling with user-friendly messages
- **Code Splitting**: Automatic code splitting with Next.js for optimal loading
- **Bundle Optimization**: Tree shaking and dead code elimination

## 🔌 API Integration

### CoinMarketCap API Integration

The application integrates with the CoinMarketCap API through a Next.js API route proxy:

- **Endpoint**: `https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing`
- **Proxy Route**: `/api/crypto` (handles CORS and error management)
- **Rate Limiting**: Built-in protection against API abuse
- **Error Handling**: Comprehensive error handling for network issues
- **Data Transformation**: Consistent data formatting and validation

### API Features
- **Pagination Support**: Efficient data loading with configurable page sizes
- **Caching Strategy**: Intelligent caching to reduce API calls
- **Fallback Handling**: Graceful degradation when API is unavailable
- **Type Safety**: Full TypeScript integration for API responses

## 🌐 Browser Support

### Supported Browsers
- **Chrome**: 80+ (Full support)
- **Firefox**: 75+ (Full support)
- **Safari**: 13+ (Full support)
- **Edge**: 80+ (Full support)

### Required Features
- **IndexedDB**: For offline data storage
- **ES6+ Support**: For modern JavaScript features
- **CSS Grid & Flexbox**: For responsive layout
- **Fetch API**: For HTTP requests (with Axios fallback)

## 🛠 Development

### Development Environment Setup

1. **IDE Recommendations**:
   - **VS Code** with TypeScript, Tailwind CSS, and ESLint extensions
   - **WebStorm** with built-in Next.js and TypeScript support

2. **Code Quality Tools**:
   - **ESLint**: Code linting with Next.js configuration
   - **TypeScript**: Compile-time type checking
   - **Prettier**: Code formatting (recommended)

### Development Workflow

```bash
# Start development with hot reload
pnpm dev

# Run type checking
pnpm type-check

# Lint and fix code
pnpm lint:fix

# Build for production
pnpm build
```

### Code Quality Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Next.js recommended configuration
- **Component Architecture**: Functional components with hooks
- **Error Handling**: Comprehensive error boundaries
- **Performance**: Optimized rendering and bundle size

## 🧪 Testing Strategy

### Testing Approach
- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API integration and data flow testing
- **E2E Tests**: User journey testing (recommended)
- **Performance Tests**: Bundle size and loading performance

### Recommended Testing Tools
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Playwright**: End-to-end testing
- **Lighthouse**: Performance auditing

## 🚀 Deployment

### Production Deployment

1. **Build the application**:
   ```bash
   pnpm build
   ```

2. **Deploy to Vercel** (recommended):
   ```bash
   npx vercel --prod
   ```

3. **Deploy to other platforms**:
   - **Netlify**: Connect GitHub repository
   - **AWS Amplify**: Deploy from Git
   - **Docker**: Use provided Dockerfile

### Environment Variables

Create a `.env.local` file for production:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.coinmarketcap.com
NEXT_PUBLIC_API_VERSION=v3

# Application Configuration
NEXT_PUBLIC_APP_NAME=Cryptocurrency Tracker
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## 🤝 Contributing

### Contribution Guidelines

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow the coding standards
4. **Add tests**: Ensure your changes are tested
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**: Describe your changes clearly

### Code Style Guidelines

- Use TypeScript for all new code
- Follow the existing component structure
- Add proper error handling
- Include JSDoc comments for complex functions
- Write tests for new features

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[CoinMarketCap](https://coinmarketcap.com/)** for providing the comprehensive cryptocurrency API
- **[Next.js Team](https://nextjs.org/)** for the amazing React framework
- **[Tailwind CSS](https://tailwindcss.com/)** for the utility-first CSS framework
- **[Zustand](https://zustand-demo.pmnd.rs/)** for the lightweight state management
- **[Lucide](https://lucide.dev/)** for the beautiful icon set
- **[Vercel](https://vercel.com/)** for the excellent deployment platform

## 📞 Support

If you encounter any issues or have questions:

1. **Check the Issues**: Look through existing GitHub issues
2. **Create an Issue**: Provide detailed information about the problem
3. **Contact**: Reach out through the contact information in the repository

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**