import { site, type EducationItem, type ExperienceItem } from "../site";
import { Reveal } from "../components/Reveal";
import { SiteShell } from "../components/SiteShell";
import { SkillsSection } from "../components/SkillsSection";
import { Timeline, TrainingPanel, type TimelineEntry } from "../components/Timeline";
import { Panel, SectionTitle, brandBorderL } from "../components/ui";

function experienceToTimeline(): TimelineEntry[] {
  return site.experience.map((job: ExperienceItem) => ({
    id: `${job.company}-${job.title}-${job.start}`,
    title: job.title,
    subtitle: `${job.company}${job.location ? `, ${job.location}` : ""}`,
    period: `${job.start} — ${job.end}`,
    bullets: job.bullets,
    roles: job.roles?.map((role) => ({
      title: role.title,
      period: `${role.start} — ${role.end}`,
      bullets: role.bullets,
    })),
  }));
}

function educationToTimeline(): TimelineEntry[] {
  return site.education.map((edu: EducationItem) => ({
    id: `${edu.school || "degree"}-${edu.degree}`,
    title: edu.degree,
    subtitle: [edu.school, edu.location].filter(Boolean).join(", "),
    period: `${edu.start} — ${edu.end}`,
    subtitleLayout: edu.subtitleBelowTitle ? "stacked" : "inline",
    body: edu.highlights?.join(" "),
  }));
}

export default function AboutPage() {
  return (
    <SiteShell>
      <section aria-labelledby="about-me-title" className="mb-10 sm:mb-12">
        <Reveal>
          <Panel className={brandBorderL}>
            <h1
              id="about-me-title"
              className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
            >
              About me
            </h1>
            <p className="mt-4 leading-relaxed text-zinc-700 dark:text-zinc-300">{site.aboutMe}</p>
          </Panel>
        </Reveal>
      </section>

      <section aria-labelledby="skills-heading" className="mb-10 sm:mb-12">
        <Reveal>
          <SkillsSection />
        </Reveal>
      </section>

      <section className="mb-10 sm:mb-12" aria-labelledby="experience-heading">
        <SectionTitle id="experience-heading" className="mb-6">
          Experience
        </SectionTitle>
        <Reveal>
          <Timeline entries={experienceToTimeline()} />
        </Reveal>
      </section>

      <section className="mb-10 sm:mb-12" aria-labelledby="education-heading">
        <SectionTitle id="education-heading" className="mb-6">
          Education
        </SectionTitle>
        <Reveal>
          <Timeline entries={educationToTimeline()} />
        </Reveal>
      </section>

      <section aria-labelledby="training-heading">
        <SectionTitle id="training-heading" className="mb-6">
          Training
        </SectionTitle>
        <Reveal>
          <TrainingPanel items={site.training} />
        </Reveal>
      </section>
    </SiteShell>
  );
}
