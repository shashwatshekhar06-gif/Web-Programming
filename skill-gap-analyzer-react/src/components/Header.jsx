import React from 'react';

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <div className="logo-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <span className="logo-text">SkillScope</span>
        </div>
        <nav className="header-nav">
          <span className="header-tag">AI-Powered Career Analysis</span>
        </nav>
      </div>
    </header>
  );
}
