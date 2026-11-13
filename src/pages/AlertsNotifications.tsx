import { useEffect, useState } from 'react';
import { n8nService } from '../services/n8nService';
import { Alert } from '../types';
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export default function AlertsNotifications() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('all');

  useEffect(() => {
    const loadAlerts = async () => {
      const res = await n8nService.alerts.getAlerts('FAC-001');
      if (res.success && res.data) {
        setAlerts(res.data);
      }
      setLoading(false);
    };
    loadAlerts();
  }, []);

  if (loading) return <div className="p-8 animate-pulse"><div className="h-96 bg-gray-200 rounded-lg" /></div>;

  let filtered = alerts;
  if (filter === 'unread') {
    filtered = alerts.filter(a => !a.isRead);
  } else if (filter === 'critical') {
    filtered = alerts.filter(a => a.severity === 'critical');
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-amber-500 bg-amber-50';
      case 'info': return 'border-black bg-blue-50';
      default: return 'border-gray-400 bg-white';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertCircle size={20} className="text-white" />;
      case 'warning': return <AlertTriangle size={20} className="text-white" />;
      case 'info': return <Info size={20} className="text-black" />;
      default: return <Info size={20} className="text-gray-600" />;
    }
  };

  return (
    <div className="p-8 space-y-6 bg-white">
      <div>
        <h1 className="text-3xl font-bold text-black">Alerts & Notifications</h1>
        <p className="text-gray-600 mt-2">Centralized alert management and history</p>
      </div>

      {/* Stats & Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex gap-2">
          {['all', 'unread', 'critical'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === f
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 border border-gray-400 hover:bg-white'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="text-sm text-gray-600">
          Showing {filtered.length} of {alerts.length} alerts
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="card card-md flex items-center justify-center py-12 text-center">
            <div>
              <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">No alerts</p>
              <p className="text-gray-600 text-sm">Everything is running smoothly</p>
            </div>
          </div>
        ) : (
          filtered.map((alert) => (
            <div
              key={alert.id}
              className={`card card-md border-l-4 ${getSeverityColor(alert.severity)} flex items-start justify-between`}
            >
              <div className="flex gap-4 flex-1">
                <div className="flex-shrink-0 mt-1">
                  {getSeverityIcon(alert.severity)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-black">{alert.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                      <div className="flex gap-2 mt-2 text-xs text-gray-600">
                        <span>Category: {alert.category.replace('-', ' ')}</span>
                        <span>•</span>
                        <span>{new Date(alert.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!alert.isRead && (
                        <span className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 ml-4 flex-shrink-0">
                {alert.actionRequired && (
                  <span className="px-2 py-1 bg-gray-700 text-white text-white text-xs font-medium rounded">
                    Action Required
                  </span>
                )}
                {!alert.isAcknowledged && (
                  <button className="px-3 py-1 bg-gray-200 text-blue-700 text-xs font-medium rounded hover:bg-blue-200 transition-colors">
                    Acknowledge
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

