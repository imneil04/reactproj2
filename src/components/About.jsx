import { memo, React } from "react";
import uprofile from "../images/profile_pic/p1.png";

const team = [
    {
        name: "Bob",
        hobbies: "Coding, Hiking, Eating",
        drink: "Iced Latte",
        img: uprofile
    },
    {
        name: "Jane",
        hobbies: "Volleyball, Gaming, Gym",
        drink: "Hot Tea",
        img: uprofile
    },
    {
        name: "Mike",
        hobbies: "Guitar, Movies, Travel",
        drink: "Iced Coffee",
        img: uprofile
    },
];

function TeamCard ({ member }) {

    return (
        <>
            <div className="w-full max-w-xs overflow-hidden rounded-2xl 
            bg-white shadow-md transition 
            hover:shadow-xl 
            hover:-translate-y-1">
                {/**Image */}
                <div className="h-45 w-full overflow-hidden">
                    <img src={member.img} alt={`${member.name} profile`} className="h-full w-full object-cover" />
                </div>

                {/**Content */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <i class="fa-regular fa-user text-emerald-600"></i>
                        {member.name}
                    </h3>

                    <div className="mt-3 space-y-2 text-gray-600">
                        <p className="flex items-start gap-2">
                            <i class="fa-regular fa-heart"></i>
                            <span>
                                <span className="font-semibold text-gray-700">Hobbies:</span>{" "}
                                {member.hobbies}
                            </span>
                        </p>

                        <p className="flex items-start gap-2">
                            <i class="fa-solid fa-mug-saucer "></i>
                            <span>
                                <span className="font-semibold text-gray-700">Favorite Drink:</span>{" "}
                                {member.drink}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function About () {
    return (
        <>
           <section className="bg-cream px-5 py-16 flex items-center justify-center mt-2">
                <div className="max-w-5xl text-center bg-white p-10 rounded-2xl shadow-lg 
                transition-all duration-200 ease-out
                hover:ring-2 hover:ring-cyan-500 hover:shadow-2xl hover-translate-y-1 cursor-pointer">
                    
                    {/**Header */}
                    <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r 
                                    from-cyan-600 to-white-500
                                    bg-clip-text text-transparent">
                        Our Story
                    </h1>

                    {/**Icon */}
                    <div className="flex justify-center mb-6 text-cyan-600">
                        <i class="fa-solid fa-clock-rotate-left"></i>
                    </div>
                    {/**Paragraph */}
                    <p className="tex-gray-600 leading-relaxed text-lg text-left md:text-justify">
                       Founded with a passion for quality coffe and meaningful moments,
                       where stories are shared, ideas are formed, and every cup of coffee
                       is crafted with utmost care. Whether you're here to work, relax, or connect,
                       we welcome you as part of our journey. 
                    </p>
                </div>
           </section>

            {/**Passion desc */}
           <section className="bg-cream px-5 flex items-center justify-center">
                <div className="max-w-5xl text-center bg-white p-10 rounded-2xl shadow-lg 
                transition-all duration-200 ease-out
                hover:ring-2 hover:ring-cyan-500 hover:shadow-2xl hover-translate-y-1 cursor-pointer">
                    
                    {/**Header */}
                    <h1 className="text-4xl font-bold text-gray-800 mb-6 
                                bg-gradient-to-r 
                                from-cyan-600 to-white-500
                                bg-clip-text text-transparent">
                        Our Passion
                    </h1>

                    {/**Icon */}
                    <div className="flex justify-center mb-6 text-cyan-600">
                        <i class="fa-solid fa-mug-hot"></i>
                    </div>
                    {/**Paragraph */}
                    <p className="tex-gray-600 leading-relaxed text-lg text-left md:text-justify">
                       Our passion is creating cozy and warm space where every cup and sip of coffee is crafted 
                       with care, comfort, and connection in mind. We love bringing the community together through
                       great flavors, and warm smiles.
                    </p>
                </div>
           </section>

           <section className="mt-10 mb-3 px-4">
                <h2 className="text-3xl font-bold text-center 
                bg-gradient-to-r 
                from-cyan-600 to-white-500
                bg-clip-text text-transparent">Meet Our Team</h2>

                <div className="flex flex-col items-center 
                gap-6 mt-6 
                md:flex-row 
                md:justify-center 
                md:gap-12 cursor-pointer">
                    {team.map((member) =>(
                        <TeamCard key={member.name} member={member} />
                    ))}
                </div>
           </section>
        </>
    );
}