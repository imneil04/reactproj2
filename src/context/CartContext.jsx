import { act, Children, createContext, useContext, useEffect, useReducer, useState } from "react";

const CartContext = createContext();

const CART_KEY = "cafe_cart"; //for localStorage (persist items in cart) item ID

//export const useCart = () => useContext(CartContext);

/*export function CartProvider({ children }) {
    const [cart, setCart] = useState({}); 

    const addItem = (item) => {
        setCart(prev => ({
            ...prev, [item.id] : { ...item, qty: prev[item.id]?.qty + 1 || 1, }
        }));
    };

    const removeItem = (id) => {
        setCart(prev => {
            if (!prev[id])
                return prev;

            const newQty = prev[id].qty - 1;
            if (newQty <= 0) {
                const updated = { ...prev };
                delete updated[id];
                return updated;
            }

            return {
                ...prev,[id]: { ...prev[id], qty: newQty }
            };
        });
    };

    const clearCart = () => setCart({});

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
} */

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD": {
            const existing = state.find(i => i.id === action.item.id)
            if (existing) {
                return state.map (i => 
                    i.id === action.item.id ? { ...i, quantity: i.quantity + 1} : i
                );
            }
            return [...state, { ...action.item, quantity: 1}];
        }

        case "REMOVE": {
            return state.map (i => 
                i.id === action.id
                ? { ...i, quantity: i.quantity - 1} : i
            ).filter(i => i.quantity > 0); 
        }

        case "SET":
            return action.payload;

        
        case "CLEAR":
            return [];

        default:
            return state;

    }
}; 

//Load from localStorage (runs once)
const getInitialCart = () => {
    try {
        const stored = localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
    }
    catch {
        return [];
    }
};


export const CartProvider = ({ children }) => {
    const [ cart, dispatch ] = useReducer(cartReducer, [], getInitialCart);

    //save to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }, [cart]);

    const addItem = item => dispatch({ type: "ADD", item });
    const removeItem = id => dispatch({ type: "REMOVE", id });
    const clearCart = () => dispatch({type: "CLEAR" });

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart  = () => useContext(CartContext);