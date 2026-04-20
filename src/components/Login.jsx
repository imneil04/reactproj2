import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../js/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useCart } from "../context/CartContext";

export default function Login () {
    
    //declare variables
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");

   
    //for custom logout description
    const location = useLocation();
    const message = location.state?.message;

    //remember me feature
    const [rememberMe, setRememberMe] = useState(true);

    //pw reset feature (custom UI)
    const [showModal, setShowModal] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    //const [resetMessage, setResetMessage] = useState();
    const [resetMessage, setResetMessage] = useState("");

    //for redirect
    const navigate = useNavigate();

    //item cart
    const { cart } = useCart();

    //sync cart to logged-in user function
    const syncCartToUser = async (user, cart) => {
            await setDoc(doc(db, "users", user.uid), {
            cart
        }, { merge: true }); 
        
    }; 

    //console.log("cart before login: ", cart);

    //login and redirect to user dashboard
    const handleLogin = async (username, password) => {
        try {
            const userCred = await signInWithEmailAndPassword(auth, username, password);
            //await signInWithEmailAndPassword(auth, username, password);

            const user = userCred.user;

            alert("Logged In!");

            //console.log("login successful")
            const effectiveCart = cart.length > 0 ? cart : JSON.parse(localStorage.getItem("cafe_cart") || []);

            await syncCartToUser(user, effectiveCart);
            navigate("/logindashboard"); //redirect here

        }
        catch (err) {
            //alert("Invalid login!");
            setTimeout(() => {
                navigate("/login", { 
                replace: true, 
                state: { message: "❌ Invalid login, please try again." } 
            }); //redirect after logout and post status msg
        }, 100);
            
        }
    };

    /*const loadUserCart = async (user) => {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
            dispatch({ type: "SET", payload: docSnap.data().cart || [] });
        }
    }; */


    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log("Logging in: ", username);
        handleLogin(email, password);
    };

    return (
        <>
            <div className="min-h-screen flex justify-center items-center bg-cover bg-center">
                
                {/**Glass card */}
                <form onSubmit={handleSubmit} 
                      className="backdrop-blur-lg bg-white/30 shadow-xl border border-white/30 
                      p-8 rounded-2xl w-full max-w-sm space-y-6 
                      hover:outline-2 outline-cyan-500 
                      hover:shadow-2xl hover:-translate-y-1
                      transition-all duration-200 ease-out">
                        
                        <h2 className="text-3xl font-bold text-center drop-shadow text-cyan-500 animate-bounce">Login Here</h2>

                        {/**Username */}
                        <div className="relative">
                            <i class="fa-regular fa-user absolute left-3 top-1/2 -translate-y-1/2 text-black-500"></i>
                            
                            <input type="email" placeholder="Username" 
                            className="w-full pl-10 pr-3 py-2 bg-white/20 border 
                            border-gray rounded-lg placeholder-gray-200 text-gray-500 
                            focus:outline-1 focus:ring-2 focus:ring-cyan-200" 
                            value={email} onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        {/**Password */}
                        <div className="relative">
                            <i class="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-black-500"></i>
                            
                            <input type="password" placeholder="Password" 
                            className="w-full pl-10 pr-3 py-2 bg-white/20 border 
                            border-gray rounded-lg placeholder-gray-200 text-gray-500  
                            focus:outline-1 focus:ring-2 focus:ring-cyan-200" 
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        {/**remember me */}
                        <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                        <label className="px-2">Remember Me</label>

                        {/**Pw reset (modal UI)*/}
                        <button type="button" onClick={() => setShowModal(true)} 
                                className="text-sm text-blue-500 
                                hover:underline 
                                cursor-pointer flex flex-wrap">
                            Forgot Password?
                        </button>
                        {showModal && (
                            <div className="fixed inset-0 items-center justify-center rounded-2xl bg-black/50 backdrop-blur z-50">

                                {/**modal card */}
                                <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl relative">
                                    {/**close button */}

                                    <button onClick={() => setShowModal(false)} 
                                            className="absolute 
                                            top-3 right-3 text-gray-500 
                                            hover:text-black">❌
                                    </button>

                                    <h2 className="text-xl font-semibold mb-4 text-center">
                                        Reset Password
                                    </h2>

                                     <input type="email" 
                                            placeholder="Enter your email" 
                                            value={resetEmail} 
                                            onChange={(e) => setResetEmail(e.target.value)}
                                            className="w-full p-2 mb-3 rounded-lg border" 
                                    />

                                    <button type="button" onClick={async () => {
                                            try {
                                                await sendPasswordResetEmail(auth, resetEmail);
                                                setResetMessage("📧 Reset link sent! Please check your email.");
                                            }
                                            catch (err) {
                                                setResetMessage("❌ Invalid email, please try again.");
                                            }
                                        }}
                                        className="w-full bg-cyan-500 text-white py-2 
                                                   rounded-lg hover:bg-emerald-500 transition-all cursor-pointer" >
                                        Send Reset Link
                                    </button>

                                    {resetMessage && (
                                        <p className="text-sm text-green-500 mt-2">{resetMessage}</p>
                                    )}
                                </div>
                            </div>
                        )}
                        {/**Pw reset (modal UI) - closing tag*/}

                        
                        {/**custom logout msg */}
                        {message && (
                            <p className="text-green-500 text-center mb-4">{message}</p>
                        )}

                        <button type="submit" 
                                className="w-full py-2 rounded-lg bg-blue-400/60 hover:bg-blue-500/80 text-white
                                font-semibold transition shadow-lg cursor-pointer hover:bg-emerald-500">
                            Login Now
                        </button>
                </form>        
            </div>
        </>
    );
}