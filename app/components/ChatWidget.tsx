"use client";

import { loadChatOpen, saveChatOpen } from "@/lib/chat-storage";
import { useCallback, useEffect, useState } from "react";
import { chatAvatar } from "../chat-avatars";
import { CHAT_LIMIT_ENABLED, site } from "../site";
import { ChatAvatar } from "./ChatAvatar";
import { Chat, getStoredQuestionCount } from "./Chat";

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(() => loadChatOpen());
  const [questionCount, setQuestionCount] = useState(0);
  useEffect(() => {
    saveChatOpen(isOpen);
  }, [isOpen]);

  const syncCount = useCallback(() => {
    setQuestionCount(getStoredQuestionCount());
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const max = site.chat.maxQuestions;
  const remaining = CHAT_LIMIT_ENABLED ? Math.max(0, max - questionCount) : max;
  const limitReached = CHAT_LIMIT_ENABLED && remaining <= 0;

  const openChat = () => {
    setQuestionCount(getStoredQuestionCount());
    setIsOpen(true);
  };

  const toggleChat = () => {
    setIsOpen((open) => {
      const next = !open;
      if (next) setQuestionCount(getStoredQuestionCount());
      return next;
    });
  };

  const handleInputRef = (element: HTMLInputElement | null) => {
    if (element && isOpen) {
      requestAnimationFrame(() => element.focus());
    }
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {isOpen && (
        <div
          className="flex h-[min(28rem,70vh)] w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-950"
          role="dialog"
          aria-label="Chat about Ilana Priev"
        >
          <div className="border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <ChatAvatar src={chatAvatar} alt={site.chat.avatarAlt} size="md" />
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Portfolio assistant
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                aria-label="Close chat"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <Chat
            inputRef={handleInputRef}
            onQuestionSent={syncCount}
            questionsRemaining={remaining}
            limitReached={limitReached}
            avatarSrc={chatAvatar}
            avatarAlt={site.chat.avatarAlt}
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        {!isOpen && (
          <button
            type="button"
            onClick={openChat}
            className="rounded-full border border-zinc-700/80 bg-zinc-900/95 px-4 py-2.5 text-sm text-zinc-400 shadow-lg backdrop-blur-sm transition hover:border-zinc-600 hover:text-zinc-200 dark:border-zinc-600 dark:bg-zinc-900/95"
          >
            {site.chat.placeholder}
          </button>
        )}
        <button
          type="button"
          onClick={toggleChat}
          className={
            isOpen
              ? "bg-brand-copper hover:bg-brand-rose focus-visible:ring-brand-rose flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-105 focus-visible:ring-2 focus-visible:outline-none"
              : "focus-visible:ring-brand-rose shrink-0 rounded-full shadow-lg transition hover:scale-105 focus-visible:ring-2 focus-visible:outline-none"
          }
          aria-label={isOpen ? "Close chat" : "Open chat"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <CloseIcon className="h-5 w-5" />
          ) : (
            <ChatAvatar src={chatAvatar} alt={site.chat.avatarAlt} size="lg" />
          )}
        </button>
      </div>
    </div>
  );
}
