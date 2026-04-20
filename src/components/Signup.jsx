import { useState } from "react";
import { auth } from "../js/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../js/firebase";
import { useCart } from "../context/CartContext";

export default function SignUp () {
    
    //manage state of how data is set
    const [ formData, setFormData ] = useState({

        name: "",
        phone: "",
        email: "",
        password: "",
        address: "",
        notes: "",
    });

    //error handlers
    const [ errors, setErrors ] = useState ({});

    //for custom signup description
    const [successMessage, setSuccessMessage] = useState("");


    //regex validate field inputs
    const validate = () => {
        const newErrors = {};

        //name field check
        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
        }
        else if (!/^[A-Za-z]{2,}$/.test(formData.name)) {
            newErrors.name = "Name must contain only letters or spaces.";
        }

        //email field check
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email address format.";
        }

        //phone field check
        if (formData.phone && !/^\+?[0-9\s\-()]{10,15}$/.test(formData.phone)) {
            newErrors.phone = "Invalid phone number.";
        }

        //password
        if (!formData.password.trim()) {
            newErrors.password = "Password is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //handle how data is controlled in name attr
    const handleChange = (e) => {
        setFormData ({ ...formData, [ e.target.name ]: e.target.value});
    };

    //firebase email, pw 
    //const [ email, setEmail ] = useState("");
    //const [ password, setPassword ] = useState("");

    //for redirect
    const navigate = useNavigate();

    //item cart
    /*const { cart } = useCart();

    //sync cart to logged-in user
    const syncCartToUser = async (user, cart) => {
            await setDoc(doc(db, "users", user.uid), {
            cart
        }, { merge: true }); 
    };  */

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate())
            return;

        //console.log("Form submitted:", formData);
            try {
                //1. create user in firebase
                //2. Automatically logs them in
                const userCredential = await createUserWithEmailAndPassword(
                    auth, 
                    formData.email, 
                    formData.password
                );

                const user = userCredential.user;

                //carry over cart
                //await syncCartToUser(user, cart);

                //2. save extra user data in Firestore
                await setDoc(doc(db, "users", user.uid), {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    notes: formData.notes,
                    createdAt: new Date()
                });

                //alert("Sign up successful!"); //display status if success login
                //navigate("/logindashboard"); //prevent back button
                setSuccessMessage("🎉 Account created successfully! Redirecting...");

                //delay redirect
                setTimeout(() => {
                   navigate("/logindashboard", { replace: true }); //prevent back button
                }, 3500); //3.5 seconds delay to show custom msg

                //clear all fields
                setFormData({
                name: "",
                email: "",
                password: "",
                phone: "",
                address: "",
                notes: "",
            });
            setErrors({});

        }
        catch (err) {
            alert(err.message + " Something went wrong. Please check back later.");
        }

        /*setFormData({
            name: "",
            email: "",
            password: "",
            phone: "",
            address: "",
            notes: "",
        });
        setErrors({}); */
    };

    return (
        <>
            <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-30 
                      hover:outline-2 outline-cyan-500 
                      hover:shadow-2xl hover:-translate-y-1
                      transition-all duration-200 ease-out">

                <h2 className="text-2xl font-semibold mb-6 text-cyan-500">
                    Not a Member? 
                    Sign up now <i className="fa-solid fa-user-plus px-1"></i>
                </h2>

                {/**custom success sign-up msg */}
                {successMessage && (
                    <p className="text-green-500 text-center mb-4 animate-pulse">{successMessage}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/**Name field */}
                    <div>
                        <label className="block text-sm font-medium text-red-500">
                            Name *
                        </label>

                        <input type="text" 
                               name="name"
                               value={formData.name}
                               onChange={handleChange}
                               className="w-full mt-1 p-1 border rounded-lg"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500 mt-2">{errors.name}</p>
                        )}
                    </div>

                    {/**Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Phone #
                        </label>

                        <input type="tel" 
                               name="phone"
                               value={formData.phone}
                               onChange={handleChange}
                               placeholder="(xxx) xxx-xxxx"
                               className="w-full mt-1 p-1 border rounded-lg"
                        />
                        {errors.phone && (
                            <p className="text-sm text-red-500 mt-2">{errors.phone}</p>
                        )}
                    </div>

                    {/**Email */}
                    <div>
                        <label className="block text-sm font-medium text-red-500">
                            Email *
                        </label>

                        <input type="email" 
                               name="email"
                               value={formData.email}
                               onChange={handleChange}
                               className="w-full mt-1 p-1 border rounded-lg"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-2">{errors.email}</p>
                        )}
                    </div>

                    {/**Password */}
                    <div>
                        <label className="block text-sm font-medium text-red-500">
                            Password *
                        </label>

                        <input type="password" 
                               name="password"
                               value={formData.password}
                               onChange={handleChange}
                               className="w-full mt-1 p-1 border rounded-lg"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-2">{errors.password}</p>
                        )}
                    </div>


                    {/**Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Address
                        </label>

                        <input type="text" 
                               name="address"
                               value={formData.address}
                               onChange={handleChange}
                               className="w-full mt-1 p-1 border rounded-lg"
                        />
                        {errors.address && (
                            <p className="text-sm text-red-500 mt-1">{errors.address}</p>
                        )}
                    </div>

                    {/**Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Additional Notes
                        </label>

                        <textarea name="notes" 
                               rows="4"
                               placeholder="Any additional information you'd like to share..."
                               value={formData.notes}
                               onChange={handleChange}
                               className="w-full mt-1 border rounded-lg"
                        />
                    </div>

                    <button type="submit" className="w-full 
                    bg-black text-white 
                    py-2 rounded-lg 
                    hover:bg-emerald-500 
                    transition cursor-pointer">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}