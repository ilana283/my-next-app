import type { ReactNode } from "react";
import Link from "next/link";
import { LogoWordmark } from "./LogoWordmark";
import { site } from "../site";

type SiteShellProps = {
  children: ReactNode;
  /** Override main width — e.g. `max-w-6xl` on Projects */
  mainClassName?: string;
};

export function SiteShell({ children, mainClassName = "max-w-3xl" }: SiteShellProps) {
  return (
    <div className="relative min-h-full flex-1 bg-white dark:bg-zinc-950">
      <div className="page-glow" aria-hidden />
      <header className="sticky top-0 z-20 border-b border-zinc-200/90 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link
            href="/"
            className="flex items-center gap-3 text-zinc-900 dark:text-zinc-100"
            title={site.siteTitle}
          >
            <LogoWordmark />
            <span className="sr-only">{site.siteTitle}</span>
          </Link>
          <nav aria-label="Primary" className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-brand-copper dark:hover:text-brand-rose text-zinc-600 transition dark:text-zinc-400"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="relative z-10 flex-1">
        <main className={`mx-auto w-full px-4 pt-10 pb-20 sm:pt-14 ${mainClassName}`}>
          {children}
        </main>
      </div>

      <footer className="relative z-10 border-t border-zinc-200/90 bg-white/80 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/80 dark:text-zinc-400">
        <p>
          © {new Date().getFullYear()} {site.footerCredit}
        </p>
      </footer>
    </div>
  );
}
