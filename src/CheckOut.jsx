import { useCart } from './context/CartContext';
import './Checkout.css';

export default function CheckOut() {
    const { cartItems, addToCart, removeFromCart, updateCartItemQuantity } = useCart();

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

   const handleOrder=()=>{
        // TO DO
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
                        <button className='btn btn-primary btn-lg mt-3'>Place Order</button>
                    </div>
                </>
            )}
        </div>
    );
}