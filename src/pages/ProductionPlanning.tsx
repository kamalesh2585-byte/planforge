import { useEffect, useState } from 'react';
import { n8nService } from '../services/n8nService';
import { ProductionOrder } from '../types';
import { Plus, AlertCircle, CheckCircle, X, RefreshCw, Loader } from 'lucide-react';

export default function ProductionPlanning() {
  const [orders, setOrders] = useState<ProductionOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState('');
  const [networkError, setNetworkError] = useState('');

  const [formData, setFormData] = useState({
    orderName: '',
    productName: '',
    quantity: '',
    deadlineDate: '',
    priority: 'medium',
    notes: '',
  });

  const loadOrders = async () => {
    try {
      setLoading(true);
      setNetworkError('');
      const res = await n8nService.production.getOrders('FAC-001');
      
      if (res.success && res.data) {
        setOrders(Array.isArray(res.data) ? res.data : []);
      } else {
        setNetworkError(res.message || 'Failed to load orders');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading orders:', error);
      setNetworkError('Unable to load orders. Please check your internet connection.');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResponse(null);
    setIsSubmitting(true);

    try {
      if (!formData.orderName || !formData.productName || !formData.quantity || !formData.deadlineDate) {
        setError('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      const payload = {
        orderName: formData.orderName,
        productName: formData.productName,
        quantity: parseInt(formData.quantity),
        deadlineDate: formData.deadlineDate,
        priority: formData.priority,
        notes: formData.notes,
        factoryId: 'FAC-001',
        timestamp: new Date().toISOString(),
      };

      const result = await n8nService.production.createOrder(payload);

      if (result.success) {
        setResponse({
          success: true,
          data: result.data,
          message: result.message || 'Order created successfully! ✅',
        });

        const newOrder: ProductionOrder = {
          id: result.data?.id || result.data?.orderId || `ORD-${Date.now()}`,
          productId: result.data?.productId || 'PROD-' + Math.random().toString(36).substr(2, 9),
          productName: formData.productName,
          quantity: parseInt(formData.quantity),
          quantityProduced: 0,
          unit: 'meters',
          status: 'planned',
          priority: formData.priority as any,
          factory: 'FAC-001',
          targetStart: new Date().toISOString().split('T')[0],
          targetEnd: formData.deadlineDate,
          actualStart: null,
          completionPercentage: 0,
          assignedMachine: '',
          delayedDays: 0,
          notes: formData.notes,
          factoryId: 'FAC-001',
        };

        setOrders((prevOrders) => [newOrder, ...prevOrders]);

        setTimeout(() => {
          setFormData({
            orderName: '',
            productName: '',
            quantity: '',
            deadlineDate: '',
            priority: 'medium',
            notes: '',
          });
          setShowModal(false);
          setResponse(null);
        }, 2000);
      } else {
        setError(result.error || result.message || 'Failed to create order');
      }
    } catch (err: any) {
      setError(err?.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      orderName: '',
      productName: '',
      quantity: '',
      deadlineDate: '',
      priority: 'medium',
      notes: '',
    });
    setError('');
    setResponse(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 font-bold';
      case 'medium':
        return 'text-yellow-600 font-semibold';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-8 space-y-6 bg-white min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Production Planning</h1>
          <p className="text-gray-600 mt-2">Manage production orders and scheduling</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadOrders}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
            disabled={loading}
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-2 font-semibold"
          >
            <Plus className="w-5 h-5" />
            New Order
          </button>
        </div>
      </div>

      {networkError && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-red-900">Connection Error</p>
            <p className="text-sm text-red-700 mt-1">{networkError}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-black">{orders.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">Completed</p>
          <p className="text-2xl font-bold text-black">{orders.filter((o) => o.status === 'completed').length}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500">
          <p className="text-gray-600 text-sm">In Progress</p>
          <p className="text-2xl font-bold text-black">{orders.filter((o) => o.status === 'in_progress').length}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border-l-4 border-red-500">
          <p className="text-gray-600 text-sm">Delayed</p>
          <p className="text-2xl font-bold text-black">{orders.filter((o) => (o.delayedDays ?? 0) > 0).length}</p>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-12">
          <div className="text-center">
            <Loader className="w-12 h-12 text-black animate-spin mx-auto mb-3" />
            <p className="text-gray-600">Loading orders...</p>
          </div>
        </div>
      )}

      {!loading && (
        <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
          {orders.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 text-lg">No orders yet. Create one to get started!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Order ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Product Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Quantity</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Progress</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Priority</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order.id || index} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-semibold text-black">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{order.productName}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{order.quantity} {order.unit || 'units'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-black h-2 rounded-full transition-all" style={{ width: `${order.completionPercentage ?? 0}%` }}></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-700">{order.completionPercentage ?? 0}%</span>
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-sm font-semibold capitalize ${getPriorityColor(order.priority)}`}>
                        {order.priority}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{order.targetEnd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gray-900 text-white p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Create New Order</h2>
              <button onClick={handleCloseModal} className="hover:bg-gray-700 p-2 rounded-lg transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {response?.success && (
                <div className="p-4 bg-green-100 border-l-4 border-green-500 rounded flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-900">{response.message}</p>
                    <p className="text-sm text-green-700 mt-1">Order added to list below!</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-100 border-l-4 border-red-500 rounded flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-900">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Order Name *</label>
                  <input type="text" name="orderName" value={formData.orderName} onChange={handleInputChange} placeholder="e.g., Cotton Saree Order" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black" disabled={isSubmitting} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                  <input type="text" name="productName" value={formData.productName} onChange={handleInputChange} placeholder="e.g., Premium Cotton Fabric" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black" disabled={isSubmitting} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity *</label>
                  <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} placeholder="e.g., 500" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black" disabled={isSubmitting} min="1" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Deadline Date *</label>
                  <input type="date" name="deadlineDate" value={formData.deadlineDate} onChange={handleInputChange} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black" disabled={isSubmitting} />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                  <select name="priority" value={formData.priority} onChange={handleInputChange} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black" disabled={isSubmitting}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                  <textarea name="notes" value={formData.notes} onChange={handleInputChange} placeholder="Additional notes (optional)" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black" disabled={isSubmitting} rows={3} />
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 font-semibold transition flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create Order'
                    )}
                  </button>
                  <button type="button" onClick={handleCloseModal} disabled={isSubmitting} className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 font-semibold transition">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
