"use client";

import { saveChatOpen } from "@/lib/chat-storage";
import type { useRouter } from "next/navigation";
import type { SiteSectionTarget } from "@/lib/chat-topics";

type AppRouter = ReturnType<typeof useRouter>;

const HIGHLIGHT_CLASS = "chat-section-highlight";

function highlightSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "start" });
  el.classList.add(HIGHLIGHT_CLASS);
  window.setTimeout(() => el.classList.remove(HIGHLIGHT_CLASS), 2600);
}

/** Scroll to the matching site section (and navigate if needed) */
export function revealSiteSection(router: AppRouter, target: SiteSectionTarget) {
  const href = `${target.pathname}#${target.sectionId}`;
  saveChatOpen(true);

  if (window.location.pathname !== target.pathname) {
    router.push(href);
    window.setTimeout(() => highlightSection(target.sectionId), 450);
    return;
  }

  if (window.location.hash !== `#${target.sectionId}`) {
    window.history.replaceState(null, "", href);
  }

  highlightSection(target.sectionId);
}
