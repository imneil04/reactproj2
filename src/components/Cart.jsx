import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import ConfirmModal from "../components/ConfirmationModal";

export default function Cart() {
    const { cart, clearCart } = useCart();
    const [ showConfirm, setShowConfirm ] = useState(false);
    const [ success, setSuccess ] = useState(false);

    const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    
    const subTax = (subtotal * 0.05);

    const total = (subtotal + subTax);

    const confirmOrder = () => {
        clearCart();
        setShowConfirm(false);
        setSuccess(true);
    };

    return (
        <>
            <div className="max-w-xl mx-auto p-6">
                <h1 className="text-2xl font-bold mt-15 mb-5">Your Order</h1>

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
                        <div className="flex flex-col justify-end">
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
                    <p className="text-green-500 mt-4 text-center">
                        Thank you for your order!
                    </p>
                )}

                {showConfirm && (
                    <ConfirmModal onConfirm={confirmOrder} onCancel={() => setShowConfirm(false)} />
                )}
            </div>
        </>
    );
}