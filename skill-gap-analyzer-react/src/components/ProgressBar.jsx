import React from 'react';

export default function ProgressBar({ currentStep }) {
  const steps = [
    { num: 1, label: 'Job Description' },
    { num: 2, label: 'Your Skills' },
    { num: 3, label: 'Background' },
    { num: 4, label: 'Results' },
  ];

  return (
    <div className="progress-wrapper" style={{ display: currentStep === 4 ? 'none' : 'block' }}>
      <div className="progress-steps">
        {steps.map((step, i) => {
          let className = 'progress-step';
          if (step.num < currentStep) className += ' completed';
          else if (step.num === currentStep) className += ' active';

          return (
            <React.Fragment key={step.num}>
              <div className={className} data-step={step.num}>
                <div className="step-circle">{step.num}</div>
                <span className="step-label">{step.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="progress-line">
                  <div
                    className="progress-fill"
                    style={{ width: step.num < currentStep ? '100%' : '0%' }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
