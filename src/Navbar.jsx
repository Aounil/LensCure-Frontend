// ... imports
import NVlogo from './assets/NVlogo.png';
import './Navbar.css';
import userIcon from './assets/usericon.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import { useCart } from './context/CartContext.jsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { cartItems, removeFromCart } = useCart();
    const [isCartVisible, setCartVisible] = useState(false);

    const toggleCart = () => {
        setCartVisible(prev => !prev);
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleViewProfile = () => {
        // Add your profile navigation logic here
    };

    const handleCheckOut = () => {
        navigate("/checkout");
    };

    // Show a simple navbar if not authenticated
    if (!isAuthenticated) {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ position: 'sticky', top: 0, zIndex: 1030 }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><img src={NVlogo} alt="Logo" style={{ width: "40px", height: "auto", objectFit: "contain" }} /></a>
                    <div className="navbar-nav mx-auto">
                        <span className="nav-link welcome">Welcome to LensCure</span>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ position: 'sticky', top: 0, zIndex: 1030 }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><img src={NVlogo} alt="Logo" style={{ width: "40px", height: "auto", objectFit: "contain" }} /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <a className="nav-link active welcome" aria-current="page" href="#">Welcome to LensCure</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={userIcon} alt="" className="me-2" style={{ width: '20px', height: '20px' }} />
                                    <span className="user-name">{user?.name}</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a className="dropdown-item" href="#" onClick={handleViewProfile}>View Profile</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#" onClick={handleLogout}>Log Out</a></li>
                                </ul>
                            </li>

                            {/* Only show cart for CLIENT users */}
                            {user?.role === "CLIENT" && (
                                <li className="nav-item cart-container">
                                    <span className="cart-icon-wrapper" onClick={toggleCart}>
                                        <span className="material-symbols-outlined cart-icon">shopping_cart</span>
                                        <span className="cart-badge">
                                            {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                                        </span>
                                    </span>

                                    {isCartVisible && (
                                        <div className="custom-cart-dropdown">
                                            <div className="cart-header">
                                                <span className="material-symbols-outlined cart-icon">shopping_cart</span>
                                                <span className="cart-badge">{cartItems.length}</span>
                                                <div className="cart-total">
                                                    <span className="text-muted">Total:</span>
                                                    <span className="total-price">
                                                        ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>

                                            <ul className="cart-items-list">
                                                {cartItems.map((item, index) => (
                                                    <li className="cart-item" key={index}>
                                                        <img src={item.image_path} alt={item.name} />
                                                        <span className="item-name">{item.name}</span>
                                                        <span className="item-price">${item.price.toFixed(2)}</span>
                                                        <span className="item-quantity">
                                                            Qty: {item.quantity} {item.stock && `/ ${item.stock}`}
                                                        </span>
                                                        <button className='btn btn-danger mx-1' onClick={() => removeFromCart(item.id)}>-</button>
                                                    </li>
                                                ))}
                                            </ul>

                                            <button className="checkout-btn" onClick={handleCheckOut}>Checkout</button>
                                        </div>
                                    )}
                                </li>
                            )}

                            {user?.role === "ADMIN" && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/stock-manager">Stock Management</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin-panel">User Management</Link>
                                    </li>
                                </>
                            )}




                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
