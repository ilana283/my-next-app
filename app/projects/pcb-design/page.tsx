import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../../components/Reveal";
import { SiteShell } from "../../components/SiteShell";
import { PageTitle, Panel, SectionTitle, brandBorderL } from "../../components/ui";

export const metadata = {
  title: "PCB Design — IR Proximity Detector",
};

type PcbImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type PcbSection = {
  id: string;
  title: string;
  images: PcbImage[];
};

const pcbSections = [
  {
    id: "circuit-schematic",
    title: "Circuit Schematic",
    images: [
      {
        src: "/projects/pcb-schematic.png",
        alt: "IR proximity detector circuit schematic — NE555 timer, LM386 amplifier, IR receiver and speaker",
        width: 1024,
        height: 349,
      },
    ],
  },
  {
    id: "layout-2d",
    title: "2D",
    images: [
      {
        src: "/projects/pcb-2d-layout.png",
        alt: "IR Proximity Detector 2D PCB layout with component footprints and copper traces",
        width: 1024,
        height: 407,
      },
    ],
  },
  {
    id: "view-3d",
    title: "3D",
    images: [
      {
        src: "/projects/pcb-3d-top.png",
        alt: "IR Proximity Detector 3D PCB render — top view with green solder mask",
        width: 1024,
        height: 402,
      },
      {
        src: "/projects/pcb-3d-assembly.png",
        alt: "IR Proximity Detector 3D PCB render — assembled board with buzzer and through-hole components",
        width: 1024,
        height: 386,
      },
    ],
  },
  {
    id: "enclosure-design",
    title: "Enclosure Design for Detector",
    images: [
      {
        src: "/projects/pcb-enclosure.png",
        alt: "Detector enclosure design — open and closed 3D views of the housing with PCB inside",
        width: 1021,
        height: 417,
      },
    ],
  },
] satisfies PcbSection[];

function PcbImagePanel({ image, priority }: { image: PcbImage; priority?: boolean }) {
  return (
    <Panel className={`overflow-hidden p-3 sm:p-4 ${brandBorderL}`}>
      <div className="mx-auto max-w-2xl">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="h-auto w-full rounded-lg"
          sizes="(max-width: 672px) 100vw, 672px"
          quality={100}
          unoptimized
          priority={priority}
        />
      </div>
    </Panel>
  );
}

export default function PcbDesignPreviewPage() {
  return (
    <SiteShell mainClassName="max-w-4xl">
      <section aria-labelledby="pcb-preview-title" className="mb-10 sm:mb-12">
        <Reveal>
          <PageTitle id="pcb-preview-title">IR Proximity Detector</PageTitle>
          <p className="mt-3 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Altium Designer — schematic, layout, 3D views and enclosure
          </p>
        </Reveal>
      </section>

      <div className="space-y-10 sm:space-y-12">
        {pcbSections.map((section, sectionIndex) => (
          <section key={section.id} aria-labelledby={`${section.id}-heading`}>
            <Reveal>
              <SectionTitle id={`${section.id}-heading`} className="mb-4">
                {section.title}
              </SectionTitle>
              <div className={section.images.length > 1 ? "space-y-4" : undefined}>
                {section.images.map((image, imageIndex) => (
                  <PcbImagePanel
                    key={image.src}
                    image={image}
                    priority={sectionIndex === 0 && imageIndex === 0}
                  />
                ))}
              </div>
            </Reveal>
          </section>
        ))}
      </div>

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
