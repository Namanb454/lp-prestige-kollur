"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { PhoneInput } from 'react-international-phone';
import { isValidPhoneNumber } from 'libphonenumber-js';
import ScrollAnimation from "@/app/components/ScrollAnimation";
import { useUTMParams } from "@/hooks/useUTMParams";
import Image from "next/image";

export default function LocationMap() {
    useEffect(() => {
        // @ts-ignore
        import('react-international-phone/style.css');
    }, []);
    const router = useRouter();
    const pathname = usePathname();
    const utmParams = useUTMParams();
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [locationForm, setLocationForm] = useState({ name: "", mobile: "", email: "" });
    const [locationErrors, setLocationErrors] = useState({ name: "", mobile: "", email: "" });
    const [locationSubmitted, setLocationSubmitted] = useState(false);
    const [defaultCountry, setDefaultCountry] = useState('in');

    type LocationCategory = "Connectivity" | "Commercial Parks" | "Healthcare" | "Education";
    const [activeCategory, setActiveCategory] = useState<LocationCategory>("Connectivity");

    useEffect(() => {
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                if (data && data.country_code) {
                    setDefaultCountry(data.country_code.toLowerCase());
                }
            })
            .catch(() => {
                console.warn("Could not fetch country code, using default.");
            });
    }, [defaultCountry]);

    const validateLocationForm = () => {
        let isValid = true;
        const errors = { name: "", mobile: "", email: "" };

        if (locationForm.name.length < 3) {
            errors.name = "Name must be at least 3 characters";
            isValid = false;
        }

        if (!locationForm.mobile || !isValidPhoneNumber(locationForm.mobile)) {
            errors.mobile = "Please enter a valid mobile number";
            isValid = false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(locationForm.email)) {
            errors.email = "Please enter a valid email address";
            isValid = false;
        }

        setLocationErrors(errors);
        return isValid;
    };

    const handleLocationSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateLocationForm()) {
            setLocationSubmitted(true);

            try {
                const backendUrl = "https://webtestinfo.com";
                if (!backendUrl) throw new Error("Backend URL not configured");

                const payload = {
                    name: locationForm.name,
                    phone_no: locationForm.mobile,
                    email: locationForm.email,
                    source: "location_map",
                    city: "Hyderabad",
                    ip: "",
                    utm_source: utmParams.utm_source || "",
                    utm_medium: utmParams.utm_medium || "",
                    utm_campaign: utmParams.utm_campaign || "",
                    project: "Prestige Kollur",
                    message: "Location Map Unlock Request for Prestige Kollur",
                };

                const lsResponse = fetch(`${backendUrl}/api/lead/leadsquared`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                const dbResponse = fetch(`${backendUrl}/api/lead/database`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                const emailResponse = fetch(`${backendUrl}/api/lead/email`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });

                const [lsRes, dbRes, emailRes] = await Promise.all([lsResponse, dbResponse, emailResponse]);
                const lsData = await lsRes.json();
                const dbData = await dbRes.json();
                const emailData = await emailRes.json();

                if ((lsRes.ok && lsData.success) || (dbRes.ok && dbData.success) || (emailRes.ok && emailData.success)) {
                    setShowLocationModal(false);
                    setLocationForm({ name: "", mobile: "", email: "" });
                    setLocationErrors({ name: "", mobile: "", email: "" });
                    sessionStorage.setItem('submissionSuccess', 'true');
                    const campaignRoutes = ['/discovery', '/remarketing', '/meta'];
                    const matchedRoute = campaignRoutes.find(r => pathname.startsWith(r));
                    const thankYouPath = matchedRoute ? `${matchedRoute}/thank-you` : '/thank-you/';
                    window.location.href = thankYouPath;
                } else {
                    console.error("Failed to submit lead", { lsData, dbData, emailData });
                    setLocationSubmitted(false);
                    alert("Failed to submit. Please try again.");
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                setLocationSubmitted(false);
                alert("An error occurred. Please try again.");
            }
        }
    };

    const locationData: Record<LocationCategory, { place: string, dist: string }[]> = {
        "Connectivity": [
            { place: "Outer Ring Road - Exit 2", dist: "3 mins" },
            { place: "Rajiv Gandhi International Airport", dist: "35 mins" },
            { place: "Direct Access to ORR Service Road", dist: "0 mins" }
        ],
        "Commercial Parks": [
            { place: "Kokapet / Neopolis", dist: "15 mins" },
            { place: "Financial District", dist: "20 mins" },
            { place: "Hitech City", dist: "25 mins" }
        ],
        "Healthcare": [
            { place: "Top Hospitals in West Hyderabad", dist: "Nearby" }
        ],
        "Education": [
            { place: "Sarath City Capital Mall", dist: "30 mins" },
            { place: "Top Schools in West Hyderabad", dist: "Nearby" }
        ]
    };

    return (
        <>
            <section className="py-12 px-4 bg-[#f7f6ef]" id="location">
                <div className="max-w-[1280px] mx-auto grid grid-cols-2 gap-12 items-start max-lg:grid-cols-1">
                    <div>
                        <ScrollAnimation animation="slide-up">
                            <p className="inline-block text-[0.7rem] tracking-[3px] uppercase text-[#ddb468] font-semibold mb-2.5 font-gobold-light">Prime Location</p>
                            <h2 className="text-[2.6rem] leading-[1.2] mb-4 max-md:text-[2rem]">Connected to<br /> <span className="text-[#a78a41] tracking-wide">Everything That Matters</span></h2>
                            <p className="text-[1.05rem] leading-[1.8] text-[#8a8a9a] max-w-[620px]">
                                Strategically located at Kollur near ORR Exit 2, Hyderabad&apos;s most coveted
                                address — enjoy seamless connectivity to IT hubs, top schools,
                                hospitals, and entertainment.
                            </p>
                        </ScrollAnimation>

                        <div className="flex flex-wrap gap-3 my-2">
                            {(Object.keys(locationData) as LocationCategory[]).map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[0.8rem] font-medium shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-[rgba(201,169,110,0.15)] cursor-pointer transition-all ${activeCategory === cat ? 'bg-[#ddb468] text-white font-semibold' : 'bg-white text-gray-800 hover:bg-gray-50'}`}
                                >
                                    {cat === "Connectivity" ? "🚉" : cat === "Commercial Parks" ? "🏢" : cat === "Healthcare" ? "🏥" : "🎓"} {cat}
                                </button>
                            ))}
                        </div>

                        <ul className="list-none my-2">
                            {locationData[activeCategory].map((loc, i) => (
                                <li key={i} className="py-3 border-b border-black/6 flex justify-between items-center text-[0.9rem]">
                                    <span>{loc.place}</span>
                                    <span className="font-semibold text-[#ddb468] text-[0.85rem]">{loc.dist}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => locationSubmitted ? null : setShowLocationModal(true)}
                            className="inline-flex items-center gap-2 px-9 py-3.5 bg-[#a78a41] text-white no-underline font-semibold text-[0.9rem] tracking-[1px] uppercase rounded-[4px] border-none cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(201,169,110,0.4)] md:w-fit w-full animate-button-sparkle"
                        >
                            {locationSubmitted ?
                                <div>
                                    ✓ Request Submitted
                                </div> :
                                <div className="w-full flex justify-between items-center gap-2">
                                    <span>
                                        Open in Google Maps
                                    </span>
                                    <svg fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={28} xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 243.58"><path fillRule="nonzero" d="M373.57 0 512 120.75 371.53 243.58l-20.92-23.91 94.93-83L0 137.09v-31.75l445.55-.41-92.89-81.02z" /></svg>
                                </div>
                            }
                        </button>
                    </div>

                    {/* Gated Map */}
                    <div className="rounded-[14px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.1)] border border-[rgba(201,169,110,0.15)] w-full h-full relative min-h-[400px]">
                        {locationSubmitted ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#f7f6ef] to-white p-8 text-center">
                                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                                    <span className="text-4xl">✓</span>
                                </div>
                                <h3 className="text-[#a78a41] text-[1.5rem] font-semibold mb-3">Request Submitted!</h3>
                                <p className="text-gray-600 text-[0.95rem] leading-relaxed max-w-[300px]">Our team will contact you shortly with the exact location details and directions.</p>
                            </div>
                        ) : (
                            <>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15128.850527484424!2d73.76!3d18.57!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf07f1c2e1d3%3A0x1caba0a0a0a0a0a0!2sBaner%2C+Pune!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Prestige Kollur Location Map"
                                    className="w-full h-full object-cover border-none pointer-events-none"
                                    style={{ filter: 'blur(6px)' }}
                                />
                                {/* Click overlay */}
                                <div
                                    onClick={() => setShowLocationModal(true)}
                                    className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-black/40 group"
                                >
                                    <div className="bg-white/95 backdrop-blur-md rounded-[16px] px-8 py-6 shadow-2xl text-center transform group-hover:scale-105 transition-transform duration-300">
                                        <span className="text-3xl block mb-3">📍</span>
                                        <p className="text-[#a78a41] tracking-wide text-[1.1rem] mb-1">View Exact Location</p>
                                        <p className="text-gray-500 text-[0.8rem]">Fill in your details to unlock the map</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* ════════ LOCATION MODAL ════════ */}
            {showLocationModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[20px] p-8 py-4 w-full max-w-[480px] relative shadow-2xl animate-in zoom-in-95 duration-300">
                        <button
                            onClick={() => setShowLocationModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-black w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer border-none"
                        >
                            ✕
                        </button>
                        <div className="text-xl md:text-2xl font-bold text-[#a78a41] uppercase tracking-[2px] my-auto">Prestige Kollur</div>

                        <h3 className="text-[#a78a41] text-[1.6rem]">View Location</h3>
                        <p className="text-[0.85rem] tracking-wide mb-6 border-b border-gray-100 pb-4 text-gray-500">Fill details to unlock the map</p>

                        <form onSubmit={handleLocationSubmit} className="flex flex-col gap-4">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={locationForm.name}
                                    onChange={(e) => setLocationForm({ ...locationForm, name: e.target.value })}
                                    className={`w-full p-4 rounded-[8px] bg-gray-50 border ${locationErrors.name ? "border-red-500" : "border-gray-200"} text-black placeholder:text-gray-400 focus:border-[#a78a41] focus:bg-white outline-none transition-all`}
                                />
                                {locationErrors.name && <span className="text-red-500 text-[0.7rem] ml-1 block mt-1">{locationErrors.name}</span>}
                            </div>

                            <div className="relative group phone-input-container">
                                <PhoneInput
                                    defaultCountry={defaultCountry}
                                    value={locationForm.mobile}
                                    onChange={(phone) => setLocationForm({ ...locationForm, mobile: phone })}
                                    inputStyle={{
                                        width: '100%',
                                        height: '58px',
                                        borderRadius: '0 8px 8px 0',
                                        fontSize: '1rem',
                                        backgroundColor: '#f9fafb',
                                        border: locationErrors.mobile ? '1px solid #ef4444' : '1px solid #e5e7eb',
                                        paddingLeft: '8px'
                                    }}
                                    countrySelectorStyleProps={{
                                        buttonStyle: {
                                            height: '58px',
                                            borderRadius: '8px 0 0 8px',
                                            paddingLeft: '8px',
                                            paddingRight: '8px',
                                            border: locationErrors.mobile ? '1px solid #ef4444' : '1px solid #e5e7eb',
                                            backgroundColor: '#f9fafb',
                                        }
                                    }}
                                />
                                {locationErrors.mobile && <span className="text-red-500 text-[0.7rem] ml-1 block mt-1">{locationErrors.mobile}</span>}
                            </div>

                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={locationForm.email}
                                    onChange={(e) => setLocationForm({ ...locationForm, email: e.target.value })}
                                    className={`w-full p-4 rounded-[8px] bg-gray-50 border ${locationErrors.email ? "border-red-500" : "border-gray-200"} text-black placeholder:text-gray-400 focus:border-[#a78a41] focus:bg-white outline-none transition-all`}
                                />
                                {locationErrors.email && <span className="text-red-500 text-[0.7rem] ml-1 block mt-1">{locationErrors.email}</span>}
                            </div>

                            <button type="submit" className="w-full py-4 mt-2 bg-[#a78a41] text-white font-medium tracking-widest uppercase rounded-[8px] shadow-lg hover:shadow-[#a78a41]/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer border-none animate-button-sparkle">
                                Unlock Map
                            </button>
                        </form>
                        <p className="text-gray-400 text-[0.7rem] text-center mt-4">
                            By clicking, you agree to our Privacy Policy
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
