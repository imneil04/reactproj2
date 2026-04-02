import { useCart } from "../context/CartContext.jsx";

export default function CartItem({ item }) {
    const { addItem, removeItem } = useCart();

    return (
        <>
            
           <div className="flex justify-between items-center">
                {/**item info */}
                <div className="flex items-center shadow-lg pr-2 text-xs rounded-xl md:text-sm lg:w-xs">
                    <img src={item.image} alt={item.name} className="w-14 h-15 rounded-lg" />
                    <p className="font-semibold">{item.name}</p>
                    
                    <p className="text-sm text-amber-500 font-medium ml-4">
                            ${(item.price * item.quantity).toFixed(2)}
                    </p>
                </div>

                {/**item quantity */}
                <div className="flex gap-3 items-center text-xs md:text-sm">
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