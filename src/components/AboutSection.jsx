import React, { useState } from 'react';
import { Globe2, Award, Code2, Sparkles, X, CheckCircle2, ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';

const aboutFacts = [
  {
    id: 'location',
    icon: Globe2,
    title: 'Base Location',
    value: 'Pakistan (Global Remote)',
    subtext: 'Serving Clients Worldwide',
    badge: 'Worldwide Availability',
    description: 'Based in Pakistan, working seamlessly across international timezones (US, UK, Europe, UAE) via Fiverr, Upwork, and direct contracts.',
    highlights: [
      'Flexible time-zone overlap for daily communication',
      'Fluent English & Roman Urdu client reporting',
      'Secure payment processing via Fiverr & Upwork'
    ]
  },
  {
    id: 'experience',
    icon: Award,
    title: 'Design Fidelity',
    value: 'Pixel-Perfect Code',
    subtext: 'Figma to Webflow & WP',
    badge: 'Production Ready',
    description: 'Dedicated to building 100% pixel-perfect Webflow & WordPress websites for business owners, SaaS founders, and design agencies.',
    highlights: [
      '1:1 Figma & Adobe XD layout conversion accuracy',
      'Clean CSS custom variables & scalable architecture',
      'PageSpeed 95+ score optimization'
    ]
  },
  {
    id: 'specialization',
    icon: Code2,
    title: 'Core Tech Stack',
    value: 'Webflow & WordPress',
    subtext: 'CMS & Elementor Pro',
    badge: 'Full CMS Capabilities',
    description: 'Deep specialization in custom Webflow CMS collections, dynamic interactions, and WordPress Elementor Pro theme building.',
    highlights: [
      'Webflow CMS collections, dynamic filters & animations',
      'WordPress Elementor Pro custom layouts & WooCommerce',
      'Custom JavaScript & responsive breakpoint tuning'
    ]
  },
  {
    id: 'status',
    icon: Sparkles,
    title: 'Current Status',
    value: 'Available for Projects',
    subtext: 'Instant Quote within 24h',
    badge: 'Accepting New Work',
    statusDot: true,
    description: 'Currently open for new Webflow, WordPress, and Figma-to-Code projects. Ready to turn your design or idea into a live website.',
    highlights: [
      'Clear project estimate & proposal within 24 hours',
      'Fast turnaround & daily progress updates',
      '30-day post-launch maintenance included'
    ]
  }
];

export default function AboutSection() {
  const [activeFactModal, setActiveFactModal] = useState(null);

  return (
    <section id="about" className="py-20 sm:py-28 relative border-b border-white/10 bg-[#090c12] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <span className="eyebrow-pill mb-4 inline-flex items-center gap-2">
            About Hassam Khan
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            The person behind the <span className="highlight-text">pixels</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Delivering high-performance, responsive websites with precision engineering.
          </p>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN: Bio */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
              <span>WordPress & Webflow Developer</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Building fast, responsive web experiences that drive real business results.
            </h3>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Hello! I'm <strong className="text-white">Hassam Khan</strong>, a dedicated Webflow and WordPress developer from Pakistan. I specialize in converting Figma designs into pixel-perfect, mobile-friendly websites with clean code, fast loading speeds, and smooth animations.
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Having worked with clients across the globe through <strong className="text-slate-200">Fiverr</strong> and <strong className="text-slate-200">Upwork</strong>, I focus on delivering clean CMS architecture and friction-free user experiences that help businesses stand out online.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a href="#contact" className="btn-primary px-6 py-3 rounded-full text-sm font-bold shadow-xl inline-flex items-center gap-2">
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#work" className="btn-secondary px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                View Work Portfolio
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: 4 Sleek Dark Studio Fact Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aboutFacts.map((fact) => {
              const Icon = fact.icon;
              return (
                <div
                  key={fact.id}
                  onClick={() => setActiveFactModal(fact)}
                  className="relative group rounded-2xl p-5 bg-[#111520] border border-blue-500/20 backdrop-blur-md hover:border-blue-500/50 hover:bg-[#161c2b] transition-all duration-300 hover:-translate-y-1 shadow-lg cursor-pointer overflow-hidden flex flex-col justify-between"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>

                    {fact.statusDot ? (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-400 uppercase">Live</span>
                      </div>
                    ) : (
                      <span className="text-[10px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20 opacity-80 group-hover:opacity-100">
                        Details →
                      </span>
                    )}
                  </div>

                  {/* Fact Details */}
                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block">{fact.title}</span>
                    <h4 className="text-base sm:text-lg font-extrabold text-white mt-0.5 leading-snug group-hover:text-blue-300 transition-colors">
                      {fact.value}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">{fact.subtext}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* ════════════════════════════════════════════════════════════
          CLICK MODAL POPUP (Matching Hero Dark Theme)
         ════════════════════════════════════════════════════════════ */}
      {activeFactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#111520] border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_-15px_rgba(59,130,246,0.25)] space-y-6 overflow-hidden">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  {React.createElement(activeFactModal.icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                    {activeFactModal.badge}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                    {activeFactModal.value}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setActiveFactModal(null)}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Full Description */}
            <p className="text-slate-300 text-sm leading-relaxed">
              {activeFactModal.description}
            </p>

            {/* Highlights Checklist */}
            <div className="space-y-3 pt-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Highlights:</h4>
              {activeFactModal.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-xs sm:text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Information</span>
              </div>

              <button
                onClick={() => setActiveFactModal(null)}
                className="btn-primary py-2 px-5 text-xs font-bold rounded-full"
              >
                Close Fact
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
