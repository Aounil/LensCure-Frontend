import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../fetchWithAuth';
import '../styles/Stock.css';
import Silk from './Silk';

export default function StockManager() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [draft, setDraft] = useState({});
  const [saving, setSaving] = useState(false);

  const getProducts = async () => {
    try {
      const response = await fetchWithAuth('http://localhost:8080/all', { method: 'GET' });
      const data = await response.json();
      if (response.ok) setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSelect = (product) => {
    setSelectedProduct(product);
    setDraft(product);
  };

  // to save the changes temp in draft product befor saving is better ig
  const handleChange = (field, value) => {
    setDraft(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!draft || !selectedProduct) return;
    setSaving(true);
    try {
      const response = await fetchWithAuth(`http://localhost:8080/stock/update/${draft.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      });

      if (response.ok) {
        setProducts(prev => prev.map(p => (p.id === draft.id ? draft : p)));
        console.log('✅ Product saved successfully!');
      } else {
        console.error('❌ Failed to save product.');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container my-5">
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <Silk speed={5} scale={1} color="#8a8a8a" noiseIntensity={1.5} rotation={0} />
      </div>

      <h2 className="my-4 text-light fw-bold titles">Manage Product Inventory</h2>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="bg-white rounded-4 shadow p-3">
            <h5 className="mb-3">Products</h5>
            <table className="table table-hover">
              <tbody>
                {products.map(product => (
                  <tr
                    key={product.id}
                    onClick={() => handleSelect(product)}
                    style={{
                      cursor: 'pointer',
                      backgroundColor: selectedProduct?.id === product.id ? '#f0f0f0' : 'transparent',
                      borderRadius: '12px'
                    }}
                  >
                    <td>{product.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-8">
          {selectedProduct ? (
            <div className="bg-white rounded-4 shadow p-4">
              <h5 className="mb-4">Edit Product</h5>

              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  value={draft.name}
                  onChange={e => handleChange('name', e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control rounded-3"
                  value={draft.price}
                  onChange={e => handleChange('price', parseFloat(e.target.value))}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control rounded-3"
                  value={draft.description || ''}
                  onChange={e => handleChange('description', e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control rounded-3"
                  value={draft.quantity}
                  onChange={e => handleChange('quantity', parseInt(e.target.value))}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select rounded-3"
                  value={draft.status}
                  onChange={e => handleChange('status', e.target.value)}
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="OUT OF STOCK">Out of Stock</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Reference</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  value={draft.reference}
                  onChange={e => handleChange('reference', e.target.value)}
                />
              </div>

              <button
                className="btn btn-primary rounded-pill px-4"
                disabled={saving}
                onClick={handleSave}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          ) : (
            <p className="text-light">Select a product to edit</p>
          )}
        </div>
      </div>
    </div>
  );
}
