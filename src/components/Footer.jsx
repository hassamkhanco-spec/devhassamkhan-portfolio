import React from 'react';
import { Link } from 'react-router-dom';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#090c12] py-10 text-xs text-slate-400">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col text-center md:text-left gap-1">
          <span className="font-bold text-white text-sm">Hassam Khan</span>
          <span className="text-slate-500">© {new Date().getFullYear()} Hassam Khan. All rights reserved.</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-slate-300">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/about" className="hover:text-white transition-colors">About</Link>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href={personalInfo.fiverr} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Fiverr</a>
          <a href={personalInfo.upwork} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Upwork</a>
          <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
        </div>

        <div className="text-center md:text-right text-slate-500 font-medium">
          <span>WordPress · Webflow · Figma to Code</span>
        </div>

      </div>
    </footer>
  );
}
