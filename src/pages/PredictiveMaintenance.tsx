import { useEffect, useState } from 'react';
import { MaintenancePrediction } from '../types';
import { AlertTriangle, TrendingDown, AlertCircle } from 'lucide-react';
import { mockManufacturingData } from '../data/mockManufacturingData';

export default function PredictiveMaintenance() {
  const [predictions, setPredictions] = useState<MaintenancePrediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setNetworkError('');
        // Use mock data
        if (mockManufacturingData.predictions && mockManufacturingData.predictions.length > 0) {
          setPredictions(mockManufacturingData.predictions);
        } else {
          setNetworkError('No predictive data available');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading predictions:', error);
        setNetworkError('Failed to load predictive maintenance data');
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading predictions...</p>
        </div>
      </div>
    );
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const criticalMachines = predictions.filter((p) => p.riskLevel === 'critical');

  return (
    <div className="p-8 space-y-6 bg-white min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-black">Predictive Maintenance</h1>
        <p className="text-gray-600 mt-2">Machine health scores and maintenance recommendations</p>
      </div>

      {networkError && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-red-900">Connection Error</p>
            <p className="text-sm text-red-700 mt-1">{networkError}</p>
          </div>
        </div>
      )}

      {criticalMachines.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex gap-3">
            <AlertTriangle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold text-red-900">{criticalMachines.length} machine(s) require immediate maintenance</h3>
              <p className="text-sm text-red-700 mt-1">Schedule maintenance immediately to avoid equipment failure</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {predictions.map((pred) => (
          <div
            key={pred.machineId}
            className={`bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition ${
              pred.riskLevel === 'critical'
                ? 'border-l-4 border-l-red-500'
                : pred.riskLevel === 'high'
                ? 'border-l-4 border-l-orange-500'
                : pred.riskLevel === 'medium'
                ? 'border-l-4 border-l-yellow-500'
                : 'border-l-4 border-l-green-500'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-black text-lg">{pred.machineId}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRiskColor(pred.riskLevel)}`}>
                {pred.riskLevel.toUpperCase()}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Health Score</span>
                  <span className="font-semibold text-black">{pred.healthScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      pred.healthScore >= 80
                        ? 'bg-green-600'
                        : pred.healthScore >= 60
                        ? 'bg-yellow-600'
                        : pred.healthScore >= 40
                        ? 'bg-orange-600'
                        : 'bg-red-600'
                    }`}
                    style={{ width: `${pred.healthScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Failure Probability</span>
                  <span className="font-semibold text-black">{(pred.failureProbability * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      pred.failureProbability < 0.1
                        ? 'bg-green-600'
                        : pred.failureProbability < 0.3
                        ? 'bg-yellow-600'
                        : pred.failureProbability < 0.6
                        ? 'bg-orange-600'
                        : 'bg-red-600'
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
                <h4 className="text-sm font-semibold text-black mb-3">Recommendations</h4>
                <ul className="space-y-2">
                  {pred.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm text-gray-700 flex gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-semibold">
                Schedule Maintenance
              </button>
            </div>
          </div>
        ))}
      </div>

      {predictions.length === 0 && !networkError && (
        <div className="text-center p-12">
          <p className="text-gray-500 text-lg">No predictive data available</p>
        </div>
      )}
    </div>
  );
}

