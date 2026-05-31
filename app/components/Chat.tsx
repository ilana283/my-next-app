"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import type { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { detectChatTopic, stripMarkdown, type SiteSectionTarget } from "@/lib/chat-topics";
import {
  CHAT_QUESTION_COUNT_KEY,
  loadStoredMessages,
  saveChatOpen,
  saveStoredMessages,
} from "@/lib/chat-storage";
import { CHAT_LIMIT_ENABLED, site } from "../site";
import { ChatAvatar } from "./ChatAvatar";
import { revealSiteSection } from "./chat-navigate";

const chatTransport = new DefaultChatTransport({ api: "/api/chat" });

type TextPart = { type: "text"; text: string };
type MessagePart = TextPart | { type: string; [key: string]: unknown };

function isTextPart(part: MessagePart): part is TextPart {
  return part.type === "text" && typeof (part as TextPart).text === "string";
}

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter(isTextPart)
    .map((part) => part.text)
    .join("");
}

export function getStoredQuestionCount(): number {
  if (typeof window === "undefined") return 0;
  const raw = sessionStorage.getItem(CHAT_QUESTION_COUNT_KEY);
  return raw ? Number.parseInt(raw, 10) : 0;
}

export function incrementStoredQuestionCount(): number {
  const next = getStoredQuestionCount() + 1;
  sessionStorage.setItem(CHAT_QUESTION_COUNT_KEY, String(next));
  return next;
}

type ChatProps = {
  inputRef?: (element: HTMLInputElement | null) => void;
  onQuestionSent?: () => void;
  questionsRemaining: number;
  limitReached: boolean;
  avatarSrc: string | StaticImageData;
  avatarAlt: string;
};

export function Chat({
  inputRef,
  onQuestionSent,
  questionsRemaining,
  limitReached,
  avatarSrc,
  avatarAlt,
}: ChatProps) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [initialMessages] = useState(() => loadStoredMessages());
  const { messages, sendMessage, status, error } = useChat({
    transport: chatTransport,
    messages: initialMessages,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pendingSectionRef = useRef<SiteSectionTarget | null>(null);
  const isLoading = status === "streaming" || status === "submitted";
  const isWaiting = status === "submitted";

  useEffect(() => {
    saveStoredMessages(messages);
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isWaiting]);

  useEffect(() => {
    if (!pendingSectionRef.current || isLoading) return;
    const last = messages.at(-1);
    if (last?.role !== "assistant" || !getMessageText(last)) return;

    const target = pendingSectionRef.current;
    pendingSectionRef.current = null;
    saveChatOpen(true);

    window.setTimeout(() => {
      revealSiteSection(router, target);
    }, 600);
  }, [messages, isLoading, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || limitReached) return;

    const question = input.trim();
    pendingSectionRef.current = detectChatTopic(question);

    sendMessage({ text: question });
    incrementStoredQuestionCount();
    onQuestionSent?.();
    setInput("");
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {messages.length === 0 ? (
          <div className="flex gap-2">
            <ChatAvatar src={avatarSrc} alt={avatarAlt} size="sm" className="mt-0.5" />
            <p className="min-w-0 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {site.chat.welcome}
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => {
              const isUser = message.role === "user";
              const text = isUser
                ? getMessageText(message)
                : stripMarkdown(getMessageText(message));
              if (isUser) {
                return (
                  <div key={message.id} className="ml-auto max-w-[92%]">
                    <div className="bg-brand-copper/15 dark:bg-brand-rose/20 rounded-2xl px-3 py-2 text-sm leading-relaxed text-zinc-900 dark:text-zinc-100">
                      {text}
                    </div>
                  </div>
                );
              }
              return (
                <div key={message.id} className="flex max-w-[92%] gap-2">
                  <ChatAvatar src={avatarSrc} alt={avatarAlt} size="sm" className="mt-0.5" />
                  <div className="min-w-0 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm leading-relaxed text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                    {text}
                  </div>
                </div>
              );
            })}
            {isWaiting && (
              <div className="flex max-w-[92%] gap-2" aria-live="polite">
                <ChatAvatar src={avatarSrc} alt={avatarAlt} size="sm" className="mt-0.5" />
                <div className="inline-flex rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                  Thinking…
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <p className="border-t border-red-200/80 bg-red-50 px-4 py-2 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
          {error.message || "Something went wrong. Please try again."}
        </p>
      )}

      {limitReached ? (
        <p className="border-t border-zinc-200 px-4 py-3 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          {site.chat.limitReached}{" "}
          <a
            href={site.links.email}
            className="text-brand-copper dark:text-brand-rose font-medium underline"
          >
            {site.emailAddress}
          </a>
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="border-t border-zinc-200 p-3 dark:border-zinc-800">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={site.chat.placeholder}
              maxLength={200}
              disabled={isLoading}
              className="focus:border-brand-rose focus:ring-brand-rose/30 min-w-0 flex-1 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:ring-2 focus:outline-none disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500"
              aria-label={site.chat.placeholder}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-brand-copper hover:bg-brand-rose shrink-0 rounded-full px-4 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </div>
          {CHAT_LIMIT_ENABLED ? (
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
              {questionsRemaining} question{questionsRemaining === 1 ? "" : "s"} left
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
