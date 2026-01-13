import { Link } from "react-router-dom";

export default function Navbar () {
    return (
        <>
            <nav className="flex p-1 justify-around items-center mt-7">
                <Link to="/" className="font-semibold text-lg">Home</Link>
                <Link to="/menu" className="font-semibold text-lg">Menu</Link>
                <Link to="/about" className="font-semibold text-lg">About Us</Link>
                <Link to="/contact" className="font-semibold text-lg">Contact Us</Link>
                <div className="ml-7 flex flex-col md:flex-row">
                   <button className="bg-white-500 shadow-md transition hover:bg-cyan-500 shadow-cyan-500/50 px-4 py-2">
                        <Link to="/login" className="font-semibold">Login</Link>
                   </button>
                    <button className="bg-white-500 shadow-md transition hover:bg-cyan-500 shadow-cyan-500/50 px-4 py-2 ml-5">
                        <Link to="/signup" className="font-semibold p-3">Sign Up</Link>
                    </button>
                </div>
            </nav>
        </>
    );
}