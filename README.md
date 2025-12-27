# Token Trading Table - Axiom Trade Replica

A pixel-perfect replica of Axiom Trade's token discovery table built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### Core Features
- ✅ All token columns (New pairs, Final Stretch, Migrated)
- ✅ Interactive components: Popover, Tooltip, Modal
- ✅ Sorting functionality for all numeric columns
- ✅ Real-time price updates (WebSocket mock) with smooth color transitions
- ✅ Loading states: Skeleton, Shimmer, Progressive loading
- ✅ Error boundaries for graceful error handling
- ✅ Responsive design (320px to desktop)

### Technical Stack
- **Framework**: Next.js 14 App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query (TanStack Query)
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd eterna-labs
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
eterna-labs/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/            # React components (Atomic Architecture)
│   ├── ui/               # Base UI components
│   ├── token-trading-table.tsx
│   ├── token-row.tsx
│   ├── token-table-skeleton.tsx
│   ├── error-boundary.tsx
│   └── providers.tsx
├── hooks/                # Custom React hooks
│   ├── useTokens.ts      # Token data fetching
│   └── useWebSocket.ts   # WebSocket mock for price updates
├── lib/                  # Utilities and types
│   ├── utils.ts          # Helper functions
│   └── types.ts          # TypeScript types
└── store/                # Redux store
    ├── store.ts          # Store configuration
    ├── tokensSlice.ts    # Tokens state slice
    └── hooks.ts          # Typed Redux hooks
```

## Architecture

### Atomic Design Principles
- **Atoms**: Base UI components (Button, Skeleton, etc.)
- **Molecules**: Composite components (TokenRow, etc.)
- **Organisms**: Complex components (TokenTradingTable)
- **Hooks**: Reusable logic (useTokens, useWebSocket)
- **Utils**: Shared utilities and helpers

### Performance Optimizations
- Memoized components using `React.memo`
- Optimized re-renders with proper dependency arrays
- Debounced functions for expensive operations
- Lazy loading and code splitting
- CSS transitions for smooth animations

### State Management
- **Redux Toolkit**: Complex state (tokens, sorting, selection)
- **React Query**: Server state and caching
- **Local State**: Component-specific UI state

## Features in Detail

### Real-time Price Updates
The application simulates real-time price updates using a WebSocket mock that:
- Updates 1-3 random tokens every 2-5 seconds
- Applies smooth color transitions (green for up, red for down)
- Maintains price history for animation effects

### Sorting
Click any column header to sort:
- **Price**: Token price (ascending/descending)
- **24h Change**: Price change percentage
- **Volume (24h)**: Trading volume
- **Market Cap**: Market capitalization

### Interactive Components
- **Popover**: Migration information for migrated tokens
- **Tooltip**: Hover hints on action buttons
- **Modal**: Full token details dialog

### Loading States
- **Skeleton**: Initial loading state with shimmer effect
- **Progressive Loading**: Data loads incrementally
- **Error Boundaries**: Graceful error handling

### Responsive Design
- Mobile-first approach
- Breakpoints: 320px, 640px (sm), 1024px (lg)
- Horizontal scroll for tables on small screens
- Touch-friendly interactions

## Performance Metrics

Target metrics:
- Lighthouse Score: ≥90 (Mobile & Desktop)
- Interaction latency: <100ms
- No layout shifts (CLS = 0)
- Smooth 60fps animations

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy automatically

The application is optimized for Vercel's edge network.

## Responsive Snapshots

### Desktop (1920x1080)
- Full table layout with all columns visible
- Hover effects on rows
- All interactive elements accessible

### Tablet (768x1024)
- Table scrolls horizontally if needed
- Touch-optimized interactions
- Maintained visual hierarchy

### Mobile (375x667)
- Stacked layout considerations
- Horizontal scroll for table
- Optimized button sizes

### Small Mobile (320x568)
- Minimal viable layout
- Essential information preserved
- Touch targets ≥44px

## Development

### Code Quality
- TypeScript strict mode
- ESLint configuration
- Comprehensive error handling
- Documented complex logic

### Testing
Run the linter:
```bash
npm run lint
```

## License

MIT

## Deliverables Checklist

- ✅ GitHub repository with clean commits
- ⏳ Vercel deployment (ready for deployment)
- ⏳ 1-2 min YouTube video demonstration
- ✅ Responsive layout (320px to desktop)
- ✅ README with documentation

---

Built with ❤️ using Next.js 14 and modern web technologies.

