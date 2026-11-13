import { useEffect, useState } from 'react';
import { n8nService } from '../services/n8nService';
import { QualityInspection } from '../types';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function QualityControl() {
  const [inspections, setInspections] = useState<QualityInspection[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      const res = await n8nService.quality.getInspections('FAC-001');
      if (res.success && res.data) {
        setInspections(Array.isArray(res.data) ? res.data : []);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <div className="p-8 animate-pulse"><div className="h-96 bg-gray-200 rounded-lg" /></div>;

  return (
    <div className="p-8 space-y-6 bg-white">
      <div>
        <h1 className="text-3xl font-bold text-black">Quality Control</h1>
        <p className="text-gray-600 mt-2">Product quality inspection and defect tracking</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card card-md">
          <p className="text-sm text-gray-600">Total Inspected</p>
          <p className="text-2xl font-bold mt-2">{stats?.totalInspected || 0}</p>
        </div>
        <div className="card card-md">
          <p className="text-sm text-gray-600">Accepted</p>
          <p className="text-2xl font-bold text-black mt-2">{stats?.totalAccepted || 0}</p>
        </div>
        <div className="card card-md">
          <p className="text-sm text-gray-600">Rejected</p>
          <p className="text-2xl font-bold text-white mt-2">{stats?.totalRejected || 0}</p>
        </div>
        <div className="card card-md">
          <p className="text-sm text-gray-600">Avg Defect Rate</p>
          <p className="text-2xl font-bold text-white mt-2">{stats?.avgDefectRate?.toFixed(2)}%</p>
        </div>
      </div>

      {/* Inspections Table */}
      <div className="card card-md overflow-hidden">
        <h2 className="text-lg font-semibold text-black mb-6 px-6 pt-6">Recent Inspections</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-t border-gray-300">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Inspection ID</th>
                <th className="px-6 py-3 text-left font-semibold">Batch</th>
                <th className="px-6 py-3 text-left font-semibold">Inspected</th>
                <th className="px-6 py-3 text-left font-semibold">Accepted</th>
                <th className="px-6 py-3 text-left font-semibold">Rejected</th>
                <th className="px-6 py-3 text-left font-semibold">Defect %</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {inspections.map((insp) => (
                <tr key={insp.id} className="hover:bg-white">
                  <td className="px-6 py-4 font-medium text-black">{insp.id}</td>
                  <td className="px-6 py-4">{insp.batchId}</td>
                  <td className="px-6 py-4">{insp.inspectedCount}</td>
                  <td className="px-6 py-4 text-black font-medium">{insp.acceptedCount}</td>
                  <td className="px-6 py-4 text-white font-medium">{insp.rejectedCount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      insp.defectPercentage === 0 ? 'bg-black text-white text-white' :
                      insp.defectPercentage < 2 ? 'bg-gray-500 text-white text-white' :
                      'bg-gray-700 text-white text-white'
                    }`}>
                      {insp.defectPercentage.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {insp.status === 'completed' ? (
                      <div className="flex items-center gap-1 text-black font-medium">
                        <CheckCircle size={16} /> Completed
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-black font-medium">
                        <AlertCircle size={16} /> {insp.status.charAt(0).toUpperCase() + insp.status.slice(1)}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

