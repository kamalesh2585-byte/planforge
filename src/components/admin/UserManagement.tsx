import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@manufacturing.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2 hours ago',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@manufacturing.com',
    role: 'Supervisor',
    status: 'active',
    lastLogin: '30 minutes ago',
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@manufacturing.com',
    role: 'Operator',
    status: 'inactive',
    lastLogin: '3 days ago',
    createdAt: '2024-03-10',
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@manufacturing.com',
    role: 'Analyst',
    status: 'active',
    lastLogin: '1 hour ago',
    createdAt: '2024-03-15',
  },
  {
    id: '5',
    name: 'Tom Brown',
    email: 'tom@manufacturing.com',
    role: 'Technician',
    status: 'active',
    lastLogin: '20 minutes ago',
    createdAt: '2024-04-01',
  },
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Operator' });

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const user: User = {
        id: Date.now().toString(),
        ...newUser,
        status: 'active',
        lastLogin: 'Never',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setUsers([...users, user]);
      setNewUser({ name: '', email: '', role: 'Operator' });
      setShowAddModal(false);
    }
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
      )
    );
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex gap-4 items-center flex-wrap">
        <div className="flex-1 min-w-xs relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto border border-gray-300 rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="px-4 py-3 text-left font-semibold text-black">Name</th>
              <th className="px-4 py-3 text-left font-semibold text-black">Email</th>
              <th className="px-4 py-3 text-left font-semibold text-black">Role</th>
              <th className="px-4 py-3 text-left font-semibold text-black">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-black">Last Login</th>
              <th className="px-4 py-3 text-center font-semibold text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} className="border-b border-gray-300 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-black font-medium">{user.name}</td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                <td className="px-4 py-3">
                  <span className="inline-block px-3 py-1 bg-gray-200 text-black rounded-full text-xs font-medium">
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleToggleStatus(user.id)}
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                      user.status === 'active'
                        ? 'bg-black text-white hover:bg-gray-900'
                        : 'bg-gray-400 text-white hover:bg-gray-500'
                    }`}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </button>
                </td>
                <td className="px-4 py-3 text-gray-600">{user.lastLogin}</td>
                <td className="px-4 py-3 flex gap-2 justify-center">
                  <button className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-black">Add New User</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                >
                  <option>Admin</option>
                  <option>Supervisor</option>
                  <option>Operator</option>
                  <option>Analyst</option>
                  <option>Technician</option>
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleAddUser}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors font-medium text-sm"
                >
                  Add User
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
