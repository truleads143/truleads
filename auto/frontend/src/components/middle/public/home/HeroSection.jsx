import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import Lottie from "lottie-react";
import vehicleAnimation from "../../../../assets/car_loop.mp4";


export default function HeroSection({ showMedia = true }) {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaded(true);
        }, 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative overflow-hidden bg-linear-to-b from-[#0d3768] via-[#124D95] to-[#0d3768] text-white">

            {/* Soft background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.15),transparent_50%)] pointer-events-none"></div>

            <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-20 lg:py-28">

                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

                    {/* LEFT CONTENT */}
                    <div
                        className={`flex-1 transition-all duration-700 ease-out ${loaded
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                            }`}
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                            Reliable Coverage.
                            <br />
                            <span className="text-cyan-300">Complete Peace of Mind.</span>
                        </h1>

                        <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">
                            Protect your vehicle with affordable, flexible auto insurance plans.
                            Fast approval. Trusted advisors. No hidden surprises.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">

                            <Link
                                to="/contactus"
                                className="px-7 py-3 rounded-xl bg-cyan-400 text-[#0d3768] font-semibold text-base hover:bg-cyan-300 transition-all duration-300 shadow-lg hover:shadow-cyan-400/40"
                            >
                                Get Your Quote
                            </Link>

                            <a
                                href="tel:+12102456181 "
                                className="flex items-center gap-2 text-white/90 hover:text-cyan-300 font-semibold transition-colors duration-300"
                            >
                                <Phone size={18} />
                                Call +1 2102456181 
                            </a>

                        </div>
                    </div>

                    {/* RIGHT MEDIA */}
                    {showMedia && (
                        <div
                            className={`flex-1 flex justify-center transition-all duration-1000 ease-out ${loaded
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 translate-x-8"
                                }`}
                        >
                            {/* Placeholder for animation */}
                            <div className="w-full max-w-md lg:max-w-lg">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-auto rounded-2xl"
                                >
                                    <source src={vehicleAnimation} type="video/mp4" />
                                </video>
                            </div>


                        </div>
                    )}

                </div>

            </div>

            {/* Bottom fade transition */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#0d3768] to-transparent"></div>

        </section>
    );
}
