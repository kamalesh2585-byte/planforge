import { mockManufacturingData } from '../data/mockManufacturingData';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatbotResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

/**
 * Chatbot Service - Uses OpenAI API with manufacturing context
 * Falls back to intelligent mock responses if API unavailable
 */
export class ChatbotService {
  private conversationHistory: ChatMessage[] = [];
  private useRealAPI: boolean = false;
  private apiKey: string = '';

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
    this.useRealAPI = !!this.apiKey;
  }

  /**
   * Build manufacturing context for the AI
   */
  private getManufacturingContext(): string {
    const data = mockManufacturingData;

    return `
You are an intelligent Manufacturing Intelligence Assistant for Textile Company (TC). 
You have access to real-time manufacturing data and can provide detailed insights.

CURRENT MANUFACTURING STATUS:
==================================

MACHINES (${data.machines.length} total):
${data.machines
  .map(
    (m) =>
      `- ${m.name} (${m.id}): Status=${m.status}, Uptime=${m.uptime}%, Utilization=${m.utilization}%, Health=${m.health}%`
  )
  .join('\n')}

ACTIVE PRODUCTION ORDERS:
${data.production
  .map(
    (p) =>
      `- ${p.id} (${p.productName}): ${p.completionPercentage}% complete, Status=${p.status}, ${p.delayedDays > 0 ? `DELAYED ${p.delayedDays} days` : 'On schedule'}`
  )
  .join('\n')}

INVENTORY STATUS:
${data.inventory
  .map((i) => `- ${i.name}: ${i.quantity}${i.unit} (Min: ${i.minStock}, Status: ${i.status})`)
  .join('\n')}

QUALITY METRICS:
- Pass Rate: ${data.metrics.quality.passRate}%
- Failed Inspections: ${data.metrics.quality.failedInspections}
- Avg Defect Rate: ${data.metrics.quality.avgDefectRate}%

ACTIVE ALERTS:
${data.alerts
  .filter((a) => !a.acknowledged)
  .map((a) => `- [${a.severity.toUpperCase()}] ${a.message}: ${a.description}`)
  .join('\n')}

ENERGY CONSUMPTION:
- Daily: ${data.metrics.energy.dailyConsumption} kWh
- Daily Cost: $${data.metrics.energy.dailyCost}

MAINTENANCE:
- In Progress: ${data.maintenance.filter((m) => m.status === 'in_progress').length} tasks
- Total Cost This Month: $${data.metrics.maintenance.maintenanceCost}

You have expertise in:
✓ Machine health and predictive maintenance
✓ Production planning and order management
✓ Quality control and defect analysis
✓ Inventory and material management
✓ Energy optimization
✓ Performance metrics and KPIs

When answering questions:
1. Use specific data from the manufacturing context above
2. Provide actionable insights
3. Identify risks and opportunities
4. Suggest improvements
5. Format responses clearly with emojis for different categories
6. Include specific numbers and percentages from the data
7. Reference machines, orders, and materials by their IDs
8. Prioritize critical issues
9. Offer recommendations based on current status

Be professional, concise, and data-driven in your responses.
`;
  }

  /**
   * Call OpenAI API for intelligent responses
   */
  private async callOpenAIAPI(userMessage: string): Promise<string> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: this.getManufacturingContext(),
            },
            ...this.conversationHistory,
            {
              role: 'user',
              content: userMessage,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('OpenAI API Error:', error);
        return '';
      }

      const data = await response.json();
      const assistantMessage = data.choices[0]?.message?.content || '';

      // Add to conversation history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage,
      });
      this.conversationHistory.push({
        role: 'assistant',
        content: assistantMessage,
      });

      return assistantMessage;
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return '';
    }
  }

  /**
   * Intelligent mock responses based on keywords
   */
  private generateMockResponse(question: string): string {
    const q = question.toLowerCase();
    const data = mockManufacturingData;

    // Machine Analysis
    if (q.includes('machine') && (q.includes('problem') || q.includes('issue') || q.includes('health') || q.includes('status'))) {
      const unhealthyMachines = data.machines.filter((m) => m.health < 80);
      if (unhealthyMachines.length === 0) {
        return `✅ **All ${data.machines.length} machines are in good health!**

Average machine health: ${(data.machines.reduce((sum, m) => sum + m.health, 0) / data.machines.length).toFixed(1)}%

**Status Breakdown:**
- Running: ${data.machines.filter(m => m.status === 'running').length}
- Idle: ${data.machines.filter(m => m.status === 'idle').length}
- Maintenance: ${data.machines.filter(m => m.status === 'maintenance').length}

All machines are performing well. Keep up with scheduled maintenance!`;
      }
      let response = `⚠️ **Machines Requiring Attention** (${unhealthyMachines.length}/${data.machines.length}):\n\n`;
      unhealthyMachines.slice(0, 5).forEach((m) => {
        response += `• **${m.id}** (${m.type})\n`;
        response += `  Health: ${m.health.toFixed(1)}% | Status: ${m.status} | Utilization: ${m.utilization.toFixed(1)}%\n`;
        response += `  Uptime: ${m.uptime.toFixed(1)}% | Defect Rate: ${m.defectRate.toFixed(2)}%\n`;
      });
      if (unhealthyMachines.length > 5) {
        response += `\n+ ${unhealthyMachines.length - 5} more machines\n`;
      }
      response += `\n🔧 **Recommendation:** Schedule preventive maintenance for these machines immediately.`;
      return response;
    }

    // Downtime Analysis
    if (q.includes('downtime') || q.includes('idle') || q.includes('offline')) {
      const downtimeMachines = data.machines.filter((m) => m.status === 'idle' || m.status === 'offline' || m.utilization < 40);
      if (downtimeMachines.length === 0) {
        return `✅ **Great utilization!** All machines are actively producing.

Average Utilization: ${data.metrics.overall.avgUtilization}%
Average Uptime: ${data.metrics.overall.avgUptime}%`;
      }
      let response = `📊 **Machine Downtime Report** (${downtimeMachines.length} machines):\n\n`;
      downtimeMachines.slice(0, 8).forEach((m) => {
        response += `• ${m.id}: Utilization ${m.utilization}% | Status: ${m.status}\n`;
      });
      response += `\n**Overall:**
- Avg Downtime: ${data.metrics.overall.avgUptime < 85 ? 'High' : 'Low'}
- Avg Utilization: ${data.metrics.overall.avgUtilization}%`;
      return response;
    }

    // Production Status
    if (q.includes('production') && (q.includes('status') || q.includes('order'))) {
      const inProgress = data.production.filter((p) => p.status === 'in_progress');
      const delayed = data.production.filter((p) => p.delayedDays > 0);
      const completed = data.production.filter((p) => p.status === 'completed');
      let response = `📦 **Production Status Report:**\n\n`;
      response += `**Overview:**
- Total Orders: ${data.production.length}
- Completed: ${completed.length}
- In Progress: ${inProgress.length}
- Planned: ${data.production.filter((p) => p.status === 'planned').length}
- Completion Rate: ${data.metrics.production.completionRate}%\n\n`;
      if (delayed.length > 0) {
        response += `⚠️ **DELAYED ORDERS** (${delayed.length}):\n`;
        delayed.forEach((p) => {
          response += `• ${p.id} (${p.productName}): ${p.delayedDays} days late | ${p.completionPercentage}% done\n`;
        });
      } else {
        response += `✅ **No delayed orders!** All production on schedule.`;
      }
      return response;
    }

    // Maintenance Forecast
    if (q.includes('maintenance') || q.includes('service') || q.includes('repair')) {
      const inProgress = data.maintenance.filter((m) => m.status === 'in_progress');
      const completed = data.maintenance.filter((m) => m.status === 'completed');
      let response = `🔧 **Maintenance Overview:**\n\n`;
      response += `**Records:**
- Total: ${data.maintenance.length}
- Completed: ${completed.length}
- In Progress: ${inProgress.length}
- Monthly Cost: $${data.metrics.maintenance.maintenanceCost}
- Avg Cost per Service: $${data.metrics.maintenance.avgCostPerMaintenance.toFixed(0)}\n\n`;
      if (inProgress.length > 0) {
        response += `**Currently In Progress:**\n`;
        inProgress.forEach((m) => {
          response += `• ${m.machineName}: ${m.workDone}\n`;
          response += `  Technician: ${m.technician} | Duration: ${m.duration}hrs\n`;
        });
      }
      response += `\n📅 **Predictive:** ${data.predictions.filter(p => p.riskLevel === 'critical').length} machines need urgent maintenance`;
      return response;
    }

    // Quality Control
    if (q.includes('quality') || q.includes('defect') || q.includes('inspection')) {
      const passedInspections = data.quality.filter((q) => q.status === 'completed');
      const failedInspections = data.quality.filter((q) => q.status === 'failed');
      let response = `✅ **Quality Control Report:**\n\n`;
      response += `**Statistics:**
- Total Inspections: ${data.quality.length}
- Passed: ${passedInspections.length}
- Failed: ${failedInspections.length}
- Pass Rate: ${data.metrics.quality.passRate}%
- Avg Defect Rate: ${data.metrics.quality.avgDefectRate}%\n\n`;
      if (failedInspections.length > 0) {
        response += `⚠️ **Failed Inspections:**\n`;
        failedInspections.slice(0, 3).forEach((qi) => {
          response += `• Batch ${qi.batchId}: Issues found\n`;
        });
      } else {
        response += `🎉 **Excellent quality!** All inspections passed.`;
      }
      return response;
    }

    // Workforce
    if (q.includes('employee') || q.includes('workforce') || q.includes('staff') || q.includes('team')) {
      const operators = data.employees.filter((e) => e.role === 'Machine Operator').length;
      const technicians = data.employees.filter((e) => e.role === 'Maintenance Technician').length;
      const supervisors = data.employees.filter((e) => e.role === 'Supervisor').length;
      let response = `👥 **Workforce Summary:**\n\n`;
      response += `**Total Employees: ${data.employees.length}**

**By Role:**
- Machine Operators: ${operators}
- Maintenance Technicians: ${technicians}
- Inspectors: ${data.employees.filter((e) => e.role === 'Quality Inspector').length}
- Supervisors: ${supervisors}
- Administrative: ${data.employees.filter((e) => e.role === 'Administrative').length}\n\n`;
      response += `**Performance:** All teams performing well with proper coverage across all shifts.`;
      return response;
    }

    // Inventory Management
    if (q.includes('inventory') || q.includes('stock') || q.includes('material') || q.includes('raw material')) {
      const lowStock = data.inventory.filter((i) => i.quantity < i.minStock);
      const goodStock = data.inventory.filter((i) => i.quantity >= i.minStock);
      let response = `📦 **Inventory Status:**\n\n`;
      response += `**Materials: ${data.inventory.length} types**
- Good Stock: ${goodStock.length}
- Low Stock: ${lowStock.length}
- Total Units: ${data.metrics.inventory.totalUnits}
- Total Value: $${data.metrics.inventory.totalValue.toLocaleString()}\n\n`;
      if (lowStock.length > 0) {
        response += `⚠️ **LOW STOCK ALERT** (${lowStock.length}):\n`;
        lowStock.forEach((i) => {
          response += `• ${i.name}: ${i.quantity}${i.unit} (Min: ${i.minStock}${i.unit})\n`;
          response += `  Supplier: ${i.supplier}\n`;
        });
        response += `\n🛒 **Action:** Place urgent reorder to prevent production delays.`;
      } else {
        response += `✅ **All materials well stocked!** No reorder needed.`;
      }
      return response;
    }

    // Energy Analysis
    if (q.includes('energy') || q.includes('power') || q.includes('consumption') || q.includes('cost')) {
      let response = `⚡ **Energy Consumption Analysis:**\n\n`;
      response += `**Daily Metrics:**
- Consumption: ${data.metrics.energy.dailyConsumption} kWh
- Cost: $${data.metrics.energy.dailyCost}
- Efficiency: ${data.metrics.energy.efficiency}%\n\n`;
      response += `**Monthly Impact:**
- ~${data.metrics.energy.dailyConsumption * 30} kWh
- ~$${(data.metrics.energy.dailyCost * 30).toFixed(0)}\n\n`;
      response += `💡 **Optimization Tips:**
• Major looms consume most energy
• Consolidate production runs to reduce idle time
• Schedule maintenance during off-peak hours
• Potential monthly savings: $5,000-7,000`;
      return response;
    }

    // Alerts & Issues
    if (q.includes('alert') || q.includes('warning') || q.includes('critical') || q.includes('issue')) {
      const unacknowledged = data.alerts.filter((a) => !a.acknowledged);
      const critical = data.alerts.filter((a) => a.severity === 'critical');
      let response = `🚨 **Active Alerts & Issues:**\n\n`;
      response += `**Summary:**
- Critical: ${critical.length}
- Unacknowledged: ${unacknowledged.length}
- Total Active: ${data.alerts.length}\n\n`;
      if (critical.length > 0) {
        response += `🔴 **CRITICAL ISSUES:**\n`;
        critical.slice(0, 3).forEach((a) => {
          response += `• ${a.message}\n  ${a.description}\n`;
        });
      }
      response += `\n✅ **Action:** Address critical issues immediately to prevent production loss.`;
      return response;
    }

    // Overall Performance / OEE
    if (q.includes('performance') || q.includes('efficiency') || q.includes('oee') || q.includes('summary')) {
      const metrics = data.metrics.overall;
      let response = `📈 **Overall Equipment Effectiveness (OEE) Report:**\n\n`;
      response += `**🏭 Equipment Status (${metrics.totalMachines} Machines):**
- Running: ${metrics.runningMachines}
- Idle: ${metrics.idleMachines}
- Maintenance: ${metrics.maintenanceMachines}
- Avg Utilization: ${metrics.avgUtilization}%
- Avg Uptime: ${metrics.avgUptime}%\n\n`;
      response += `**📊 Production Metrics:**
- Total Orders: ${metrics.totalProduction}
- Completion Rate: ${data.metrics.production.completionRate}%
- Delayed Orders: ${data.production.filter(p => p.delayedDays > 0).length}\n\n`;
      response += `**✅ Quality Metrics:**
- Pass Rate: ${data.metrics.quality.passRate}%
- Avg Defect Rate: ${metrics.avgDefectRate}%\n\n`;
      response += `**💰 Economics:**
- Daily Energy: $${data.metrics.energy.dailyCost}
- Monthly Maintenance: $${data.metrics.maintenance.maintenanceCost}\n\n`;
      response += `**🎯 Overall Health:** ${((metrics.avgUptime + metrics.avgUtilization) / 2).toFixed(1)}% - ${(metrics.avgUptime + metrics.avgUtilization) / 2 > 80 ? '✅ EXCELLENT' : '⚠️ GOOD'}`;
      return response;
    }

    // Default helpful response
    return `👋 I can help you analyze your **PlanForge AI** textile manufacturing operations!

🏭 **Ask me about:**
- **Machines** - Health, performance, downtime, maintenance, predictions
- **Production** - Orders, schedules, delays, completion rates
- **Quality** - Defects, inspections, pass rates
- **Inventory** - Stock levels, materials (${data.inventory.length} types), reorder needs
- **Workforce** - ${data.employees.length} employees, roles, performance
- **Energy** - Consumption, costs, optimization
- **Maintenance** - Service records, preventive care
- **Alerts** - Critical issues, warnings
- **Overall Performance** - KPIs, efficiency, OEE

**Example questions:**
"What machines need maintenance?" | "What's our production status?" | "Any quality issues?" | "Show me an efficiency report" | "Which materials are low?"

What would you like to know?`;
  }

  /**
   * Send message and get response
   */
  async sendMessage(userMessage: string): Promise<ChatbotResponse> {
    try {
      let assistantMessage = '';

      if (this.useRealAPI) {
        assistantMessage = await this.callOpenAIAPI(userMessage);
      }

      // If API not available or failed, use mock response
      if (!assistantMessage) {
        assistantMessage = this.generateMockResponse(userMessage);
      }

      return {
        success: true,
        message: assistantMessage,
      };
    } catch (error: any) {
      console.error('Chatbot error:', error);
      return {
        success: false,
        message: 'Sorry, I encountered an error. Please try again.',
        error: error.message,
      };
    }
  }

  /**
   * Clear conversation history
   */
  clearHistory(): void {
    this.conversationHistory = [];
  }

  /**
   * Get conversation history
   */
  getHistory(): ChatMessage[] {
    return this.conversationHistory;
  }
}

export const chatbotService = new ChatbotService();
