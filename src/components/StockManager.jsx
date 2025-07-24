import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from '../fetchWithAuth';
import '../styles/Stock.css';
import Silk from './Silk';

export default function StockManager() {
  const [products, setProducts] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [savingIds, setSavingIds] = useState([]);

  // Fetch products
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

  // Handle field change
  const handleChange = (id, field, value) => {
    setDrafts(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  // Save a product
  const handleSave = async (product) => {
    const draft = drafts[product.id];
    if (!draft) return; // Nothing to save

    const updatedProduct = { ...product, ...draft };

    setSavingIds(prev => [...prev, product.id]);

    try {
      const response = await fetchWithAuth(`http://localhost:8080/stock/update/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        // Apply changes to main state
        setProducts(prev =>
          prev.map(p => (p.id === product.id ? updatedProduct : p))
        );
        // Clear draft for this product
        setDrafts(prev => {
          const copy = { ...prev };
          delete copy[product.id];
          return copy;
        });
        console.log('✅ Product saved successfully!');
      } else {
        console.error('❌ Failed to save product.');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setSavingIds(prev => prev.filter(id => id !== product.id));
    }
  };

  return (
    <div className="container mt-5">
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      >
        <Silk speed={5} scale={1} color="#ffffff" noiseIntensity={1.5} rotation={0} />
      </div>

      <h2 className="my-5 text-light">Manage Product Inventory</h2>

      <table className="table table-responsive table-bordered table-striped rounded">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Reference</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map(product => {
            const draft = drafts[product.id] || {};
            const combined = { ...product, ...draft };
            const isSaving = savingIds.includes(product.id);

            return (
              <tr key={product.id}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={combined.name}
                    onChange={e => handleChange(product.id, 'name', e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={combined.price}
                    onChange={e =>
                      handleChange(product.id, 'price', parseFloat(e.target.value))
                    }
                  />
                </td>

                <td>
                  <textarea
                    className="form-control"
                    value={combined.description || ''}
                    onChange={e =>
                      handleChange(product.id, 'description', e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={combined.quantity}
                    onChange={e =>
                      handleChange(product.id, 'quantity', parseInt(e.target.value))
                    }
                  />
                </td>

                <td>
                  <select
                    className="form-select"
                    value={combined.status}
                    onChange={e =>
                      handleChange(product.id, 'status', e.target.value)
                    }
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="OUT OF STOCK">Out of Stock</option>
                  </select>
                </td>

                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={combined.reference}
                    onChange={e =>
                      handleChange(product.id, 'reference', e.target.value)
                    }
                  />
                </td>

                <td>
                  <button
                    className="btn btn-success"
                    disabled={!draft || isSaving}
                    onClick={() => handleSave(product)}
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
  