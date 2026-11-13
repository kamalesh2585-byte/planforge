export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://api.agents.snsihub.ai/webhook/71f5e821-4c67-40a7-b436-a004c36fe411',
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '',
  AUTH_LOGOUT: '',

  // Dashboard
  DASHBOARD_METRICS: '',
  
  // Machines/Looms
  MACHINES_LIST: '',
  MACHINES_GET: '',
  MACHINES_UPDATE: '',

  // Production - Textile specific
  PRODUCTION_ORDERS: '',
  PRODUCTION_SCHEDULE: '',
  PRODUCTION_START: '',
  PRODUCTION_PAUSE: '',
  PRODUCTION_STOP: '',
  
  // Yarn/Material Management
  INVENTORY_ITEMS: '',
  INVENTORY_ADD: '',
  INVENTORY_UPDATE: '',

  // Quality Control - Textile specific
  QUALITY_INSPECTION: '',
  QUALITY_REPORT: '',
  
  // Maintenance
  MAINTENANCE_RECORDS: '',
  MAINTENANCE_SCHEDULE: '',

  // Users (Admin)
  USERS_LIST: '',
  USERS_CREATE: '',
  
  // Audit
  AUDIT_LOGS: '',
  
  // Backup
  BACKUPS_LIST: '',
};

// PlanForge AI specific configuration
export const TEXTILE_CONFIG = {
  companyName: 'PlanForge AI',
  companyCode: 'PF',
  factories: [
    { id: 'FAC-001', name: 'Main Weaving Factory', location: 'Unit 1' },
    { id: 'FAC-002', name: 'Yarn Processing', location: 'Unit 2' },
    { id: 'FAC-003', name: 'Finishing Department', location: 'Unit 3' },
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
  ],
};
