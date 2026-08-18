import React, { useState, useEffect, useRef } from 'react';
import { Globe, Layout, Layers, Smartphone, Search, Zap, ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import webflowImg from '../../assets/webflow-service.jpg';
import wordpressImg from '../../assets/wordpress-service.jpg';
import figmaImg from '../../assets/figma-service.jpg';
import responsiveImg from '../../assets/responsive-service.jpg';
import seoImg from '../../assets/seo-service.png';
import speedImg from '../../assets/speed-service.png';

const services = [
  {
    id: 'webflow',
    number: '01',
    title: 'Webflow Development',
    category: 'Figma to Webflow & CMS',
    icon: Globe,
    src: webflowImg,
    description: 'Custom Webflow websites built from scratch or Figma with CMS collections & custom interactions.',
  },
  {
    id: 'wordpress',
    number: '02',
    title: 'WordPress Development',
    category: 'Elementor Pro & Custom Themes',
    icon: Layout,
    src: wordpressImg,
    description: 'Business websites and blogs on WordPress using Elementor Pro, custom themes & plugin setup.',
  },
  {
    id: 'figma',
    number: '03',
    title: 'Figma to Code',
    category: 'Pixel-Perfect 1:1 Conversion',
    icon: Layers,
    src: figmaImg,
    description: 'Pixel-perfect conversion of your Figma designs into responsive Webflow or WordPress websites.',
  },
  {
    id: 'responsive',
    number: '04',
    title: 'Responsive Design',
    category: 'Fluid Multi-Device UX',
    icon: Smartphone,
    src: responsiveImg,
    description: 'Every site looks and performs flawlessly across desktop, laptop, tablet, and mobile devices.',
  },
  {
    id: 'seo',
    number: '05',
    title: 'SEO Optimization',
    category: 'Schema & Meta Rankings',
    icon: Search,
    src: seoImg,
    description: 'Schema markup, meta tags, heading hierarchy, and clean code structured for search rankings.',
  },
  {
    id: 'speed',
    number: '06',
    title: 'Speed & Performance',
    category: '90+ Google PageSpeed Score',
    icon: Zap,
    src: speedImg,
    description: '90+ PageSpeed scores achieved with asset optimization, lazy loading, and clean architecture.',
  },
];

/* ── Custom Hook for Mobile View Check ── */
function useMobileCheck() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

/* ── Service Icon with Smooth Motion Micro-animations ── */
function AnimatedServiceIcon({ id, icon: Icon }) {
  const getMotionProps = () => {
    switch (id) {
      case 'webflow':
        return {
          animate: { rotate: [0, 360], scale: [1, 1.08, 1] },
          transition: {
            rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
            scale: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
          },
        };
      case 'wordpress':
        return {
          animate: { y: [0, -3, 0], scale: [1, 1.1, 1] },
          transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'figma':
        return {
          animate: { y: [-3, 3, -3], rotate: [-5, 5, -5] },
          transition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'responsive':
        return {
          animate: { rotate: [-10, 10, -10], scale: [1, 1.06, 1] },
          transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'seo':
        return {
          animate: { scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] },
          transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'speed':
        return {
          animate: { scale: [1, 1.25, 0.95, 1.15, 1], rotate: [0, -10, 10, -5, 0] },
          transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' },
        };
      default:
        return {
          animate: { scale: [1, 1.1, 1] },
          transition: { duration: 2, repeat: Infinity },
        };
    }
  };

  return (
    <div
      className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 shadow-lg overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.15) 0%, rgba(9, 12, 18, 0.95) 100%)',
        border: '1px solid rgba(96, 165, 250, 0.35)',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.25), 0 8px 25px rgba(96, 165, 250, 0.2)',
      }}
    >
      {/* Animated rotating electric blue glow background ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0 280deg, #60A5FA 360deg)',
          borderRadius: '16px',
        }}
      />
      <div className="absolute inset-[1px] bg-[#090c12]/90 rounded-[15px] z-0" />

      {/* Animated Vector Icon */}
      <motion.div {...getMotionProps()} className="relative z-10">
        <Icon
          className="w-5 h-5 sm:w-6 sm:h-6 text-[#60A5FA]"
          style={{
            filter: 'drop-shadow(0 2px 10px rgba(96, 165, 250, 0.85))',
          }}
        />
      </motion.div>
    </div>
  );
}

/* ── Floating Desktop Hover Modal ── */
function HoverModal({ activeIndex, visible }) {
  const imgContainerRef = useRef(null);
  const cursorRef = useRef(null);
  const mousePos = useRef({ x: -999, y: -999 });
  const currentPos = useRef({ x: -999, y: -999 });
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.08);
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.08);

      if (imgContainerRef.current) {
        imgContainerRef.current.style.left = `${currentPos.current.x}px`;
        imgContainerRef.current.style.top = `${currentPos.current.y}px`;
      }
      if (cursorRef.current) {
        cursorRef.current.style.left = `${mousePos.current.x}px`;
        cursorRef.current.style.top = `${mousePos.current.y}px`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Floating Image Window for Desktop */}
      <div
        ref={imgContainerRef}
        className="pointer-events-none fixed z-50 overflow-hidden rounded-2xl border border-blue-500/40 bg-slate-900 shadow-[0_25px_60px_rgba(0,0,0,0.9)] w-[320px] h-[210px]"
        style={{
          transform: 'translate(-50%, -50%)',
          opacity: visible ? 1 : 0,
          scale: visible ? '1' : '0.85',
          transition: 'opacity 0.25s ease, scale 0.25s ease',
          willChange: 'left, top',
        }}
      >
        <div
          style={{
            height: `${services.length * 100}%`,
            transform: `translateY(${activeIndex * (-100 / services.length)}%)`,
            transition: 'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)',
            willChange: 'transform',
          }}
        >
          {services.map((service) => (
            <div
              key={service.id}
              style={{ height: `${100 / services.length}%` }}
              className="relative w-full overflow-hidden"
            >
              <img
                src={service.src}
                alt={service.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate">{service.title}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-600 text-white font-mono uppercase tracking-wider">Preview</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-50 rounded-full bg-blue-600 shadow-xl shadow-blue-500/60 flex items-center justify-center w-12 h-12"
        style={{
          transform: 'translate(-50%, -50%)',
          opacity: visible ? 1 : 0,
          scale: visible ? '1' : '0',
          transition: 'opacity 0.2s ease, scale 0.2s ease',
          willChange: 'left, top',
        }}
      >
        <span className="text-[9px] font-bold text-white uppercase tracking-wider">View</span>
      </div>
    </>
  );
}

/* ── Service Row Item ── */
function ServiceRow({ index, service, isMobile, isExpanded, onToggle, onEnter, onLeave }) {
  return (
    <div
      className={`group relative flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 py-6 sm:py-7 px-4 sm:px-6 cursor-pointer transition-colors duration-300 ${
        isExpanded ? 'bg-white/[0.04]' : 'hover:bg-white/[0.025]'
      }`}
      onMouseEnter={() => !isMobile && onEnter(index)}
      onMouseLeave={() => !isMobile && onLeave()}
      onClick={() => isMobile && onToggle(index)}
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="text-xs font-mono font-semibold text-slate-600 group-hover:text-[#60A5FA] transition-colors w-6 text-right">
            {service.number}
          </span>

          <AnimatedServiceIcon id={service.id} icon={service.icon} />

          <div>
            <h3 className="text-base sm:text-2xl font-bold text-white transition-transform duration-300 ease-out group-hover:translate-x-2">
              {service.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 max-w-lg hidden sm:block">
              {service.description}
            </p>
          </div>
        </div>

        {/* Mobile Dropdown Indicator Arrow */}
        {isMobile && (
          <div className="md:hidden p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-blue-400' : ''}`} />
          </div>
        )}
      </div>

      {/* Right Category & Arrow (Desktop) */}
      <div className="hidden md:flex items-center justify-end gap-6">
        <span className="text-xs sm:text-sm font-medium text-slate-500 group-hover:text-slate-200 transition-all duration-300 group-hover:translate-x-1">
          {service.category}
        </span>
        <div
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:border-[#60A5FA] group-hover:bg-[#60A5FA]/10 group-hover:text-[#60A5FA]"
          style={{
            borderColor: `rgba(255,255,255,0.1)`,
            color: 'rgba(150,150,160,1)',
          }}
        >
          <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
        </div>
      </div>

      {/* Mobile Inline Collapsible Preview Card */}
      <AnimatePresence>
        {isMobile && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden w-full mt-4 pt-3 border-t border-white/10"
          >
            <div className="relative rounded-2xl overflow-hidden border border-blue-500/40 bg-[#090c12] shadow-xl">
              <img
                src={service.src}
                alt={service.title}
                loading="lazy"
                decoding="async"
                className="w-full h-48 object-cover brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate max-w-[200px]">{service.title}</span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-blue-600 text-white font-mono uppercase font-bold tracking-wider">
                  Live Preview
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover row glow line */}
      <div
        className={`absolute left-0 top-0 h-full w-1 rounded-r transition-opacity duration-300 ${
          isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        style={{ background: 'linear-gradient(to bottom, transparent, #60A5FA, transparent)' }}
      />
    </div>
  );
}

/* ── Main Services Section ── */
export default function SkillsGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(null);
  const [visible, setVisible] = useState(false);
  const isMobile = useMobileCheck();
  const sectionRef = useRef(null);

  // Outside click / tap listener to close mobile expanded previews or floating modals when tapping outside
  useEffect(() => {
    const handleOutsideTouch = (e) => {
      if (sectionRef.current && !sectionRef.current.contains(e.target)) {
        setVisible(false);
        setMobileActiveIndex(null);
      }
    };
    document.addEventListener('touchstart', handleOutsideTouch);
    document.addEventListener('click', handleOutsideTouch);
    return () => {
      document.removeEventListener('touchstart', handleOutsideTouch);
      document.removeEventListener('click', handleOutsideTouch);
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-16 sm:py-28 relative border-b border-white/10 bg-[#090c12]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[300px] sm:h-[400px] bg-blue-600/10 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none" />

      {/* Floating Hover Modal ONLY on Desktop */}
      {!isMobile && <HoverModal activeIndex={activeIndex} visible={visible} />}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="eyebrow-pill mb-3 inline-block">WHAT I DO</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Services built around your <span className="highlight-text">digital needs.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4">
            {isMobile
              ? 'Tap any service to expand and preview live builds. Handcrafted solutions built for speed & conversion.'
              : 'Hover over any service to preview live builds. Handcrafted solutions built for speed, conversion, and design excellence.'}
          </p>
        </div>

        {/* Service Rows List */}
        <div
          className="border-t border-white/10 rounded-2xl overflow-hidden bg-[#0c1019]/60 backdrop-blur-xl border border-white/10 shadow-2xl"
          onMouseEnter={() => !isMobile && setVisible(true)}
          onMouseLeave={() => !isMobile && setVisible(false)}
        >
          {services.map((service, index) => (
            <ServiceRow
              key={service.id}
              index={index}
              service={service}
              isMobile={isMobile}
              isExpanded={mobileActiveIndex === index}
              onToggle={(i) => setMobileActiveIndex(mobileActiveIndex === i ? null : i)}
              onEnter={(i) => {
                setActiveIndex(i);
                setVisible(true);
              }}
              onLeave={() => setVisible(false)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
