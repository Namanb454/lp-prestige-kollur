"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { PhoneInput } from 'react-international-phone';
import { isValidPhoneNumber } from 'libphonenumber-js';
import ScrollAnimation from "@/app/components/ScrollAnimation";
import { useUTMParams } from "@/hooks/useUTMParams";

export default function EnquiryForm() {
    useEffect(() => {
        // @ts-ignore
        import('react-international-phone/style.css');
    }, []);
    const router = useRouter();
    const pathname = usePathname();
    const utmParams = useUTMParams();
    const [defaultCountry, setDefaultCountry] = useState('in');
    const [enquiryForm, setEnquiryForm] = useState({ name: "", mobile: "", email: "" });
    const [formErrors, setFormErrors] = useState({ name: "", mobile: "", email: "" });
    const [formSuccess, setFormSuccess] = useState(false);

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

    const validateForm = () => {
        let isValid = true;
        const errors = { name: "", mobile: "", email: "" };

        if (enquiryForm.name.length < 3) {
            errors.name = "Name must be at least 3 characters";
            isValid = false;
        }

        if (!enquiryForm.mobile || !isValidPhoneNumber(enquiryForm.mobile)) {
            errors.mobile = "Please enter a valid mobile number";
            isValid = false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiryForm.email)) {
            errors.email = "Please enter a valid email address";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleEnquirySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setFormSuccess(true);

            try {
                const backendUrl = "https://webtestinfo.com";
                if (!backendUrl) throw new Error("Backend URL not configured");

                const payload = {
                    name: enquiryForm.name,
                    phone_no: enquiryForm.mobile,
                    email: enquiryForm.email,
                    source: "enquiry_form",
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
                    setFormSuccess(false);
                    setEnquiryForm({ name: "", mobile: "", email: "" });
                    sessionStorage.setItem('submissionSuccess', 'true');
                    const campaignRoutes = ['/discovery', '/remarketing', '/meta'];
                    const matchedRoute = campaignRoutes.find(r => pathname.startsWith(r));
                    const thankYouPath = matchedRoute ? `${matchedRoute}/thank-you` : '/thank-you/';
                    window.location.href = thankYouPath;
                } else {
                    console.error("Failed to submit lead", { lsData, dbData, emailData });
                    setFormSuccess(false);
                    alert("Failed to submit. Please try again.");
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                setFormSuccess(false);
                alert("An error occurred. Please try again.");
            }
        }
    };
    return (
        <section className="md:w-full w-sm py-6 px-4 bg-white relative z-30 md:mt-[220px] mt-[65px] max-w-[1000px] mx-auto rounded-[16px] shadow-md">
            <ScrollAnimation animation="slide-up">
                <div className="text-center mb-4">
                    <h3 className="text-[#a78a41] font-goboldlight md:text-[1.6rem] text-[1.4rem] font-medium">Reach Out To Our Team</h3>
                    <p className="text-gray-600 text-base">for a fast & personal response</p>
                </div>

                <form onSubmit={handleEnquirySubmit} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 items-start max-md:grid-cols-1">
                    <div className="flex flex-col gap-1 text-left w-full">
                        <input
                            type="text"
                            placeholder="Your Name *"
                            value={enquiryForm.name}
                            onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                            className={`w-full p-4 rounded-[8px] bg-white border ${formErrors.name ? "border-red-500" : "border-gray-200"} text-gray-800 outline-none focus:border-[#a78a41] transition-all`}
                        />
                        {formErrors.name && <span className="text-red-500 text-[0.7rem] ml-1">{formErrors.name}</span>}
                    </div>

                    <div className="flex flex-col gap-1 text-left w-full">
                        <PhoneInput
                            defaultCountry={defaultCountry}
                            value={enquiryForm.mobile}
                            onChange={(phone) => setEnquiryForm({ ...enquiryForm, mobile: phone })}
                            inputStyle={{
                                width: '100%',
                                height: '58px',
                                borderRadius: '0 8px 8px 0',
                                fontSize: '1rem',
                                paddingLeft: '8px',
                                backgroundColor: 'white',
                                border: formErrors.mobile ? '1px solid #ef4444' : '1px solid #e5e7eb',
                            }}
                            countrySelectorStyleProps={{
                                buttonStyle: {
                                    height: '58px',
                                    borderRadius: '8px 0 0 8px',
                                    paddingLeft: '8px',
                                    paddingRight: '8px',
                                    border: formErrors.mobile ? '1px solid #ef4444' : '1px solid #e5e7eb',
                                    backgroundColor: 'white',
                                }
                            }}
                        />
                        {formErrors.mobile && <span className="text-red-500 text-[0.7rem] ml-1">{formErrors.mobile}</span>}
                    </div>

                    <div className="flex flex-col gap-1 text-left w-full">
                        <input
                            type="email"
                            placeholder="Email Address *"
                            value={enquiryForm.email}
                            onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                            className={`w-full p-4 rounded-[8px] bg-white border ${formErrors.email ? "border-red-500" : "border-gray-200"} text-gray-800 outline-none focus:border-[#a78a41] transition-all`}
                        />
                        {formErrors.email && <span className="text-red-500 text-[0.7rem] ml-1">{formErrors.email}</span>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#a78a41] text-white text-sm font-semibold md:py-4 py-3 md:px-4 rounded-[6px] tracking-widest uppercase hover:bg-[#000000] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border-none animate-button-sparkle"
                    >
                        {formSuccess ? "Sent!" : "Get Callback"}
                    </button>
                </form>
            </ScrollAnimation>
        </section>
    );
}
