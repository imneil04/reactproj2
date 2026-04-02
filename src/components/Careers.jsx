import React from "react";

//list of openings (array object)
const jobs = [
    {
        id: 1,
        title: "Barista",
        type: "Part-Time",
        location: "Calgary, AB",
        description: "Primary focus on preparing drinks, assist customers, and maintain a clean workspace.",
    },
    {
        id: 2,
        title: "Cafe Supervisor",
        type: "Full-Time",
        location: "Calgary, AB",
        description: "Oversee floor operations, lead staff, and ensure great customer experience.",
    },
    {
        id: 3,
        title: "Cafe Manager",
        type: "Full-Time",
        location: "Calgary, AB",
        description: "Oversee daily operations, internal operations, and activities, manage all staff.",
    },
    {
        id: 4,
        title: "Barista (Overnight)",
        type: "Full-Time",
        location: "Calgary, AB",
        description: "Oversee late night drive-thru orders, assist customers, count inventory, and maintain a clean workspace.",
    },
];

//function for jobs page
export default function Careers () {
    return (
        <div className="min-h-screen px-4 py-16 mt-15">
            {/**Header */}
            <div className="max-w-5xl mx-auto text-center mb-10">
                <h1 className="text-4xl md:text-4xl font-bold">
                    Join Our Team!
                </h1>
                <p className="text-gray-500 mt-3">
                    We're always looking for passionate people to be a part of our growing cafe.
                </p>
            </div>

            {/**Job List */}
            <div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
                {jobs.map((job) => (
                    <div key={job.id} 
                        className="bg-white 
                        rounded-2xl shadow-sm 
                        hover:shadow-lg
                        hover:outline-2 outline-cyan-500 
                        hover:shadow-2xl hover:-translate-y-1 
                        transition-all duration-200 ease-out 
                        p-6
                        flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                {job.title}
                            </h2>

                            <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-500">
                                <span className="bg-gray-300 px-3 py-1 rounded-full">
                                    {job.type}
                                </span>
                                <span className="bg-gray-100 px-3 py-1 rounded-full">
                                    {job.location}
                                </span>
                            </div>

                            <p className="text-gray-700 mt-4">{job.description}</p>
                        </div>
                    
                        <button className="mt-6 md:w-sm
                        bg-black 
                        text-white 
                        py-2 
                        rounded-lg 
                        transition-all
                        delay-100
                        duration-250
                        ease-in-out 
                        cursor-pointer
                        hover:bg-emerald-500
                        hover:-translate-y-1
                        hover:scale-110">
                            Apply Now
                        </button>
                    </div>
                ))}
            </div>

            {/**Empty State (optional) */}
            {jobs.length === 0 && (
                <div className="text-center mt-10 text-gray-500">
                    No job openings available at this time.
                </div>
            )}
        </div>
    );
};