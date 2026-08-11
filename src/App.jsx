import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#090c12] text-slate-100 selection:bg-blue-500 selection:text-white font-sans">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </SmoothScroll>
  );
}
