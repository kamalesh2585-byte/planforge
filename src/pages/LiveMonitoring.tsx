import { useEffect, useState } from 'react';
import { n8nService } from '../services/n8nService';
import { Machine } from '../types';
import { AlertCircle, Activity, Thermometer, Zap } from 'lucide-react';

export default function LiveMonitoring() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMachines = async () => {
      setLoading(true);
      const res = await n8nService.machines.getAll('FAC-001');
      if (res.success && res.data) {
        const machineList = Array.isArray(res.data) ? res.data : [];
        setMachines(machineList);
        setSelectedMachine(machineList[0] || null);
      }
      setLoading(false);
    };
    loadMachines();
  }, []);

  if (loading) {
    return <div className="p-8 animate-pulse"><div className="h-96 bg-gray-200 rounded-lg" /></div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-black text-white border-gray-700';
      case 'idle': return 'bg-gray-200 text-black border-gray-400';
      case 'maintenance': return 'bg-gray-400 text-white border-gray-600';
      case 'failed': return 'bg-gray-700 text-white border-gray-900';
      default: return 'bg-gray-200 text-black';
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'running': return 'bg-black animate-pulse';
      case 'idle': return 'bg-gray-400';
      case 'maintenance': return 'bg-gray-600';
      case 'failed': return 'bg-gray-900 animate-pulse';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="p-8 space-y-8 bg-white">
      <div>
        <h1 className="text-3xl font-bold text-black">Live Factory Monitoring</h1>
        <p className="text-gray-600 mt-2">Real-time machine status and sensor data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Machine List */}
        <div className="lg:col-span-1 space-y-2">
          <h2 className="text-lg font-semibold text-black mb-4">Factory Machines</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {machines.map((machine) => (
              <button
                key={machine.id}
                onClick={() => setSelectedMachine(machine)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedMachine?.id === machine.id
                    ? 'bg-black text-white border-2 border-black'
                    : 'card hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusIndicator(machine.status)}`} />
                  <span className={`text-sm font-medium ${selectedMachine?.id === machine.id ? 'text-white' : 'text-black'}`}>{machine.name}</span>
                </div>
                <div className={`text-xs ${selectedMachine?.id === machine.id ? 'text-gray-300' : 'text-gray-500'}`}>{machine.category}</div>
                <div className={`text-xs mt-1 px-2 py-1 rounded w-fit border ${getStatusColor(machine.status)}`}>
                  {machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Machine Details */}
        <div className="lg:col-span-3">
          {selectedMachine ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="card card-md border-l-4 border-black">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-black">{selectedMachine.name}</h2>
                    <p className="text-gray-600 mt-1">{selectedMachine.category}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-full ${getStatusColor(selectedMachine.status)}`}>
                    {selectedMachine.status.charAt(0).toUpperCase() + selectedMachine.status.slice(1)}
                  </div>
                </div>
              </div>

              {/* Real-time Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Temperature */}
                <div className="card card-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gray-300 rounded-lg">
                      <Thermometer size={20} className="text-black" />
                    </div>
                    <h3 className="font-semibold text-black">Temperature</h3>
                  </div>
                  <div className="text-3xl font-bold text-black">{selectedMachine.temperature}°C</div>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-black h-2 rounded-full"
                      style={{ width: `${Math.min((selectedMachine.temperature / 150) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Normal: 20-80°C</p>
                </div>

                {/* Vibration */}
                <div className="card card-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gray-300 rounded-lg">
                      <Activity size={20} className="text-black" />
                    </div>
                    <h3 className="font-semibold text-black">Vibration</h3>
                  </div>
                  <div className="text-3xl font-bold text-black">{selectedMachine.vibration.toFixed(2)} mm/s</div>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-600 h-2 rounded-full"
                      style={{ width: `${Math.min((selectedMachine.vibration / 10) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Normal: 0-5 mm/s</p>
                </div>

                {/* Power Consumption */}
                <div className="card card-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gray-400 rounded-lg">
                      <Zap size={20} className="text-white" />
                    </div>
                    <h3 className="font-semibold text-black">Power Consumption</h3>
                  </div>
                  <div className="text-3xl font-bold text-black">{selectedMachine.powerConsumption} kW</div>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-700 h-2 rounded-full"
                      style={{ width: `${Math.min((selectedMachine.powerConsumption / 100) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Capacity: 100 kW</p>
                </div>

                {/* Operating Speed */}
                <div className="card card-md">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gray-300 rounded-lg">
                      <Activity size={20} className="text-black" />
                    </div>
                    <h3 className="font-semibold text-black">Operating Speed</h3>
                  </div>
                  <div className="text-3xl font-bold text-black">{selectedMachine.operatingSpeed} RPM</div>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-600 h-2 rounded-full"
                      style={{ width: `${Math.min((selectedMachine.operatingSpeed / 5000) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Max: 5000 RPM</p>
                </div>
              </div>

              {/* Production & Utilization */}
              <div className="grid grid-cols-2 gap-4">
                <div className="card card-md">
                  <p className="text-sm text-gray-600 mb-1">Current Production</p>
                  <p className="text-2xl font-bold text-black">{selectedMachine.currentProduction}</p>
                  <p className="text-xs text-gray-600 mt-2">Units today</p>
                </div>
                <div className="card card-md">
                  <p className="text-sm text-gray-600 mb-1">Utilization</p>
                  <p className="text-2xl font-bold text-black">{selectedMachine.utilizationPercentage}%</p>
                  <p className="text-xs text-gray-600 mt-2">Of capacity</p>
                </div>
              </div>

              {/* Health & Maintenance */}
              <div className="card card-md">
                <h3 className="font-semibold text-black mb-4">Health & Maintenance</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Health Score</span>
                      <span className="font-semibold text-black">{selectedMachine.healthScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          selectedMachine.healthScore >= 80
                            ? 'bg-black'
                            : selectedMachine.healthScore >= 60
                            ? 'bg-gray-600'
                            : 'bg-gray-700'
                        }`}
                        style={{ width: `${selectedMachine.healthScore}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Operating Hours</span>
                    <span className="font-medium text-black">{selectedMachine.operatingHours.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-gray-300 pt-3">
                    <span className="text-gray-600">Last Maintenance</span>
                    <span className="font-medium text-black">{selectedMachine.lastMaintenanceDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Next Maintenance</span>
                    <span className="font-medium text-black">{selectedMachine.nextMaintenanceDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card card-md flex items-center justify-center h-96 text-center">
              <div>
                <AlertCircle size={48} className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select a machine to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
