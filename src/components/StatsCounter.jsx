import React, { useEffect, useRef, useState } from 'react';
import { FolderCheck, Award, Star, HeartHandshake, X, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

const stats = [
  {
    id: 'projects',
    value: 10,
    suffix: '+',
    label: 'Projects Completed',
    subtext: 'Webflow & WordPress Builds',
    icon: FolderCheck,
    modalTitle: '10+ Completed Client Projects',
    modalBadge: 'Verified Work Portfolio',
    description: 'Delivered high-converting Webflow CMS sites and custom WordPress builds for clients worldwide via Fiverr & Upwork.',
    details: [
      'Real-world client SaaS & agency landing pages (e.g. tinythunder.ai)',
      'High-converting WooCommerce & Webflow store setups',
      'Pixel-perfect 1:1 Figma-to-code fidelity across all devices',
      'Clean CMS collections with scalable content structure'
    ],
    highlight: '100% On-Time Delivery Record'
  },
  {
    id: 'experience',
    value: 100,
    suffix: '%',
    label: 'Figma to Code Expert',
    subtext: '1:1 Design Accuracy',
    icon: Award,
    modalTitle: 'Pixel-Perfect Figma-to-Code Fidelity',
    modalBadge: 'Quality Guarantee',
    description: 'Specialized in turning complex Figma, Adobe XD, and Sketch designs into 100% pixel-perfect, responsive Webflow and WordPress websites with zero design compromise.',
    details: [
      'Expertise in Webflow CMS, interactions & custom JavaScript',
      'WordPress & Elementor Pro theme customizer',
      'Mobile-first responsive architecture (iOS & Android optimized)',
      'PageSpeed 95+ score optimization & clean CSS systems'
    ],
    highlight: 'Clean Code & Zero Layout Shift'
  },
  {
    id: 'rating',
    value: 5,
    suffix: '★',
    label: 'Client Rating',
    subtext: 'Fiverr & Upwork History',
    icon: Star,
    modalTitle: '5.0 Five-Star Client Satisfaction',
    modalBadge: 'Top Rated Work',
    description: 'Consistently rated 5 stars by business owners and agency directors for communication speed, code quality, and execution.',
    details: [
      'Verified 5.0 client feedback on major freelance platforms',
      'Clear, fast daily updates & milestone progress reports',
      'Zero friction revisions until 100% design alignment',
      'Friendly post-launch support & client training videos'
    ],
    highlight: '5.0 Rating Across All Platforms'
  },
  {
    id: 'satisfaction',
    value: 100,
    suffix: '%',
    label: 'Satisfaction Rate',
    subtext: 'Quality & Timelines',
    icon: HeartHandshake,
    modalTitle: '100% Quality & Satisfaction Guarantee',
    modalBadge: 'Client Commitment',
    description: 'Every project comes with a 100% satisfaction commitment, rigorous cross-browser testing, and post-launch maintenance.',
    details: [
      '24/7 fast response time & transparent communication',
      'Rigorous cross-browser QA testing (Chrome, Safari, Firefox)',
      'Free 30-day post-launch bug fixes & layout support',
      'Comprehensive Webflow / WordPress dashboard walkthrough'
    ],
    highlight: '30 Days Free Support Included'
  }
];

import { CountingNumber } from './animate-ui/CountingNumber';

export default function StatsCounter() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <section id="stats" className="py-14 sm:py-20 relative border-y border-white/10 bg-[#090c12]">
      {/* Hero-style subtle blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                onClick={() => setActiveModal(stat)}
                className="relative group rounded-2xl p-4 sm:p-6 bg-[#111520] border border-blue-500/20 backdrop-blur-md hover:border-blue-500/50 hover:bg-[#161c2b] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.2)] cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                {/* Card Header Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20 opacity-80 group-hover:opacity-100 transition-opacity">
                    Click info →
                  </span>
                </div>

                {/* Stat Number & Label */}
                <div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none mb-2 font-heading">
                    <CountingNumber value={stat.value} suffix={stat.suffix} className="font-extrabold text-white" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">{stat.label}</h3>
                  <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 font-medium">{stat.subtext}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          CLICK MODAL POPUP (Matching Hero Dark Theme)
         ════════════════════════════════════════════════════════════ */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#111520] border border-blue-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_-15px_rgba(59,130,246,0.25)] space-y-6 overflow-hidden">
            
            {/* Background Glow inside modal */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  {React.createElement(activeModal.icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                    {activeModal.modalBadge}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                    {activeModal.modalTitle}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Description */}
            <p className="text-slate-300 text-sm leading-relaxed">
              {activeModal.description}
            </p>

            {/* Bullet Details */}
            <div className="space-y-3 pt-1">
              {activeModal.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-xs sm:text-sm font-medium">{detail}</span>
                </div>
              ))}
            </div>

            {/* Modal Highlight Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{activeModal.highlight}</span>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="btn-primary py-2 px-5 text-xs font-bold rounded-full"
              >
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
