import { useEffect, useState } from 'react';
import { n8nService } from '../services/n8nService';
import { MaintenancePrediction } from '../types';
import { AlertTriangle, TrendingDown } from 'lucide-react';

export default function PredictiveMaintenance() {
  const [predictions, setPredictions] = useState<MaintenancePrediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const res = await n8nService.maintenance.getRecords('FAC-001');
      if (res.success && res.data) {
        setPredictions(res.data);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <div className="p-8 animate-pulse"><div className="h-96 bg-gray-200 rounded-lg" /></div>;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-black text-white text-white border-gray-400';
      case 'medium': return 'bg-gray-500 text-white text-white border-gray-500';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'critical': return 'bg-gray-700 text-white text-white border-gray-600';
      default: return 'bg-gray-100';
    }
  };

  const criticalMachines = predictions.filter(p => p.riskLevel === 'critical');

  return (
    <div className="p-8 space-y-6 bg-white">
      <div>
        <h1 className="text-3xl font-bold text-black">Predictive Maintenance</h1>
        <p className="text-gray-600 mt-2">Machine health scores and maintenance recommendations</p>
      </div>

      {criticalMachines.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex gap-3">
            <AlertTriangle className="text-white flex-shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-red-900">{criticalMachines.length} machine(s) require immediate maintenance</h3>
              <p className="text-sm text-red-700 mt-1">Schedule maintenance immediately to avoid equipment failure</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {predictions.map((pred) => (
          <div key={pred.machineId} className={`card card-md border-l-4 ${
            pred.riskLevel === 'critical' ? 'border-red-500' :
            pred.riskLevel === 'high' ? 'border-orange-500' :
            pred.riskLevel === 'medium' ? 'border-amber-500' :
            'border-green-500'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-black">{pred.machineId}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(pred.riskLevel)}`}>
                {pred.riskLevel.toUpperCase()}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Health Score</span>
                  <span className="font-semibold">{pred.healthScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      pred.healthScore >= 80 ? 'bg-black' :
                      pred.healthScore >= 60 ? 'bg-gray-600' :
                      'bg-gray-900'
                    }`}
                    style={{ width: `${pred.healthScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Failure Probability</span>
                  <span className="font-semibold">{(pred.failureProbability * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      pred.failureProbability < 0.1 ? 'bg-black' :
                      pred.failureProbability < 0.3 ? 'bg-gray-600' :
                      'bg-gray-900'
                    }`}
                    style={{ width: `${Math.min(pred.failureProbability * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown size={16} className="text-gray-600" />
                  <span className="text-sm font-semibold text-black">Remaining Useful Life</span>
                </div>
                <p className="text-2xl font-bold text-black">{pred.remainingUsefulLife} hrs</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-black mb-2">Recommendations</h4>
                <ul className="space-y-1">
                  {pred.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm text-gray-700 flex gap-2">
                      <span className="text-blue-500">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Schedule Maintenance
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

