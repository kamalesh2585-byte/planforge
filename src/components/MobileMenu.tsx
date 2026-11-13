import { X } from 'lucide-react';
import { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function MobileMenu({ isOpen, onClose, children }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="fixed inset-0 left-0 top-16 w-64 bg-slate-900 shadow-lg z-50 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-lg"
        >
          <X size={24} className="text-white" />
        </button>
        <div className="pt-4">{children}</div>
      </div>
    </>
  );
}
