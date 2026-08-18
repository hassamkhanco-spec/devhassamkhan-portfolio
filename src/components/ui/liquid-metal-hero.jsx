import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { motion } from 'motion/react';

/* ── 3D Particle Starfield & Glowing Metallic Geo Animation ── */
function About3DBackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationId;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090c12, 0.0012);

    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 70);

    const isMobile = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Post-processing Bloom (desktop only)
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    if (!isMobile) {
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
        0.5, 0.4, 0.85
      );
      composer.addPass(bloomPass);
    }

    // 1. Starfield Particles (Matching Home Page aesthetic)
    const particleCount = isMobile ? 900 : 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let j = 0; j < particleCount; j++) {
      positions[j * 3]     = (Math.random() - 0.5) * 500;
      positions[j * 3 + 1] = (Math.random() - 0.5) * 350;
      positions[j * 3 + 2] = (Math.random() - 0.5) * 350;

      const color = new THREE.Color();
      const c = Math.random();
      if (c < 0.7) color.setHex(0x60a5fa); // #60A5FA primary blue
      else color.setHex(0xffffff);         // pure white

      colors[j * 3]     = color.r;
      colors[j * 3 + 1] = color.g;
      colors[j * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 1.8 : 1.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const starPoints = new THREE.Points(geometry, particleMaterial);
    scene.add(starPoints);

    // 2. Central 3D Glowing Wireframe Icosahedron Geometry (Unique to About Page)
    const icoGeo = new THREE.IcosahedronGeometry(22, isMobile ? 1 : 2);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(0, 0, -10);
    scene.add(icoMesh);

    // Inner glowing sphere core
    const innerGeo = new THREE.IcosahedronGeometry(12, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    innerMesh.position.set(0, 0, -10);
    scene.add(innerMesh);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
    };
    if (!isMobile) window.addEventListener('mousemove', handleMouseMove);

    // IntersectionObserver to pause rendering when scrolled past About Hero
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Animation Loop
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) return; // Pause 3D frame rendering when out of view!

      // Rotations
      starPoints.rotation.y += 0.0006;
      starPoints.rotation.x += 0.0003;

      icoMesh.rotation.x += 0.003;
      icoMesh.rotation.y += 0.005;

      innerMesh.rotation.x -= 0.004;
      innerMesh.rotation.y -= 0.006;

      // Smooth camera follow mouse
      if (!isMobile) {
        camera.position.x += (mouseX - camera.position.x) * 0.04;
        camera.position.y += (-mouseY - camera.position.y) * 0.04;
      }
      camera.lookAt(0, 0, 0);

      if (isMobile) {
        renderer.render(scene, camera);
      } else {
        composer.render();
      }
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      if (!isMobile) window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      particleMaterial.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

/* ══════════════════════════════════════════════════════════════
   LIQUID METAL / 3D HERO COMPONENT FOR ABOUT US PAGE
══════════════════════════════════════════════════════════════ */
export default function LiquidMetalHero({
  badge,
  title = "About Hassam Khan",
  subtitle = "Hi, I'm Hassam Khan — a web developer based in Pakistan, specializing in WordPress and Webflow development. I build fast, custom, pixel-perfect websites that turn Figma designs into fully functional, responsive experiences.",
  primaryCtaLabel = "Work With Me",
  secondaryCtaLabel = "Explore Services",
  onPrimaryCtaClick,
  onSecondaryCtaClick,
  features = [
    "WordPress Developer",
    "Webflow Developer",
    "Figma to Code Expert",
    "Web Developer Near Me"
  ],
  children
}) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-28 sm:pt-36 pb-16 bg-[#090c12] text-white overflow-hidden">
      
      {/* 3D Particle Starfield & Glowing Geo Canvas Background */}
      <About3DBackgroundCanvas />

      {/* Ambient Glow Overlays */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-blue-600/10 blur-[170px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Hero Main Content */}
      <div className="max-w-4xl mx-auto px-5 sm:px-6 relative z-10 text-center flex-1 flex flex-col items-center justify-center">

        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 text-xs font-semibold tracking-widest text-blue-400 uppercase font-mono"
          >
            <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-pulse"></span>
            {badge}
          </motion.div>
        )}

        {/* Title — Pure White, Bold & Crisp */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6"
        >
          {title}
        </motion.h1>

        {/* Subtitle — Crisp & Readable */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8 font-normal"
        >
          {subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          {primaryCtaLabel && (
            <button
              onClick={onPrimaryCtaClick}
              className="btn-primary py-3.5 px-8 text-sm font-bold rounded-full cursor-pointer shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
            >
              {primaryCtaLabel}
            </button>
          )}

          {secondaryCtaLabel && (
            <button
              onClick={onSecondaryCtaClick}
              className="py-3.5 px-8 text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all cursor-pointer backdrop-blur-md"
            >
              {secondaryCtaLabel}
            </button>
          )}
        </motion.div>

        {children}

      </div>

      {/* Bottom Features Bar */}
      {features && features.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto px-5 sm:px-6 w-full relative z-10 mt-6"
        >
          <div className="rounded-2xl bg-[#111520] border border-white/10 p-4 sm:p-5 flex flex-wrap items-center justify-around gap-4 text-center backdrop-blur-md">
            {features.map((feature, idx) => (
              <div key={idx} className="text-xs sm:text-sm font-semibold text-slate-300 tracking-wide px-3 py-1">
                {feature}
              </div>
            ))}
          </div>
        </motion.div>
      )}

    </section>
  );
}
