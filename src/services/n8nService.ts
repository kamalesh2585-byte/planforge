import { TEXTILE_CONFIG } from '../config/api';

const WEBHOOK_URL = import.meta.env.VITE_API_URL;

interface N8nRequest {
  action: string;
  data: any;
  [key: string]: any;
}

interface N8nResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

/**
 * Universal n8n webhook service for Textile Company
 * All requests go to the single n8n webhook endpoint
 * The n8n workflow determines the action based on the 'action' field
 */
export const n8nService = {
  /**
   * Send request to n8n webhook
   * @param action - The action to perform in n8n workflow
   * @param data - Data to send to backend
   */
  async call(action: string, data: any = {}): Promise<N8nResponse> {
    try {
      console.log(`📤 [${action}] Sending to n8n:`, data);

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          ...data,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ [${action}] Error:`, response.status, errorText);
        return {
          success: false,
          error: `HTTP ${response.status}: ${errorText || 'No response'}`,
        };
      }

      const result = await response.json();
      console.log(`✅ [${action}] Response:`, result);

      return {
        success: result.success !== false,
        message: result.message,
        data: result.data || result,
      };
    } catch (error: any) {
      console.error(`❌ [${action}] Exception:`, error);
      return {
        success: false,
        error: error?.message || 'Network error',
      };
    }
  },

  // Dashboard
  dashboard: {
    getMetrics: (factoryId: string) =>
      n8nService.call('dashboard.getMetrics', { factoryId }),
    getSummary: (factoryId: string) =>
      n8nService.call('dashboard.getSummary', { factoryId }),
  },

  // Production Orders
  production: {
    createOrder: (orderData: any) =>
      n8nService.call('production.createOrder', orderData),
    getOrders: (factoryId: string, filters?: any) =>
      n8nService.call('production.getOrders', { factoryId, ...filters }),
    updateOrder: (orderId: string, data: any) =>
      n8nService.call('production.updateOrder', { orderId, ...data }),
    deleteOrder: (orderId: string) =>
      n8nService.call('production.deleteOrder', { orderId }),
    startProduction: (orderId: string) =>
      n8nService.call('production.start', { orderId }),
    pauseProduction: (orderId: string) =>
      n8nService.call('production.pause', { orderId }),
    stopProduction: (orderId: string) =>
      n8nService.call('production.stop', { orderId }),
  },

  // Loom/Machine Management
  machines: {
    getAll: (factoryId: string) =>
      n8nService.call('machines.getAll', { factoryId }),
    get: (machineId: string) =>
      n8nService.call('machines.get', { machineId }),
    update: (machineId: string, data: any) =>
      n8nService.call('machines.update', { machineId, ...data }),
    getStatus: (machineId: string) =>
      n8nService.call('machines.getStatus', { machineId }),
  },

  // Yarn/Inventory
  inventory: {
    getItems: (factoryId: string) =>
      n8nService.call('inventory.getItems', { factoryId }),
    addItem: (itemData: any) =>
      n8nService.call('inventory.addItem', itemData),
    updateItem: (itemId: string, data: any) =>
      n8nService.call('inventory.updateItem', { itemId, ...data }),
    getStock: (itemId: string) =>
      n8nService.call('inventory.getStock', { itemId }),
  },

  // Quality Control
  quality: {
    addInspection: (inspectionData: any) =>
      n8nService.call('quality.addInspection', inspectionData),
    getInspections: (factoryId: string) =>
      n8nService.call('quality.getInspections', { factoryId }),
    getReport: (reportId: string) =>
      n8nService.call('quality.getReport', { reportId }),
  },

  // Maintenance
  maintenance: {
    getRecords: (factoryId: string) =>
      n8nService.call('maintenance.getRecords', { factoryId }),
    scheduleService: (machineId: string, date: string) =>
      n8nService.call('maintenance.schedule', { machineId, date }),
    recordService: (serviceData: any) =>
      n8nService.call('maintenance.record', serviceData),
  },

  // Users (Admin)
  users: {
    getAll: () => n8nService.call('users.getAll'),
    create: (userData: any) =>
      n8nService.call('users.create', userData),
    update: (userId: string, data: any) =>
      n8nService.call('users.update', { userId, ...data }),
    delete: (userId: string) =>
      n8nService.call('users.delete', { userId }),
  },

  // Audit Logs
  audit: {
    getLogs: (filters?: any) =>
      n8nService.call('audit.getLogs', filters || {}),
  },

  // Alerts
  alerts: {
    getAlerts: (factoryId: string) =>
      n8nService.call('alerts.getAlerts', { factoryId }),
    acknowledgeAlert: (alertId: string) =>
      n8nService.call('alerts.acknowledge', { alertId }),
  },

  // Config/Settings
  config: {
    getFactories: () => Promise.resolve({ 
      success: true, 
      data: TEXTILE_CONFIG.factories 
    }),
    getDepartments: () => Promise.resolve({ 
      success: true, 
      data: TEXTILE_CONFIG.departments 
    }),
    getProductTypes: () => Promise.resolve({ 
      success: true, 
      data: TEXTILE_CONFIG.productTypes 
    }),
  },

  // Energy Management
  energy: {
    getMetrics: (factoryId: string) =>
      n8nService.call('energy.getMetrics', { factoryId }),
    getConsumption: (factoryId: string) =>
      n8nService.call('energy.getConsumption', { factoryId }),
    getTrend: (factoryId: string) =>
      n8nService.call('energy.getTrend', { factoryId }),
  },
};
