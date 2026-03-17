"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ScrollAnimation from "@/app/components/ScrollAnimation";

export default function Gallery() {
    const galleryRef = useRef<HTMLDivElement>(null);

    const galleryImages = [
        { src: "/images/gallery1.webp", alt: "Prestige Kollur Exterior" },
        { src: "/images/gallery2.webp", alt: "Prestige Kollur Exterior" },
        { src: "/images/gallery3.webp", alt: "Prestige Kollur Living" },
        { src: "/images/gallery6.webp", alt: "Prestige Kollur Living" },
        { src: "/images/gallery4.webp", alt: "Prestige Kollur Amenities" },
        { src: "/images/gallery5.webp", alt: "Prestige Kollur Exterior" },
    ];

    const scrollGallery = (dir: number) => {
        if (!galleryRef.current) return;
        galleryRef.current.scrollBy({ left: dir * 400, behavior: "smooth" });
    };

    return (
        <section className="py-12 px-4 bg-white overflow-hidden relative" id="gallery">
            <div className="max-w-[1280px] mx-auto relative z-10">
                <ScrollAnimation animation="slide-up">
                    <div className="text-center mb-12">
                        <p className="inline-block text-[0.7rem] tracking-[3px] uppercase text-[#ddb468] font-semibold mb-2.5 font-gobold-light">Project Gallery</p>
                        <h2 className="text-[2.6rem] leading-[1.2] mb-4 max-md:text-[2rem]">A Glimpse of the <span className="text-[#a78a41] tracking-wide">Luxury</span></h2>
                        <p className="text-[1.05rem] leading-[1.8] text-[#8a8a9a] max-w-[620px] mx-auto">
                            Explore the architectural brilliance that
                            define Prestige Kollur.
                        </p>
                    </div>
                </ScrollAnimation>

                <div className="relative">
                    <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 scrollbar-none" ref={galleryRef} style={{ scrollbarWidth: 'none' }}>
                        {galleryImages.map((img, i) => (
                            <ScrollAnimation
                                key={i}
                                animation="zoom-in"
                                delay={i * 0.1}
                                className="flex-[0_0_calc(33.333%-1rem)] snap-start rounded-[12px] overflow-hidden aspect-[4/3] relative cursor-pointer group max-lg:flex-[0_0_calc(50%-0.75rem)] max-md:flex-[0_0_85%]"
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    width={600}
                                    height={450}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    className="transition-transform duration-600 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </ScrollAnimation>
                        ))}
                    </div>
                    <div className="flex justify-center gap-4 mt-8">
                        <button onClick={() => scrollGallery(-1)} aria-label="Scroll left" className="w-[50px] h-[50px] rounded-full border-[1.5px] border-[rgba(201,169,110,0.3)] bg-gray-50 text-[#a78a41] text-[1.2rem] cursor-pointer transition-all duration-300 flex items-center justify-center hover:bg-[#a88a4e] hover:text-white hover:border-transparent animate-button-sparkle">◀</button>
                        <button onClick={() => scrollGallery(1)} aria-label="Scroll right" className="w-[50px] h-[50px] rounded-full border-[1.5px] border-[rgba(201,169,110,0.3)] bg-gray-50 text-[#a78a41] text-[1.2rem] cursor-pointer transition-all duration-300 flex items-center justify-center hover:bg-[#a88a4e] hover:text-white hover:border-transparent animate-button-sparkle">▶</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
