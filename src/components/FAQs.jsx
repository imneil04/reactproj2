import { useState } from "react";

const faqs = [
  {
    question: "Do you take reservations?",
    answer:
      "Yes! You can make a reservations via contacting us directly or by filling out the contact form."
  },
  {
    question: "Do you offer dairy-free or vegan options?",
    answer:
      "While we do offer dairy-free alternatives, as for vegan options currently we don't. "
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Apologies but We accept cash only for now."
  },
  {
    question: "Can I place an order online?",
    answer:
      "Online ordering is currently available for pickup only. Delivery is coming soon!"
  },
  {
    question: "What are your opening hours?",
    answer:
      "We are open Monday to Friday from 7:00 AM to 7:00 PM and Weekends 9:00 AM to 6:30 PM."
  },
  {
    question: "Do you offer any membership rewards program?",
    answer:
      "Currently it's on initial stage of being implemented. So keep an eye out!"
  }
];

export default function FAQ () {
     
    const [openIndex, setOpenIndex ] = useState(null);

    const toggleFAQ = (index) => {

        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
           
           <section className="min-h-screen bg-gray-50 py-16 px-4">
                <div className="max-w-3xl mx-auto">

                    {/**Header */}
                    <h1 className="text-4xl font-bold text-center mb-4">
                        Frequently Asked Questions <i class="fa-solid fa-circle-question"></i>
                    </h1>
                    <p className="text-center text-gray-600 mb-12">
                        Find answers to common questions about our cafe.
                    </p>

                    {/**FAQ list */}
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md transition hover:shadow-lg">
                                <button onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center p-6 text-left">

                                    <span className="text-lg font-medium">
                                        {faq.question}
                                    </span>
                                    <span className={`transform transition-transform duration-300 
                                    ${openIndex === index ? "rotate-180" : ""}`}>
                                        
                                    </span>
                                </button>

                                <div className={`overflow-hidden transition-all duration-300 
                                ${openIndex === index ? "max-h-40 p-6 pt-0" : "max-h-0 px-6"}`}>
                                    <p className="text-gray-600">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
           </section>
        </>
    );
}