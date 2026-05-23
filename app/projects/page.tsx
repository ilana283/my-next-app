import { site } from "../site";
import { ProjectCard } from "../components/ProjectCard";
import { Reveal } from "../components/Reveal";
import { SiteShell } from "../components/SiteShell";
import { PageTitle } from "../components/ui";

export default function ProjectsPage() {
  return (
    <SiteShell mainClassName="max-w-6xl">
      <section aria-labelledby="projects-title" className="mb-10 sm:mb-14">
        <Reveal>
          <PageTitle id="projects-title" centered>
            Projects
          </PageTitle>
        </Reveal>
      </section>

      <section aria-label="Project grid">
        <ul className="grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.projects.map((project) => (
            <li key={project.name} className="h-full">
              <Reveal className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </SiteShell>
  );
}
