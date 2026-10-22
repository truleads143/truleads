import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; // Add this import
// ... other imports
import image from "../../../assets/guy_with_laptop.png"
import { CheckCircle2, Shield, Zap, Users, TrendingUp, Clock, Phone, ArrowRight, Mail } from 'lucide-react';

export default function ACALiveTransfers() {
  const navigate = useNavigate(); // Initialize useNavigate
  const features = [
    {
      title: "1. Simplified Custom Orders",
      description: "Need a large or complex custom order? Keep it simple with our hands-on, white-glove service. Just call us for personalized assistance tailored to your needs.",
      icon: <Phone className="w-8 h-8" style={{ color: '#A67C37' }} />
    },
    {
      title: "2. Get the Leads You Want, Your Way",
      description: "We understand that one size doesn't fit all. That's why we offer:",
      icon: <Users className="w-8 h-8" style={{ color: '#A67C37' }} />,
      list: [
        { label: "Pre-Qualified Leads", text: "Prospects are pre-screened for ACA eligibility, ensuring you only talk to those who qualify." },
        { label: "Real-Time Connection", text: "Engage with prospects the moment they show interest, dramatically increasing conversion rates." },
        { label: "Higher Conversion Rates", text: "With direct access to interested individuals, your sales success rate soars." }
      ]
    },
    {
      title: "3. Mutual Love Between Policyholders and Agents",
      description: "Policyholders love their agents for the support provided. In turn, agents love us for the same reason – we provide:",
      icon: <TrendingUp className="w-8 h-8" style={{ color: '#A67C37' }} />,
      list: [
        { label: "Time Efficiency", text: "Focus on selling rather than prospecting with leads ready to engage." },
        { label: "Reduced Effort", text: "No more chasing uninterested parties; we bring motivated buyers directly to you." },
        { label: "Exclusive Leads", text: "Compete less by choosing leads that engage only with your team." }
      ]
    }
  ];

  const benefits = [
    { icon: <Zap className="w-8 h-8" style={{ color: '#0F2A4A' }} />, label: "Instant Engagement", text: "Start conversations immediately, addressing questions and concerns on the spot." },
    { icon: <TrendingUp className="w-8 h-8" style={{ color: '#0F2A4A' }} />, label: "Increased ROI", text: "Convert more leads into sales, maximizing your marketing dollar." },
    { icon: <Users className="w-8 h-8" style={{ color: '#0F2A4A' }} />, label: "Customizable Lead Options", text: "Whether it's shared or exclusive leads, we tailor to your business strategy." },
    { icon: <Clock className="w-8 h-8" style={{ color: '#0F2A4A' }} />, label: "Scalable Sales Process", text: "A consistent flow of leads means scalable and growing sales." }
  ];

  const offerings = [
    { icon: <CheckCircle2 className="w-6 h-6" style={{ color: '#A67C37' }} />, label: "Call Verified Leads", text: "Ensuring the interest is genuine before the transfer." },
    { icon: <Shield className="w-6 h-6" style={{ color: '#A67C37' }} />, label: "Guaranteed Exclusivity", text: "Your leads, yours alone, for a set period." },
    { icon: <CheckCircle2 className="w-6 h-6" style={{ color: '#A67C37' }} />, label: "Quality Assurance", text: "Our first 5-day return policy guarantees lead quality." },
    { icon: <Zap className="w-6 h-6" style={{ color: '#A67C37' }} />, label: "Real-Time Delivery", text: "Leads are transferred to you as they come in, keeping the process live and dynamic." },
    { icon: <Users className="w-6 h-6" style={{ color: '#A67C37' }} />, label: "CRM Integration", text: "Seamlessly integrate our leads into your existing Customer Relationship Management system." },
    { icon: <CheckCircle2 className="w-6 h-6" style={{ color: '#A67C37' }} />, label: "No Strings Attached", text: "No long-term contracts or upfront costs; start small and scale as you see fit." }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F2A4A 0%, #1B3D66 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              ACA Live Transfers
            </h1>
            <p className="text-xl md:text-2xl text-white mb-4 opacity-95">
              Your Path to Efficient Insurance Sales
            </p>
            <p className="text-lg text-white max-w-4xl mx-auto opacity-90 mb-8">
              Welcome to the future of health insurance lead generation with ACA Live Transfers! Here, we simplify the complex world of Affordable Care Act (ACA) and Obamacare leads, ensuring your sales process is both effective and efficient.
            </p>
            <button onClick={() => navigate('/query')} className="px-8 py-4 bg-white rounded font-semibold text-lg transition-all hover:shadow-xl flex items-center mx-auto space-x-2 cursor-pointer hover:bg-cyan-300" style={{ color: '#0F2A4A' }}>
              <span>Start Buying More Today</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full" style={{ backgroundColor: '#ECE0C6' }}></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full" style={{ backgroundColor: '#DCC59A' }}></div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6" style={{ color: '#0F2A4A' }}>
            Why Choose Our ACA Live Transfer Leads?
          </h2>
          <p className="text-center mb-16 text-lg" style={{ color: '#5B6170' }}>
            Three powerful reasons to transform your insurance sales process
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-sm shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4"
                style={{ borderColor: '#A67C37' }}
              >
                <div className="w-16 h-16 rounded-full mb-6 flex items-center justify-center" style={{ backgroundColor: '#ECE0C6' }}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#0F2A4A' }}>
                  {feature.title}
                </h3>
                <p className="mb-6" style={{ color: '#5B6170' }}>{feature.description}</p>
                {feature.list && (
                  <ul className="space-y-4">
                    {feature.list.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#A67C37' }} />
                        <div>
                          <span className="font-semibold block" style={{ color: '#0F2A4A' }}>{item.label}</span>
                          <span className="text-sm" style={{ color: '#5B6170' }}>{item.text}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20" style={{ backgroundColor: '#F6F2EA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6" style={{ color: '#0F2A4A' }}>
            Benefits of Our ACA Health Insurance Live Transfer Leads
          </h2>
          <p className="text-center mb-16 text-lg" style={{ color: '#5B6170' }}>
            Experience the advantages that set us apart
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-start gap-6 p-8 bg-white rounded-sm shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ECE0C6' }}>
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#0F2A4A' }}>{benefit.label}</h3>
                  <p style={{ color: '#5B6170' }}>{benefit.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6" style={{ color: '#0F2A4A' }}>
            What We Offer
          </h2>
          <p className="text-center mb-16 text-lg" style={{ color: '#5B6170' }}>
            Comprehensive solutions for your lead generation needs
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {offerings.map((offering, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 rounded-sm hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: '#F6F2EA' }}
              >
                <div className="flex-shrink-0 mt-1">
                  {offering.icon}
                </div>
                <div>
                  <h3 className="font-bold mb-2" style={{ color: '#0F2A4A' }}>{offering.label}</h3>
                  <p className="text-sm" style={{ color: '#5B6170' }}>{offering.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-20" style={{ backgroundColor: '#F6F2EA' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-sm overflow-hidden shadow-2xl">
            <img 
              src={image}
              alt="ACA Live Transfers Service"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-sm p-12 md:p-16 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F2A4A 0%, #1B3D66 100%)' }}>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Start Selling More Efficiently Today
              </h2>
              <p className="text-lg text-white opacity-95 max-w-3xl mx-auto mb-8">
                With our ACA Live Transfer Leads, you're not just buying leads; you're investing in a streamlined, high-conversion sales strategy. Whether you're looking to grow your customer base or simply want to make your sales process more efficient, we've got you covered.
              </p>
              <button className="px-8 py-4 bg-white rounded font-semibold text-lg transition-all hover:shadow-xl inline-flex items-center space-x-2 cursor-pointer hover:bg-cyan-300" style={{ color: '#0F2A4A' }}
              onClick={() => navigate('/query')}
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full" style={{ backgroundColor: '#ECE0C6' }}></div>
              <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full" style={{ backgroundColor: '#DCC59A' }}></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}