import React, { useEffect, useRef, useState } from "react";

export default function HowItWorks() {
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

  const steps = [
    {
      number: "01",
      title: "Request a Quote",
      desc: "Provide a few simple details about your vehicle and driving needs.",
    },
    {
      number: "02",
      title: "Compare & Customize",
      desc: "Choose the coverage plan that best fits your lifestyle and budget.",
    },
    {
      number: "03",
      title: "Get Covered",
      desc: "Activate your policy quickly and drive with complete confidence.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-slate-100 text-slate-900 py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6">

        {/* Heading */}
        <div
          className={`text-center max-w-2xl mx-auto transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            How It <span className="text-cyan-500">Works</span>
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            A simple three-step process designed to get you insured quickly and stress-free.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 flex flex-col lg:flex-row gap-8">

          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex-1 bg-white border border-slate-200 shadow-md rounded-2xl p-8 transition-all duration-700 hover:-translate-y-2 hover:shadow-lg ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="text-cyan-500 text-3xl font-bold mb-4">
                {step.number}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {step.title}
              </h3>

              <p className="text-slate-600 leading-relaxed text-sm">
                {step.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
