# Admin Panel - 언니의 소개

Enterprise-grade admin dashboard for premium dating service management.

## 🚀 Features

### ✨ Modern UI/UX
- **Dark Mode Support**: Auto/Light/Dark theme modes with system preference detection
- **Responsive Design**: Mobile-first approach with fluid layouts
- **Smooth Animations**: Framer Motion powered transitions
- **Accessible**: WCAG 2.1 compliant components

### 📊 Dashboard Analytics
- **Real-time KPIs**: Member count, matching success, revenue, active users
- **Interactive Charts**: Revenue composition (Pie), matching trends (Line)
- **Activity Monitoring**: Live user activity tracking
- **Regional Distribution**: Geographic member analytics

### 🏗️ Architecture
- **FSD (Feature-Sliced Design)**: Modular, scalable architecture
- **Type-Safe**: Full TypeScript coverage with strict mode
- **Performance Optimized**: React.memo, code splitting, lazy loading
- **Enterprise-Ready**: Designed for 100K+ concurrent users

## 📁 Project Structure

```
frontend-admin/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin routes
│   │   ├── layout.tsx           # Admin layout with sidebar
│   │   └── page.tsx             # Admin dashboard page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   └── providers.tsx            # Global providers (Theme, etc.)
│
├── components/                   # Shared UI components
│   ├── admin/                   # Admin-specific components
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   ├── SidebarItem.tsx      # Sidebar menu item
│   │   └── nav-config.ts        # Navigation configuration
│   ├── ui/                      # Radix UI components
│   └── ThemeToggle.tsx          # Theme switcher (auto/light/dark)
│
├── src/features/                # Feature modules (FSD)
│   └── admin/
│       ├── dashboard/           # Dashboard feature
│       │   ├── components/      # Dashboard-specific components
│       │   │   ├── KpiCard.tsx
│       │   │   ├── RevenueChart.tsx
│       │   │   ├── ActivityList.tsx
│       │   │   ├── TopMembersList.tsx
│       │   │   ├── MatchingTrendChart.tsx
│       │   │   └── RegionMap.tsx
│       │   ├── hooks/           # Custom hooks
│       │   │   └── useDashboardData.ts
│       │   ├── types.ts         # TypeScript definitions
│       │   ├── constants.ts     # Static data & config
│       │   ├── DashboardView.tsx # Main dashboard view
│       │   └── index.ts         # Public API
│       └── AdminFluid.tsx       # Legacy wrapper
│
├── stores/                      # Zustand state management
│   ├── useAdminAuthStore.ts
│   └── useAdminDashboardStore.ts
│
├── styles/
│   └── globals.css              # Global styles + Tailwind
│
└── types/                       # Global TypeScript types
    └── admin.ts
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.2 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Radix UI
- **Charts**: Recharts 2.15
- **State Management**: Zustand 5.0
- **Theme**: next-themes 0.4
- **Animations**: Framer Motion 12.23
- **Icons**: Lucide React 0.542

## 🚦 Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development
- Dev server runs on: `http://localhost:3001`
- Hot reload enabled
- TypeScript strict mode

## 🎨 Theme System

The application supports three theme modes:

1. **Auto (System)**: Follows device/OS preference
2. **Light**: Force light mode
3. **Dark**: Force dark mode

Users can cycle through modes by clicking the theme toggle button in the sidebar.

## 📊 Dashboard Modules

### KPI Cards
- Total Members
- Successful Matches
- Monthly Revenue
- Active Users

### Charts & Analytics
- Revenue Composition (Donut Chart)
- Matching Trends (Line Chart)
- Real-time Activity List
- Top Members Leaderboard
- Regional Distribution Map

## 🔒 Security

- Type-safe API calls
- Input validation
- XSS protection
- CSRF tokens (production)

## 🧪 Code Quality

```bash
# Type checking
npm run type-check

# Linting
npm run lint
```

## 📈 Performance

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: 95+
- **Bundle Size**: Optimized with code splitting

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Development Guidelines

### Component Creation
1. Use TypeScript with proper types
2. Implement React.memo for expensive components
3. Follow FSD architecture for features
4. Add JSDoc comments for complex logic

### Styling
1. Use Tailwind utility classes
2. Support dark mode with `dark:` prefix
3. Ensure responsive design (mobile-first)
4. Follow design system tokens

### State Management
1. Use Zustand for global state
2. Use React hooks for local state
3. Avoid prop drilling with context when needed

## 🤝 Contributing

1. Follow existing code structure
2. Write type-safe code
3. Test dark mode compatibility
4. Ensure responsive design
5. Add comments for complex logic

## 📄 License

Proprietary - All rights reserved

## 👥 Team

- Enterprise Development Team
- UI/UX Design Team
- DevOps Team

---

Built with ❤️ for enterprise-scale dating service management
