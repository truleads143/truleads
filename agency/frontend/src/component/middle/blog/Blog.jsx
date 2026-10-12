import React from 'react';
// Using placeholders for icons, but 'lucide-react' icons would be the standard implementation.
// Swapping icons to be more blog/content-focused
import { BookOpen, Rss, Bell, MessageSquare } from 'lucide-react'; 
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

// Feature Card Component (Repurposed for content/topic categories)
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div 
    className="bg-white p-6 rounded-2xl shadow-xl border-2 border-transparent 
              transition duration-300 hover:scale-[1.02]"
    style={{ borderColor: colors['cyan-300'], transition: 'border-color 0.3s ease-in-out' }}
  >
    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full" style={{ backgroundColor: colors['cyan-200'] }}>
      <Icon className="w-6 h-6" style={{ color: colors['primary-blue'] }} />
    </div>
    <h3 className="text-xl font-semibold mb-2" style={{ color: colors['primary-blue'] }}>{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);

// Main Component
const BlogsComingSoon = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  
  // Blog-specific categories to fill the Feature Card section
  const blogTopics = [
    { icon: Rss, title: 'Industry Insights', description: 'Deep dives into market trends and the future of call center technology.' },
    { icon: BookOpen, title: 'Case Studies', description: 'Real-world examples of how our platform is driving client success.' },
    { icon: MessageSquare, title: 'Product Updates', description: 'The latest features, tutorials, and tips for maximizing platform use.' },
    { icon: Bell, title: 'Productivity Hacks', description: 'Expert advice and strategies for agents and managers to boost efficiency.' },
  ];

  // Helper objects for the Call to Action button
  const ctaButtonStyle = {
    backgroundColor: colors['primary-blue'], 
    color: '#FFFFFF',
    boxShadow: `0 4px 6px -1px ${colors['black-50']}, 0 2px 4px -2px ${colors['black-50']}`
  };
  const ctaHoverStyle = {
    backgroundColor: colors['cyan-500']
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      
      {/* 1. Hero Section - Blog Announcement */}
      <section 
        className="py-24 md:py-32 flex items-center justify-center min-h-[50vh]" 
        style={{ backgroundColor: colors['primary-blue'] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h1 
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight" 
            style={{ color: colors['cyan-300'], textShadow: `4px 4px 8px ${colors['black-50']}` }}
          >
            Our Content Hub
          </h1>

          {/* COMING SOON ANNOUNCEMENT */}
          <p 
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-12 py-4 px-6 inline-block rounded-xl animate-pulse" 
            style={{ 
              color: '#FFFFFF', 
              backgroundColor: colors['primary-blue'],
              border: `4px solid ${colors['cyan-500']}`,
              boxShadow: `0 0 20px rgba(6, 182, 212, 0.7)`
            }}
          >
            Blog is Coming Soon! 🚀
          </p>

          <p 
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto" 
            style={{ color: colors['gray-200'] }}
          >
            We're curating exclusive articles, guides, and insights to help you master call center efficiency and lead management. Don't miss the launch!
          </p>
          
          {/* Email Subscription Button */}
          <button 
            className="bg-gray-100 text-xl py-3 px-8 rounded-xl font-semibold shadow-2xl 
                       transition duration-300 hover:bg-cyan-200 hover:shadow-md"
            style={{ color: colors['primary-blue'] }}
            onClick={()=> navigate("/subscribe-for-blog")}
          >
            Get Notified of the Launch
          </button>
          
        </div>
      </section>

      ---

      {/* 2. Feature Section - Repurposed as "Topics You Can Expect" */}
      <section 
        className="py-16 md:py-24" 
        style={{ backgroundColor: colors['gray-100'] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors['primary-blue'] }}>
            Topics You Can Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {blogTopics.map((topic, index) => (
              <FeatureCard key={index} {...topic} />
            ))}
          </div>
        </div>
      </section>

      ---
      
      {/* 3. Call To Action (CTA) Section - Reaching Out */}
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
            Need Help Now?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: colors['gray-200'] }}>
            While our blog is in preparation, our team is ready to answer your questions about lead management and platform integration.
          </p>
          
          <button 
            className="w-full md:w-auto py-3 px-10 text-lg font-bold rounded-2xl 
                      transition duration-300 shadow-xl cursor-pointer"
            onClick={() => navigate('/query')} 
            style={ctaButtonStyle}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, ctaHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, ctaButtonStyle)}
          >
            Talk to an Expert
          </button>
          
        </div>
      </section>
      
    </div>
  );
};

export default BlogsComingSoon;