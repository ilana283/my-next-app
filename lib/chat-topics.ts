import { site, type ExperienceItem } from "@/app/site";

export type SiteSectionTarget = {
  pathname: "/" | "/about" | "/projects";
  sectionId: string;
};

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

function hasAny(text: string, terms: string[]): boolean {
  const q = normalize(text);
  return terms.some((t) => q.includes(t.toLowerCase()));
}

export function isHebrew(text: string): boolean {
  return /[\u0590-\u05FF]/.test(text);
}

function matchesEducation(q: string): boolean {
  return hasAny(q, [
    "education",
    "degree",
    "university",
    "college",
    "studied",
    "school",
    "hit",
    "holon",
    "השכלה",
    "לימודים",
    "תואר",
    "סטודנט",
    "אוניברסיטה",
    "מכללה",
  ]);
}

function matchesExperience(q: string): boolean {
  if (hasAny(q, ["איפה היא עובדת", "איפה עובדת", "where does she work", "where she work"])) {
    return true;
  }
  if (/איפה.*(עובד|עבודה)/.test(q) || /where.*(work|works|employed)/i.test(q)) {
    return true;
  }
  return hasAny(q, [
    "experience",
    "work",
    "job",
    "career",
    "employer",
    "company",
    "intel",
    "applied materials",
    "applied",
    "itl",
    "ניסיון",
    "עבודה",
    "קריירה",
    "עבדה",
    "עובדת",
    "עובד",
    "מעסיק",
    "חברה",
    "מקום עבודה",
    "currently",
    "present",
  ]);
}

function matchesSkills(q: string): boolean {
  return hasAny(q, ["skill", "skills", "python", "verilog", "fpga", "altium", "כישור", "ידע"]);
}

function matchesProjects(q: string): boolean {
  return hasAny(q, ["project", "portfolio site", "github", "פרויקט", "פרויקטים"]);
}

function matchesTraining(q: string): boolean {
  return hasAny(q, ["training", "course", "workshop", "aidd", "הכשרה", "קורס"]);
}

function matchesName(q: string): boolean {
  if (hasAny(q, ["איך קוראים לה", "מה השם שלה", "מה שמה", "שמה שלה"])) return true;
  if (/איך קוראים (לה|לו)/.test(q) || /מה (ה)?שם/.test(q)) return true;
  return hasAny(q, [
    "her name",
    "what's her name",
    "what is her name",
    "what is she called",
    "called",
    "שמה",
  ]);
}

function matchesAbout(q: string): boolean {
  return hasAny(q, ["who", "about", "introduce", "מי", "עליה", "עליו", "ספר", "tell me about"]);
}

function matchesContact(q: string): boolean {
  return hasAny(q, [
    "contact",
    "email",
    "mail",
    "linkedin",
    "reach",
    "phone",
    "מייל",
    "יצירת קשר",
    "ליצור קשר",
    "לדבר",
  ]);
}

function matchesRole(q: string): boolean {
  return hasAny(q, ["role", "title", "engineer", "מה היא עושה", "במה עוסקת", "profession"]);
}

function isWhereWorkQuestion(q: string): boolean {
  return (
    hasAny(q, ["איפה", "where", "מקום", "מיקום", "location"]) &&
    (hasAny(q, ["עובד", "עובדת", "עבודה", "work", "works", "employed", "company", "חברה"]) ||
      matchesExperience(q))
  );
}

function formatJobShort(job: ExperienceItem): string {
  const place = job.location ? `, ${job.location}` : "";
  return `${job.title} at ${job.company}${place} (${job.end})`;
}

/** Maps a question to a page section to scroll into view */
export function detectChatTopic(question: string): SiteSectionTarget | null {
  const q = question.trim();
  if (!q) return null;

  if (matchesEducation(q)) return { pathname: "/about", sectionId: "education-heading" };
  if (matchesExperience(q)) return { pathname: "/about", sectionId: "experience-heading" };
  if (matchesSkills(q)) return { pathname: "/about", sectionId: "skills-heading" };
  if (matchesProjects(q)) return { pathname: "/projects", sectionId: "projects-title" };
  if (matchesTraining(q)) return { pathname: "/about", sectionId: "training-heading" };
  if (matchesName(q)) return { pathname: "/", sectionId: "hero-heading" };
  if (matchesAbout(q)) return { pathname: "/about", sectionId: "about-me-title" };
  if (matchesContact(q)) return { pathname: "/", sectionId: "hero-heading" };
  if (matchesRole(q)) return { pathname: "/", sectionId: "hero-heading" };

  return null;
}

export function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*/g, "")
    .replace(/^[-•]\s*/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Short plain-text answers from site.ts */
export function answerFromSiteContent(question: string): string {
  const q = question.trim();
  const he = isHebrew(q);

  if (!q) {
    return site.chat.welcome;
  }

  if (matchesName(q)) {
    if (he) {
      return `קוראים לה ${site.name}.`;
    }
    return `Her name is ${site.name}.`;
  }

  if (matchesEducation(q)) {
    const items = site.education.map((edu) => {
      const place = [edu.school, edu.location].filter(Boolean).join(", ");
      return `${edu.degree}, ${place} (${edu.start}–${edu.end})`;
    });
    if (he) {
      return `השכלה: ${items.join("; ")}.`;
    }
    return `Education: ${items.join("; ")}.`;
  }

  if (matchesExperience(q)) {
    const current = site.experience[0];
    if (isWhereWorkQuestion(q)) {
      const place = current.location ? `, ${current.location}` : "";
      if (he) {
        return `היא עובדת כ-${current.title} ב-${current.company}${place} (${current.end}).`;
      }
      return `She works as ${current.title} at ${current.company}${place} (${current.end}).`;
    }
    if (he) {
      return `תפקיד נוכחי: ${formatJobShort(current)}.`;
    }
    return `Current role: ${formatJobShort(current)}.`;
  }

  if (matchesSkills(q)) {
    const top = site.skills.map((c) => c.skills.slice(0, 3).join(", ")).join("; ");
    if (he) {
      return `כישורים טכניים עיקריים: ${top}.`;
    }
    return `Key skills: ${top}.`;
  }

  if (matchesProjects(q)) {
    const names = site.projects.map((p) => p.name).join(", ");
    if (he) {
      return `פרויקטים באתר: ${names}.`;
    }
    return `Projects: ${names}.`;
  }

  if (matchesTraining(q)) {
    const t = site.training[0];
    if (he) {
      return `הכשרה: ${t.title}${t.provider ? ` (${t.provider})` : ""}.`;
    }
    return `Training: ${t.title}${t.provider ? ` at ${t.provider}` : ""}.`;
  }

  if (matchesAbout(q)) {
    if (he) {
      return `${site.name} — ${site.role}. מהנדסת חשמל ואלקטרוניקה עם ניסיון בחומרה, מערכות משובצות ו-PCB.`;
    }
    return `${site.name} is a ${site.role}. ${site.tagline}`;
  }

  if (matchesContact(q)) {
    if (he) {
      return `יצירת קשר: ${site.emailAddress}, LinkedIn ו-GitHub בעמוד הבית.`;
    }
    return `Contact: ${site.emailAddress}, LinkedIn and GitHub on the home page.`;
  }

  if (matchesRole(q)) {
    if (he) {
      return `${site.name} — ${site.role}.`;
    }
    return `${site.name} is a ${site.role}.`;
  }

  return site.chat.offTopicReply;
}
