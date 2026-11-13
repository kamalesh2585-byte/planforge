# 🤖 Textile Company Manufacturing Intelligence Chatbot

## Overview

The Manufacturing Intelligence Assistant is an AI-powered chatbot integrated into your Textile Company platform. It analyzes real-time manufacturing data and provides intelligent insights about your textile operations.

## Features

### 📊 Real-Time Data Analysis
- **Machines & Looms**: Health scores, uptime, utilization, downtime analysis
- **Production Orders**: Status tracking, delay detection, completion forecasting
- **Quality Control**: Defect analysis, inspection results, pass rates
- **Inventory Management**: Stock levels, low inventory alerts, reorder recommendations
- **Maintenance**: Service records, preventive maintenance scheduling, cost analysis
- **Energy Consumption**: Power usage trends, cost optimization, efficiency metrics
- **Alerts & Issues**: Critical problem identification, priority assessment
- **Performance KPIs**: Overall equipment effectiveness (OEE), metrics analysis

### 🎯 Intelligent Responses

The chatbot provides:
- ✅ Specific data-driven insights
- 🔍 Root cause analysis of issues
- 💡 Actionable recommendations
- 📈 Trend analysis and forecasting
- 🎯 Priority identification
- 💰 Cost and efficiency optimization suggestions

### 🔄 Conversation Memory

The chatbot remembers your conversation history and can:
- Reference previous questions
- Build context over multiple exchanges
- Provide consistent recommendations
- Track discussion topics

## How to Use

### 1. Access the Chatbot

Navigate to your Textile Company platform → Click **"AI Manufacturing Copilot"** in the sidebar

### 2. Ask Questions

Type any question about your manufacturing operations:

```
"What is the production status?"
"Which machines need maintenance?"
"Are materials running low?"
"Summarize today's operations"
```

### 3. Use Suggested Questions

On first load, you'll see 10 suggested questions. Click any to start:
- Which machine has the highest downtime?
- What is the production status?
- Which machines need maintenance?
- Are there any delayed orders?
- Which materials are running low?
- What is the overall equipment effectiveness?
- Are there any quality issues?
- What is energy consumption trend?
- Give me a summary report
- What are the critical alerts?

### 4. Clear Chat

Click the trash icon (🗑️) in the header to clear the conversation and start fresh.

## Question Categories

### 🏭 Machine & Equipment Questions

```
"What is the health of machine LOOM-001?"
"Which looms are idle?"
"Show me machine downtime analysis"
"What's the average utilization across all machines?"
"Which equipment needs urgent maintenance?"
"Compare machine performance"
```

**Sample Response:**
```
⚠️ Machines Requiring Attention:

• Air Jet Loom C3 (LOOM-003): Health 65% - Status: idle
  Uptime: 72.5%, Utilization: 45.8%
  Defect Rate: 2.1%

🔧 Recommendation: Schedule preventive maintenance for unhealthy machines.
```

---

### 📦 Production & Order Questions

```
"What is the current production status?"
"Are there any delayed orders?"
"Show production progress"
"Which orders are at risk?"
"What's the overall completion rate?"
"Compare order priorities"
```

**Sample Response:**
```
📦 Production Status:

Total Orders: 5
In Progress: 3
Completed: 1
Delayed: 1
Overall Completion Rate: 68.5%

⚠️ DELAYED ORDERS:
• PO-2024-002: 2 days behind, 65% complete
```

---

### ✅ Quality Control Questions

```
"What is the quality status?"
"Are there any defects detected?"
"Show quality inspection results"
"What's the pass rate?"
"Which batches failed inspection?"
"Quality trend analysis"
```

**Sample Response:**
```
✅ Quality Control Report:

Total Inspections: 4
Pass Rate: 75%
Average Defect Rate: 2.75%

⚠️ Failed Inspections: 1
• BATCH-002: 8 defects found
  Issues: Color bleeding, Thread tension, Weave defects
  Inspector: Priya Sharma
```

---

### 📊 Inventory & Material Questions

```
"Are materials running low?"
"What inventory needs reordering?"
"Show stock levels"
"What's our material status?"
"Which suppliers need contact?"
"Inventory value analysis"
```

**Sample Response:**
```
⚠️ LOW STOCK ALERT:

• Polyester Yarn - 30s: 850kg (Min: 500kg)
  Supplier: Poly Fibers Inc

• Dye - Indigo: 220kg (Min: 150kg)
  Supplier: Chemical Dyes Co

🛒 Action: Place urgent reorder to prevent production delays.
```

---

### 🔧 Maintenance & Service Questions

```
"What maintenance is scheduled?"
"Which machines need service?"
"Show maintenance history"
"What's the maintenance cost?"
"Predict maintenance needs"
"Service timeline analysis"
```

**Sample Response:**
```
🔧 Maintenance Overview:

Total Records: 4
Currently In Progress: 2
Total Cost: $17,000

Current Maintenance Tasks:
• Rapier Loom D4: Complete overhaul, motor replacement
  Technician: Vikram Singh, Est. Completion: 3.2hrs
```

---

### ⚡ Energy & Efficiency Questions

```
"What is energy consumption?"
"How can we reduce energy costs?"
"Show energy trend"
"Which machines consume most power?"
"Energy optimization tips"
"Cost analysis"
```

**Sample Response:**
```
⚡ Energy Consumption Analysis:

Daily Consumption: 1,450 kWh
Daily Cost: $7,250
Cost per Unit: $5.0/kWh
Efficiency Score: 88.5%

💡 Tips for optimization:
• LOOM-002 is highest consumer with peak usage at 12:00
• Consolidate production runs to reduce idle energy
• Estimated monthly savings: $5,000-7,000
```

---

### 🚨 Alerts & Issues Questions

```
"What are the critical alerts?"
"Are there any system issues?"
"Show active warnings"
"What problems need attention?"
"Critical alerts summary"
```

**Sample Response:**
```
🚨 Active Alerts & Issues:

Critical: 2
Unacknowledged: 2
Total Active: 5

🔴 CRITICAL ISSUES:
• LOOM-003 experiencing high vibration
  → Air Jet Loom C3 vibration exceeded threshold

• PO-2024-002 at risk of delay
  → Denim order behind schedule by 2 days
```

---

### 📈 Performance & Summary Questions

```
"Give me a summary report"
"What's the overall performance?"
"Show manufacturing health"
"Performance metrics"
"What are our strengths and weaknesses?"
"Recommendations for improvement"
```

**Sample Response:**
```
📋 MANUFACTURING INTELLIGENCE REPORT
════════════════════════════════════

✅ STRENGTHS:
• 4 machines actively running
• Quality pass rate: 75%
• Average uptime: 89.7%

⚠️ AREAS FOR IMPROVEMENT:
• 2 unacknowledged alerts
• 2 materials at low stock
• 1 delayed order

🎯 IMMEDIATE ACTIONS:
1. Review failed QC batch (BATCH-002)
2. Complete LOOM-004 maintenance
3. Reorder low-stock materials
4. Investigate LOOM-003 vibration issue
```

---

## Data Sources

The chatbot analyzes data from:

1. **Machines** (6 total)
   - Status, uptime, utilization, downtime
   - Health scores, defect rates
   - Maintenance history

2. **Production Orders** (5 active)
   - Status tracking
   - Completion percentages
   - Delay information
   - Product specifications

3. **Inventory** (6 materials)
   - Stock levels
   - Reorder requirements
   - Supplier information
   - Quality grades

4. **Quality Control** (4 inspections)
   - Pass/fail results
   - Defect analysis
   - Batch traceability

5. **Maintenance** (4 records)
   - Service history
   - Preventive maintenance
   - Cost tracking
   - Technician assignments

6. **Alerts** (5 active)
   - Severity levels
   - Issue descriptions
   - Acknowledgment status

7. **Energy Consumption**
   - Hourly consumption data
   - Cost analysis
   - Machine-level breakdown

## API Integration (Optional)

### Using OpenAI API for Enhanced Responses

For more advanced AI responses, you can integrate with OpenAI:

1. **Get an API Key**
   - Visit https://platform.openai.com/api-keys
   - Create a new API key
   - Copy the key

2. **Configure Environment**
   - Create a `.env` file in the project root
   - Add: `VITE_OPENAI_API_KEY=your_api_key_here`
   - Save and restart the dev server

3. **Benefits**
   - More natural language understanding
   - Better context awareness
   - Advanced analysis capabilities
   - Historical trend forecasting

### Without API (Default)

If no API key is configured, the chatbot uses intelligent mock responses based on:
- Real manufacturing data from your system
- Pre-trained response templates
- Data-driven analysis rules
- Keyword matching and context analysis

**Note**: Mock responses are highly accurate for your specific manufacturing scenario and require no API key!

## Best Practices

### ✅ Do's

- ✅ **Be Specific**: "Which looms have uptime below 80%?" vs "Tell me about machines"
- ✅ **Use Natural Language**: The chatbot understands conversational questions
- ✅ **Ask for Analysis**: "Why are quality issues occurring?" gets root cause analysis
- ✅ **Request Recommendations**: "What should we do about low inventory?" gets actionable advice
- ✅ **Ask Follow-ups**: Build context through multiple questions
- ✅ **Use Suggested Questions**: Click examples to learn question patterns

### ❌ Don'ts

- ❌ **Vague Questions**: "What's happening?" - be specific
- ❌ **Multiple Questions**: Ask one thing at a time
- ❌ **Technical Queries**: Not designed for coding/system support
- ❌ **Historical Data**: Limited to current manufacturing state
- ❌ **External Data**: Only analyzes your manufacturing data

## Troubleshooting

### Chatbot Not Responding

**Problem**: Messages sent but no response
- Check internet connection
- Refresh the page (Ctrl+R)
- Clear browser cache
- Ensure backend is running

### Responses Seem Inaccurate

**Problem**: Responses don't match your data
- Data loads from mock dataset - compare with live system
- Refresh to load latest data
- Check that you're asking about supported topics

### Chat Takes Too Long

**Problem**: Responses take >10 seconds
- This is normal on first load (data loading)
- If using OpenAI API, network latency may occur
- Check your internet speed

### Can't See Suggested Questions

**Problem**: Suggested questions not visible
- They only appear on first load
- Clear chat with trash icon and reload
- Check browser window width (needs space)

## Features Coming Soon

- 🔮 Predictive maintenance AI
- 📊 Advanced data visualizations
- 🎯 Custom KPI dashboards
- 📧 Email alerts for issues
- 📱 Mobile app support
- 🌐 Multi-language support
- 💬 Team collaboration features

## Support

For questions or issues:
- Check this guide
- Review suggested questions
- Clear chat and try again
- Contact support team

---

**Happy analyzing! 🚀** Your Textile Company is now equipped with intelligent manufacturing intelligence!
