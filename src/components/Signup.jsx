import { React, useState } from "react";

export default function SignUp () {
    
    const [ formData, setFormData ] = useState({

        name: "",
        phone: "",
        email: "",
        address: "",
        notes: "",
    });

    const [ errors, setErrors ] = useState ({});

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData ({ ...formData, [ e.target.name ]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate())
            return;

        console.log("Form submitted:", formData);
        alert("Sign up successful!");

        setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
            notes: "",
        });
        setErrors({});
    };

    
    return (
        <>
            <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-30 
                      hover:outline-2 outline-cyan-500 
                      hover:shadow-2xl hover:-translate-y-1
                      transition-all duration-200 ease-out">

                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    Not a Member? Sign up now
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/**Name field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name *
                        </label>

                        <input type="text" 
                               name="name"
                               value={formData.name}
                               onChange={handleChange}
                               className="w-full mt-1 p-1 border rounded-lg"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500 mt-1">{errors.name}</p>
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
                            <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                        )}
                    </div>

                    {/**Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email *
                        </label>

                        <input type="email" 
                               name="email"
                               value={formData.email}
                               onChange={handleChange}
                               className="w-full mt-1 p-1 border rounded-lg"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
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