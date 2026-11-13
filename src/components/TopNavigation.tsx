import { useState } from 'react';
import {
  Search,
  Building2,
  Clock,
  Bell,
  User,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  Menu,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { n8nService } from '../services/n8nService';
import { TEXTILE_CONFIG } from '../config/api';

interface TopNavigationProps {
  currentFactory: string;
  onFactoryChange: (factoryId: string) => void;
  onMenuToggle: () => void;
}

export default function TopNavigation({
  currentFactory,
  onFactoryChange,
  onMenuToggle,
}: TopNavigationProps) {
  const [showFactoryMenu, setShowFactoryMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const factory = TEXTILE_CONFIG.factories.find(f => f.id === currentFactory);
  const unreadAlerts: any[] = []; // Will load from backend when available
  const criticalAlerts: any[] = [];

  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="h-14 bg-black border-b border-gray-800 flex items-center px-6 gap-4 sticky top-0 z-40 shadow-md">
      {/* Menu Toggle (mobile) */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-1.5 hover:bg-gray-900 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        <Menu size={18} className="text-white" />
      </button>

      {/* Global Search */}
      <div className="hidden md:flex flex-1 max-w-sm relative">
        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search machines, orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-white focus:border-transparent text-xs text-white placeholder-gray-500"
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Factory Selector */}
      <div className="relative">
        <button
          onClick={() => setShowFactoryMenu(!showFactoryMenu)}
          className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-gray-900 rounded-lg transition-colors text-white border border-gray-700 text-sm"
        >
          <Building2 size={16} className="text-gray-400" />
          <span className="hidden sm:block truncate max-w-xs">
            {factory?.name || 'Factory'}
          </span>
          <ChevronDown size={14} className="text-gray-400" />
        </button>

        {/* Factory Dropdown */}
        {showFactoryMenu && (
          <div className="absolute top-full right-0 mt-1.5 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
            <div className="p-2">
              {TEXTILE_CONFIG.factories.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    onFactoryChange(f.id);
                    setShowFactoryMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-lg transition-colors mb-0.5 text-sm ${
                    currentFactory === f.id
                      ? 'bg-white text-black font-medium'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <div className="font-medium">{f.name}</div>
                  <div className="text-xs text-gray-500">{f.location}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Date & Time */}
      <div className="hidden md:flex items-center gap-2 text-gray-300 border-l border-gray-700 pl-4">
        <Clock size={16} className="text-gray-500" />
        <div className="text-right">
          <div className="text-xs font-semibold text-white">{timeString}</div>
          <div className="text-xs text-gray-500">{dateString}</div>
        </div>
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-1.5 hover:bg-gray-900 rounded-lg transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} className="text-gray-400" />
          {unreadAlerts.length > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-gray-700 text-white text-xs font-bold rounded-full flex items-center justify-center border border-black">
              {unreadAlerts.length}
            </span>
          )}
        </button>

        {/* Notifications Panel */}
        {showNotifications && (
          <div className="absolute top-full right-0 mt-1.5 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            <div className="p-3 border-b border-gray-700 flex items-center justify-between">
              <h3 className="font-semibold text-white text-sm">Notifications</h3>
              <span className="text-xs font-medium bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
                {unreadAlerts.length} new
              </span>
            </div>
            {unreadAlerts.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <CheckCircle size={28} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">All caught up!</p>
              </div>
            ) : (
              <div className="p-2">
                {unreadAlerts.slice(0, 5).map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-2 rounded-lg mb-1 flex gap-2 cursor-pointer hover:bg-gray-800 transition-colors border-l-3 text-sm ${
                      alert.severity === 'critical'
                        ? 'border-gray-500 bg-gray-800'
                        : 'border-gray-600 bg-gray-800'
                    }`}
                  >
                    <AlertCircle
                      size={16}
                      className={`flex-shrink-0 mt-0.5 ${
                        alert.severity === 'critical' ? 'text-gray-300' : 'text-gray-400'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-200">{alert.title}</h4>
                      <p className="text-xs text-gray-400 truncate">{alert.message}</p>
                    </div>
                  </div>
                ))}
                {unreadAlerts.length > 5 && (
                  <button className="w-full text-center py-1.5 text-xs text-gray-300 hover:bg-gray-800 rounded-lg transition-colors border-t border-gray-700 mt-1">
                    View all {unreadAlerts.length}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* System Status */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-900 rounded-lg border border-gray-700">
        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        <span className="text-xs font-medium text-gray-300 hidden sm:block">Live</span>
      </div>

      {/* User Profile */}
      <div className="relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-gray-900 rounded-lg transition-colors border border-gray-700"
        >
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-black font-bold text-xs">
            {user?.name.split(' ').map(n => n[0]).join('')}
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </button>

        {/* User Menu */}
        {showUserMenu && (
          <div className="absolute top-full right-0 mt-1.5 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
            <div className="p-2">
              <div className="px-2.5 py-2 border-b border-gray-700 mb-2">
                <p className="text-xs font-semibold text-gray-400 uppercase">Logged in as</p>
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
              <button className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-gray-800 transition-colors text-xs text-gray-300">
                Profile
              </button>
              <button className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-gray-800 transition-colors text-xs text-gray-300">
                Preferences
              </button>
              <hr className="my-1 border-gray-700" />
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                  setShowUserMenu(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-gray-800 transition-colors text-xs text-gray-400 font-medium flex items-center gap-2"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
