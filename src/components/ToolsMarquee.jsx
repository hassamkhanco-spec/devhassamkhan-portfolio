import React from 'react';

const toolsRow1 = [
  { name: 'WordPress', color: '#21759b' },
  { name: 'Elementor Pro', color: '#d4376a' },
  { name: 'Webflow', color: '#4353ff' },
  { name: 'Figma', color: '#f24e1e' },
  { name: 'HTML5', color: '#e34f26' },
  { name: 'CSS3', color: '#1572b6' }
];

const toolsRow2 = [
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'React', color: '#61dafb' },
  { name: 'Tailwind CSS', color: '#06b6d4' },
  { name: 'GitHub', color: '#ffffff' },
  { name: 'VS Code', color: '#007acc' },
  { name: 'Vercel', color: '#ffffff' }
];

export default function ToolsMarquee() {
  return (
    <section id="tools" className="section">
      <div className="container overflow-hidden">
        <div className="section-header">
          <span className="eyebrow-pill">Tech Stack</span>
          <h2 className="section-title">Tools I work with daily</h2>
        </div>
        
        <div className="flex flex-col gap-6 w-full">
          {/* Row 1 - Right Scroll */}
          <div className="marquee-row overflow-hidden relative w-full">
            <div className="marquee-track scroll-right flex gap-4 w-max">
              {/* Duplicated thrice for seamless loop */}
              {[...toolsRow1, ...toolsRow1, ...toolsRow1].map((tool, i) => (
                <div key={i} className="marquee-badge flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full whitespace-nowrap">
                  <span 
                    className="badge-dot w-2 h-2 rounded-full" 
                    style={{ backgroundColor: tool.color }}
                  ></span>
                  <span className="text-gray-300 text-sm font-medium">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Row 2 - Left Scroll */}
          <div className="marquee-row overflow-hidden relative w-full">
            <div className="marquee-track scroll-left flex gap-4 w-max">
              {/* Duplicated thrice for seamless loop */}
              {[...toolsRow2, ...toolsRow2, ...toolsRow2].map((tool, i) => (
                <div key={i} className="marquee-badge flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/10 rounded-full whitespace-nowrap">
                  <span 
                    className="badge-dot w-2 h-2 rounded-full" 
                    style={{ backgroundColor: tool.color }}
                  ></span>
                  <span className="text-gray-300 text-sm font-medium">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
