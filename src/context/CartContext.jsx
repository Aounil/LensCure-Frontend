import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {


    // this is called lazy initializer
    const [cartItems, setCartItems] = useState(() => {
        const stored = localStorage.getItem('cartItems');
        return stored ? JSON.parse(stored) : [];
    });
    

    // runs after each change in cartItems
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);
            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                const { id, name, price, image_path } = product;
                return [...prev, { id, name, price, image_path, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prev) =>
            prev.map((item) => item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ).filter((item) => item.quantity > 0)
        );
    };

    const updateCartItemQuantity = (id, newQuantity) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart, updateCartItemQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export function useCart() {
    return useContext(CartContext);
}
