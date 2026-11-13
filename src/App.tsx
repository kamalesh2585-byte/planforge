import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LiveMonitoring from './pages/LiveMonitoring';
import ProductionPlanning from './pages/ProductionPlanning';
import ProductionScheduling from './pages/ProductionScheduling';
import MachineManagement from './pages/MachineManagement';
import PredictiveMaintenance from './pages/PredictiveMaintenance';
import QualityControl from './pages/QualityControl';
import InventoryManagement from './pages/InventoryManagement';
import WorkforceManagement from './pages/WorkforceManagement';
import EnergyManagement from './pages/EnergyManagement';
import AIAssistant from './pages/AIAssistant';
import AlertsNotifications from './pages/AlertsNotifications';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import AdminPanel from './pages/AdminPanel';

function AppRoutes() {
  const [currentFactory, setCurrentFactory] = useState('FAC-001');
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <MainLayout currentFactory={currentFactory} onFactoryChange={setCurrentFactory}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/monitoring" element={<LiveMonitoring />} />
        <Route path="/planning" element={<ProductionPlanning />} />
        <Route path="/scheduling" element={<ProductionScheduling />} />
        <Route path="/machines" element={<MachineManagement />} />
        <Route path="/maintenance" element={<PredictiveMaintenance />} />
        <Route path="/quality" element={<QualityControl />} />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/workforce" element={<WorkforceManagement />} />
        <Route path="/energy" element={<EnergyManagement />} />
        <Route path="/copilot" element={<AIAssistant />} />
        <Route path="/alerts" element={<AlertsNotifications />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole={['admin']}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </MainLayout>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
