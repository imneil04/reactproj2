import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Navbar () {

    //declare variable and state mgt
    const [open, setOpen] = useState(false);
    const [memberOpen, setMemberOpen] = useState(false);
    const memRef = useRef(null);

    //close member drop down when clicked
    useEffect(() => {
        const handler = (e) => {
            if (memRef.current && !memRef.current.contains(e.target)) {
                setMemberOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex h-15 items-center justify-between">

                        {/**Logo */}
                        <Link to="/" className="text-xl font-semibold tracking-wide">
                            Café<span className="text-amber-500">.</span>
                        </Link>

                        {/**Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            {["Home","Menu","About","Contact"].map((item) =>(
                                <Link key={item} to={`/${item.toLowerCase()}`}
                                className="text-sm font-medium text-gray-700 transition hover:text-black relative
                                after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
                                after:bg-black after:transition-all hover:after:w-full">{item}</Link>
                            ))}
                        </div>

                        {/**Right section */}
                        <div className="flex items-center gap-4">
                            {/**Member drop down */}
                                <div ref={memRef} className="relative hidden md:block">
                                    <button onClick={() => setMemberOpen(!memberOpen)}
                                            className="flex items-center gap-2 text-sm 
                                                    font-medium text-gray-700 hover:text-black cursor-pointer">
                                        <i class="fa-solid fa-user"></i>
                                        Member        
                                    </button>

                                        {memberOpen && (
                                        <div className="absolute right-0 mt-3 w-40 rounded-lg border bg-white shadow-lg overflow-hidden">
                                            <Link to="/login" onClick={() => setMemberOpen(false)}
                                            className="block px-4 py-2 text-sm transition hover:bg-cyan-400 hover:text-white">
                                                Login
                                            </Link>

                                            <Link to="/signup" onClick={() => setMemberOpen(false)}
                                            className="block px-4 py-2 text-sm transition hover:bg-cyan-400 hover:text-white">
                                                Sign Up
                                            </Link>
                                        </div>
                                        )}
                                </div>
                       
                                {/**Mobile button icon*/}
                                <button className="md:hidden text-gray-800 cursor-pointer" 
                                        aria-label="Toggle Menu" 
                                        onClick={() => setOpen(!open)}>
                                    <i class="fa-brands fa-elementor"></i>
                                </button>
                        </div>
                    </div>

                    {/**Mobile menu */}
                    {open && (
                        <div className="md:hidden py-4 space-y-3">
                            {["Home","Menu","About","Contact"].map((item) => (
                                <Link key={item} 
                                      to={`/${item.toLowerCase()}`} 
                                      onClick={() => setOpen(false)}
                                      className="block text-sm font-medium text-gray-700 hover:text-black">
                                    
                                    {item}
                                </Link>
                            ))}

                            {/**Mobile member actions */}
                            <div className="pt-3 border-t">
                                <Link to="/login" onClick={() => setOpen(false)} 
                                                  className="block text-sm py-2 transition hover:bg-cyan-400 hover:text-white">Login</Link>
                                <Link to="/signup" onClick={() => setOpen(false)} 
                                                  className="block text-sm py-2 transition hover:bg-cyan-400 hover:text-white">Sign Up</Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}