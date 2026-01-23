import { useCart } from "../context/CartContext";

export default function MenuItemCard({ item }) {

    const { cart, addItem, removeItem } = useCart();
    const cartItem = cart.find(i => i.id === item.id);
    const quantity = cartItem?.quantity || 0;

    return (
        <div className="rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition">
           {/**
            *  <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
            </div>
            */}

            <img src={item.image} alt={item.name} className="h-48" />
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <span className="text-amber-500 font-medium">
                        ${item.price.toFixed(2)}
                    </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                    {item.description}
                </p>
            </div>

            <div className="flex items-center gap-3">
                <button onClick={() => removeItem(item.id)} 
                className="px-3 py-1 bg-gray-200 
                rounded 
                hover:cursor-pointer transition-all hover:bg-red-400">-</button>
                <span>{quantity}</span>
                <button onClick={() => addItem(item)} 
                className="px-3 py-1 bg-gray-200 text-blue 
                rounded 
                hover:cursor-pointer transition-all hover:bg-cyan-400">+</button>
            </div>
        </div>
    );
}