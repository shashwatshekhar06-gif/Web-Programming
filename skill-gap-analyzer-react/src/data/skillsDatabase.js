/**
 * SkillScope — Comprehensive Skills Database
 * Each skill has: name, aliases (for matching from JD), category, subcategory
 */

export const SKILLS_DATABASE = {
  // ========== PROGRAMMING LANGUAGES ==========
  "Programming Languages": {
    icon: "💻",
    skills: [
      { name: "JavaScript", aliases: ["js", "javascript", "es6", "es2015", "ecmascript", "vanilla js"] },
      { name: "TypeScript", aliases: ["ts", "typescript"] },
      { name: "Python", aliases: ["python", "python3", "py"] },
      { name: "Java", aliases: ["java", "jdk", "jre"] },
      { name: "C++", aliases: ["c++", "cpp", "c plus plus"] },
      { name: "C#", aliases: ["c#", "csharp", "c sharp", ".net c#"] },
      { name: "Go", aliases: ["go", "golang"] },
      { name: "Rust", aliases: ["rust", "rustlang"] },
      { name: "Ruby", aliases: ["ruby"] },
      { name: "PHP", aliases: ["php"] },
      { name: "Swift", aliases: ["swift"] },
      { name: "Kotlin", aliases: ["kotlin"] },
      { name: "Scala", aliases: ["scala"] },
      { name: "R", aliases: [" r ", "r programming", "rlang"] },
      { name: "Dart", aliases: ["dart"] },
      { name: "Elixir", aliases: ["elixir"] },
      { name: "SQL", aliases: ["sql", "structured query language"] },
      { name: "Shell/Bash", aliases: ["bash", "shell", "sh", "zsh", "shell scripting"] },
      { name: "Lua", aliases: ["lua"] },
      { name: "Perl", aliases: ["perl"] },
    ]
  },

  // ========== FRONTEND ==========
  "Frontend Development": {
    icon: "🎨",
    skills: [
      { name: "HTML5", aliases: ["html", "html5", "html/css"] },
      { name: "CSS3", aliases: ["css", "css3", "styling"] },
      { name: "React", aliases: ["react", "reactjs", "react.js"] },
      { name: "Next.js", aliases: ["next", "nextjs", "next.js"] },
      { name: "Angular", aliases: ["angular", "angularjs", "angular.js"] },
      { name: "Vue.js", aliases: ["vue", "vuejs", "vue.js"] },
      { name: "Nuxt.js", aliases: ["nuxt", "nuxtjs", "nuxt.js"] },
      { name: "Svelte", aliases: ["svelte", "sveltekit"] },
      { name: "jQuery", aliases: ["jquery"] },
      { name: "Redux", aliases: ["redux", "redux toolkit", "rtk"] },
      { name: "Zustand", aliases: ["zustand"] },
      { name: "Tailwind CSS", aliases: ["tailwind", "tailwindcss", "tailwind css"] },
      { name: "Bootstrap", aliases: ["bootstrap"] },
      { name: "Material UI", aliases: ["material ui", "mui", "material-ui"] },
      { name: "Sass/SCSS", aliases: ["sass", "scss"] },
      { name: "Styled Components", aliases: ["styled components", "styled-components"] },
      { name: "Webpack", aliases: ["webpack"] },
      { name: "Vite", aliases: ["vite", "vitejs"] },
      { name: "Responsive Design", aliases: ["responsive", "responsive design", "mobile-first", "mobile first"] },
      { name: "Web Accessibility (a11y)", aliases: ["accessibility", "a11y", "wcag", "aria"] },
      { name: "Three.js / WebGL", aliases: ["three.js", "threejs", "webgl", "3d web"] },
      { name: "Astro", aliases: ["astro"] },
      { name: "Remix", aliases: ["remix"] },
    ]
  },

  // ========== BACKEND ==========
  "Backend Development": {
    icon: "⚙️",
    skills: [
      { name: "Node.js", aliases: ["node", "nodejs", "node.js"] },
      { name: "Express.js", aliases: ["express", "expressjs", "express.js"] },
      { name: "Django", aliases: ["django"] },
      { name: "Flask", aliases: ["flask"] },
      { name: "FastAPI", aliases: ["fastapi", "fast api"] },
      { name: "Spring Boot", aliases: ["spring", "spring boot", "springboot"] },
      { name: "Ruby on Rails", aliases: ["rails", "ruby on rails", "ror"] },
      { name: "ASP.NET", aliases: ["asp.net", "aspnet", ".net core", "dotnet"] },
      { name: "Laravel", aliases: ["laravel"] },
      { name: "NestJS", aliases: ["nestjs", "nest.js"] },
      { name: "GraphQL", aliases: ["graphql", "gql"] },
      { name: "REST API", aliases: ["rest", "restful", "rest api", "restful api", "api development"] },
      { name: "gRPC", aliases: ["grpc"] },
      { name: "WebSockets", aliases: ["websocket", "websockets", "socket.io", "real-time"] },
      { name: "Microservices", aliases: ["microservices", "microservice", "micro-services"] },
      { name: "Serverless", aliases: ["serverless", "lambda", "cloud functions"] },
      { name: "Authentication/OAuth", aliases: ["oauth", "jwt", "authentication", "auth", "session management", "passport"] },
    ]
  },

  // ========== DATABASES ==========
  "Databases": {
    icon: "🗄️",
    skills: [
      { name: "PostgreSQL", aliases: ["postgresql", "postgres", "psql"] },
      { name: "MySQL", aliases: ["mysql"] },
      { name: "MongoDB", aliases: ["mongodb", "mongo"] },
      { name: "Redis", aliases: ["redis"] },
      { name: "SQLite", aliases: ["sqlite"] },
      { name: "Oracle DB", aliases: ["oracle", "oracle db", "oracle database"] },
      { name: "Microsoft SQL Server", aliases: ["mssql", "sql server", "microsoft sql"] },
      { name: "Firebase", aliases: ["firebase", "firestore"] },
      { name: "Supabase", aliases: ["supabase"] },
      { name: "DynamoDB", aliases: ["dynamodb", "dynamo"] },
      { name: "Cassandra", aliases: ["cassandra"] },
      { name: "Elasticsearch", aliases: ["elasticsearch", "elastic search", "elk"] },
      { name: "Neo4j", aliases: ["neo4j", "graph database"] },
      { name: "Prisma", aliases: ["prisma"] },
      { name: "Sequelize", aliases: ["sequelize"] },
      { name: "TypeORM", aliases: ["typeorm"] },
      { name: "Mongoose", aliases: ["mongoose"] },
    ]
  },

  // ========== DEVOPS & CLOUD ==========
  "DevOps & Cloud": {
    icon: "☁️",
    skills: [
      { name: "AWS", aliases: ["aws", "amazon web services", "ec2", "s3", "lambda"] },
      { name: "Google Cloud (GCP)", aliases: ["gcp", "google cloud", "google cloud platform"] },
      { name: "Microsoft Azure", aliases: ["azure", "microsoft azure"] },
      { name: "Docker", aliases: ["docker", "containerization", "containers"] },
      { name: "Kubernetes", aliases: ["kubernetes", "k8s"] },
      { name: "CI/CD", aliases: ["ci/cd", "ci cd", "continuous integration", "continuous deployment", "jenkins", "github actions"] },
      { name: "Terraform", aliases: ["terraform", "iac", "infrastructure as code"] },
      { name: "Ansible", aliases: ["ansible"] },
      { name: "Linux", aliases: ["linux", "ubuntu", "centos", "debian"] },
      { name: "Nginx", aliases: ["nginx"] },
      { name: "Apache", aliases: ["apache"] },
      { name: "Git", aliases: ["git", "version control"] },
      { name: "GitHub", aliases: ["github"] },
      { name: "GitLab", aliases: ["gitlab"] },
      { name: "Vercel", aliases: ["vercel"] },
      { name: "Netlify", aliases: ["netlify"] },
      { name: "Heroku", aliases: ["heroku"] },
      { name: "Monitoring (Grafana/Prometheus)", aliases: ["grafana", "prometheus", "monitoring", "observability", "datadog"] },
    ]
  },

  // ========== MOBILE DEVELOPMENT ==========
  "Mobile Development": {
    icon: "📱",
    skills: [
      { name: "React Native", aliases: ["react native"] },
      { name: "Flutter", aliases: ["flutter"] },
      { name: "iOS Development", aliases: ["ios", "swiftui", "uikit"] },
      { name: "Android Development", aliases: ["android", "android studio"] },
      { name: "Expo", aliases: ["expo"] },
      { name: "Ionic", aliases: ["ionic"] },
      { name: "Xamarin", aliases: ["xamarin"] },
    ]
  },

  // ========== DATA & ML ==========
  "Data Science & ML": {
    icon: "🤖",
    skills: [
      { name: "Machine Learning", aliases: ["machine learning", "ml"] },
      { name: "Deep Learning", aliases: ["deep learning", "dl", "neural networks"] },
      { name: "TensorFlow", aliases: ["tensorflow", "tf"] },
      { name: "PyTorch", aliases: ["pytorch"] },
      { name: "Pandas", aliases: ["pandas"] },
      { name: "NumPy", aliases: ["numpy"] },
      { name: "scikit-learn", aliases: ["scikit-learn", "sklearn", "scikit learn"] },
      { name: "Data Analysis", aliases: ["data analysis", "data analytics"] },
      { name: "Data Visualization", aliases: ["data visualization", "tableau", "power bi", "matplotlib", "d3.js"] },
      { name: "NLP", aliases: ["nlp", "natural language processing"] },
      { name: "Computer Vision", aliases: ["computer vision", "cv", "opencv"] },
      { name: "LLMs / GenAI", aliases: ["llm", "llms", "large language model", "generative ai", "genai", "chatgpt", "openai api", "langchain"] },
      { name: "Data Engineering", aliases: ["data engineering", "etl", "data pipeline"] },
      { name: "Apache Spark", aliases: ["spark", "apache spark", "pyspark"] },
      { name: "Hadoop", aliases: ["hadoop"] },
      { name: "Jupyter Notebooks", aliases: ["jupyter", "notebook", "ipynb"] },
    ]
  },

  // ========== TESTING ==========
  "Testing": {
    icon: "🧪",
    skills: [
      { name: "Unit Testing", aliases: ["unit test", "unit testing"] },
      { name: "Jest", aliases: ["jest"] },
      { name: "Mocha/Chai", aliases: ["mocha", "chai"] },
      { name: "Cypress", aliases: ["cypress"] },
      { name: "Playwright", aliases: ["playwright"] },
      { name: "Selenium", aliases: ["selenium"] },
      { name: "Testing Library", aliases: ["testing library", "react testing library", "rtl"] },
      { name: "Pytest", aliases: ["pytest"] },
      { name: "JUnit", aliases: ["junit"] },
      { name: "TDD", aliases: ["tdd", "test driven development", "test-driven"] },
      { name: "Integration Testing", aliases: ["integration test", "integration testing"] },
      { name: "E2E Testing", aliases: ["e2e", "end to end", "end-to-end testing"] },
      { name: "Postman", aliases: ["postman"] },
    ]
  },

  // ========== DESIGN & UX ==========
  "Design & UX": {
    icon: "✨",
    skills: [
      { name: "Figma", aliases: ["figma"] },
      { name: "Adobe XD", aliases: ["adobe xd", "xd"] },
      { name: "Sketch", aliases: ["sketch"] },
      { name: "UI Design", aliases: ["ui design", "user interface"] },
      { name: "UX Design", aliases: ["ux design", "user experience", "ux research"] },
      { name: "Wireframing", aliases: ["wireframe", "wireframing", "prototyping"] },
      { name: "Design Systems", aliases: ["design system", "design systems"] },
      { name: "Adobe Photoshop", aliases: ["photoshop"] },
      { name: "Adobe Illustrator", aliases: ["illustrator"] },
      { name: "Canva", aliases: ["canva"] },
    ]
  },

  // ========== PROJECT & SOFT SKILLS ==========
  "Project Management & Methodologies": {
    icon: "📋",
    skills: [
      { name: "Agile / Scrum", aliases: ["agile", "scrum", "sprint", "kanban"] },
      { name: "Jira", aliases: ["jira"] },
      { name: "Confluence", aliases: ["confluence"] },
      { name: "Trello", aliases: ["trello"] },
      { name: "Asana", aliases: ["asana"] },
      { name: "Notion", aliases: ["notion"] },
      { name: "Slack", aliases: ["slack"] },
      { name: "Project Management", aliases: ["project management", "pm"] },
    ]
  },

  "Soft Skills": {
    icon: "🗣️",
    skills: [
      { name: "Communication", aliases: ["communication", "written communication", "verbal communication"] },
      { name: "Team Collaboration", aliases: ["teamwork", "collaboration", "team player", "cross-functional"] },
      { name: "Problem Solving", aliases: ["problem solving", "problem-solving", "analytical thinking"] },
      { name: "Leadership", aliases: ["leadership", "mentoring", "lead"] },
      { name: "Time Management", aliases: ["time management", "prioritization"] },
      { name: "Critical Thinking", aliases: ["critical thinking"] },
      { name: "Adaptability", aliases: ["adaptability", "fast learner", "quick learner"] },
      { name: "Presentation Skills", aliases: ["presentation", "public speaking"] },
      { name: "Attention to Detail", aliases: ["attention to detail", "detail-oriented", "detail oriented"] },
    ]
  },

  // ========== SECURITY ==========
  "Security": {
    icon: "🔒",
    skills: [
      { name: "Cybersecurity", aliases: ["cybersecurity", "security", "infosec"] },
      { name: "OWASP", aliases: ["owasp"] },
      { name: "Penetration Testing", aliases: ["penetration testing", "pen testing", "pentest"] },
      { name: "Encryption", aliases: ["encryption", "ssl", "tls", "https"] },
      { name: "Security Auditing", aliases: ["security audit", "vulnerability assessment"] },
    ]
  },

  // ========== ARCHITECTURE ==========
  "Architecture & Patterns": {
    icon: "🏗️",
    skills: [
      { name: "System Design", aliases: ["system design", "architecture", "system architecture"] },
      { name: "Design Patterns", aliases: ["design patterns", "solid principles", "solid"] },
      { name: "Clean Architecture", aliases: ["clean architecture", "clean code"] },
      { name: "Event-Driven Architecture", aliases: ["event driven", "event-driven", "message queue", "rabbitmq", "kafka"] },
      { name: "Domain-Driven Design", aliases: ["ddd", "domain driven design", "domain-driven"] },
      { name: "API Design", aliases: ["api design", "openapi", "swagger"] },
    ]
  },
};

// Resource database for common skills
export const RESOURCES_DATABASE = {
  "JavaScript": {
    free: [
      { type: "YouTube", badge: "badge-youtube", name: "Namaste JavaScript by Akshay Saini", desc: "Complete playlist covering closures, hoisting, event loop, promises", url: "https://www.youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP" },
      { type: "freeCodeCamp", badge: "badge-freecodecamp", name: "JavaScript Algorithms and Data Structures", desc: "Interactive certification with 300+ challenges", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" },
      { type: "Docs", badge: "badge-docs", name: "MDN JavaScript Guide", desc: "The definitive reference for all JS concepts", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide" },
      { type: "Platform", badge: "badge-platform", name: "The Odin Project — Full Stack JavaScript", desc: "Project-based curriculum from zero to full stack", url: "https://www.theodinproject.com/paths/full-stack-javascript" },
      { type: "GitHub", badge: "badge-github", name: "You Don't Know JS (Book Series)", desc: "Deep dive into JS mechanics — free on GitHub", url: "https://github.com/getify/You-Dont-Know-JS" },
    ],
    paid: [
      { type: "Udemy", badge: "badge-udemy", name: "The Complete JavaScript Course — Jonas Schmedtmann", desc: "69 hours · Rating 4.7/5 · 200K+ students", price: "₹455 – ₹3,299", url: "https://www.udemy.com/course/the-complete-javascript-course/" },
      { type: "Coursera", badge: "badge-coursera", name: "JavaScript for Beginners — UC Davis", desc: "University-level course with certificate", price: "₹3,320/month", url: "https://www.coursera.org/specializations/javascript-beginner" },
      { type: "Book", badge: "badge-book", name: "Eloquent JavaScript — Marijn Haverbeke", desc: "Best-selling JS book, also free online", price: "₹350 – ₹1,800", url: "https://eloquentjavascript.net/" },
    ]
  },
  "TypeScript": {
    free: [
      { type: "YouTube", badge: "badge-youtube", name: "TypeScript Full Course — Net Ninja", desc: "Beginner to advanced in one playlist", url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9gUgr39Q_yD6v-bSyMwKPUI" },
      { type: "Docs", badge: "badge-docs", name: "TypeScript Official Handbook", desc: "Comprehensive official guide with examples", url: "https://www.typescriptlang.org/docs/handbook/intro.html" },
      { type: "Platform", badge: "badge-platform", name: "TypeScript Exercises — Exercism", desc: "Practice problems with mentor feedback", url: "https://exercism.org/tracks/typescript" },
    ],
    paid: [
      { type: "Udemy", badge: "badge-udemy", name: "Understanding TypeScript — Maximilian Schwarzmüller", desc: "15 hours · Rating 4.7/5", price: "₹455 – ₹3,299", url: "https://www.udemy.com/course/understanding-typescript/" },
      { type: "Book", badge: "badge-book", name: "Programming TypeScript — Boris Cherny", desc: "O'Reilly publication, comprehensive guide", price: "₹2,100 – ₹3,500", url: "https://www.oreilly.com/library/view/programming-typescript/9781492037644/" },
    ]
  },
  "React": {
    free: [
      { type: "YouTube", badge: "badge-youtube", name: "React Full Course — Codevolution", desc: "Hooks, context, routing, patterns – complete playlist", url: "https://www.youtube.com/playlist?list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3" },
      { type: "Docs", badge: "badge-docs", name: "React Official Docs (react.dev)", desc: "New interactive docs with live examples", url: "https://react.dev/learn" },
      { type: "freeCodeCamp", badge: "badge-freecodecamp", name: "Front End Libraries Certification", desc: "Includes React section with 5 projects", url: "https://www.freecodecamp.org/learn/front-end-development-libraries/" },
      { type: "Platform", badge: "badge-platform", name: "Full Stack Open — University of Helsinki", desc: "Free full-stack React + Node.js course", url: "https://fullstackopen.com/en/" },
    ],
    paid: [
      { type: "Udemy", badge: "badge-udemy", name: "React — The Complete Guide — Maximilian Schwarzmüller", desc: "68 hours · Rating 4.7/5 · Bestseller", price: "₹455 – ₹3,299", url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/" },
      { type: "Coursera", badge: "badge-coursera", name: "Meta Front-End Developer Certificate", desc: "Professional certificate with React specialization", price: "₹3,320/month", url: "https://www.coursera.org/professional-certificates/meta-front-end-developer" },
      { type: "Bootcamp", badge: "badge-bootcamp", name: "Scrimba — Learn React for Free", desc: "Interactive coding platform, paid Pro plan", price: "₹1,200/month", url: "https://scrimba.com/learn/learnreact" },
    ]
  },
  "Node.js": {
    free: [
      { type: "YouTube", badge: "badge-youtube", name: "Node.js Crash Course — Traversy Media", desc: "3.5 hours — Express, REST APIs, middleware", url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4" },
      { type: "Docs", badge: "badge-docs", name: "Node.js Official Docs", desc: "API reference and getting started guides", url: "https://nodejs.org/en/docs" },
      { type: "Platform", badge: "badge-platform", name: "The Odin Project — NodeJS Path", desc: "Build real projects with Express and MongoDB", url: "https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs" },
      { type: "freeCodeCamp", badge: "badge-freecodecamp", name: "Backend Development and APIs", desc: "freeCodeCamp certification with projects", url: "https://www.freecodecamp.org/learn/back-end-development-and-apis/" },
    ],
    paid: [
      { type: "Udemy", badge: "badge-udemy", name: "Node.js, Express, MongoDB & More — Jonas Schmedtmann", desc: "42 hours · Rating 4.7/5", price: "₹455 – ₹3,299", url: "https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/" },
      { type: "Book", badge: "badge-book", name: "Node.js Design Patterns — Mario Casciaro", desc: "3rd Edition — architecture & best practices", price: "₹2,500 – ₹4,200", url: "https://www.nodejsdesignpatterns.com/" },
    ]
  },
  "Python": {
    free: [
      { type: "YouTube", badge: "badge-youtube", name: "Python for Everybody — Dr. Chuck (freeCodeCamp)", desc: "14 hours — beginner friendly, university quality", url: "https://www.youtube.com/watch?v=8DvywoWv6fI" },
      { type: "Platform", badge: "badge-platform", name: "CS50's Introduction to Programming with Python", desc: "Harvard's free course on edX", url: "https://cs50.harvard.edu/python/" },
      { type: "Docs", badge: "badge-docs", name: "Python Official Tutorial", desc: "Comprehensive guide from python.org", url: "https://docs.python.org/3/tutorial/" },
      { type: "freeCodeCamp", badge: "badge-freecodecamp", name: "Scientific Computing with Python", desc: "freeCodeCamp certification", url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/" },
    ],
    paid: [
      { type: "Udemy", badge: "badge-udemy", name: "100 Days of Code: Python — Angela Yu", desc: "65 hours · Rating 4.7/5 · Bestseller", price: "₹455 – ₹3,299", url: "https://www.udemy.com/course/100-days-of-code/" },
      { type: "Coursera", badge: "badge-coursera", name: "Google IT Automation with Python", desc: "Professional certificate by Google", price: "₹3,320/month", url: "https://www.coursera.org/professional-certificates/google-it-automation" },
      { type: "Book", badge: "badge-book", name: "Automate the Boring Stuff with Python", desc: "Al Sweigart — also free online", price: "₹400 – ₹1,500", url: "https://automatetheboringstuff.com/" },
    ]
  },
  "SQL": {
    free: [
      { type: "YouTube", badge: "badge-youtube", name: "SQL Tutorial — Programming with Mosh", desc: "3 hours — MySQL focused, practical", url: "https://www.youtube.com/watch?v=7S_tz1z_5bA" },
      { type: "Platform", badge: "badge-platform", name: "SQLBolt — Interactive SQL Lessons", desc: "Learn SQL with hands-on exercises", url: "https://sqlbolt.com/" },
      { type: "Platform", badge: "badge-platform", name: "Khan Academy — Intro to SQL", desc: "Free interactive SQL course", url: "https://www.khanacademy.org/computing/computer-programming/sql" },
    ],
    paid: [
      { type: "Udemy", badge: "badge-udemy", name: "The Complete SQL Bootcamp — Jose Portilla", desc: "9 hours · Rating 4.7/5 · Bestseller", price: "₹455 – ₹3,299", url: "https://www.udemy.com/course/the-complete-sql-bootcamp/" },
      { type: "Book", badge: "badge-book", name: "Learning SQL — Alan Beaulieu", desc: "O'Reilly — comprehensive SQL guide", price: "₹1,800 – ₹3,000", url: "https://www.oreilly.com/library/view/learning-sql-3rd/9781492057604/" },
    ]
  },
  "Docker": {
    free: [
      { type: "YouTube", badge: "badge-youtube", name: "Docker Tutorial — TechWorld with Nana", desc: "3 hours — complete intro to containers", url: "https://www.youtube.com/watch?v=3c-iBn73dDE" },
      { type: "Docs", badge: "badge-docs", name: "Docker Official Get Started", desc: "Hands-on tutorial from Docker", url: "https://docs.docker.com/get-started/" },
      { type: "Platform", badge: "badge-platform", name: "Play with Docker", desc: "Free browser-based Docker sandbox", url: "https://labs.play-with-docker.com/" },
    ],
    paid: [
      { type: "Udemy", badge: "badge-udemy", name: "Docker & Kubernetes: The Practical Guide — Maximilian Schwarzmüller", desc: "24 hours · Rating 4.7/5", price: "₹455 – ₹3,299", url: "https://www.udemy.com/course/docker-kubernetes-the-practical-guide/" },
      { type: "LinkedIn", badge: "badge-linkedin", name: "Docker Essential Training — LinkedIn Learning", desc: "Included with LinkedIn Premium", price: "₹2,100/month", url: "https://www.linkedin.com/learning/docker-essential-training" },
    ]
  },
  "AWS": {
    free: [
      { type: "YouTube", badge: "badge-youtube", name: "AWS Cloud Practitioner — freeCodeCamp", desc: "15 hours — full certification prep", url: "https://www.youtube.com/watch?v=SOTamWNgDKc" },
      { type: "Platform", badge: "badge-platform", name: "AWS Skill Builder — Free Digital Training", desc: "Official free courses from AWS", url: "https://explore.skillbuilder.aws/" },
      { type: "Docs", badge: "badge-docs", name: "AWS Documentation", desc: "Comprehensive service documentation", url: "https://docs.aws.amazon.com/" },
    ],
    paid: [
      { type: "Udemy", badge: "badge-udemy", name: "AWS Solutions Architect Associate — Stephane Maarek", desc: "27 hours · Rating 4.7/5 · #1 Bestseller", price: "₹455 – ₹3,299", url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/" },
      { type: "Coursera", badge: "badge-coursera", name: "AWS Cloud Technical Essentials", desc: "Official AWS course on Coursera", price: "₹3,320/month", url: "https://www.coursera.org/learn/aws-cloud-technical-essentials" },
    ]
  },
  "Git": {
    free: [
      { type: "YouTube", badge: "badge-youtube", name: "Git and GitHub for Beginners — freeCodeCamp", desc: "1 hour crash course", url: "https://www.youtube.com/watch?v=RGOj5yH7evk" },
      { type: "Platform", badge: "badge-platform", name: "Learn Git Branching", desc: "Interactive visual tool to learn Git", url: "https://learngitbranching.js.org/" },
      { type: "Docs", badge: "badge-docs", name: "Pro Git Book (Free Online)", desc: "Complete Git reference by Scott Chacon", url: "https://git-scm.com/book/en/v2" },
    ],
    paid: [
      { type: "Udemy", badge: "badge-udemy", name: "Git Complete: The Definitive Guide", desc: "6 hours · Rating 4.5/5", price: "₹455 – ₹1,299", url: "https://www.udemy.com/course/git-complete/" },
    ]
  },
  "MongoDB": {
    free: [
      { type: "YouTube", badge: "badge-youtube", name: "MongoDB Crash Course — Traversy Media", desc: "37 minutes — CRUD, Compass, Atlas", url: "https://www.youtube.com/watch?v=-56x56UppqQ" },
      { type: "Platform", badge: "badge-platform", name: "MongoDB University — Free Courses", desc: "Official training from MongoDB", url: "https://university.mongodb.com/" },
      { type: "Docs", badge: "badge-docs", name: "MongoDB Manual", desc: "Full official documentation", url: "https://www.mongodb.com/docs/manual/" },
    ],
    paid: [
      { type: "Udemy", badge: "badge-udemy", name: "MongoDB — The Complete Developer's Guide", desc: "17 hours · Rating 4.7/5", price: "₹455 – ₹3,299", url: "https://www.udemy.com/course/mongodb-the-complete-developers-guide/" },
    ]
  },
  "PostgreSQL": {
    free: [
      { type: "YouTube", badge: "badge-youtube", name: "PostgreSQL Full Course — freeCodeCamp", desc: "4 hours — beginner to advanced queries", url: "https://www.youtube.com/watch?v=qw--VYLpxG4" },
      { type: "Docs", badge: "badge-docs", name: "PostgreSQL Official Documentation", desc: "Complete reference for all versions", url: "https://www.postgresql.org/docs/" },
    ],
    paid: [
      { type: "Udemy", badge: "badge-udemy", name: "SQL and PostgreSQL: The Complete Developer's Guide — Stephen Grider", desc: "22 hours · Rating 4.7/5", price: "₹455 – ₹3,299", url: "https://www.udemy.com/course/sql-and-postgresql/" },
    ]
  },
  "Kubernetes": {
    free: [
      { type: "YouTube", badge: "badge-youtube", name: "Kubernetes Course — TechWorld with Nana", desc: "4 hours — from beginner to deployment", url: "https://www.youtube.com/watch?v=X48VuDVv0do" },
      { type: "Docs", badge: "badge-docs", name: "Kubernetes Official Docs", desc: "Tutorials and concept guides", url: "https://kubernetes.io/docs/tutorials/" },
      { type: "Platform", badge: "badge-platform", name: "Play with Kubernetes", desc: "Free browser-based K8s playground", url: "https://labs.play-with-k8s.com/" },
    ],
    paid: [
      { type: "Udemy", badge: "badge-udemy", name: "Kubernetes for the Absolute Beginners — Mumshad Mannambeth", desc: "6 hours · Rating 4.6/5 · KodeKloud", price: "₹455 – ₹3,299", url: "https://www.udemy.com/course/learn-kubernetes/" },
    ]
  },
  "CI/CD": {
    free: [
      { type: "YouTube", badge: "badge-youtube", name: "GitHub Actions Tutorial — TechWorld with Nana", desc: "Complete CI/CD pipeline setup", url: "https://www.youtube.com/watch?v=R8_veQiYBjI" },
      { type: "Docs", badge: "badge-docs", name: "GitHub Actions Documentation", desc: "Official guides and workflow syntax", url: "https://docs.github.com/en/actions" },
    ],
    paid: [
      { type: "Udemy", badge: "badge-udemy", name: "The Complete GitHub Actions & Workflows Guide", desc: "Rating 4.6/5", price: "₹455 – ₹3,299", url: "https://www.udemy.com/course/github-actions/" },
    ]
  },
  "GraphQL": {
    free: [
      { type: "YouTube", badge: "badge-youtube", name: "GraphQL Full Course — Net Ninja", desc: "Complete playlist with Node.js + React", url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9iK6Qhn-QLcXCXPQUov1U7f" },
      { type: "Docs", badge: "badge-docs", name: "GraphQL Official Docs", desc: "Learn GraphQL from the source", url: "https://graphql.org/learn/" },
      { type: "Platform", badge: "badge-platform", name: "How to GraphQL", desc: "Free and open-source tutorial", url: "https://www.howtographql.com/" },
    ],
    paid: [
      { type: "Udemy", badge: "badge-udemy", name: "GraphQL with React — Stephen Grider", desc: "13 hours · Rating 4.5/5", price: "₹455 – ₹3,299", url: "https://www.udemy.com/course/graphql-with-react-course/" },
    ]
  },
  "REST API": {
    free: [
      { type: "YouTube", badge: "badge-youtube", name: "RESTful APIs Explained — Fireship", desc: "Concise, visual explanation in 8 minutes", url: "https://www.youtube.com/watch?v=-MTSQjw5DrM" },
      { type: "YouTube", badge: "badge-youtube", name: "Build a REST API with Node.js — Traversy Media", desc: "Full project-based tutorial", url: "https://www.youtube.com/watch?v=pKd0Rpw7O48" },
      { type: "Docs", badge: "badge-docs", name: "RESTful API Design — Best Practices", desc: "Microsoft REST API guidelines", url: "https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design" },
    ],
    paid: [
      { type: "Udemy", badge: "badge-udemy", name: "REST APIs with Flask and Python — Jose Salvatierra", desc: "17 hours · Rating 4.6/5", price: "₹455 – ₹3,299", url: "https://www.udemy.com/course/rest-api-flask-and-python/" },
    ]
  },
  "React Native": {
    free: [
      { type: "YouTube", badge: "badge-youtube", name: "React Native Tutorial — Net Ninja", desc: "Full playlist for mobile app development", url: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9ixPU-QkScoRBVxtPPzVjrQ" },
      { type: "Docs", badge: "badge-docs", name: "React Native Official Docs", desc: "Getting started guide and API reference", url: "https://reactnative.dev/docs/getting-started" },
    ],
    paid: [
      { type: "Udemy", badge: "badge-udemy", name: "React Native — The Practical Guide — Maximilian Schwarzmüller", desc: "29 hours · Rating 4.7/5", price: "₹455 – ₹3,299", url: "https://www.udemy.com/course/react-native-the-practical-guide/" },
    ]
  },
  "Redis": {
    free: [
      { type: "YouTube", badge: "badge-youtube", name: "Redis Crash Course — Traversy Media", desc: "40 minutes — caching, pub/sub, data types", url: "https://www.youtube.com/watch?v=jgpVdJB2sKQ" },
      { type: "Docs", badge: "badge-docs", name: "Redis Official Documentation", desc: "Commands reference and tutorials", url: "https://redis.io/docs/" },
      { type: "Platform", badge: "badge-platform", name: "Redis University — Free Courses", desc: "Official learning platform from Redis", url: "https://university.redis.com/" },
    ],
    paid: [
      { type: "Udemy", badge: "badge-udemy", name: "Redis: The Complete Developer's Guide — Stephen Grider", desc: "12 hours · Rating 4.7/5", price: "₹455 – ₹3,299", url: "https://www.udemy.com/course/redis-the-complete-developers-guide-p/" },
    ]
  },

  // ========== DEFAULT for skills without specific resources ==========
  "_default": {
    free: [
      { type: "YouTube", badge: "badge-youtube", name: "Search '[SKILL] tutorial' on YouTube", desc: "Look for courses with high view counts and recent uploads", url: "https://www.youtube.com/results?search_query=[SKILL]+tutorial" },
      { type: "Docs", badge: "badge-docs", name: "[SKILL] Official Documentation", desc: "Always start with the official docs", url: "https://www.google.com/search?q=[SKILL]+official+documentation" },
      { type: "GitHub", badge: "badge-github", name: "Awesome [SKILL] — Curated GitHub List", desc: "Community-curated resources, tutorials, and projects", url: "https://github.com/search?q=awesome+[SKILL]&type=repositories" },
      { type: "Platform", badge: "badge-platform", name: "freeCodeCamp / The Odin Project", desc: "Check for relevant free courses", url: "https://www.freecodecamp.org/" },
    ],
    paid: [
      { type: "Udemy", badge: "badge-udemy", name: "Search [SKILL] on Udemy (Wait for Sales!)", desc: "Most courses drop to ₹455 during frequent sales", price: "₹455 – ₹3,299", url: "https://www.udemy.com/courses/search/?q=[SKILL]" },
      { type: "Coursera", badge: "badge-coursera", name: "Audit [SKILL] Courses for Free on Coursera", desc: "Pay only for the certificate", price: "₹3,320/month", url: "https://www.coursera.org/search?query=[SKILL]" },
      { type: "LinkedIn", badge: "badge-linkedin", name: "LinkedIn Learning — [SKILL]", desc: "Included with LinkedIn Premium", price: "₹2,100/month", url: "https://www.linkedin.com/learning/search?keywords=[SKILL]" },
    ]
  }
};

// Motivational message templates
export const MOTIVATIONS = [
  "You're closer than you think, {name}. Most people overestimate what they lack and underestimate what they already know. You've got {matched} skills locked in — that's not nothing, that's a foundation. The gap between where you are and where you want to be is just {missing} skills away. At {hours} hours a week, you'll be ready by **{date}**. The version of you that gets that job already exists — you just haven't built the last few pieces yet. Start today.",
  "{name}, here's the truth: with {matched} skills already in your toolkit, you're not starting from zero — you're starting from a position of strength. The {missing} skills you need to learn? They're learnable, and with {hours} hours a week of focused effort, you'll be confidently applying by **{date}**. Every expert was once a beginner. The only difference between you and someone already in that role is a few months of consistent work. You've got this.",
  "Let's be real, {name} — {score}% readiness is impressive. You've already built a strong foundation with the skills you have. Now it's about being strategic: focus on the high-priority gaps first, build real projects, and by **{date}**, you'll walk into that interview room knowing you belong there. Consistency beats intensity. {hours} hours a week is all it takes. Future you will thank present you for starting today.",
];
