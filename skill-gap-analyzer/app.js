/**
 * SkillScope — Main Application Controller
 * Handles all UI interactions, step navigation, and rendering
 */

document.addEventListener('DOMContentLoaded', () => {
  const analyzer = new SkillAnalyzer();
  let currentStep = 1;
  let skillCategories = [];

  // =========== DOM References ===========
  const steps = {
    1: document.getElementById('step1'),
    2: document.getElementById('step2'),
    3: document.getElementById('step3'),
    4: document.getElementById('step4'),
  };

  const progressSteps = document.querySelectorAll('.progress-step');
  const progressFills = [
    document.getElementById('progressFill1'),
    document.getElementById('progressFill2'),
    document.getElementById('progressFill3'),
  ];

  const jdTextarea = document.getElementById('jobDescription');
  const jdCharCount = document.getElementById('jdCharCount');
  const btnStep1Next = document.getElementById('btnStep1Next');
  const btnStep2Back = document.getElementById('btnStep2Back');
  const btnStep2Next = document.getElementById('btnStep2Next');
  const btnStep3Back = document.getElementById('btnStep3Back');
  const btnAnalyze = document.getElementById('btnAnalyze');
  const skillSearch = document.getElementById('skillSearch');
  const skillsContainer = document.getElementById('skillsContainer');
  const selectedSkillCount = document.getElementById('selectedSkillCount');
  const customSkillInput = document.getElementById('customSkillInput');
  const addCustomSkillBtn = document.getElementById('addCustomSkill');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const hoursSlider = document.getElementById('studyHours');
  const hoursValue = document.getElementById('hoursValue');
  const targetDateInput = document.getElementById('targetDate');
  const analyzingOverlay = document.getElementById('analyzingOverlay');
  const analyzingStatus = document.getElementById('analyzingStatus');
  const resultsDashboard = document.getElementById('resultsDashboard');
  const btnStartOver = document.getElementById('btnStartOver');
  const btnDownload = document.getElementById('btnDownload');

  // =========== Step 1: Job Description ===========
  jdTextarea.addEventListener('input', () => {
    const len = jdTextarea.value.length;
    jdCharCount.textContent = `${len} characters`;
    btnStep1Next.disabled = len < 50;

    // Color change for char count
    if (len >= 50) {
      jdCharCount.style.color = 'var(--accent-success)';
    } else {
      jdCharCount.style.color = 'var(--text-muted)';
    }
  });

  btnStep1Next.addEventListener('click', () => {
    const jd = jdTextarea.value.trim();
    if (jd.length < 50) return;

    // Parse JD
    analyzer.parseJobDescription(jd);

    // Generate skill categories for checklist
    skillCategories = analyzer.getSkillCategories();
    renderSkillCategories(skillCategories);

    goToStep(2);
  });

  // =========== Step 2: Skills Checklist ===========
  function renderSkillCategories(categories, filter = 'all', search = '') {
    skillsContainer.innerHTML = '';
    let totalSelected = 0;

    for (const cat of categories) {
      let filteredSkills = cat.skills;

      // Apply filter
      if (filter === 'required') {
        filteredSkills = filteredSkills.filter(s => s.tag === 'required');
      } else if (filter === 'nice') {
        filteredSkills = filteredSkills.filter(s => s.tag === 'nice');
      } else if (filter === 'common') {
        filteredSkills = filteredSkills.filter(s => s.tag === 'common');
      }

      // Apply search
      if (search) {
        filteredSkills = filteredSkills.filter(s =>
          s.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (filteredSkills.length === 0) continue;

      const selectedInCat = filteredSkills.filter(s => s.selected).length;
      totalSelected += selectedInCat;

      const catDiv = document.createElement('div');
      catDiv.className = 'skill-category';

      const tagCounts = [];
      const reqCount = filteredSkills.filter(s => s.tag === 'required').length;
      const niceCount = filteredSkills.filter(s => s.tag === 'nice').length;
      if (reqCount > 0) tagCounts.push(`<span class="category-badge badge-required">${reqCount} required</span>`);
      if (niceCount > 0) tagCounts.push(`<span class="category-badge badge-nice">${niceCount} nice to have</span>`);

      catDiv.innerHTML = `
        <div class="category-header" data-category="${cat.name}">
          <div class="category-title">
            <span>${cat.icon}</span>
            <span>${cat.name}</span>
            ${tagCounts.join('')}
          </div>
          <span class="category-count">${selectedInCat}/${filteredSkills.length}</span>
        </div>
        <div class="category-skills">
          ${filteredSkills.map(skill => {
            const sel = skill.selected ? 'selected' : '';
            const profClass = skill.selected ? `prof-${skill.proficiency}` : '';
            return `<label class="skill-chip ${sel} ${profClass}" data-skill="${skill.name}" data-tag="${skill.tag}">
              <span class="chip-checkbox"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></span>
              <span class="chip-label">${skill.name}</span>
              ${skill.selected ? `<span class="chip-dots">
                <i class="pdot ${skill.proficiency === 'beginner' ? 'on-b' : ''}" data-level="beginner" title="Beginner"></i>
                <i class="pdot ${skill.proficiency === 'intermediate' ? 'on-i' : ''}" data-level="intermediate" title="Intermediate"></i>
                <i class="pdot ${skill.proficiency === 'advanced' ? 'on-a' : ''}" data-level="advanced" title="Advanced"></i>
              </span>` : ''}
            </label>`;
          }).join('')}
        </div>
      `;

      skillsContainer.appendChild(catDiv);
    }

    // Recalculate total
    totalSelected = 0;
    for (const cat of skillCategories) {
      totalSelected += cat.skills.filter(s => s.selected).length;
    }
    selectedSkillCount.textContent = totalSelected;

    // Attach click handlers
    attachSkillChipHandlers();
  }

  function attachSkillChipHandlers() {
    document.querySelectorAll('.skill-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        // Don't toggle if clicking proficiency dots
        if (e.target.classList.contains('pdot')) return;

        const skillName = chip.dataset.skill;
        toggleSkillSelection(skillName);
      });
    });

    document.querySelectorAll('.pdot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const chip = dot.closest('.skill-chip');
        const skillName = chip.dataset.skill;
        const level = dot.dataset.level;
        setSkillProficiency(skillName, level);
      });
    });
  }

  function toggleSkillSelection(skillName) {
    for (const cat of skillCategories) {
      const skill = cat.skills.find(s => s.name === skillName);
      if (skill) {
        skill.selected = !skill.selected;
        if (skill.selected && skill.proficiency === 'beginner') {
          // Default to beginner when first selected
        }
        break;
      }
    }
    const filter = document.querySelector('.filter-btn.active').dataset.filter;
    const search = skillSearch.value;
    renderSkillCategories(skillCategories, filter, search);
  }

  function setSkillProficiency(skillName, level) {
    for (const cat of skillCategories) {
      const skill = cat.skills.find(s => s.name === skillName);
      if (skill) {
        skill.proficiency = level;
        // Also ensure selected
        skill.selected = true;
        break;
      }
    }
    const filter = document.querySelector('.filter-btn.active').dataset.filter;
    const search = skillSearch.value;
    renderSkillCategories(skillCategories, filter, search);
  }

  // Filters
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSkillCategories(skillCategories, btn.dataset.filter, skillSearch.value);
    });
  });

  // Search
  skillSearch.addEventListener('input', () => {
    const filter = document.querySelector('.filter-btn.active').dataset.filter;
    renderSkillCategories(skillCategories, filter, skillSearch.value);
  });

  // Add custom skill
  addCustomSkillBtn.addEventListener('click', () => {
    const name = customSkillInput.value.trim();
    if (!name) return;

    // Add to a "Custom" category or first available
    let customCat = skillCategories.find(c => c.name === 'Custom Skills');
    if (!customCat) {
      customCat = { name: 'Custom Skills', icon: '⭐', skills: [], requiredCount: 0, niceCount: 0 };
      skillCategories.push(customCat);
    }

    // Check if already exists
    const exists = skillCategories.some(c => c.skills.some(s => s.name.toLowerCase() === name.toLowerCase()));
    if (exists) {
      customSkillInput.value = '';
      return;
    }

    customCat.skills.push({
      name: name,
      tag: 'common',
      selected: true,
      proficiency: 'beginner'
    });

    customSkillInput.value = '';
    const filter = document.querySelector('.filter-btn.active').dataset.filter;
    renderSkillCategories(skillCategories, filter, skillSearch.value);
  });

  customSkillInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addCustomSkillBtn.click();
  });

  btnStep2Back.addEventListener('click', () => goToStep(1));
  btnStep2Next.addEventListener('click', () => goToStep(3));

  // =========== Step 3: Background ===========
  hoursSlider.addEventListener('input', () => {
    hoursValue.textContent = hoursSlider.value;
  });

  // Set default target date (90 days from now)
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 90);
  targetDateInput.value = defaultDate.toISOString().split('T')[0];

  btnStep3Back.addEventListener('click', () => goToStep(2));

  btnAnalyze.addEventListener('click', () => {
    // Gather selected skills
    const selectedSkills = {};
    for (const cat of skillCategories) {
      for (const skill of cat.skills) {
        if (skill.selected) {
          selectedSkills[skill.name] = skill.proficiency;
        }
      }
    }

    analyzer.setUserSkills(selectedSkills);
    analyzer.setUserProfile({
      name: document.getElementById('userName').value.trim() || 'there',
      background: document.getElementById('userBackground').value,
      yearsExp: document.getElementById('yearsExp').value,
      studyHours: hoursSlider.value,
      targetDate: targetDateInput.value,
    });

    goToStep(4);
    runAnalysis();
  });

  // =========== Step 4: Results ===========
  async function runAnalysis() {
    analyzingOverlay.style.display = 'flex';
    resultsDashboard.style.display = 'none';

    const statuses = [
      'Parsing job description...',
      'Extracting required skills...',
      'Comparing your profile...',
      'Calculating readiness score...',
      'Generating learning roadmap...',
      'Assembling resources...',
      'Finalizing your career plan...',
    ];

    for (let i = 0; i < statuses.length; i++) {
      analyzingStatus.textContent = statuses[i];
      await sleep(600);
    }

    // Run actual analysis
    const results = analyzer.analyze();

    analyzingOverlay.style.display = 'none';
    resultsDashboard.style.display = 'flex';

    renderResults(results);
  }

  function renderResults(results) {
    // Inject SVG gradient for score ring
    injectScoreGradient();

    // Animate score
    animateScore(results.overallScore);

    // Score message
    document.getElementById('scoreMessage').textContent = results.scoreMessage;

    // Score breakdown
    renderScoreBreakdown(results.scores);

    // Skills tabs
    renderSkillsTabs(results);

    // Planner
    renderPlanner(results.plan);

    // Resources
    renderResources(results.resources);

    // Job ready date
    document.getElementById('jobReadyDate').textContent = results.jobReadyDate;
    document.getElementById('jobReadyMessage').textContent =
      `If you study consistently at ${analyzer.userProfile.studyHours} hours per week, you'll be confidently applying by this date.`;

    // Motivation
    document.getElementById('motivationText').innerHTML = results.motivation;
  }

  function injectScoreGradient() {
    // Add SVG gradient definition
    const svg = document.querySelector('.score-ring');
    if (svg && !document.getElementById('scoreGradient')) {
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      defs.innerHTML = `
        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#6366f1"/>
          <stop offset="50%" style="stop-color:#8b5cf6"/>
          <stop offset="100%" style="stop-color:#ec4899"/>
        </linearGradient>
      `;
      svg.insertBefore(defs, svg.firstChild);
    }
  }

  function animateScore(targetScore) {
    const scoreNumber = document.getElementById('scoreNumber');
    const scoreFill = document.getElementById('scoreRingFill');
    const circumference = 326.73; // 2 * PI * 52

    // Animate number
    let current = 0;
    const duration = 2000;
    const startTime = performance.now();

    function updateNumber(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      current = Math.round(eased * targetScore);
      scoreNumber.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    }
    requestAnimationFrame(updateNumber);

    // Animate ring
    setTimeout(() => {
      const offset = circumference - (targetScore / 100) * circumference;
      scoreFill.style.strokeDashoffset = offset;
    }, 100);
  }

  function renderScoreBreakdown(scores) {
    const container = document.getElementById('scoreBreakdown');
    const items = [
      { label: 'Technical Skills', score: scores.technical, barClass: 'bar-tech' },
      { label: 'Experience Level', score: scores.experience, barClass: 'bar-exp' },
      { label: 'Domain Knowledge', score: scores.domain, barClass: 'bar-domain' },
      { label: 'Soft Skills', score: scores.softSkills, barClass: 'bar-soft' },
    ];

    container.innerHTML = `
      <h3 style="font-size:0.95rem;font-weight:700;color:var(--text-primary);margin-bottom:4px;position:relative;">Score Breakdown</h3>
      ${items.map(item => `
        <div class="breakdown-item">
          <div class="breakdown-label">
            <span>${item.label}</span>
            <span>${item.score}%</span>
          </div>
          <div class="breakdown-bar">
            <div class="breakdown-bar-fill ${item.barClass}" data-width="${item.score}"></div>
          </div>
        </div>
      `).join('')}
    `;

    // Animate bars
    setTimeout(() => {
      container.querySelectorAll('.breakdown-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }, 300);
  }

  function renderSkillsTabs(results) {
    // Update tab labels with counts
    const tabBtns = document.querySelectorAll('[data-results-tab]');
    tabBtns.forEach(btn => {
      const tab = btn.dataset.resultsTab;
      if (tab === 'matched') btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Skills You Have <span class="tab-count">${results.matched.length}</span>`;
      if (tab === 'deepen') btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> Skills to Deepen <span class="tab-count">${results.deepen.length}</span>`;
      if (tab === 'missing') btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> Skills to Learn <span class="tab-count">${results.missing.length}</span>`;
    });

    // Proficiency label helper
    const profLabel = (prof) => {
      const map = { beginner: '🟡 Beginner', intermediate: '🔵 Intermediate', advanced: '🟢 Advanced' };
      return map[prof] || prof;
    };

    // Matched — user's skills
    const matchedContainer = document.getElementById('matchedSkills');
    if (results.matched.length === 0) {
      matchedContainer.innerHTML = `<div class="empty-state">
        <span class="empty-icon">📋</span>
        <p>You haven't selected any skills that match this JD yet.</p>
        <p class="empty-hint">Go back to Step 2 and select the skills you know!</p>
      </div>`;
    } else {
      matchedContainer.innerHTML = results.matched.map(s =>
        `<span class="result-chip chip-matched">
          <span class="chip-icon">✓</span>
          <span class="chip-skill-name">${s.name}</span>
          <span class="chip-prof chip-prof-${s.proficiency}">${profLabel(s.proficiency)}</span>
          ${s.isRequired ? '<span class="chip-req">Required</span>' : '<span class="chip-nice">Nice to Have</span>'}
        </span>`
      ).join('');
    }

    // Deepen
    const deepenContainer = document.getElementById('deepenSkills');
    if (results.deepen.length === 0) {
      deepenContainer.innerHTML = `<div class="empty-state">
        <span class="empty-icon">🎯</span>
        <p>No skills need deepening — great proficiency across the board!</p>
      </div>`;
    } else {
      deepenContainer.innerHTML = results.deepen.map(s =>
        `<span class="result-chip chip-deepen">
          <span class="chip-icon">↑</span>
          <span class="chip-skill-name">${s.name}</span>
          <span class="chip-prof chip-prof-${s.proficiency}">${profLabel(s.proficiency)} → Level up</span>
        </span>`
      ).join('');
    }

    // Missing - ranked by importance
    const missingContainer = document.getElementById('missingSkills');
    if (results.missing.length === 0) {
      missingContainer.innerHTML = `<div class="empty-state">
        <span class="empty-icon">🏆</span>
        <p>Amazing — you have all the required skills! Focus on deepening your knowledge.</p>
      </div>`;
    } else {
      missingContainer.innerHTML = results.missing.map((s, i) =>
        `<span class="result-chip chip-missing">
          <span class="rank-badge">#${i + 1}</span>
          <span class="chip-skill-name">${s.name}</span>
          ${s.isRequired ? '<span class="chip-req">Required</span>' : '<span class="chip-nice">Nice to Have</span>'}
        </span>`
      ).join('');
    }

    // Tab click handlers
    document.querySelectorAll('[data-results-tab]').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('[data-results-tab]').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        document.querySelectorAll('.results-tab-content').forEach(c => c.classList.remove('active'));
        const targetId = 'tab' + tab.dataset.resultsTab.charAt(0).toUpperCase() + tab.dataset.resultsTab.slice(1);
        document.getElementById(targetId).classList.add('active');
      });
    });
  }

  function renderPlanner(plan) {
    const container = document.getElementById('plannerContent');
    let activePeriod = 30;

    function renderPlanPeriod(period) {
      container.innerHTML = plan[period].map(week => `
        <div class="planner-week">
          <div class="week-header">
            <span class="week-title">${week.week}</span>
            <span class="week-hours">${week.hours}</span>
          </div>
          <ul class="week-goals">
            ${week.goals.map(g => `<li>${g}</li>`).join('')}
          </ul>
        </div>
      `).join('');
    }

    renderPlanPeriod(30);

    document.querySelectorAll('.planner-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.planner-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activePeriod = parseInt(tab.dataset.planner);
        renderPlanPeriod(activePeriod);
      });
    });
  }

  function renderResources(resources) {
    const container = document.getElementById('resourceContent');
    let activeTab = 'free';

    function renderResourceTab(tab) {
      const data = resources[tab];
      if (Object.keys(data).length === 0) {
        container.innerHTML = `<div class="empty-state" style="padding:24px;">
          <span class="empty-icon">📚</span>
          <p>No specific resources needed — you have all the skills!</p>
        </div>`;
        return;
      }

      container.innerHTML = Object.entries(data).map(([skill, items]) => `
        <div class="resource-skill-group">
          <div class="resource-skill-title">
            <span class="resource-skill-icon">📖</span>
            ${skill}
            <span class="resource-count">${items.length} resource${items.length !== 1 ? 's' : ''}</span>
          </div>
          <div class="resource-list">
            ${items.map(item => `
              <a href="${item.url || '#'}" target="_blank" rel="noopener noreferrer" class="resource-item resource-link">
                <span class="resource-type-badge ${item.badge}">${item.type}</span>
                <div class="resource-info">
                  <div class="resource-name">${item.name}
                    <svg class="external-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </div>
                  <div class="resource-desc">${item.desc}</div>
                </div>
                ${item.price ? `<span class="resource-price">${item.price}</span>` : ''}
              </a>
            `).join('')}
          </div>
        </div>
      `).join('');
    }

    renderResourceTab('free');

    document.querySelectorAll('.resource-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.resource-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeTab = tab.dataset.resource;
        renderResourceTab(activeTab);
      });
    });
  }

  // =========== Navigation ===========
  function goToStep(step) {
    // Hide current
    steps[currentStep].classList.remove('active');

    // Update progress
    progressSteps.forEach((ps, i) => {
      const stepNum = i + 1;
      ps.classList.remove('active', 'completed');
      if (stepNum < step) {
        ps.classList.add('completed');
      } else if (stepNum === step) {
        ps.classList.add('active');
      }
    });

    // Animate progress fills
    for (let i = 0; i < progressFills.length; i++) {
      if (i < step - 1) {
        progressFills[i].style.width = '100%';
      } else {
        progressFills[i].style.width = '0%';
      }
    }

    // Show/hide progress bar on step 4
    document.getElementById('progressWrapper').style.display = step === 4 ? 'none' : 'block';

    // Show new step
    currentStep = step;
    steps[currentStep].classList.add('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // =========== Start Over ===========
  btnStartOver.addEventListener('click', () => {
    jdTextarea.value = '';
    jdCharCount.textContent = '0 characters';
    btnStep1Next.disabled = true;
    skillSearch.value = '';
    document.getElementById('userName').value = '';
    hoursSlider.value = 10;
    hoursValue.textContent = '10';

    // Reset progress wrapper
    document.getElementById('progressWrapper').style.display = 'block';

    goToStep(1);
  });

  // =========== Download Plan ===========
  btnDownload.addEventListener('click', () => {
    if (!analyzer.results) return;
    const r = analyzer.results;

    let text = `SKILLSCOPE - CAREER ANALYSIS REPORT\n`;
    text += `${'='.repeat(50)}\n\n`;
    text += `Generated: ${new Date().toLocaleDateString()}\n`;
    text += `Name: ${analyzer.userProfile.name}\n\n`;

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
  });

  // =========== Utilities ===========
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
});
