import React from 'react';
// Using placeholders for icons, but 'lucide-react' icons would be the standard implementation.
import { Zap, LayoutGrid, Users, CheckCircle, Briefcase } from 'lucide-react'; 
import { useNavigate } from "react-router-dom"; 
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

// Feature Card Component (Kept for potential future use/template consistency)
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div 
    className="bg-white p-6 rounded-2xl shadow-xl border-2 border-transparent 
              transition duration-300 hover:scale-[1.02]"
    style={{ borderColor: colors['cyan-300'], transition: 'border-color 0.3s ease-in-out' }} // Custom hover border color
  >
    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full" style={{ backgroundColor: colors['cyan-200'] }}>
      <Icon className="w-6 h-6" style={{ color: colors['primary-blue'] }} />
    </div>
    <h3 className="text-xl font-semibold mb-2" style={{ color: colors['primary-blue'] }}>{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);

// Main Component
const HiringPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  
  // Example data for a "Why Join Us" section to fill the template structure
  const careerFeatures = [
    { icon: Briefcase, title: 'Growth Opportunities', description: 'Clear pathways for career progression and continuous professional development.' },
    { icon: CheckCircle, title: 'Innovative Team', description: 'Work alongside bright minds on cutting-edge projects in a collaborative environment.' },
    { icon: Users, title: 'Vibrant Culture', description: 'Enjoy a supportive, inclusive, and energetic workplace that values work-life balance.' },
    { icon: Zap, title: 'Impactful Work', description: 'Be a part of a mission to revolutionize call center efficiency and lead management.' },
  ];

  // Helper object for the CTA button (Default State) - adjusted for a recruitment context
  const registerButtonStyle = {
    backgroundColor: colors['primary-blue'], // Default color: primary blue
    color: '#FFFFFF',
    boxShadow: `0 4px 6px -1px ${colors['black-50']}, 0 2px 4px -2px ${colors['black-50']}`
  };
  // Helper object for the CTA button (Hover State)
  const registerHoverStyle = {
    backgroundColor: colors['cyan-500'] // Hover color: cyan
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      
      {/* 1. Hero Section - Focused on Hiring Announcement */}
      <section 
        className="py-24 md:py-32 flex items-center justify-center min-h-[50vh]" 
        style={{ backgroundColor: colors['primary-blue'] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h1 
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight animate-pulse" 
            style={{ color: colors['cyan-300'], textShadow: `4px 4px 8px ${colors['black-50']}` }}
          >
            Careers at TruLeads LLC
          </h1>

          {/* REQUIRED TEXT IN THE MIDDLE */}
          <p 
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-12 py-4 px-6 inline-block rounded-xl" 
            style={{ 
              color: '#FFFFFF', 
              backgroundColor: colors['primary-blue'],
              border: `4px solid ${colors['cyan-500']}`,
              boxShadow: `0 0 20px rgba(6, 182, 212, 0.7)`
            }}
          >
            Portal will open soon ⏳
          </p>

          <p 
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" 
            style={{ color: colors['gray-200'] }}
          >
            We're preparing to launch our official career portal with exciting new roles! Check back soon or subscribe for updates.
          </p>
          
          {/* Example of a temporary action (e.g., join a waiting list) */}
          <button 
            className="bg-gray-100 text-xl py-3 px-8 rounded-xl font-semibold shadow-2xl 
                       transition duration-300 hover:bg-cyan-200 hover:shadow-md"
            style={{ color: colors['primary-blue'] }}
            onClick={()=> navigate("/subscribe")}
          >
            Notify Me of Openings
          </button>
          
        </div>
      </section>

      ---

      {/* 2. Feature Section - Repurposed as "Why Join Us" */}
      <section 
        className="py-16 md:py-24" 
        style={{ backgroundColor: colors['gray-100'] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors['primary-blue'] }}>
            Why Join Our Team?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {careerFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      ---
      
      {/* 3. Call To Action (CTA) Section - Focus on Connection */}
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
            Connect With Us
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: colors['gray-200'] }}>
            While you wait for the portal to open, follow us on social media to see our culture and mission in action.
          </p>
          
          <button 
            className="w-full md:w-auto py-3 px-10 text-lg font-bold rounded-2xl 
                      transition duration-300 shadow-xl cursor-pointer hover:bg-cyan-300"
            onClick={() => navigate('/')} // Example navigation
            style={registerButtonStyle}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, registerHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, registerButtonStyle)}
          >
            Follow on LinkedIn
          </button>
          
        </div>
      </section>
      
    </div>
  );
};

export default HiringPage;