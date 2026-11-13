import { useState } from 'react';
import { Save, AlertCircle } from 'lucide-react';

export default function SystemSettings() {
  const [settings, setSettings] = useState({
    siteName: 'Manufacturing Intelligence Platform',
    siteUrl: 'https://manufacturing.local',
    maintenanceMode: false,
    logLevel: 'info',
    sessionTimeout: '30',
    maxUploadSize: '100',
    emailNotifications: true,
    dataRetention: '365',
    autoBackup: true,
    backupFrequency: 'daily',
    timezone: 'UTC',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Save Notification */}
      {saved && (
        <div className="p-4 bg-black text-white rounded-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="text-sm font-medium">Settings saved successfully</span>
        </div>
      )}

      {/* General Settings */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-300">
        <h3 className="text-lg font-bold text-black mb-4">General Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Site URL</label>
            <input
              type="text"
              value={settings.siteUrl}
              onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
            >
              <option>UTC</option>
              <option>EST</option>
              <option>CST</option>
              <option>MST</option>
              <option>PST</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="maintenance"
              checked={settings.maintenanceMode}
              onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="maintenance" className="text-sm font-medium text-black cursor-pointer">
              Maintenance Mode
            </label>
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-300">
        <h3 className="text-lg font-bold text-black mb-4">System Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">Log Level</label>
            <select
              value={settings.logLevel}
              onChange={(e) => setSettings({ ...settings, logLevel: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
            >
              <option>debug</option>
              <option>info</option>
              <option>warning</option>
              <option>error</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Session Timeout (min)</label>
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Max Upload Size (MB)</label>
            <input
              type="number"
              value={settings.maxUploadSize}
              onChange={(e) => setSettings({ ...settings, maxUploadSize: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Data Retention (days)</label>
            <input
              type="number"
              value={settings.dataRetention}
              onChange={(e) => setSettings({ ...settings, dataRetention: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
            />
          </div>
        </div>
      </div>

      {/* Email & Notifications */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-300">
        <h3 className="text-lg font-bold text-black mb-4">Email & Notifications</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="emailNotif"
              checked={settings.emailNotifications}
              onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="emailNotif" className="text-sm font-medium text-black cursor-pointer">
              Enable Email Notifications
            </label>
          </div>
        </div>
      </div>

      {/* Backup Settings */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-300">
        <h3 className="text-lg font-bold text-black mb-4">Backup & Recovery</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="autoBackup"
              checked={settings.autoBackup}
              onChange={(e) => setSettings({ ...settings, autoBackup: e.target.checked })}
              className="w-4 h-4 cursor-pointer"
            />
            <label htmlFor="autoBackup" className="text-sm font-medium text-black cursor-pointer">
              Enable Automatic Backups
            </label>
          </div>

          {settings.autoBackup && (
            <div>
              <label className="block text-sm font-medium text-black mb-1">Backup Frequency</label>
              <select
                value={settings.backupFrequency}
                onChange={(e) => setSettings({ ...settings, backupFrequency: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
              >
                <option>hourly</option>
                <option>daily</option>
                <option>weekly</option>
                <option>monthly</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
      >
        <Save size={18} />
        Save Settings
      </button>
    </div>
  );
}
