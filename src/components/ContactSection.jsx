import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Lottie from 'lottie-react';
import dailyUpdatesData from '../assets/daily_updates.json';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Linkedin, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Sparkles, 
  Clock, 
  ArrowUpRight, 
  ShieldCheck,
  User,
  FileCode,
  Zap,
  Globe2
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const projectTypes = [
  'Webflow Build',
  'WordPress / Elementor',
  'Figma to Code',
  'Website Redesign'
];

/* ── Custom Animated Badge (Matching WhyWorkWithMe quality theme) ── */
function AnimatedContactBadge({ icon: Icon, textIcon, accentColor = '#60A5FA', dotLottieUrl, lottieData }) {
  return (
    <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
      {/* Rotating dashed ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[-5px] rounded-xl pointer-events-none"
        style={{ border: `1.5px dashed ${accentColor}35` }}
      >
        <div
          className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
          style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
        />
      </motion.div>
      
      {/* Pulsing subtle ambient glow */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{ border: `1px solid ${accentColor}30`, boxShadow: `0 0 14px ${accentColor}20` }}
      />

      {/* Badge container */}
      <div
        className="relative w-full h-full rounded-xl flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${accentColor}18 0%, #090c12 100%)`,
          border: `1px solid ${accentColor}40`,
          boxShadow: `inset 0 1px 2px rgba(255,255,255,0.1)`,
        }}
      >
        {dotLottieUrl ? (
          <div className="relative z-10 w-full h-full p-1 flex items-center justify-center pointer-events-none">
            <DotLottieReact
              src={dotLottieUrl}
              loop
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        ) : lottieData ? (
          <div className="relative z-10 w-full h-full p-1 flex items-center justify-center pointer-events-none">
            <Lottie animationData={lottieData} loop className="w-full h-full scale-125" />
          </div>
        ) : textIcon ? (
          <span className="font-extrabold text-xs tracking-tight relative z-10" style={{ color: accentColor }}>
            {textIcon}
          </span>
        ) : (
          <Icon 
            className="w-5 h-5 relative z-10" 
            style={{ color: accentColor, filter: `drop-shadow(0 2px 8px ${accentColor}80)` }} 
          />
        )}
      </div>
    </div>
  );
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scope: 'Webflow Build',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [submitting, setSubmitting] = useState(false);
  const [copiedType, setCopiedType] = useState(null);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectProjectType = (type) => {
    setFormData((prev) => ({ ...prev, scope: type }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', msg: '' });

    try {
      const payload = {
        access_key: '734c7002-ae3c-4baa-9bea-08330c7b1b0f',
        subject: `New Portfolio Lead from ${formData.name} (${formData.scope})`,
        name: formData.name,
        email: formData.email,
        project_scope: formData.scope,
        message: formData.message,
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          type: 'success',
          msg: `Thank you, ${formData.name}! Your message has been sent successfully. I'll get back to you within 24 hours.`
        });
        setFormData({ name: '', email: '', scope: 'Webflow Build', message: '' });
      } else {
        setStatus({ type: 'error', msg: data.message || 'Something went wrong. Please try again or message via WhatsApp.' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Network error. Please reach out directly on WhatsApp or Email.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative bg-[#090c12] border-b border-white/10 overflow-hidden">
      {/* Ambient Theme Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-blue-600/10 via-indigo-600/10 to-transparent blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 font-mono">
              LET'S COLLABORATE
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Ready to build your <span className="highlight-text">next website?</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Have a project in mind or need a pixel-perfect Webflow / WordPress build? Send a direct message or reach out on your preferred platform.
          </p>

          {/* Guarantee Pill */}
          <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>&lt; 24h Response Time</span>
            </div>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Quality Guaranteed</span>
            </div>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          
          {/* LEFT: Premium Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-[#111520] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl"
          >
            {/* Top Subtle Line Glow */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-75" />

            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Send Me a Message</h3>
                <p className="text-xs text-slate-400 mt-1">Fill in the details below and I'll reply promptly.</p>
              </div>
              <AnimatedContactBadge icon={Send} accentColor="#60A5FA" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Quick Select Scope */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-400" />
                  <span>Select Project Type</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {projectTypes.map((type) => {
                    const isSelected = formData.scope === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => selectProjectType(type)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-center border ${
                          isSelected
                            ? 'bg-blue-500/20 border-blue-500/80 text-white shadow-lg shadow-blue-500/20'
                            : 'bg-white/5 border-white/10 text-slate-400 hover:border-blue-500/30 hover:text-slate-200'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Name *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white/[0.07] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Email *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="alex@company.com"
                      className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white/[0.07] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Scope Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Selected Scope</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <FileCode className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="scope"
                    value={formData.scope}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-10 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:bg-white/[0.07] transition-all"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  placeholder="Share project details, timelines, design files (Figma link), or specific requirements..."
                  className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:bg-white/[0.07] transition-all resize-y"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full relative group overflow-hidden py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Project Request</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </button>

              {/* Status Message */}
              <AnimatePresence>
                {status.msg && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-2xl text-xs sm:text-sm flex items-start gap-3 border ${
                      status.type === 'success'
                        ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                        : 'bg-red-500/10 text-red-300 border-red-500/30'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <span className="leading-relaxed">{status.msg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </motion.div>

          {/* RIGHT: Direct Contact & Platform Profiles */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            
            {/* Direct Channels Card */}
            <div className="bg-[#111520] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-xl relative overflow-hidden">
              
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">Direct Communication</h3>
              </div>

              <div className="space-y-4">
                
                {/* WhatsApp Channel */}
                <div className="group p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/[0.04] transition-all duration-300 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <AnimatedContactBadge
                      icon={MessageSquare}
                      accentColor="#38BDF8"
                      dotLottieUrl="https://lottie.host/1f2856ed-4213-48b9-adec-7ee2258bdb49/GMaSiq2I3R.lottie"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">WhatsApp / Call</span>
                      <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                        {personalInfo.phone}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleCopy(personalInfo.rawPhone, 'phone')}
                      title="Copy Number"
                      className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                      {copiedType === 'phone' ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href={personalInfo.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/30 transition-all flex items-center gap-1 text-xs font-semibold"
                    >
                      <span>Chat</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Email Channel */}
                <div className="group p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/[0.04] transition-all duration-300 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <AnimatedContactBadge icon={Mail} accentColor="#60A5FA" lottieData={dailyUpdatesData} />
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Email Address</span>
                      <span className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-300 transition-colors break-all">
                        {personalInfo.email}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(personalInfo.email, 'email')}
                    title="Copy Email"
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all shrink-0"
                  >
                    {copiedType === 'email' ? <Check className="w-4 h-4 text-blue-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Location Channel */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3.5">
                  <AnimatedContactBadge
                    icon={MapPin}
                    accentColor="#818CF8"
                    dotLottieUrl="https://lottie.host/ad6a64bc-0e31-46c9-83e7-e7a9958537a2/Vl3zj89utE.lottie"
                  />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Location & Availability</span>
                    <span className="text-sm font-bold text-white">
                      {personalInfo.location}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Freelance & Social Profiles Card */}
            <div className="bg-[#111520] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-xl">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-4">
                Verified Freelance & Social Profiles
              </span>

              <div className="space-y-3">
                
                {/* LinkedIn */}
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/[0.06] transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5">
                    <AnimatedContactBadge icon={Linkedin} accentColor="#60A5FA" />
                    <div>
                      <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors block">
                        LinkedIn Profile
                      </span>
                      <span className="text-[11px] text-slate-400">Professional Network</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* Fiverr */}
                <a
                  href={personalInfo.fiverr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/[0.06] transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5">
                    <AnimatedContactBadge textIcon="fi." accentColor="#38BDF8" />
                    <div>
                      <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors block">
                        Fiverr Seller Profile
                      </span>
                      <span className="text-[11px] text-slate-400">Order via Fiverr Marketplace</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* Upwork */}
                <a
                  href={personalInfo.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/[0.06] transition-all duration-300 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5">
                    <AnimatedContactBadge textIcon="Up" accentColor="#818CF8" />
                    <div>
                      <span className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors block">
                        Upwork Freelancer Profile
                      </span>
                      <span className="text-[11px] text-slate-400">Hire via Upwork Contract</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
