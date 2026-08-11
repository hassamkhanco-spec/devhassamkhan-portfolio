import React, { useState } from 'react';
import { MessageSquare, Clock, Palette, Code2, Rocket, ArrowRight, X, CheckCircle2, ShieldCheck, FileCode, Monitor } from 'lucide-react';

const steps = [
  {
    num: "01",
    title: "Discovery",
    shortDesc: "Tell me about your project goals, scope & target audience",
    icon: MessageSquare,
    modalTitle: "01. Discovery & Goal Alignment",
    modalBadge: "Phase 01 — Scope & Planning",
    fullDesc: "We begin with a deep dive into your business goals, target audience, brand identity, and technical requirements to build a clear strategy.",
    checklist: [
      "Figma / Adobe XD file inspection & asset audit",
      "Content & CMS structure mapping (Webflow or WordPress)",
      "Target audience & conversion funnel definition",
      "Scope approval & transparent milestone setup"
    ],
    duration: "Day 01 — Initial Consult"
  },
  {
    num: "02",
    title: "Estimate",
    shortDesc: "Receive a clear quote, timeline & milestone plan within 24h",
    icon: Clock,
    modalTitle: "02. Transparent Fixed Quote & Timeline",
    modalBadge: "Phase 02 — Proposal & Quote",
    fullDesc: "No hidden costs or vague timelines. You receive a comprehensive proposal detailing exact deliverables, fixed pricing, and step-by-step milestones.",
    checklist: [
      "Fixed-price quote within 24 hours (Fiverr, Upwork, or Direct)",
      "Clear milestone breakdown (Design, Development, Launch)",
      "Platform recommendation (Webflow CMS vs WordPress Elementor)",
      "100% money-back quality guarantee"
    ],
    duration: "Within 24 Hours"
  },
  {
    num: "03",
    title: "Design",
    shortDesc: "Share your Figma files or I design a modern prototype for you",
    icon: Palette,
    modalTitle: "03. Figma Design & Component System",
    modalBadge: "Phase 03 — UI / UX Prototyping",
    fullDesc: "Whether converting your existing Figma designs or creating custom UI layouts from scratch, every screen is crafted with modern design tokens.",
    checklist: [
      "Pixel-perfect 1:1 Figma-to-code layout preparation",
      "Typography, color token & design system establishment",
      "Responsive wireframing for Laptop, Tablet & Mobile screens",
      "Client design review & feedback iterations"
    ],
    duration: "1–3 Business Days"
  },
  {
    num: "04",
    title: "Develop",
    shortDesc: "I build in Webflow or WordPress with clean, fast, responsive code",
    icon: Code2,
    modalTitle: "04. Webflow & WordPress Engineering",
    modalBadge: "Phase 04 — Clean Development",
    fullDesc: "Building your website in Webflow CMS or WordPress with Elementor Pro, featuring 60fps animations, PageSpeed 95+ optimization, and zero layout shifts.",
    checklist: [
      "Custom Webflow CMS collections & interaction architecture",
      "WordPress Elementor Pro theme customizer setup",
      "Cross-browser testing (Chrome, Safari, Firefox, Edge)",
      "PageSpeed 95+ score optimization & image compression"
    ],
    duration: "2–5 Business Days"
  },
  {
    num: "05",
    title: "Launch",
    shortDesc: "Final QA testing, domain setup, client handoff & go live!",
    icon: Rocket,
    modalTitle: "05. Final QA, Handoff & Go-Live",
    modalBadge: "Phase 05 — Production Deployment",
    fullDesc: "The final phase includes domain DNS pointing, SSL security setup, basic SEO schema verification, video walkthrough handoff, and 30 days free support.",
    checklist: [
      "Custom domain & SSL certificate pointing",
      "Basic SEO meta tags & OpenGraph social card setup",
      "Video walkthrough tutorial for easy dashboard editing",
      "30-Day free post-launch support & maintenance"
    ],
    duration: "Go Live Day"
  }
];

export default function WorkflowProcess() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <section id="process" className="py-20 sm:py-28 relative border-b border-white/10 bg-[#090c12] overflow-hidden">
      {/* Background Hero-Style Blue Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <span className="eyebrow-pill mb-4 inline-flex items-center gap-2">
            Seamless Execution
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            From first message to <span className="highlight-text">live website</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Click any step below to explore full phase details, timelines, and deliverables.
          </p>
        </div>

        {/* ════════════════════════════════════════════════════════════
            DESKTOP LAYOUT (5 Connected Cards Grid)
           ════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:grid grid-cols-5 gap-4 relative">
          
          {/* Connecting Line */}
          <div className="absolute top-12 left-10 right-10 h-0.5 bg-blue-500/30 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                onClick={() => setActiveModal(step)}
                className="relative z-10 group rounded-2xl p-5 bg-[#111520] border border-blue-500/20 backdrop-blur-md hover:bg-[#161c2b] hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl cursor-pointer flex flex-col justify-between"
              >
                {/* Step Circle & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400 font-bold text-xs flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                    {step.num}
                  </div>
                  <Icon className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-blue-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {step.shortDesc}
                  </p>

                  <span className="text-[10px] font-semibold text-blue-400 inline-flex items-center gap-1 group-hover:underline">
                    View phase details →
                  </span>
                </div>

                {/* Arrow connector indicator */}
                {idx < steps.length - 1 && (
                  <div className="absolute -right-3 top-12 z-20 w-6 h-6 rounded-full bg-[#090c12] border border-blue-500/30 flex items-center justify-center text-blue-400 text-xs">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ════════════════════════════════════════════════════════════
            MOBILE / TABLET LAYOUT (Vertical Timeline Cards)
           ════════════════════════════════════════════════════════════ */}
        <div className="lg:hidden relative pl-6 sm:pl-8 space-y-6">
          
          {/* Vertical Connecting Line */}
          <div className="absolute left-[19px] sm:left-[27px] top-6 bottom-6 w-0.5 bg-blue-500/30" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                onClick={() => setActiveModal(step)}
                className="relative flex items-start gap-4 group cursor-pointer"
              >
                {/* Timeline Dot Badge */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-blue-500/40 bg-[#090c12] flex items-center justify-center text-xs font-bold text-blue-400 shrink-0 shadow-lg">
                  {step.num}
                </div>

                {/* Step Card Content */}
                <div className="w-full rounded-2xl p-4 sm:p-5 bg-[#111520] border border-blue-500/20 backdrop-blur-md hover:border-blue-500/40 transition-all shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      {step.title}
                    </h3>
                    <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-3">
                    {step.shortDesc}
                  </p>
                  <span className="text-[11px] font-semibold text-blue-400 inline-flex items-center gap-1">
                    Tap for full breakdown →
                  </span>
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
            
            {/* Background Glow */}
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

            {/* Full Description */}
            <p className="text-slate-300 text-sm leading-relaxed">
              {activeModal.fullDesc}
            </p>

            {/* Checklist Deliverables */}
            <div className="space-y-3 pt-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Deliverables & Workflow:</h4>
              {activeModal.checklist.map((item, idx) => (
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
                <span>Estimated Time: {activeModal.duration}</span>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="btn-primary py-2 px-5 text-xs font-bold rounded-full"
              >
                Close Phase
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
