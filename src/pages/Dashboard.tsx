import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, AlertCircle, Zap, Wrench, CheckCircle, Package, Clock, Users } from 'lucide-react';
import { n8nService } from '../services/n8nService';
import { mockManufacturingData } from '../data/mockManufacturingData';

export default function Dashboard() {
  const [kpis, setKpis] = useState<any>(null);
  const [productionTrend, setProductionTrend] = useState<any>(null);
  const [machineUtil, setMachineUtil] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const data = mockManufacturingData;
  const metrics = data.metrics.overall;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await n8nService.dashboard.getMetrics('FAC-001');
        if (res.success && res.data) {
          setKpis(res.data);
        } else {
          setKpis(metrics);
        }
      } catch (error) {
        console.log('Using mock data for dashboard');
        setKpis(metrics);
      }

      setProductionTrend([
        { day: 'Mon', production: 250 },
        { day: 'Tue', production: 280 },
        { day: 'Wed', production: 320 },
        { day: 'Thu', production: 300 },
        { day: 'Fri', production: 350 },
        { day: 'Sat', production: 200 },
      ]);

      setMachineUtil([
        { name: 'Running', value: metrics.runningMachines, fill: '#000' },
        { name: 'Idle', value: metrics.idleMachines, fill: '#ccc' },
        { name: 'Maintenance', value: metrics.maintenanceMachines, fill: '#f97316' },
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  return (
    <div className="p-8 space-y-8 bg-white min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-black">PlanForge AI Dashboard</h1>
        <p className="text-gray-600 mt-2">Real-time manufacturing intelligence for 40 machines and 200 employees</p>
      </div>

      {/* Company Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Total Machines</p>
              <p className="text-3xl font-bold text-black mt-2">{metrics.totalMachines}</p>
            </div>
            <Wrench className="w-10 h-10 text-blue-500 opacity-50" />
          </div>
          <p className="text-xs text-blue-600 mt-3">📍 FAC-001: 15 | FAC-002: 15 | FAC-003: 10</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Total Employees</p>
              <p className="text-3xl font-bold text-black mt-2">{metrics.totalEmployees}</p>
            </div>
            <Users className="w-10 h-10 text-green-500 opacity-50" />
          </div>
          <p className="text-xs text-green-600 mt-3">👥 Active: {metrics.totalEmployees - 5} | On Leave: 5</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Raw Material Stock</p>
              <p className="text-3xl font-bold text-black mt-2">4,000</p>
            </div>
            <Package className="w-10 h-10 text-purple-500 opacity-50" />
          </div>
          <p className="text-xs text-purple-600 mt-3">📦 Units: 8 materials in stock</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">System Status</p>
              <p className="text-3xl font-bold text-green-600 mt-2">✓ Live</p>
            </div>
            <TrendingUp className="w-10 h-10 text-yellow-500 opacity-50" />
          </div>
          <p className="text-xs text-yellow-600 mt-3">All systems operational</p>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Machines Running</p>
          <p className="text-2xl font-bold text-black mt-1">{metrics.runningMachines}/{metrics.totalMachines}</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div
              className="bg-black h-2 rounded-full"
              style={{ width: `${(metrics.runningMachines / metrics.totalMachines) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">{((metrics.runningMachines / metrics.totalMachines) * 100).toFixed(1)}% Uptime</p>
        </div>

        <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Avg Utilization</p>
          <p className="text-2xl font-bold text-black mt-1">{metrics.avgUtilization.toFixed(1)}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div className="bg-black h-2 rounded-full" style={{ width: `${metrics.avgUtilization}%` }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Across all machines</p>
        </div>

        <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Quality Pass Rate</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{metrics.qualityPassRate.toFixed(1)}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${metrics.qualityPassRate}%` }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Defect rate: {metrics.avgDefectRate.toFixed(2)}%</p>
        </div>

        <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Daily Production</p>
          <p className="text-2xl font-bold text-black mt-1">{metrics.totalProduction.toLocaleString()}</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div className="bg-black h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Units produced today</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Trend */}
        <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-black mb-4">Weekly Production Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={productionTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="production" stroke="#000" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Machine Status */}
        <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-black mb-4">Machine Status Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={machineUtil} cx="50%" cy="50%" labelLine={false} label outerRadius={80} fill="#8884d8" dataKey="value">
                {machineUtil?.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-red-600" />
          Active Alerts ({data.alerts.filter((a: any) => !a.acknowledged).length})
        </h2>
        <div className="space-y-3">
          {data.alerts.slice(0, 3).map((alert: any) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border-l-4 ${
                alert.severity === 'critical'
                  ? 'bg-red-50 border-red-500'
                  : 'bg-yellow-50 border-yellow-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-black">{alert.message}</p>
                  <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                </div>
                {!alert.acknowledged && <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded">ACTION NEEDED</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">System Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-300">Average Uptime</p>
            <p className="text-2xl font-bold mt-1">{metrics.avgUptime.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-gray-300">Maintenance Cost (Month)</p>
            <p className="text-2xl font-bold mt-1">${data.metrics.maintenance.maintenanceCost.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-300">Daily Energy Cost</p>
            <p className="text-2xl font-bold mt-1">${data.metrics.energy.dailyCost.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-300">Inventory Value</p>
            <p className="text-2xl font-bold mt-1">${data.metrics.inventory.totalValue.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
