import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { Magnetic } from './animate-ui/Magnetic';

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    let animationId;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090c12, 0.001);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 80);

    const isMobile = window.innerWidth < 768;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    if (!isMobile) {
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(Math.floor(window.innerWidth / 2), Math.floor(window.innerHeight / 2)),
        0.5, 0.4, 0.85
      );
      composer.addPass(bloomPass);
    }

    // Starfield particles (optimized for mobile)
    const starCount = isMobile ? 1000 : 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let j = 0; j < starCount; j++) {
      positions[j * 3] = (Math.random() - 0.5) * 600;
      positions[j * 3 + 1] = (Math.random() - 0.5) * 400;
      positions[j * 3 + 2] = (Math.random() - 0.5) * 400;

      const color = new THREE.Color();
      const c = Math.random();
      if (c < 0.7) color.setHex(0x60a5fa); // #60A5FA primary blue
      else color.setHex(0xffffff);         // pure white

      colors[j * 3] = color.r;
      colors[j * 3 + 1] = color.g;
      colors[j * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 1.8 : 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const starPoints = new THREE.Points(geometry, material);
    scene.add(starPoints);

    // Floating wireframe torus knot
    const torusGeo = new THREE.TorusKnotGeometry(18, 4, isMobile ? 64 : 100, 24);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.14
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(0, 0, -20);
    scene.add(torusMesh);

    // Pre-compile scene shaders to eliminate first-frame GPU compilation lag
    renderer.compile(scene, camera);

    // Initial warm-up render to prime the GPU buffer before animation loop starts
    if (isMobile) {
      renderer.render(scene, camera);
    } else {
      composer.render();
    }

    // Mouse tracking (passive for smooth 60fps)
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    };
    if (!isMobile) window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // IntersectionObserver to pause WebGL frame loop when scrolled past Hero
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) return; // Freeze 3D rendering when user scrolls down!

      starPoints.rotation.y += 0.0005;
      starPoints.rotation.x += 0.0002;
      torusMesh.rotation.x += 0.004;
      torusMesh.rotation.y += 0.006;
      if (!isMobile) {
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
      }
      camera.lookAt(0, 0, 0);

      if (isMobile) {
        renderer.render(scene, camera);
      } else {
        composer.render();
      }
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // GSAP entrance animations
    gsap.fromTo(titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
    );
    gsap.fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
    );
    gsap.fromTo(ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
    );

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      if (!isMobile) window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#090c12]" id="home">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" style={{ transform: 'translate3d(0, 0, 0)' }} />

      <div className="container relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-pulse"></span>
          <span className="text-xs md:text-sm font-medium text-blue-300 uppercase tracking-widest">
            Available for Projects
          </span>
        </div>

        <h1 ref={titleRef} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-none mb-6" style={{opacity: 0}}>
          HASSAM KHAN
        </h1>

        <p ref={subtitleRef} className="text-lg sm:text-xl md:text-2xl text-slate-300 font-light max-w-2xl leading-relaxed mb-10" style={{opacity: 0}}>
          I convert Figma designs into fast, pixel-perfect{' '}
          <span className="text-[#60A5FA] font-semibold">Webflow</span> &{' '}
          <span className="text-[#60A5FA] font-semibold">WordPress</span> websites for businesses worldwide.
        </p>

        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4" style={{opacity: 0}}>
          <Magnetic strength={0.3}>
            <a href="#work" className="btn btn-primary text-base px-8 py-3.5 shadow-lg shadow-blue-500/25">
              View My Work
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a href="#contact" className="btn btn-secondary text-base px-8 py-3.5">
              Get In Touch
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
