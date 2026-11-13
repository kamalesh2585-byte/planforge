# 📊 Mock Manufacturing Data Reference

## Overview

The chatbot uses comprehensive mock manufacturing data that represents a realistic textile manufacturing operation. This document provides quick reference to all mock data available.

## Data Included

### 🏭 Machines (6 total)

| ID | Name | Type | Status | Uptime | Utilization | Health |
|----|------|------|--------|--------|-------------|--------|
| LOOM-001 | Jacquard Loom A1 | Jacquard | Running | 94.5% | 87.3% | 92% |
| LOOM-002 | Dobby Loom B2 | Dobby | Running | 91.2% | 94.1% | 88% |
| LOOM-003 | Air Jet Loom C3 | Air Jet | Idle | 72.5% | 45.8% | 65% |
| LOOM-004 | Rapier Loom D4 | Rapier | Maintenance | 85.0% | 0% | 60% |
| SPINNER-001 | Ring Frame A | Spinning | Running | 96.2% | 89.3% | 95% |
| DRYER-001 | Drying System B | Drying | Running | 99.0% | 75.0% | 98% |

**Key Metrics**:
- Average Uptime: 89.7%
- Average Utilization: 82.0%
- Running Machines: 4
- Idle Machines: 1
- Maintenance: 1

---

### 📦 Production Orders (5 total)

| Order ID | Product | Status | Quantity | Produced | Completion | Priority |
|----------|---------|--------|----------|----------|------------|----------|
| PO-2024-001 | Cotton Saree | In Progress | 500m | 450m | 90% | High |
| PO-2024-002 | Indigo Denim | In Progress | 1000m | 650m | 65% | Medium |
| PO-2024-003 | Silk Blend | Planned | 300m | 0m | 0% | Medium |
| PO-2024-004 | Heavy Canvas | Completed | 750m | 750m | 100% | High |
| PO-2024-005 | Linen Mix | In Progress | 400m | 150m | 37.5% | Low |

**Key Metrics**:
- Total Orders: 5
- Completed: 1 (20%)
- In Progress: 3 (60%)
- Planned: 1 (20%)
- Delayed Orders: 1 (PO-2024-002 - 2 days)
- Overall Completion Rate: 68.5%

---

### 🧵 Inventory (6 materials)

| Material ID | Name | Category | Stock | Min | Status | Cost |
|-------------|------|----------|-------|-----|--------|------|
| MAT-001 | Cotton Yarn 20s | Raw | 1250kg | 500kg | Good | $450/kg |
| MAT-002 | Polyester Yarn 30s | Raw | 850kg | 400kg | **Low** | $380/kg |
| MAT-003 | Silk Thread Pure | Raw | 320kg | 200kg | Good | $1200/kg |
| MAT-004 | Dye - Indigo | Chemical | 220kg | 150kg | **Low** | $280/kg |
| MAT-005 | Finishing Chemical | Chemical | 480L | 300L | Good | $150/L |
| MAT-006 | Linen Yarn Natural | Raw | 380kg | 250kg | Good | $620/kg |

**Key Metrics**:
- Total Materials: 6
- Good Stock: 4
- Low Stock: 2 (Polyester Yarn, Indigo Dye)
- Total Inventory Value: $156,310
- Low Stock Risk: **2 items need reordering**

---

### ✅ Quality Control (4 inspections)

| Inspection ID | Batch | Product | Status | Defects | Sample | Pass Rate |
|---------------|-------|---------|--------|---------|--------|-----------|
| QI-2024-001 | BATCH-001 | Cotton Saree | Passed | 0 | 50 | 100% |
| QI-2024-002 | BATCH-002 | Indigo Denim | **Failed** | 8 | 100 | 92% |
| QI-2024-003 | BATCH-003 | Heavy Canvas | Passed | 1 | 50 | 98% |
| QI-2024-004 | BATCH-004 | Silk Blend | Passed | 0 | 30 | 100% |

**Key Metrics**:
- Total Inspections: 4
- Pass Rate: 75%
- Failed Batches: 1 (Color bleeding issue)
- Average Defect Rate: 2.75%
- Issues Found: Color bleeding, Thread tension, Weave defects

---

### 🔧 Maintenance (4 records)

| Record ID | Machine | Type | Date | Duration | Status | Cost |
|-----------|---------|------|------|----------|--------|------|
| MR-001 | LOOM-001 | Preventive | 2024-11-08 | 2.5h | Completed | $2,500 |
| MR-002 | LOOM-002 | Preventive | 2024-11-05 | 1.8h | Completed | $1,800 |
| MR-003 | LOOM-003 | Corrective | 2024-11-10 | 4.0h | **In Progress** | $4,200 |
| MR-004 | LOOM-004 | Preventive | 2024-11-10 | 3.2h | **In Progress** | $8,500 |

**Key Metrics**:
- Total Records: 4
- In Progress: 2
- Completed: 2
- Total Cost: $17,000
- Average Cost per Maintenance: $4,250
- Preventive: 3 (75%)
- Corrective: 1 (25%)

---

### 🚨 Alerts (5 active)

| Alert ID | Severity | Type | Status | Machine/Material | Impact |
|----------|----------|------|--------|------------------|--------|
| AL-001 | **Critical** | Machine Failure | Unacked | LOOM-003 | Production Risk |
| AL-002 | Warning | Low Stock | Acked | MAT-002 | Supply Risk |
| AL-003 | Warning | Quality Issue | Unacked | BATCH-002 | Quality Risk |
| AL-004 | Info | Maintenance Due | Acked | LOOM-001 | Preventive |
| AL-005 | **Critical** | Production Delay | Unacked | PO-2024-002 | Schedule Risk |

**Key Metrics**:
- Total Alerts: 5
- Critical: 2 (Must address)
- Warning: 2 (Important)
- Info: 1 (FYI)
- Unacknowledged: 3
- Acknowledged: 2

---

### ⚡ Energy Consumption

| Time | Date | Consumption | Cost | Peak Machine |
|------|------|-------------|------|--------------|
| 08:00 | 2024-11-10 | 450 kWh | $2,250 | LOOM-001 |
| 12:00 | 2024-11-10 | 520 kWh | $2,600 | LOOM-002 |
| 16:00 | 2024-11-10 | 480 kWh | $2,400 | LOOM-001 |

**Key Metrics**:
- Daily Consumption: 1,450 kWh
- Daily Cost: $7,250
- Cost per Unit: $5.00/kWh
- Efficiency Score: 88.5%
- Peak Usage: 12:00 (520 kWh)

---

### 👥 Team (4 staff)

| User ID | Name | Role | Department | Factory | Status |
|---------|------|------|------------|---------|--------|
| USR-001 | Rajesh Kumar | Quality Inspector | QC | FAC-001 | Active |
| USR-002 | Priya Sharma | Machine Operator | Weaving | FAC-001 | Active |
| USR-003 | Vikram Singh | Maintenance Tech | Maintenance | FAC-001 | Active |
| USR-004 | Neha Singh | Production Manager | Production | FAC-002 | Active |

---

### 📋 Audit Logs (3 recent)

- ✅ Admin created Production Order (PO-2024-005) - 2024-11-10 11:30
- ✅ Rajesh Kumar completed Quality Inspection (QI-2024-004) - 2024-11-10 10:45
- ⏳ Vikram Singh working on Maintenance (MR-003) - 2024-11-10 10:00

---

## 📈 Key Performance Indicators (KPIs)

### Overall Performance
```
Total Machines: 6
Running: 4 (67%)
Idle: 1 (17%)
Maintenance: 1 (17%)

Average Uptime: 89.7%
Average Utilization: 82.0%
Overall Equipment Effectiveness: 73.6%
```

### Production Performance
```
Total Orders: 5
Completed: 1 (20%)
In Progress: 3 (60%)
Planned: 1 (20%)

Overall Completion Rate: 68.5%
Delayed Orders: 1
Average Production Time: 8.5 days
```

### Quality Performance
```
Total Inspections: 4
Passed: 3 (75%)
Failed: 1 (25%)

Average Defect Rate: 2.75%
Pass Rate: 75%
Critical Issues: 1
Minor Issues: 8
```

### Maintenance & Costs
```
Total Maintenance Records: 4
Preventive: 2
Corrective: 2

Total Cost: $17,000
Average Cost per Maintenance: $4,250
Average Downtime: 8.1 hours
```

### Inventory Health
```
Total Materials: 6
Good Stock: 4
Low Stock: 2
Stockout Risk: Low

Total Inventory Value: $156,310
Average Turnover Rate: 2.1x
```

### Energy Efficiency
```
Daily Consumption: 1,450 kWh
Daily Cost: $7,250
Cost per Unit: $5.00/kWh
Efficiency Score: 88.5%
```

---

## 🎯 Sample Analysis Questions

### Machine Focused
```
"Which machine has the highest downtime?"
→ LOOM-003 (22.5 hours idle)

"What machines are in maintenance?"
→ LOOM-004 in progress (motor replacement)

"Show me machine health scores"
→ DRYER-001 (98%) > SPINNER-001 (95%) > LOOM-001 (92%)
```

### Production Focused
```
"Are there delayed orders?"
→ PO-2024-002 is 2 days behind schedule

"What's the overall completion rate?"
→ 68.5% - 3 orders in progress, 1 pending

"Which orders are at risk?"
→ PO-2024-002 (65% complete, 2 days delayed)
```

### Quality Focused
```
"Are there quality issues?"
→ BATCH-002 failed: 8 defects (color bleeding, thread tension)

"What's our pass rate?"
→ 75% (3 passed, 1 failed)

"Highest defect rate?"
→ BATCH-002 at 8% (should be <2%)
```

### Inventory Focused
```
"Which materials need reordering?"
→ Polyester Yarn (850kg, min 500kg)
→ Indigo Dye (220kg, min 150kg)

"Total inventory value?"
→ $156,310 across 6 materials

"Most expensive material?"
→ Silk Thread Pure at $1,200/kg
```

### Maintenance Focused
```
"What maintenance is active?"
→ LOOM-003 nozzle replacement (4.0h)
→ LOOM-004 motor overhaul (3.2h)

"Total maintenance cost this month?"
→ $17,000 for 4 tasks

"What's scheduled next?"
→ LOOM-001 maintenance on 2024-11-22
```

---

## 🔄 Data Refresh

- Mock data updates every 30 seconds (simulated)
- Realistic variations in machine status
- Dynamic alert generation
- Production progress tracking
- Energy consumption patterns
- Inventory consumption modeling

---

## 📝 Notes

- All data is fictional but realistic
- Represents a typical textile manufacturing facility
- 3 factories with different capabilities
- Multiple product types (Cotton, Denim, Silk, Linen, etc.)
- Comprehensive tracking across all operations
- Designed for chatbot training and demo purposes

---

**Use this reference to understand what data is available to the chatbot and how it answers your questions!**
