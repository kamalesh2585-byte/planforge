/**
 * n8n Webhook Service - Enhanced with Error Handling
 * Manages all backend API calls through n8n webhook
 */

interface N8nResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

const WEBHOOK_URL = import.meta.env.VITE_API_URL || 'https://api.agents.snsihub.ai/webhook/71f5e821-4c67-40a7-b436-a004c36fe411';

/**
 * Make API call with comprehensive error handling
 */
async function callWebhook(action: string, payload: any): Promise<N8nResponse> {
  try {
    const fullPayload = {
      action,
      timestamp: new Date().toISOString(),
      ...payload,
    };

    console.log(`📤 [n8n] Calling: ${action}`, fullPayload);

    // Set timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(fullPayload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.error(`❌ HTTP Error: ${response.status}`);
      return {
        success: false,
        error: `HTTP ${response.status}`,
        message: `Server returned error ${response.status}. Please try again.`,
      };
    }

    const data = await response.json();
    console.log(`✅ Response:`, data);

    return {
      success: true,
      data: data?.data || data,
      message: data?.message || 'Success',
    };
  } catch (error: any) {
    console.error(`❌ Webhook Error:`, error);

    if (error.name === 'AbortError') {
      return {
        success: false,
        error: 'timeout',
        message: 'Request timed out. Backend is not responding. Please check your connection.',
      };
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        error: 'network',
        message: 'Network error. Please check your internet connection.',
      };
    }

    return {
      success: false,
      error: error?.message || 'Unknown error',
      message: 'An error occurred. Please try again.',
    };
  }
}

// ==================== SERVICE DEFINITION ====================

export const n8nService = {
  call: (action: string, data?: any) => callWebhook(action, data || {}),

  production: {
    createOrder: (data: any) =>
      callWebhook('production.createOrder', data),
    getOrders: (factoryId: string) =>
      callWebhook('production.getOrders', { factoryId }),
    updateOrder: (orderId: string, data: any) =>
      callWebhook('production.updateOrder', { orderId, ...data }),
    startProduction: (orderId: string) =>
      callWebhook('production.startProduction', { orderId }),
    pauseProduction: (orderId: string) =>
      callWebhook('production.pauseProduction', { orderId }),
    stopProduction: (orderId: string) =>
      callWebhook('production.stopProduction', { orderId }),
  },

  machines: {
    getAll: (factoryId: string) =>
      callWebhook('machines.getAll', { factoryId }),
    get: (machineId: string) =>
      callWebhook('machines.get', { machineId }),
    update: (machineId: string, data: any) =>
      callWebhook('machines.update', { machineId, ...data }),
    getStatus: (machineId: string) =>
      callWebhook('machines.getStatus', { machineId }),
  },

  inventory: {
    getItems: (factoryId: string) =>
      callWebhook('inventory.getItems', { factoryId }),
    addItem: (data: any) =>
      callWebhook('inventory.addItem', data),
    updateItem: (itemId: string, data: any) =>
      callWebhook('inventory.updateItem', { itemId, ...data }),
    getStock: (itemId: string) =>
      callWebhook('inventory.getStock', { itemId }),
  },

  quality: {
    addInspection: (data: any) =>
      callWebhook('quality.addInspection', data),
    getInspections: (factoryId: string) =>
      callWebhook('quality.getInspections', { factoryId }),
    getReport: (batchId: string) =>
      callWebhook('quality.getReport', { batchId }),
  },

  maintenance: {
    getRecords: (factoryId: string) =>
      callWebhook('maintenance.getRecords', { factoryId }),
    scheduleService: (data: any) =>
      callWebhook('maintenance.scheduleService', data),
    recordService: (data: any) =>
      callWebhook('maintenance.recordService', data),
  },

  users: {
    getAll: () => callWebhook('users.getAll', {}),
    create: (userData: any) =>
      callWebhook('users.create', userData),
    update: (userId: string, data: any) =>
      callWebhook('users.update', { userId, ...data }),
    delete: (userId: string) =>
      callWebhook('users.delete', { userId }),
  },

  audit: {
    getLogs: (filters?: any) =>
      callWebhook('audit.getLogs', filters || {}),
  },

  alerts: {
    getAlerts: (factoryId: string) =>
      callWebhook('alerts.getAlerts', { factoryId }),
    acknowledgeAlert: (alertId: string) =>
      callWebhook('alerts.acknowledge', { alertId }),
  },

  dashboard: {
    getMetrics: (factoryId: string) =>
      callWebhook('dashboard.getMetrics', { factoryId }),
    getSummary: (factoryId: string) =>
      callWebhook('dashboard.getSummary', { factoryId }),
  },

  energy: {
    getMetrics: (factoryId: string) =>
      callWebhook('energy.getMetrics', { factoryId }),
    getConsumption: (factoryId: string) =>
      callWebhook('energy.getConsumption', { factoryId }),
    getTrend: (factoryId: string) =>
      callWebhook('energy.getTrend', { factoryId }),
  },

  config: {
    getFactories: () => Promise.resolve({
      success: true,
      data: TEXTILE_CONFIG.factories,
    }),
    getDepartments: () => Promise.resolve({
      success: true,
      data: TEXTILE_CONFIG.departments,
    }),
    getProductTypes: () => Promise.resolve({
      success: true,
      data: TEXTILE_CONFIG.productTypes,
    }),
  },
};

// ==================== CONFIG ====================

export const TEXTILE_CONFIG = {
  companyName: 'PlanForge AI',
  companyCode: 'PF',
  factories: [
    { id: 'FAC-001', name: 'Main Weaving Factory', code: 'FAC-001', location: 'Unit 1' },
    { id: 'FAC-002', name: 'Yarn Processing', code: 'FAC-002', location: 'Unit 2' },
    { id: 'FAC-003', name: 'Finishing Department', code: 'FAC-003', location: 'Unit 3' },
  ],
  departments: [
    'Spinning',
    'Weaving',
    'Dyeing',
    'Finishing',
    'Quality Control',
    'Maintenance',
  ],
  productTypes: [
    'Cotton Fabric',
    'Polyester Blend',
    'Silk Fabric',
    'Denim',
    'Canvas',
    'Linen',
    'Wool Blend',
    'Synthetic',
  ],
};
