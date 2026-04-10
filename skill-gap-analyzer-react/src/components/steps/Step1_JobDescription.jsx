import React, { useState, useEffect } from 'react';

export default function Step1_JobDescription({ initialText, onNext }) {
  const [jdText, setJdText] = useState(initialText || '');

  useEffect(() => {
    if (initialText) {
      setJdText(initialText);
    }
  }, [initialText]);

  const handleChange = (e) => {
    setJdText(e.target.value);
  };

  const handleNext = () => {
    if (jdText.trim().length >= 50) {
      onNext(jdText.trim());
    }
  };

  const charCount = jdText.length;
  const isValid = charCount >= 50;

  return (
    <section className="step-panel active">
      <div className="step-content">
        <div className="step-header">
          <div className="step-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <h1>Paste the Job Description</h1>
          <p className="step-subtitle">Copy the entire job description from any job listing. We'll extract every skill, tool, and technology mentioned.</p>
        </div>
        <div className="form-group">
          <label htmlFor="jobDescription">Full Job Description</label>
          <textarea
            id="jobDescription"
            className="textarea-large"
            placeholder={"Paste the complete job description here...\n\nExample:\nWe are looking for a Full Stack Developer with 3+ years of experience in React, Node.js, PostgreSQL..."}
            value={jdText}
            onChange={handleChange}
          />
          <div className="textarea-footer">
            <span
              className="char-count"
              style={{ color: isValid ? 'var(--accent-success)' : 'var(--text-muted)' }}
            >
              {charCount} characters
            </span>
            <span className="helper-text">Minimum 50 characters recommended</span>
          </div>
        </div>
        <div className="step-actions">
          <button
            className="btn btn-primary btn-next"
            id="btnStep1Next"
            disabled={!isValid}
            onClick={handleNext}
          >
            Extract Skills
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
