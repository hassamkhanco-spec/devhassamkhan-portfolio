import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatsCounter from '../components/StatsCounter';
import AboutSection from '../components/AboutSection';
import SkillsGrid from '../components/SkillsGrid';
import FeaturedProjects from '../components/FeaturedProjects';
import ToolsMarquee from '../components/ToolsMarquee';
import WorkflowProcess from '../components/WorkflowProcess';
import WhyWorkWithMe from '../components/WhyWorkWithMe';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function HomePage() {
  useEffect(() => {
    document.title = 'Hassam Khan — WordPress & Webflow Developer';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Custom WordPress, Webflow & Elementor developer. Turning Figma designs into pixel-perfect, lightning-fast websites.');
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsCounter />
        <AboutSection />
        <SkillsGrid />
        <FeaturedProjects />
        <WhyWorkWithMe />
        <ToolsMarquee />
        <WorkflowProcess />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
