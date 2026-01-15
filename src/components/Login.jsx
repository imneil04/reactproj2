import { React, use, useState } from "react";

export default function Login () {
    
    //declare variables
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in: ", username);
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
                        
                        <h2 className="text-3xl font-bold text-center drop-shadow text-cyan-500">Login Here</h2>

                        {/**Username */}
                        <div className="relative">
                            <i class="fa-regular fa-user absolute left-3 top-1/2 -translate-y-1/2 text-black-500"></i>
                            
                            <input type="text" placeholder="Username" 
                            className="w-full pl-10 pr-3 py-2 bg-white/20 border 
                            border-gray rounded-lg placeholder-gray-200 text-gray-500 
                            focus:outline-1 focus:ring-2 focus:ring-cyan-200" 
                            value={username} onChange={(e) => setUsername(e.target.value)} required/>
                        </div>

                        {/**Username */}
                        <div className="relative">
                            <i class="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-black-500"></i>
                            
                            <input type="password" placeholder="Password" 
                            className="w-full pl-10 pr-3 py-2 bg-white/20 border 
                            border-gray rounded-lg placeholder-gray-200 text-gray-500  
                            focus:outline-1 focus:ring-2 focus:ring-cyan-200" 
                            value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </div>

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