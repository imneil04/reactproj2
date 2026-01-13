import { React } from "react";
import { Link } from "react-router-dom";


export default function Footer () {
    return (
        <>
            <footer className="bg-cyan-400 text-black mt-16">
                <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8" >

                    {/**Brand About */}
                    <div className="text-left">
                        <h2 className="text-2xl font-bold text-white mb-3">
                            Café Bookish
                        </h2>
                        <p className="text-sm text-white/90">
                            Freshly brewed coffee, read and relax.
                        </p>
                    </div>

                    {/**Quick links  */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Quick Links:</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-7 text-sm">
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                                <li><Link to="#" className="hover:text-white transition">Menu Items</Link></li>
                                <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                                <li><Link to="#" className="hover:text-white transition">Reach out to Us</Link></li>
                            </ul>

                            <ul className="space-y-2 text-sm">
                                <li><Link to="/faqs" className="hover:text-white transition">FAQs</Link></li>
                                <li><Link to="#" className="hover:text-white transition">More Questions</Link></li>
                            </ul>

                            <ul className="space-y-2 text-sm">
                                <li><Link to="#" className="hover:text-white transition">Careers</Link></li>
                                <li><Link to="#" className="hover:text-white transition">Future Plans</Link></li>
                                <li><Link to="#" className="hover:text-white transition">Terms and Conditions</Link></li>  
                            </ul>
                        </div>
                    </div>
                    
                      {/** Social Media  */}
                    <div className="text-left">
                        <h3 className="text-lg font-semibold text-white mb-3">
                            Follow Us:
                        </h3>
                        <div className="flex items-center space-x-2">
                            <a href="#" className="w-10 h-10 flex items-center 
                            justify-center 
                            bg-white 
                            text-cyan-500 
                            rounded-full hover:bg-black hover:text-white transition">
                                <i class="fa-brands fa-facebook-f"></i>
                            </a>

                             <a href="#" className="w-10 h-10 flex items-center 
                            justify-center 
                            bg-white 
                            text-cyan-500 
                            rounded-full hover:bg-black hover:text-white transition">
                                <i class="fa-brands fa-instagram"></i>
                            </a>

                             <a href="#" className="w-10 h-10 flex items-center 
                            justify-center 
                            bg-white 
                            text-cyan-500 
                            rounded-full hover:bg-black hover:text-white transition">
                                <i class="fa-brands fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/**Bottom bar */}
                <div className="border-t border-white/30 text-center py-4 text-sm text-white">
                    {new Date().getFullYear()} Cafe bookish. All rights reserved.
                </div>
            </footer>
        </>
    );
}