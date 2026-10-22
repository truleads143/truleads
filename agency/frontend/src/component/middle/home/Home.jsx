import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeartPulse, Shield, Stethoscope, Car, ArrowRight, Phone, BarChart3, Clock } from 'lucide-react';

const NAVY = '#0F2A4A';
const GOLD = '#A67C37';

const verticals = [
  {
    to: '/verticals/aca',
    icon: HeartPulse,
    title: 'ACA',
    description:
      'We simplify the complex world of Affordable Care Act (ACA) and Obamacare leads, keeping your sales process effective and efficient.',
  },
  {
    to: '/verticals/fe',
    icon: Shield,
    title: 'Final Expense',
    description:
      'Final expense coverage handles end-of-life costs such as funeral expenses, medical bills and small debts, making it a critical product.',
  },
  {
    to: '/verticals/medicare',
    icon: Stethoscope,
    title: 'Medicare',
    description:
      'High-intent leads for seniors seeking comprehensive Medicare coverage and additional healthcare benefits.',
  },
  {
    to: '/verticals/auto-insurance',
    icon: Car,
    title: 'Auto Insurance',
    description:
      'Connecting agents with drivers actively searching for competitive rates and reliable vehicle protection.',
  },
];

const stats = [
  { value: '15,000+', label: 'Connections Published' },
  { value: '$50,000+', label: 'Revenue Generated for Clients' },
  { value: '11 min', label: 'Average Call Length' },
  { value: 'Growing', label: 'Currently Seeking More Buyers' },
];

const SectionHeading = ({ eyebrow, title, light = false }) => (
  <div className="text-center mb-14">
    {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
    <h2 className={`text-4xl md:text-5xl ${light ? 'text-white' : ''}`} style={light ? {} : { color: NAVY }}>
      {title}
    </h2>
    <span className="gold-rule" />
  </div>
);

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FBF9F5' }}>
      {/* 1. Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: NAVY }}>
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 14px)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <p className="eyebrow mb-5" style={{ color: '#DCC59A' }}>
                Insurance Lead Generation
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
                Simplify Your Call Center Operations
              </h1>
              <div className="w-16 h-[2px] mb-6" style={{ backgroundColor: GOLD }} />
              <p className="text-lg leading-relaxed mb-10 max-w-lg text-[#D5DCE6] font-light">
                A streamlined, all-in-one partner for managing leads, tracking agent performance and
                raising the standard of your customer service.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="btn-gold" onClick={() => navigate('/query')}>
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
                <Link to="/about" className="btn-outline text-white hover:bg-white hover:text-[#0F2A4A]">
                  Learn More
                </Link>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div
                className="absolute -top-4 -right-4 w-full h-full border"
                style={{ borderColor: GOLD }}
              />
              <img
                src="https://media.istockphoto.com/id/1833005820/photo/call-center-woman-smile-and-portrait-at-headphones-job-and-staff-group-with-computer-advice.jpg?s=612x612&w=0&k=20&c=Y8aAwFhGKKJIBMGgkQLJNaCldWe7JuXoDbqfEhq9goc="
                alt="Call center staff"
                className="relative w-full h-[380px] object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Verticals */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What We Offer" title="Our Verticals" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {verticals.map(({ to, icon: Icon, title, description }) => (
              <Link
                key={title}
                to={to}
                className="group bg-white p-8 border border-[#E8E1D3] border-t-2 transition duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
                style={{ borderTopColor: GOLD }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center border mb-6"
                  style={{ borderColor: GOLD }}
                >
                  <Icon className="w-5 h-5" style={{ color: GOLD }} />
                </div>
                <h3 className="text-2xl mb-3" style={{ color: NAVY }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-[#5B6170] flex-1">{description}</p>
                <span
                  className="mt-6 inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase"
                  style={{ color: GOLD }}
                >
                  Explore <ArrowRight className="w-3.5 h-3.5 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Highlight */}
      <section className="py-20 md:py-28 bg-white border-y border-[#EFE9DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -bottom-4 -left-4 w-full h-full" style={{ backgroundColor: '#F1E9D9' }} />
              <img
                src="https://globaltrustassociation.org/wp-content/uploads/2021/01/teamwork-success.png"
                alt="Teamwork success"
                className="relative w-full h-80 object-cover"
              />
            </div>
            <div>
              <p className="eyebrow mb-3">Workflow Optimized</p>
              <h2 className="text-4xl md:text-5xl mb-6" style={{ color: NAVY }}>
                Empower Your Team with Real-Time Data
              </h2>
              <p className="text-lg leading-relaxed mb-5 text-[#5B6170]">
                Our intuitive dashboard lets your people <strong className="text-[#0F2A4A]">view and prioritize leads</strong>{' '}
                effortlessly, so no opportunity is missed. Statuses move from "New" to "Contacted" to "Closed" in a
                click, with detailed notes along the way.
              </p>
              <p className="text-lg leading-relaxed mb-8 text-[#5B6170]">
                That visibility helps everyone <strong className="text-[#0F2A4A]">track progress</strong> across the
                entire customer journey, for a better-informed and more efficient sales cycle.
              </p>
              <ul className="grid sm:grid-cols-3 gap-4 text-sm text-[#0F2A4A]">
                {[
                  [Phone, 'Live transfers'],
                  [BarChart3, 'Clear reporting'],
                  [Clock, 'Fast follow-up'],
                ].map(([Icon, label]) => (
                  <li key={label} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" style={{ color: GOLD }} /> {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Impact */}
      <section className="py-20 md:py-24" style={{ backgroundColor: NAVY }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Track Record" title="Our Impact So Far" light />
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`text-center px-4 py-6 ${i !== 0 ? 'lg:border-l' : ''} ${i % 2 ? 'border-l lg:border-l' : ''}`}
                style={{ borderColor: 'rgba(220,197,154,0.3)' }}
              >
                <p className="font-serif text-4xl md:text-5xl font-semibold mb-2" style={{ color: '#DCC59A' }}>
                  {s.value}
                </p>
                <p className="text-xs tracking-[0.18em] uppercase text-[#B9C3D2]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow mb-3">Let's Work Together</p>
          <h2 className="text-4xl md:text-5xl mb-6" style={{ color: NAVY }}>
            Ready to streamline your leads?
          </h2>
          <p className="text-lg leading-relaxed mb-10 text-[#5B6170] max-w-2xl mx-auto">
            Join the call centers already achieving better results with our streamlined lead management.
          </p>
          <button className="btn-gold" onClick={() => navigate('/query')}>
            Contact Us <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
