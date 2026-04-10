import React, { useState, useMemo, useCallback } from 'react';
import { SKILLS_DATABASE } from '../../data/skillsDatabase';

export default function Step2_SkillChecklist({ skillCategories, onUpdateCategories, onBack, onNext }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [importUrl, setImportUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importMessage, setImportMessage] = useState(null);

  const toggleSkill = useCallback((skillName) => {
    const updated = skillCategories.map(cat => ({
      ...cat,
      skills: cat.skills.map(s =>
        s.name === skillName ? { ...s, selected: !s.selected } : s
      )
    }));
    onUpdateCategories(updated);
  }, [skillCategories, onUpdateCategories]);

  const setProficiency = useCallback((skillName, level) => {
    const updated = skillCategories.map(cat => ({
      ...cat,
      skills: cat.skills.map(s =>
        s.name === skillName ? { ...s, proficiency: level, selected: true } : s
      )
    }));
    onUpdateCategories(updated);
  }, [skillCategories, onUpdateCategories]);

  const addCustomSkill = useCallback(() => {
    const name = customSkillInput.trim();
    if (!name) return;

    // Check if already exists
    const exists = skillCategories.some(c => c.skills.some(s => s.name.toLowerCase() === name.toLowerCase()));
    if (exists) {
      setCustomSkillInput('');
      return;
    }

    const updated = [...skillCategories];
    let customCat = updated.find(c => c.name === 'Custom Skills');
    if (!customCat) {
      customCat = { name: 'Custom Skills', icon: '⭐', skills: [], requiredCount: 0, niceCount: 0 };
      updated.push(customCat);
    } else {
      // We need to create a new reference for the category
      const idx = updated.indexOf(customCat);
      customCat = { ...customCat, skills: [...customCat.skills] };
      updated[idx] = customCat;
    }

    customCat.skills.push({
      name: name,
      tag: 'common',
      selected: true,
      proficiency: 'beginner'
    });

    setCustomSkillInput('');
    onUpdateCategories(updated);
  }, [customSkillInput, skillCategories, onUpdateCategories]);

  const handleCustomKeyPress = (e) => {
    if (e.key === 'Enter') addCustomSkill();
  };

  const getAliases = (skillName) => {
    for (const cat of Object.values(SKILLS_DATABASE)) {
      const s = cat.skills.find(x => x.name === skillName);
      if (s) return [s.name.toLowerCase(), ...s.aliases.map(a => a.toLowerCase())];
    }
    return [skillName.toLowerCase()];
  };

  const handleImportGitHub = async () => {
    let username = importUrl.trim();
    if (!username) return;

    if (username.includes('github.com/')) {
      const parts = username.split('github.com/');
      username = parts[1].split('/')[0];
    }
    
    setIsImporting(true);
    setImportMessage(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      if (!response.ok) {
        throw new Error('User not found or API limits exceeded. Please check the username.');
      }
      
      const repos = await response.json();
      const languages = new Set();
      
      repos.forEach(repo => {
        if (repo.language) {
          // GitHub returns "Jupyter Notebook", "C++", "HTML"
          languages.add(repo.language.toLowerCase());
        }
      });
      
      if (languages.size === 0) {
        setImportMessage({ type: 'error', text: 'No programming languages found in public repositories.' });
        setIsImporting(false);
        return;
      }
      
      const updated = [...skillCategories].map(cat => ({
        ...cat,
        skills: [...cat.skills]
      }));
      let matchedCount = 0;
      
      updated.forEach(cat => {
        cat.skills.forEach(skill => {
          const aliases = getAliases(skill.name);
          // GitHub returns HTML, DB has HTML5. Alias mapping handles this.
          const isMatch = aliases.some(alias => languages.has(alias));
          
          if (isMatch && !skill.selected) {
            skill.selected = true;
            skill.proficiency = 'intermediate'; // Assume intermediate if they have a repo using it
            matchedCount++;
          }
        });
      });
      
      onUpdateCategories(updated);
      setImportMessage({ type: 'success', text: `Successfully imported ${matchedCount} skills from GitHub (${Array.from(languages).slice(0,3).join(', ')}${languages.size > 3 ? '...' : ''})!` });
      setImportUrl('');
    } catch (err) {
      setImportMessage({ type: 'error', text: err.message });
    } finally {
      setIsImporting(false);
    }
  };

  // Compute filtered/searched categories
  const filteredCategories = useMemo(() => {
    return skillCategories.map(cat => {
      let skills = cat.skills;

      if (filter === 'required') skills = skills.filter(s => s.tag === 'required');
      else if (filter === 'nice') skills = skills.filter(s => s.tag === 'nice');
      else if (filter === 'common') skills = skills.filter(s => s.tag === 'common');

      if (search) {
        skills = skills.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
      }

      return { ...cat, filteredSkills: skills };
    }).filter(cat => cat.filteredSkills.length > 0);
  }, [skillCategories, filter, search]);

  // Count total selected across ALL categories (not filtered)
  const totalSelected = useMemo(() => {
    return skillCategories.reduce((acc, cat) => acc + cat.skills.filter(s => s.selected).length, 0);
  }, [skillCategories]);

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'required', label: 'Required by JD' },
    { key: 'nice', label: 'Nice to Have' },
    { key: 'common', label: 'Common Skills' },
  ];

  return (
    <section className="step-panel active">
      <div className="step-content">
        <div className="step-header">
          <div className="step-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 11 12 14 22 4"/>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
          </div>
          <h1>Select Your Current Skills</h1>
          <p className="step-subtitle">Tick everything you know — even basics count. We've detected skills from the JD and added common ones too.</p>
        </div>

        {/* Auto-Import Feature */}
        <div className="import-section" style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '0.9rem', marginBottom: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>Auto-Import from GitHub</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              placeholder="github.com/username or just username" 
              value={importUrl}
              onChange={e => setImportUrl(e.target.value)}
              style={{ flex: '1 1 250px', padding: '10px 16px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', color: 'white', fontSize: '0.9rem' }}
            />
            <button 
              className="btn btn-outline" 
              onClick={handleImportGitHub}
              disabled={isImporting || !importUrl.trim()}
              style={{ padding: '0 20px', whiteSpace: 'nowrap' }}
            >
              {isImporting ? 'Importing...' : 'Import Skills'}
            </button>
          </div>
          {importMessage && (
            <p style={{ marginTop: '12px', fontSize: '0.85rem', color: importMessage.type === 'success' ? 'var(--accent-success-light)' : 'var(--accent-warning)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {importMessage.type === 'success' ? '✓' : '⚠️'}
              {importMessage.text}
            </p>
          )}
        </div>

        {/* Search & Filter */}
        <div className="skills-toolbar">
          <div className="search-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              id="skillSearch"
              placeholder="Search skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="skill-filters">
            {filters.map(f => (
              <button
                key={f.key}
                className={`filter-btn ${filter === f.key ? 'active' : ''}`}
                data-filter={f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Proficiency Legend */}
        <div className="proficiency-legend">
          <span className="legend-title">Proficiency Levels:</span>
          <span className="legend-item"><span className="legend-dot beginner"></span>Beginner</span>
          <span className="legend-item"><span className="legend-dot intermediate"></span>Intermediate</span>
          <span className="legend-item"><span className="legend-dot advanced"></span>Advanced</span>
        </div>

        {/* Skills Categories Container */}
        <div className="skills-container" id="skillsContainer">
          {filteredCategories.map(cat => {
            const selectedInCat = cat.filteredSkills.filter(s => s.selected).length;
            const reqCount = cat.filteredSkills.filter(s => s.tag === 'required').length;
            const niceCount = cat.filteredSkills.filter(s => s.tag === 'nice').length;

            return (
              <div className="skill-category" key={cat.name}>
                <div className="category-header" data-category={cat.name}>
                  <div className="category-title">
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                    {reqCount > 0 && <span className="category-badge badge-required">{reqCount} required</span>}
                    {niceCount > 0 && <span className="category-badge badge-nice">{niceCount} nice to have</span>}
                  </div>
                  <span className="category-count">{selectedInCat}/{cat.filteredSkills.length}</span>
                </div>
                <div className="category-skills">
                  {cat.filteredSkills.map(skill => {
                    const sel = skill.selected ? 'selected' : '';
                    const profClass = skill.selected ? `prof-${skill.proficiency}` : '';

                    return (
                      <label
                        className={`skill-chip ${sel} ${profClass}`}
                        data-skill={skill.name}
                        data-tag={skill.tag}
                        key={skill.name}
                        onClick={(e) => {
                          // Don't toggle if clicking proficiency dots
                          if (e.target.classList.contains('pdot')) return;
                          toggleSkill(skill.name);
                        }}
                      >
                        <span className="chip-checkbox">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </span>
                        <span className="chip-label">{skill.name}</span>
                        {skill.selected && (
                          <span className="chip-dots">
                            <i
                              className={`pdot ${skill.proficiency === 'beginner' ? 'on-b' : ''}`}
                              data-level="beginner"
                              title="Beginner"
                              onClick={(e) => { e.stopPropagation(); setProficiency(skill.name, 'beginner'); }}
                            />
                            <i
                              className={`pdot ${skill.proficiency === 'intermediate' ? 'on-i' : ''}`}
                              data-level="intermediate"
                              title="Intermediate"
                              onClick={(e) => { e.stopPropagation(); setProficiency(skill.name, 'intermediate'); }}
                            />
                            <i
                              className={`pdot ${skill.proficiency === 'advanced' ? 'on-a' : ''}`}
                              data-level="advanced"
                              title="Advanced"
                              onClick={(e) => { e.stopPropagation(); setProficiency(skill.name, 'advanced'); }}
                            />
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Custom Skill */}
        <div className="add-skill-section">
          <input
            type="text"
            id="customSkillInput"
            placeholder="Add a skill not listed above..."
            value={customSkillInput}
            onChange={(e) => setCustomSkillInput(e.target.value)}
            onKeyPress={handleCustomKeyPress}
          />
          <button className="btn btn-outline btn-sm" id="addCustomSkill" onClick={addCustomSkill}>+ Add</button>
        </div>

        <div className="skills-summary">
          <span id="selectedSkillCount">{totalSelected}</span> skills selected
        </div>

        <div className="step-actions">
          <button className="btn btn-ghost btn-back" id="btnStep2Back" onClick={onBack}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back
          </button>
          <button className="btn btn-primary btn-next" id="btnStep2Next" onClick={onNext}>
            Continue
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
