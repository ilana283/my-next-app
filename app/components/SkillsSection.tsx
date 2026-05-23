import { site } from "../site";
import { Panel, brandBorderL } from "./ui";

export function SkillsSection() {
  return (
    <Panel className={brandBorderL}>
      <h2
        id="skills-heading"
        className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
      >
        Technical Skills
      </h2>
      <div className="mt-8 space-y-8">
        {site.skills.map((category) => (
          <div key={category.name}>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {category.name}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <li key={skill}>
                  <span className="inline-block rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-800 dark:border-zinc-600 dark:bg-zinc-950/50 dark:text-zinc-200">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Panel>
  );
}
