import { useEffect, useState } from 'react';
import { n8nService } from '../services/n8nService';
import { Material } from '../types';
import { AlertTriangle } from 'lucide-react';

export default function InventoryManagement() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [lowStock, setLowStock] = useState<Material[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await n8nService.inventory.getItems('FAC-001');
      if (res.success && res.data) {
        setMaterials(Array.isArray(res.data) ? res.data : []);
        setLowStock(Array.isArray(res.data) ? res.data.filter((m: any) => m.stock < m.minStock) : []);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <div className="p-8 animate-pulse"><div className="h-96 bg-gray-200 rounded-lg" /></div>;

  const getStockStatus = (available: number, reserved: number, reorder: number) => {
    const net = available - reserved;
    if (net <= 0) return 'critical';
    if (net <= reorder) return 'low';
    return 'healthy';
  };

  return (
    <div className="p-8 space-y-6 bg-white">
      <div>
        <h1 className="text-3xl font-bold text-black">Inventory & Materials</h1>
        <p className="text-gray-600 mt-2">Stock levels, reorder management, and material tracking</p>
      </div>

      {lowStock.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg">
          <div className="flex gap-3">
            <AlertTriangle className="text-white flex-shrink-0" size={20} />
            <div>
              <h3 className="font-semibold text-amber-900">{lowStock.length} material(s) at low stock</h3>
              <p className="text-sm text-amber-700 mt-1">Consider placing reorder requests</p>
            </div>
          </div>
        </div>
      )}

      <div className="card card-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Material</th>
                <th className="px-6 py-3 text-left font-semibold">SKU</th>
                <th className="px-6 py-3 text-left font-semibold">Available</th>
                <th className="px-6 py-3 text-left font-semibold">Reserved</th>
                <th className="px-6 py-3 text-left font-semibold">Reorder Level</th>
                <th className="px-6 py-3 text-left font-semibold">Unit Cost</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {materials.map((mat) => {
                const net = mat.availableStock - mat.reservedStock;
                const status = getStockStatus(mat.availableStock, mat.reservedStock, mat.reorderLevel);
                return (
                  <tr key={mat.id} className="hover:bg-white">
                    <td className="px-6 py-4 font-medium text-black">{mat.name}</td>
                    <td className="px-6 py-4 text-gray-600">{mat.sku}</td>
                    <td className="px-6 py-4">{mat.availableStock}</td>
                    <td className="px-6 py-4 text-white">{mat.reservedStock}</td>
                    <td className="px-6 py-4 text-gray-600">{mat.reorderLevel}</td>
                    <td className="px-6 py-4 font-medium">${mat.unitCost.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        status === 'healthy' ? 'bg-black text-white text-white' :
                        status === 'low' ? 'bg-gray-500 text-white text-white' :
                        'bg-gray-700 text-white text-white'
                      }`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card card-md">
          <p className="text-sm text-gray-600">Total Materials</p>
          <p className="text-2xl font-bold mt-2">{materials.length}</p>
        </div>
        <div className="card card-md">
          <p className="text-sm text-gray-600">Low Stock Items</p>
          <p className="text-2xl font-bold text-white mt-2">{lowStock.length}</p>
        </div>
        <div className="card card-md">
          <p className="text-sm text-gray-600">Total Inventory Value</p>
          <p className="text-2xl font-bold text-black mt-2">
            ${(materials.reduce((sum, m) => sum + (m.availableStock * m.unitCost), 0)).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

