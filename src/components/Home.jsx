import { React, useState, useEffect } from "react";
import b1Holiday from "../images/carouselpromo/b1_holiday.png";
import b1Promo from "../images/carouselpromo/b1_promo.png";
import b1Upcoming from "../images/carouselpromo/b1_upcoming.png";
import deal1 from "../images/carouselpromo/d1.png";
import deal2 from "../images/carouselpromo/d2.png";

const slides = [
    {
        title: "Holiday Specials",
        text: "Warm up with our seasonal favorites",
        image: b1Holiday
    },
    {
        title: "Buy 1 Get 1 Free",
        text: "Every Monday, all hot drinks",
        image: b1Promo
    },
    {
        title: "Bookish customers, Coming Soon",
        text: "Read, and Relax along with your daily favorites.",
        image: b1Upcoming
    },
    
    
]

export default function Home () {
    
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);
    
    return (
        <>
            <div className="relative h-[30vh] md:h-[70vh] overflow-hidden max-w-7xl mx-auto shadow-xl/20  mt-2">
                {slides.map((slide, index) => (
                    <div key={index} className={`absolute inset-0 transition-opacity duration-600 
                        ${index === current ? "opacity-100" : "opacity-0"}`}>
                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 flex items-center">
                            <div className="max-w-xl px-8 text-white">
                                <h1 className="text-4xl font-bold mb-3">{slide.title}</h1>
                                <p className="text-lg">{slide.text}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {/**Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {slides.map((_, i) => (
                        <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full 
                        ${i === current ? "bg-white cursor-pointer" : "bg-white/50 cursor-pointer"}`} />
                    ))}
                </div>
            </div>
            
             <div className="flex justify-center items-center mt-5">
                <span className="p-2 rounded-xl shadow-xl"><h2 className="text-semibold text-4xl bg-cyan-600
                                     bg-clip-text text-transparent">Deals of the Week</h2></span>
            </div>
             <div className="flex flex-col md:flex-row justify-center gap-10 mt-7">
                <div className="shadow-xl/20 rounded-lg"><img src={deal1} className="rounded-lg"/></div>
                <div className="shadow-xl/20 rounded-lg"><img src={deal2} className="rounded-lg" /></div>
            </div>
        </>
    );
}