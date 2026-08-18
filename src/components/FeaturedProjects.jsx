import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

import tinythunderImg from '../../assets/project-tinythunder.png';
import skillschoolImg from '../../assets/project-skillschool.png';
import kesugImg from '../../assets/project-kesug.png';
import quickmartImg from '../../assets/project-quickmart.png';
import webflowImg from '../../assets/project-webflow.png';

const projects = [
  {
    id: 'tinythunder',
    title: 'TinyThunder AI',
    bgTitle: 'TinyThunder',
    category: 'Webflow CMS',
    link: 'https://www.tinythunder.ai/',
    image: tinythunderImg,
    rotate: -3.5,
    x: -420,
  },
  {
    id: 'skillschool',
    title: 'Skill School',
    bgTitle: 'Skill School',
    category: 'React / Vercel',
    link: 'https://skill-school-website-gufs.vercel.app/',
    image: skillschoolImg,
    rotate: -1.5,
    x: -210,
  },
  {
    id: 'kesug',
    title: 'Hassam Kesug',
    bgTitle: "Hassam's Portfolio",
    category: 'WordPress',
    link: 'https://hassam.kesug.com/',
    image: kesugImg,
    rotate: 0,
    x: 0,
  },
  {
    id: 'quickmart',
    title: 'Quick Mart',
    bgTitle: 'Quick Mart',
    category: 'WooCommerce',
    link: 'https://slategrey-chinchilla-993006.hostingersite.com/',
    image: quickmartImg,
    rotate: 1.5,
    x: 210,
  },
  {
    id: 'webflow',
    title: 'Webflow Portfolio',
    bgTitle: 'Webflow Portfolio',
    category: 'Webflow',
    link: 'https://hassam-khan.webflow.io/',
    image: webflowImg,
    rotate: 3.5,
    x: 420,
  },
];

export default function FeaturedProjects() {
  const [hovered, setHovered] = useState(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const mobileScrollRef = useRef(null);

  // Active project index (desktop hover or mobile scroll)
  const activeDesktop = hovered ?? 2;

  // Continuous floating motion loop for desktop
  useEffect(() => {
    let animId;
    const loop = () => {
      setTime(prev => prev + 0.03);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Smooth mouse move parallax for desktop
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const normX = (e.clientX - centerX) / (rect.width / 2);
      const normY = (e.clientY - centerY) / (rect.height / 2);

      setMouseOffset({
        x: normX * 14,
        y: normY * 10,
      });
    };

    const handleMouseLeave = () => {
      setMouseOffset({ x: 0, y: 0 });
    };

    const sectionEl = sectionRef.current;
    if (sectionEl) {
      sectionEl.addEventListener('mousemove', handleMouseMove);
      sectionEl.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (sectionEl) {
        sectionEl.removeEventListener('mousemove', handleMouseMove);
        sectionEl.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Track active index during mobile horizontal scrolling
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const container = mobileScrollRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = 276; // Card 260px + gap 16px
    const newIndex = Math.min(
      projects.length - 1,
      Math.max(0, Math.round(scrollLeft / itemWidth))
    );
    if (newIndex !== mobileActiveIndex) {
      setMobileActiveIndex(newIndex);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative border-b border-white/10 bg-[#0c0d12] overflow-hidden min-h-[640px] md:h-[100dvh] flex flex-col justify-between py-8 md:py-0"
    >
      {/* Grid background lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent calc(100%/6))',
          zIndex: 0,
        }}
      />

      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[850px] h-[350px] md:h-[450px] bg-blue-600/10 blur-[140px] md:blur-[170px] rounded-full pointer-events-none" />

      {/* ── DYNAMIC BACKGROUND TITLE ── */}
      <div
        aria-hidden="true"
        className="absolute top-[28%] left-0 w-full flex justify-center z-0 pointer-events-none select-none"
      >
        <div style={{ position: 'relative', textAlign: 'center', width: '100%' }}>
          {/* Desktop background text */}
          <h2
            key={`desktop-${activeDesktop}`}
            className="hidden md:block"
            style={{
              fontSize: 'clamp(3.5rem, 9vw, 9rem)',
              fontWeight: 900,
              color: 'rgba(255, 255, 255, 0.14)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              fontFamily: "'Outfit', sans-serif",
              whiteSpace: 'nowrap',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
              transform: `translateY(${mouseOffset.y * 0.3}px)`,
            }}
          >
            {projects[activeDesktop].bgTitle}
          </h2>

          {/* Mobile background text (pushed lower, synced to swipe) */}
          <h2
            key={`mobile-${mobileActiveIndex}`}
            className="block md:hidden"
            style={{
              fontSize: 'clamp(2.4rem, 10vw, 4.2rem)',
              fontWeight: 900,
              color: 'rgba(255, 255, 255, 0.16)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              fontFamily: "'Outfit', sans-serif",
              whiteSpace: 'nowrap',
              transition: 'opacity 0.35s ease',
            }}
          >
            {projects[mobileActiveIndex].bgTitle}
          </h2>

          <div
            style={{
              position: 'absolute',
              top: '30%',
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(12,13,18,0.85) 60%, rgba(12,13,18,1) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* ── CENTERED HEADER ── */}
      <div
        className="relative z-20 text-center px-4 pt-4 md:pt-10 max-w-[650px] mx-auto"
      >
        <span className="inline-block eyebrow-pill mb-2">MY RECENT WORK</span>
        <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-2">
          Websites I've Built & Launched
        </h3>
        <p className="text-xs sm:text-sm text-slate-400">
          <span className="hidden md:inline">Hover over any card to explore. Click to visit the live site.</span>
          <span className="md:hidden">Swipe side-to-side to view projects. Tap to visit live site.</span>
        </p>
      </div>

      {/* ── MOBILE HORIZONTAL SCROLL VIEW (CLEAN IMAGE CARDS, NO TEXT OVERLAY) ── */}
      <div className="md:hidden relative z-20 my-4">
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-8 py-3 no-scrollbar scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="snap-center shrink-0 w-[260px] h-[162px] rounded-xl overflow-hidden bg-[#11131c] border border-white/15 shadow-[0_14px_35px_rgba(0,0,0,0.7)] block relative"
            >
              {/* Clean Image Only — NO text inside card */}
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
            </a>
          ))}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-3">
          {projects.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                mobileActiveIndex === i ? 'w-6 bg-blue-500' : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── MOBILE BOTTOM SHOWCASE INFO BAR ── */}
      <div className="md:hidden relative z-20 px-6 pb-4 pt-2 flex items-center justify-between">
        <div>
          <h4 className="text-base font-bold text-white mb-0.5">
            {projects[mobileActiveIndex].title}
          </h4>
          <span className="text-xs text-blue-400 font-medium">
            {projects[mobileActiveIndex].category}
          </span>
        </div>

        <a
          href={projects[mobileActiveIndex].link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-xs font-semibold text-blue-400 hover:bg-blue-600 hover:text-white transition-all"
        >
          <span>Visit Live</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* ── DESKTOP STACKED FLOATING CARDS VIEW (>= 768px) ── */}
      <div
        className="hidden md:flex relative z-10 items-center justify-center flex-1"
        style={{ position: 'relative' }}
      >
        {projects.map((project, index) => {
          const isHovered = hovered === index;
          const anyHovered = hovered !== null;

          // Continuous gentle sine-wave float
          const floatY = Math.sin(time + index * 0.8) * 5;
          const floatRot = Math.cos(time + index * 0.6) * 0.8;

          // Mouse parallax offset
          const moveX = mouseOffset.x * (1 + (index - 2) * 0.15);
          const moveY = mouseOffset.y * 0.8;

          let rotate = project.rotate + floatRot;
          let translateX = project.x + moveX;
          let translateY = floatY + moveY;
          let scale = 1;
          let zIndex = 10 + index;
          let opacity = 1;
          let shadow = '0 14px 40px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.12)';

          if (isHovered) {
            rotate = 0;
            translateY = -28;
            scale = 1.08;
            zIndex = 60;
            opacity = 1;
            shadow = '0 30px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.35), 0 0 35px rgba(59,130,246,0.25)';
          } else if (anyHovered) {
            const dist = index - hovered;
            rotate = project.rotate * 1.1;
            translateX = project.x + (dist > 0 ? 35 : -35) + moveX;
            scale = 0.96;
            opacity = 0.85;
          }

          return (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'absolute',
                width: '260px',
                height: '162px',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#11131c',
                boxShadow: shadow,
                transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                zIndex,
                opacity,
                transition: isHovered 
                  ? 'transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s ease, box-shadow 0.35s ease' 
                  : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease, box-shadow 0.5s ease',
                cursor: 'pointer',
                display: 'block',
                textDecoration: 'none',
                willChange: 'transform, opacity',
                border: isHovered ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block',
                  imageRendering: '-webkit-optimize-contrast',
                }}
              />
            </a>
          );
        })}
      </div>

      {/* ── FOOTER SHOWCASE INFO (DESKTOP ONLY) ── */}
      <div
        className="hidden md:flex relative z-10 px-12 pb-9 justify-between items-end"
      >
        <div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginBottom: '4px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
            Selected Project
          </p>
          <div className="flex items-center gap-3">
            <h4 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 700, letterSpacing: '-0.01em' }}>
              {projects[activeDesktop].title}
            </h4>
            <span style={{ height: '12px', width: '1px', background: 'rgba(255,255,255,0.2)' }} />
            <span style={{ color: '#60a5fa', fontSize: '13px', fontWeight: 500 }}>
              {projects[activeDesktop].category}
            </span>
          </div>
        </div>

        <a
          href={projects[activeDesktop].link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-xs font-semibold text-white transition-all duration-300 shadow-sm"
          onClick={(e) => e.stopPropagation()}
          style={{ textDecoration: 'none' }}
        >
          <span>Visit Live Website</span>
          <ExternalLink style={{ width: '14px', height: '14px', color: '#60a5fa' }} />
        </a>
      </div>

    </section>
  );
}
