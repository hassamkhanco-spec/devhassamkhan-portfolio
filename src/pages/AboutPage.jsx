import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import {
  ArrowRight, Code2, Layers, Figma, Zap, Globe, CheckCircle2,
  ShieldCheck, Rocket, Users, MessageSquare
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LiquidMetalHero from '../components/ui/liquid-metal-hero';

/* ── Fade-up animation wrapper ── */
function FadeUp({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Service Card ── */
function ServiceCard({ icon: Icon, title, description, accentColor, delay }) {
  return (
    <FadeUp delay={delay}>
      <div className="group relative rounded-2xl p-6 bg-[#111520] border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-1 h-full">
        <div
          className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-[50px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `${accentColor}15` }}
        />
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border"
          style={{
            background: `linear-gradient(135deg, ${accentColor}18 0%, #090c12 100%)`,
            borderColor: `${accentColor}30`,
          }}
        >
          <Icon className="w-5 h-5" style={{ color: accentColor }} />
        </div>
        <h3 className="text-base font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
        <div
          className="absolute bottom-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
        />
      </div>
    </FadeUp>
  );
}

/* ── Stat Pill ── */
function StatPill({ value, label, icon: Icon }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#111520] border border-white/10">
      <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
        <Icon className="w-5 h-5 text-blue-400" />
      </div>
      <div>
        <span className="text-lg font-bold text-white">{value}</span>
        <p className="text-[11px] text-slate-400 font-medium">{label}</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ABOUT PAGE — SEO OPTIMIZED WITH EXACT 21ST-DEV LIQUID METAL HERO
══════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'About Hassam Khan | WordPress & Webflow Developer in Pakistan';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Meet Hassam Khan, a Pakistan-based web developer specializing in WordPress and Webflow. Building pixel-perfect, fast, custom websites for clients worldwide.');
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pb-20 relative overflow-hidden">

        {/* ══════ FIRST SECTION: LIQUID METAL HERO (EXACT 21ST DESIGN MATCH) ══════ */}
        <LiquidMetalHero
          badge="ABOUT HASSAM KHAN"
          title="About Hassam Khan"
          subtitle="Hi, I'm Hassam Khan — a web developer based in Pakistan, specializing in WordPress and Webflow development. I build fast, custom, pixel-perfect websites that turn Figma designs into fully functional, responsive experiences."
          primaryCtaLabel="Work With Me"
          secondaryCtaLabel="Explore Services"
          onPrimaryCtaClick={() => {
            window.location.href = '/#contact';
          }}
          onSecondaryCtaClick={() => {
            const whyMeSection = document.getElementById('why-me-details');
            if (whyMeSection) {
              whyMeSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          features={[
            "WordPress Developer",
            "Webflow Developer",
            "Figma to Code Expert",
            "Web Developer Near Me"
          ]}
        />

        <div className="max-w-4xl mx-auto px-5 sm:px-6 relative z-10 pt-10">

          {/* ── Mini Stats Row ── */}
          <FadeUp delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-16 sm:mb-20">
              <StatPill value="95+" label="PageSpeed Score" icon={Zap} />
              <StatPill value="1:1" label="Figma to Code Precision" icon={Figma} />
              <StatPill value="100%" label="Fluid UX Responsiveness" icon={Globe} />
              <StatPill value="7 Days" label="Post-Launch Bug Guarantee" icon={ShieldCheck} />
            </div>
          </FadeUp>

          {/* ── Experience Summary Card ── */}
          <FadeUp delay={0.15}>
            <div className="rounded-2xl p-6 sm:p-8 bg-[#111520] border border-white/10 mb-16 sm:mb-20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/8 blur-[80px] rounded-full pointer-events-none" />
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed relative z-10">
                As a specialized <strong className="text-white">WordPress developer</strong> and{' '}
                <strong className="text-white">Webflow developer</strong>, I help business owners, SaaS founders, and creative agencies bring their designs to life — crafting fast, responsive, pixel-perfect web experiences with clean code, scalable architecture, and uncompromised quality.
              </p>
            </div>
          </FadeUp>

          {/* ══════ WHY WORK WITH ME ══════ */}
          <FadeUp>
            <div id="why-me-details" className="text-center mb-10 pt-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-blue-400 font-mono">
                  WHY WORK WITH ME
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                What I Bring to Every Project
              </h2>
              <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
                If you're searching for a <strong className="text-slate-200">web developer near me</strong> in Pakistan,
                here's what sets my work apart.
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-4 mb-16 sm:mb-20">
            <ServiceCard
              icon={Layers}
              title="Custom WordPress Development"
              description="Theme customization, Elementor builds, and fully bespoke WordPress sites tailored to your brand. Every WordPress developer project is built for speed and scalability."
              accentColor="#60A5FA"
              delay={0.05}
            />
            <ServiceCard
              icon={Globe}
              title="Webflow Development"
              description="Pixel-perfect, no-code-friendly builds using Webflow's visual development platform, ideal for fast, animation-rich sites. As a dedicated Webflow developer, I ensure every interaction feels premium."
              accentColor="#60A5FA"
              delay={0.1}
            />
            <ServiceCard
              icon={Figma}
              title="Figma to Code"
              description="I convert Figma designs into production-ready websites with pixel-perfect accuracy — zero spacing, font, or color discrepancies between design and live build."
              accentColor="#60A5FA"
              delay={0.15}
            />
            <ServiceCard
              icon={Zap}
              title="Performance-Focused"
              description="Every site I build is optimized for speed, mobile responsiveness, and SEO from the ground up. PageSpeed 95+ scores are standard, not optional."
              accentColor="#60A5FA"
              delay={0.2}
            />
          </div>

          {/* ══════ MY EXPERIENCE ══════ */}
          <FadeUp>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-5">
                <Code2 className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#60A5FA] font-mono">
                  MY EXPERIENCE
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                Proven Track Record
              </h2>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-2xl p-6 sm:p-8 bg-[#111520] border border-white/10 mb-16 sm:mb-20 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/6 blur-[80px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                  Working with clients across different industries who need a dependable <strong className="text-white">WordPress developer</strong> or{' '}
                  <strong className="text-white">Webflow developer</strong>, I deliver tailored digital solutions with focus on high performance, seamless interactions, and pixel-perfect design execution — on time and within budget.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'SaaS & Agency Landing Pages',
                    'E-commerce & WooCommerce Stores',
                    'Webflow CMS Websites',
                    'Custom WordPress Themes',
                    'Responsive & Mobile-First Design',
                    'Cross-Browser QA Testing',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#60A5FA] shrink-0" />
                      <span className="text-sm text-slate-300 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>

          {/* ══════ CTA ══════ */}
          <FadeUp>
            <div className="text-center rounded-2xl p-8 sm:p-12 bg-gradient-to-br from-[#111520] to-[#0d1117] border border-white/10 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#60A5FA]" />
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#60A5FA] font-mono">
                    LET'S CONNECT
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                  Let's Work Together
                </h2>
                <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed">
                  Whether you need a new <strong className="text-slate-200">WordPress website</strong>, a custom{' '}
                  <strong className="text-slate-200">Webflow build</strong>, or you're simply looking for a trustworthy{' '}
                  <strong className="text-slate-200">web developer in Pakistan</strong>, I'd love to hear about your project.
                </p>
                <a
                  href="/#contact"
                  className="btn-primary py-3 px-8 text-sm font-bold inline-flex items-center gap-2 rounded-full"
                >
                  Contact Me
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </FadeUp>

        </div>
      </main>
      <Footer />
    </>
  );
}
