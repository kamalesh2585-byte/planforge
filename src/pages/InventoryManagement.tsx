import { useState, useEffect } from 'react';
import { Package, Plus, Search, AlertTriangle } from 'lucide-react';
import { mockManufacturingData } from '../data/mockManufacturingData';

export default function InventoryManagement() {
  const [inventory, setInventory] = useState<any[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const data = mockManufacturingData;

  useEffect(() => {
    setLoading(true);
    setInventory(data.inventory);
    setFilteredInventory(data.inventory);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = inventory;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === filterCategory);
    }

    setFilteredInventory(filtered);
  }, [searchTerm, filterCategory, inventory]);

  const categories = [...new Set(inventory.map((i) => i.category))];

  const stats = {
    totalItems: inventory.length,
    totalUnits: inventory.reduce((sum, i) => sum + i.quantity, 0),
    totalValue: inventory.reduce((sum, i) => sum + i.quantity * i.cost, 0),
    lowStockItems: inventory.filter((i) => i.quantity < i.minStock).length,
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 space-y-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Inventory Management</h1>
          <p className="text-gray-600 mt-2">Raw material stock for 4,000+ units • {inventory.length} materials tracked</p>
        </div>
        <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-2 font-semibold">
          <Plus className="w-5 h-5" />
          Add Material
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">Total Materials</p>
          <p className="text-3xl font-bold text-black mt-2">{stats.totalItems}</p>
          <p className="text-xs text-blue-600 mt-2">Types tracked</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">Total Stock</p>
          <p className="text-3xl font-bold text-green-600 mt-2">4,000+</p>
          <p className="text-xs text-green-600 mt-2">{stats.totalUnits.toLocaleString()} units</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm">Inventory Value</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">${(stats.totalValue / 1000).toFixed(0)}K</p>
          <p className="text-xs text-purple-600 mt-2">Total value</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border-l-4 border-red-500">
          <p className="text-gray-600 text-sm">Low Stock Alert</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{stats.lowStockItems}</p>
          <p className="text-xs text-red-600 mt-2">Items to reorder</p>
        </div>
      </div>

      {/* Alerts */}
      {stats.lowStockItems > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-red-900">Low Stock Items</p>
            <p className="text-sm text-red-700 mt-1">{stats.lowStockItems} materials below minimum stock level. Reordering recommended.</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white border-2 border-gray-200 p-4 rounded-lg">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-250">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
        {filteredInventory.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No materials found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Material Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Current Stock</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Min/Max Stock</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Unit Cost</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Total Value</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Supplier</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item, idx) => {
                  const isLowStock = item.quantity < item.minStock;
                  const totalValue = item.quantity * item.cost;
                  return (
                    <tr key={item.id || idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-semibold text-black">{item.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.category}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                        {item.quantity.toLocaleString()} {item.unit}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {item.minStock} / {item.maxStock}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">${item.cost}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-700">${totalValue.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{item.supplier}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            isLowStock
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {isLowStock ? '⚠️ Low Stock' : '✓ Good'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-black mb-4">Stock by Category</h2>
          <div className="space-y-3">
            {categories.map((cat) => {
              const catItems = inventory.filter((i) => i.category === cat);
              const catStock = catItems.reduce((sum, i) => sum + i.quantity, 0);
              const catValue = catItems.reduce((sum, i) => sum + i.quantity * i.cost, 0);
              return (
                <div key={cat} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-800">{cat}</p>
                    <span className="text-sm text-gray-600">{catItems.length} items</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-gray-600">{catStock.toLocaleString()} units</p>
                    <p className="font-semibold text-gray-700">${(catValue / 1000).toFixed(1)}K</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
          <h2 className="text-xl font-bold text-black mb-4">Last Restocked</h2>
          <div className="space-y-3">
            {inventory
              .sort((a, b) => new Date(b.lastRestocked).getTime() - new Date(a.lastRestocked).getTime())
              .slice(0, 6)
              .map((item) => (
                <div key={item.id} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{item.lastRestocked}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                    {item.quantity} {item.unit}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
