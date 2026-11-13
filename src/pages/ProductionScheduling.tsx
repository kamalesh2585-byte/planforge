import { useEffect, useState } from 'react';
import { n8nService } from '../services/n8nService';
import { ScheduleEntry } from '../types';

export default function ProductionScheduling() {
  const [schedules, setSchedules] = useState<ScheduleEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSchedules = async () => {
      const res = await n8nService.production.getOrders('FAC-001');
      if (res.success && res.data) {
        setSchedules(res.data);
      }
      setLoading(false);
    };
    loadSchedules();
  }, []);

  if (loading) return <div className="p-8 animate-pulse"><div className="h-96 bg-gray-200 rounded-lg" /></div>;

  return (
    <div className="p-8 space-y-6 bg-white">
      <div>
        <h1 className="text-3xl font-bold text-black">Production Scheduling</h1>
        <p className="text-gray-600 mt-2">Interactive Gantt chart and schedule management</p>
      </div>

      <div className="card card-md">
        <h2 className="text-lg font-semibold text-black mb-6">Schedule Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Machine</th>
                <th className="px-4 py-3 text-left font-semibold">Order</th>
                <th className="px-4 py-3 text-left font-semibold">Start Time</th>
                <th className="px-4 py-3 text-left font-semibold">Duration</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {schedules.map((s) => (
                <tr key={s.id} className="hover:bg-white">
                  <td className="px-4 py-3">{s.machineId}</td>
                  <td className="px-4 py-3 font-medium text-black">{s.productionOrderId}</td>
                  <td className="px-4 py-3">{new Date(s.startTime).toLocaleString()}</td>
                  <td className="px-4 py-3">{s.estimatedDuration} hrs</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-gray-200 text-black">
                      {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card card-md">
          <p className="text-sm text-gray-600">Total Schedules</p>
          <p className="text-2xl font-bold mt-2">{schedules.length}</p>
        </div>
        <div className="card card-md">
          <p className="text-sm text-gray-600">In Progress</p>
          <p className="text-2xl font-bold mt-2">{schedules.filter(s => s.status === 'in-progress').length}</p>
        </div>
        <div className="card card-md">
          <p className="text-sm text-gray-600">Scheduled</p>
          <p className="text-2xl font-bold mt-2">{schedules.filter(s => s.status === 'scheduled').length}</p>
        </div>
      </div>
    </div>
  );
}

