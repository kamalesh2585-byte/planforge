import { useState } from 'react';
import { HardDrive, RotateCcw, Download, Trash2, Plus } from 'lucide-react';

interface Backup {
  id: string;
  name: string;
  size: string;
  type: 'automatic' | 'manual';
  timestamp: string;
  status: 'completed' | 'in-progress' | 'failed';
  recoveryTime: string;
}

const mockBackups: Backup[] = [
  {
    id: '1',
    name: 'Backup 2024-11-11 14:00',
    size: '2.4 GB',
    type: 'automatic',
    timestamp: '2024-11-11 14:00:00',
    status: 'completed',
    recoveryTime: '~5 minutes',
  },
  {
    id: '2',
    name: 'Backup 2024-11-11 02:00',
    size: '2.3 GB',
    type: 'automatic',
    timestamp: '2024-11-11 02:00:00',
    status: 'completed',
    recoveryTime: '~5 minutes',
  },
  {
    id: '3',
    name: 'Manual Backup Before Maintenance',
    size: '2.5 GB',
    type: 'manual',
    timestamp: '2024-11-10 18:30:00',
    status: 'completed',
    recoveryTime: '~5 minutes',
  },
  {
    id: '4',
    name: 'Backup 2024-11-10 14:00',
    size: '2.3 GB',
    type: 'automatic',
    timestamp: '2024-11-10 14:00:00',
    status: 'completed',
    recoveryTime: '~5 minutes',
  },
  {
    id: '5',
    name: 'Backup 2024-11-10 02:00',
    size: '2.2 GB',
    type: 'automatic',
    timestamp: '2024-11-10 02:00:00',
    status: 'completed',
    recoveryTime: '~5 minutes',
  },
];

export default function BackupRecovery() {
  const [backups, setBackups] = useState<Backup[]>(mockBackups);
  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleCreateBackup = () => {
    setIsBackingUp(true);
    const newBackup: Backup = {
      id: Date.now().toString(),
      name: `Backup ${new Date().toLocaleString()}`,
      size: '0 GB',
      type: 'manual',
      timestamp: new Date().toISOString(),
      status: 'in-progress',
      recoveryTime: '~5 minutes',
    };
    setBackups([newBackup, ...backups]);

    setTimeout(() => {
      setBackups((prev) =>
        prev.map((b) =>
          b.id === newBackup.id ? { ...b, size: '2.4 GB', status: 'completed' as const } : b
        )
      );
      setIsBackingUp(false);
    }, 3000);
  };

  const handleDeleteBackup = (id: string) => {
    setBackups(backups.filter((b) => b.id !== id));
  };

  const handleRecover = (id: string) => {
    alert(`Restore backup ${id} - This would restore the database to the selected backup point.`);
  };

  const totalSize = backups.reduce((sum, b) => {
    const size = parseFloat(b.size);
    return sum + size;
  }, 0);

  const completedCount = backups.filter((b) => b.status === 'completed').length;
  const failedCount = backups.filter((b) => b.status === 'failed').length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-300">
          <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Total Backups</p>
          <p className="text-3xl font-bold text-black">{backups.length}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-300">
          <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Total Size</p>
          <p className="text-3xl font-bold text-black">{totalSize.toFixed(1)} GB</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-300">
          <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Completed</p>
          <p className="text-3xl font-bold text-black">{completedCount}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-300">
          <p className="text-xs font-semibold text-gray-600 uppercase mb-2">Failed</p>
          <p className="text-3xl font-bold text-black">{failedCount}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleCreateBackup}
          disabled={isBackingUp}
          className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={18} />
          {isBackingUp ? 'Creating Backup...' : 'Create Backup Now'}
        </button>
      </div>

      {/* Backups List */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-black">Backup History</h3>
        <div className="space-y-2">
          {backups.map((backup) => (
            <div key={backup.id} className="bg-gray-50 rounded-lg p-4 border border-gray-300">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 bg-gray-200 rounded-lg">
                    <HardDrive size={20} className="text-black" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-black">{backup.name}</h4>
                    <div className="flex gap-4 text-xs text-gray-600 mt-2">
                      <span>{backup.size}</span>
                      <span>Type: {backup.type === 'automatic' ? 'Automatic' : 'Manual'}</span>
                      <span>{new Date(backup.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="flex gap-4 mt-2">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          backup.status === 'completed'
                            ? 'bg-black text-white'
                            : backup.status === 'in-progress'
                            ? 'bg-gray-400 text-white'
                            : 'bg-gray-700 text-white'
                        }`}
                      >
                        {backup.status.charAt(0).toUpperCase() + backup.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-600">Recovery time: {backup.recoveryTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {backup.status === 'completed' && (
                    <>
                      <button
                        onClick={() => handleRecover(backup.id)}
                        className="p-2 text-gray-600 hover:text-black hover:bg-gray-200 rounded transition-colors"
                        title="Restore"
                      >
                        <RotateCcw size={18} />
                      </button>
                      <button
                        className="p-2 text-gray-600 hover:text-black hover:bg-gray-200 rounded transition-colors"
                        title="Download"
                      >
                        <Download size={18} />
                      </button>
                    </>
                  )}
                  {backup.type === 'manual' && backup.status === 'completed' && (
                    <button
                      onClick={() => handleDeleteBackup(backup.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recovery Information */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-300">
        <h3 className="text-lg font-bold text-black mb-4">Recovery Information</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Last Completed Backup:</span> 2024-11-11 14:00:00 (2.4 GB)
          </p>
          <p>
            <span className="font-semibold">Next Automatic Backup:</span> 2024-11-12 02:00:00
          </p>
          <p>
            <span className="font-semibold">Backup Location:</span> /backups/manufacturing-db
          </p>
          <p>
            <span className="font-semibold">Retention Policy:</span> Keep 30 most recent backups
          </p>
          <div className="pt-3 border-t border-gray-300">
            <p className="font-semibold mb-2">To restore a backup:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Select a backup from the list above</li>
              <li>Click the restore icon</li>
              <li>Confirm the recovery - the system will be taken offline during recovery</li>
              <li>Recovery typically takes 5-15 minutes depending on backup size</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
