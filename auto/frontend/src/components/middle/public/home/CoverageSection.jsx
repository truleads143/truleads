import React, { useEffect, useRef, useState } from "react";
import { Car, Shield, Truck, FileText } from "lucide-react";

export default function CoverageSection() {
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

  const coverageTypes = [
    {
      icon: <Car size={28} />,
      title: "Auto Insurance",
      desc: "Comprehensive vehicle coverage protecting you from accidents, theft, and unexpected damage.",
    },
    {
      icon: <Shield size={28} />,
      title: "Liability Coverage",
      desc: "Stay legally protected with liability plans tailored to your state requirements.",
    },
    {
      icon: <Truck size={28} />,
      title: "Commercial Coverage",
      desc: "Secure your business vehicles with policies designed for commercial use.",
    },
    {
      icon: <FileText size={28} />,
      title: "Full Protection Plans",
      desc: "All-in-one coverage bundles for complete peace of mind on the road.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-[#0b2f5a] text-white py-20 lg:py-24 relative overflow-hidden"
    >
      {/* Subtle accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_50%)] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-6">

        {/* Heading */}
        <div
          className={`text-center max-w-2xl mx-auto transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Coverage Options That <span className="text-cyan-300">Fit Your Needs</span>
          </h2>
          <p className="mt-4 text-white/80 text-lg">
            Flexible insurance solutions built to match your lifestyle and driving habits.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 flex flex-col lg:flex-row gap-8">

          {coverageTypes.map((item, index) => (
            <div
              key={index}
              className={`flex-1 min-w-60 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 transition-all duration-700 hover:-translate-y-2 hover:border-cyan-400/40 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-cyan-300 mb-4">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>

              <p className="text-white/80 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
