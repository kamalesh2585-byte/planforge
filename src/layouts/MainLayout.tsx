import { useState, ReactNode } from 'react';
import Sidebar from '../components/Sidebar';
import TopNavigation from '../components/TopNavigation';

interface MainLayoutProps {
  children: ReactNode;
  currentFactory: string;
  onFactoryChange: (factoryId: string) => void;
}

export default function MainLayout({ children, currentFactory, onFactoryChange }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNavigation 
          currentFactory={currentFactory} 
          onFactoryChange={onFactoryChange}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
