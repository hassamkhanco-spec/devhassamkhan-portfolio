import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

export default function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#090c12] text-slate-100 selection:bg-blue-500 selection:text-white font-sans">
        <Suspense fallback={<div className="min-h-screen bg-[#090c12]" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Suspense>
      </div>
    </SmoothScroll>
  );
}
