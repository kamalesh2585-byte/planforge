import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Eye,
  Briefcase,
  Calendar,
  Wrench,
  Zap,
  AlertTriangle,
  CheckCircle,
  Box,
  Users,
  Gauge,
  Zap as ZapIcon,
  Bot,
  Bell,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
} from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  {
    label: 'Overview Dashboard',
    icon: LayoutDashboard,
    path: '/',
    badge: null,
  },
  {
    label: 'Live Factory Monitoring',
    icon: Eye,
    path: '/monitoring',
    badge: 'LIVE',
  },
  {
    label: 'Production Planning',
    icon: Briefcase,
    path: '/planning',
    badge: null,
  },
  {
    label: 'Production Scheduling',
    icon: Calendar,
    path: '/scheduling',
    badge: null,
  },
  {
    label: 'Machine Management',
    icon: Wrench,
    path: '/machines',
    badge: null,
  },
  {
    label: 'Predictive Maintenance',
    icon: Zap,
    path: '/maintenance',
    badge: '1',
  },
  {
    label: 'Quality Control',
    icon: CheckCircle,
    path: '/quality',
    badge: null,
  },
  {
    label: 'Inventory & Materials',
    icon: Box,
    path: '/inventory',
    badge: '3',
  },
  {
    label: 'Workforce Management',
    icon: Users,
    path: '/workforce',
    badge: null,
  },
  {
    label: 'Energy Management',
    icon: ZapIcon,
    path: '/energy',
    badge: null,
  },
  {
    label: 'AI Manufacturing Copilot',
    icon: Bot,
    path: '/copilot',
    badge: null,
  },
  {
    label: 'Alerts & Notifications',
    icon: Bell,
    path: '/alerts',
    badge: '5',
  },
  {
    label: 'Reports & Analytics',
    icon: FileText,
    path: '/reports',
    badge: null,
  },
  {
    label: 'Settings',
    icon: Settings,
    path: '/settings',
    badge: null,
  },
  {
    label: 'Admin Panel',
    icon: Settings,
    path: '/admin',
    badge: null,
  },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'w-64' : 'w-20'
        } hidden lg:flex bg-black text-white shadow-lg transition-all duration-300 ease-in-out flex-col overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center font-bold text-sm text-white">
              PF
            </div>
            {isOpen && <span className="text-lg font-bold truncate">PlanForge</span>}
          </div>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg mb-2 transition-all duration-200 group relative ${
                  active
                    ? 'bg-gray-800 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-900'
                }`}
                title={!isOpen ? item.label : undefined}
              >
                <Icon size={20} className="flex-shrink-0" />
                {isOpen && (
                  <>
                    <span className="flex-1 text-sm font-medium truncate">{item.label}</span>
                    {item.badge && (
                      <span className="bg-red-500 text-xs font-bold px-2 py-1 rounded-full ml-auto flex-shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {!isOpen && item.badge && (
                  <span className="absolute -right-2 -top-2 bg-red-500 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}

                {/* Tooltip for collapsed sidebar */}
                {!isOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-700 p-4">
          <div className={`text-xs text-gray-400 ${!isOpen && 'text-center'}`}>
            {isOpen && <p>© 2024 PlanForge AI</p>}
            {isOpen && <p className="mt-2">v1.0.0</p>}
          </div>
        </div>
      </aside>

      {/* Mobile menu button (shown when sidebar is closed on small screens) */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-4 right-4 lg:hidden p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      )}
    </>
  );
}
