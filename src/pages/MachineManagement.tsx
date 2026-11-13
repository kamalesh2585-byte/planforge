import { useEffect, useState } from 'react';
import { n8nService } from '../services/n8nService';
import { Machine } from '../types';
import { TrendingUp, Wrench } from 'lucide-react';

export default function MachineManagement() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'name' | 'status' | 'health'>('name');

  useEffect(() => {
    const loadMachines = async () => {
      const res = await n8nService.machines.getAll('FAC-001');
      if (res.success && res.data) {
        setMachines(res.data.data);
      }
      setLoading(false);
    };
    loadMachines();
  }, []);

  if (loading) return <div className="p-8 animate-pulse"><div className="h-96 bg-gray-200 rounded-lg" /></div>;

  const sorted = [...machines].sort((a, b) => {
    if (sortBy === 'health') return b.healthScore - a.healthScore;
    if (sortBy === 'status') return a.status.localeCompare(b.status);
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="p-8 space-y-6 bg-white">
      <div>
        <h1 className="text-3xl font-bold text-black">Machine Management</h1>
        <p className="text-gray-600 mt-2">Factory machine directory and performance</p>
      </div>

      <div className="flex gap-4">
        {['name', 'status', 'health'].map((val) => (
          <button
            key={val}
            onClick={() => setSortBy(val as any)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              sortBy === val
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 border border-gray-400 hover:bg-white'
            }`}
          >
            Sort by {val.charAt(0).toUpperCase() + val.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((machine) => (
          <div key={machine.id} className="card card-md hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-black">{machine.name}</h3>
                <p className="text-sm text-gray-600">{machine.category}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                machine.status === 'running' ? 'bg-black text-white text-white' :
                machine.status === 'idle' ? 'bg-gray-100 text-black' :
                machine.status === 'maintenance' ? 'bg-gray-500 text-white text-white' :
                'bg-gray-700 text-white text-white'
              }`}>
                {machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}
              </div>
            </div>

            <div className="space-y-3 mb-4 pb-4 border-b border-gray-300">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Utilization</span>
                <span className="font-semibold">{machine.utilizationPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-black h-2 rounded-full"
                  style={{ width: `${machine.utilizationPercentage}%` }}
                />
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Health Score</span>
                <span className={`font-semibold ${machine.healthScore >= 80 ? 'text-black' : machine.healthScore >= 60 ? 'text-white' : 'text-white'}`}>
                  {machine.healthScore}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    machine.healthScore >= 80 ? 'bg-black' :
                    machine.healthScore >= 60 ? 'bg-gray-600' :
                    'bg-gray-900'
                  }`}
                  style={{ width: `${machine.healthScore}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Operating Hours</span>
                <span className="font-medium">{machine.operatingHours.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Production</span>
                <span className="font-medium">{machine.currentProduction} units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Maintenance</span>
                <span className="font-medium text-black">{machine.lastMaintenanceDate}</span>
              </div>
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-blue-50 text-black rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

