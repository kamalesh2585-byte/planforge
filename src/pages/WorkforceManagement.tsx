import { useState, useEffect } from 'react';
import { Users, Plus, Search, Filter } from 'lucide-react';
import { mockManufacturingData } from '../data/mockManufacturingData';

export default function WorkforceManagement() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const data = mockManufacturingData;

  useEffect(() => {
    setLoading(true);
    // Use mock data
    setEmployees(data.employees);
    setFilteredEmployees(data.employees);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = employees;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by role
    if (filterRole !== 'all') {
      filtered = filtered.filter((emp) => emp.role === filterRole);
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter((emp) => emp.status === filterStatus);
    }

    setFilteredEmployees(filtered);
  }, [searchTerm, filterRole, filterStatus, employees]);

  const roleOptions = [...new Set(employees.map((e) => e.role))];
  const departmentOptions = [...new Set(employees.map((e) => e.department))];
  const shiftsOptions = [...new Set(employees.map((e) => e.shift))];

  const stats = {
    total: employees.length,
    active: employees.filter((e) => e.status === 'active').length,
    onLeave: employees.filter((e) => e.status === 'on_leave').length,
    avgPerformance: (employees.reduce((sum, e) => sum + (e.performance || 0), 0) / employees.length).toFixed(1),
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 space-y-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Workforce Management</h1>
          <p className="text-gray-600 mt-2">Managing {employees.length} employees across {departmentOptions.length} departments</p>
        </div>
        <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-2 font-semibold">
          <Plus className="w-5 h-5" />
          Add Employee
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">Total Employees</p>
          <p className="text-3xl font-bold text-black mt-2">{stats.total}</p>
          <p className="text-xs text-blue-600 mt-2">Across all factories</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">Active</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.active}</p>
          <p className="text-xs text-green-600 mt-2">{((stats.active / stats.total) * 100).toFixed(1)}% working</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="text-gray-600 text-sm">On Leave</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.onLeave}</p>
          <p className="text-xs text-yellow-600 mt-2">Out of office</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm">Avg Performance</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{stats.avgPerformance}%</p>
          <p className="text-xs text-purple-600 mt-2">Team average</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-250">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
          >
            <option value="all">All Roles</option>
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="on_leave">On Leave</option>
          </select>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
        {filteredEmployees.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No employees found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Department</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Shift</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Factory</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Performance</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp, idx) => (
                  <tr key={emp.id || idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-semibold text-black">{emp.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{emp.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{emp.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{emp.role}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{emp.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{emp.shift}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{emp.factory}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-black h-2 rounded-full"
                            style={{ width: `${emp.performance}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{emp.performance}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          emp.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {emp.status === 'on_leave' ? 'On Leave' : emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Department Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-black mb-4">Employees by Department</h2>
          <div className="space-y-2">
            {departmentOptions.map((dept) => {
              const count = employees.filter((e) => e.department === dept).length;
              return (
                <div key={dept} className="flex items-center justify-between">
                  <span className="text-gray-700">{dept}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-black h-2 rounded-full"
                        style={{ width: `${(count / employees.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-semibold text-gray-700">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-black mb-4">Employees by Shift</h2>
          <div className="space-y-2">
            {shiftsOptions.map((shift) => {
              const count = employees.filter((e) => e.shift === shift).length;
              return (
                <div key={shift} className="flex items-center justify-between">
                  <span className="text-gray-700">{shift} Shift</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-black h-2 rounded-full"
                        style={{ width: `${(count / employees.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-semibold text-gray-700">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pagination Info */}
      <div className="flex items-center justify-between text-sm text-gray-600 mt-6">
        <p>
          Showing {filteredEmployees.length} of {employees.length} employees
        </p>
        <p>Page 1 of 1</p>
      </div>
    </div>
  );
}
