import { useEffect, useState } from 'react';
import { n8nService } from '../services/n8nService';
import { Machine } from '../types';
import { AlertCircle } from 'lucide-react';

export default function ResourceOptimization() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMachines = async () => {
      const res = await n8nService.machines.getAll('FAC-001');
      if (res.success && res.data) {
        setMachines(Array.isArray(res.data) ? res.data : []);
      }
      setLoading(false);
    };
    loadMachines();
  }, []);

  if (loading) return <div className="p-8 animate-pulse"><div className="h-96 bg-gray-200 rounded-lg" /></div>;

  const bottlenecks = machines.filter(m => m.utilizationPercentage > 85).sort((a, b) => b.utilizationPercentage - a.utilizationPercentage);
  const underutilized = machines.filter(m => m.status === 'idle' || m.utilizationPercentage < 30);
  const avgUtilization = machines.reduce((sum, m) => sum + m.utilizationPercentage, 0) / machines.length;

  return (
    <div className="p-8 space-y-6 bg-white">
      <div>
        <h1 className="text-3xl font-bold text-black">Resource Optimization</h1>
        <p className="text-gray-600 mt-2">Machine capacity utilization and bottleneck identification</p>
      </div>

      {bottlenecks.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
          <div className="flex gap-3">
            <AlertCircle className="text-white flex-shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-amber-900">{bottlenecks.length} bottleneck(s) detected</h3>
              <p className="text-sm text-amber-700 mt-1">High-utilization machines at risk of overload</p>
            </div>
          </div>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card card-md">
          <p className="text-sm text-gray-600">Avg Utilization</p>
          <p className="text-2xl font-bold mt-2">{avgUtilization.toFixed(1)}%</p>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-black h-2 rounded-full" style={{ width: `${avgUtilization}%` }} />
          </div>
        </div>
        <div className="card card-md">
          <p className="text-sm text-gray-600">Bottlenecks</p>
          <p className="text-2xl font-bold text-orange-600 mt-2">{bottlenecks.length}</p>
        </div>
        <div className="card card-md">
          <p className="text-sm text-gray-600">Underutilized</p>
          <p className="text-2xl font-bold text-gray-600 mt-2">{underutilized.length}</p>
        </div>
      </div>

      {/* Bottlenecks */}
      {bottlenecks.length > 0 && (
        <div className="card card-md">
          <h2 className="text-lg font-semibold text-black mb-4">Bottleneck Machines</h2>
          <div className="space-y-3">
            {bottlenecks.map((m) => (
              <div key={m.id} className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-black">{m.name}</h3>
                    <p className="text-sm text-gray-600">{m.category}</p>
                  </div>
                  <span className="text-lg font-bold text-orange-600">{m.utilizationPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${m.utilizationPercentage}%` }} />
                </div>
                <p className="text-xs text-gray-600 mt-2">Recommendation: Consider load distribution or additional capacity</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Underutilized */}
      {underutilized.length > 0 && (
        <div className="card card-md">
          <h2 className="text-lg font-semibold text-black mb-4">Underutilized Machines</h2>
          <div className="space-y-3">
            {underutilized.map((m) => (
              <div key={m.id} className="p-4 bg-gray-100 rounded-lg border border-gray-400">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-black">{m.name}</h3>
                    <p className="text-sm text-gray-600">{m.category}</p>
                  </div>
                  <span className="text-lg font-bold text-gray-600">{m.utilizationPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-slate-400 h-2 rounded-full" style={{ width: `${m.utilizationPercentage}%` }} />
                </div>
                <p className="text-xs text-gray-600 mt-2">Recommendation: Increase workload allocation or consider preventive maintenance</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

