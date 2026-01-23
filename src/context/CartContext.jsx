import { act, Children, createContext, useContext, useReducer } from "react";

const CartContext = createContext();

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

        case "CLEAR":
            return [];

        default:
            return state;

    }
};

export const CartProvider = ({ children }) => {
    const [ cart, dispatch ] = useReducer(cartReducer, []);

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