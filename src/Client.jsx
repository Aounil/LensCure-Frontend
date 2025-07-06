import React, { useEffect, useState } from 'react'
import { fetchWithAuth } from './fetchWithAuth';
export default function Client() {

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    const [status, setStaus] = useState('ALL')

    const getProducts = async () => {
        try {
            const response = await fetchWithAuth('http://localhost:8080/all', {
                method: 'GET',
            });
            const data = await response.json()
            if (response.ok) {
                setProducts(data)
            }
        }
        catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        getProducts();
    }, [])


    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toString().toLowerCase().includes(search.toLowerCase());
        const matchesStatus = status === "ALL" || product.status === status;
        return matchesSearch && matchesStatus;
    })


    return (
        <div>

            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="d-flex align-items-center justify-content-center gap-3">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{ maxWidth: '550px' }}
                            />

                            <select
                                className="form-select"
                                style={{ maxWidth: '200px', borderRadius: '7px' }}
                                value={status}
                                onChange={(e) => setStaus(e.target.value)}
                            >
                                <option value="ALL">All Statuses</option>
                                <option value="AVAILABLE">Available</option>
                                <option value="OUT_OF_STOCK">Out of Stock</option>
                            </select>

                        </div>
                    </div>
                </div>
            </div>
        <div className="container">
            {filteredProducts.length === 0 ? (
                <p className="text-center">No products found.</p>
            ) : (
                <div className="row g-4">
                    {filteredProducts.map(product => (
                        <div className="col-md-6 col-lg-4" key={product.id}>
                            <div className="card h-100 shadow-lg border-0 rounded-4">
                                <img
                                    src={product.image_path}
                                    className="card-img-top rounded-top-4"
                                    alt={product.name}
                                    style={{ height: '200px', objectFit: 'contain', padding: '10px' }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fw-bold text-primary">{product.name}</h5>
                                    <p className="card-text text-muted" style={{ minHeight: '60px' }}>{product.description}</p>
                                    <div className="mt-auto">
                                        <p className="mb-1"><strong>Price:</strong> ${product.price}</p>
                                        <p className="mb-1"><strong>Status:</strong> <span className={product.status === 'AVAILABLE' ? 'text-success' : 'text-danger'}>{product.status}</span></p>
                                        <p className="mb-3"><strong>Stock:</strong> {product.quantity}</p>
                                        <button className="btn btn-dark w-100">View Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>

    )
}



