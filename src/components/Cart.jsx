import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import ConfirmModal from "../components/ConfirmationModal";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../js/firebase";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const { cart, clearCart } = useCart();
    
    //const cartItems = Object.values(cart);
    //for redirect
    const navigate = useNavigate();

    //for pre-modal confirmation (pre-check order submission)
    const [ showConfirm, setShowConfirm ] = useState(false);
    const [ success, setSuccess ] = useState(false);

    //cart items
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)

    //total pre-tax applied
    const subTax = (subtotal * 0.05);

    //overall total
    const total = (subtotal + subTax);

    const user = auth.currentUser; 

    //modified to include async for firestore
    const confirmOrder = async () => {
        
        try {
            //check to ensure users must login, before allowing place an order
            if (!user) {

                alert("user not logged in. Please login first or create an account.✅");
                return;
            }
            
            //exclude image field
            /*const cleanItems = cart.map(({ id, name, price, quantity }) => ({
                id,
                name,
                price,
                quantity
            })); */
             //exclude image field
            const cleanItems = cart.map(({ image, ...rest}) => rest);

            //save to firestore
            await addDoc(collection(db, "users", user.uid, "orders"), {
                items: cleanItems,
                total,
                createdAt: new Date()
            });

             clearCart();
             setShowConfirm(false);
             setSuccess(true);
        }
        catch (err) {
            alert ("something went wrong." + err.message);
        }

        //clearCart();
        //setShowConfirm(false);
        //setSuccess(true);
    };

    //what to display or render
    return (
        <>
            <div className="max-w-xl mx-auto p-6">
                <h1 className="text-2xl text-center font-bold mt-15 mb-10">Your Order</h1>

                {cart.length === 0 && !success && (
                    <p>Your cart is looking empty.</p>
                )}

                <div className="space-y-4">
                    {cart.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>

                {cart.length > 0 && (
                    <>
                        <div className="flex flex-col">
                            {/**subtotal (pre-tax) */}
                            <p className="mt-6">
                            Subtotal: ${subtotal.toFixed(2)}
                            </p>
                            {/**tax */}
                            <p className="mt-2 text-md">
                                Amount Tax: ${subTax.toFixed(2)}
                            </p>
                            {/**total (with tax) */}
                            <p className="mt-2 text-md font-semibold">
                                Total: ${total.toFixed(2)}
                            </p>
                        </div>

                        <button onClick={() => setShowConfirm(true)} 
                        className="mt-4 
                                   w-full 
                                   bg-gray-600 text-black py-2 rounded transition-all hover:bg-emerald-500 hover:cursor-pointer">
                            Place Order
                        </button>
                    </>
                )}

                {success && (
                    <>
                        <p className="text-green-500 text-2xl mt-4 text-center">
                        Thank you for your order! ✅
                        </p>
                        <p className="text-green-700 text-lg mt-4 text-center animate-pulse">Your order is now being prepared...</p>
                    </>
                )}

                {showConfirm && (
                    <ConfirmModal onConfirm={confirmOrder} onCancel={() => setShowConfirm(false)} />
                )}
            </div>
        </>
    );
}