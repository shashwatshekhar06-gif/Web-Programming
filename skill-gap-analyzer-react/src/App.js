import React, { useState, useRef } from 'react';
import './index.css';

import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import Footer from './components/Footer';

import Step1JobDescription from './components/steps/Step1_JobDescription';
import Step2SkillChecklist from './components/steps/Step2_SkillChecklist';
import Step3Background from './components/steps/Step3_Background';
import Step4Results from './components/steps/Step4_Results';

import SkillAnalyzer from './utils/analyzer';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [jdText, setJdText] = useState('');
  const [skillCategories, setSkillCategories] = useState([]);
  const [results, setResults] = useState(null);
  
  // Step 3 state
  const [profileData, setProfileData] = useState({
    name: '',
    background: '',
    yearsExp: '0',
    studyHours: 10,
    targetDate: (() => {
      const d = new Date();
      d.setDate(d.getDate() + 90);
      return d.toISOString().split('T')[0];
    })()
  });

  const analyzerRef = useRef(new SkillAnalyzer());

  const handleStep1Next = (text) => {
    setJdText(text);
    analyzerRef.current.parseJobDescription(text);
    const categories = analyzerRef.current.getSkillCategories();
    // Reconcile with existing selected skills if any
    if (skillCategories.length > 0) {
      // Just keep track of selected ones
      const selected = new Set();
      const proficiencies = {};
      skillCategories.forEach(cat => cat.skills.forEach(s => {
        if (s.selected) {
           selected.add(s.name);
           proficiencies[s.name] = s.proficiency;
        }
      }));
      categories.forEach(cat => cat.skills.forEach(s => {
        if (selected.has(s.name)) {
          s.selected = true;
          s.proficiency = proficiencies[s.name];
        }
      }));
    }
    setSkillCategories(categories);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateCategories = (newCategories) => {
    setSkillCategories(newCategories);
  };

  const handleStep2Back = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep2Next = () => {
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep3Back = (data) => {
    setProfileData(data);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyze = (data) => {
    setProfileData(data);
    
    // Gather selected skills
    const selectedSkills = {};
    for (const cat of skillCategories) {
      for (const skill of cat.skills) {
        if (skill.selected) {
          selectedSkills[skill.name] = skill.proficiency;
        }
      }
    }

    analyzerRef.current.setUserSkills(selectedSkills);
    analyzerRef.current.setUserProfile({
      ...data,
      studyHours: data.studyHours.toString()
    });

    const res = analyzerRef.current.analyze();
    setResults(res);
    
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartOver = () => {
    analyzerRef.current = new SkillAnalyzer();
    setJdText('');
    setSkillCategories([]);
    setResults(null);
    setProfileData({
      name: '',
      background: '',
      yearsExp: '0',
      studyHours: 10,
      targetDate: (() => {
        const d = new Date();
        d.setDate(d.getDate() + 90);
        return d.toISOString().split('T')[0];
      })()
    });
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="bg-animation">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      <Header />
      
      <main className="app-container">
        <ProgressBar currentStep={currentStep} />
        
        {currentStep === 1 && (
          <Step1JobDescription 
             initialText={jdText} 
             onNext={handleStep1Next} 
          />
        )}
        
        {currentStep === 2 && (
          <Step2SkillChecklist
            skillCategories={skillCategories}
            onUpdateCategories={handleUpdateCategories}
            onBack={handleStep2Back}
            onNext={handleStep2Next}
          />
        )}
        
        {currentStep === 3 && (
          <Step3Background
            initialData={profileData}
            onBack={handleStep3Back}
            onAnalyze={handleAnalyze}
          />
        )}
        
        {currentStep === 4 && (
          <Step4Results
            results={results}
            studyHours={profileData.studyHours}
            onStartOver={handleStartOver}
          />
        )}
      </main>
      
      <Footer />
    </>
  );
}

export default App;
