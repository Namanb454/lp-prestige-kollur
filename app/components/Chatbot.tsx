"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { PhoneInput } from 'react-international-phone';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useUTMParams } from "@/hooks/useUTMParams";

export default function Chatbot() {
    useEffect(() => {
        // @ts-ignore
        import('react-international-phone/style.css');
    }, []);
    const router = useRouter();
    const pathname = usePathname();
    const utmParams = useUTMParams();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatbotForm, setChatbotForm] = useState({ name: "", mobile: "", email: "" });
    const [chatbotErrors, setChatbotErrors] = useState({ name: "", mobile: "", email: "" });
    const [chatbotSuccess, setChatbotSuccess] = useState(false);
    const [defaultCountry, setDefaultCountry] = useState('in');

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

    const validateChatbotForm = () => {
        let isValid = true;
        const errors = { name: "", mobile: "", email: "" };

        if (chatbotForm.name.length < 3) {
            errors.name = "Name must be at least 3 characters";
            isValid = false;
        }

        if (!chatbotForm.mobile || !isValidPhoneNumber(chatbotForm.mobile)) {
            errors.mobile = "Please enter a valid mobile number";
            isValid = false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(chatbotForm.email)) {
            errors.email = "Please enter a valid email address";
            isValid = false;
        }

        setChatbotErrors(errors);
        return isValid;
    };

    const handleChatbotSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateChatbotForm()) {
            setChatbotSuccess(true);

            try {
                const backendUrl = "https://webtestinfo.com";
                if (!backendUrl) throw new Error("Backend URL not configured");

                const payload = {
                    name: chatbotForm.name,
                    phone_no: chatbotForm.mobile,
                    email: chatbotForm.email,
                    source: "chatbot",
                    city: "Hyderabad",
                    ip: "",
                    utm_source: utmParams.utm_source || "",
                    utm_medium: utmParams.utm_medium || "",
                    utm_campaign: utmParams.utm_campaign || "",
                    project: "Prestige Kollur",
                    message: "Chatbot Enquiry for Prestige Kollur",
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
                    setChatbotSuccess(false);
                    setChatbotForm({ name: "", mobile: "", email: "" });
                    sessionStorage.setItem('submissionSuccess', 'true');
                    const campaignRoutes = ['/discovery', '/remarketing', '/meta'];
                    const matchedRoute = campaignRoutes.find(r => pathname.startsWith(r));
                    const thankYouPath = matchedRoute ? `${matchedRoute}/thank-you` : '/thank-you/';
                    window.location.href = thankYouPath;
                } else {
                    console.error("Failed to submit lead", { lsData, dbData, emailData });
                    setChatbotSuccess(false);
                    alert("Failed to submit. Please try again.");
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                setChatbotSuccess(false);
                alert("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-[9990] flex flex-col items-end gap-4">
            {/* Chat Window */}
            {isChatOpen && (
                <div className="bg-white w-[320px] rounded-[20px] shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-5 origin-bottom-right font-sans">
                    <div className="bg-gradient-to-r from-[#a78a41] to-[#000000] text-white p-5 flex justify-between items-center shadow-md">
                        <div>
                            <h3 className="font-bold text-[1.1rem] tracking-wide">Chat with Us</h3>
                            <p className="text-[0.75rem] text-white/90 font-medium">Get reply immediately</p>
                        </div>
                        <button
                            onClick={() => setIsChatOpen(false)}
                            className="text-white/80 hover:text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 cursor-pointer border-none"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="p-6 bg-white">
                        <form onSubmit={handleChatbotSubmit} className="flex flex-col gap-4">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    value={chatbotForm.name}
                                    onChange={(e) => setChatbotForm({ ...chatbotForm, name: e.target.value })}
                                    className={`w-full p-3.5 rounded-[10px] bg-gray-50 border ${chatbotErrors.name ? "border-red-500" : "border-gray-100"} text-gray-800 text-[0.9rem] placeholder:text-gray-400 focus:bg-white focus:border-[#a78a41]/30 focus:shadow-[0_0_0_4px_rgba(167, 138, 65,0.05)] outline-none transition-all duration-300`}
                                />
                                {chatbotErrors.name && <span className="text-red-500 text-[0.7rem] ml-1 block mt-1">{chatbotErrors.name}</span>}
                            </div>
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={chatbotForm.email}
                                    onChange={(e) => setChatbotForm({ ...chatbotForm, email: e.target.value })}
                                    className={`w-full p-3.5 rounded-[10px] bg-gray-50 border ${chatbotErrors.email ? "border-red-500" : "border-gray-100"} text-gray-800 text-[0.9rem] placeholder:text-gray-400 focus:bg-white focus:border-[#a78a41]/30 focus:shadow-[0_0_0_4px_rgba(167, 138, 65,0.05)] outline-none transition-all duration-300`}
                                />
                                {chatbotErrors.email && <span className="text-red-500 text-[0.7rem] ml-1 block mt-1">{chatbotErrors.email}</span>}
                            </div>
                            <div className="relative group phone-input-container">
                                <PhoneInput
                                    defaultCountry={defaultCountry}
                                    value={chatbotForm.mobile}
                                    onChange={(phone) => setChatbotForm({ ...chatbotForm, mobile: phone })}
                                    inputStyle={{
                                        width: '100%',
                                        height: '50px',
                                        borderRadius: '0 8px 8px 0',
                                        fontSize: '0.9rem',
                                        backgroundColor: '#f9fafb', // gray-50
                                        border: chatbotErrors.mobile ? '1px solid #ef4444' : '1px solid #f3f4f6', // gray-100
                                        paddingLeft: '8px'
                                    }}
                                    countrySelectorStyleProps={{
                                        buttonStyle: {
                                            height: '50px',
                                            borderRadius: '8px 0 0 8px',
                                            paddingLeft: '8px',
                                            paddingRight: '8px',
                                            border: chatbotErrors.mobile ? '1px solid #ef4444' : '1px solid #f3f4f6', // gray-100
                                            backgroundColor: '#f9fafb',
                                        }
                                    }}
                                />
                                {chatbotErrors.mobile && <span className="text-red-500 text-[0.7rem] ml-1 block mt-1">{chatbotErrors.mobile}</span>}
                            </div>

                            <button type="submit" className="w-full py-3.5 mt-2 bg-[#a78a41] text-white text-[0.9rem] font-bold tracking-wider uppercase rounded-[10px] shadow-[0_4px_14px_rgba(167, 138, 65,0.4)] hover:shadow-[0_6px_20px_rgba(167, 138, 65,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 transform cursor-pointer border-none animate-button-sparkle">
                                {chatbotSuccess ? "Sent!" : "Start Chat"}
                            </button>
                        </form>
                        <div className="flex justify-center items-center gap-1 mt-4 text-gray-300 text-[0.65rem]">
                            <span>🔒</span>
                            <span>We respect your privacy</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="w-14 h-14 bg-[#a78a41] rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-[#a78a41]/40 border-none"
                aria-label="Toggle Chat"
            >
                {isChatOpen ? (
                    <span className="text-2xl">✕</span>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                )}
            </button>
        </div>
    );
}
