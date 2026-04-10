<p align="center">
  <img src="https://img.shields.io/badge/SkillScope-Skill%20Gap%20Analyzer-6366f1?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjIgMTJoLTRsLTMgOUw5IDNsLTMgOUgyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==&logoColor=white" alt="SkillScope Badge"/>
</p>

<h1 align="center">🎯 SkillScope — Skill Gap Analyzer & Career Planner</h1>

<p align="center">
  <strong>Analyze your skill gaps against any job description. Get a personalized 30/60/90 day learning roadmap with curated free & paid resources.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/No_Backend-100%25_Client--Side-10b981?style=flat-square" alt="No Backend"/>
  <img src="https://img.shields.io/badge/No_API_Keys-Required-8b5cf6?style=flat-square" alt="No API Keys"/>
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Skills Database](#-skills-database)
- [Customization](#-customization)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 Overview

**SkillScope** is a client-side web application that helps job seekers understand exactly where they stand against any job description. Paste a JD, select your skills, and get an honest readiness score with a structured learning plan to close the gaps.

> **No API keys. No backend. No data leaves your browser.** Everything runs 100% client-side using intelligent pattern matching.

### Who is this for?

| 👤 User | 💡 Use Case |
|---------|-------------|
| **Students** | Understand what skills to learn before applying |
| **Fresh Graduates** | Know your readiness score for dream roles |
| **Career Switchers** | See exactly what gaps to fill in a new domain |
| **Working Professionals** | Benchmark skills against aspirational roles |
| **Freelancers** | Identify skills to expand service offerings |

---

## ✨ Features

### 🧠 Smart JD Parsing
- Extracts every skill, tool, and technology from any job description
- Intelligently distinguishes **Required** vs **Nice to Have** skills using position-based section detection
- Handles single-paragraph and multi-section JD formats

### ✅ Interactive Skills Checklist
- **150+ skills** across 12 categories (Frontend, Backend, DevOps, Data Science, etc.)
- Compact pill-shaped chip UI with click-to-select
- **3 proficiency levels**: 🟡 Beginner · 🔵 Intermediate · 🟢 Advanced
- Search and filter by category (Required by JD / Nice to Have / Common)
- Add custom skills not in the database

### 📊 Professional Results Dashboard
- **Job Readiness Score** — animated circular gauge with percentage
- **Score Breakdown** — Technical Skills, Experience, Domain Knowledge, Soft Skills
- **Skills You Have** — shows all matched skills with proficiency badges
- **Skills to Deepen** — skills you know but need to level up
- **Skills to Learn** — ranked by importance (required first)

### 📅 30/60/90 Day Learning Roadmap
- **Days 1–30**: Foundation — learn critical missing skills
- **Days 31–60**: Depth & Projects — build portfolio projects
- **Days 61–90**: Job Ready — mock interviews, applications, networking
- Customized based on your available study hours per week

### 📚 Curated Learning Resources
- **Free Resources Tab**: YouTube playlists, freeCodeCamp, MDN Docs, The Odin Project, GitHub repos
- **Paid Resources Tab**: Udemy, Coursera, LinkedIn Learning, Books — prices in ₹ (INR)
- **All links are clickable** and open in a new tab
- Resources are skill-specific with fallback to smart search links

### 🎯 Personalized Insights
- Job-ready target date estimation
- Motivational message personalized with your name and stats
- Download plan functionality

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Structure** | HTML5 | Semantic markup, multi-step wizard |
| **Styling** | Vanilla CSS3 | Dark glassmorphism theme, animations, responsive |
| **Logic** | Vanilla ES6 JavaScript | JD parsing, scoring, plan generation |
| **Fonts** | Google Fonts (Inter, JetBrains Mono) | Modern typography |
| **Backend** | None | 100% client-side |
| **Dependencies** | None | Zero npm packages |

---

## 🚀 Getting Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Edge, Safari)
- A local HTTP server (required for module loading)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Web-Programming.git
   cd Web-Programming/skill-gap-analyzer
   ```

2. **Start a local server** (pick any method)
   ```bash
   # Python 3
   python -m http.server 8080

   # Node.js (if installed)
   npx serve .

   # VS Code
   # Install "Live Server" extension → Right-click index.html → "Open with Live Server"
   ```

3. **Open in browser**
   ```
   http://localhost:8080
   ```

> ⚠️ **Note**: Opening `index.html` directly via `file://` protocol may cause CORS restrictions. Always use an HTTP server.

---

## 📁 Project Structure

```
skill-gap-analyzer/
├── index.html              # Main application — multi-step wizard UI
├── style.css               # Complete design system — dark glassmorphism theme
├── app.js                  # UI controller — rendering, navigation, event handlers
├── analyzer.js             # Analysis engine — JD parsing, scoring, plan generation
└── skills-database.js      # Data source — 150+ skills, aliases, and resource links
```

### File Responsibilities

| File | Lines | Role |
|------|-------|------|
| **`index.html`** | ~407 | 4-step wizard layout, progress bar, results dashboard HTML |
| **`style.css`** | ~1900 | CSS variables, animations, responsive breakpoints, glassmorphism |
| **`app.js`** | ~680 | DOM manipulation, step navigation, dynamic rendering, event handlers |
| **`analyzer.js`** | ~500 | `SkillAnalyzer` class — parsing, scoring, plan & resource generation |
| **`skills-database.js`** | ~480 | `SKILLS_DATABASE`, `RESOURCES_DATABASE`, motivational templates |

---

## ⚙️ How It Works

### Architecture Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│  Step 1      │────▶│  Step 2       │────▶│  Step 3      │────▶│  Step 4       │
│  Paste JD    │     │  Select Skills│     │  Background  │     │  Results      │
│              │     │  + Proficiency│     │  Info        │     │  Dashboard    │
└─────────────┘     └──────────────┘     └─────────────┘     └──────────────┘
       │                    │                    │                    │
       ▼                    ▼                    ▼                    ▼
  parseJobDescription()  toggleSkill()     setUserProfile()     analyze()
  extractSkills()        setProficiency()   setStudyHours()      generatePlan()
                                                                 generateResources()
```

### Scoring Algorithm

The readiness score is a weighted average:

| Component | Weight | How It's Calculated |
|-----------|--------|-------------------|
| **Technical Skills** | 45% | Skills matched × proficiency weight (Advanced=1.0, Intermediate=0.75, Beginner=0.4) |
| **Experience Level** | 25% | User years / JD required years × 100 |
| **Domain Knowledge** | 15–20% | Based on background type (Professional > Freelancer > Switcher > Student) |
| **Soft Skills** | 0–15% | Only scored if JD mentions soft skills; 0% if not applicable |

### JD Parsing Logic

1. Lowercases the entire JD text
2. Finds the position of "nice to have" markers
3. Detects sentence boundaries to find where the nice-to-have section ends
4. For each skill in the database, finds its position in the text
5. Classifies as **Required** (before nice-to-have) or **Nice to Have** (within that section)

---

## 🗃️ Skills Database

### Categories (12 total)

| Category | Skills Count | Examples |
|----------|-------------|----------|
| 💻 Programming Languages | 20 | JavaScript, Python, TypeScript, Go, Rust |
| 🎨 Frontend Development | 23 | React, Angular, Vue.js, Next.js, Tailwind |
| ⚙️ Backend Development | 17 | Node.js, Django, Express, GraphQL, REST API |
| 🗄️ Databases | 17 | PostgreSQL, MongoDB, Redis, Firebase |
| ☁️ DevOps & Cloud | 18 | AWS, Docker, Kubernetes, CI/CD, Terraform |
| 📱 Mobile Development | 7 | React Native, Flutter, iOS, Android |
| 🤖 Data Science & ML | 16 | TensorFlow, PyTorch, Pandas, LLMs/GenAI |
| 🧪 Testing | 13 | Jest, Cypress, Playwright, Selenium |
| ✨ Design & UX | 10 | Figma, Adobe XD, UI/UX Design |
| 📋 Project Management | 8 | Agile/Scrum, Jira, Notion |
| 🗣️ Soft Skills | 9 | Communication, Problem Solving, Leadership |
| 🔒 Security | 5 | Cybersecurity, OWASP, Penetration Testing |
| 🏗️ Architecture | 6 | System Design, Design Patterns, DDD |

### Resource Coverage

Dedicated resource entries (with real URLs) for: JavaScript, TypeScript, React, Node.js, Python, SQL, Docker, AWS, Git, MongoDB, PostgreSQL, Kubernetes, CI/CD, GraphQL, REST API, React Native, Redis.

All other skills use intelligent fallback resources with search-based URLs.

---

## 🎨 Customization

### Adding New Skills

Edit `skills-database.js` and add entries to the relevant category:

```javascript
{ name: "Your Skill", aliases: ["alias1", "alias2", "your skill"] }
```

### Adding Resources

Add a new key to `RESOURCES_DATABASE`:

```javascript
"Your Skill": {
  free: [
    { 
      type: "YouTube", 
      badge: "badge-youtube", 
      name: "Course Name", 
      desc: "Description", 
      url: "https://youtube.com/..." 
    }
  ],
  paid: [
    { 
      type: "Udemy", 
      badge: "badge-udemy", 
      name: "Course Name", 
      desc: "Description", 
      price: "₹455 – ₹3,299", 
      url: "https://udemy.com/..." 
    }
  ]
}
```

### Changing the Theme

All design tokens are CSS custom properties in `style.css`:

```css
:root {
  --accent-primary: #6366f1;      /* Indigo — main brand color */
  --accent-secondary: #8b5cf6;    /* Purple — secondary accent */
  --bg-primary: #0a0a1a;          /* Dark navy background */
  --text-primary: #f0f0f5;        /* Light text */
  /* ... 40+ more variables */
}
```

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Ideas for Contributions

- [ ] Export plan as PDF
- [ ] Share results via link (URL encoding)
- [ ] LLM integration for smarter JD parsing
- [ ] Dark/Light theme toggle
- [ ] Localization (multi-language support)
- [ ] Salary estimation based on skill match
- [ ] Integration with job boards (LinkedIn, Indeed)
- [ ] Progress tracking over time

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <strong>Built with ❤️ by Shashwat</strong>
  <br/>
  <em>SkillScope Career Planner © 2026</em>
</p>