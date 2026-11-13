import { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: ['create_user', 'edit_user', 'delete_user', 'view_reports', 'manage_settings', 'view_audit'],
    userCount: 2,
  },
  {
    id: '2',
    name: 'Supervisor',
    description: 'Supervise operations',
    permissions: ['view_reports', 'manage_production', 'view_audit'],
    userCount: 3,
  },
  {
    id: '3',
    name: 'Operator',
    description: 'Machine operation',
    permissions: ['operate_machines', 'view_live_data'],
    userCount: 5,
  },
  {
    id: '4',
    name: 'Analyst',
    description: 'Data analysis',
    permissions: ['view_reports', 'export_data', 'view_analytics'],
    userCount: 2,
  },
];

const availablePermissions = [
  'create_user',
  'edit_user',
  'delete_user',
  'view_reports',
  'manage_settings',
  'view_audit',
  'manage_production',
  'operate_machines',
  'view_live_data',
  'export_data',
  'view_analytics',
];

export default function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
  });

  const handleAddRole = () => {
    if (newRole.name && newRole.description) {
      const role: Role = {
        id: Date.now().toString(),
        ...newRole,
        userCount: 0,
      };
      setRoles([...roles, role]);
      setNewRole({ name: '', description: '', permissions: [] });
      setShowAddModal(false);
    }
  };

  const handleDeleteRole = (id: string) => {
    if (roles.find((r) => r.id === id)?.userCount === 0) {
      setRoles(roles.filter((r) => r.id !== id));
    }
  };

  const togglePermission = (perm: string) => {
    setNewRole((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex gap-4">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium"
        >
          <Plus size={18} />
          Add Role
        </button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role) => (
          <div key={role.id} className="border border-gray-300 rounded-lg p-6 bg-gray-50">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-black">{role.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{role.description}</p>
              </div>
              <button
                onClick={() => handleDeleteRole(role.id)}
                disabled={role.userCount > 0}
                className={`p-1.5 rounded transition-colors ${
                  role.userCount > 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="mb-4 pb-4 border-b border-gray-300">
              <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Users</p>
              <p className="text-2xl font-bold text-black">{role.userCount}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Permissions</p>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((perm) => (
                  <span
                    key={perm}
                    className="inline-block px-2 py-1 bg-black text-white text-xs rounded font-medium"
                  >
                    {perm.replace(/_/g, ' ')}
                  </span>
                ))}
                {role.permissions.length === 0 && <span className="text-gray-500 text-xs">No permissions</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Role Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-black">Add New Role</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Role Name</label>
                <input
                  type="text"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  placeholder="e.g., Manager"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">Description</label>
                <textarea
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  placeholder="Role description"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Permissions</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {availablePermissions.map((perm) => (
                    <label key={perm} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newRole.permissions.includes(perm)}
                        onChange={() => togglePermission(perm)}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="text-sm text-gray-700">{perm.replace(/_/g, ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleAddRole}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors font-medium text-sm"
                >
                  Create Role
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
