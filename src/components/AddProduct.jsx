import React, { useState } from 'react';
import { fetchWithAuth } from '../fetchWithAuth';
import { toast, Bounce } from 'react-toastify';
import Silk from './Silk';

export default function AddProduct() {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        quantity: '',
        status: '',
        reference: '',
        image_path: '',
        category: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetchWithAuth('http://localhost:8080/stock/add',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

            if (response.ok) {
                toast.success('📦 Product added!', {
                    position: 'top-right',
                    autoClose: 2800,
                    theme: 'colored',
                    transition: Bounce
                });
                setFormData({
                    name: '',
                    price: '',
                    description: '',
                    quantity: '',
                    status: '',
                    reference: '',
                    image_path: '',
                    category: ''
                });
            } else {
                toast.error('Failed to add product', { theme: 'colored' });
            }
        } catch (error) {
            console.error('Error adding the product:', error);
            toast.error('Error adding the product', { theme: 'colored' });
        }
    };

    return (
        <div className="container-sm my-5 d-flex justify-content-center">
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
                <Silk speed={5} scale={1} color="#fefe3a" noiseIntensity={1.5} rotation={0} />
            </div>
            <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '600px' }}>
                <h2 className="mb-4 text-center fw-bold">Add New Product</h2>

                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-semibold">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter product name"
                        />
                    </div>

                    {/* Price */}
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label fw-semibold">Price</label>
                        <input
                            type="number"
                            step="0.01"
                            id="price"
                            className="form-control"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            placeholder="e.g. 19.99"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label fw-semibold">Description</label>
                        <textarea
                            id="description"
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            maxLength="2000"
                            placeholder="Describe your product..."
                        />
                    </div>

                    {/* Quantity */}
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label fw-semibold">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            className="form-control"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            placeholder="Number in stock"
                        />
                    </div>

                    {/* Status */}
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label fw-semibold">Status</label>
                        <select
                            id="status"
                            className="form-select"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select status</option>
                            <option value="AVAILABLE">Available</option>
                            <option value="OUT_OF_STOCK">Out of Stock</option>
                            <option value="DISCONTINUED">Discontinued</option>
                        </select>
                    </div>

                    {/* Reference */}
                    <div className="mb-3">
                        <label htmlFor="reference" className="form-label fw-semibold">Reference</label>
                        <input
                            type="text"
                            id="reference"
                            className="form-control"
                            name="reference"
                            value={formData.reference}
                            onChange={handleChange}
                            required
                            placeholder="Unique reference"
                        />
                    </div>

                    {/* Image Path */}
                    <div className="mb-3">
                        <label htmlFor="image_path" className="form-label fw-semibold">Product Image URL</label>
                        <input
                            type="text"
                            id="image_path"
                            className="form-control"
                            name="image_path"
                            value={formData.image_path}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                        <label htmlFor="category" className="form-label fw-semibold">Category</label>
                        <input
                            type="text"
                            id="category"
                            className="form-control"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            placeholder="Product category"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
                        Save Product
                    </button>
                </form>
            </div>
        </div>
    );
}
