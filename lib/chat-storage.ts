import type { UIMessage } from "ai";

export const CHAT_MESSAGES_KEY = "ilana-portfolio-chat-messages";
export const CHAT_OPEN_KEY = "ilana-portfolio-chat-open";
export const CHAT_QUESTION_COUNT_KEY = "ilana-portfolio-chat-questions";

let clearedThisPageLoad = false;

/** Fresh chat after browser refresh or first visit (sessionStorage survives refresh otherwise) */
export function ensureChatClearedOnPageLoad() {
  if (typeof window === "undefined" || clearedThisPageLoad) return;
  clearedThisPageLoad = true;

  const nav = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  if (!nav || nav.type === "reload" || nav.type === "navigate") {
    sessionStorage.removeItem(CHAT_MESSAGES_KEY);
    sessionStorage.removeItem(CHAT_OPEN_KEY);
    sessionStorage.removeItem(CHAT_QUESTION_COUNT_KEY);
  }
}

export function loadStoredMessages(): UIMessage[] {
  ensureChatClearedOnPageLoad();
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(CHAT_MESSAGES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as UIMessage[]) : [];
  } catch {
    return [];
  }
}

export function saveStoredMessages(messages: UIMessage[]) {
  if (typeof window === "undefined") return;
  if (messages.length === 0) {
    sessionStorage.removeItem(CHAT_MESSAGES_KEY);
    return;
  }
  sessionStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(messages));
}

export function loadChatOpen(): boolean {
  ensureChatClearedOnPageLoad();
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(CHAT_OPEN_KEY) === "1";
}

export function saveChatOpen(open: boolean) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CHAT_OPEN_KEY, open ? "1" : "0");
}
