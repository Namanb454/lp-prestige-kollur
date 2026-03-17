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
const FAQs = dynamic(() => import('@/app/components/FAQs'));
const Chatbot = dynamic(() => import('@/app/components/Chatbot'));
const StickyCTA = dynamic(() => import('@/app/components/StickyCTA'));
const ScrollAnimation = dynamic(() => import('@/app/components/ScrollAnimation'));

export default function Home() {
  const amenities = [
    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20" /><path d="M22 6a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6h8V6z" /><path d="M2 6h4v6H2z" /><path d="M12 6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6h8V6z" /><path d="M2 12c0 2 2.5 3 2.5 3S7 14 7 12" /><path d="M7 12c0 2 2.5 3 2.5 3S12 14 12 12" /><path d="M12 12c0 2 2.5 3 2.5 3s2.5-1 2.5-3" /><path d="M17 12c0 2 2.5 3 2.5 3s2.5-1 2.5-3" /></svg>, title: "Swimming Pool", desc: "Dive into luxury at our stunning swimming pool, designed for relaxation and rejuvenation." },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6.5 6.5 11 11" /><path d="m21 21-1-1" /><path d="m3 3 1 1" /><path d="m18 22 4-4" /><path d="m2 6 4-4" /><path d="m3 10 7-7" /><path d="m14 21 7-7" /></svg>, title: "Gym Area", desc: "Stay fit while enjoying breathtaking views at our fully equipped gym, designed to inspire and energize your workouts." },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2" /><path d="M12 4v16" /><path d="M2 12h20" /><path d="M6 12v.01" /><path d="M18 12v.01" /></svg>, title: "Sports Courts", desc: "Experience endless entertainment and active living with our premium sports courts in a well-equipped space." },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M3 7v14" /><path d="M21 7v14" /><path d="m3 7 9-5 9 5" /><path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" /></svg>, title: "Clubhouse", desc: "A world-class clubhouse serving as the epicenter of community life with modern recreational facilities." },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m8 14 4-4 4 4" /><path d="M12 22v-8" /><path d="M9 7A4.6 4.6 0 0 1 12 2a4.6 4.6 0 0 1 3 5 4.6 4.6 0 0 1-3 5 4.6 4.6 0 0 1-3-5Z" /></svg>, title: "Landscaped Gardens", desc: "Landscaped gardens and open green spaces that create a comfortable, serene living environment." },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>, title: "Green Living", desc: "Eco-friendly design maximizing natural light and ventilation while maintaining a harmonious balance with nature." },
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
              src="/images/gallery6.webp"
              alt="Birla Evara Luxury Living"
              width={1000}
              height={1000}
              style={{ width: "100%", height: "100%", display: "block" }}
              className="object-cover h-full w-full aspect-square"
            />
          </ScrollAnimation>

          <ScrollAnimation animation="slide-in-left" duration={0.8} delay={0.2}>
            <p className="inline-block text-[0.7rem] tracking-[3px] uppercase text-[#ddb468] font-semibold mb-2.5 font-gobold-light">About The Project</p>
            <h2 className="text-[2.6rem] leading-[1.2] mb-4 max-md:text-[2rem]">
              A Mega Township Development <span className="tracking-wide text-[#a78a41]">Prestige Kollur</span> In West Hyderabad
            </h2>
            <p className="text-[1.05rem] leading-[1.8] text-[#8a8a9a] max-w-[620px]">
              Prestige Kollur is a premium residential township located in Kollur, one of the fastest developing residential corridors in West Hyderabad. Developed by Prestige Group, the project is designed to offer modern homes with spacious layouts, premium amenities, and lush green surroundings. Spread across approximately 28 acres, the development will feature 10–12 high-rise towers offering panoramic views. It provides a balanced lifestyle with well-designed apartments, world-class recreational amenities, and excellent connectivity.
            </p>

            <div className="grid grid-cols-3 gap-6 my-8 max-md:grid-cols-1">
              <ScrollAnimation animation="zoom-in" delay={0.3} className="bg-white rounded-[10px] p-5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[rgba(201,169,110,0.15)] transition-transform duration-300 hover:-translate-y-1">
                <div className=" text-[1.1rem] font-semibold text-[#ddb468] mb-1">28 Acres</div>
                <div className="text-[0.75rem] uppercase tracking-[1px] text-[#8a8a9a]">Land Area</div>
              </ScrollAnimation>
              <ScrollAnimation animation="zoom-in" delay={0.4} className="bg-white rounded-[10px] p-5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[rgba(201,169,110,0.15)] transition-transform duration-300 hover:-translate-y-1">
                <div className=" text-[1.1rem] font-semibold text-[#ddb468] mb-1">4200+ Units</div>
                <div className="text-[0.75rem] uppercase tracking-[1px] text-[#8a8a9a]">No of Units</div>
              </ScrollAnimation>
              <ScrollAnimation animation="zoom-in" delay={0.5} className="bg-white rounded-[10px] p-5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[rgba(201,169,110,0.15)] transition-transform duration-300 hover:-translate-y-1">
                <div className=" text-[1.1rem] font-semibold text-[#ddb468] mb-1">3B + G + 40 Floors</div>
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
              <ScrollAnimation key={i} animation="zoom-in" delay={i * 0.1} className="group h-full flex flex-col items-center p-8 bg-white rounded-[16px] border border-[rgba(201,169,110,0.15)] shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(167, 138, 65,0.1)]">
                <div className="w-[80px] h-[80px] rounded-full bg-[rgba(167, 138, 65,0.05)] flex items-center justify-center mb-6 text-[#a78a41] group-hover:bg-[#a78a41] group-hover:text-white transition-colors duration-400">
                  {a.icon}
                </div>
                <div className="text-center transition-all duration-400 relative">
                  <h4 className="text-[#ddb468] text-[1.2rem] mb-3 relative z-[1] font-bold">{a.title}</h4>
                  <p className="text-[0.9rem] text-[#8a8a9a] leading-[1.6] relative z-[1]">{a.desc}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <FAQs />

      {/* ════════ FOOTER ════════ */}
      <footer className="bg-gradient-to-bl from-[#a78a41] from-[50%] to-black to-[10%] text-white/80 pt-16 px-8 pb-20">
        <div className="max-w-[1280px] mx-auto grid grid-cols-3 gap-12 max-lg:grid-cols-2 max-md:grid-cols-1">
          <div className="footer-brand">
            <Image
              src="/images/logo.png"
              alt="Prestige Kollur"
              width={130}
              height={44}
              className="mix-blend-color-light"
            // style={{ filter: "brightness(0) invert(1)" }}
            />
            <p className="text-[0.9rem] leading-[1.7] my-4">
              Prestige Kollur by Prestige Group — an iconic landmark that merges
              luxury, sustainability, and connectivity in West Hyderabad's most
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
              <li className="mb-2.5"><a href="#floor-plan" className="text-white/80 no-underline text-[0.85rem]">Prestige Kollur RERA No.:<br /><span className="font-semibold text-white/90">
                Coming Soon</span></a></li>
              <li className="mb-2.5"><a href="#floor-plan" className="text-white/80 no-underline text-[0.85rem]">Agent RERA No.: <br />
                <span className="font-semibold text-white/90">
                  Coming Soon</span></a></li>
              <li className="mb-2.5"><a href="#floor-plan" className="font-semibold text-white/90 no-underline text-[0.85rem] transition-colors duration-300 hover:text-[#ddb468]">https://rera.telangana.gov.in/</a></li>

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
