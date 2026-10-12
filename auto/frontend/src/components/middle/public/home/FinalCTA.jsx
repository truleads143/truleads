import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-linear-to-r from-[#0b2f5a] via-[#124D95] to-[#0b2f5a] text-white py-24 overflow-hidden"
    >
      {/* Stronger Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_60%)] pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-4 lg:px-6 text-center">

        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Ready to Drive with
            <span className="text-cyan-300"> Confidence?</span>
          </h2>

          <p className="mt-6 text-white/85 text-lg max-w-2xl mx-auto">
            Get affordable, reliable auto insurance tailored to your needs.
            Start your quote today and experience coverage you can trust.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-6">

            <Link
              to="/contactus"
              className="px-8 py-3 rounded-xl bg-cyan-400 text-[#0b2f5a] font-semibold text-base hover:bg-cyan-300 transition-all duration-300 shadow-lg hover:shadow-cyan-400/40"
            >
              Get Your Free Quote
            </Link>

            <a
              href="tel:+12102456181"
              className="flex items-center gap-2 text-white/90 hover:text-cyan-300 font-semibold transition-colors duration-300"
            >
              <Phone size={18} />
              Call +1 210 245 6181
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}
