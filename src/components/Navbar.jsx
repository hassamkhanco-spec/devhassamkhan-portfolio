import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const navLinks = [
  { name: 'Work', href: '#work', type: 'hash' },
  { name: 'About', href: '/about', type: 'route' },
  { name: 'Why Me', href: '#why-me', type: 'hash' },
  { name: 'Services', href: '#services', type: 'hash' },
  { name: 'Process', href: '#process', type: 'hash' },
  { name: 'Contact', href: '#contact', type: 'hash' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Smart navigation: hash links go to homepage sections, route links use React Router */
  const handleNavClick = (link) => {
    setMobileMenuOpen(false);
    if (link.type === 'hash' && !isHome) {
      // Navigate to home page with hash
      window.location.href = '/' + link.href;
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-bold tracking-tight text-white hover:text-white/80 transition-colors">
              {personalInfo.name}
            </Link>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-pulse"></span>
              <span className="text-xs font-medium text-[#60A5FA]">Available for work</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) =>
                link.type === 'route' ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`text-sm font-medium transition-colors ${
                      location.pathname === link.href
                        ? 'text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={isHome ? link.href : '/' + link.href}
                    className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                    onClick={() => handleNavClick(link)}
                  >
                    {link.name}
                  </a>
                )
              )}
            </div>
            <a
              href={isHome ? '#contact' : '/#contact'}
              className="btn-primary py-2 px-4 text-sm inline-flex items-center gap-2"
              onClick={(e) => {
                if (!isHome) {
                  e.preventDefault();
                  window.location.href = '/#contact';
                }
              }}
            >
              Hire Me
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#050505]/95 backdrop-blur-xl z-40 transition-all duration-300 md:hidden ${
        mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) =>
            link.type === 'route' ? (
              <Link
                key={link.name}
                to={link.href}
                className={`text-2xl font-bold transition-colors ${
                  location.pathname === link.href
                    ? 'text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={isHome ? link.href : '/' + link.href}
                className="text-2xl font-bold text-slate-300 hover:text-white transition-colors"
                onClick={() => handleNavClick(link)}
              >
                {link.name}
              </a>
            )
          )}
          <a
            href={isHome ? '#contact' : '/#contact'}
            className="btn-primary mt-4 inline-flex items-center gap-2"
            onClick={(e) => {
              setMobileMenuOpen(false);
              if (!isHome) {
                e.preventDefault();
                window.location.href = '/#contact';
              }
            }}
          >
            Hire Me
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
