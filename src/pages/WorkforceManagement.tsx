import { useEffect, useState } from 'react';
import { n8nService } from '../services/n8nService';
import { Employee, ShiftAssignment } from '../types';

export default function WorkforceManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [shifts, setShifts] = useState<ShiftAssignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const res = await n8nService.users.getAll();
      if (res.success && res.data) {
        setEmployees(Array.isArray(res.data) ? res.data : []);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <div className="p-8 animate-pulse"><div className="h-96 bg-gray-200 rounded-lg" /></div>;

  return (
    <div className="p-8 space-y-6 bg-white">
      <div>
        <h1 className="text-3xl font-bold text-black">Workforce Management</h1>
        <p className="text-gray-600 mt-2">Employee directory, shifts, and workload distribution</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card card-md">
          <p className="text-sm text-gray-600">Total Employees</p>
          <p className="text-2xl font-bold mt-2">{employees.length}</p>
        </div>
        <div className="card card-md">
          <p className="text-sm text-gray-600">Active Today</p>
          <p className="text-2xl font-bold text-black mt-2">{employees.filter(e => e.status === 'active').length}</p>
        </div>
        <div className="card card-md">
          <p className="text-sm text-gray-600">On Leave</p>
          <p className="text-2xl font-bold text-white mt-2">{employees.filter(e => e.status === 'on-leave').length}</p>
        </div>
      </div>

      {/* Employees */}
      <div className="card card-md">
        <h2 className="text-lg font-semibold text-black mb-6">Employees</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Role</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Workload</th>
                <th className="px-6 py-3 text-left font-semibold">Assigned Machines</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-white">
                  <td className="px-6 py-4 font-medium text-black">{emp.name}</td>
                  <td className="px-6 py-4 text-gray-600">{emp.role}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      emp.status === 'active' ? 'bg-black text-white text-white' :
                      emp.status === 'on-leave' ? 'bg-gray-500 text-white text-white' :
                      'bg-gray-100 text-black'
                    }`}>
                      {emp.status.charAt(0).toUpperCase() + emp.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-black h-2 rounded-full"
                          style={{ width: `${emp.workload}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{emp.workload}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{emp.assignedMachines.join(', ') || 'None'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Today's Shifts */}
      <div className="card card-md">
        <h2 className="text-lg font-semibold text-black mb-6">Today's Shifts</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Employee</th>
                <th className="px-6 py-3 text-left font-semibold">Shift</th>
                <th className="px-6 py-3 text-left font-semibold">Time</th>
                <th className="px-6 py-3 text-left font-semibold">Machines</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {shifts.map((shift) => (
                <tr key={shift.id} className="hover:bg-white">
                  <td className="px-6 py-4 font-medium text-black">
                    {employees.find(e => e.id === shift.employeeId)?.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-gray-200 text-black">
                      {shift.shiftType.charAt(0).toUpperCase() + shift.shiftType.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{shift.startTime} - {shift.endTime}</td>
                  <td className="px-6 py-4 text-gray-600">{shift.assignedMachines.join(', ') || 'None'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

