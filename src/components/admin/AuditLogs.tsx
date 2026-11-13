import { useState } from 'react';
import { Search, Download } from 'lucide-react';

interface AuditLog {
  id: string;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  details: string;
  status: 'success' | 'failed';
}

const mockLogs: AuditLog[] = [
  {
    id: '1',
    user: 'John Doe',
    action: 'create',
    resource: 'User',
    timestamp: '2024-11-11 14:32:10',
    details: 'Created new user: sarah.williams@manufacturing.com',
    status: 'success',
  },
  {
    id: '2',
    user: 'Jane Smith',
    action: 'update',
    resource: 'Machine Settings',
    timestamp: '2024-11-11 14:15:45',
    details: 'Updated temperature threshold for CNC-001',
    status: 'success',
  },
  {
    id: '3',
    user: 'Mike Johnson',
    action: 'delete',
    resource: 'Maintenance Record',
    timestamp: '2024-11-11 13:58:22',
    details: 'Deleted maintenance record MR-2024-001',
    status: 'failed',
  },
  {
    id: '4',
    user: 'Sarah Williams',
    action: 'export',
    resource: 'Production Report',
    timestamp: '2024-11-11 13:45:11',
    details: 'Exported production data for November 2024',
    status: 'success',
  },
  {
    id: '5',
    user: 'Tom Brown',
    action: 'update',
    resource: 'System Settings',
    timestamp: '2024-11-11 13:30:05',
    details: 'Changed backup frequency to daily',
    status: 'success',
  },
  {
    id: '6',
    user: 'John Doe',
    action: 'login',
    resource: 'Authentication',
    timestamp: '2024-11-11 13:00:33',
    details: 'User logged in from 192.168.1.100',
    status: 'success',
  },
];

export default function AuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>(mockLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = logs.filter((log) => {
    const matchSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase());

    const matchAction = filterAction === 'all' || log.action === filterAction;
    const matchStatus = filterStatus === 'all' || log.status === filterStatus;

    return matchSearch && matchAction && matchStatus;
  });

  const handleExport = () => {
    const csv = [
      ['User', 'Action', 'Resource', 'Timestamp', 'Details', 'Status'],
      ...filtered.map((log) => [log.user, log.action, log.resource, log.timestamp, log.details, log.status]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-4 items-end flex-wrap">
        <div className="flex-1 min-w-xs relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
        </div>

        <select
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
        >
          <option value="all">All Actions</option>
          <option value="create">Create</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
          <option value="export">Export</option>
          <option value="login">Login</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
        >
          <option value="all">All Status</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium"
        >
          <Download size={18} />
          Export
        </button>
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto border border-gray-300 rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="px-4 py-3 text-left font-semibold text-black">Timestamp</th>
              <th className="px-4 py-3 text-left font-semibold text-black">User</th>
              <th className="px-4 py-3 text-left font-semibold text-black">Action</th>
              <th className="px-4 py-3 text-left font-semibold text-black">Resource</th>
              <th className="px-4 py-3 text-left font-semibold text-black">Details</th>
              <th className="px-4 py-3 text-center font-semibold text-black">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log) => (
              <tr key={log.id} className="border-b border-gray-300 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-600 text-xs">{log.timestamp}</td>
                <td className="px-4 py-3 text-black font-medium">{log.user}</td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-1 bg-gray-200 text-black rounded text-xs font-medium capitalize">
                    {log.action}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{log.resource}</td>
                <td className="px-4 py-3 text-gray-600 text-xs max-w-xs truncate">{log.details}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      log.status === 'success'
                        ? 'bg-black text-white'
                        : 'bg-gray-700 text-white'
                    }`}
                  >
                    {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-300">
          <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Total Logs</p>
          <p className="text-2xl font-bold text-black">{logs.length}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-300">
          <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Success</p>
          <p className="text-2xl font-bold text-black">{logs.filter((l) => l.status === 'success').length}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-300">
          <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Failed</p>
          <p className="text-2xl font-bold text-black">{logs.filter((l) => l.status === 'failed').length}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-300">
          <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Unique Users</p>
          <p className="text-2xl font-bold text-black">{new Set(logs.map((l) => l.user)).size}</p>
        </div>
      </div>
    </div>
  );
}
