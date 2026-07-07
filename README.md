# Sarathi AI - Delivery Governance & KPI Dashboard

An intelligent AI-powered dashboard for monitoring delivery governance, KPIs, project health, team performance, and actionable insights. Built with React, TypeScript, and Vite for high performance and developer experience.

## 🎯 Features

- **Dashboard Overview** - Real-time KPI tracking and project health metrics
- **AI Insights** - Intelligent analysis and recommendations powered by AI
- **Analytics** - Comprehensive data visualization and trend analysis
- **Project Management** - Track project status, timelines, and deliverables
- **Risk Management** - Identify, monitor, and mitigate project risks
- **Team Performance** - Monitor team productivity and allocation
- **Reports** - Generate detailed reports on governance and performance
- **Action Items** - Track and manage action items across projects
- **Dark/Light Theme** - Flexible UI theme with dark and light modes

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Sarathi_Ai/Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ``

3. **Start development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Build & Deployment

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Deploy
Built files are in the `dist/` folder. Deploy to your hosting platform (Vercel, Netlify, AWS S3, etc.)

## 🏗️ Project Structure

```
Frontend/
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/              # Page components for routing
│   ├── contexts/           # React Context for state management
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services and external integrations
│   ├── types/              # TypeScript type definitions
│   ├── data/               # Mock data and constants
│   ├── styles.css          # Global styles
│   ├── App.tsx             # Main App component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Project dependencies
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18+
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, PostCSS
- **State Management**: React Context API
- **Charting**: Recharts/Charts.js
- **HTTP Client**: Axios

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint (if configured) |
| `npm run type-check` | Type check with TypeScript |

## 🎨 Components Overview

- **Dashboard** - Main dashboard with KPI cards and charts
- **Navbar** - Top navigation bar with branding
- **Sidebar** - Navigation sidebar with menu items
- **DashboardCard** - Reusable card component for metrics
- **BurndownChart** - Sprint burndown visualization
- **DonutChart** - Distribution data visualization
- **GaugeChart** - Metric gauge display
- **RiskTable** - Risk items with severity levels
- **TeamPerformance** - Team capacity and utilization
- **AIInsights** - AI-generated insights and recommendations
- **ActionList** - Tracked action items

## 🌙 Theme System

The application supports theme switching via React Context:
- Light theme (default)
- Dark theme
- Persistent theme preference in localStorage

## 🔗 API Integration

API calls are configured in `src/services/api.ts`. Update the base URL in your environment configuration.

### Example API Endpoints
- `GET /api/dashboard` - Dashboard metrics
- `GET /api/projects` - Project list
- `GET /api/risks` - Risk items
- `GET /api/team-performance` - Team metrics
- `GET /api/ai-insights` - AI insights

## 🐛 Troubleshooting

### Port already in use
```bash
# Change Vite port
npm run dev -- --port 3000
```

### Dependencies not installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### Environment variables not working
- Ensure variables start with `VITE_` prefix
- Restart dev server after changing `.env.local`

## 📚 Development Guidelines

- Use TypeScript for all new code
- Follow component naming conventions (PascalCase)
- Keep components focused and reusable
- Use Tailwind CSS for styling
- Add proper type definitions in `src/types/`
- Mock data in `src/data/` for development

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/feature-name`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/feature-name`
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📧 Support

For issues, questions, or suggestions, please open an issue on the repository.
