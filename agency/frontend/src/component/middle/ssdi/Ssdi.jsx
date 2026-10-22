import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Scale,
  PhoneCall,
  ClipboardCheck,
  Briefcase,
  CalendarClock,
  UserCheck,
  ShieldCheck,
  FileText,
  Clock,
  Target,
  CheckCircle,
} from 'lucide-react';

const NAVY = '#0F2A4A';
const GOLD = '#A67C37';
const MUTED = '#5B6170';

// Screening questions every lead passes before it reaches your intake team
const qualifiers = [
  {
    icon: CalendarClock,
    title: 'Out of work 12+ months',
    description:
      'The condition has stopped them working, or is expected to keep them out of work, for at least a year.',
  },
  {
    icon: Briefcase,
    title: 'Recent work history',
    description:
      'They have paid into Social Security through recent employment, so they are likely to have the work credits SSDI requires.',
  },
  {
    icon: UserCheck,
    title: 'Under retirement age',
    description:
      'Applicants are below full retirement age and are not already receiving Social Security disability benefits.',
  },
  {
    icon: Scale,
    title: 'No current representation',
    description:
      'They do not yet have an attorney or advocate on their claim and are open to getting help.',
  },
];

const products = [
  {
    icon: PhoneCall,
    title: 'Live Transfers',
    description:
      'A screened claimant is warm-transferred straight to your intake line while they are still on the phone and ready to talk.',
  },
  {
    icon: FileText,
    title: 'Signed-Retainer Ready',
    description:
      'Leads arrive with the screening answers attached, so your team can move quickly to retainer and claim paperwork.',
  },
  {
    icon: ClipboardCheck,
    title: 'Custom Filters',
    description:
      'Set the states, age ranges, application status and call hours that fit your practice, and we deliver only what matches.',
  },
];

const steps = [
  {
    title: 'Claimant reaches out',
    description: 'People researching disability benefits respond to our outreach and ask for help with their claim.',
  },
  {
    title: 'We screen the case',
    description: 'Our agents walk through the qualifying questions and confirm the claimant is a fit for your criteria.',
  },
  {
    title: 'You take the call',
    description: 'The qualified claimant is connected to your intake team live, with their answers ready to review.',
  },
];

const reasons = [
  { icon: Target, title: 'Exclusive leads', description: 'Each claimant goes to one buyer only, never resold.' },
  { icon: Clock, title: 'Real-time delivery', description: 'You speak to the claimant within moments of screening.' },
  { icon: ShieldCheck, title: 'Compliant outreach', description: 'Consent captured and calls handled to TCPA standards.' },
];

const SectionHeading = ({ eyebrow, title, text, light = false }) => (
  <div className="text-center mb-14 max-w-3xl mx-auto">
    {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
    <h2 className="text-4xl md:text-5xl" style={{ color: light ? '#FFFFFF' : NAVY }}>
      {title}
    </h2>
    <span className="gold-rule" />
    {text && (
      <p className="mt-6 text-lg leading-relaxed" style={{ color: light ? '#B9C3D2' : MUTED }}>
        {text}
      </p>
    )}
  </div>
);

export default function SSDILeads() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FBF9F5' }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ backgroundColor: NAVY }}>
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 14px)',
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-28 text-center">
          <p className="eyebrow mb-5" style={{ color: '#DCC59A' }}>
            Social Security Disability Insurance
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl text-white mb-6">SSDI Leads &amp; Live Transfers</h1>
          <div className="w-16 h-[2px] mx-auto mb-6" style={{ backgroundColor: GOLD }} />
          <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-3xl mx-auto text-[#D5DCE6] font-light">
            Pre-screened disability claimants for law firms and advocates. We find people who need help with their
            SSDI claim, check that they fit your intake criteria, and connect them to your team live.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="btn-gold" onClick={() => navigate('/query')}>
              Get SSDI Leads <ArrowRight className="w-4 h-4" />
            </button>
            <button
              className="btn-outline text-white hover:bg-white hover:text-[#0F2A4A]"
              onClick={() => document.getElementById('ssdi-criteria')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See Our Criteria
            </button>
          </div>
        </div>
      </section>

      {/* What SSDI is */}
      <section className="py-20 md:py-24 bg-white border-b border-[#EFE9DD]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="eyebrow mb-3">Understanding SSDI</p>
            <h2 className="text-4xl md:text-5xl mb-6" style={{ color: NAVY }}>
              A complex claim, and claimants who want guidance
            </h2>
            <p className="text-lg leading-relaxed mb-5" style={{ color: MUTED }}>
              Social Security Disability Insurance pays monthly benefits to people who can no longer work because of
              a serious medical condition, based on the Social Security taxes they paid while employed.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: MUTED }}>
              The application involves medical evidence, work history and strict deadlines, and many first claims are
              denied. That is why so many applicants look for an experienced representative, and why timely,
              well-screened leads matter to your practice.
            </p>
          </div>

          <div className="bg-[#FBF9F5] border border-[#E8E1D3] p-8 md:p-10">
            <h3 className="text-2xl mb-6" style={{ color: NAVY }}>
              SSDI at a glance
            </h3>
            <dl className="divide-y divide-[#E8E1D3]">
              {[
                ['Who it covers', 'Workers who paid into Social Security and can no longer work'],
                ['Disability length', 'Expected to last at least 12 months, or result in death'],
                ['Work credits', 'Generally 40, with 20 earned in the last 10 years (fewer for younger workers)'],
                ['Waiting period', 'Benefits usually begin after five full months of disability'],
              ].map(([term, detail]) => (
                <div key={term} className="py-4 grid grid-cols-5 gap-4">
                  <dt className="col-span-2 text-xs font-bold tracking-[0.14em] uppercase pt-1" style={{ color: GOLD }}>
                    {term}
                  </dt>
                  <dd className="col-span-3 text-sm leading-relaxed" style={{ color: NAVY }}>
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Screening criteria */}
      <section id="ssdi-criteria" className="py-20 md:py-28 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Screening Criteria"
            title="Every claimant is qualified before you hear from them"
            text="Our agents confirm the basics on each call, so your intake team spends its time on cases it can take."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualifiers.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white p-8 border border-[#E8E1D3] border-t-2" style={{ borderTopColor: GOLD }}>
                <div className="w-12 h-12 flex items-center justify-center border mb-6" style={{ borderColor: GOLD }}>
                  <Icon className="w-5 h-5" style={{ color: GOLD }} />
                </div>
                <h3 className="text-2xl mb-3" style={{ color: NAVY }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                  {description}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm mt-8" style={{ color: MUTED }}>
            Need different criteria? We can tailor the screening questions to your firm's intake rules.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-24" style={{ backgroundColor: NAVY }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How It Works" title="From first call to your intake line" light />
          <ol className="grid md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <li key={step.title} className="text-center md:text-left">
                <p className="font-serif text-5xl mb-4" style={{ color: '#DCC59A' }}>
                  {i + 1}.
                </p>
                <h3 className="text-2xl text-white mb-3">{step.title}</h3>
                <p className="text-[#B9C3D2] leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Lead products */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our Offering" title="Built around how disability firms work" />
          <div className="grid md:grid-cols-3 gap-6">
            {products.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-8 border border-[#E8E1D3] bg-[#FBF9F5]">
                <Icon className="w-7 h-7 mb-5" style={{ color: NAVY }} />
                <h3 className="text-2xl mb-3" style={{ color: NAVY }}>
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid sm:grid-cols-3 border-y border-[#E8E1D3]">
            {reasons.map(({ icon: Icon, title, description }, i) => (
              <div
                key={title}
                className={`flex gap-4 p-6 ${i > 0 ? 'sm:border-l border-t sm:border-t-0 border-[#E8E1D3]' : ''}`}
              >
                <Icon className="w-5 h-5 mt-1 shrink-0" style={{ color: GOLD }} />
                <div>
                  <p className="font-bold text-sm mb-1" style={{ color: NAVY }}>
                    {title}
                  </p>
                  <p className="text-sm" style={{ color: MUTED }}>
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow mb-3">Grow Your Caseload</p>
          <h2 className="text-4xl md:text-5xl mb-6" style={{ color: NAVY }}>
            Ready to speak with qualified SSDI claimants?
          </h2>
          <p className="text-lg leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: MUTED }}>
            Tell us your states, volume and intake hours, and we will set up a lead program that fits your firm.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center mb-10 text-sm" style={{ color: NAVY }}>
            {['Exclusive claimants', 'Live transfers', 'Flexible volume'].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <CheckCircle className="w-4 h-4" style={{ color: GOLD }} /> {item}
              </span>
            ))}
          </div>
          <button className="btn-gold" onClick={() => navigate('/query')}>
            Contact Us <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
