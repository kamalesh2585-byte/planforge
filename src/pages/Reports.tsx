import { useState } from 'react';
import { Download, Calendar } from 'lucide-react';

const reportTypes = [
  { id: 'production', name: 'Production Performance Report', description: 'Daily/weekly/monthly production metrics' },
  { id: 'machine', name: 'Machine Efficiency Report', description: 'Machine utilization and performance trends' },
  { id: 'downtime', name: 'Downtime Report', description: 'Machine downtime analysis and root causes' },
  { id: 'quality', name: 'Quality Report', description: 'Defect rates and quality metrics' },
  { id: 'maintenance', name: 'Maintenance Report', description: 'Maintenance schedule and history' },
  { id: 'inventory', name: 'Inventory Report', description: 'Stock levels and material movements' },
  { id: 'energy', name: 'Energy Report', description: 'Energy consumption and costs' },
];

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({ start: '2024-11-01', end: '2024-11-11' });

  return (
    <div className="p-8 space-y-6 bg-white">
      <div>
        <h1 className="text-3xl font-bold text-black">Reports & Analytics</h1>
        <p className="text-gray-600 mt-2">Generate detailed reports on manufacturing performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Report Types */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold text-black mb-4">Report Types</h2>
          <div className="space-y-2">
            {reportTypes.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedReport === report.id
                    ? 'bg-gray-200 border-2 border-black'
                    : 'card hover:shadow-md'
                }`}
              >
                <div className="font-medium text-black text-sm">{report.name}</div>
                <div className="text-xs text-gray-600 mt-1">{report.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Report Generator */}
        <div className="lg:col-span-3">
          {selectedReport ? (
            <div className="card card-md space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-black">
                  {reportTypes.find(r => r.id === selectedReport)?.name}
                </h2>
                <p className="text-gray-600 mt-2">
                  {reportTypes.find(r => r.id === selectedReport)?.description}
                </p>
              </div>

              {/* Date Range */}
              <div className="border-t border-gray-300 pt-6">
                <h3 className="font-semibold text-black mb-4">Date Range</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Start Date</label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">End Date</label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
              </div>

              {/* Metrics Selection */}
              <div className="border-t border-gray-300 pt-6">
                <h3 className="font-semibold text-black mb-4">Include Metrics</h3>
                <div className="space-y-2">
                  {['Summary', 'Trends', 'Comparison', 'Recommendations'].map((metric) => (
                    <label key={metric} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                      <span className="text-gray-700">{metric}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-gray-300 pt-6 flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  <Download size={20} />
                  Download PDF
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                  <Download size={20} />
                  Export CSV
                </button>
              </div>

              {/* Preview */}
              <div className="border-t border-gray-300 pt-6">
                <h3 className="font-semibold text-black mb-4">Preview</h3>
                <div className="bg-gray-100 p-6 rounded-lg">
                  <p className="text-gray-600 text-sm">
                    Sample report data would be displayed here. This is a functional interface ready for backend integration.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="card card-md flex items-center justify-center py-32 text-center">
              <div>
                <Calendar size={48} className="text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Select a report type</p>
                <p className="text-gray-600 text-sm">Choose from the left to generate a report</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

