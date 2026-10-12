import React from 'react';
import { useNavigate } from "react-router-dom"; // Add this import
// ... other imports
import { Shield, CheckCircle, TrendingUp, Users, Clock, Target, Award, Zap, Heart, FileCheck, DollarSign, ArrowRight, BarChart3, Globe, Settings, Smartphone } from 'lucide-react';

export default function MedicareAdvantage() {
  const navigate = useNavigate(); // Initialize useNavigate
  const whyLeads = [
    {
      icon: <Target className="w-8 h-8" style={{ color: '#06B6D4' }} />,
      title: "Targeted Marketing",
      description: "Focus on a demographic with a clear need for Medicare plans."
    },
    {
      icon: <TrendingUp className="w-8 h-8" style={{ color: '#06B6D4' }} />,
      title: "High Conversion Rates",
      description: "Leads are motivated and often in the decision-making phase, ready to enroll."
    },
    {
      icon: <Shield className="w-8 h-8" style={{ color: '#06B6D4' }} />,
      title: "Regulatory Compliance",
      description: "With constant updates from CMS, our leads come with assurance of compliance, ensuring your marketing efforts are both effective and legal."
    }
  ];

  const benefits = [
    {
      icon: <Award className="w-10 h-10" style={{ color: '#124D95' }} />,
      title: "Exclusive Leads",
      description: "Compete less by securing leads that are only shared with you."
    },
    {
      icon: <Zap className="w-10 h-10" style={{ color: '#124D95' }} />,
      title: "Real-Time Engagement",
      description: "Immediate connection with prospects who are actively seeking Medicare options."
    },
    {
      icon: <CheckCircle className="w-10 h-10" style={{ color: '#124D95' }} />,
      title: "Quality Assurance",
      description: "Leads are vetted to ensure they meet the criteria for Medicare Advantage, offering high conversion potential."
    }
  ];

  const strategy = [
    {
      icon: <Globe className="w-7 h-7" style={{ color: '#06B6D4' }} />,
      title: "Multi-Channel Outreach",
      description: "Leverage multi-channel approach to engage prospects where they are most receptive."
    },
    {
      icon: <Settings className="w-7 h-7" style={{ color: '#06B6D4' }} />,
      title: "CRM Integration",
      description: "Use advanced CRM tools to manage your leads efficiently, ensuring no opportunity slips through the cracks."
    },
    {
      icon: <Shield className="w-7 h-7" style={{ color: '#06B6D4' }} />,
      title: "Compliance and Optimization",
      description: "Our team stays ahead of CMS regulations and industry trends, ensuring your campaigns are always compliant and effective."
    }
  ];

  const valueDelivery = [
    {
      icon: <Smartphone className="w-8 h-8" style={{ color: '#124D95' }} />,
      title: "Medicare Calls & Leads",
      description: "Connect with motivated beneficiaries through inbound calls and leads, designed to turn into policies."
    },
    {
      icon: <Users className="w-8 h-8" style={{ color: '#124D95' }} />,
      title: "Traffic Partners",
      description: "Utilize our partnerships for targeted advertising, reaching the right customer at the right time."
    },
    {
      icon: <Target className="w-8 h-8" style={{ color: '#124D95' }} />,
      title: "Custom Campaigns",
      description: "Tailor lead generation to your specific needs, whether for Annual Enrollment Period (AEP), T65, or Dual-eligible Special Needs Plans (D-SNPs)."
    }
  ];

  const roiStats = [
    {
      percentage: "25%",
      title: "Conversion Rate Increase",
      description: "Average increase in conversion rates with our leads"
    },
    {
      percentage: "70%",
      title: "Lead Quality",
      description: "Leads result in meaningful conversations with 3:1 ROI boost"
    },
    {
      percentage: "20%",
      title: "Client Retention",
      description: "Improvement in client retention with personalized lead strategies"
    }
  ];

  const leadConcepts = [
    {
      icon: <Target className="w-6 h-6" style={{ color: '#06B6D4' }} />,
      title: "Hyper-Focused",
      description: "We use data from top brokers to pinpoint your ideal customer."
    },
    {
      icon: <TrendingUp className="w-6 h-6" style={{ color: '#06B6D4' }} />,
      title: "High-Intent",
      description: "We ensure leads are genuinely interested in Medicare products."
    },
    {
      icon: <Zap className="w-6 h-6" style={{ color: '#06B6D4' }} />,
      title: "Real-Time",
      description: "Get immediate feedback and results, allowing for agile marketing adjustments."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #124D95 0%, #06B6D4 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Medicare Advantage Leads
              </h1>
              <p className="text-xl text-white mb-6 opacity-95 leading-relaxed">
                Welcome to TruLeads LLC, your pivotal partner for expanding in the lucrative Medicare Advantage market.
              </p>
              <p className="text-lg text-white opacity-90 mb-8">
                We specialize in providing high-quality Medicare Advantage leads to insurance agencies, brokers, and marketers looking to tap into an ever-growing demographic of Baby Boomers entering Medicare eligibility.
              </p>
              <button onClick={() => navigate('/query')} className="px-8 py-4 bg-white rounded-lg font-semibold text-lg transition-all hover:shadow-xl flex items-center space-x-2 cursor-pointer hover:bg-cyan-300" style={{ color: '#124D95' }}>
                <span>Start Growing Today</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=600&fit=crop" 
                alt="Senior couple reviewing Medicare options"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 rounded-full" style={{ backgroundColor: '#A5F3FC' }}></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full" style={{ backgroundColor: '#67E8F9' }}></div>
        </div>
      </section>

      {/* Why Medicare Advantage Leads Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#124D95' }}>
              Why Medicare Advantage Leads?
            </h2>
            <p className="text-lg max-w-4xl mx-auto" style={{ color: '#6B7280' }}>
              Medicare Advantage leads are individuals or soon-to-be Medicare beneficiaries searching for comprehensive health plans beyond traditional Medicare. Here's why these leads are invaluable for your B2B insurance business:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyLeads.map((item, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4"
                style={{ borderColor: '#06B6D4' }}
              >
                <div className="w-16 h-16 rounded-full mb-6 flex items-center justify-center" style={{ backgroundColor: '#A5F3FC' }}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#124D95' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#6B7280' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section with Image */}
      <section className="py-20" style={{ backgroundColor: '#F3F4F6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6" style={{ color: '#124D95' }}>
            Benefits of Our Medicare Advantage Leads Service
          </h2>
          <p className="text-center mb-16 text-lg" style={{ color: '#6B7280' }}>
            Experience unparalleled lead quality and service excellence
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://wyomingfamilypractice.com/wp-content/uploads/2023/02/mission-1536x1024.jpg" 
                alt="Insurance agent helping senior client"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="order-1 md:order-2 space-y-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#A5F3FC' }}>
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: '#124D95' }}>
                        {benefit.title}
                      </h3>
                      <p style={{ color: '#6B7280' }}>{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why TruLeads Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Shield className="w-20 h-20 mx-auto mb-6" style={{ color: '#06B6D4' }} />
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#124D95' }}>
              Why TruLeads LLC?
            </h2>
            <p className="text-xl leading-relaxed" style={{ color: '#6B7280' }}>
              We offer a seamless integration of lead generation with your existing business model. With our Medicare Advantage lead generation, your agency can thrive by providing unparalleled service to those seeking Medicare coverage.
            </p>
          </div>
        </div>
      </section>

      {/* Lead Generation Strategy Section */}
      <section className="py-20" style={{ backgroundColor: '#F3F4F6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6" style={{ color: '#124D95' }}>
            Our Lead Generation Strategy
          </h2>
          <p className="text-center mb-16 text-lg" style={{ color: '#6B7280' }}>
            Advanced strategies to connect you with qualified prospects
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {strategy.map((item, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full mb-6 flex items-center justify-center" style={{ backgroundColor: '#A5F3FC' }}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#124D95' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#6B7280' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Delivery Section with Image */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6" style={{ color: '#124D95' }}>
            How We Deliver Value
          </h2>
          <p className="text-center mb-16 text-lg" style={{ color: '#6B7280' }}>
            Comprehensive solutions tailored to your business needs
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {valueDelivery.map((item, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: '#F3F4F6' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#A5F3FC' }}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: '#124D95' }}>
                        {item.title}
                      </h3>
                      <p style={{ color: '#6B7280' }}>{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=500&fit=crop" 
                alt="Business professional on phone call"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ROI Statistics Section */}
      <section className="py-20" style={{ backgroundColor: '#F3F4F6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6" style={{ color: '#124D95' }}>
            ROI Statistics for Our Clients
          </h2>
          <p className="text-center mb-16 text-lg" style={{ color: '#6B7280' }}>
            Real results from real clients
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {roiStats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300"
              >
                <div className="text-6xl font-bold mb-4" style={{ color: '#06B6D4' }}>
                  {stat.percentage}
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#124D95' }}>
                  {stat.title}
                </h3>
                <p style={{ color: '#6B7280' }}>{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section with Image */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6" style={{ color: '#124D95' }}>
            Compliance and Industry Knowledge
          </h2>
          <p className="text-center mb-16 text-lg" style={{ color: '#6B7280' }}>
            The Medicare industry evolves rapidly, with new CMS regulations shaping how we can market
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=500&fit=crop" 
                alt="Compliance documents and regulations"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4" style={{ borderColor: '#06B6D4' }}>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-8 h-8 flex-shrink-0" style={{ color: '#06B6D4' }} />
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#124D95' }}>
                      Stays Updated
                    </h3>
                    <p style={{ color: '#6B7280' }}>
                      We keep abreast of all CMS rules to ensure your leads are compliant.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4" style={{ borderColor: '#06B6D4' }}>
                <div className="flex items-start gap-4">
                  <FileCheck className="w-8 h-8 flex-shrink-0" style={{ color: '#06B6D4' }} />
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#124D95' }}>
                      Educates
                    </h3>
                    <p style={{ color: '#6B7280' }}>
                      We provide insights on how to navigate enrollment periods like AEP and understand the nuances of D-SNP marketing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Concepts Section */}
      <section className="py-20" style={{ backgroundColor: '#F3F4F6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#124D95' }}>
              Lead Concepts - Exclusive Medicare Leads
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: '#6B7280' }}>
              Whether you're targeting Medicare Advantage HMO, PPO, or D-SNPs, our leads are:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {leadConcepts.map((concept, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 rounded-full mb-6 mx-auto flex items-center justify-center" style={{ backgroundColor: '#A5F3FC' }}>
                  {concept.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#124D95' }}>
                  {concept.title}
                </h3>
                <p style={{ color: '#6B7280' }}>{concept.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-12 md:p-20 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #124D95 0%, #06B6D4 100%)' }}>
            <div className="relative z-10">
              <BarChart3 className="w-20 h-20 mx-auto mb-6 text-white" />
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Ready to Dominate the Medicare Market?
              </h2>
              <p className="text-xl text-white opacity-95 max-w-3xl mx-auto mb-8">
                Join the leading insurance agencies who trust TruLeads LLC for their Medicare Advantage lead generation. Start converting more prospects today.
              </p>
              <button className="px-10 py-5 bg-white rounded-lg font-bold text-xl transition-all hover:shadow-2xl inline-flex items-center space-x-3 cursor-pointer hover:bg-cyan-300" style={{ color: '#124D95' }}
              onClick={() => navigate('/query')}
              >
                <span>Get Premium Leads Now</span>
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