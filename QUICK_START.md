# Quick Start Guide

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🎯 Key Features Implemented

✅ **Token Trading Table** with all columns:
- Token name and symbol
- Price (with real-time updates)
- 24h Change percentage
- Volume (24h)
- Market Cap
- Category badges (New Pairs, Final Stretch, Migrated)
- Action buttons

✅ **Interactive Components:**
- **Popover**: Migration info for migrated tokens
- **Tooltip**: Hover hints on buttons
- **Modal**: Full token details dialog
- **Sorting**: Click column headers to sort

✅ **Real-time Updates:**
- WebSocket mock updates prices every 2-5 seconds
- Smooth color transitions (green for up, red for down)
- No page refresh required

✅ **Loading States:**
- Skeleton loader with shimmer effect
- Progressive loading
- Error boundaries for graceful error handling

✅ **Responsive Design:**
- Works on all screen sizes (320px to desktop)
- Horizontal scroll on mobile
- Touch-friendly interactions

## 🏗️ Architecture

- **Next.js 14** App Router
- **TypeScript** (strict mode)
- **Redux Toolkit** for state management
- **React Query** for data fetching
- **Radix UI** for accessible components
- **Tailwind CSS** for styling

## 📁 Project Structure

```
eterna-labs/
├── app/              # Next.js pages
├── components/       # React components (Atomic Architecture)
├── hooks/           # Custom React hooks
├── lib/             # Utilities and types
└── store/           # Redux store
```

## 🎨 Styling

- Dark theme matching Axiom Trade
- Smooth animations and transitions
- Hover effects on interactive elements
- Color-coded price changes

## 🔧 Development

- **Linting**: `npm run lint`
- **Type checking**: Built into build process
- **Hot reload**: Automatic with Next.js dev server

## 📝 Next Steps

1. Deploy to Vercel (ready for deployment)
2. Create demo video
3. Test on various devices
4. Run Lighthouse audit (target: ≥90 score)

---

For detailed documentation, see [README.md](./README.md)

