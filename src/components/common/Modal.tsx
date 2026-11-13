import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  actionLabel?: string;
  onAction?: () => void;
  isLoading?: boolean;
}

export default function Modal({
  isOpen,
  title,
  children,
  onClose,
  actionLabel = 'Save',
  onAction,
  isLoading = false,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-300">
          <h2 className="text-lg font-bold text-black">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            disabled={isLoading}
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">{children}</div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-300">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          {onAction && (
            <button
              onClick={onAction}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors font-medium disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
