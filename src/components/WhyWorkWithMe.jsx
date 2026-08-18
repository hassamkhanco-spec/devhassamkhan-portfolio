import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Gauge, Target, Smartphone, MessageSquareMore, ShieldCheck, HeartHandshake } from 'lucide-react';
import Lottie from 'lottie-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import speedometerData from '../assets/speedometer.json';
import pixelChatbotData from '../assets/pixel_chatbot.json';
import responsiveData from '../assets/responsive.json';
import dailyUpdatesData from '../assets/daily_updates.json';
import cleanCodeData from '../assets/clean_code.json';
import supportData from '../assets/support.json';

/* ── Custom hook for responsive window check ── */
function useMobileCheck() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 640);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return isMobile;
}

/* ── Pillar Data ── */
const pillars = [
  {
    id: 'pagespeed', number: '01',
    title: '95+ PageSpeed Score', subtitle: 'Lightning-Fast Performance',
    description: 'Every site is optimized with lazy loading, compressed assets, and clean CSS to consistently hit 95+ on Google PageSpeed Insights.',
    icon: Gauge, accentColor: '#60A5FA', lottieData: speedometerData,
  },
  {
    id: 'pixel', number: '02',
    title: '1:1 Pixel Perfection', subtitle: 'Figma-to-Code Fidelity',
    description: 'Your Figma, Adobe XD or Sketch designs translated to code with zero spacing, font, or color discrepancies. Guaranteed.',
    icon: Target, accentColor: '#60A5FA', lottieData: pixelChatbotData,
  },
  {
    id: 'responsive', number: '03',
    title: 'Zero Layout Shift', subtitle: 'Multi-Device Fluid UX',
    description: 'Fluid responsive layouts with zero CLS across all viewports — mobile, tablet, laptop, and ultrawide monitors.',
    icon: Smartphone, accentColor: '#60A5FA',
    dotLottieUrl: 'https://lottie.host/e8bf9fdf-7003-40d2-907b-14feb5350d16/mISmi5zLPv.lottie',
  },
  {
    id: 'updates', number: '04',
    title: 'Daily Progress Updates', subtitle: 'Transparent Milestones',
    description: 'Clear daily updates, milestone reports, and screen recordings at every stage. No surprises, no ghosting.',
    icon: MessageSquareMore, accentColor: '#60A5FA', lottieData: dailyUpdatesData,
  },
  {
    id: 'clean', number: '05',
    title: 'Clean & Scalable Code', subtitle: 'Future-Proof Architecture',
    description: 'Maintainable class structures, CMS-ready collections, and modular design patterns built to scale with your business.',
    icon: ShieldCheck, accentColor: '#60A5FA',
    dotLottieUrl: 'https://lottie.host/9729e54c-ea2f-427f-a88d-ab5ce602027c/8PFuS4dCRZ.lottie',
  },
  {
    id: 'support', number: '06',
    title: 'Free Post-Launch Support', subtitle: '7-Day Bug Fix Guarantee',
    description: '7 days of complimentary post-launch bug fixes, browser testing, and performance monitoring included on every project.',
    icon: HeartHandshake, accentColor: '#60A5FA',
    dotLottieUrl: 'https://lottie.host/3b2aadd1-ef07-4ea9-a4b5-8698c3e2f05a/SnELwtWWrL.lottie',
  },
];

/* ── Animated Icon Badge ── */
function AnimatedIcon({ pillar }) {
  return (
    <div className="relative w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center mb-3 sm:mb-5 shrink-0">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[-6px] sm:inset-[-8px] rounded-lg sm:rounded-xl pointer-events-none"
        style={{ border: `1.5px dashed ${pillar.accentColor}28` }}
      >
        <div
          className="absolute -top-[4px] sm:-top-[5px] left-1/2 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
          style={{ background: pillar.accentColor, boxShadow: `0 0 8px ${pillar.accentColor}` }}
        />
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-lg sm:rounded-xl pointer-events-none"
        style={{ border: `2px solid ${pillar.accentColor}25`, boxShadow: `0 0 14px ${pillar.accentColor}18` }}
      />
      <div
        className="relative w-full h-full rounded-lg sm:rounded-xl flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${pillar.accentColor}18 0%, #090c12 100%)`,
          border: `1px solid ${pillar.accentColor}30`,
          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.12)',
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 opacity-20"
          style={{ background: `conic-gradient(from 0deg, transparent 0 270deg, ${pillar.accentColor} 360deg)`, borderRadius: '10px' }}
        />
        <div className="absolute inset-[1px] bg-[#090c12]/88 rounded-[7px] sm:rounded-[11px]" />
        <div className="relative z-10 w-7 h-7 sm:w-10 sm:h-10 flex items-center justify-center pointer-events-none">
          {pillar.dotLottieUrl ? (
            <DotLottieReact
              src={pillar.dotLottieUrl}
              loop
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <Lottie animationData={pillar.lottieData} loop className="w-full h-full scale-125" />
          )}
        </div>
      </div>
      <div
        className="absolute -bottom-1.5 sm:-bottom-2 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-2 sm:h-3 rounded-full blur-md opacity-35 pointer-events-none"
        style={{ background: pillar.accentColor }}
      />
    </div>
  );
}


/* ── Pillar Card ── */
function PillarCard({ pillar }) {
  return (
    <div
      className="group relative rounded-xl sm:rounded-2xl p-3 sm:p-6 bg-[#111520] border border-white/10 backdrop-blur-xl overflow-hidden flex flex-col h-full"
      style={{
        boxShadow: '0 16px 40px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.05)',
        minHeight: '260px',
      }}
    >
      <div
        className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `${pillar.accentColor}12` }}
      />
      <span
        className="text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded border self-start mb-2.5 sm:mb-4"
        style={{ color: pillar.accentColor, background: `${pillar.accentColor}10`, borderColor: `${pillar.accentColor}25` }}
      >
        {pillar.number}
      </span>
      <AnimatedIcon pillar={pillar} />
      <h3 className="text-xs sm:text-base font-bold text-white leading-tight mb-1 tracking-tight">{pillar.title}</h3>
      <span className="text-[10px] sm:text-xs font-semibold mb-2 leading-tight" style={{ color: pillar.accentColor }}>{pillar.subtitle}</span>
      <p className="text-[10px] sm:text-xs text-slate-400 leading-snug sm:leading-relaxed flex-1">{pillar.description}</p>
      <div
        className="absolute bottom-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${pillar.accentColor}, transparent)` }}
      />
    </div>
  );
}

/* ── Desktop 3-Card Stacked → Fan Group ── */
const CARD_W_DESKTOP  = 340;
const FAN_DIST_DESKTOP = 375;

function DesktopStackGroup({ cards, scrollYProgress, enterStart, enterEnd, fanStart, fanEnd, holdEnd, fadeoutEnd }) {
  const rawY     = useTransform(scrollYProgress, [enterStart, enterEnd], [350, 0]);
  const smoothY  = useSpring(rawY, { stiffness: 85, damping: 22, restDelta: 0.001 });

  const opacity  = useTransform(
    scrollYProgress,
    fadeoutEnd
      ? [enterStart, enterEnd, holdEnd, fadeoutEnd]
      : [enterStart, enterEnd, 1.0],
    fadeoutEnd
      ? [0, 1, 1, 0]
      : [0, 1, 1]
  );

  const rawLX    = useTransform(scrollYProgress, [fanStart, fanEnd], [0, -FAN_DIST_DESKTOP]);
  const rawRX    = useTransform(scrollYProgress, [fanStart, fanEnd], [0,  FAN_DIST_DESKTOP]);
  const smoothLX = useSpring(rawLX, { stiffness: 70, damping: 22, restDelta: 0.001 });
  const smoothRX = useSpring(rawRX, { stiffness: 70, damping: 22, restDelta: 0.001 });

  const fanProg  = useTransform(scrollYProgress, [fanStart, fanEnd], [0, 1]);
  const lScale   = useTransform(fanProg, [0, 1], [0.92, 1]);
  const rScale   = useTransform(fanProg, [0, 1], [0.92, 1]);
  const lRot     = useTransform(fanProg, [0, 1], [-5, 0]);
  const rRot     = useTransform(fanProg, [0, 1], [ 5, 0]);

  return (
    <motion.div
      className="absolute inset-x-0 flex justify-center"
      style={{ opacity, top: '40%', transform: 'translateY(-50%)' }}
    >
      {/* Left card */}
      <motion.div className="absolute" style={{ y: smoothY, x: smoothLX, scale: lScale, rotate: lRot, zIndex: 1, width: CARD_W_DESKTOP }}>
        <PillarCard pillar={cards[0]} />
      </motion.div>
      {/* Right card */}
      <motion.div className="absolute" style={{ y: smoothY, x: smoothRX, scale: rScale, rotate: rRot, zIndex: 1, width: CARD_W_DESKTOP }}>
        <PillarCard pillar={cards[2]} />
      </motion.div>
      {/* Center card — front, stays */}
      <motion.div className="absolute" style={{ y: smoothY, zIndex: 3, width: CARD_W_DESKTOP }}>
        <PillarCard pillar={cards[1]} />
      </motion.div>
    </motion.div>
  );
}

/* ── Mobile 2-Card Stacked → Fan Group ── */
const CARD_W_MOBILE   = 155;
const FAN_DIST_MOBILE  = 82;

function MobileStackGroup2({ cards, scrollYProgress, enterStart, enterEnd, fanStart, fanEnd, holdEnd, fadeoutEnd }) {
  const rawY     = useTransform(scrollYProgress, [enterStart, enterEnd], [220, 0]);
  const smoothY  = useSpring(rawY, { stiffness: 85, damping: 22, restDelta: 0.001 });

  const opacity  = useTransform(
    scrollYProgress,
    fadeoutEnd
      ? [enterStart, enterEnd, holdEnd, fadeoutEnd]
      : [enterStart, enterEnd, 1.0],
    fadeoutEnd
      ? [0, 1, 1, 0]
      : [0, 1, 1]
  );

  /* Left card moves left by 82px, Right card moves right by 82px */
  const rawLX    = useTransform(scrollYProgress, [fanStart, fanEnd], [0, -FAN_DIST_MOBILE]);
  const rawRX    = useTransform(scrollYProgress, [fanStart, fanEnd], [0,  FAN_DIST_MOBILE]);
  const smoothLX = useSpring(rawLX, { stiffness: 70, damping: 22, restDelta: 0.001 });
  const smoothRX = useSpring(rawRX, { stiffness: 70, damping: 22, restDelta: 0.001 });

  const fanProg  = useTransform(scrollYProgress, [fanStart, fanEnd], [0, 1]);
  const lScale   = useTransform(fanProg, [0, 1], [0.94, 1]);
  const rScale   = useTransform(fanProg, [0, 1], [0.94, 1]);
  const lRot     = useTransform(fanProg, [0, 1], [-4, 0]);
  const rRot     = useTransform(fanProg, [0, 1], [ 4, 0]);

  return (
    <motion.div
      className="absolute inset-x-0 flex justify-center"
      style={{ opacity, top: '45%', transform: 'translateY(-50%)' }}
    >
      {/* Left card */}
      <motion.div className="absolute" style={{ y: smoothY, x: smoothLX, scale: lScale, rotate: lRot, zIndex: 1, width: CARD_W_MOBILE, height: '260px' }}>
        <PillarCard pillar={cards[0]} />
      </motion.div>
      {/* Right card */}
      <motion.div className="absolute" style={{ y: smoothY, x: smoothRX, scale: rScale, rotate: rRot, zIndex: 2, width: CARD_W_MOBILE, height: '260px' }}>
        <PillarCard pillar={cards[1]} />
      </motion.div>
    </motion.div>
  );
}

/* ── Progress Dots for Desktop (2 Groups of 3) ── */
function DesktopGroupDots({ scrollYProgress }) {
  const g1Op = useTransform(scrollYProgress, [0.05, 0.12, 0.43, 0.48], [0, 1, 1, 0]);
  const g2Op = useTransform(scrollYProgress, [0.52, 0.59, 1.0], [0, 1, 1]);
  return (
    <>
      <motion.div
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 pointer-events-none select-none"
        style={{ opacity: g1Op }}
      >
        <div className="flex gap-1.5">{[0,1,2].map(i=><div key={i} className="w-2 h-2 rounded-full bg-blue-400" style={{opacity:i===1?1:0.3}}/>)}</div>
        <span className="text-[11px] font-mono text-slate-500">Pillars 1–3 of 6</span>
      </motion.div>
      <motion.div
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 pointer-events-none select-none"
        style={{ opacity: g2Op }}
      >
        <div className="flex gap-1.5">{[0,1,2].map(i=><div key={i} className="w-2 h-2 rounded-full bg-blue-400" style={{opacity:i===1?1:0.3}}/>)}</div>
        <span className="text-[11px] font-mono text-slate-500">Pillars 4–6 of 6</span>
      </motion.div>
    </>
  );
}

/* ── Progress Dots for Mobile (3 Groups of 2) ── */
function MobileGroupDots({ scrollYProgress }) {
  const g1Op = useTransform(scrollYProgress, [0.03, 0.08, 0.30, 0.34], [0, 1, 1, 0]);
  const g2Op = useTransform(scrollYProgress, [0.36, 0.41, 0.63, 0.67], [0, 1, 1, 0]);
  const g3Op = useTransform(scrollYProgress, [0.69, 0.74, 1.0], [0, 1, 1]);
  return (
    <>
      <motion.div
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 pointer-events-none select-none"
        style={{ opacity: g1Op }}
      >
        <div className="flex gap-1">{[0,1].map(i=><div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400" />)}</div>
        <span className="text-[10px] font-mono text-slate-500">Pillars 1–2 of 6</span>
      </motion.div>
      <motion.div
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 pointer-events-none select-none"
        style={{ opacity: g2Op }}
      >
        <div className="flex gap-1">{[0,1].map(i=><div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400" />)}</div>
        <span className="text-[10px] font-mono text-slate-500">Pillars 3–4 of 6</span>
      </motion.div>
      <motion.div
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 pointer-events-none select-none"
        style={{ opacity: g3Op }}
      >
        <div className="flex gap-1">{[0,1].map(i=><div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400" />)}</div>
        <span className="text-[10px] font-mono text-slate-500">Pillars 5–6 of 6</span>
      </motion.div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════ */
export default function WhyWorkWithMe() {
  const sectionRef = useRef(null);
  const isMobile = useMobileCheck();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="why-me"
      ref={sectionRef}
      className="bg-[#090c12] relative border-b border-white/10"
      style={{ height: isMobile ? '360vh' : '380vh' }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[250px] sm:h-[400px] bg-blue-600/8 blur-[120px] sm:blur-[160px] rounded-full pointer-events-none" />

      {/* ── Everything inside sticky viewport ── */}
      <div className="sticky top-0 h-screen" style={{ overflow: 'clip' }}>

        {/* ── Header — always visible, positioned comfortably below mobile & desktop navbars ── */}
        <div className="absolute inset-x-0 top-0 flex flex-col items-center justify-center pt-36 sm:pt-8 z-10 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 sm:mb-12">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-blue-400 font-mono">
              WHY WORK WITH ME
            </span>
          </div>
          <h2 className="text-2xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight text-center px-4">
            The 6-Pillar <span className="highlight-text">Quality Promise.</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 sm:mt-3 max-w-lg text-center px-4">
            Six non-negotiable quality commitments that set this work apart from every standard freelancer.
          </p>
          {/* Scroll hint */}
          <motion.div
            className="mt-3 sm:mt-7 flex items-center gap-1.5 text-slate-500 text-[10px] sm:text-xs"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓ <span>Scroll to reveal all pillars</span>
          </motion.div>
        </div>

        {/* ── Progress Dots & Card Animations ── */}
        {isMobile ? (
          <>
            <MobileGroupDots scrollYProgress={scrollYProgress} />
            {/* Pair 1: Pillars 01 & 02 */}
            <MobileStackGroup2
              cards={[pillars[0], pillars[1]]}
              scrollYProgress={scrollYProgress}
              enterStart={0.03} enterEnd={0.11}
              fanStart={0.14}   fanEnd={0.22}
              holdEnd={0.30}    fadeoutEnd={0.34}
            />
            {/* Pair 2: Pillars 03 & 04 */}
            <MobileStackGroup2
              cards={[pillars[2], pillars[3]]}
              scrollYProgress={scrollYProgress}
              enterStart={0.36} enterEnd={0.44}
              fanStart={0.47}   fanEnd={0.55}
              holdEnd={0.63}    fadeoutEnd={0.67}
            />
            {/* Pair 3: Pillars 05 & 06 (Stays visible until next section) */}
            <MobileStackGroup2
              cards={[pillars[4], pillars[5]]}
              scrollYProgress={scrollYProgress}
              enterStart={0.69} enterEnd={0.77}
              fanStart={0.80}   fanEnd={0.88}
              holdEnd={1.0}
            />
          </>
        ) : (
          <>
            <DesktopGroupDots scrollYProgress={scrollYProgress} />
            {/* Group 1: Pillars 01, 02, 03 */}
            <DesktopStackGroup
              cards={pillars.slice(0, 3)}
              scrollYProgress={scrollYProgress}
              enterStart={0.05} enterEnd={0.15}
              fanStart={0.18}   fanEnd={0.28}
              holdEnd={0.43}    fadeoutEnd={0.48}
            />
            {/* Group 2: Pillars 04, 05, 06 (Stays visible until next section) */}
            <DesktopStackGroup
              cards={pillars.slice(3, 6)}
              scrollYProgress={scrollYProgress}
              enterStart={0.52} enterEnd={0.62}
              fanStart={0.65}   fanEnd={0.75}
              holdEnd={1.0}
            />
          </>
        )}

      </div>
    </section>
  );
}
