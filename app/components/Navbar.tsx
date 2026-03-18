"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <nav className="relative w-full z-[100] bg-white shadow-md py-2">
                <div className="max-w-[1280px] mx-auto px-8 flex items-center justify-between">
                    <a href="/">
                        <Image src='/images/logo.png' width={120} height={120} alt="Logo" className="w-40" />
                    </a>

                    <div className={`absolute top-[100%] left-0 w-full bg-white shadow-xl flex flex-col p-6 border-t border-gray-100 transition-all duration-300 origin-top ${menuOpen ? "scale-y-100 opacity-100 visible" : "scale-y-0 opacity-0 invisible"} md:static md:w-auto md:bg-transparent md:shadow-none md:flex-row md:p-0 md:border-none md:scale-y-100 md:opacity-100 md:visible md:flex md:gap-8`}>
                        <a href="#overview" onClick={() => setMenuOpen(false)} className="md:my-auto py-3 md:py-0 text-[#000000] no-underline text-sm font-medium tracking-[1.5px] uppercase transition-colors hover:text-[#a88a4e] relative group block">Overview<span className="hidden md:block absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-[#a88a4e] transition-[width] duration-300 group-hover:w-full"></span></a>
                        <a href="#amenities" onClick={() => setMenuOpen(false)} className="md:my-auto py-3 md:py-0 text-[#000000] no-underline text-sm font-medium tracking-[1.5px] uppercase transition-colors hover:text-[#a88a4e] relative group block">Amenities<span className="hidden md:block absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-[#a88a4e] transition-[width] duration-300 group-hover:w-full"></span></a>
                        <a href="#floor-plan" onClick={() => setMenuOpen(false)} className="md:my-auto py-3 md:py-0 text-[#000000] no-underline text-sm font-medium tracking-[1.5px] uppercase transition-colors hover:text-[#a88a4e] relative group block">Floor Plans<span className="hidden md:block absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-[#a88a4e] transition-[width] duration-300 group-hover:w-full"></span></a>
                        <a href="#gallery" onClick={() => setMenuOpen(false)} className="md:my-auto py-3 md:py-0 text-[#000000] no-underline text-sm font-medium tracking-[1.5px] uppercase transition-colors hover:text-[#a88a4e] relative group block">Gallery<span className="hidden md:block absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-[#a88a4e] transition-[width] duration-300 group-hover:w-full"></span></a>
                        <a href="#location" onClick={() => setMenuOpen(false)} className="md:my-auto py-3 md:py-0 text-[#000000] no-underline text-sm font-medium tracking-[1.5px] uppercase transition-colors hover:text-[#a88a4e] relative group block">Location<span className="hidden md:block absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-[#a88a4e] transition-[width] duration-300 group-hover:w-full"></span></a>
                        <div className="pt-4 md:pt-0">
                            <button onClick={() => { setMenuOpen(false); dispatchEvent(new CustomEvent('openModal')); }} className="w-full md:w-auto bg-[#a78a41] text-white !important px-6 py-2.5 rounded-[4px] font-semibold tracking-[1px] transition-transform duration-300 shadow-sm hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(167, 138, 65,0.4)] cursor-pointer border-none animate-button-sparkle">Enquire Now</button>
                        </div>
                    </div>

                    <button className="hidden max-md:flex flex-col gap-[5px] cursor-pointer z-[1000] bg-none border-none" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                        <span className={`w-6 h-0.5 transition-all duration-300 ${menuOpen ? "bg-[#a78a41] rotate-45 translate-y-[7px]" : "bg-[#a78a41]"}`}></span>
                        <span className={`w-6 h-0.5 transition-all duration-300 ${menuOpen ? "opacity-0" : "bg-[#a78a41]"}`}></span>
                        <span className={`w-6 h-0.5 transition-all duration-300 ${menuOpen ? "bg-[#a78a41] -rotate-45 -translate-y-[7px]" : "bg-[#a78a41]"}`}></span>
                    </button>
                </div>
            </nav>
        </>
    );
}
