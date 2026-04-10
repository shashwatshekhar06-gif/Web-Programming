/**
 * SkillScope — Analyzer Engine
 * Parses JD, extracts skills, compares, scores, and generates plans
 */

class SkillAnalyzer {
  constructor() {
    this.jdText = '';
    this.extractedSkills = { required: [], niceToHave: [] };
    this.userSkills = {}; // { skillName: proficiency }
    this.userProfile = {};
    this.results = null;
  }

  /**
   * Parse job description and extract skills
   */
  parseJobDescription(text) {
    this.jdText = text.toLowerCase();
    const extracted = { required: new Set(), niceToHave: new Set() };

    // Find where "nice to have" sections begin and end in the text
    const niceToHaveMarkers = [
      'nice to have', 'preferred qualifications', 'bonus', 'good to have',
      'plus point', 'desirable', 'additional skills', 'not required but',
      'nice-to-have', 'preferred skills'
    ];

    // Find the earliest "nice to have" marker position
    let niceStartPos = this.jdText.length; // default: no nice section
    for (const marker of niceToHaveMarkers) {
      const pos = this.jdText.indexOf(marker);
      if (pos !== -1 && pos < niceStartPos) {
        niceStartPos = pos;
      }
    }

    // Find end of nice-to-have section: look for the next sentence that starts
    // a new requirement context (period + space + uppercase-like content)
    let niceEndPos = this.jdText.length;
    if (niceStartPos < this.jdText.length) {
      // Look for sentence boundaries after the nice-to-have section
      // Find next period followed by a space and a new sentence
      const afterNice = this.jdText.substring(niceStartPos);
      // Find the end of the nice-to-have list: look for ". " after the last comma-separated item
      const sentenceBreaks = [...afterNice.matchAll(/\.\s+[a-z]/g)];
      if (sentenceBreaks.length > 0) {
        // First sentence break after the nice-to-have marker ends the section
        niceEndPos = niceStartPos + sentenceBreaks[0].index + 1;
      }
    }

    for (const category of Object.values(SKILLS_DATABASE)) {
      for (const skill of category.skills) {
        const foundPos = this._findSkillPosition(skill, this.jdText);
        if (foundPos !== -1) {
          // Skill is nice-to-have only if it appears WITHIN the nice section
          if (foundPos >= niceStartPos && foundPos < niceEndPos) {
            extracted.niceToHave.add(skill.name);
          } else {
            extracted.required.add(skill.name);
          }
        }
      }
    }

    this.extractedSkills = {
      required: [...extracted.required],
      niceToHave: [...extracted.niceToHave]
    };

    return this.extractedSkills;
  }

  /**
   * Find the first position of a skill in text, returns -1 if not found
   */
  _findSkillPosition(skill, text) {
    const terms = [skill.name.toLowerCase(), ...skill.aliases.map(a => a.toLowerCase())];
    let earliestPos = -1;

    for (const term of terms) {
      let pos = -1;
      if (term.length <= 3) {
        const regex = new RegExp(`\\b${this._escapeRegex(term)}\\b`, 'i');
        const match = regex.exec(text);
        if (match) pos = match.index;
      } else {
        pos = text.indexOf(term);
      }
      if (pos !== -1 && (earliestPos === -1 || pos < earliestPos)) {
        earliestPos = pos;
      }
    }
    return earliestPos;
  }

  _escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Get all skill categories with matched status for checklist
   */
  getSkillCategories() {
    const categories = [];
    const allRequired = new Set(this.extractedSkills.required.map(s => s.toLowerCase()));
    const allNice = new Set(this.extractedSkills.niceToHave.map(s => s.toLowerCase()));

    for (const [catName, catData] of Object.entries(SKILLS_DATABASE)) {
      const catSkills = catData.skills.map(skill => {
        const lower = skill.name.toLowerCase();
        let tag = 'common';
        if (allRequired.has(lower)) tag = 'required';
        else if (allNice.has(lower)) tag = 'nice';

        return {
          name: skill.name,
          tag: tag,
          selected: false,
          proficiency: 'beginner'
        };
      });

      // Sort: required first, then nice, then common
      const order = { required: 0, nice: 1, common: 2 };
      catSkills.sort((a, b) => order[a.tag] - order[b.tag]);

      categories.push({
        name: catName,
        icon: catData.icon,
        skills: catSkills,
        requiredCount: catSkills.filter(s => s.tag === 'required').length,
        niceCount: catSkills.filter(s => s.tag === 'nice').length,
      });
    }

    // Sort categories: those with required skills come first
    categories.sort((a, b) => b.requiredCount - a.requiredCount);

    return categories;
  }

  /**
   * Set user's selected skills with proficiency levels
   */
  setUserSkills(skills) {
    this.userSkills = skills; // { skillName: 'beginner' | 'intermediate' | 'advanced' }
  }

  /**
   * Set user profile info
   */
  setUserProfile(profile) {
    this.userProfile = profile;
  }

  /**
   * Run full analysis
   */
  analyze() {
    const allJDSkills = [...this.extractedSkills.required, ...this.extractedSkills.niceToHave];
    const userSkillNames = Object.keys(this.userSkills);

    // Categorize skills into three clear groups:
    // matched: Skills you HAVE (selected by user, appear in JD)
    // deepen: Subset of matched that need improvement (beginner on required, or intermediate on required)
    // missing: Skills you DON'T have (in JD but not selected)
    const matched = [];
    const deepen = [];
    const missing = [];

    for (const skillName of allJDSkills) {
      if (userSkillNames.includes(skillName)) {
        const prof = this.userSkills[skillName];
        const isRequired = this.extractedSkills.required.includes(skillName);

        // Always add to matched — the user HAS this skill
        matched.push({ name: skillName, proficiency: prof, isRequired });

        // If it needs deepening, also flag it
        if (prof === 'beginner' || (prof === 'intermediate' && isRequired)) {
          deepen.push({ name: skillName, proficiency: prof, isRequired });
        }
      } else {
        const isRequired = this.extractedSkills.required.includes(skillName);
        missing.push({ name: skillName, isRequired });
      }
    }

    // Rank missing by importance (required first)
    missing.sort((a, b) => (b.isRequired ? 1 : 0) - (a.isRequired ? 1 : 0));

    // Calculate scores
    const requiredSkills = this.extractedSkills.required;
    const totalRequired = requiredSkills.length || 1;
    const totalJD = allJDSkills.length || 1;

    // Technical score — weighted by proficiency
    // advanced=1.0, intermediate=0.75, beginner=0.4
    let techPoints = 0;
    for (const s of matched) {
      if (s.proficiency === 'advanced') techPoints += 1.0;
      else if (s.proficiency === 'intermediate') techPoints += 0.75;
      else techPoints += 0.4;
    }
    const techScore = Math.round((techPoints / totalJD) * 100);

    // Experience score
    const yearsExp = parseInt(this.userProfile.yearsExp) || 0;
    const jdExp = this._detectRequiredExperience();
    let expScore = 100;
    if (jdExp > 0) {
      expScore = Math.min(100, Math.round((yearsExp / jdExp) * 100));
    }

    // Domain knowledge score
    const domainScore = this._calculateDomainScore();

    // Soft skills score — only count if JD mentions soft skills AND user selected them
    const softSkillsCat = SKILLS_DATABASE["Soft Skills"];
    const softRequired = softSkillsCat ? softSkillsCat.skills.filter(
      s => allJDSkills.includes(s.name)
    ) : [];
    const softMatched = softRequired.filter(s => userSkillNames.includes(s.name)).length;
    const hasSoftSkillsInJD = softRequired.length > 0;
    const softScore = hasSoftSkillsInJD
      ? Math.round((softMatched / softRequired.length) * 100)
      : 0; // Don't assume — if JD doesn't mention them, score is N/A (0)

    // Overall readiness — redistribute weights if soft skills not in JD
    let overallScore;
    if (hasSoftSkillsInJD) {
      overallScore = Math.round(
        techScore * 0.45 +
        expScore * 0.25 +
        domainScore * 0.15 +
        softScore * 0.15
      );
    } else {
      // No soft skills in JD — give more weight to technical
      overallScore = Math.round(
        techScore * 0.55 +
        expScore * 0.25 +
        domainScore * 0.20
      );
    }

    // Generate plan
    const plan = this._generate306090Plan(missing, deepen);

    // Generate resources
    const resources = this._generateResources(missing, deepen);

    // Calculate job-ready date
    const jobReadyDate = this._calculateJobReadyDate(missing.length, deepen.length);

    // Motivational message
    const motivation = this._generateMotivation(overallScore, matched.length, missing.length, jobReadyDate);

    this.results = {
      overallScore,
      scores: {
        technical: Math.min(100, techScore),
        experience: Math.min(100, expScore),
        domain: Math.min(100, domainScore),
        softSkills: Math.min(100, softScore),
      },
      matched,
      deepen,
      missing,
      plan,
      resources,
      jobReadyDate,
      motivation,
      scoreMessage: this._getScoreMessage(overallScore),
    };

    return this.results;
  }

  _detectRequiredExperience() {
    const patterns = [
      /(\d+)\+?\s*years?\s*(?:of\s*)?experience/i,
      /experience\s*(?:of\s*)?(\d+)\+?\s*years?/i,
      /(\d+)\+?\s*yrs?\s*(?:of\s*)?exp/i,
    ];
    for (const pat of patterns) {
      const match = this.jdText.match(pat);
      if (match) return parseInt(match[1]);
    }
    return 0;
  }

  _calculateDomainScore() {
    // Simple heuristic based on experience and background
    const bg = this.userProfile.background;
    const exp = parseInt(this.userProfile.yearsExp) || 0;

    if (bg === 'professional' && exp >= 3) return 80;
    if (bg === 'professional') return 60;
    if (bg === 'freelancer') return 55;
    if (bg === 'switcher') return 35;
    if (bg === 'fresher') return 30;
    if (bg === 'student') return 20;
    return 40;
  }

  _getScoreMessage(score) {
    if (score >= 80) return "Excellent! You're nearly there. Focus on the fine-tuning.";
    if (score >= 60) return "Strong foundation! A focused effort will close the gaps quickly.";
    if (score >= 40) return "Good start! You have core skills — now let's build on them.";
    if (score >= 20) return "You're on the path! With a structured plan, you'll get there.";
    return "Everyone starts somewhere. Let's build your roadmap step by step.";
  }

  _generate306090Plan(missing, deepen) {
    const hoursPerWeek = parseInt(this.userProfile.studyHours) || 10;
    const allToLearn = [
      ...missing.filter(s => s.isRequired).map(s => ({ ...s, priority: 'critical' })),
      ...deepen.map(s => ({ ...s, priority: 'deepen' })),
      ...missing.filter(s => !s.isRequired).map(s => ({ ...s, priority: 'nice' })),
    ];

    const plan = { 30: [], 60: [], 90: [] };

    // Days 1-30: Foundation (critical skills)
    const criticalSkills = allToLearn.filter(s => s.priority === 'critical');
    const deepenSkills = allToLearn.filter(s => s.priority === 'deepen');
    const niceSkills = allToLearn.filter(s => s.priority === 'nice');

    // Distribute across 4 weeks for day 1-30
    for (let week = 1; week <= 4; week++) {
      const weekGoals = [];
      const skillsPerWeek = Math.ceil(criticalSkills.length / 4);
      const startIdx = (week - 1) * skillsPerWeek;
      const weekSkills = criticalSkills.slice(startIdx, startIdx + skillsPerWeek);

      if (week === 1) {
        weekGoals.push("Set up your development environment and learning workspace");
      }

      for (const skill of weekSkills) {
        weekGoals.push(`Learn fundamentals of ${skill.name} — complete official tutorial/documentation`);
        weekGoals.push(`Practice ${skill.name} with small exercises and coding challenges`);
      }

      if (weekGoals.length === 0) {
        // Fill with deepen skills if no more critical
        const dSkill = deepenSkills[week - 1];
        if (dSkill) {
          weekGoals.push(`Deepen knowledge of ${dSkill.name} — work through advanced topics`);
          weekGoals.push(`Build a mini-project using ${dSkill.name}`);
        }
      }

      if (week === 4) {
        weekGoals.push("Review all concepts learned — take notes and create cheat sheets");
      }

      plan[30].push({
        week: `Week ${week}`,
        hours: `${hoursPerWeek} hrs`,
        goals: weekGoals.length > 0 ? weekGoals : ["Continue practicing previous skills and build confidence"]
      });
    }

    // Days 31-60: Depth & Projects
    const projectSkills = [...criticalSkills.map(s => s.name), ...deepenSkills.map(s => s.name)];
    for (let week = 5; week <= 8; week++) {
      const weekGoals = [];
      const weekIdx = week - 5;

      if (week === 5) {
        weekGoals.push("Start a portfolio project combining multiple skills from the JD");
      }

      // Deepen remaining skills
      if (deepenSkills[weekIdx]) {
        weekGoals.push(`Deep-dive into ${deepenSkills[weekIdx].name} — build a real feature using it`);
      }

      if (niceSkills[weekIdx]) {
        weekGoals.push(`Explore ${niceSkills[weekIdx].name} — get to beginner-intermediate level`);
      }

      if (week === 6 || week === 7) {
        weekGoals.push("Continue building project — implement API integrations, testing");
      }

      if (week === 7) {
        weekGoals.push("Start contributing to an open-source project in your target domain");
      }

      if (week === 8) {
        weekGoals.push("Complete and deploy your portfolio project");
        weekGoals.push("Write a detailed README and document your learning journey");
      }

      plan[60].push({
        week: `Week ${week}`,
        hours: `${hoursPerWeek} hrs`,
        goals: weekGoals.length > 0 ? weekGoals : ["Continue project work and practice coding interviews"]
      });
    }

    // Days 61-90: Job Ready
    for (let week = 9; week <= 12; week++) {
      const weekGoals = [];

      if (week === 9) {
        weekGoals.push("Start mock interviews — practice DSA and system design questions");
        weekGoals.push("Update your resume with new skills and project descriptions");
        weekGoals.push("Optimize LinkedIn profile with target keywords from JD");
      }

      if (week === 10) {
        weekGoals.push("Practice behavioral interview questions (STAR method)");
        weekGoals.push("Do 2-3 mock technical interviews (use Pramp or peers)");
        weekGoals.push("Polish portfolio — add live demos and clean code");
      }

      if (week === 11) {
        weekGoals.push("Start applying to jobs — aim for 5-10 applications this week");
        weekGoals.push("Customize resume for each application");
        weekGoals.push("Network — reach out to 3-5 people at target companies");
      }

      if (week === 12) {
        weekGoals.push("Continue applying — ramp up to 10-15 applications");
        weekGoals.push("Follow up on previous applications");
        weekGoals.push("Keep practicing — one mock interview per day");
        weekGoals.push("You are ready. Trust your preparation! 🎉");
      }

      plan[90].push({
        week: `Week ${week}`,
        hours: `${hoursPerWeek} hrs`,
        goals: weekGoals
      });
    }

    return plan;
  }

  _generateResources(missing, deepen) {
    const allSkillsToLearn = [
      ...missing.map(s => s.name),
      ...deepen.map(s => s.name)
    ];

    const freeResources = {};
    const paidResources = {};

    for (const skillName of allSkillsToLearn) {
      const dbEntry = RESOURCES_DATABASE[skillName] || RESOURCES_DATABASE["_default"];
      const encodedSkill = encodeURIComponent(skillName);

      freeResources[skillName] = dbEntry.free.map(r => ({
        ...r,
        name: r.name.replace(/\[SKILL\]/g, skillName),
        desc: r.desc.replace(/\[SKILL\]/g, skillName),
        url: (r.url || '').replace(/\[SKILL\]/g, encodedSkill),
      }));

      paidResources[skillName] = dbEntry.paid.map(r => ({
        ...r,
        name: r.name.replace(/\[SKILL\]/g, skillName),
        desc: r.desc.replace(/\[SKILL\]/g, skillName),
        url: (r.url || '').replace(/\[SKILL\]/g, encodedSkill),
      }));
    }

    return { free: freeResources, paid: paidResources };
  }

  _calculateJobReadyDate(missingCount, deepenCount) {
    const hoursPerWeek = parseInt(this.userProfile.studyHours) || 10;
    const totalEffort = missingCount * 15 + deepenCount * 8; // estimated hours
    const weeksNeeded = Math.max(8, Math.ceil(totalEffort / hoursPerWeek));
    const cappedWeeks = Math.min(weeksNeeded, 16); // Cap at ~4 months

    // Check if user has a target date
    if (this.userProfile.targetDate) {
      const target = new Date(this.userProfile.targetDate);
      const now = new Date();
      if (target > now) {
        return this._formatDate(target);
      }
    }

    const readyDate = new Date();
    readyDate.setDate(readyDate.getDate() + cappedWeeks * 7);
    return this._formatDate(readyDate);
  }

  _formatDate(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  _generateMotivation(score, matchedCount, missingCount, readyDate) {
    const template = MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)];
    const name = this.userProfile.name || 'there';
    const hours = this.userProfile.studyHours || 10;

    return template
      .replace(/{name}/g, name)
      .replace(/{score}/g, score)
      .replace(/{matched}/g, matchedCount)
      .replace(/{missing}/g, missingCount)
      .replace(/{hours}/g, hours)
      .replace(/{date}/g, readyDate);
  }
}
