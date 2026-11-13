import { ReactNode } from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon?: ReactNode;
  onClick?: () => void;
  trend?: 'up' | 'down' | 'stable';
}

export default function StatsCard({ label, value, change, icon, onClick, trend }: StatsCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-gray-50 rounded-lg p-4 border border-gray-300 transition-all ${
        onClick ? 'cursor-pointer hover:shadow-lg hover:bg-gray-100' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-600 uppercase">{label}</p>
          <p className="text-2xl font-bold text-black mt-2">{value}</p>
          {change && (
            <p className={`text-xs font-medium mt-2 ${change.isPositive ? 'text-black' : 'text-gray-600'}`}>
              {change.isPositive ? '↑' : '↓'} {Math.abs(change.value)}% from last month
            </p>
          )}
        </div>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      {trend && (
        <div className="mt-3 pt-3 border-t border-gray-300">
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-600">Trend:</span>
            <span
              className={`text-xs font-semibold ${
                trend === 'up' ? 'text-black' : trend === 'down' ? 'text-gray-700' : 'text-gray-500'
              }`}
            >
              {trend === 'up' ? '📈 Up' : trend === 'down' ? '📉 Down' : '➡️ Stable'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
