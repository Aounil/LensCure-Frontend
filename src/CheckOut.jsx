import { useCart } from './context/CartContext';
import { useAuth } from './context/AuthContext';
import './Checkout.css';
import { fetchWithAuth } from './fetchWithAuth';
import { toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CheckOut() {
    const { cartItems, addToCart, removeFromCart, updateCartItemQuantity ,clearCart } = useCart();
    const { user  } = useAuth();
    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)
    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleOrder = async () => {

        setLoading(true)

        const itemdata = {
            userEmail: user.sub,
            items: cartItems.map((item) => ({
                productId: item.id,
                quantity: item.quantity

            }))
        }
        console.log(itemdata)

        const response = await fetchWithAuth('http://localhost:8080/orders', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemdata)
        })

        if (response.ok) {
            toast.success('🛍️ Your order has been placed successfully!', {
                position: 'top-center',
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
                transition: Bounce,
                style: {
                    background: 'linear-gradient(to right, #1f1f1f, #2c2c2c)',
                    color: '#00ffcc',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
                    fontSize: '1.05rem',
                    fontWeight: '500',
                    letterSpacing: '0.4px'
                },
                icon: '✨'
            });
            setLoading(false)
            clearCart()
            navigate('/client')
            

           
        } else {
            toast.error('❌ Failed to place your order. Try again.', {
                position: 'top-center',
                autoClose: 3000,
                theme: 'dark',
                transition: Bounce
            });
        }


    }


return (
    <div className="container checkout-wrapper">
        <h1 className='my-5 Ctitle'>Shopping Cart 🛒</h1>

        {cartItems.length === 0 ? (
            <p className='text-center'>Your cart is empty.</p>
        ) : (
            <>
                {cartItems.map((item, index) => (
                    <div key={index} className="cart-item-card d-flex align-items-center justify-content-between p-3 mb-3 border rounded shadow-sm">
                        <div className="d-flex align-items-center">
                            <img className='checkimg me-3' src={item.image_path} alt={item.name} />
                            <div>
                                <h5 className='mb-1'>{item.name}</h5>
                                <p className='mb-0 text-muted'>{item.price.toFixed(2)}$ each</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="input-group quantity-control me-3">
                                <button className="btn btn-outline-secondary" onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                                <input
                                    className='form-control text-center'
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => {
                                        const newQty = parseInt(e.target.value);
                                        if (!isNaN(newQty) && newQty >= 1) {
                                            updateCartItemQuantity(item.id, newQty);
                                        }
                                    }}
                                />
                                <button className="btn btn-outline-secondary" onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}>+</button>
                            </div>
                            <div className="fw-bold me-3">
                                {(item.price * item.quantity).toFixed(2)}$
                            </div>
                            <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                    </div>
                ))}

                <div className="summary-card bg-light p-4 mt-4 rounded text-end">
                    <h4>Total: <strong>{total.toFixed(2)}$</strong></h4>
                    <button type="submit" className="btn btn-success mt-5 " onClick={()=>handleOrder()}  >  {loading?"Processing.....":"Place Order"}{loading && <div className="spinner-border spinner-border-sm ms-2" role="status" />}
                </button>
                </div>
            </>
        )}
    </div>
);
}