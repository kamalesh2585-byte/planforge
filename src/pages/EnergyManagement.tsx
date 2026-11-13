import { useEffect, useState } from 'react';
import { n8nService } from '../services/n8nService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function EnergyManagement() {
  const [consumption, setConsumption] = useState<any[]>([]);
  const [trend, setTrend] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const res = await n8nService.energy.getMetrics('FAC-001');
      if (res.success && res.data) {
        setConsumption(res.data.consumption || []);
        setTrend(res.data.trend || []);
        setTotalConsumption(res.data.total || 0);
        setTotalCost(res.data.cost || 0);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <div className="p-8 animate-pulse"><div className="h-96 bg-gray-200 rounded-lg" /></div>;

  const avgConsumption = consumption.length > 0 
    ? consumption.reduce((sum, c) => sum + c.powerConsumption, 0) / consumption.length 
    : 0;

  return (
    <div className="p-8 space-y-6 bg-white">
      <div>
        <h1 className="text-3xl font-bold text-black">Energy Management</h1>
        <p className="text-gray-600 mt-2">Factory energy consumption and efficiency tracking</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card card-md">
          <p className="text-sm text-gray-600">Total Consumption (24h)</p>
          <p className="text-2xl font-bold mt-2">{consumption.reduce((sum, c) => sum + c.powerConsumption, 0).toFixed(0)} kWh</p>
        </div>
        <div className="card card-md">
          <p className="text-sm text-gray-600">Avg Power</p>
          <p className="text-2xl font-bold mt-2">{avgConsumption.toFixed(0)} kW</p>
        </div>
        <div className="card card-md">
          <p className="text-sm text-gray-600">Est. Cost (24h)</p>
          <p className="text-2xl font-bold text-orange-600 mt-2">${totalCost.toFixed(2)}</p>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="card card-md">
        <h2 className="text-lg font-semibold text-black mb-6">Energy Trend (7 Days)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="consumption" stroke="#F59E0B" strokeWidth={2} name="Consumption (kWh)" />
            <Line type="monotone" dataKey="cost" stroke="#3B82F6" strokeWidth={2} name="Cost ($)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Hourly Data */}
      <div className="card card-md">
        <h2 className="text-lg font-semibold text-black mb-6">Hourly Consumption (Last 24 Hours)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Time</th>
                <th className="px-6 py-3 text-left font-semibold">Power (kW)</th>
                <th className="px-6 py-3 text-left font-semibold">Cost</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {consumption.slice(0, 12).map((c, i) => (
                <tr key={i} className="hover:bg-white">
                  <td className="px-6 py-4">
                    {new Date(c.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 font-medium">{c.powerConsumption.toFixed(1)}</td>
                  <td className="px-6 py-4">${c.cost.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    {c.powerConsumption > avgConsumption * 1.2 ? (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-medium">High</span>
                    ) : (
                      <span className="px-2 py-1 bg-black text-white text-white rounded text-xs font-medium">Normal</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Efficiency Tips */}
      <div className="card card-md">
        <h2 className="text-lg font-semibold text-black mb-4">Energy Efficiency Recommendations</h2>
        <ul className="space-y-2">
          <li className="flex gap-3">
            <span className="text-blue-500 font-bold">•</span>
            <span className="text-gray-700">Schedule high-power operations during off-peak hours to reduce costs</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-500 font-bold">•</span>
            <span className="text-gray-700">Identify and optimize underperforming machines</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-500 font-bold">•</span>
            <span className="text-gray-700">Implement preventive maintenance to ensure equipment runs efficiently</span>
          </li>
          <li className="flex gap-3">
            <span className="text-blue-500 font-bold">•</span>
            <span className="text-gray-700">Monitor peak consumption periods and adjust workload distribution</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

