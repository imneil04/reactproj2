import { act, Children, createContext, use, useContext, useEffect, useReducer, useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../js/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { menuMap } from "../data/menuMap";

const CartContext = createContext();

//for localStorage (persist items in cart) item ID
const CART_KEY = "cafe_cart"; 

const cartReducer = (state, action) => {
    console.log("reducer action: ", action);

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

//function
export const CartProvider = ({ children }) => {

    const [ cart, dispatch ] = useReducer(cartReducer, [], getInitialCart);
    
    //merge once flag
    //const hasMergeRef = useRef(false);
    //const hasLodedRef = useRef(false);
    const hasInitializedRef = useRef(false);
    //const isMergingRef = useRef(false);

    const [user, setUser] = useState(null);
    
    const syncTimeoutRef = useRef(null);
     
    //save cart to localStorage
    useEffect(() => {
        //const user = auth.currentUser;

        //only save guest carts, avoid re-writes
        if (!user) {
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
        }
        //localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }, [cart, user]); //before cart word inside []

    //auth listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })

        return () => unsubscribe();
    }, []);

    //reset init flag - runs on user change
    useEffect(() => {
        console.log("user changed, reset init flag.");
        
        hasInitializedRef.current = false;
    }, [user]);


    //load + merge cart to login
    useEffect(() => {
        if (!user) return;
        //setUser(user);

        //prevent duplicate merge
        if (hasInitializedRef.current) return;

        //isMergingRef.current = true;

        //console.log("User detected, loading cart...");
        let cancelled = false;

        const loadCart = async () => {
                try {
                const snap = await getDoc(doc(db, "users", user.uid));

                const fireStoreCart = snap.exists() ? snap.data().cart || [] : [];

                //get local cart
                const localCart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

                    //let means dynamic obj
                let finalCart = fireStoreCart;

                //only merge if localCart exists
                if(localCart.length > 0 && fireStoreCart.length === 0) {

                    //merge both carts
                    const mergedCart = [...fireStoreCart];

                        localCart.forEach(localItem => {
                        const existing = mergedCart.find(i => i.id === localItem.id);

                        if (existing) {
                            existing.quantity += localItem.quantity;
                        }
                        else {
                            mergedCart.push(localItem);
                        }
                    });

                    finalCart = mergedCart;
                    //clear guest cart immediately
                    localStorage.removeItem(CART_KEY);
                }

                //for image re-render
                    const cartWithImages = finalCart.map(item => ({
                    ...item,
                    image: menuMap[item.id]?.image || "/images/placeholder.png"
                }))

                console.log("Final cart before dispatch: ", finalCart);
                console.log("Cart with images", cartWithImages);

                //dispatch ({ type: "SET", payload: finalCart });
                //load cart items re-attaching with the image logo
           
                dispatch ({ type: "SET", payload: cartWithImages });

                hasInitializedRef.current = true;
      
            }
            catch (err) {
                console.log("Error loading cart:", err);
            }
        };

        loadCart();

    }, [user]);
        //return () =>  unsubscribe();
    

    //sync cart to Firestore 
    useEffect(() => {
        const user = auth.currentUser;
       
        if (!user) return;
        if (!hasInitializedRef.current) return;

        //clear previous timer
        if (syncTimeoutRef.current) {
            clearTimeout(syncTimeoutRef.current);
        }

        //debounce (300-500ms is ideal)
        syncTimeoutRef.current = setTimeout(async () => {
            try {
                const cleanCart = cart.map(({ image, ...rest }) => rest);

                await setDoc(doc(db, "users", user.uid), 
                { cart: cleanCart }, 
                { merge: true });

                console.log("debounced sync: ", cleanCart);
            }
            catch (err) {
                console.error("Sync failed: ", err);
            }
        }, 300); //adjust if needed

        return () => {
            if (syncTimeoutRef.current) {
                clearTimeout(syncTimeoutRef.current);
            }
        };

        /*sync function
        const syncCart = async () => {
            try {
                const cleanCart = cart.map(({ image, ...rest }) => rest);

                await setDoc(doc(db, "users", user.uid), 
                { cart: cleanCart }, 
                { merge: true });

                console.log("Snyced cart: ", cleanCart);

            }
            catch (err) {
                console.error("Sync failed:", err);
            }
        };

        syncCart(); */

    }, [cart, user]);


    const addItem = item => dispatch({ type: "ADD", item }); // add items in cart
    const removeItem = id => dispatch({ type: "REMOVE", id }); // remove items in cart
    const clearCart = () => dispatch({type: "CLEAR" }); //clear cart or storage

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart  = () => useContext(CartContext);