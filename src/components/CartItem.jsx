import { useCart } from "../context/CartContext.jsx";

export default function CartItem({ item }) {
    const { addItem, removeItem } = useCart();

    return (
        <>
           <div className="flex justify-between items-center">
                <div>
                    <p>{item.name}</p>
                    <p className="text-sm text-gray-500">
                        ${(item.price * item.quantity).toFixed(2)}
                    </p>
                </div>

                <div className="flex gap-3 items-center">
                    <button onClick={() => removeItem(item.id)} 
                    className="px-3 py-1 bg-gray-200 
                               rounded 
                               hover:cursor-pointer transition-all hover:bg-red-400">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addItem(item)} 
                    className="px-3 py-1 bg-gray-200 text-blue 
                               rounded 
                               hover:cursor-pointer transition-all hover:bg-cyan-400">+</button>
                </div>
            </div>
        </>
    );
}