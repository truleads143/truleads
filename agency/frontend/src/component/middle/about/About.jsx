import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; 
import { Phone, TrendingUp, Target, Shield, Clock, BarChart3, CheckCircle, ArrowRight } from 'lucide-react';

// Define the color palette for clarity
const colors = {
  'primary-blue': '#124D95',
  'cyan-200': '#A5F3FC',
  'cyan-300': '#67E8F9',
  'cyan-500': '#06B6D4',
  'gray-100': '#F3F4F6',
  'gray-200': '#E5E7EB',
  'gray-500': '#6B7280',
};

export default function LiveTransferLeads() {
  const navigate = useNavigate(); // Initialize useNavigate
  
  // Helper object for the Hero Button (Default State)
  const heroBtnStyle = {
    backgroundColor: '#FFFFFF',
    color: colors['primary-blue'],
  };
  // Helper object for the Hero Button (Hover State)
  const heroBtnHoverStyle = {
    backgroundColor: colors['cyan-200'], // Light cyan hover
    color: colors['primary-blue'],
  };


  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors['primary-blue']} 0%, ${colors['cyan-500']} 100%)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Live Transfer Leads: Boost Your Business Sales Effectively
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto opacity-95">
              Instantly connect with interested prospects and convert them into paying customers with our exclusive live transfer lead service
            </p>
            <button 
              onClick={() => navigate('/query')} 
              className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-xl flex items-center mx-auto space-x-2 cursor-pointer hover:bg-cyan-300"
              style={heroBtnStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, heroBtnHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, heroBtnStyle)}
            >
              <span>Start Growing Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full" style={{ backgroundColor: colors['cyan-200'] }}></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full" style={{ backgroundColor: colors['cyan-300'] }}></div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20" style={{ backgroundColor: colors['gray-100'] }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4" style={{ color: colors['primary-blue'] }}>
            How Live Transfer Leads Work
          </h2>
          <p className="text-center mb-16" style={{ color: colors['gray-500'] }}>
            A simple, effective process to connect you with qualified prospects
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: colors['cyan-200'] }}>
                <Target className="w-8 h-8" style={{ color: colors['primary-blue'] }} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: colors['primary-blue'] }}>1. Lead Generated</h3>
              <p style={{ color: colors['gray-500'] }}>
                A potential customer expresses interest through a web form, phone call, or email inquiry
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: colors['cyan-300'] }}>
                <Phone className="w-8 h-8" style={{ color: colors['primary-blue'] }} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: colors['primary-blue'] }}>2. Instant Transfer</h3>
              <p style={{ color: colors['gray-500'] }}>
                The lead is immediately transferred to your sales representative in real-time
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: colors['cyan-500'] }}>
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: colors['primary-blue'] }}>3. Close the Sale</h3>
              <p style={{ color: colors['gray-500'] }}>
                Your team initiates follow-up immediately, maximizing conversion opportunities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section (No changes requested, maintaining structure) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: colors['primary-blue'] }}>
            Benefits of Live Transfer Leads
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <Clock className="w-12 h-12" style={{ color: colors['cyan-500'] }} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: colors['primary-blue'] }}>Faster Response Time</h3>
                <p style={{ color: colors['gray-500'] }}>
                  Responding to leads promptly increases the likelihood of conversion. With live transfer leads, your sales team can connect with prospects in real time, improving engagement and response rates.
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <BarChart3 className="w-12 h-12" style={{ color: colors['cyan-500'] }} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: colors['primary-blue'] }}>Measurable Results</h3>
                <p className="mb-3" style={{ color: colors['gray-500'] }}>
                  Live transfer systems allow businesses to track key metrics, such as:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start" style={{ color: colors['gray-500'] }}>
                    <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" style={{ color: colors['cyan-500'] }} />
                    Conversion rates
                  </li>
                  <li className="flex items-start" style={{ color: colors['gray-500'] }}>
                    <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" style={{ color: colors['cyan-500'] }} />
                    Revenue from converted leads
                  </li>
                  <li className="flex items-start" style={{ color: colors['gray-500'] }}>
                    <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" style={{ color: colors['cyan-500'] }} />
                    The number of leads generated
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <TrendingUp className="w-12 h-12" style={{ color: colors['cyan-500'] }} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: colors['primary-blue'] }}>Higher ROI</h3>
                <p style={{ color: colors['gray-500'] }}>
                  Studies indicate that over 75% of sales go to the first company that contacts a prospect. Live transfers ensure you are the first to connect, significantly boosting your ROI compared to traditional lead generation methods.
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <Shield className="w-12 h-12" style={{ color: colors['cyan-500'] }} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: colors['primary-blue'] }}>Exclusive Leads</h3>
                <p style={{ color: colors['gray-500'] }}>
                  With live transfers, each lead is sent exclusively to your business. This eliminates competition and increases close rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing/Impact Section - IMPROVED RESPONSIVE SIZING */}
      <section className="py-12 sm:py-20" style={{ backgroundColor: colors['gray-100'] }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Responsive Heading: text-3xl on mobile, scales up to text-4xl on larger screens */}
          <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-12" style={{ color: colors['primary-blue'] }}>
            Our Impact So Far
          </h2>

          {/* Responsive Grid: Stacks on mobile, scales to 2 columns on small screens, and 4 on medium/desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Metric 1: Connections Published */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              {/* Responsive Metric Size: text-4xl on mobile, scales up to text-5xl on medium/desktop */}
              <h3 className="text-4xl sm:text-4xl font-bold mb-2" style={{ color: colors['cyan-500'] }}>15000+</h3>
              {/* Responsive description size: text-xs on mobile, scales up to text-sm */}
              <p className="text-xs sm:text-sm text-gray-500">Connections Published</p>
            </div>

            {/* Metric 2: Revenue Generated for Clients */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              {/* Responsive Metric Size: text-4xl on mobile, scales up to text-5xl on medium/desktop */}
              <h3 className="text-4xl sm:text-4xl font-bold mb-2" style={{ color: colors['cyan-500']}}>$50000+</h3>
              {/* Responsive description size: text-xs on mobile, scales up to text-sm */}
              <p className="text-xs sm:text-sm text-gray-500">Revenue Generated for Clients</p>
            </div>

            {/* Metric 3: Looking Ahead (Using smaller font to ensure text fits on tablets) */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              {/* Responsive Metric Size: text-2xl on mobile, scales up to text-3xl on medium/desktop */}
              <h3 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: colors['cyan-500']}}>Looking Ahead</h3>
              {/* Responsive description size: text-xs on mobile, scales up to text-sm */}
              <p className="text-xs sm:text-sm text-gray-500">Currently Seeking More Buyers to Scale</p>
            </div>

            {/* Metric 4: Average Call Length */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              {/* Responsive Metric Size: text-3xl on mobile, scales up to text-4xl on medium/desktop */}
              <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: colors['cyan-500']}}>11 Mins</h3>
              {/* Responsive description size: text-xs on mobile, scales up to text-sm */}
              <p className="text-xs sm:text-sm text-gray-500">Average Call Length</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section (No changes requested, maintaining structure) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-6" style={{ color: colors['primary-blue'] }}>
            Why Choose TruLeads LLC?
          </h2>
          <p className="text-center mb-16 text-lg" style={{ color: colors['gray-500'] }}>
            We specialize in delivering high-quality, exclusive live transfer leads that drive measurable results
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl" style={{ backgroundColor: colors['gray-100'] }}>
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: colors['cyan-200'] }}>
                <CheckCircle className="w-8 h-8" style={{ color: colors['primary-blue'] }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: colors['primary-blue'] }}>100% Contact Rate</h3>
              <p style={{ color: colors['gray-500'] }}>
                Every lead is verified and ready to engage
              </p>
            </div>

            <div className="text-center p-6 rounded-xl" style={{ backgroundColor: colors['gray-100'] }}>
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: colors['cyan-300'] }}>
                <Shield className="w-8 h-8" style={{ color: colors['primary-blue'] }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: colors['primary-blue'] }}>Exclusivity</h3>
              <p style={{ color: colors['gray-500'] }}>
                All leads sent exclusively to your business – no competition
              </p>
            </div>

            <div className="text-center p-6 rounded-xl" style={{ backgroundColor: colors['gray-100'] }}>
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: colors['cyan-500'] }}>
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: colors['primary-blue'] }}>Guaranteed Quality</h3>
              <p style={{ color: colors['gray-500'] }}>
                10-day return policy on leads that don't meet our standards
              </p>
            </div>

            <div className="text-center p-6 rounded-xl" style={{ backgroundColor: colors['gray-100'] }}>
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: colors['cyan-200'] }}>
                <BarChart3 className="w-8 h-8" style={{ color: colors['primary-blue'] }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: colors['primary-blue'] }}>Complete Control</h3>
              <p style={{ color: colors['gray-500'] }}>
                Manage campaign speed, frequency, and timing
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}