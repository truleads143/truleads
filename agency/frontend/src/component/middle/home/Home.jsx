import React from 'react';
// Using placeholders for icons, but 'lucide-react' icons would be the standard implementation.
import { Zap, LayoutGrid, Users, CheckCircle } from 'lucide-react'; 
import { useNavigate } from "react-router-dom"; 
import {Link} from "react-router-dom"
// ... other imports

// Custom color palette matching the requirements
const colors = {
  'primary-blue': '#124D95',
  'cyan-200': '#A5F3FC',
  'cyan-300': '#67E8F9',
  'cyan-500': '#06B6D4',
  'gray-100': '#F3F4F6',
  'gray-200': '#E5E7EB',
  'gray-500': '#6B7280',
  'black-50': '#00000080',
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, to }) => (
  <div 
    className="bg-white flex flex-col items-center p-6 rounded-2xl shadow-xl border-2 border-transparent 
              transition duration-300 hover:scale-[1.02] hover:border-cyan-300"
    style={{ borderColor: colors['cyan-300'] }} // Custom hover border color
  >
    <div className="flex items-center justify-center  w-12 h-12 mb-4 rounded-full" style={{ backgroundColor: colors['cyan-200'] }}>
      <Icon className="w-6 h-6" style={{ color: colors['primary-blue'] }} />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-center" style={{ color: colors['primary-blue'] }}><Link to={to}>{title}</Link></h3>
    <p className="text-gray-500 text-center">{description}</p>
  </div>
);

// Main Component
const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const features = [
    {  to:"/verticals/aca", icon: LayoutGrid, title: 'ACA', description: 'we simplify the complex world of Affordable Care Act (ACA) and Obamacare leads, ensuring your sales process is both effective and efficient.' },
    {to:"/verticals/fe" ,icon: Users, title: 'Final Expense', description: 'Final expense insurance addresses the costs associated with the end of life, such as funeral expenses, medical bills, and small debts making it a critical product' },
    { to:"/verticals/medicare" , icon: Zap, title: 'Medicare', description: 'We provide high-intent leads for seniors seeking comprehensive Medicare coverage and additional healthcare benefits.' },
    {to:"/verticals/auto-insurance" , icon: CheckCircle, title: 'Auto Insurance', description: 'Connecting agents with drivers actively searching for competitive rates and reliable vehicle protection.' },
  ];

  // Helper object for the Get Started button (Default State)
  const getStartedButtonStyle = {
    backgroundColor: colors['cyan-500'], // Default color: vibrant cyan
    color: '#FFFFFF',
    boxShadow: `0 4px 6px -1px ${colors['black-50']}, 0 2px 4px -2px ${colors['black-50']}`
  };
  // Helper object for the Get Started button (Hover State)
  const getStartedHoverStyle = {
    backgroundColor: colors['cyan-300'] // Hover color: lighter cyan
  };

  // Helper object for the CTA button (Default State)
  const ctaButtonStyle = {
    backgroundColor: '#FFFFFF', // Default color: White
    color: colors['primary-blue'],
    boxShadow: `0 4px 6px -1px ${colors['black-50']}, 0 2px 4px -2px ${colors['black-50']}`
  };
  // Helper object for the CTA button (Hover State)
  const ctaHoverStyle = {
    backgroundColor: colors['cyan-200'] // Hover color: light cyan
  };


  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      
      {/* 1. Hero Section */}
      <section 
        className="py-16 md:py-24" 
        style={{ backgroundColor: colors['primary-blue'] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            
            {/* Left Content */}
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight" 
                style={{ color: '#FFFFFF', textShadow: `2px 2px 4px ${colors['black-50']}` }}
              >
                Simplify Your Call Center Operations
              </h1>
              <p 
                className="text-xl mb-8 max-w-lg" 
                style={{ color: colors['gray-200'] }}
              >
                Our platform provides a streamlined, all-in-one solution for managing leads, tracking agent performance, and boosting overall customer service efficiency.
              </p>
              
              {/* IMPROVED GET STARTED BUTTON: Now applies default style directly */}
              <button 
                className="bg-gray-100 text-[#124D95] px-6 text-xl py-3 rounded-xl font-semibold shadow-2xl shadow-zinc-800
                                       transition duration-300 hover:bg-cyan-200 hover:shadow-md cursor-pointer"
                onClick={()=> navigate("/query")}
                // Apply default style here

              >
                Get Started
              </button>
            </div>
            
            {/* Right Illustration Placeholder */}
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="w-full max-w-md h-64 bg-gray-300 rounded-2xl flex items-center justify-center text-gray-500 text-lg border border-dashed border-gray-500">
                <img src="https://media.istockphoto.com/id/1833005820/photo/call-center-woman-smile-and-portrait-at-headphones-job-and-staff-group-with-computer-advice.jpg?s=612x612&w=0&k=20&c=Y8aAwFhGKKJIBMGgkQLJNaCldWe7JuXoDbqfEhq9goc=" alt="Call center staff" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Features Section */}
      <section 
        className="py-16 md:py-24" 
        style={{ backgroundColor: colors['gray-100'] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors['primary-blue'] }}>
            Key Features to Boost Productivity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      ---
      
      {/* 3. Service Highlights Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            
            {/* Left Image Placeholder */}
            <div className="md:w-1/2">
              <div className="w-full h-72 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500 text-lg border border-dashed border-gray-500">
                <img src="https://globaltrustassociation.org/wp-content/uploads/2021/01/teamwork-success.png" alt="Teamwork success" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>
            
            {/* Right Text Content */}
            <div className="md:w-1/2">
              <span 
                className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full mb-3" 
                style={{ backgroundColor: colors['cyan-200'], color: colors['primary-blue'] }}
              >
                🚀 Workflow Optimized
              </span>
              <h2 className="text-3xl font-bold mb-4" style={{ color: colors['primary-blue'] }}>
                Empower Your Team with Real-Time Data
              </h2>
              <p className="text-lg mb-4" style={{ color: colors['gray-500'] }}>
                Our intuitive dashboard allows employees to <strong>view and prioritize leads</strong> effortlessly, ensuring no opportunity is missed. They can quickly <strong>update status</strong>—from 'New' to 'Contacted' or 'Closed'—and log detailed notes.
              </p>
              <p className="text-lg" style={{ color: colors['gray-500'] }}>
                This visibility helps them <strong>track progress</strong> and see the entire customer journey, fostering a more informed and efficient sales cycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      ---

      {/* 4. Our Impact Section (Responsive Sizing Confirmed) */}
      <section className="py-12 sm:py-20" style={{ backgroundColor: colors['gray-100'] }}> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-12" style={{ color: colors['primary-blue'] }}>
            Our Impact So Far
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Metric 1: Connections Published */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-4xl sm:text-4xl font-bold mb-2" style={{ color: colors['cyan-500'] }}>15000+</h3>
              <p className="text-xs sm:text-sm text-gray-500">Connections Published</p>
            </div>

            {/* Metric 2: Revenue Generated for Clients */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-4xl sm:text-4xl font-bold mb-2" style={{ color: colors['cyan-500']}}>$50000+</h3>
              <p className="text-xs sm:text-sm text-gray-500">Revenue Generated for Clients</p>
            </div>

            {/* Metric 3: Looking Ahead */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: colors['cyan-500']}}>Looking Ahead</h3>
              <p className="text-xs sm:text-sm text-gray-500">Currently Seeking More Buyers to Scale</p>
            </div>

            {/* Metric 4: Average Call Length */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: colors['cyan-500']}}>11 Mins</h3>
              <p className="text-xs sm:text-sm text-gray-500">Average Call Length</p>
            </div>
          </div>
        </div>
      </section>

      ---

      {/* 5. Call To Action (CTA) Section */}
      <section className="py-16 md:py-20">
        <div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center rounded-2xl p-10 sm:p-16" 
          style={{ 
            background: `linear-gradient(90deg, ${colors['primary-blue']} 0%, ${colors['cyan-500']} 100%)`
          }}
        >
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6" 
            style={{ color: '#FFFFFF' }}
          >
            Ready to streamline your leads?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: colors['gray-200'] }}>
            Join the hundreds of call centers who are already achieving better results with our streamlined lead management system.
          </p>
          
          {/* IMPROVED CTA BUTTON: Now applies default style directly */}
          <button 
            className="w-full md:w-auto py-3 px-10 text-lg font-bold rounded-2xl 
                        transition duration-300 shadow-xl"
            onClick={() => navigate('/query')}
            // Apply default style here
            style={ctaButtonStyle}
            // Apply hover style on mouse enter
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, ctaHoverStyle)}
            // Revert to default style on mouse leave
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, ctaButtonStyle)}
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;