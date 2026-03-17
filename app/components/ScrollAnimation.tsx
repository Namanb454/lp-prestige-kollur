"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollAnimationProps {
    children: React.ReactNode;
    animation?: "fade-in" | "slide-up" | "slide-in-right" | "slide-in-left" | "zoom-in";
    duration?: number;
    delay?: number;
    className?: string;
    threshold?: number;
    style?: React.CSSProperties;
}

export default function ScrollAnimation({
    children,
    animation = "slide-up",
    duration = 0.8,
    delay = 0,
    className = "",
    threshold = 0.1,
    style = {}
}: ScrollAnimationProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: threshold,
                rootMargin: "0px"
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    // Map prop animation to css class
    const animationClass = isVisible ? `animate-${animation}` : "";

    return (
        <div
            ref={ref}
            className={`${className} ${animationClass}`}
            style={{
                ...style,
                opacity: isVisible ? undefined : 0,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`
            }}
        >
            {children}
        </div>
    );
}
