import { useState } from 'react';
import { Save, Bell, Lock, User } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    factoryName: 'Shanghai Manufacturing Hub',
    timezone: 'Asia/Shanghai',
    language: 'en',
    theme: 'light',
    notifications: true,
    emailAlerts: true,
    criticalOnly: false,
  });

  return (
    <div className="p-8 space-y-6 bg-white">
      <div>
        <h1 className="text-3xl font-bold text-black">Settings</h1>
        <p className="text-gray-600 mt-2">Manage system configuration and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <div className="space-y-2">
            {[
              { id: 'general', label: 'General', icon: User },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'security', label: 'Security', icon: Lock },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                  activeTab === tab.id
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="card card-md space-y-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-black">General Settings</h2>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Factory Name</label>
                  <input
                    type="text"
                    value={settings.factoryName}
                    onChange={(e) => setSettings({ ...settings, factoryName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Timezone</label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option>Asia/Shanghai</option>
                      <option>Europe/Berlin</option>
                      <option>America/New_York</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Language</label>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="en">English</option>
                      <option value="zh">Chinese</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Theme</label>
                  <div className="flex gap-4">
                    {['Light', 'Dark'].map((theme) => (
                      <label key={theme} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="theme"
                          value={theme.toLowerCase()}
                          checked={settings.theme === theme.toLowerCase()}
                          onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                        />
                        <span className="text-gray-700">{theme}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-black">Notification Preferences</h2>

                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer p-4 bg-white rounded-lg border border-gray-300">
                    <div>
                      <p className="font-medium text-black">Enable Notifications</p>
                      <p className="text-sm text-gray-600">Receive system notifications</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                      className="w-5 h-5"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer p-4 bg-white rounded-lg border border-gray-300">
                    <div>
                      <p className="font-medium text-black">Email Alerts</p>
                      <p className="text-sm text-gray-600">Send important alerts via email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.emailAlerts}
                      onChange={(e) => setSettings({ ...settings, emailAlerts: e.target.checked })}
                      className="w-5 h-5"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer p-4 bg-white rounded-lg border border-gray-300">
                    <div>
                      <p className="font-medium text-black">Critical Alerts Only</p>
                      <p className="text-sm text-gray-600">Receive only critical severity notifications</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.criticalOnly}
                      onChange={(e) => setSettings({ ...settings, criticalOnly: e.target.checked })}
                      className="w-5 h-5"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-black">Security Settings</h2>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Current Password</label>
                  <input type="password" className="w-full px-4 py-2 border border-gray-400 rounded-lg" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">New Password</label>
                  <input type="password" className="w-full px-4 py-2 border border-gray-400 rounded-lg" />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Confirm New Password</label>
                  <input type="password" className="w-full px-4 py-2 border border-gray-400 rounded-lg" />
                </div>

                <div className="border-t border-gray-300 pt-6">
                  <h3 className="font-semibold text-black mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-lg border border-gray-300 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-black">Current Session</p>
                        <p className="text-xs text-gray-600">Last active: Just now</p>
                      </div>
                      <span className="text-xs font-medium text-black">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="border-t border-gray-300 pt-6 flex justify-end">
              <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                <Save size={20} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

