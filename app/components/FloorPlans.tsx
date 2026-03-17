"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import ScrollAnimation from "@/app/components/ScrollAnimation";

export default function FloorPlans() {
    const [filterCategory, setFilterCategory] = useState("All");
    const scrollRef = useRef<HTMLDivElement>(null);

    const floorPlans = [
        {
            type: "2 BHK",
            category: "2 BHK",
            size: "1100 - 1300 Sq Ft",
            price: "₹1.1 Cr* Onwards",
        },
        {
            type: "2 BHK + Study",
            category: "2 BHK",
            size: "1450 - 1570 Sq Ft",
            price: "On Request",
        },
        {
            type: "3 BHK Smart",
            category: "3 BHK",
            size: "1600 - 1700 Sq Ft",
            price: "On Request",
        },
        {
            type: "3 BHK Premium",
            category: "3 BHK",
            size: "1900 - 2100 Sq Ft",
            price: "On Request",
        },
        {
            type: "3 BHK + Study",
            category: "3 BHK",
            size: "2300 - 2400 Sq Ft",
            price: "On Request",
        },
        {
            type: "4 BHK",
            category: "4 BHK",
            size: "3000 - 3600 Sq Ft",
            price: "On Request",
        }
    ];

    const categories = ["All", "2 BHK", "3 BHK", "4 BHK"];
    const filteredPlans = floorPlans.filter(plan => filterCategory === "All" || plan.category === filterCategory);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const containerWidth = current.clientWidth;
            let scrollAmount = containerWidth;

            if (window.innerWidth >= 1024) {
                scrollAmount = containerWidth / 3;
            } else if (window.innerWidth >= 768) {
                scrollAmount = containerWidth / 2;
            }

            current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="py-12 px-4 bg-[#f7f6ef]" id="floor-plan">
            <div className="max-w-[1280px] mx-auto">
                <ScrollAnimation animation="slide-up">
                    <div className="text-center mb-12">
                        <p className="inline-block text-[0.7rem] tracking-[3px] uppercase text-[#ddb468] font-semibold mb-2.5 font-gobold-light">Floor Plans &amp; Pricing</p>
                        <h2 className="text-[2.6rem] leading-[1.2] mb-4 max-md:text-[2rem]">Unlock <span className="tracking-wide text-[#a78a41]">Exclusive </span>Price</h2>
                        <p className="text-[1.05rem] leading-[1.8] text-[#8a8a9a] max-w-[620px] mx-auto">
                            Each residence is a masterpiece of space planning — bathed in
                            natural light, ventilated by cross-breezes, and finished with
                            premium Italian marble.
                        </p>
                    </div>
                </ScrollAnimation>

                <div className="flex justify-center gap-2 mb-10 flex-wrap">
                    {categories.map((cat, i) => (
                        <button
                            key={i}
                            className={`px-7 py-3 rounded-full border-[1.5px] border-[rgba(201,169,110,0.3)]  text-[#a78a41] font-medium text-[0.85rem] cursor-pointer transition-all duration-300 font-[--font-raleway] hover:bg-gradient-to-br hover:from-[#ddb468] hover:to-[#ddb468] hover:text-white hover:border-transparent ${filterCategory === cat ? "bg-[#ddb468] text-white font-semibold !border-transparent animate-button-sparkle" : ""}`}
                            onClick={() => setFilterCategory(cat)}
                        >
                            {cat === "All" ? "All Plans" : cat}
                        </button>
                    ))}
                </div>

                <div className="relative group px-4 md:px-12">
                    {filteredPlans.length > 1 && (
                        <button
                            onClick={() => scroll("left")}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center text-[#a78a41] hover:bg-[#ddb468] hover:text-white transition-all disabled:opacity-50"
                            aria-label="Previous floor plan"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </button>
                    )}

                    <div
                        ref={scrollRef}
                        className={`flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-hide ${filteredPlans.length === 1 ? "justify-center" : ""}`}
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {filteredPlans.map((plan, i) => (
                            <ScrollAnimation
                                key={i}
                                animation="zoom-in"
                                delay={i * 0.1}
                                className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)] snap-start bg-white rounded-[14px] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.06)] border border-[rgba(201,169,110,0.1)] transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
                            >
                                <div className="bg-[#a78a41] p-6 px-6 text-center">
                                    <h3 className="text-white text-[1.3rem] mb-1">{plan.type} Residence</h3>
                                    <p className="text-white/80 text-[1rem] font-medium">{plan.size}</p>
                                </div>
                                <div
                                    className="relative w-full aspect-[4/3] bg-white border-b border-[rgba(201,169,110,0.1)] p-4 overflow-hidden group/image cursor-pointer select-none"
                                    onClick={() => dispatchEvent(new CustomEvent('openModal'))}
                                >
                                    <Image src='/images/3bhkfloorplan.png' alt={plan.type} fill className="object-contain p-4 transition-transform duration-500 group-hover/image:scale-105 blur-md pointer-events-none" />
                                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none bg-white/10">
                                        <span className="bg-[#a78a41] text-white px-6 py-2.5 rounded-full font-semibold shadow-[0_4px_15px_rgba(167,138,65,0.4)] text-[0.9rem] tracking-wide transition-transform duration-300 group-hover/image:scale-105 flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                            View Floor Plan
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4 px-6 pt-2">
                                    <div className="mt-4 text-center p-3 bg-[rgba(201,169,110,0.08)] rounded-[8px]">
                                        <div className="text-[0.65rem] uppercase tracking-[1.5px] text-[#8a8a9a] mb-1">Ranges From</div>
                                        <div className="text-[1.3rem] font-bold text-[#ddb468]">{plan.price}</div>
                                    </div>
                                </div>
                            </ScrollAnimation>
                        ))}
                    </div>

                    {filteredPlans.length > 1 && (
                        <button
                            onClick={() => scroll("right")}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center text-[#a78a41] hover:bg-[#ddb468] hover:text-white transition-all"
                            aria-label="Next floor plan"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </button>
                    )}
                </div>

                <div className="mb-16">
                    <ScrollAnimation animation="zoom-in">
                        <div className="bg-white rounded-[14px] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.06)] border border-[rgba(201,169,110,0.1)] transition-all duration-400">
                            <div className="bg-[#a78a41] p-6 px-6 text-center">
                                <h3 className="text-white text-[1.5rem] mb-1">Master Plan</h3>
                                <p className="text-white/80 text-[1rem] font-medium">Project Layout</p>
                            </div>
                            <div
                                className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-white border-b border-[rgba(201,169,110,0.1)] p-4 overflow-hidden group/image cursor-pointer select-none"
                                onClick={() => dispatchEvent(new CustomEvent('openModal'))}
                            >
                                <Image src="/images/masterplan.jpg" alt="Master Plan" fill className="object-contain p-4 transition-transform duration-500 group-hover/image:scale-105 blur-md pointer-events-none" />
                                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none bg-white/10">
                                    <span className="bg-[#a78a41] text-white px-6 py-2.5 rounded-full font-semibold shadow-[0_4px_15px_rgba(167,138,65,0.4)] text-[0.9rem] tracking-wide transition-transform duration-300 group-hover/image:scale-105 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                        View Master Plan
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 px-6 pt-2">
                                <div className="mt-4 text-center p-3 bg-[rgba(201,169,110,0.08)] rounded-[8px] max-w-sm mx-auto">
                                    <div className="text-[0.65rem] uppercase tracking-[1.5px] text-[#8a8a9a] mb-1">Pricing</div>
                                    <div className="text-[1.3rem] font-bold text-[#ddb468]">On Request</div>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>
                </div>


            </div>
        </section>
    );
}
