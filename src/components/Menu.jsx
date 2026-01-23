import { React, useState } from "react";
import { menuData } from "../data/menuData";
import MenuItemCard from "./MenuItemCard";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Menu () {
    
    //const [category, setCategory] = useState("drinks");
    //const { cart } = useCart();

    //const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

    const categories = ["drinks", "food", "desserts"];
    const [activeCategory, setActiveCategory] = useState("drinks");

    const filteredItems = menuData[activeCategory] || [];

    return (
        <>
            <div className="max-w-7xl mx-auto px-6 py-5">
                {/**Page Title */}
                <div className="text-center mb-12">
                    <h1 className="text-2xl font-bold mt-17">Our Menu</h1>
                    <p className="text-gray-600">
                        Choose from our fresh selections
                    </p>
                    {/**Link here to totalitems before */}
                </div>

                {/**
                 * <div className="flex gap-4 mb-6 animate-fade-in">
                    {Object.keys(menuData).map(cat => (
                        <button key={cat} onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-full animate-fade-in ${
                                category === cat ? "bg-brown-600 text-white" : "bg-gray-200 cursor-pointer"
                            }`}>
                                {cat.toUpperCase()}
                        </button>
                    ))}
                </div>
                 */}

                {/**Category Nav */}
                <div className="flex justify-center gap-6 mb-10">
                    {categories.map((cat) => (
                        <button key={cat} onClick={() => setActiveCategory(cat)} 
                                className={`text-sm font-medium capitalize transition cursor-pointer 
                                ${activeCategory === cat ? "text-amber-600 border-b-2 border-amber-600" 
                                                         : "text-gray-600 hover:text-black"}`}>
                                {cat}
                        </button>
                    ))}
                </div>

                {/**Menu items */}
                <div className="flex flex-wrap">
                    {filteredItems.map((item, index) => (
                        <div key={item.id} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8 animate-fade-up"
                                           style={{ animationDelay: `${index * 120}ms` }}>
                            <MenuItemCard item={item} />
                        </div>
                    ))}
                </div>

                {/**grid-cols-1-> mobile, grid-cols-2-> tablet, grid-cols-3-> desktop */}
                {/** 
                 * <div className="flex flex-wrap">
                    {menuData[category].map(item => (
                        <div key={item.id} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8" 
                                            style={{ animationDelay: `${index * 120}ms` }}>
                            <MenuItemCard item={item} />
                        </div>
                    ))}
                </div>
                 * 
                */}
                
            </div>
        </>
    );
}
