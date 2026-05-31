import type { TrainingItem } from "../site";
import { Panel, brandBorderL } from "./ui";

export type TimelineRole = {
  title: string;
  period: string;
  bullets: string[];
};

export type TimelineEntry = {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  /** Long titles: years on title row, subtitle on the line below */
  subtitleLayout?: "inline" | "stacked";
  bullets?: string[];
  body?: string;
  roles?: TimelineRole[];
};

type TimelineProps = {
  entries: TimelineEntry[];
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
      {items.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  );
}

function TimelineItem({ entry }: { entry: TimelineEntry }) {
  const stacked = entry.subtitleLayout === "stacked";

  return (
    <li className="relative pb-8 pl-6 last:pb-2">
      <span
        aria-hidden
        className="bg-brand-rose absolute top-2 -left-[7px] h-2.5 w-2.5 rounded-full ring-4 ring-white dark:ring-zinc-900/60"
      />
      <div className="flex flex-col gap-0.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            {entry.title}
            {!stacked && entry.subtitle ? (
              <span className="font-normal text-zinc-600 dark:text-zinc-400">
                {" "}
                · {entry.subtitle}
              </span>
            ) : null}
          </h3>
        </div>
        <p className="text-brand-copper dark:text-brand-rose mt-0.5 shrink-0 text-sm tabular-nums">
          {entry.period}
        </p>
      </div>
      {stacked && entry.subtitle ? (
        <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">{entry.subtitle}</p>
      ) : null}
      {entry.body ? (
        <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {entry.body}
        </p>
      ) : null}
      {entry.roles?.length ? (
        <div className="mt-4 space-y-5">
          {entry.roles.map((role) => (
            <div key={`${role.title}-${role.period}`}>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between">
                <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {role.title}
                </h4>
                <p className="text-brand-copper/90 dark:text-brand-rose/90 text-xs tabular-nums">
                  {role.period}
                </p>
              </div>
              <BulletList items={role.bullets} />
            </div>
          ))}
        </div>
      ) : null}
      {entry.bullets?.length ? <BulletList items={entry.bullets} /> : null}
    </li>
  );
}

export function Timeline({ entries }: TimelineProps) {
  return (
    <Panel className={`p-5 sm:p-6 ${brandBorderL}`}>
      <ul className="relative ml-1 border-l-2 border-zinc-200 dark:border-zinc-700">
        {entries.map((entry) => (
          <TimelineItem key={entry.id} entry={entry} />
        ))}
      </ul>
    </Panel>
  );
}

export function TrainingPanel({ items }: { items: TrainingItem[] }) {
  return (
    <Panel className={brandBorderL}>
      <div className="space-y-8">
        {items.map((item) => (
          <div key={item.title}>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {item.title}
                {item.provider ? (
                  <span className="font-normal text-zinc-600 dark:text-zinc-400">
                    {" "}
                    · {item.provider}
                  </span>
                ) : null}
              </h3>
              {item.period ? (
                <p className="text-brand-copper dark:text-brand-rose mt-0.5 shrink-0 text-sm tabular-nums">
                  {item.period}
                </p>
              ) : null}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
