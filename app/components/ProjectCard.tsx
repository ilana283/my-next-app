import type { ProjectItem } from "../site";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function PreviewIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
      />
    </svg>
  );
}

function ProjectLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: "github" | "preview";
}) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      className="hover:text-brand-copper dark:hover:text-brand-rose inline-flex items-center gap-2 text-sm font-medium text-zinc-800 transition dark:text-zinc-200"
      {...(external ? { rel: "noreferrer", target: "_blank" } : {})}
    >
      {icon === "github" ? (
        <GitHubIcon className="h-4 w-4 shrink-0" />
      ) : (
        <PreviewIcon className="h-4 w-4 shrink-0" />
      )}
      {label}
    </a>
  );
}

type ProjectCardProps = {
  project: ProjectItem;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const showGithub = Boolean(project.githubHref);
  const showPreview = Boolean(project.previewHref && project.previewLabel);
  const showLinks = showGithub || showPreview;

  return (
    <article className="group hover:border-brand-rose/50 hover:bg-brand-blush/30 dark:hover:border-brand-rose/40 dark:hover:bg-brand-copper/10 flex h-full flex-col rounded-xl border border-zinc-200/90 bg-white/90 p-5 shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:shadow-lg dark:border-zinc-700/90 dark:bg-zinc-900/60 dark:hover:shadow-[0_8px_32px_rgba(196,154,132,0.15)]">
      <h3 className="group-hover:text-brand-copper dark:group-hover:text-brand-rose text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        {project.name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        {project.description}
      </p>
      {project.tech?.length ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tag) => (
            <li key={tag}>
              <span className="inline-block rounded-full border border-zinc-200/80 bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-300">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-auto pt-5">
        {showLinks ? (
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {showPreview ? (
              <ProjectLink
                href={project.previewHref!}
                label={project.previewLabel!}
                icon="preview"
              />
            ) : null}
            {showGithub ? (
              <ProjectLink href={project.githubHref!} label="GitHub" icon="github" />
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
