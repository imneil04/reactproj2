import { React, useState } from "react";
import { menuData } from "../data/menuData";
import MenuItemCard from "./MenuItemCard";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Menu () {

    const [category, setCategory] = useState("drinks");
    //const { cart } = useCart();

    //const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <>
            <div className="max-w-4xl mx-auto p-5">
                {/**Page Title */}
                <div className="text-center mb-12">
                    <h1 className="text-2xl font-bold mt-17">Our Menu</h1>
                    <p className="text-gray-600">
                        Choose from our fresh selections
                    </p>
                    {/**Link here to totalitems before */}
                </div>

                <div className="flex gap-4 mb-6">
                    {Object.keys(menuData).map(cat => (
                        <button key={cat} onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-full ${
                                category === cat ? "bg-brown-600 text-white" : "bg-gray-200 cursor-pointer"
                            }`}>
                                {cat.toUpperCase()}
                            </button>
                    ))}
                </div>
                                {/**grid-cols-1-> mobile, grid-cols-2-> tablet, grid-cols-3-> desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-center">
                    {menuData[category].map(item => (
                        <MenuItemCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </>
    );
}