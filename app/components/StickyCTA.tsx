"use client";

import { useState, useEffect } from "react";

export default function StickyCTA() {
    const [showStickyCTA, setShowStickyCTA] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 300) {
                setShowStickyCTA(true);
            } else {
                setShowStickyCTA(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`fixed bottom-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 flex justify-center items-center gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] pb-[max(0.8rem,env(safe-area-inset-bottom))] md:hidden transition-transform duration-500 ${showStickyCTA ? 'translate-y-0' : 'translate-y-full'}`}>
            <button
                onClick={() => dispatchEvent(new CustomEvent('openModal'))}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-[8px] no-underline font-bold text-[0.85rem] tracking-[0.5px] uppercase transition-all duration-300 font-sans bg-[#a78a41] text-white shadow-sm hover:bg-[#000000] hover:-translate-y-0.5 active:translate-y-0 border-none cursor-pointer animate-button-sparkle"
            >
                <span className="text-[1rem]">📋</span>
                <span>Download Brochure</span>
            </button>
        </div>
    );
}
