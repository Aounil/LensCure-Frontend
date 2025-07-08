import { Children, createContext, useContext, useState } from "react";


const CartContext = createContext();



export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([])

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
                // Force cart quantity to 1, regardless of actual stock
                const { id, name, price, image_path } = product;
                return [...prev, { id, name, price, image_path, quantity: 1 }];
            }
        });
    };


    const removeFromCart = (id) => {
        setCartItems((prev) =>
            prev.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
                .filter((item) => item.quantity > 0)
        );
    };

    const updateCartItemQuantity = (id, newQuantity) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () =>{
        setCartItems([])
    }





    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity ,clearCart }}>
            {children}
        </CartContext.Provider>
    );
}
// you use this useCart in componant to be able to use the function inside here
export function useCart() {
    return useContext(CartContext);
}

