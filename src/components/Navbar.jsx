import { Link } from "react-router-dom";

export default function Navbar () {
    return (
        <>

            <nav className="flex gap-4 border-b p-4 justify-center items-center mt-7">
                <Link to="/" className="font-semibold">Home</Link>
                <Link to="/menu" className="font-semibold">Menu</Link>
                <Link to="/about" className="font-semibold">About Us</Link>
                <Link to="/contact" className="font-semibold">Contact Us</Link>
                <div className="ml-7">
                    <Link to="/login" className="font-semibold">Login</Link>
                    <Link to="/signup" className="font-semibold p-3">Register</Link>
                </div>
            </nav>
        </>
    );
}