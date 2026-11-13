# Smart Manufacturing Platform - Setup & Deployment Guide

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Development Setup](#development-setup)
3. [Project Structure](#project-structure)
4. [Backend Integration](#backend-integration)
5. [Deployment](#deployment)
6. [Troubleshooting](#troubleshooting)

## 🚀 Quick Start

### Prerequisites

- **Node.js**: 16.x or higher
- **npm**: 7.x or higher (or yarn)
- **Git**: For version control
- **Code Editor**: VS Code (recommended)

### Installation

```bash
# Navigate to project directory
cd manufacturing-platform

# Install dependencies
npm install

# Start development server
npm run dev

# Navigate to browser
# Open: http://localhost:3000
```

The development server will automatically reload when you make changes.

## 💻 Development Setup

### Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001/ws
VITE_APP_ENV=development
```

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Format code
npm run format  # (requires adding to scripts in package.json)
```

### Browser DevTools

Recommended extensions for Chrome/Edge:

- **React Developer Tools**: Debug React components
- **Redux DevTools**: State inspection (if using Redux)
- **Tailwind CSS IntelliSense**: CSS class suggestions

## 📁 Project Structure

```
manufacturing-platform/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Sidebar.tsx
│   │   ├── TopNavigation.tsx
│   │   ├── Logo.tsx
│   │   ├── ResponsiveGrid.tsx
│   │   └── MobileMenu.tsx
│   ├── pages/              # Page components
│   │   ├── Dashboard.tsx
│   │   ├── LiveMonitoring.tsx
│   │   ├── ProductionPlanning.tsx
│   │   ├── ProductionScheduling.tsx
│   │   ├── MachineManagement.tsx
│   │   ├── PredictiveMaintenance.tsx
│   │   ├── QualityControl.tsx
│   │   ├── InventoryManagement.tsx
│   │   ├── WorkforceManagement.tsx
│   │   ├── ResourceOptimization.tsx
│   │   ├── EnergyManagement.tsx
│   │   ├── AIAssistant.tsx
│   │   ├── AlertsNotifications.tsx
│   │   ├── Reports.tsx
│   │   └── Settings.tsx
│   ├── layouts/            # Layout components
│   │   └── MainLayout.tsx
│   ├── services/
│   │   └── api/           # API service modules
│   │       ├── dashboardService.ts
│   │       ├── machineService.ts
│   │       ├── productionService.ts
│   │       ├── schedulingService.ts
│   │       ├── maintenanceService.ts
│   │       ├── qualityService.ts
│   │       ├── inventoryService.ts
│   │       ├── workforceService.ts
│   │       ├── energyService.ts
│   │       └── alertsService.ts
│   ├── types/             # TypeScript definitions
│   │   └── index.ts
│   ├── data/              # Mock data & utilities
│   │   └── mockData.ts
│   ├── App.tsx            # Root component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── index.html             # HTML entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.cjs
├── .gitignore
└── README.md
```

## 🔌 Backend Integration

### API Service Layer Pattern

Each service module follows this pattern:

```typescript
// Before: Using mock data
export const machineService = {
  async getAllMachines(factoryId: string) {
    // Simulated delay
    await delay(300);
    return { success: true, data: mockMachines };
  }
};

// After: Connected to real API
export const machineService = {
  async getAllMachines(factoryId: string) {
    try {
      const response = await fetch(
        `${process.env.VITE_API_BASE_URL}/factories/${factoryId}/machines`
      );
      if (!response.ok) throw new Error('Failed to fetch machines');
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};
```

### Service Modules to Update

Each service in `src/services/api/` needs backend integration:

1. **dashboardService.ts**
   - GET `/dashboard/kpis`
   - GET `/dashboard/production-trend`
   - GET `/dashboard/machine-utilization`
   - GET `/dashboard/defect-categories`

2. **machineService.ts**
   - GET `/machines`
   - GET `/machines/:id`
   - PUT `/machines/:id`
   - GET `/machines?status=...`

3. **productionService.ts**
   - GET `/production-orders`
   - GET `/production-orders/:id`
   - PUT `/production-orders/:id`
   - POST `/production-orders`

4. **schedulingService.ts**
   - GET `/schedules`
   - GET `/machines/:id/schedule`
   - POST `/schedules`
   - PUT `/schedules/:id`
   - DELETE `/schedules/:id`

5. **maintenanceService.ts**
   - GET `/maintenance/records`
   - GET `/machines/:id/maintenance`
   - GET `/maintenance/predictions`
   - POST `/maintenance/schedule`

6. **qualityService.ts**
   - GET `/quality/inspections`
   - GET `/quality/inspections/:id`
   - GET `/quality/stats`

7. **inventoryService.ts**
   - GET `/materials`
   - GET `/materials/:id`
   - GET `/materials/low-stock`
   - PUT `/materials/:id/stock`

8. **workforceService.ts**
   - GET `/employees`
   - GET `/employees/:id`
   - GET `/shifts`
   - POST `/shifts`

9. **energyService.ts**
   - GET `/energy/usage`
   - GET `/energy/consumption`
   - GET `/energy/cost`
   - GET `/energy/trend`

10. **alertsService.ts**
    - GET `/alerts`
    - GET `/alerts/unread`
    - GET `/alerts/:category`
    - PUT `/alerts/:id/read`
    - PUT `/alerts/:id/acknowledge`

### Authentication Integration

Add authentication middleware to API service:

```typescript
// In each service file
const API_BASE_URL = process.env.VITE_API_BASE_URL;

function getAuthHeaders() {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

export const apiCall = async (endpoint: string, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: getAuthHeaders()
  });
  
  if (response.status === 401) {
    // Handle token refresh or redirect to login
  }
  
  return response.json();
};
```

### Real-time Data (WebSocket)

For live machine monitoring:

```typescript
// Connect to WebSocket
const ws = new WebSocket(process.env.VITE_WS_URL);

ws.onopen = () => {
  ws.send(JSON.stringify({ 
    action: 'subscribe', 
    channel: `machines:${machineId}`
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Update component state with live data
};
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

This creates optimized files in the `dist/` directory.

### Deployment Targets

#### Vercel (Recommended for Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# With environment variables
vercel env add VITE_API_BASE_URL
```

#### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

Build and run:

```bash
docker build -t manufacturing-platform .
docker run -p 3000:3000 manufacturing-platform
```

#### AWS S3 + CloudFront

```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### Environment Configuration

Production `.env` file:

```env
VITE_API_BASE_URL=https://api.yourcompany.com
VITE_WS_URL=wss://ws.yourcompany.com
VITE_APP_ENV=production
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Sidebar navigation works on all pages
- [ ] Responsive design on mobile (320px+), tablet (768px+), desktop
- [ ] All data tables sort and filter correctly
- [ ] Interactive charts display and respond to hover
- [ ] Form inputs validate correctly
- [ ] Modal dialogs open/close properly
- [ ] Notifications appear and dismiss
- [ ] Factory selector switches view correctly
- [ ] Search functionality works
- [ ] Alert badges update

### Performance Testing

```bash
# Lighthouse
# Use Chrome DevTools > Lighthouse tab

# Performance budgets
# Build size should be < 500KB (gzipped)
```

### Accessibility Testing

```bash
# Use axe DevTools browser extension
# Test keyboard navigation (Tab key)
# Test screen reader compatibility
# Check color contrast (WCAG AA standard)
```

## 🐛 Troubleshooting

### Common Issues

#### Port 3000 Already in Use

```bash
# Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

#### Dependencies Installation Fails

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### Hot Module Replacement Not Working

```bash
# Restart dev server
npm run dev

# Check firewall settings
# Ensure localhost:5173 is not blocked
```

#### TypeScript Errors in IDE

```bash
# Restart TypeScript server
# In VS Code: Ctrl+Shift+P > "TypeScript: Restart TS Server"
```

#### Build Fails

```bash
# Check for TypeScript errors
npm run build

# Clear Vite cache
rm -rf node_modules/.vite

# Try again
npm run build
```

### Performance Issues

If the app is slow:

1. **Check Network Tab**: Monitor API response times
2. **Check React DevTools**: Look for unnecessary re-renders
3. **Use Performance Tab**: Identify bottlenecks
4. **Optimize Images**: Use appropriate formats and sizes
5. **Code Splitting**: Consider lazy loading routes

### Mobile Responsiveness Issues

- Test with real devices or Chrome DevTools device emulation
- Check viewport meta tag in `index.html`
- Use Tailwind's responsive prefixes (sm, md, lg)
- Test touch interactions

## 📚 Additional Resources

### Documentation

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com)

### Libraries Used

- **React Router**: Client-side routing
- **Recharts**: Data visualization
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library (ready to use)

## 🤝 Support

For questions or issues:

1. Check the README.md for overview
2. Review service modules for API patterns
3. Check type definitions in `src/types/index.ts`
4. Review mock data in `src/data/mockData.ts`

---

**Last Updated**: November 2024
**Version**: 1.0.0
**Status**: Production Ready
