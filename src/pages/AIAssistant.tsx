import { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Loader, Sparkles, Trash2 } from 'lucide-react';
import { chatbotService } from '../services/chatbotService';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  'Which machine has the highest downtime?',
  'What is the production status?',
  'Which machines need maintenance?',
  'Are there any delayed orders?',
  'Which materials are running low?',
  'What is the overall equipment effectiveness?',
  'Are there any quality issues?',
  'What is energy consumption trend?',
  'Give me a summary report',
  'What are the critical alerts?',
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      type: 'assistant',
      content: `👋 **Welcome to Textile Company Manufacturing Intelligence Assistant!**

I'm powered by advanced AI and have access to real-time manufacturing data. I can analyze and provide insights about:

🏭 **Machines & Equipment** - Health, performance, maintenance schedules
📦 **Production Orders** - Status, delays, completion rates  
✅ **Quality Control** - Defects, inspections, pass rates
📊 **Inventory** - Stock levels, materials, reorder needs
⚡ **Energy** - Consumption trends, costs, optimization
🔧 **Maintenance** - Records, preventive care, costs
🚨 **Alerts & Issues** - Critical problems, warnings
📈 **Performance Metrics** - KPIs, efficiency, overall health

Ask me anything about your textile manufacturing operations! I'll provide detailed analysis with specific data and recommendations.`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text?: string) => {
    const message = text || inputValue.trim();
    if (!message || loading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Get AI response
    setLoading(true);
    try {
      const response = await chatbotService.sendMessage(message);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'assistant',
        content: '❌ Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '0',
        type: 'assistant',
        content: `👋 **Chat cleared!** Start a new conversation about your manufacturing operations.`,
        timestamp: new Date(),
      },
    ]);
    chatbotService.clearHistory();
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-gray-800 to-black text-white p-6 shadow-lg border-b-4 border-yellow-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-500 rounded-lg">
              <Sparkles className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Manufacturing Intelligence Assistant</h1>
              <p className="text-gray-300 text-sm">AI-powered analysis with real manufacturing data</p>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
            title="Clear chat"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-2xl px-4 py-3 rounded-lg whitespace-pre-wrap text-sm leading-relaxed ${
                msg.type === 'user'
                  ? 'bg-black text-white rounded-br-none'
                  : 'bg-white text-gray-900 border-l-4 border-yellow-500 rounded-bl-none shadow-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-900 px-4 py-3 rounded-lg flex items-center gap-2 border-l-4 border-yellow-500">
              <Loader className="w-5 h-5 animate-spin text-yellow-500" />
              <span>Analyzing manufacturing data...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-6 pb-4 bg-white border-t">
          <p className="text-sm font-semibold text-gray-700 mb-3">💡 Try asking:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="text-left p-3 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-yellow-50 hover:to-yellow-100 rounded-lg text-sm text-gray-700 transition border border-gray-200 hover:border-yellow-300"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t-2 border-gray-200 p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about production, machines, quality, inventory, energy..."
            disabled={loading}
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 disabled:bg-gray-100 transition"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={loading || !inputValue.trim()}
            className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white px-6 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold border-2 border-yellow-500 hover:border-yellow-600"
          >
            <Send className="w-5 h-5" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">💡 Tip: Press Enter to send, Shift+Enter for new line</p>
      </div>
    </div>
  );
}
