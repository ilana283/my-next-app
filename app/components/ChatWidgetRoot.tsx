"use client";

import { ChatWidget } from "./ChatWidget";

/** Lives in root layout so chat state survives page navigation */
export function ChatWidgetRoot() {
  return <ChatWidget />;
}
