"use client";

import { useState } from "react";
import ScrollAnimation from "@/app/components/ScrollAnimation";

const faqData = [
    {
        question: "Where is Prestige Kollur located?",
        answer: "Prestige Kollur is located in Kollur near ORR Exit 2 in West Hyderabad.",
    },
    {
        question: "What types of apartments are available?",
        answer: "The project offers 2 BHK, 3 BHK, and 4 BHK luxury apartments.",
    },
    {
        question: "How large is the project?",
        answer: "The project is spread across approximately 28 acres with 10–12 high-rise towers and more than 4200 units.",
    },
    {
        question: "What are the connectivity advantages?",
        answer: "The project is well connected to Financial District, Hitech City, Kokapet, and the Outer Ring Road.",
    },
    {
        question: "Who is the developer of Prestige Kollur?",
        answer: "The project is developed by Prestige Group, one of India’s leading real estate developers.",
    },
];

export default function FAQs() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-12 px-4 bg-[#f7f6ef]" id="faqs">
            <div className="max-w-[1000px] mx-auto">
                <ScrollAnimation animation="slide-up">
                    <div className="text-center mb-12">
                        <p className="inline-block text-[0.7rem] tracking-[3px] uppercase text-[#ddb468] font-semibold mb-2.5 font-gobold-light">Frequently Asked Questions</p>
                        <h2 className="text-[2.6rem] leading-[1.2] mb-4 max-md:text-[2rem]">Got Questions? <span className="text-[#a78a41] tracking-wide">We&apos;ve Got Answers</span></h2>
                    </div>
                </ScrollAnimation>

                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <ScrollAnimation key={index} animation="zoom-in" delay={index * 0.1}>
                            <div
                                className="bg-white rounded-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[rgba(201,169,110,0.15)] overflow-hidden transition-all duration-300"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full text-left px-6 py-4 flex justify-between items-center bg-white cursor-pointer border-none outline-none"
                                >
                                    <h3 className={`text-[1.1rem] font-semibold transition-colors duration-300 ${openIndex === index ? 'text-[#a78a41]' : 'text-gray-800'}`}>
                                        {faq.question}
                                    </h3>
                                    <span className={`text-[1.5rem] font-medium transition-transform duration-300 ${openIndex === index ? 'rotate-45 text-[#a78a41]' : 'text-gray-400'}`}>
                                        +
                                    </span>
                                </button>
                                <div
                                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] pb-4 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <p className="text-[1rem] leading-[1.6] text-[#8a8a9a]">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </ScrollAnimation>
                    ))}
                </div>
            </div>
        </section>
    );
}
