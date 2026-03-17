"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { PhoneInput } from 'react-international-phone';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useUTMParams } from "@/hooks/useUTMParams";
import Image from "next/image";

export default function SmartModal() {
    useEffect(() => {
        // @ts-ignore
        import('react-international-phone/style.css');
    }, []);
    const router = useRouter();
    const pathname = usePathname();
    const utmParams = useUTMParams();
    const [showModal, setShowModal] = useState(false);
    const [modalForm, setModalForm] = useState({ name: "", mobile: "", email: "" });
    const [modalErrors, setModalErrors] = useState({ name: "", mobile: "", email: "" });
    const [modalSuccess, setModalSuccess] = useState(false);
    const [defaultCountry, setDefaultCountry] = useState('in');
    const hasModalOpened = useRef(false);

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

    useEffect(() => {
        // Timer Trigger (8 seconds)
        const timer = setTimeout(() => {
            if (!hasModalOpened.current) {
                setShowModal(true);
                hasModalOpened.current = true;
            }
        }, 8000);

        // Scroll Triggers
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            // Smart Modal Trigger (30%)
            if (!hasModalOpened.current) {
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercentage = (scrollPosition / scrollHeight) * 100;
                if (scrollPercentage > 30) {
                    setShowModal(true);
                    hasModalOpened.current = true;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Listen for custom event to open modal from other components
        const openModalListener = () => setShowModal(true);
        window.addEventListener('openModal', openModalListener);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener('openModal', openModalListener);
        };
    }, []);

    const validateModalForm = () => {
        let isValid = true;
        const errors = { name: "", mobile: "", email: "" };

        if (modalForm.name.length < 3) {
            errors.name = "Name must be at least 3 characters";
            isValid = false;
        }

        if (!modalForm.mobile || !isValidPhoneNumber(modalForm.mobile)) {
            errors.mobile = "Please enter a valid mobile number";
            isValid = false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(modalForm.email)) {
            errors.email = "Please enter a valid email address";
            isValid = false;
        }

        setModalErrors(errors);
        return isValid;
    };

    const handleModalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateModalForm()) {
            setModalSuccess(true);

            try {
                const backendUrl = "https://webtestinfo.com";
                if (!backendUrl) throw new Error("Backend URL not configured");

                const payload = {
                    name: modalForm.name,
                    phone_no: modalForm.mobile,
                    email: modalForm.email,
                    source: "modal_popup",
                    city: "Hyderabad",
                    ip: "",
                    utm_source: utmParams.utm_source || "",
                    utm_medium: utmParams.utm_medium || "",
                    utm_campaign: utmParams.utm_campaign || "",
                    project: "Prestige Kollur",
                    message: "I am Interested in Prestige Kollur",
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
                    setModalSuccess(false);
                    setModalForm({ name: "", mobile: "", email: "" });
                    setShowModal(false);
                    sessionStorage.setItem('submissionSuccess', 'true');
                    const campaignRoutes = ['/discovery', '/remarketing', '/meta'];
                    const matchedRoute = campaignRoutes.find(r => pathname.startsWith(r));
                    const thankYouPath = matchedRoute ? `${matchedRoute}/thank-you` : '/thank-you/';
                    window.location.href = thankYouPath;
                } else {
                    console.error("Failed to submit lead", { lsData, dbData, emailData });
                    setModalSuccess(false);
                    alert("Failed to submit. Please try again.");
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                setModalSuccess(false);
                alert("An error occurred. Please try again.");
            }
        }
    };
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[20px] p-8 py-4 w-full max-w-[480px] relative shadow-2xl animate-in zoom-in-95 duration-300">
                <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer border-none"
                >
                    ✕
                </button>
                <Image src="/images/logo.png" alt="Logo" width={100} height={100} className="mb-4" />
                <h3 className="text-[#a78a41] text-[1.6rem]">Enquire Now</h3>
                <p className="text-[0.85rem] tracking-wide mb-6 border-b border-gray-100 pb-4 text-gray-500">Instant Access to Brochure & Floor Plans</p>

                <form onSubmit={handleModalSubmit} className="flex flex-col gap-4">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Name"
                            value={modalForm.name}
                            onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                            className={`w-full p-4 rounded-[8px] bg-gray-50 border ${modalErrors.name ? "border-red-500" : "border-gray-200"} text-black placeholder:text-gray-400 focus:border-[#a78a41] focus:bg-white outline-none transition-all`}
                        />
                        {modalErrors.name && <span className="text-red-500 text-[0.7rem] ml-1 block mt-1">{modalErrors.name}</span>}
                    </div>

                    <div className="relative group phone-input-container">
                        <PhoneInput
                            defaultCountry={defaultCountry}
                            value={modalForm.mobile}
                            onChange={(phone) => setModalForm({ ...modalForm, mobile: phone })}
                            inputStyle={{
                                width: '100%',
                                height: '58px',
                                borderRadius: '0 8px 8px 0',
                                fontSize: '1rem',
                                backgroundColor: '#f9fafb', // gray-50
                                border: modalErrors.mobile ? '1px solid #ef4444' : '1px solid #e5e7eb', // gray-200
                                paddingLeft: '8px'
                            }}
                            countrySelectorStyleProps={{
                                buttonStyle: {
                                    height: '58px',
                                    borderRadius: '8px 0 0 8px',
                                    paddingLeft: '8px',
                                    paddingRight: '8px',
                                    border: modalErrors.mobile ? '1px solid #ef4444' : '1px solid #e5e7eb', // gray-200
                                    backgroundColor: '#f9fafb',
                                }
                            }}
                        />
                        {modalErrors.mobile && <span className="text-red-500 text-[0.7rem] ml-1 block mt-1">{modalErrors.mobile}</span>}
                    </div>

                    <div className="relative group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={modalForm.email}
                            onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })}
                            className={`w-full p-4 rounded-[8px] bg-gray-50 border ${modalErrors.email ? "border-red-500" : "border-gray-200"} text-black placeholder:text-gray-400 focus:border-[#a78a41] focus:bg-white outline-none transition-all`}
                        />
                        {modalErrors.email && <span className="text-red-500 text-[0.7rem] ml-1 block mt-1">{modalErrors.email}</span>}
                    </div>

                    <button type="submit" className="w-full py-4 mt-2 bg-[#a78a41] text-white font-medium tracking-widest uppercase rounded-[8px] shadow-lg hover:shadow-[#a78a41]/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer border-none animate-button-sparkle">
                        {modalSuccess ? "Callback Requested!" : "Get Callback"}
                    </button>
                </form>
                <p className="text-gray-400 text-[0.7rem] text-center mt-4">
                    By clicking, you agree to our Privacy Policy
                </p>
            </div>
        </div>
    );
}
