import React, { useEffect, useState } from 'react';
import './Client.css';
import { fetchWithAuth } from './fetchWithAuth';
import { useCart } from './context/CartContext';
import ScrollingText from './ScrollingText';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import banner from './assets/banner.png';
import Silk from './Silk';

export default function Client() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchedCategory, setSearchedCategory] = useState('');
  const { addToCart } = useCart();
  const [categories, setCategories] = useState([]);

  // Add product to cart with success toast notification
  const handleAddToCart = (product) => {
    addToCart(product);

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'success',
      title: `"${product.name}" added to cart!`,
    });
  };

  // Fetch products and extract unique trimmed categories
  const getProducts = async () => {
    try {
      const response = await fetchWithAuth('http://localhost:8080/all', { method: 'GET' });
      const data = await response.json();
      if (response.ok) {
        setProducts(data);

        // Extract unique trimmed categories
        const uniqueCategories = Array.from(new Set(data.map(p => p.category.trim())));
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Filter products based on search, category, and availability
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =searchedCategory === ''? true: product.category.trim().toLowerCase() === searchedCategory.trim().toLowerCase();
    const isAvailable = product.status === 'AVAILABLE';
    return matchesSearch && matchesCategory && isAvailable;
  });

  return (
    <div>
      {/* Background Silk effect */}
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
        <Silk speed={5} scale={1} color="#7B7481" noiseIntensity={1.5} rotation={0} />
      </div>

      <ScrollingText />

      <div className="container">
        <div className="banner-container position-relative my-5">
          <img src={banner} alt="Banner" className="banner-img img-fluid" />
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="container my-5">
        <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: '400px' }}
          />
          <select
            name="category"
            className="form-control"
            id="category"
            value={searchedCategory}
            onChange={(e) => setSearchedCategory(e.target.value)}
            style={{ maxWidth: '200px' }}
          >
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
              <option key={`${cat}-${index}`} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container">
        {filteredProducts.length === 0 ? (
          <p className="text-center">No products found.</p>
        ) : (
          <div className="row g-4 justify-content-center">
            {filteredProducts.map((product) => (
              <div className="col-md-6 col-lg-4" key={product.id}>
                <div className="card custom-card">
                  <div className="tilt">
                    <div className="img">
                      <img src={product.image_path} alt={product.name} className="product-img" />
                    </div>
                  </div>

                  <div className="info">
                    <Link to="/product" state={{ product }}>
                      <h2 className="title">{product.name}</h2>
                    </Link>
                    <p className="desc">{product.description}</p>
                    <p className="reference">Ref: {product.reference}</p>

                    <div className="bottom">
                      <div className="price">
                        <span className="new">${product.price}</span>
                      </div>
                      <button
                        className="btn btn-dark"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.status !== 'AVAILABLE'}
                      >
                        <span>Add to Cart</span>
                        <svg
                          className="icon"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          style={{ marginLeft: '10px' }}
                        >
                          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4" />
                          <line x1="3" y1="6" x2="21" y2="6" />
                          <path d="M16 10a4 4 0 01-8 0" />
                        </svg>
                      </button>
                    </div>

                    <div className="meta">
                      <div
                        className={`stock ${
                          product.status === 'AVAILABLE' ? 'in-stock' : 'out-stock'
                        }`}
                      >
                        {product.status === 'AVAILABLE' ? 'In Stock' : 'Out of Stock'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
