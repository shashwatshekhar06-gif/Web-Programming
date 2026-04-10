import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function Step4_Results({ results, studyHours, onStartOver }) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analyzingStatus, setAnalyzingStatus] = useState('Parsing job description...');
  const [activeResultsTab, setActiveResultsTab] = useState('matched');
  const [activePlannerPeriod, setActivePlannerPeriod] = useState(30);
  const [activeResourceTab, setActiveResourceTab] = useState('free');
  const [displayedScore, setDisplayedScore] = useState(0);
  const scoreRingRef = useRef(null);
  const breakdownRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  // Analyzing overlay animation
  useEffect(() => {
    const statuses = [
      'Parsing job description...',
      'Extracting required skills...',
      'Comparing your profile...',
      'Calculating readiness score...',
      'Generating learning roadmap...',
      'Assembling resources...',
      'Finalizing your career plan...',
    ];

    let i = 0;
    hasAnimatedRef.current = false;
    setIsAnalyzing(true);

    const interval = setInterval(() => {
      i++;
      if (i < statuses.length) {
        setAnalyzingStatus(statuses[i]);
      } else {
        clearInterval(interval);
        setIsAnalyzing(false);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [results]);

  // Score animation after analyzing completes
  useEffect(() => {
    if (isAnalyzing || !results || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const targetScore = results.overallScore;
    const duration = 2000;
    const startTime = performance.now();

    function animate(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayedScore(Math.round(eased * targetScore));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);

    // Animate ring
    setTimeout(() => {
      if (scoreRingRef.current) {
        const circumference = 326.73;
        const offset = circumference - (targetScore / 100) * circumference;
        scoreRingRef.current.style.strokeDashoffset = offset;
      }
    }, 100);

    // Animate breakdown bars
    setTimeout(() => {
      if (breakdownRef.current) {
        breakdownRef.current.querySelectorAll('.breakdown-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
      }
    }, 300);
  }, [isAnalyzing, results]);

  const handleDownload = useCallback(() => {
    if (!results) return;
    const r = results;

    let text = `SKILLSCOPE - CAREER ANALYSIS REPORT\n`;
    text += `${'='.repeat(50)}\n\n`;
    text += `Generated: ${new Date().toLocaleDateString()}\n\n`;

    text += `READINESS SCORE: ${r.overallScore}%\n`;
    text += `-  Technical Skills: ${r.scores.technical}%\n`;
    text += `-  Experience Level: ${r.scores.experience}%\n`;
    text += `-  Domain Knowledge: ${r.scores.domain}%\n`;
    text += `-  Soft Skills: ${r.scores.softSkills}%\n\n`;

    text += `SKILLS YOU HAVE:\n`;
    r.matched.forEach(s => { text += `  ✓ ${s.name} (${s.proficiency})\n`; });

    text += `\nSKILLS TO DEEPEN:\n`;
    r.deepen.forEach(s => { text += `  ↑ ${s.name} (currently ${s.proficiency})\n`; });

    text += `\nSKILLS TO LEARN (ranked by priority):\n`;
    r.missing.forEach((s, i) => {
      text += `  ${i + 1}. ${s.name} ${s.isRequired ? '(REQUIRED)' : '(nice to have)'}\n`;
    });

    text += `\n30-DAY PLAN (Foundation):\n`;
    r.plan[30].forEach(w => {
      text += `  ${w.week} (${w.hours}):\n`;
      w.goals.forEach(g => { text += `    - ${g}\n`; });
    });

    text += `\n60-DAY PLAN (Depth & Projects):\n`;
    r.plan[60].forEach(w => {
      text += `  ${w.week} (${w.hours}):\n`;
      w.goals.forEach(g => { text += `    - ${g}\n`; });
    });

    text += `\n90-DAY PLAN (Job Ready):\n`;
    r.plan[90].forEach(w => {
      text += `  ${w.week} (${w.hours}):\n`;
      w.goals.forEach(g => { text += `    - ${g}\n`; });
    });

    text += `\nJOB-READY DATE: ${r.jobReadyDate}\n`;
    text += `\n${r.motivation.replace(/<[^>]*>/g, '').replace(/\*\*/g, '')}\n`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SkillScope_Career_Plan_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [results]);

  const profLabel = (prof) => {
    const map = { beginner: '🟡 Beginner', intermediate: '🔵 Intermediate', advanced: '🟢 Advanced' };
    return map[prof] || prof;
  };

  if (!results) return null;

  const breakdownItems = [
    { label: 'Technical Skills', score: results.scores.technical, barClass: 'bar-tech' },
    { label: 'Experience Level', score: results.scores.experience, barClass: 'bar-exp' },
    { label: 'Domain Knowledge', score: results.scores.domain, barClass: 'bar-domain' },
    { label: 'Soft Skills', score: results.scores.softSkills, barClass: 'bar-soft' },
  ];

  const plannerTabs = [
    { period: 30, badge: 'Days 1–30', label: 'Foundation' },
    { period: 60, badge: 'Days 31–60', label: 'Depth & Projects' },
    { period: 90, badge: 'Days 61–90', label: 'Job Ready' },
  ];

  const resultsTabConfig = [
    {
      key: 'matched',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
      label: 'Skills You Have',
      count: results.matched.length,
    },
    {
      key: 'deepen',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
      label: 'Skills to Deepen',
      count: results.deepen.length,
    },
    {
      key: 'missing',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
      label: 'Skills to Learn',
      count: results.missing.length,
    },
  ];

  const activeResourceData = results.resources[activeResourceTab] || {};

  return (
    <section className="step-panel active">
      <div className="step-content results-content">
        {/* Analyzing Animation */}
        {isAnalyzing && (
          <div className="analyzing-overlay" id="analyzingOverlay">
            <div className="analyzing-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
            <h2>Analyzing Your Profile...</h2>
            <p className="analyzing-status" id="analyzingStatus">{analyzingStatus}</p>
          </div>
        )}

        {/* Results Dashboard  */}
        {!isAnalyzing && (
          <div className="results-dashboard" id="resultsDashboard" style={{ display: 'flex' }}>
            {/* Readiness Score Header */}
            <div className="results-hero">
              <div className="score-card">
                <div className="score-ring-container">
                  <svg className="score-ring" viewBox="0 0 120 120">
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#6366f1' }}/>
                        <stop offset="50%" style={{ stopColor: '#8b5cf6' }}/>
                        <stop offset="100%" style={{ stopColor: '#ec4899' }}/>
                      </linearGradient>
                    </defs>
                    <circle className="score-ring-bg" cx="60" cy="60" r="52"/>
                    <circle
                      className="score-ring-fill"
                      cx="60"
                      cy="60"
                      r="52"
                      ref={scoreRingRef}
                    />
                  </svg>
                  <div className="score-text">
                    <span className="score-number" id="scoreNumber">{displayedScore}</span>
                    <span className="score-percent">%</span>
                  </div>
                </div>
                <h2 className="score-title">Job Readiness Score</h2>
                <p className="score-subtitle" id="scoreMessage">{results.scoreMessage}</p>
              </div>
              <div className="score-breakdown" id="scoreBreakdown" ref={breakdownRef}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px', position: 'relative' }}>Score Breakdown</h3>
                {breakdownItems.map(item => (
                  <div className="breakdown-item" key={item.label}>
                    <div className="breakdown-label">
                      <span>{item.label}</span>
                      <span>{item.score}%</span>
                    </div>
                    <div className="breakdown-bar">
                      <div className={`breakdown-bar-fill ${item.barClass}`} data-width={item.score} style={{ width: 0 }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Matched / Missing */}
            <div className="results-section">
              <div className="results-tabs">
                {resultsTabConfig.map(tab => (
                  <button
                    key={tab.key}
                    className={`results-tab ${activeResultsTab === tab.key ? 'active' : ''}`}
                    data-results-tab={tab.key}
                    onClick={() => setActiveResultsTab(tab.key)}
                  >
                    {tab.icon}
                    {tab.label}
                    <span className="tab-count">{tab.count}</span>
                  </button>
                ))}
              </div>

              {/* Matched Tab */}
              {activeResultsTab === 'matched' && (
                <div className="results-tab-content active" id="tabMatched">
                  <div className="skills-chips" id="matchedSkills">
                    {results.matched.length === 0 ? (
                      <div className="empty-state">
                        <span className="empty-icon">📋</span>
                        <p>You haven't selected any skills that match this JD yet.</p>
                        <p className="empty-hint">Go back to Step 2 and select the skills you know!</p>
                      </div>
                    ) : (
                      results.matched.map(s => (
                        <span className="result-chip chip-matched" key={s.name}>
                          <span className="chip-icon">✓</span>
                          <span className="chip-skill-name">{s.name}</span>
                          <span className={`chip-prof chip-prof-${s.proficiency}`}>{profLabel(s.proficiency)}</span>
                          {s.isRequired
                            ? <span className="chip-req">Required</span>
                            : <span className="chip-nice">Nice to Have</span>
                          }
                        </span>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Deepen Tab */}
              {activeResultsTab === 'deepen' && (
                <div className="results-tab-content active" id="tabDeepen">
                  <div className="skills-chips" id="deepenSkills">
                    {results.deepen.length === 0 ? (
                      <div className="empty-state">
                        <span className="empty-icon">🎯</span>
                        <p>No skills need deepening — great proficiency across the board!</p>
                      </div>
                    ) : (
                      results.deepen.map(s => (
                        <span className="result-chip chip-deepen" key={s.name}>
                          <span className="chip-icon">↑</span>
                          <span className="chip-skill-name">{s.name}</span>
                          <span className={`chip-prof chip-prof-${s.proficiency}`}>{profLabel(s.proficiency)} → Level up</span>
                        </span>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Missing Tab */}
              {activeResultsTab === 'missing' && (
                <div className="results-tab-content active" id="tabMissing">
                  <div className="skills-chips ranked" id="missingSkills">
                    {results.missing.length === 0 ? (
                      <div className="empty-state">
                        <span className="empty-icon">🏆</span>
                        <p>Amazing — you have all the required skills! Focus on deepening your knowledge.</p>
                      </div>
                    ) : (
                      results.missing.map((s, i) => (
                        <span className="result-chip chip-missing" key={s.name}>
                          <span className="rank-badge">#{i + 1}</span>
                          <span className="chip-skill-name">{s.name}</span>
                          {s.isRequired
                            ? <span className="chip-req">Required</span>
                            : <span className="chip-nice">Nice to Have</span>
                          }
                        </span>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 30/60/90 Day Planner */}
            <div className="results-section">
              <h2 className="section-title">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Your 30 / 60 / 90 Day Learning Roadmap
              </h2>
              <div className="planner-tabs">
                {plannerTabs.map(tab => (
                  <button
                    key={tab.period}
                    className={`planner-tab ${activePlannerPeriod === tab.period ? 'active' : ''}`}
                    data-planner={tab.period}
                    onClick={() => setActivePlannerPeriod(tab.period)}
                  >
                    <span className="tab-badge">{tab.badge}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="planner-content" id="plannerContent">
                {results.plan[activePlannerPeriod].map((week, i) => (
                  <div className="planner-week" key={i}>
                    <div className="week-header">
                      <span className="week-title">{week.week}</span>
                      <span className="week-hours">{week.hours}</span>
                    </div>
                    <ul className="week-goals">
                      {week.goals.map((g, j) => (
                        <li key={j}>{g}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="results-section">
              <h2 className="section-title">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
                Learning Resources
              </h2>
              <div className="resource-toggle">
                <button
                  className={`resource-tab ${activeResourceTab === 'free' ? 'active' : ''}`}
                  data-resource="free"
                  onClick={() => setActiveResourceTab('free')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                  </svg>
                  Free Resources
                </button>
                <button
                  className={`resource-tab ${activeResourceTab === 'paid' ? 'active' : ''}`}
                  data-resource="paid"
                  onClick={() => setActiveResourceTab('paid')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  Paid Resources (₹)
                </button>
              </div>
              <div className="resource-content" id="resourceContent">
                {Object.keys(activeResourceData).length === 0 ? (
                  <div className="empty-state" style={{ padding: '24px' }}>
                    <span className="empty-icon">📚</span>
                    <p>No specific resources needed — you have all the skills!</p>
                  </div>
                ) : (
                  Object.entries(activeResourceData).map(([skill, items]) => (
                    <div className="resource-skill-group" key={skill}>
                      <div className="resource-skill-title">
                        <span className="resource-skill-icon">📖</span>
                        {skill}
                        <span className="resource-count">{items.length} resource{items.length !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="resource-list">
                        {items.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resource-item resource-link"
                          >
                            <span className={`resource-type-badge ${item.badge}`}>{item.type}</span>
                            <div className="resource-info">
                              <div className="resource-name">
                                {item.name}
                                <svg className="external-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                                </svg>
                              </div>
                              <div className="resource-desc">{item.desc}</div>
                            </div>
                            {item.price && <span className="resource-price">{item.price}</span>}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Job Ready Date */}
            <div className="results-section job-ready-section">
              <div className="job-ready-card" id="jobReadyCard">
                <div className="confetti" id="confetti"></div>
                <div className="job-ready-icon">🎯</div>
                <h2>Your Job-Ready Date</h2>
                <div className="job-ready-date" id="jobReadyDate">{results.jobReadyDate}</div>
                <p className="job-ready-message" id="jobReadyMessage">
                  If you study consistently at {studyHours} hours per week, you'll be confidently applying by this date.
                </p>
              </div>
            </div>

            {/* Motivational Message */}
            <div className="results-section motivation-section">
              <div className="motivation-card" id="motivationCard">
                <div className="motivation-icon">💪</div>
                <p className="motivation-text" id="motivationText" dangerouslySetInnerHTML={{ __html: results.motivation }}></p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="results-actions">
              <button className="btn btn-outline" id="btnStartOver" onClick={onStartOver}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                </svg>
                Start Over
              </button>
              <button className="btn btn-primary" id="btnDownload" onClick={handleDownload}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Plan
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
