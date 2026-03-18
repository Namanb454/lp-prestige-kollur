import Image from "next/image";
import dynamic from 'next/dynamic';
import Navbar from "@/app/components/Navbar";
import HeroSection from "@/app/components/HeroSection";

// Dynamically import below-the-fold components for better initial load performance
const EnquiryForm = dynamic(() => import('@/app/components/EnquiryForm'), {
    loading: () => <div className="h-[250px] w-full max-w-[1000px] mx-auto bg-gray-100/50 backdrop-blur-sm rounded-[16px] border border-gray-200 animate-pulse mt-[60px] md:mt-[220px]"></div>
});
const SmartModalWrapper = dynamic(() => import('@/app/components/SmartModalWrapper'));
const LocationMap = dynamic(() => import('@/app/components/LocationMap'));
const Gallery = dynamic(() => import('@/app/components/Gallery'));
const FloorPlans = dynamic(() => import('@/app/components/FloorPlans'));
const Chatbot = dynamic(() => import('@/app/components/Chatbot'));
const StickyCTA = dynamic(() => import('@/app/components/StickyCTA'));
const ScrollAnimation = dynamic(() => import('@/app/components/ScrollAnimation'));

export default function Home() {
    const amenities = [
        { img: "/images/swimmingarea.webp", title: "Swimming Area", desc: "Dive into luxury at our stunning swimming pool, designed for relaxation and rejuvenation. Enjoy a refreshing swim while soaking in the serene surroundings." },
        { img: "/images/fitnesscenter.webp", title: "Gym Area", desc: "Stay fit while enjoying breathtaking views at our elevated gym, designed to inspire and energize your workouts." },
        { img: "/images/indoregames.webp", title: "Indoor Games", desc: "Experience endless entertainment with a variety of indoor games in a vibrant and well-equipped space." },
        { img: "/images/gatedcommunity.webp", title: "Gated Community", desc: "Grand 15,000 sq.ft. gated community with clubhouse with banquet hall" },
        { img: "/images/kitchenarea.webp", title: "Fully Loaded Modular Kitchen & Marble Flooring", desc: "Pull-out units, magic corners, tall units, and specialized cutlery organizers maximize storage space." },
        { img: "/images/joggingarea.webp", title: "Jogging Track", desc: "1km landscaped jogging & cycling track" },
    ];

    return (
        <>
            <Navbar />
            <SmartModalWrapper />
            <HeroSection />
            <EnquiryForm />

            {/* ════════ OVERVIEW ════════ */}
            <section className="py-12 px-4" id="overview">
                <div className="max-w-[1280px] mx-auto grid grid-cols-2 gap-16 items-center max-lg:grid-cols-1 max-lg:gap-8">
                    <ScrollAnimation animation="slide-in-right" duration={0.8} className="relative rounded-[12px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] before:content-[''] before:absolute before:top-[-20px] before:left-[-20px] before:w-[120px] before:h-[120px] before:border-2 before:border-[#ddb468] before:rounded-[8px] before:z-[-1] before:opacity-40 col-span-1 w-full h-full aspect-sqaure">
                        <Image
                            src="/images/evara2.webp"
                            alt="Birla Evara Luxury Living"
                            width={640}
                            height={440}
                            style={{ width: "100%", height: "100%", display: "block" }}
                            className="object-cover h-full w-full aspect-square"
                        />
                    </ScrollAnimation>

                    <ScrollAnimation animation="slide-in-left" duration={0.8} delay={0.2}>
                        <p className="inline-block text-[0.7rem] tracking-[3px] uppercase text-[#ddb468] font-semibold mb-2.5 font-gobold-light">About The Project</p>
                        <h2 className="text-[2.6rem] leading-[1.2] mb-4 max-md:text-[2rem]">
                            Unveiling the New Towers At <span className="tracking-wide text-[#a78a41]">Birla Evara</span> The Bright Side of Bengaluru
                        </h2>
                        <p className="text-[1.05rem] leading-[1.8] text-[#8a8a9a] max-w-[620px]">
                            Welcome to Birla Evara Sarjapur Road, Bangalore. An new launch residential project by Birla Estates. Offering 3 & 4 BHK apartments for sale in Sarjapur Road. Introducing the epitome of luxurious living nestled in the heart of Sarjapur Road, Bangalore. Envisioned to redefine urban lifestyle, Birla Sarjapur Road new launch promises a harmonious blend of contemporary design, unparalleled amenities, and unmatched convenience. Explore our meticulously crafted 3 & 4 BHK apartments designed to elevate your living experience to new heights.
                        </p>

                        <div className="grid grid-cols-3 gap-6 my-8 max-md:grid-cols-1">
                            <ScrollAnimation animation="zoom-in" delay={0.3} className="bg-white rounded-[10px] p-5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[rgba(201,169,110,0.15)] transition-transform duration-300 hover:-translate-y-1">
                                <div className=" text-[1.1rem] font-semibold text-[#ddb468] mb-1">28 Acres</div>
                                <div className="text-[0.75rem] uppercase tracking-[1px] text-[#8a8a9a]">Land Area</div>
                            </ScrollAnimation>
                            <ScrollAnimation animation="zoom-in" delay={0.4} className="bg-white rounded-[10px] p-5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[rgba(201,169,110,0.15)] transition-transform duration-300 hover:-translate-y-1">
                                <div className=" text-[1.1rem] font-semibold text-[#ddb468] mb-1">1594 Apartments</div>
                                <div className="text-[0.75rem] uppercase tracking-[1px] text-[#8a8a9a]">No of Units</div>
                            </ScrollAnimation>
                            <ScrollAnimation animation="zoom-in" delay={0.5} className="bg-white rounded-[10px] p-5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[rgba(201,169,110,0.15)] transition-transform duration-300 hover:-translate-y-1">
                                <div className=" text-[1.1rem] font-semibold text-[#ddb468] mb-1">G+25 Floors</div>
                                <div className="text-[0.75rem] uppercase tracking-[1px] text-[#8a8a9a]">Structure</div>
                            </ScrollAnimation>
                        </div>

                        <a href="#floor-plan" className="inline-flex md:w-fit w-full items-center gap-2 px-9 py-3.5 bg-[#a78a41] text-white no-underline font-semibold text-[0.9rem] tracking-[1px] uppercase rounded-[4px] border-none cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(201,169,110,0.4)] flex justify-between">Explore Configurations
                            <svg fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={28} xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 243.58"><path fillRule="nonzero" d="M373.57 0 512 120.75 371.53 243.58l-20.92-23.91 94.93-83L0 137.09v-31.75l445.55-.41-92.89-81.02z" /></svg>
                        </a>
                    </ScrollAnimation>
                </div>
            </section>

            <FloorPlans />
            <Gallery />
            <LocationMap />

            {/* ════════ AMENITIES ════════ */}
            <section className="py-12 px-4 relative overflow-hidden" id="amenities">
                <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.08),transparent_70%)] top-[-200px] right-[-200px]" />
                <div className="relative z-10 max-w-[1280px] mx-auto">
                    <ScrollAnimation animation="slide-up">
                        <div className="text-center mb-14">
                            <p className="inline-block text-[0.7rem] tracking-[3px] uppercase text-[#ddb468] font-semibold mb-2.5 font-gobold-light">World-Class Amenities</p>
                            <h2 className="text-[2.6rem] leading-[1.2] mb-4 max-md:text-[2rem]">Curated for the<br /><span className="text-[#a78a41] tracking-wide">Discerning Few</span></h2>
                            <p className="text-[1.05rem] leading-[1.8] text-[#8a8a9a] max-w-[620px] mx-auto">
                                Over 40 premium amenities designed to elevate every moment of your day —
                                from sunrise yoga to starlit gatherings.
                            </p>
                        </div>
                    </ScrollAnimation>

                    <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
                        {amenities.map((a, i) => (
                            <ScrollAnimation key={i} animation="zoom-in" delay={i * 0.1} className="group h-full">
                                <Image src={a.img} alt={a.title} width={1000} height={1000} className="w-full h-auto aspect-[16/11] object-cover mb-4 rounded-2xl" />
                                <div className="text-center transition-all duration-400 relative">
                                    <h4 className="text-[#ddb468] text-[1rem] relative z-[1] font-bold">{a.title}</h4>
                                    <p className="text-[0.8rem] text-[#8a8a9a] leading-[1.5] relative z-[1]">{a.desc}</p>
                                </div>
                            </ScrollAnimation>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════ FOOTER ════════ */}
            <footer className="bg-gradient-to-bl from-[#a78a41] from-[50%] to-black to-[10%] text-white/80 pt-16 px-8 pb-20">
                <div className="max-w-[1280px] mx-auto grid grid-cols-3 gap-12 max-lg:grid-cols-2 max-md:grid-cols-1">
                    <div className="footer-brand">
                        <div className="text-xl md:text-2xl font-bold text-[#a78a41] uppercase tracking-[2px] my-auto">Prestige Kollur</div>
                        <p className="text-[0.9rem] leading-[1.7] my-4">
                            Birla Evara by Birla Estates — an iconic landmark that merges
                            luxury, sustainability, and connectivity in Pune&apos;s most
                            prestigious neighbourhood.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white text-[1rem] mb-5 relative pb-2.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[30px] after:h-[2px] after:bg-[#ddb468]">Quick Links</h4>
                        <ul className="list-none">
                            <li className="mb-2.5"><a href="#overview" className="text-white/80 no-underline text-[0.85rem] transition-colors duration-300 hover:text-[#ddb468]">Overview</a></li>
                            <li className="mb-2.5"><a href="#amenities" className="text-white/80 no-underline text-[0.85rem] transition-colors duration-300 hover:text-[#ddb468]">Amenities</a></li>
                            <li className="mb-2.5"><a href="#floor-plan" className="text-white/80 no-underline text-[0.85rem] transition-colors duration-300 hover:text-[#ddb468]">Floor Plans</a></li>
                            <li className="mb-2.5"><a href="#gallery" className="text-white/80 no-underline text-[0.85rem] transition-colors duration-300 hover:text-[#ddb468]">Gallery</a></li>
                            <li className="mb-2.5"><a href="#location" className="text-white/80 no-underline text-[0.85rem] transition-colors duration-300 hover:text-[#ddb468]">Location</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white text-[1rem] mb-5 relative pb-2.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[30px] after:h-[2px] after:bg-[#ddb468]">Legal</h4>
                        <ul className="list-none">
                            <li className="mb-2.5"><a href="#floor-plan" className="text-white/80 no-underline text-[0.85rem]">BIRLA EVARA Sarajapur RERA No.:<br /><span className="font-semibold text-white/90">
                                PRM/KA/RERA/1251/446/PR/060225/007487</span></a></li>
                            <li className="mb-2.5"><a href="#floor-plan" className="text-white/80 no-underline text-[0.85rem]">Agent RERA No.: <br />
                                <span className="font-semibold text-white/90">
                                    PRM/KA/RERA/1251/310/AG/221122/003270</span></a></li>
                            <li className="mb-2.5"><a href="#floor-plan" className="font-semibold text-white/90 no-underline text-[0.85rem] transition-colors duration-300 hover:text-[#ddb468]">https://rera.karnataka.gov.in/</a></li>

                            <li className="mb-2.5"><a href="/privacy-policy/" className="font-semibold text-white/90 no-underline text-[0.85rem] transition-colors duration-300 hover:text-[#ddb468]">Disclaimer & Privacy Policy</a></li>
                        </ul>
                    </div>

                </div>
            </footer>
            <StickyCTA />
            <Chatbot />
        </>
    );
}
