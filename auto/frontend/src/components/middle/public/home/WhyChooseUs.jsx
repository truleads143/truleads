import React, { useEffect, useRef, useState } from "react";
import { ShieldCheck, Clock, DollarSign, Headphones } from "lucide-react";

export default function WhyChooseUs() {
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

  const features = [
    {
      icon: <ShieldCheck size={28} />,
      title: "Trusted Protection",
      desc: "Comprehensive coverage designed to keep you protected in every situation.",
    },
    {
      icon: <DollarSign size={28} />,
      title: "Affordable Plans",
      desc: "Flexible pricing options that fit your budget without compromising quality.",
    },
    {
      icon: <Clock size={28} />,
      title: "Fast Approval",
      desc: "Quick quote process and smooth policy activation without delays.",
    },
    {
      icon: <Headphones size={28} />,
      title: "24/7 Support",
      desc: "Dedicated advisors ready to assist you anytime you need help.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-slate-50 text-slate-900 py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6">

        {/* Heading */}
        <div
          className={`text-center max-w-2xl mx-auto transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Why Choose <span className="text-cyan-500">TruAuto Insurance</span>
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            We combine reliability, affordability, and expert guidance to give you
            complete confidence on the road.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 flex flex-col lg:flex-row gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className={`flex-1 min-w-60 bg-white border border-slate-200 shadow-lg rounded-2xl p-6 transition-all duration-700 hover:-translate-y-2 hover:shadow-xl ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-cyan-500 mb-4">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>

              <p className="text-slate-600 leading-relaxed text-sm">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
