import { site } from "./site";
import { ProfileAvatar } from "./components/ProfileAvatar";
import { Reveal } from "./components/Reveal";
import { SiteShell } from "./components/SiteShell";
import { Panel, brandBorderL } from "./components/ui";

const homeLinks = [
  { label: "LinkedIn", href: site.links.linkedin, external: true },
  { label: "Email me", href: site.links.email },
  { label: "GitHub", href: site.links.github, external: true },
] as const;

export default function Home() {
  return (
    <SiteShell>
      <section className="mb-10 sm:mb-12" aria-labelledby="hero-heading">
        <Reveal>
          <Panel className={brandBorderL}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {site.role}
                </p>
                <h1
                  id="hero-heading"
                  className="font-sans text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50"
                >
                  {site.name}
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {site.tagline}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {homeLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="hover:border-brand-rose/60 hover:bg-brand-blush/50 hover:text-brand-copper dark:hover:border-brand-rose/40 dark:hover:bg-brand-copper/10 dark:hover:text-brand-blush inline-block rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 transition dark:border-zinc-600 dark:bg-zinc-950/50 dark:text-zinc-200"
                      {...("external" in item && item.external
                        ? { rel: "noreferrer", target: "_blank" }
                        : {})}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
              <ProfileAvatar src={site.profileImage.src} alt={site.profileImage.alt} />
            </div>
          </Panel>
        </Reveal>
      </section>
    </SiteShell>
  );
}
