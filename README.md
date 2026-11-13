# 🏭 Textile Company Manufacturing Intelligence Platform

A comprehensive AI-powered manufacturing intelligence platform built with React, TypeScript, and n8n integration for textile company operations.

## ✨ Features

### 🤖 AI Manufacturing Chatbot
- **Intelligent Analysis**: Ask questions about machines, production, quality, inventory, energy, and more
- **Real-Time Data**: Analyzes comprehensive mock manufacturing data
- **OpenAI Integration**: Optional advanced AI with conversation memory (API key required)
- **Smart Responses**: Data-driven insights with specific recommendations
- **Suggested Questions**: Pre-built question templates for easy learning

### 📊 Dashboard & Monitoring
- **Real-Time KPIs**: Production, quality, energy, maintenance metrics
- **Machine Monitoring**: Loom status, health scores, utilization rates
- **Production Tracking**: Order status, completion rates, delay detection
- **Quality Control**: Inspection results, defect analysis, batch tracking
- **Alerts System**: Critical issues, warnings, notifications

### 🏭 14 Management Modules

1. **Dashboard** - Overview and KPIs
2. **Production Planning** - Order management with n8n integration
3. **Machine Management** - Loom and equipment tracking
4. **Live Monitoring** - Real-time machine data
5. **Predictive Maintenance** - Maintenance scheduling and forecasting
6. **Production Scheduling** - Timeline and resource planning
7. **Inventory Management** - Material and yarn stock control
8. **Quality Control** - Inspection and defect tracking
9. **Workforce Management** - Team and shift management
10. **Reports** - Analytics and insights
11. **Alerts & Notifications** - Issue tracking
12. **Admin Panel** - System configuration
13. **Energy Management** - Power consumption and optimization
14. **AI Manufacturing Copilot** - Intelligent chatbot

### 🔌 n8n Backend Integration
- Single webhook endpoint for all operations
- Real-time data synchronization
- Action-based routing
- Mock data fallback support

### 🎨 Modern UI/UX
- Black & white professional design
- Responsive layout
- Intuitive navigation
- Real-time updates
- Accessibility compliant

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Modern web browser
- (Optional) OpenAI API key for advanced chatbot

### Installation

```bash
# Clone or setup the project
cd d:\sns workbench

# Install dependencies
npm install

# Create environment configuration
cp .env.example .env

# Add your n8n webhook URL to .env
# VITE_API_URL=https://api.agents.snsihub.ai/webhook/71f5e821-4c67-40a7-b436-a004c36fe411

# Optional: Add OpenAI API key for advanced chatbot
# VITE_OPENAI_API_KEY=your_api_key_here
```

### Running the Application

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

**Access at**: http://localhost:3001/

## 🔐 Login Credentials

```
Email: admin@planforge.com
Password: admin123
```

## 📋 Project Structure

```
src/
├── components/
│   ├── Sidebar.tsx           # Navigation sidebar
│   ├── TopNavigation.tsx      # Top navigation bar
│   └── ...
├── pages/
│   ├── Dashboard.tsx           # Main dashboard
│   ├── AIAssistant.tsx         # 🤖 Chatbot interface
│   ├── ProductionPlanning.tsx
│   ├── MachineManagement.tsx
│   ├── LiveMonitoring.tsx
│   ├── PredictiveMaintenance.tsx
│   ├── ProductionScheduling.tsx
│   ├── InventoryManagement.tsx
│   ├── QualityControl.tsx
│   ├── WorkforceManagement.tsx
│   ├── Reports.tsx
│   ├── AlertsNotifications.tsx
│   ├── AdminPanel.tsx
│   ├── EnergyManagement.tsx
│   └── ...
├── services/
│   ├── n8nService.ts         # n8n webhook integration
│   ├── chatbotService.ts     # 🤖 Chatbot AI service
│   └── ...
├── data/
│   ├── mockManufacturingData.ts  # 📊 Mock data for chatbot
│   └── ...
├── config/
│   ├── api.ts                # API configuration
│   └── ...
├── context/
│   ├── AuthContext.tsx       # Authentication state
│   └── ...
└── types/
    └── index.ts              # TypeScript types
```

## 🤖 AI Chatbot Guide

### Quick Start

1. Click **"AI Manufacturing Copilot"** in the sidebar
2. Ask questions about your textile operations
3. Review suggested questions for examples
4. Get data-driven insights and recommendations

### Example Questions

```
"Which machine has the highest downtime?"
"What is the production status?"
"Which materials are running low?"
"Show me quality inspection results"
"What are the critical alerts?"
"Give me a summary report"
```

### Features

- ✅ Real-time manufacturing data analysis
- ✅ Intelligent response generation
- ✅ Conversation memory and context
- ✅ Actionable recommendations
- ✅ No API key required (uses mock data)
- ✅ Optional OpenAI integration for advanced features

**📚 See [CHATBOT_GUIDE.md](./CHATBOT_GUIDE.md) for detailed chatbot documentation**

## 📊 Mock Data

The platform includes comprehensive mock manufacturing data:

- **6 Machines** (Looms, Spinners, Dryers)
- **5 Production Orders** (Various stages)
- **6 Inventory Items** (Yarns, Dyes, Chemicals)
- **4 Quality Inspections** (Pass/Fail results)
- **4 Maintenance Records** (Preventive & Corrective)
- **5 Active Alerts** (Critical, Warning, Info)
- **3 Energy Consumption Records**
- **4 Team Members**
- **Complete KPI metrics**

**📚 See [MOCK_DATA_REFERENCE.md](./MOCK_DATA_REFERENCE.md) for detailed data structure**

## 🔧 n8n Backend Configuration

### Webhook URL
```
https://api.agents.snsihub.ai/webhook/71f5e821-4c67-40a7-b436-a004c36fe411
```

### Supported Actions

```typescript
// Production
production.createOrder()
production.getOrders()
production.updateOrder()
production.startProduction()
production.pauseProduction()
production.stopProduction()

// Machines
machines.getAll()
machines.get()
machines.update()
machines.getStatus()

// Inventory
inventory.getItems()
inventory.addItem()
inventory.updateItem()

// Quality
quality.addInspection()
quality.getInspections()

// Maintenance
maintenance.getRecords()
maintenance.scheduleService()
maintenance.recordService()

// Users
users.getAll()
users.create()
users.update()
users.delete()

// Audit
audit.getLogs()

// Alerts
alerts.getAlerts()
alerts.acknowledgeAlert()

// Dashboard
dashboard.getMetrics()
dashboard.getSummary()

// Energy
energy.getMetrics()
energy.getConsumption()

// Config
config.getFactories()
config.getDepartments()
config.getProductTypes()
```

## 🌐 Environment Configuration

Create a `.env` file:

```env
# n8n Backend
VITE_API_URL=https://api.agents.snsihub.ai/webhook/71f5e821-4c67-40a7-b436-a004c36fe411

# OpenAI API (Optional - for advanced chatbot)
VITE_OPENAI_API_KEY=

# Application
VITE_APP_NAME=Textile Company
VITE_APP_CODE=TC
VITE_DEFAULT_FACTORY=FAC-001
```

## 🎯 Key Features Breakdown

### Production Planning
- ✅ Create production orders
- ✅ Track order status and progress
- ✅ Assign to machines/looms
- ✅ Set priorities and deadlines
- ✅ Monitor delays

### Machine Management
- ✅ View all machines/looms
- ✅ Monitor health scores
- ✅ Track utilization rates
- ✅ View maintenance history
- ✅ Performance metrics

### Quality Control
- ✅ Record inspections
- ✅ Track defects
- ✅ Batch management
- ✅ Quality reports
- ✅ Pass/fail tracking

### Inventory Management
- ✅ Stock level monitoring
- ✅ Low stock alerts
- ✅ Reorder management
- ✅ Supplier tracking
- ✅ Material categorization

### Maintenance Scheduling
- ✅ Preventive maintenance planning
- ✅ Service history tracking
- ✅ Cost analysis
- ✅ Predictive maintenance
- ✅ Technician assignment

### Energy Management
- ✅ Consumption tracking
- ✅ Cost analysis
- ✅ Peak usage identification
- ✅ Optimization recommendations
- ✅ Trend analysis

### Workforce Management
- ✅ Employee profiles
- ✅ Shift assignments
- ✅ Role management
- ✅ Performance tracking
- ✅ Training records

### Alerts & Notifications
- ✅ Real-time alerts
- ✅ Priority levels
- ✅ Acknowledgment tracking
- ✅ Alert history
- ✅ Severity categorization

## 📈 Performance Metrics

The dashboard displays:

- **OEE** (Overall Equipment Effectiveness)
- **Production Rate** (units/hour)
- **Defect Rate** (%)
- **Machine Uptime** (%)
- **Utilization Rate** (%)
- **Quality Pass Rate** (%)
- **Energy Consumption** (kWh)
- **Cost per Unit**
- **Maintenance Costs**
- **Inventory Turnover**

## 🔐 Security Features

- ✅ Authentication required
- ✅ Role-based access control
- ✅ Audit logging
- ✅ Data validation
- ✅ Secure API communication

## 📱 Responsive Design

- ✅ Desktop (1920x1080+)
- ✅ Tablet (768px+)
- ✅ Mobile optimization
- ✅ Touch-friendly UI
- ✅ Accessible controls

## 🚀 Deployment

### Building for Production

```bash
npm run build
```

Generates optimized build in `dist/` folder.

### Environment Variables

Ensure `.env` is properly configured before building.

## 📚 Documentation

- **[CHATBOT_GUIDE.md](./CHATBOT_GUIDE.md)** - Comprehensive chatbot user guide
- **[MOCK_DATA_REFERENCE.md](./MOCK_DATA_REFERENCE.md)** - Mock data structure and examples
- **[API Configuration](./src/config/api.ts)** - Textile Company configuration

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
npm run build
```

### Dev Server Issues
```bash
# Kill process on port 3001
# Windows: taskkill /pid <PID> /f
# Then restart: npm run dev
```

### Chatbot Not Working
1. Check internet connection
2. Refresh page (Ctrl+R)
3. Clear browser cache
4. Verify backend URL in .env

### Backend Connection Issues
1. Check n8n webhook URL is correct
2. Ensure n8n workflow is active
3. Test webhook in n8n dashboard
4. Check console for error messages

## 📞 Support

For issues or questions:
- Review guides and documentation
- Check mock data reference
- Verify environment configuration
- Test with suggested chatbot questions

## 🎓 Learning Resources

- React Hooks documentation
- TypeScript handbook
- Tailwind CSS guide
- n8n documentation
- OpenAI API documentation

## 📝 License

This project is proprietary software for Textile Company.

## 👥 Team

Built for **Textile Company** manufacturing operations.

---

## 🎉 Quick Reference

| Task | Command | Location |
|------|---------|----------|
| Start Dev | `npm run dev` | http://localhost:3001 |
| Build | `npm run build` | `/dist` folder |
| Preview Build | `npm run preview` | local preview |
| View Chatbot | Sidebar → AI Manufacturing Copilot | `/copilot` |
| Configure API | `.env` file | `VITE_API_URL` |
| Add OpenAI | `.env` file | `VITE_OPENAI_API_KEY` |

---

**Happy Manufacturing! 🚀** Your intelligent textile manufacturing platform is ready to optimize operations!
