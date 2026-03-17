"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ScrollAnimation from "@/app/components/ScrollAnimation";
import { Tinos } from "next/font/google";

const tinos = Tinos({
    weight: ["400", "700"],
    subsets: ["latin"],
    variable: "--font-tinos",
    style: "italic",
});

const HERO_IMAGES = [
    "/images/gallery2.webp",
    "/images/gallery6.webp",
    "/images/gallery1.webp",
] as const;

export default function HeroSection() {
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const [carouselReady, setCarouselReady] = useState(false);
    const [timeLeft, setTimeLeft] = useState<{ hours: number, minutes: number, seconds: number } | null>(null);

    useEffect(() => {
        let endTimeStr = localStorage.getItem('launchOfferEndTime');
        let endTime: number;

        if (endTimeStr) {
            endTime = parseInt(endTimeStr, 10);
            if (endTime < Date.now()) {
                endTime = Date.now() + 24 * 60 * 60 * 1000;
                localStorage.setItem('launchOfferEndTime', endTime.toString());
            }
        } else {
            endTime = Date.now() + 24 * 60 * 60 * 1000;
            localStorage.setItem('launchOfferEndTime', endTime.toString());
        }

        const timer = setInterval(() => {
            const now = Date.now();
            const distance = endTime - now;

            if (distance <= 0) {
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        setCarouselReady(true);
    }, []);

    useEffect(() => {
        if (!carouselReady) return;
        const heroTimer = setInterval(() => {
            setCurrentHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 4000);
        return () => clearInterval(heroTimer);
    }, [carouselReady]);

    return (
        <section className="relative h-[650px] flex items-center justify-center" id="hero">
            <div className="absolute inset-0 z-0">
                {/* First image: priority, optimized, proper sizes for LCP */}
                <Image
                    key={0}
                    src='/images/gallery2.webp'
                    alt="Prestige Kollur View 1"
                    width={1360}
                    height={900}
                    priority
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                    className={`absolute inset-0 w-full md:h-full h-80 transition-opacity duration-1000 ${currentHeroIndex === 0 ? "opacity-100" : "opacity-0"}`}
                />
                {/* 2nd and 3rd images: lazy-loaded after first paint to improve LCP */}
                {carouselReady &&
                    HERO_IMAGES.slice(1).map((img, i) => {
                        const index = i + 1;
                        return (
                            <Image
                                key={index}
                                src={img}
                                alt={`Prestige Kollur View ${index + 1}`}
                                width={1360}
                                height={900}
                                sizes="100vw"
                                style={{ objectFit: "cover" }}
                                className={`absolute inset-0 w-full md:h-full h-80 transition-opacity duration-1000 ${currentHeroIndex === index ? "opacity-100" : "opacity-0"}`}
                            />
                        );
                    })}
                {/* Marquee */}
                <div className="absolute top-0 w-full overflow-hidden bg-[#a78a41] backdrop-blur-md text-white py-2 md:py-2.5 z-10 flex border-t border-b border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] pointer-events-none">
                    <div className="whitespace-nowrap animate-marquee flex items-center w-max">
                        {[...Array(1)].map((_, i) => (
                            <div key={i} className="flex items-center shrink-0">
                                {[...Array(10)].map((_, j) => (
                                    <span key={j} className="flex items-center text-sm md:text-sm font-semibold tracking-widest uppercase text-white/95">
                                        Luxury 2, 3 & 4 BHK Apartments
                                        <span className="mx-4 md:mx-8 text-[#a88a4e] opacity-80 text-[0.6rem] md:text-xs">|</span>
                                        Starting from ₹1.1 Cr* Onwards
                                        <span className="mx-4 md:mx-8 text-[#a88a4e] opacity-80 text-[0.6rem] md:text-xs">|</span>
                                        Mega Township Development
                                        <span className="mx-4 md:mx-8 text-[#a88a4e] opacity-80 text-[0.6rem] md:text-xs">|</span>
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Carousel Navigation */}
            <button
                onClick={() => setCurrentHeroIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)}
                className="absolute left-4 md:top-1/2 top-1/4 md:-translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#a78a41] w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 backdrop-blur-sm cursor-pointer border-none"
                aria-label="Previous image"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button
                onClick={() => setCurrentHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length)}
                className="absolute right-4 md:top-1/2 top-1/4 md:-translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#a78a41] w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 backdrop-blur-sm cursor-pointer border-none"
                aria-label="Next image"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>

            {/* Floating Card */}
            <div className="absolute md:bottom-[-160px] bottom-[-70px] left-1/2 -translate-x-1/2 md:left-1/3 md:-translate-x-3/5 z-20 md:w-xl w-sm max-w-[800px] rounded-[12px] shadow border-t-4 border-[#a78a41] bg-cover bg-top overflow-hidden animate-slide-up"
                style={{
                    backgroundImage: `url('/images/buildingbg.webp')`,
                    animationDelay: '0.2s',
                    animationDuration: '0.8s',
                    animationFillMode: 'both' // Ensures it stays visible after animation
                }}
            >
                <div className="text-left p-4 py-4 bg-white/95 backdrop-grayscale-10">
                    <h1 className={`md:text-[2rem] text-[2rem] font-semibold mb-1 animate-sparkle inline-block uppercase font-gobol-light`}>Prestige Kollur</h1>
                    <p className="text-gray-800 font-semibold text-lg">Location: <span className="text-[#ddb468]">Kollur – Tellapur</span></p>
                    <p className="text-gray-800 font-medium mb-2">West Hyderabad</p>

                    <div className="p-4 rounded-[8px] border border-dashed border-gray-300 grid grid-cols-[1fr_auto] gap-0 items-center text-left mb-2 max-md:grid-cols-1 max-md:gap-3 max-md:text-center">
                        <div className="flex justify-between items-center">
                            <p className="font-medium text-gray-800 text-sm">Configurations</p>
                            <p className={`text-[#a78a41] italic text-base font-semibold`}>2, 3 & 4 BHK</p>
                        </div>
                        <div className="max-md:border-t max-md:border-gray-200">
                        </div>
                        <div className=" flex justify-between items-center">
                            <p className="font-medium text-gray-800 text-sm">Carpet Area</p>
                            <p className={`text-[#a78a41] italic text-base font-semibold`}>1100 – 3600 Sq. Ft.</p>
                        </div>
                        <div className="max-md:border-t max-md:border-gray-200">
                        </div>
                        <div className=" flex justify-between items-center">
                            <p className="font-medium text-gray-800 text-sm">Price Starting From</p>
                            <p className={`text-[#a78a41] italic text-base font-semibold`}>₹ 1.1 Cr*</p>
                        </div>
                    </div>

                    {/* <button
                        onClick={() => dispatchEvent(new CustomEvent('openModal'))}
                        className="w-full bg-[#a78a41] text-white text-sm font-semibold py-3 rounded-[6px] tracking-widest uppercase hover:bg-[#000000] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border-none animate-button-sparkle"
                    >
                        Download Brochure
                    </button> */}

                    {/* Promotional Timer */}
                    <div className="mt-2 bg-white rounded-xl p-2 text-center animate-pulse-glow shadow-md relative overflow-hidden">
                        <div className="absolute inset-0 animate-pulse"></div>
                        <p className="text-[#a78a41] text-[0.8rem] font-black uppercase tracking-wider mb-2 relative z-10 flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span> Launch Offer Ends In
                        </p>
                        <div className="flex justify-center gap-3 text-[#a78a41] relative z-10">
                            <div className="flex flex-col items-center">
                                <span className="text-lg font-black bg-[#a78a41] text-white w-10 h-10 flex items-center justify-center rounded-[8px] shadow-md border-b-4 border-[#000000]">{timeLeft ? timeLeft.hours.toString().padStart(2, '0') : '23'}</span>
                                <span className="text-[0.65rem] uppercase tracking-wider mt-0 font-bold text-gray-600">Hours</span>
                            </div>
                            <span className="text-lg font-black mt-0 opacity-80 animate-pulse">:</span>
                            <div className="flex flex-col items-center">
                                <span className="text-lg font-black bg-[#a78a41] text-white w-10 h-10 flex items-center justify-center rounded-[8px] shadow-md border-b-4 border-[#000000]">{timeLeft ? timeLeft.minutes.toString().padStart(2, '0') : '59'}</span>
                                <span className="text-[0.65rem] uppercase tracking-wider mt-0 font-bold text-gray-600">Mins</span>
                            </div>
                            <span className="text-lg font-black mt-0 opacity-80 animate-pulse">:</span>
                            <div className="flex flex-col items-center">
                                <span className="text-lg font-black bg-[#a78a41] text-white w-10 h-10 flex items-center justify-center rounded-[8px] shadow-md border-b-4 border-[#000000]">{timeLeft ? timeLeft.seconds.toString().padStart(2, '0') : '59'}</span>
                                <span className="text-[0.65rem] uppercase tracking-wider mt-0 font-bold text-gray-600">Secs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
