"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function ThankYouPage() {
    const router = useRouter();

    useEffect(() => {
        // Check if user came from form submission
        const isSubmissionSuccess = sessionStorage.getItem('submissionSuccess');

        if (!isSubmissionSuccess) {
            // Redirect to home if accessed directly
            router.push("/discovery");
            return;
        }

        // Fire Google Ads conversion event
        window.gtag?.('event', 'conversion', { 'send_to': 'AW-17399506442/W6hpCNLv4YocEIrM3ehA' });

        // Fire Meta Pixel Lead event
        if (typeof window.fbq === 'function') {
            window.fbq('track', 'PageView');
            window.fbq('track', 'Lead');
        }

        // Auto-redirect to home after 3 seconds
        const timer = setTimeout(() => {
            router.push("/discovery");
        }, 3000);

        // Cleanup: clear flag and timer
        return () => {
            clearTimeout(timer);
            sessionStorage.removeItem('submissionSuccess');
        };
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f7f6ef] to-white flex items-center justify-center px-4">
            <div className="max-w-[600px] w-full bg-white rounded-[20px] shadow-2xl p-12 text-center border-t-4 border-[#a78a41]">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <div className="text-xl md:text-2xl font-bold text-[#a78a41] uppercase tracking-[2px] my-auto">Prestige Kollur</div>
                </div>

                {/* Success Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-[#a78a41] to-[#a88a4e] rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in-95 duration-500">
                    <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                {/* Thank You Message */}
                <h1 className="text-[2.5rem] font-[--font-playfair] text-[#a78a41] font-bold mb-0 leading-tight">
                    Thank You!
                </h1>
                <p className="text-[1.1rem] text-gray-700 mb-0 leading-relaxed">
                    We appreciate your interest in <span className="font-semibold text-[#a78a41]">Birla Evara</span>.
                </p>
                <p className="text-[1rem] text-gray-600 mb-4 leading-relaxed">
                    Our team will get in touch with you shortly to assist you.
                </p>

                {/* Divider */}
                <div className="w-24 h-1 bg-gradient-to-r from-[#a78a41] to-[#a88a4e] mx-auto mb-4 rounded-full"></div>

                {/* Additional Info */}
                <div className="bg-[#f7f6ef] rounded-[12px] p-6 mb-4">
                    <p className="text-[0.9rem] text-gray-700 mb-3">
                        <span className="font-semibold text-[#a78a41]">What's Next?</span>
                    </p>
                    <ul className="text-left text-[0.9rem] text-gray-600 space-y-2 max-w-[400px] mx-auto">
                        <li className="flex items-start gap-2">
                            <span className="text-[#a88a4e] mt-1">✓</span>
                            <span>Our sales team will contact you within 24 hours</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#a88a4e] mt-1">✓</span>
                            <span>You'll receive exclusive pre-launch offers</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-[#a88a4e] mt-1">✓</span>
                            <span>Schedule a site visit at your convenience with free cab service</span>
                        </li>
                    </ul>
                </div>

                {/* Back to Home Button */}
                <Link
                    href="/"
                    className="inline-block w-full py-4 bg-[#a78a41] text-white font-semibold tracking-widest uppercase rounded-[8px] shadow-lg hover:bg-[#000000] hover:-translate-y-1 transition-all duration-300 no-underline"
                >
                    Back to Home
                </Link>

                {/* Contact Info */}
                <p className="text-gray-400 text-[0.8rem] mt-2">
                    Need immediate assistance? Call us at{" "}
                    <a href="tel:+917351188888" className="text-[#a78a41] font-semibold hover:underline">
                        +91 735 118 8888
                    </a>
                </p>
            </div>
        </div>
    );
}
