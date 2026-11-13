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
import { TrendingUp, AlertCircle, Zap, Wrench, CheckCircle, Package, Clock } from 'lucide-react';
import { n8nService } from '../services/n8nService';

export default function Dashboard() {
  const [kpis, setKpis] = useState<any>(null);
  const [productionTrend, setProductionTrend] = useState<any>(null);
  const [machineUtil, setMachineUtil] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const res = await n8nService.dashboard.getMetrics('FAC-001');
      if (res.success && res.data) {
        setKpis(res.data);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-slate-200 rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-64 bg-slate-200 rounded-lg" />
            <div className="h-64 bg-slate-200 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 bg-white">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black">Manufacturing Dashboard</h1>
        <p className="text-gray-600 mt-2">Real-time factory intelligence and performance metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Production */}
        <div className="card card-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Production</p>
              <p className="text-2xl font-bold text-black mt-2">{kpis?.totalProduction || 0}</p>
              <p className="text-xs text-gray-500 mt-1">Target: {kpis?.productionTarget || 0}</p>
            </div>
            <div className="p-3 bg-gray-200 rounded-lg">
              <Package size={24} className="text-black" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-300 flex items-center gap-1">
            {((kpis?.totalProduction / kpis?.productionTarget) * 100 >= 100) ? (
              <TrendingUp size={16} className="text-black" />
            ) : (
              <TrendingUp size={16} className="text-gray-600" />
            )}
            <span className="text-xs font-medium text-gray-600">
              {((kpis?.totalProduction / kpis?.productionTarget) * 100).toFixed(1)}% of target
            </span>
          </div>
        </div>

        {/* OEE */}
        <div className="card card-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">OEE Score</p>
              <p className="text-2xl font-bold text-black mt-2">{kpis?.oee?.toFixed(1) || 0}%</p>
              <p className="text-xs text-gray-500 mt-1">Overall Equipment Effectiveness</p>
            </div>
            <div className="p-3 bg-gray-200 rounded-lg">
              <CheckCircle size={24} className="text-black" />
            </div>
          </div>
        </div>

        {/* Machine Availability */}
        <div className="card card-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Machine Availability</p>
              <p className="text-2xl font-bold text-black mt-2">{kpis?.machineAvailability?.toFixed(1) || 0}%</p>
              <p className="text-xs text-gray-500 mt-1">Operational machines</p>
            </div>
            <div className="p-3 bg-gray-300 rounded-lg">
              <Wrench size={24} className="text-black" />
            </div>
          </div>
        </div>

        {/* Defect Rate */}
        <div className="card card-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Defect Rate</p>
              <p className="text-2xl font-bold text-black mt-2">{kpis?.defectRate?.toFixed(1) || 0}%</p>
              <p className="text-xs text-gray-500 mt-1">Products rejected</p>
            </div>
            <div className="p-3 bg-gray-400 rounded-lg">
              <AlertCircle size={24} className="text-white" />
            </div>
          </div>
        </div>

        {/* On-Time Delivery */}
        <div className="card card-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">On-Time Delivery</p>
              <p className="text-2xl font-bold text-black mt-2">{kpis?.onTimeDeliveryRate?.toFixed(1) || 0}%</p>
              <p className="text-xs text-gray-500 mt-1">Orders on schedule</p>
            </div>
            <div className="p-3 bg-gray-200 rounded-lg">
              <Clock size={24} className="text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Trend */}
        <div className="lg:col-span-2 card card-md">
          <h2 className="text-lg font-semibold text-black mb-6">Production Trend (11 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={productionTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="production" stroke="#000" strokeWidth={2} name="Actual" />
              <Line type="monotone" dataKey="target" stroke="#666" strokeWidth={2} strokeDasharray="5 5" name="Target" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Machine Utilization */}
        <div className="card card-md">
          <h2 className="text-lg font-semibold text-black mb-6">Machine Utilization</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={machineUtil} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="utilization" fill="#333" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Stats */}
        <div className="card card-md">
          <h2 className="text-lg font-semibold text-black mb-4">Quick Metrics</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-gray-300">
              <span className="text-sm text-gray-600">Machine Utilization</span>
              <span className="font-semibold text-black">{kpis?.machineUtilization?.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-300">
              <span className="text-sm text-gray-600">Downtime</span>
              <span className="font-semibold text-black">{kpis?.downtime?.toFixed(1)} hrs</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-300">
              <span className="text-sm text-gray-600">Energy Consumption</span>
              <span className="font-semibold text-black">{kpis?.energyConsumption?.toFixed(1)} kWh</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Inventory Status</span>
              <span className="font-semibold text-black">{kpis?.inventoryStatus?.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card card-md">
          <h2 className="text-lg font-semibold text-black mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 pb-3 border-b border-gray-300">
              <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-black">Production Order Completed</p>
                <p className="text-xs text-gray-600">PO-2024-003 finished ahead of schedule</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-3 border-b border-gray-300">
              <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-black">Maintenance Alert</p>
                <p className="text-xs text-gray-600">MCH-006 requires scheduled maintenance</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-3 border-b border-gray-300">
              <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-black">Quality Inspection Complete</p>
                <p className="text-xs text-gray-600">Batch BATCH-002 passed with 0% defects</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-gray-700 rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-black">Inventory Low Stock</p>
                <p className="text-xs text-gray-600">Material MAT-003 approaching reorder level</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
