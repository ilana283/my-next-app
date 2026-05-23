import { site, type ExperienceItem, type ProjectItem } from "@/app/site";

function formatExperience(job: ExperienceItem): string {
  const lines = [
    `${job.title} at ${job.company}${job.location ? ` (${job.location})` : ""}`,
    `${job.start} — ${job.end}`,
  ];
  if (job.bullets?.length) {
    lines.push(...job.bullets.map((b) => `- ${b}`));
  }
  if (job.roles?.length) {
    for (const role of job.roles) {
      lines.push(`${role.title} (${role.start} — ${role.end})`);
      lines.push(...role.bullets.map((b) => `- ${b}`));
    }
  }
  return lines.join("\n");
}

function formatProject(p: ProjectItem): string {
  const lines = [`${p.name}: ${p.description}`];
  if (p.tech?.length) lines.push(`Tech: ${p.tech.join(", ")}`);
  if (p.githubHref) lines.push(`GitHub: ${p.githubHref}`);
  return lines.join("\n");
}

/** Site content for the chat system prompt — keep in sync with app/site.ts */
export function buildSiteSystemPrompt(): string {
  const sections: string[] = [
    `You are a helpful assistant on ${site.name}'s personal portfolio website.`,
    "Answer ONLY using the site content below (about, skills, experience, education, training, projects, contact links).",
    "Reply in 1–3 short sentences. Plain text only — no markdown, no asterisks, no bullet lists.",
    "If the user writes in Hebrew, reply in Hebrew.",
    "",
    "If the question is unrelated to this portfolio content, or the answer is not in the context, reply EXACTLY with:",
    `"${site.chat.offTopicReply}"`,
    "Do not guess or invent facts, employers, projects, or skills not listed below.",
    "",
    "## Profile",
    `Name: ${site.name}`,
    `Role: ${site.role}`,
    `Tagline: ${site.tagline}`,
    `About: ${site.aboutMe}`,
    "",
    "## Skills",
  ];

  for (const cat of site.skills) {
    sections.push(`${cat.name}: ${cat.skills.join(", ")}`);
  }

  sections.push("", "## Experience");
  for (const job of site.experience) {
    sections.push(formatExperience(job), "");
  }

  sections.push("## Education");
  for (const edu of site.education) {
    sections.push(
      `${edu.degree} — ${edu.school}${edu.location ? `, ${edu.location}` : ""} (${edu.start} — ${edu.end})`,
    );
  }

  sections.push("", "## Training");
  for (const t of site.training) {
    sections.push(
      `${t.title}${t.provider ? ` · ${t.provider}` : ""}${t.period ? ` (${t.period})` : ""}: ${t.description}`,
    );
  }

  sections.push("", "## Projects");
  for (const p of site.projects) {
    sections.push(formatProject(p), "");
  }

  sections.push(
    "## Contact",
    `Email: ${site.emailAddress}`,
    `LinkedIn: ${site.links.linkedin}`,
    `GitHub: ${site.links.github}`,
  );

  return sections.join("\n");
}
