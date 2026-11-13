import { useState } from 'react';
import { Users, Settings, Shield, FileText, Database, Activity } from 'lucide-react';
import UserManagement from '../components/admin/UserManagement';
import SystemSettings from '../components/admin/SystemSettings';
import RoleManagement from '../components/admin/RoleManagement';
import AuditLogs from '../components/admin/AuditLogs';
import BackupRecovery from '../components/admin/BackupRecovery';

type AdminTab = 'users' | 'settings' | 'roles' | 'audit' | 'backup';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<AdminTab>('users');

  const tabs = [
    { id: 'users' as AdminTab, label: 'Users', icon: Users },
    { id: 'settings' as AdminTab, label: 'Settings', icon: Settings },
    { id: 'roles' as AdminTab, label: 'Roles', icon: Shield },
    { id: 'audit' as AdminTab, label: 'Audit Logs', icon: FileText },
    { id: 'backup' as AdminTab, label: 'Backup', icon: Database },
  ];

  return (
    <div className="p-8 space-y-6 bg-white h-full">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black">Admin Panel</h1>
        <p className="text-gray-600 mt-2">System administration and management</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-300 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-black text-black font-semibold'
                  : 'border-transparent text-gray-600 hover:text-black'
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'settings' && <SystemSettings />}
        {activeTab === 'roles' && <RoleManagement />}
        {activeTab === 'audit' && <AuditLogs />}
        {activeTab === 'backup' && <BackupRecovery />}
      </div>
    </div>
  );
}
