export type SiteLink = {
  label: string;
  href: string;
};

export type ExperienceRole = {
  title: string;
  start: string;
  end: string;
  bullets: string[];
};

export type ExperienceItem = {
  title: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  bullets?: string[];
  /** Multiple roles at the same company (e.g. Intel) */
  roles?: ExperienceRole[];
};

export type EducationItem = {
  degree: string;
  school: string;
  location?: string;
  start: string;
  end: string;
  highlights?: string[];
  /** Long degree titles: years on title row, school on the line below */
  subtitleBelowTitle?: boolean;
};

export type TrainingItem = {
  title: string;
  provider?: string;
  period?: string;
  description: string;
};

export type SkillCategory = {
  name: string;
  skills: string[];
};

export type ProjectItem = {
  name: string;
  description: string;
  /** Omit when no public repo link yet */
  githubHref?: string;
  tech?: string[];
};

export const CHAT_MAX_QUESTIONS = 3;
/** Enforces the 3-question limit per page visit */
export const CHAT_LIMIT_ENABLED = true;

export const site = {
  siteTitle: "Ilana Priev · AIDD",
  name: "Ilana Priev",
  footerCredit: "Ilana Priev",
  logo: {
    src: "/logo.png",
    alt: "Ilana Priev — personal portfolio",
    width: 634,
    height: 440,
  },
  profileImage: {
    src: "/profile.jpg",
    alt: "Ilana Priev — profile photo",
  },
  role: "Hardware & Embedded Systems Engineer",
  tagline:
    "Electrical and Electronics engineer with hands-on experience in hardware systems, embedded development, PCB design and multidisciplinary system integration.",
  links: {
    email: "mailto:ilana.p283@gmail.com",
    linkedin: "https://www.linkedin.com/in/ilana-priev-amzaleg/",
    github: "https://github.com/ilana283",
  },
  emailAddress: "ilana.p283@gmail.com",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
  ] satisfies SiteLink[],
  aboutMe:
    "Electrical and Electronics Engineer with hands-on experience in hardware systems, embedded development and multidisciplinary system integration. Experienced in PCB design, system validation and hardware/software debugging across complex engineering environments. Strong background in manufacturing and production systems, with proven ability in root cause analysis, troubleshooting and cross-functional collaboration.",
  skills: [
    {
      name: "Programming Languages",
      skills: ["Python", "C", "MATLAB", "Verilog", "VHDL"],
    },
    {
      name: "Embedded & Hardware Development",
      skills: ["Embedded Systems", "FPGA", "ASIC", "RTL Design", "VLSI", "Arduino"],
    },
    {
      name: "Board Design & Electronics",
      skills: ["Altium Designer", "PCB Design", "OrCAD", "Electrical Schematics Analysis"],
    },
  ] satisfies SkillCategory[],
  experience: [
    {
      title: "System Integration Engineer",
      company: "Applied Materials",
      location: "Rehovot",
      start: "2024",
      end: "Present",
      bullets: [
        "Working on complex multidisciplinary systems with end-to-end responsibility for system calibration, testing and validation.",
        "Troubleshooting system issues, performing root cause analysis and proposing engineering solutions.",
        "Analyzing electrical schematics and technical documentation to support system verification and problem solving.",
      ],
    },
    {
      title: "Safety Compliance Engineer",
      company: "ITL",
      location: "Modiin",
      start: "2023",
      end: "2024",
      bullets: [
        "Oversaw compliance of medical products with international safety standards (EMC, RF, photobiological, laser and ultrasound) and compiled reports for regulatory approval.",
        "Independently led engineering projects, including analyzing electrical schematics, test planning and conducting laboratory testing.",
        "Delivered technical assistance, training and technical documentation to clients based on project requirements.",
      ],
    },
    {
      title: "Team Leader and Manufacturing Specialist",
      company: "Intel",
      location: "Kiryat Gat",
      start: "2019",
      end: "2023",
      roles: [
        {
          title: "Team Leader — SORT Production Line",
          start: "2021",
          end: "2023",
          bullets: [
            "Supervised SORT production line, leading a team of 13 technicians to consistently achieve production goals — product utilization above 85%.",
            "Implemented training programs to improve team performance and technical proficiency.",
            "Demonstrated strong communication and collaboration in a high-performance production environment.",
          ],
        },
        {
          title: "Manufacturing Specialist",
          start: "2019",
          end: "2021",
          bullets: [
            "Selected by the company to pursue a B.Sc. degree, reflecting recognition and investment in professional growth.",
            "Identified repetitive tasks within the process and automated them for efficiency and quality.",
            "Led continuous improvement initiatives and problem-solving efforts, resulting in cost reductions.",
          ],
        },
      ],
    },
  ] satisfies ExperienceItem[],
  education: [
    {
      degree: "B.Sc. Electrical and Electronics Engineering",
      school: "HIT, Holon",
      start: "2020",
      end: "2024",
    },
    {
      degree: "Electronics and Computers Practical Engineering",
      school: "Technological College of the Air Force",
      location: "Beer Sheva",
      start: "2015",
      end: "2017",
      subtitleBelowTitle: true,
    },
  ] satisfies EducationItem[],
  training: [
    {
      title: "Independent Practical Board Design Training",
      period: "Ongoing",
      description:
        "Hands-on self-directed training in PCB design workflows, schematic analysis, layout, signal routing and hardware design best practices.",
    },
    {
      title: "AI-Driven Development",
      provider: "HIT, Holon",
      description:
        "Professional workshop on AI-Driven Development — systematic use of Cursor AI, Git and static analysis to deliver a production Next.js portfolio with full code ownership and documented review loops.",
    },
  ] satisfies TrainingItem[],
  projects: [
    {
      name: "PCB Design Project",
      description:
        "Developed an IR proximity detector using Altium Designer — schematic design, PCB layout and manufacturing and assembly files.",
      tech: ["Altium Designer", "PCB"],
    },
    {
      name: "Environment Monitoring System",
      description:
        "Real-time insect detection on Raspberry Pi with YOLOv7 for houseplants — video capture, identification and CSV logging to reduce pesticide use.",
      githubHref:
        "https://github.com/ilana283/System-for-monitoring-and-identifying-insects-in-plants",
      tech: ["Python", "YOLOv7", "Raspberry Pi"],
    },
    {
      name: "Computer Vision Project",
      description:
        "Deep learning model to detect and track human movement in video using image processing techniques.",
      tech: ["Python", "Deep Learning"],
    },
    {
      name: "Personal portfolio",
      description:
        "This site — a fast Next.js portfolio with content in site.ts, deployed on Vercel for the AI-Driven Development course.",
      githubHref: "https://github.com/ilana283/AI-Driven-Development",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    },
  ] satisfies ProjectItem[],
  chat: {
    placeholder: "Ask about Ilana...",
    maxQuestions: CHAT_MAX_QUESTIONS,
    welcome:
      "Ask me about Ilana’s experience, skills, education, projects, or training — based on this portfolio only.",
    limitReached:
      "You’ve used all 3 questions for this visit. For anything else, please email Ilana directly.",
    offTopicReply: `I can only answer questions about Ilana’s portfolio content on this site. For other topics, please email Ilana at ilana.p283@gmail.com.`,
    avatarAlt: "Ilana Priev — portfolio assistant",
  },
};
