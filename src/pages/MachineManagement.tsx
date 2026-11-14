import { useEffect, useState } from 'react';
import { n8nService } from '../services/n8nService';
import { Wrench, AlertTriangle, TrendingUp } from 'lucide-react';
import { mockManufacturingData } from '../data/mockManufacturingData';

export default function MachineManagement() {
  const [machines, setMachines] = useState<any[]>([]);
  const [filteredMachines, setFilteredMachines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterFactory, setFilterFactory] = useState('all');

  const data = mockManufacturingData;

  useEffect(() => {
    const loadMachines = async () => {
      setLoading(true);
      // Use mock data
      setMachines(data.machines);
      setFilteredMachines(data.machines);
      setLoading(false);
    };
    loadMachines();
  }, []);

  useEffect(() => {
    let filtered = machines;

    if (filterStatus !== 'all') {
      filtered = filtered.filter((m) => m.status === filterStatus);
    }

    if (filterFactory !== 'all') {
      filtered = filtered.filter((m) => m.factory === filterFactory);
    }

    setFilteredMachines(filtered);
  }, [filterStatus, filterFactory, machines]);

  const stats = {
    total: machines.length,
    running: machines.filter((m) => m.status === 'running').length,
    idle: machines.filter((m) => m.status === 'idle').length,
    maintenance: machines.filter((m) => m.status === 'maintenance').length,
    avgHealth: (machines.reduce((sum, m) => sum + m.health, 0) / machines.length).toFixed(1),
    avgUtilization: (machines.reduce((sum, m) => sum + m.utilization, 0) / machines.length).toFixed(1),
  };

  const factories = [...new Set(machines.map((m) => m.factory))];

  if (loading) {
    return <div className="p-8">Loading machines...</div>;
  }

  return (
    <div className="p-8 space-y-6 bg-white min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black">Machine Management</h1>
        <p className="text-gray-600 mt-2">Monitoring {machines.length} machines across {factories.length} factories</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">Total Machines</p>
          <p className="text-3xl font-bold text-black mt-2">{stats.total}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">Running</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.running}</p>
          <p className="text-xs text-green-600 mt-1">{((stats.running / stats.total) * 100).toFixed(0)}%</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="text-gray-600 text-sm">Idle</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.idle}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border-l-4 border-orange-500">
          <p className="text-gray-600 text-sm">Maintenance</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{stats.maintenance}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm">Avg Health</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">{stats.avgHealth}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-2 border-gray-200 p-4 rounded-lg flex gap-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
        >
          <option value="all">All Status</option>
          <option value="running">Running</option>
          <option value="idle">Idle</option>
          <option value="maintenance">Maintenance</option>
        </select>

        <select
          value={filterFactory}
          onChange={(e) => setFilterFactory(e.target.value)}
          className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
        >
          <option value="all">All Factories</option>
          {factories.map((fac) => (
            <option key={fac} value={fac}>
              {fac}
            </option>
          ))}
        </select>
      </div>

      {/* Machines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMachines.map((machine) => (
          <div
            key={machine.id}
            className="bg-white border-2 border-gray-200 p-5 rounded-lg hover:shadow-lg transition"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="font-bold text-black">{machine.name}</p>
                <p className="text-xs text-gray-500 mt-1">{machine.id}</p>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs font-bold whitespace-nowrap ml-2 ${
                  machine.status === 'running'
                    ? 'bg-green-100 text-green-800'
                    : machine.status === 'maintenance'
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {machine.status.toUpperCase()}
              </span>
            </div>

            {/* Type & Factory */}
            <div className="text-xs text-gray-600 mb-3 space-y-1">
              <p>Type: {machine.type}</p>
              <p>Factory: {machine.factory} | Dept: {machine.department}</p>
            </div>

            {/* Health Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-semibold text-gray-700">Health</p>
                <p className="text-xs font-bold text-gray-700">{machine.health.toFixed(0)}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    machine.health > 80 ? 'bg-green-500' : machine.health > 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${machine.health}%` }}
                ></div>
              </div>
            </div>

            {/* Utilization */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-semibold text-gray-700">Utilization</p>
                <p className="text-xs font-bold text-gray-700">{machine.utilization.toFixed(1)}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${machine.utilization}%` }}
                ></div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-600">Uptime</p>
                <p className="font-bold text-gray-800">{machine.uptime.toFixed(1)}%</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-600">Speed</p>
                <p className="font-bold text-gray-800">{machine.speed.toFixed(0)}/{machine.maxSpeed}</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-600">Temp</p>
                <p className="font-bold text-gray-800">{machine.temperature.toFixed(1)}°C</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-gray-600">Defect Rate</p>
                <p className="font-bold text-gray-800">{machine.defectRate.toFixed(2)}%</p>
              </div>
            </div>

            {/* Maintenance Info */}
            <div className="text-xs text-gray-600 border-t border-gray-200 pt-2 space-y-1">
              <p>Last Service: {machine.lastMaintenance}</p>
              <p>Next Service: {machine.nextMaintenance}</p>
            </div>

            {/* Action Button */}
            <button className="w-full mt-3 px-3 py-2 bg-black text-white text-xs font-bold rounded hover:bg-gray-800 transition">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMachines.length === 0 && (
        <div className="text-center p-8 text-gray-500">No machines found with selected filters</div>
      )}
    </div>
  );
}
