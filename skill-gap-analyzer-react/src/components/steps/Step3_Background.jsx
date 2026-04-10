import React, { useState, useEffect } from 'react';

export default function Step3_Background({ initialData, onBack, onAnalyze }) {
  const [name, setName] = useState(initialData?.name || '');
  const [background, setBackground] = useState(initialData?.background || '');
  const [yearsExp, setYearsExp] = useState(initialData?.yearsExp || '0');
  const [studyHours, setStudyHours] = useState(initialData?.studyHours || 10);
  const [targetDate, setTargetDate] = useState(initialData?.targetDate || (() => {
    const d = new Date();
    d.setDate(d.getDate() + 90);
    return d.toISOString().split('T')[0];
  })());

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setBackground(initialData.background || '');
      setYearsExp(initialData.yearsExp || '0');
      setStudyHours(initialData.studyHours || 10);
      if (initialData.targetDate) setTargetDate(initialData.targetDate);
    }
  }, [initialData]);

  const handleBack = () => {
    onBack({
      name, background, yearsExp, studyHours, targetDate
    });
  };

  const handleAnalyze = () => {
    onAnalyze({
      name: name.trim() || 'there',
      background,
      yearsExp,
      studyHours: studyHours.toString(),
      targetDate,
    });
  };

  return (
    <section className="step-panel active">
      <div className="step-content">
        <div className="step-header">
          <div className="step-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h1>Tell Us About You</h1>
          <p className="step-subtitle">A few quick details so we can personalize your learning roadmap.</p>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              placeholder="Enter your name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="userBackground">Current Background</label>
            <select
              id="userBackground"
              className="form-select"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
            >
              <option value="">Select your background</option>
              <option value="student">Student (College/University)</option>
              <option value="fresher">Fresh Graduate / Fresher</option>
              <option value="professional">Working Professional</option>
              <option value="switcher">Career Switcher</option>
              <option value="freelancer">Freelancer</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="yearsExp">Years of Experience</label>
            <select
              id="yearsExp"
              className="form-select"
              value={yearsExp}
              onChange={(e) => setYearsExp(e.target.value)}
            >
              <option value="0">0 (No experience)</option>
              <option value="1">Less than 1 year</option>
              <option value="2">1-2 years</option>
              <option value="3">3-5 years</option>
              <option value="5">5-8 years</option>
              <option value="8">8+ years</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="studyHours">Hours Available Per Week</label>
            <div className="range-wrapper">
              <input
                type="range"
                id="studyHours"
                min="3"
                max="40"
                value={studyHours}
                className="range-input"
                onChange={(e) => setStudyHours(parseInt(e.target.value))}
              />
              <div className="range-value"><span id="hoursValue">{studyHours}</span> hrs/week</div>
            </div>
          </div>
          <div className="form-group full-width">
            <label htmlFor="targetDate">Target Date to Be Job-Ready</label>
            <input
              type="date"
              id="targetDate"
              className="form-input"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>
        </div>
        <div className="step-actions">
          <button className="btn btn-ghost btn-back" id="btnStep3Back" onClick={handleBack}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back
          </button>
          <button className="btn btn-primary btn-analyze" id="btnAnalyze" onClick={handleAnalyze}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            Analyze My Gaps
          </button>
        </div>
      </div>
    </section>
  );
}
