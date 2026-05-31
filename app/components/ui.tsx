import type { ReactNode } from "react";

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-zinc-200/90 bg-white/90 p-5 shadow-sm dark:border-zinc-700/90 dark:bg-zinc-900/60 ${className}`}
    >
      {children}
    </div>
  );
}

export const brandBorderL = "border-l-4 border-l-brand-rose pl-6";

export function AccentLine({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`bg-brand-rose mt-2 h-1 w-12 rounded-sm ${className}`} />;
}

export function SectionTitle({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      id={id}
      className={`text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 ${className}`}
    >
      {children}
    </h2>
  );
}

export function PageTitle({
  id,
  children,
  className = "",
  centered = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  centered?: boolean;
}) {
  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      <h1 id={id} className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        {children}
      </h1>
      <AccentLine className={centered ? "mx-auto" : ""} />
    </div>
  );
}
