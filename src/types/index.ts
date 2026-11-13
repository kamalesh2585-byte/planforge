// Factory Types
export interface Factory {
  id: string;
  name: string;
  location: string;
  timezone: string;
  status: 'operational' | 'maintenance' | 'offline';
}

// Machine Types
export type MachineStatus = 'running' | 'idle' | 'maintenance' | 'failed';

export interface Machine {
  id: string;
  factoryId: string;
  name: string;
  category: string;
  status: MachineStatus;
  operatingHours: number;
  currentProduction: number;
  utilizationPercentage: number;
  temperature: number;
  vibration: number;
  operatingSpeed: number;
  powerConsumption: number;
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  healthScore: number;
}

// Production Types
export interface ProductionOrder {
  id: string;
  factoryId: string;
  productId: string;
  productName: string;
  quantity: number;
  quantityProduced: number;
  unit?: string;
  status: 'planned' | 'in_progress' | 'in-progress' | 'completed' | 'delayed';
  targetStart: string;
  targetEnd: string;
  actualStart?: string | null;
  actualEnd?: string;
  machineId?: string;
  assignedMachine?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  completionPercentage?: number;
  delayedDays?: number;
  notes?: string;
  factory?: string;
  orderName?: string;
}

// Schedule Types
export interface ScheduleEntry {
  id: string;
  factoryId: string;
  machineId: string;
  productionOrderId: string;
  startTime: string;
  endTime: string;
  estimatedDuration: number;
  actualDuration?: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

// Maintenance Types
export interface MaintenanceRecord {
  id: string;
  machineId: string;
  type: 'preventive' | 'corrective' | 'predictive';
  date: string;
  duration: number;
  description: string;
  technician: string;
  cost: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

export interface MaintenancePrediction {
  machineId: string;
  healthScore: number;
  failureProbability: number;
  remainingUsefulLife: number; // in hours
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
}

// Quality Types
export interface QualityInspection {
  id: string;
  factoryId: string;
  batchId: string;
  productionOrderId: string;
  inspectionDate: string;
  inspectedCount: number;
  acceptedCount: number;
  rejectedCount: number;
  defectPercentage: number;
  defects: DefectRecord[];
  inspector: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface DefectRecord {
  id: string;
  category: string;
  description: string;
  severity: 'minor' | 'major' | 'critical';
  count: number;
  productId?: string;
}

// Inventory Types
export interface Material {
  id: string;
  factoryId: string;
  name: string;
  sku: string;
  unit: string;
  availableStock: number;
  reservedStock: number;
  reorderLevel: number;
  reorderQuantity: number;
  supplierId: string;
  unitCost: number;
  lastRestockDate: string;
}

export interface MaterialConsumption {
  id: string;
  materialId: string;
  productionOrderId: string;
  quantity: number;
  date: string;
}

// Workforce Types
export interface Employee {
  id: string;
  factoryId: string;
  name: string;
  role: string;
  status: 'active' | 'on-leave' | 'inactive';
  assignedMachines: string[];
  currentShift?: string;
  workload: number; // percentage
}

export interface ShiftAssignment {
  id: string;
  employeeId: string;
  factoryId: string;
  shiftType: 'morning' | 'afternoon' | 'night';
  date: string;
  startTime: string;
  endTime: string;
  assignedMachines: string[];
}

// Energy Types
export interface EnergyUsage {
  id: string;
  factoryId: string;
  machineId?: string;
  timestamp: string;
  powerConsumption: number; // kWh
  cost: number;
}

// Alerts & Notifications
export type AlertCategory = 'machine-failure' | 'maintenance' | 'quality' | 'inventory' | 'production' | 'scheduling' | 'energy';
export type AlertSeverity = 'info' | 'warning' | 'critical';

export interface Alert {
  id: string;
  factoryId: string;
  category: AlertCategory;
  severity: AlertSeverity;
  title: string;
  message: string;
  relatedEntityId?: string;
  relatedEntityType?: string;
  timestamp: string;
  isRead: boolean;
  isAcknowledged: boolean;
  actionRequired: boolean;
}

// Reports
export interface Report {
  id: string;
  factoryId: string;
  type: 'production' | 'machine' | 'downtime' | 'quality' | 'maintenance' | 'inventory' | 'energy';
  generatedDate: string;
  dateRange: {
    start: string;
    end: string;
  };
  data: Record<string, any>;
}

// Dashboard KPIs
export interface DashboardKPIs {
  totalProduction: number;
  productionTarget: number;
  oee: number;
  machineAvailability: number;
  machineUtilization: number;
  downtime: number;
  defectRate: number;
  inventoryStatus: number;
  energyConsumption: number;
  onTimeDeliveryRate: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'operator' | 'viewer';
  factoryId: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notificationsEnabled: boolean;
  defaultView: string;
}
