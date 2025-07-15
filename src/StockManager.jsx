import React, { useEffect, useState } from 'react';
import { fetchWithAuth } from './fetchWithAuth';
import './Stock.css';

export default function StockManager() {
  const [products, setProducts] = useState([]);

  // Fetch all products from the backend
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

  // Handle inline field changes
  const handleChange = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  // Save updated product to backend
  const handleSave = async (product) => {
    try {
      const response = await fetchWithAuth(`http://localhost:8080/stock/update/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        console.log('✅ Product saved successfully!');
      } else {
        console.error('❌ Failed to save product.');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="my-5">Manage Product Inventory</h2>

      <table className="table table-responsive table-bordered table-striped">
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
          {products.map((product, index) => (
            <tr key={product.id || index}>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={product.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={product.price}
                  onChange={(e) => handleChange(index, 'price', parseFloat(e.target.value))}
                />
              </td>
              <td>
                <textarea
                  className="form-control"
                  value={product.description || ''}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={product.quantity}
                  onChange={(e) => handleChange(index, 'quantity', parseInt(e.target.value))}
                />
              </td>
              <td>
                <select
                  className="form-select"
                  value={product.status}
                  onChange={(e) => handleChange(index, 'status', e.target.value)}
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="OUT OF STOCK">Out of Stock</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={product.reference}
                  onChange={(e) => handleChange(index, 'reference', e.target.value)}
                />
              </td>
              <td>
                <button className="btn btn-success" onClick={() => handleSave(product)}>
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
