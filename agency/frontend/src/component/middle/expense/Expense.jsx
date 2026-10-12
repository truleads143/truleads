import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; // Add this import
// ... other imports
import { Shield, CheckCircle, TrendingUp, Users, Clock, Target, Award, Zap, Heart, FileCheck, DollarSign, ArrowRight } from 'lucide-react';

export default function FinalExpenseLeads() {
  const navigate = useNavigate(); // Initialize useNavigate
  const keyFeatures = [
    {
      icon: <CheckCircle className="w-8 h-8" style={{ color: '#06B6D4' }} />,
      title: "Pre-Qualified Prospects",
      description: "We vet leads for interest and eligibility, ensuring you connect with those genuinely looking for final expense insurance."
    },
    {
      icon: <FileCheck className="w-8 h-8" style={{ color: '#06B6D4' }} />,
      title: "No Medical Exam Leads",
      description: "Leverage leads who are attracted to policies that don't require a medical exam, expanding your market to include seniors or those with health concerns."
    },
    {
      icon: <Zap className="w-8 h-8" style={{ color: '#06B6D4' }} />,
      title: "Instant Engagement",
      description: "Our leads are ready for immediate follow-up, allowing you to capitalize on the urgency of their need."
    }
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-10 h-10" style={{ color: '#124D95' }} />,
      title: "High Conversion Rates",
      description: "With our targeted final expense leads, your sales team can focus on closing deals rather than prospecting."
    },
    {
      icon: <DollarSign className="w-10 h-10" style={{ color: '#124D95' }} />,
      title: "Cost-Effective",
      description: "Save on marketing expenses by directly reaching those interested in funeral expense insurance."
    },
    {
      icon: <Clock className="w-10 h-10" style={{ color: '#124D95' }} />,
      title: "Quick ROI",
      description: "Our leads can lead to fast sales, with some policies offering payouts within 24 hours of claim approval."
    }
  ];

  const qualityFactors = [
    {
      icon: <Users className="w-6 h-6" style={{ color: '#06B6D4' }} />,
      title: "Age",
      description: "Leads are often older individuals, which means higher premiums but also higher motivation to secure coverage."
    },
    {
      icon: <Heart className="w-6 h-6" style={{ color: '#06B6D4' }} />,
      title: "Health",
      description: "We provide leads for those who might not qualify for other insurance types due to health, yet are still insurable for final expenses."
    },
    {
      icon: <DollarSign className="w-6 h-6" style={{ color: '#06B6D4' }} />,
      title: "Financial Preparedness",
      description: "Leads include those looking to ease the financial burden on their estate or loved ones."
    }
  ];

  const whyPurchase = [
    {
      icon: <Target className="w-7 h-7" style={{ color: '#124D95' }} />,
      title: "Exclusive Leads",
      description: "Avoid competition by securing exclusive final expense leads."
    },
    {
      icon: <Zap className="w-7 h-7" style={{ color: '#124D95' }} />,
      title: "Real-Time Data",
      description: "Leads are delivered in real-time, ensuring you're the first to engage with potential clients."
    },
    {
      icon: <CheckCircle className="w-7 h-7" style={{ color: '#124D95' }} />,
      title: "Diverse Lead Options",
      description: "Choose from shared or exclusive leads based on your sales strategy and budget."
    }
  ];

  const commitments = [
    {
      icon: <Award className="w-6 h-6" style={{ color: '#06B6D4' }} />,
      title: "Lead Quality Guarantee",
      description: "Our leads come with a satisfaction guarantee, ensuring you get what you pay for."
    },
    {
      icon: <Shield className="w-6 h-6" style={{ color: '#06B6D4' }} />,
      title: "Compliance and Privacy",
      description: "We adhere to strict data protection standards, ensuring your leads are both ethical and legal."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #124D95 0%, #06B6D4 100%)' }}>
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
            <button onClick={() => navigate('/query')} className="px-8 py-4 bg-white rounded-lg font-semibold text-lg transition-all hover:shadow-xl flex items-center mx-auto space-x-2 cursor-pointer hover:bg-cyan-300" style={{ color: '#124D95' }}>
              <span>Get High-Quality Leads</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full" style={{ backgroundColor: '#A5F3FC' }}></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full" style={{ backgroundColor: '#67E8F9' }}></div>
        </div>
      </section>

      {/* Understanding Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#124D95' }}>
              Understanding Final Expense Leads
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: '#6B7280' }}>
              Final expense leads represent individuals or their decision-makers seeking coverage for end-of-life expenses through whole life insurance tailored for this purpose.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4"
                style={{ borderColor: '#06B6D4' }}
              >
                <div className="w-16 h-16 rounded-full mb-6 flex items-center justify-center" style={{ backgroundColor: '#A5F3FC' }}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#124D95' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#6B7280' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20" style={{ backgroundColor: '#F3F4F6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6" style={{ color: '#124D95' }}>
            Benefits of Our Final Expense Leads
          </h2>
          <p className="text-center mb-16 text-lg" style={{ color: '#6B7280' }}>
            Transform your insurance sales with our targeted lead generation
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#A5F3FC' }}>
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#124D95' }}>
                  {benefit.title}
                </h3>
                <p className="text-lg" style={{ color: '#6B7280' }}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Factors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6" style={{ color: '#124D95' }}>
            Factors Influencing Lead Quality
          </h2>
          <p className="text-center mb-16 text-lg" style={{ color: '#6B7280' }}>
            We carefully evaluate multiple factors to ensure premium lead quality
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {qualityFactors.map((factor, index) => (
              <div 
                key={index}
                className="p-8 rounded-xl hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: '#F3F4F6' }}
              >
                <div className="w-14 h-14 rounded-full mb-6 flex items-center justify-center" style={{ backgroundColor: '#A5F3FC' }}>
                  {factor.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#124D95' }}>
                  {factor.title}
                </h3>
                <p style={{ color: '#6B7280' }}>{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Purchase Section */}
      <section className="py-20" style={{ backgroundColor: '#F3F4F6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6" style={{ color: '#124D95' }}>
            Why Purchase Leads from Us?
          </h2>
          <p className="text-center mb-16 text-lg" style={{ color: '#6B7280' }}>
            Experience the TruLeads LLC advantage
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {whyPurchase.map((reason, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#A5F3FC' }}>
                    {reason.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#124D95' }}>
                      {reason.title}
                    </h3>
                    <p style={{ color: '#6B7280' }}>{reason.description}</p>
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
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6" style={{ color: '#124D95' }}>
            Our Commitment to Quality
          </h2>
          <p className="text-center mb-16 text-lg" style={{ color: '#6B7280' }}>
            Your success is built on trust and quality assurance
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {commitments.map((commitment, index) => (
              <div 
                key={index}
                className="p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: '#F3F4F6' }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#A5F3FC' }}>
                    {commitment.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: '#124D95' }}>
                      {commitment.title}
                    </h3>
                    <p style={{ color: '#6B7280' }}>{commitment.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why TruLeads Section */}
      <section className="py-20" style={{ backgroundColor: '#F3F4F6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-12 md:p-16 text-center">
            <Shield className="w-20 h-20 mx-auto mb-6" style={{ color: '#06B6D4' }} />
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#124D95' }}>
              Why TruLeads LLC?
            </h2>
            <p className="text-xl mb-8 max-w-4xl mx-auto leading-relaxed" style={{ color: '#6B7280' }}>
              We are your partner in life insurance lead generation, offering final expense insurance leads that are ready to convert into sales. With our no medical exam leads and immediate coverage leads, your business can thrive in the competitive landscape of insurance sales.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 rounded-lg" style={{ backgroundColor: '#F3F4F6' }}>
                <CheckCircle className="w-12 h-12 mx-auto mb-4" style={{ color: '#06B6D4' }} />
                <h3 className="font-bold text-lg mb-2" style={{ color: '#124D95' }}>No Medical Exam Leads</h3>
                <p className="text-sm" style={{ color: '#6B7280' }}>Expand your market reach</p>
              </div>
              <div className="p-6 rounded-lg" style={{ backgroundColor: '#F3F4F6' }}>
                <Zap className="w-12 h-12 mx-auto mb-4" style={{ color: '#06B6D4' }} />
                <h3 className="font-bold text-lg mb-2" style={{ color: '#124D95' }}>Immediate Coverage</h3>
                <p className="text-sm" style={{ color: '#6B7280' }}>Fast policy activation</p>
              </div>
              <div className="p-6 rounded-lg" style={{ backgroundColor: '#F3F4F6' }}>
                <TrendingUp className="w-12 h-12 mx-auto mb-4" style={{ color: '#06B6D4' }} />
                <h3 className="font-bold text-lg mb-2" style={{ color: '#124D95' }}>Ready to Convert</h3>
                <p className="text-sm" style={{ color: '#6B7280' }}>Pre-qualified prospects</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-12 md:p-20 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #124D95 0%, #06B6D4 100%)' }}>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Start Now
              </h2>
              <p className="text-xl text-white opacity-95 max-w-3xl mx-auto mb-8">
                Take the first step towards securing high-quality final expense leads for your business. Transform your sales process today.
              </p>
              <button className="px-10 py-5 bg-white rounded-lg font-bold text-xl transition-all hover:shadow-2xl inline-flex items-center space-x-3 cursor-pointer hover:bg-cyan-300" style={{ color: '#124D95' }}
              onClick={() => navigate('/query')}
              >
                <span>Get Started Today</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full" style={{ backgroundColor: '#A5F3FC' }}></div>
              <div className="absolute top-1/2 right-20 w-64 h-64 rounded-full" style={{ backgroundColor: '#67E8F9' }}></div>
              <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full" style={{ backgroundColor: '#A5F3FC' }}></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}