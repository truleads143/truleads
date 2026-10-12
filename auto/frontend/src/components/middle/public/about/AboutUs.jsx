import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Shield, Car, Users, Target, CheckCircle, ArrowRight, Zap, HeartHandshake, TrendingUp, Phone } from 'lucide-react';

const colors = {
  'primary-blue': '#124D95',
  'cyan-200': '#A5F3FC',
  'cyan-300': '#67E8F9',
  'cyan-500': '#06B6D4',
  'gray-100': '#F3F4F6',
  'gray-200': '#E5E7EB',
  'gray-500': '#6B7280',
};

export default function AboutUs() {
  const navigate = useNavigate();

  const heroBtnStyle = { backgroundColor: '#FFFFFF', color: colors['primary-blue'] };
  const heroBtnHoverStyle = { backgroundColor: colors['cyan-200'], color: colors['primary-blue'] };

  const values = [
    {
      icon: <Shield className="w-8 h-8" style={{ color: colors['primary-blue'] }} />,
      bg: colors['cyan-200'],
      title: 'Trust First',
      desc: 'Every lead we deliver is verified and consent-based. No gimmicks, no recycled data — just real people looking for real coverage.',
    },
    {
      icon: <Zap className="w-8 h-8" style={{ color: colors['primary-blue'] }} />,
      bg: colors['cyan-300'],
      title: 'Speed That Wins',
      desc: 'Studies show that contacting a prospect within 60 seconds increases conversion rates by over 391%. We make that instant connection happen.',
    },
    {
      icon: <HeartHandshake className="w-8 h-8" style={{ color: colors['primary-blue'] }} />,
      bg: colors['cyan-200'],
      title: 'Agent-Centric',
      desc: "We built TruAutoInsurance from the agent's perspective. Less time prospecting, more time closing — that's the deal.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      bg: colors['cyan-500'],
      title: 'Growth Minded',
      desc: "We're a startup that moves fast. We listen to our clients, iterate quickly, and constantly refine what we deliver.",
    },
  ];

  const whyUs = [
    {
      icon: <Phone className="w-6 h-6" style={{ color: colors['cyan-500'] }} />,
      title: 'Live Transfers Only',
      desc: "We never send you aged leads or cold lists. Every prospect is live, warm, and already interested in auto insurance when they reach you.",
    },
    {
      icon: <Target className="w-6 h-6" style={{ color: colors['cyan-500'] }} />,
      title: 'Exclusive to You',
      desc: "Your leads are yours alone. We don't resell or share — so you're never competing with five other agents for the same prospect.",
    },
    {
      icon: <Car className="w-6 h-6" style={{ color: colors['cyan-500'] }} />,
      title: 'Auto Insurance Focus',
      desc: "We don't dabble in every vertical. Auto insurance is all we do, which means our targeting, scripts, and filtering are purpose-built for your market.",
    },
    {
      icon: <CheckCircle className="w-6 h-6" style={{ color: colors['cyan-500'] }} />,
      title: 'Quality Guarantee',
      desc: "Not satisfied with a lead? We have a straightforward return policy. We stand behind what we deliver, every single time.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${colors['primary-blue']} 0%, ${colors['cyan-500']} 100%)` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2 mb-6">
              <Car className="w-4 h-4 text-[#124D95]" />
              <span className="text-[#124D95] text-sm font-medium">Auto Insurance Lead Generation</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              We Connect Drivers With<br />the Right Coverage — Fast
            </h1>
            <p className="text-xl text-white mb-10 max-w-2xl mx-auto" style={{ opacity: 0.92 }}>
              TruAutoInsurance was built on a simple idea: insurance agents deserve better leads, and drivers deserve faster answers. We bridge that gap in real time.
            </p>
            <button
              onClick={() => navigate('/contactus')}
              className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-xl flex items-center mx-auto space-x-2 cursor-pointer"
              style={heroBtnStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, heroBtnHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, heroBtnStyle)}
            >
              <Link to='/contactus'>Let's Talk</Link>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-16 left-8 w-72 h-72 rounded-full" style={{ backgroundColor: colors['cyan-200'] }} />
          <div className="absolute bottom-10 right-8 w-96 h-96 rounded-full" style={{ backgroundColor: colors['cyan-300'] }} />
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: colors['cyan-500'] }}>Our Story</span>
              <h2 className="text-4xl font-bold mt-3 mb-6" style={{ color: colors['primary-blue'] }}>
                Born From a Frustration Every Agent Knows
              </h2>
              <p className="text-lg mb-5" style={{ color: colors['gray-500'] }}>
                Too many insurance agents were spending their days dialing dead-end leads — people who filled out a form weeks ago, forgot about it, or were already locked into a policy. The time wasted was enormous, and the results were demoralizing.
              </p>
              <p className="text-lg mb-5" style={{ color: colors['gray-500'] }}>
                TruAutoInsurance started as a small, focused operation with one clear mission: fix the lead problem. Instead of selling lists, we built a live transfer system that puts agents on the phone with prospects the moment they express interest — no lag, no cold calls, no guesswork.
              </p>
              <p className="text-lg" style={{ color: colors['gray-500'] }}>
                We're still early in our journey, but we're already seeing what happens when agents stop chasing and start converting. That's what drives us every day.
              </p>
            </div>

            <div className="space-y-5">
              {[
                { icon: <Phone className="w-6 h-6 text-white" />, bg: colors['cyan-500'], heading: 'The Problem', body: 'Agents were burning hours on unresponsive, recycled leads with no intent to buy.' },
                { icon: <Zap className="w-6 h-6 text-white" />, bg: colors['primary-blue'], heading: 'Our Solution', body: 'A real-time live transfer system that connects agents with interested prospects instantly.' },
                { icon: <TrendingUp className="w-6 h-6 text-white" />, bg: colors['cyan-500'], heading: 'The Result', body: 'More conversations with motivated buyers, shorter sales cycles, and better ROI.' },
              ].map((card, i) => (
                <div key={i} className="flex items-start space-x-5 bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: card.bg }}>
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1" style={{ color: colors['primary-blue'] }}>{card.heading}</h4>
                    <p style={{ color: colors['gray-500'] }}>{card.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission Banner ── */}
      <section className="py-16" style={{ backgroundColor: colors['gray-100'] }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: colors['primary-blue'] }}>Our Mission</h2>
          <p className="text-xl leading-relaxed" style={{ color: colors['gray-500'] }}>
            To give independent auto insurance agents a consistent, reliable pipeline of genuinely interested prospects — so they can focus on what they do best: helping people protect what matters most.
          </p>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4" style={{ color: colors['primary-blue'] }}>What We Stand For</h2>
          <p className="text-center text-lg mb-16" style={{ color: colors['gray-500'] }}>
            The principles that shape every decision we make
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, i) => (
              <div
                key={i}
                className="text-center p-8 rounded-xl hover:shadow-lg transition-shadow"
                style={{ backgroundColor: colors['gray-100'] }}
              >
                <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: val.bg }}>
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: colors['primary-blue'] }}>{val.title}</h3>
                <p style={{ color: colors['gray-500'] }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20" style={{ backgroundColor: colors['gray-100'] }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4" style={{ color: colors['primary-blue'] }}>
            Why Agents Choose TruAutoInsurance
          </h2>
          <p className="text-center text-lg mb-16" style={{ color: colors['gray-500'] }}>
            We're not the biggest — but we're built to be the best partner you've worked with
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {whyUs.map((item, i) => (
              <div key={i} className="flex space-x-5 bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: colors['cyan-200'] }}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: colors['primary-blue'] }}>{item.title}</h3>
                  <p style={{ color: colors['gray-500'] }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Startup Transparency Strip ── */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl p-10 text-center"
            style={{
              background: `linear-gradient(135deg, ${colors['primary-blue']}15 0%, ${colors['cyan-500']}20 100%)`,
              border: `1px solid ${colors['cyan-200']}`,
            }}
          >
            <Users className="w-10 h-10 mx-auto mb-4" style={{ color: colors['primary-blue'] }} />
            <h3 className="text-2xl font-bold mb-4" style={{ color: colors['primary-blue'] }}>A Word From Our Team</h3>
            <p className="text-lg leading-relaxed" style={{ color: colors['gray-500'] }}>
              "We're a small, focused team and we're proud of that. It means every client gets our full attention. We're not juggling thousands of accounts — we're building real relationships and refining our process one agent at a time. If you're looking for a lead partner that actually picks up the phone, that's us."
            </p>
            <p className="mt-5 font-semibold" style={{ color: colors['primary-blue'] }}>— The TruAutoInsurance Team</p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20"
        style={{ background: `linear-gradient(135deg, ${colors['primary-blue']} 0%, ${colors['cyan-500']} 100%)` }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-5">Ready to Fill Your Pipeline?</h2>
          <p className="text-xl text-white mb-10" style={{ opacity: 0.92 }}>
            Whether you're a solo agent or running a team, we're ready to put qualified auto insurance prospects on the phone with you — starting today.
          </p>
          <button
            onClick={() => navigate('/contactus')}
            className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-xl flex items-center mx-auto space-x-2 cursor-pointer"
            style={heroBtnStyle}
            onMouseEnter={(e) => Object.assign(e.currentTarget.style, heroBtnHoverStyle)}
            onMouseLeave={(e) => Object.assign(e.currentTarget.style, heroBtnStyle)}
          >
            <Link to='/contactus'>Get Started Today</Link>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

    </div>
  );
}