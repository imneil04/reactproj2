import { React, useState } from "react";
import feedback from "../images/contact_desc/feedback_desc.png";


export default function Contact () {
    const [ formData, setFormData ] = useState({
        name : "",
        email: "",
        date: "",
        phone: "",
        message: "",
    });

    //custom error msg
    const [ errors, setErrors ] = useState ({});

    //custom error msg
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
            newErrors.phone = "Invalid phone number, cannot contain characters or letters.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData ({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate())
            return;

        const confirmSubmit = window.confirm 
        ("Are you sure you want to submit this message?");
    
        if (!confirmSubmit)
            return;

        //handle submission (API, email service, etc.)
        console.log("Submitted data: ", formData);

        alert("Message sent successfully!");

        setFormData({
            name: "",
            email: "",
            date: "",
            phone: "",
            message: "",
        });
        setErrors({}); // for custom msg added line
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
                <div className="bg-white shadow-xl rounded-xl overflow-hidden grid md:grid-cols-2 w-full max-w-5xl 
                hover:outline-2 outline-cyan-500 
                hover:shadow-2xl hover:-translate-y-1
                transition-all duration-200 ease-out cursor-pointer">

                    {/**FORMS SECTION */}
                    <div className="p-8">
                        <div className="flex">
                            <h2 className="text-2xl font-bold mb-2">Contact Us <i className="fa-solid fa-phone-volume"></i></h2>
                        </div>
                        <p className="text-gray-500 mb-6">
                            Have questions or request? Please fill out the form below.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/**name field */}
                            <div>
                                <input type="text" name="name" placeholder="Full Name..." value={formData.name} onChange={handleChange}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                {errors.name && (
                                <p className="text-sm text-red-500 mt-2">{errors.name}</p>
                                )}
                            </div>
                            
                            {/**email field */}
                            <div>
                                <input type="email" name="email" placeholder="Email Address..." value={formData.email} onChange={handleChange}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                {errors.email && (
                                <p className="text-sm text-red-500 mt-2">{errors.email}</p>
                                )}
                            </div>
                            
                            {/**date field */}
                            <input type="date" name="date" value={formData.date} onChange={handleChange}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" />

                            {/**phone field */}
                            <div>
                                <input type="tel" name="phone" placeholder="Phone Number..." value={formData.phone} onChange={handleChange}
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                {errors.phone && (
                                <p className="text-sm text-red-500 mt-2">{errors.phone}</p>
                                )}
                            </div>

                            <textarea name="message" 
                            placeholder="Enter Comments or Message Here..."
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" />

                            <button type="submit" 
                            className="w-full bg-gray-500 hover:bg-emerald-500 
                            text-white font-semibold py-3 rounded-md transition cursor-pointer">Submit Form</button>
                        
                        </form>
                    </div>

                    {/**IMAGE SECTION */}
                    <div className="hidden md:block">
                        <img src={feedback} alt="Contact" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </>
    );
}