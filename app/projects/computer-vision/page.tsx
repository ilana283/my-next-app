import Link from "next/link";
import { Reveal } from "../../components/Reveal";
import { SiteShell } from "../../components/SiteShell";
import { PageTitle, Panel, brandBorderL } from "../../components/ui";
import { ProjectVideoPlayer } from "../../components/ProjectVideoPlayer";

export const metadata = {
  title: "Computer Vision — Detection from the movie La La Land",
};

const videoSrc = "/projects/lalaland-detection.mp4";

export default function ComputerVisionPreviewPage() {
  return (
    <SiteShell mainClassName="max-w-4xl">
      <section aria-labelledby="cv-preview-title" className="mb-10 sm:mb-12">
        <Reveal>
          <PageTitle id="cv-preview-title">Detection from the movie La La Land</PageTitle>
          <p className="mt-3 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Human movement detection and tracking in video — actor, actress, hands and legs
          </p>
        </Reveal>
      </section>

      <Panel className={`overflow-hidden p-3 sm:p-4 ${brandBorderL}`}>
        <ProjectVideoPlayer src={videoSrc} title="Detection from the movie La La Land" />
      </Panel>

      <p className="mt-10 text-center">
        <Link
          href="/projects"
          className="hover:text-brand-copper dark:hover:text-brand-rose text-sm font-medium text-zinc-700 transition dark:text-zinc-300"
        >
          ← Back to projects
        </Link>
      </p>
    </SiteShell>
  );
}
