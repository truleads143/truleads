import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; // Add this import
// ... other imports
import { Shield, CheckCircle, TrendingUp, Users, Clock, Target, Award, Zap, Heart, FileCheck, DollarSign, ArrowRight } from 'lucide-react';

export default function FinalExpenseLeads() {
  const navigate = useNavigate(); // Initialize useNavigate
  const keyFeatures = [
    {
      icon: <CheckCircle className="w-8 h-8" style={{ color: '#A67C37' }} />,
      title: "Pre-Qualified Prospects",
      description: "We vet leads for interest and eligibility, ensuring you connect with those genuinely looking for final expense insurance."
    },
    {
      icon: <FileCheck className="w-8 h-8" style={{ color: '#A67C37' }} />,
      title: "No Medical Exam Leads",
      description: "Leverage leads who are attracted to policies that don't require a medical exam, expanding your market to include seniors or those with health concerns."
    },
    {
      icon: <Zap className="w-8 h-8" style={{ color: '#A67C37' }} />,
      title: "Instant Engagement",
      description: "Our leads are ready for immediate follow-up, allowing you to capitalize on the urgency of their need."
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-10 h-10" style={{ color: '#0F2A4A' }} />,
      title: "High Conversion Rates",
      description: "With our targeted final expense leads, your sales team can focus on closing deals rather than prospecting."
    },
    {
      icon: <DollarSign className="w-10 h-10" style={{ color: '#0F2A4A' }} />,
      title: "Cost-Effective",
      description: "Save on marketing expenses by directly reaching those interested in funeral expense insurance."
    },
    {
      icon: <Clock className="w-10 h-10" style={{ color: '#0F2A4A' }} />,
      title: "Quick ROI",
      description: "Our leads can lead to fast sales, with some policies offering payouts within 24 hours of claim approval."
    }
  ];

  const qualityFactors = [
    {
      icon: <Users className="w-6 h-6" style={{ color: '#A67C37' }} />,
      title: "Age",
      description: "Leads are often older individuals, which means higher premiums but also higher motivation to secure coverage."
    },
    {
      icon: <Heart className="w-6 h-6" style={{ color: '#A67C37' }} />,
      title: "Health",
      description: "We provide leads for those who might not qualify for other insurance types due to health, yet are still insurable for final expenses."
    },
    {
      icon: <DollarSign className="w-6 h-6" style={{ color: '#A67C37' }} />,
      title: "Financial Preparedness",
      description: "Leads include those looking to ease the financial burden on their estate or loved ones."
    }
  ];

  const whyPurchase = [
    {
      icon: <Target className="w-7 h-7" style={{ color: '#0F2A4A' }} />,
      title: "Exclusive Leads",
      description: "Avoid competition by securing exclusive final expense leads."
    },
    {
      icon: <Zap className="w-7 h-7" style={{ color: '#0F2A4A' }} />,
      title: "Real-Time Data",
      description: "Leads are delivered in real-time, ensuring you're the first to engage with potential clients."
    },
    {
      icon: <CheckCircle className="w-7 h-7" style={{ color: '#0F2A4A' }} />,
      title: "Diverse Lead Options",
      description: "Choose from shared or exclusive leads based on your sales strategy and budget."
    }
  ];

  const commitments = [
    {
      icon: <Award className="w-6 h-6" style={{ color: '#A67C37' }} />,
      title: "Lead Quality Guarantee",
      description: "Our leads come with a satisfaction guarantee, ensuring you get what you pay for."
    },
    {
      icon: <Shield className="w-6 h-6" style={{ color: '#A67C37' }} />,
      title: "Compliance and Privacy",
      description: "We adhere to strict data protection standards, ensuring your leads are both ethical and legal."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F2A4A 0%, #1B3D66 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Final Expense Leads
            </h1>
            <p className="text-xl md:text-2xl text-white mb-6 max-w-4xl mx-auto opacity-95 leading-relaxed">
              Welcome to TruLeads LLC, where we specialize in providing high-quality final expense leads to boost your B2B insurance sales.
            </p>
            <p className="text-lg text-white max-w-4xl mx-auto opacity-90 mb-8">
              Final expense insurance addresses the costs associated with the end of life, such as funeral expenses, medical bills, and small debts, making it a critical product for your clients to secure their legacy without burdening their loved ones.
            </p>
            <button onClick={() => navigate('/query')} className="px-8 py-4 bg-white rounded font-semibold text-lg transition-all hover:shadow-xl flex items-center mx-auto space-x-2 cursor-pointer hover:bg-cyan-300" style={{ color: '#0F2A4A' }}>
              <span>Get High-Quality Leads</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full" style={{ backgroundColor: '#ECE0C6' }}></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full" style={{ backgroundColor: '#DCC59A' }}></div>
        </div>
      </section>

      {/* Understanding Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#0F2A4A' }}>
              Understanding Final Expense Leads
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: '#5B6170' }}>
              Final expense leads represent individuals or their decision-makers seeking coverage for end-of-life expenses through whole life insurance tailored for this purpose.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
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
                <p style={{ color: '#5B6170' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20" style={{ backgroundColor: '#F6F2EA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6" style={{ color: '#0F2A4A' }}>
            Benefits of Our Final Expense Leads
          </h2>
          <p className="text-center mb-16 text-lg" style={{ color: '#5B6170' }}>
            Transform your insurance sales with our targeted lead generation
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-sm shadow-lg text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#ECE0C6' }}>
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#0F2A4A' }}>
                  {benefit.title}
                </h3>
                <p className="text-lg" style={{ color: '#5B6170' }}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Factors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6" style={{ color: '#0F2A4A' }}>
            Factors Influencing Lead Quality
          </h2>
          <p className="text-center mb-16 text-lg" style={{ color: '#5B6170' }}>
            We carefully evaluate multiple factors to ensure premium lead quality
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {qualityFactors.map((factor, index) => (
              <div 
                key={index}
                className="p-8 rounded-sm hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: '#F6F2EA' }}
              >
                <div className="w-14 h-14 rounded-full mb-6 flex items-center justify-center" style={{ backgroundColor: '#ECE0C6' }}>
                  {factor.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#0F2A4A' }}>
                  {factor.title}
                </h3>
                <p style={{ color: '#5B6170' }}>{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Purchase Section */}
      <section className="py-20" style={{ backgroundColor: '#F6F2EA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6" style={{ color: '#0F2A4A' }}>
            Why Purchase Leads from Us?
          </h2>
          <p className="text-center mb-16 text-lg" style={{ color: '#5B6170' }}>
            Experience the TruLeads LLC advantage
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {whyPurchase.map((reason, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ECE0C6' }}>
                    {reason.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#0F2A4A' }}>
                      {reason.title}
                    </h3>
                    <p style={{ color: '#5B6170' }}>{reason.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6" style={{ color: '#0F2A4A' }}>
            Our Commitment to Quality
          </h2>
          <p className="text-center mb-16 text-lg" style={{ color: '#5B6170' }}>
            Your success is built on trust and quality assurance
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {commitments.map((commitment, index) => (
              <div 
                key={index}
                className="p-8 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: '#F6F2EA' }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ECE0C6' }}>
                    {commitment.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#0F2A4A' }}>
                      {commitment.title}
                    </h3>
                    <p style={{ color: '#5B6170' }}>{commitment.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why TruLeads Section */}
      <section className="py-20" style={{ backgroundColor: '#F6F2EA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-sm shadow-2xl p-12 md:p-16 text-center">
            <Shield className="w-20 h-20 mx-auto mb-6" style={{ color: '#A67C37' }} />
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#0F2A4A' }}>
              Why TruLeads LLC?
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto leading-relaxed" style={{ color: '#5B6170' }}>
              We are your partner in life insurance lead generation, offering final expense insurance leads that are ready to convert into sales. With our no medical exam leads and immediate coverage leads, your business can thrive in the competitive landscape of insurance sales.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 rounded" style={{ backgroundColor: '#F6F2EA' }}>
                <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: '#A67C37' }} />
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0F2A4A' }}>No Medical Exam Leads</h3>
                <p className="text-sm" style={{ color: '#5B6170' }}>Expand your market reach</p>
              </div>
              <div className="p-6 rounded" style={{ backgroundColor: '#F6F2EA' }}>
                <Zap className="w-12 h-12 mx-auto mb-4" style={{ color: '#A67C37' }} />
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0F2A4A' }}>Immediate Coverage</h3>
                <p className="text-sm" style={{ color: '#5B6170' }}>Fast policy activation</p>
              </div>
              <div className="p-6 rounded" style={{ backgroundColor: '#F6F2EA' }}>
                <TrendingUp className="w-12 h-12 mx-auto mb-4" style={{ color: '#A67C37' }} />
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0F2A4A' }}>Ready to Convert</h3>
                <p className="text-sm" style={{ color: '#5B6170' }}>Pre-qualified prospects</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-sm p-12 md:p-20 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F2A4A 0%, #1B3D66 100%)' }}>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Start Now
              </h2>
              <p className="text-xl text-white opacity-95 max-w-3xl mx-auto mb-8">
                Take the first step towards securing high-quality final expense leads for your business. Transform your sales process today.
              </p>
              <button className="px-10 py-5 bg-white rounded font-bold text-xl transition-all hover:shadow-2xl inline-flex items-center space-x-3 cursor-pointer hover:bg-cyan-300" style={{ color: '#0F2A4A' }}
              onClick={() => navigate('/query')}
              >
                <span>Get Started Today</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full" style={{ backgroundColor: '#ECE0C6' }}></div>
              <div className="absolute top-1/2 right-20 w-64 h-64 rounded-full" style={{ backgroundColor: '#DCC59A' }}></div>
              <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full" style={{ backgroundColor: '#ECE0C6' }}></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}