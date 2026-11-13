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
    if (q.includes('machine') && (q.includes('problem') || q.includes('issue') || q.includes('health'))) {
      const unhealthyMachines = data.machines.filter((m) => m.health < 80);
      if (unhealthyMachines.length === 0) {
        return `✅ All machines are in good health! Average machine health: ${(
          data.machines.reduce((sum, m) => sum + m.health, 0) / data.machines.length
        ).toFixed(1)}%`;
      }
      let response = `⚠️ Machines Requiring Attention:\n\n`;
      unhealthyMachines.forEach((m) => {
        response += `• ${m.name} (${m.id}): Health ${m.health}% - Status: ${m.status}\n`;
        response += `  Uptime: ${m.uptime}%, Utilization: ${m.utilization}%\n`;
        response += `  Defect Rate: ${m.defectRate}%\n`;
      });
      response += `\n🔧 Recommendation: Schedule preventive maintenance for unhealthy machines.`;
      return response;
    }

    // Downtime Analysis
    if (q.includes('downtime') || q.includes('idle')) {
      const idleMachines = data.machines.filter((m) => m.status === 'idle' || m.utilization < 50);
      if (idleMachines.length === 0) {
        return `✅ All machines are actively running. No significant idle time detected.`;
      }
      let response = `📊 Machine Downtime Report:\n\n`;
      idleMachines.forEach((m) => {
        response += `• ${m.name}: ${m.downtime}hrs downtime, Utilization: ${m.utilization}%\n`;
      });
      response += `\nAverage Downtime per Machine: ${(
        data.machines.reduce((sum, m) => sum + m.downtime, 0) / data.machines.length
      ).toFixed(1)} hours`;
      return response;
    }

    // Production Status
    if (q.includes('production') && (q.includes('status') || q.includes('order'))) {
      const inProgress = data.production.filter((p) => p.status === 'in_progress');
      const delayed = data.production.filter((p) => p.delayedDays > 0);
      let response = `📦 Production Status:\n\n`;
      response += `Total Orders: ${data.production.length}\n`;
      response += `In Progress: ${inProgress.length}\n`;
      response += `Completed: ${data.production.filter((p) => p.status === 'completed').length}\n`;
      response += `Delayed: ${delayed.length}\n`;
      response += `Overall Completion Rate: ${data.metrics.production.completionRate.toFixed(1)}%\n\n`;
      if (delayed.length > 0) {
        response += `⚠️ DELAYED ORDERS:\n`;
        delayed.forEach((p) => {
          response += `• ${p.id}: ${p.delayedDays} days behind, ${p.completionPercentage}% complete\n`;
        });
      }
      return response;
    }

    // Maintenance Forecast
    if (q.includes('maintenance') || q.includes('service') || q.includes('repair')) {
      const inProgress = data.maintenance.filter((m) => m.status === 'in_progress');
      let response = `🔧 Maintenance Overview:\n\n`;
      response += `Total Records: ${data.maintenance.length}\n`;
      response += `Currently In Progress: ${inProgress.length}\n`;
      response += `Total Cost: $${data.metrics.maintenance.maintenanceCost}\n\n`;
      if (inProgress.length > 0) {
        response += `Current Maintenance Tasks:\n`;
        inProgress.forEach((m) => {
          response += `• ${m.machineName}: ${m.workDone}\n`;
          response += `  Technician: ${m.technician}, Est. Completion: ${m.duration}hrs\n`;
        });
      }
      response += `\n📅 Next Maintenance Due: LOOM-001 on 2024-11-22`;
      return response;
    }

    // Quality Control
    if (q.includes('quality') || q.includes('defect') || q.includes('inspection')) {
      const failedInspections = data.quality.filter((q) => q.status === 'failed');
      let response = `✅ Quality Control Report:\n\n`;
      response += `Total Inspections: ${data.quality.length}\n`;
      response += `Pass Rate: ${data.metrics.quality.passRate}%\n`;
      response += `Average Defect Rate: ${data.metrics.quality.avgDefectRate}%\n`;
      if (failedInspections.length > 0) {
        response += `\n⚠️ Failed Inspections: ${failedInspections.length}\n`;
        failedInspections.forEach((qi) => {
          response += `• ${qi.batchId}: ${qi.defects} defects found\n`;
          response += `  Issues: ${qi.issues.join(', ')}\n`;
          response += `  Inspector: ${qi.inspector}\n`;
        });
        response += `\n🔍 Recommendations: Review process parameters and operator training.`;
      }
      return response;
    }

    // Inventory Management
    if (q.includes('inventory') || q.includes('stock') || q.includes('material')) {
      const lowStock = data.inventory.filter((i) => i.quantity < i.minStock);
      let response = `📦 Inventory Status:\n\n`;
      response += `Total Materials: ${data.inventory.length}\n`;
      response += `Good Stock: ${data.inventory.length - lowStock.length}\n`;
      response += `Low Stock: ${lowStock.length}\n`;
      response += `Total Value: $${data.metrics.inventory.totalValue}\n\n`;
      if (lowStock.length > 0) {
        response += `⚠️ LOW STOCK ALERT:\n`;
        lowStock.forEach((i) => {
          response += `• ${i.name}: ${i.quantity}${i.unit} (Min: ${i.minStock}${i.unit})\n`;
          response += `  Supplier: ${i.supplier}\n`;
        });
        response += `\n🛒 Action: Place urgent reorder to prevent production delays.`;
      }
      return response;
    }

    // Energy Analysis
    if (q.includes('energy') || q.includes('power') || q.includes('consumption')) {
      let response = `⚡ Energy Consumption Analysis:\n\n`;
      response += `Daily Consumption: ${data.metrics.energy.dailyConsumption} kWh\n`;
      response += `Daily Cost: $${data.metrics.energy.dailyCost}\n`;
      response += `Cost per Unit: $${data.metrics.energy.avgCostPerUnit}/kWh\n`;
      response += `Efficiency Score: ${data.metrics.energy.efficiency}%\n`;
      response += `Trend: ${data.metrics.energy.trend}\n\n`;
      response += `💡 Tips for optimization:\n`;
      response += `• LOOM-002 is highest consumer with peak usage at 12:00\n`;
      response += `• Consolidate production runs to reduce idle energy\n`;
      response += `• Schedule maintenance during off-peak hours\n`;
      response += `• Estimated monthly savings: $5,000-7,000 with optimization`;
      return response;
    }

    // Alerts & Issues
    if (q.includes('alert') || q.includes('warning') || q.includes('critical')) {
      const unacknowledged = data.alerts.filter((a) => !a.acknowledged);
      const critical = data.alerts.filter((a) => a.severity === 'critical');
      let response = `🚨 Active Alerts & Issues:\n\n`;
      response += `Critical: ${critical.length}\n`;
      response += `Unacknowledged: ${unacknowledged.length}\n`;
      response += `Total Active: ${data.alerts.length}\n\n`;
      if (critical.length > 0) {
        response += `🔴 CRITICAL ISSUES:\n`;
        critical.forEach((a) => {
          response += `• ${a.message}\n  → ${a.description}\n`;
        });
      }
      response += `\n✅ Action: Address critical issues immediately to prevent production loss.`;
      return response;
    }

    // Overall Performance
    if (q.includes('performance') || q.includes('efficiency') || q.includes('oee')) {
      const metrics = data.metrics.overall;
      let response = `📈 Overall Performance Metrics:\n\n`;
      response += `🏭 Machines:\n`;
      response += `  Running: ${metrics.runningMachines}/${metrics.totalMachines}\n`;
      response += `  Avg Utilization: ${metrics.avgUtilization}%\n`;
      response += `  Avg Uptime: ${metrics.avgUptime}%\n\n`;
      response += `📊 Production:\n`;
      response += `  Completion Rate: ${data.metrics.production.completionRate}%\n`;
      response += `  Total Production: ${metrics.totalProduction} units\n\n`;
      response += `✅ Quality:\n`;
      response += `  Pass Rate: ${data.metrics.quality.passRate}%\n`;
      response += `  Avg Defect Rate: ${metrics.avgDefectRate}%\n\n`;
      response += `💰 Economics:\n`;
      response += `  Daily Energy Cost: $${data.metrics.energy.dailyCost}\n`;
      response += `  Monthly Maintenance: $${data.metrics.maintenance.maintenanceCost}\n\n`;
      response += `🎯 Overall Health: ${((metrics.avgUptime + metrics.avgUtilization) / 2).toFixed(1)}% - GOOD`;
      return response;
    }

    // Summary Report
    if (q.includes('summary') || q.includes('report') || q.includes('overview')) {
      const metrics = data.metrics;
      let response = `📋 MANUFACTURING INTELLIGENCE REPORT\n`;
      response += `${'='.repeat(40)}\n\n`;
      response += `✅ STRENGTHS:\n`;
      response += `• ${metrics.overall.runningMachines} machines actively running\n`;
      response += `• Quality pass rate: ${metrics.quality.passRate}%\n`;
      response += `• Average uptime: ${metrics.overall.avgUptime}%\n\n`;
      response += `⚠️ AREAS FOR IMPROVEMENT:\n`;
      response += `• ${data.alerts.filter((a) => !a.acknowledged).length} unacknowledged alerts\n`;
      response += `• ${data.inventory.filter((i) => i.quantity < i.minStock).length} materials at low stock\n`;
      response += `• ${data.production.filter((p) => p.delayedDays > 0).length} delayed orders\n\n`;
      response += `🎯 IMMEDIATE ACTIONS:\n`;
      response += `1. Review failed QC batch (BATCH-002) - color bleeding issue\n`;
      response += `2. Complete LOOM-004 maintenance to resume production\n`;
      response += `3. Reorder low-stock materials (Polyester Yarn, Indigo Dye)\n`;
      response += `4. Investigate LOOM-003 vibration issue\n`;
      return response;
    }

    // Default helpful response
    return `I can help you analyze your textile manufacturing operations! Ask me about:

🏭 **Machines** - Health, performance, downtime, maintenance
📦 **Production** - Orders, schedules, delays, completion rates
✅ **Quality** - Defects, inspections, pass rates, issues
📊 **Inventory** - Stock levels, materials, reorder needs
⚡ **Energy** - Consumption, costs, optimization
🔧 **Maintenance** - Service records, preventive care, costs
🚨 **Alerts** - Critical issues, warnings
📈 **Performance** - KPIs, efficiency, overall health

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
