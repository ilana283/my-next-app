import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  generateId,
  streamText,
  type UIMessage,
} from "ai";
import { answerFromSiteContent } from "@/lib/chat-fallback";
import { buildSiteSystemPrompt } from "@/lib/site-context";
import { CHAT_LIMIT_ENABLED, CHAT_MAX_QUESTIONS, site } from "@/app/site";

export const runtime = "nodejs";

const MAX_MESSAGES_PER_REQUEST = 10;

type TextPart = { type: "text"; text: string };

function getLastUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const message = messages[i];
    if (message.role !== "user") continue;
    const fromParts = message.parts
      .filter((part): part is TextPart => part.type === "text" && "text" in part)
      .map((part) => part.text)
      .join("");
    if (fromParts) return fromParts;
  }
  return "";
}

function fallbackResponse(messages: UIMessage[], answer: string) {
  const stream = createUIMessageStream({
    originalMessages: messages,
    generateId,
    execute: ({ writer }) => {
      const id = generateId();
      writer.write({ type: "text-start", id });
      writer.write({ type: "text-delta", id, delta: answer });
      writer.write({ type: "text-end", id });
    },
  });

  return createUIMessageStreamResponse({ stream });
}

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages?: UIMessage[] };

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid request: messages array required", { status: 400 });
    }

    if (messages.length > MAX_MESSAGES_PER_REQUEST) {
      return new Response("Too many messages in request", { status: 400 });
    }

    const userTurns = messages.filter((m) => m.role === "user").length;
    if (CHAT_LIMIT_ENABLED && userTurns > CHAT_MAX_QUESTIONS) {
      return new Response(site.chat.limitReached, { status: 429 });
    }

    const lastQuestion = getLastUserText(messages);

    if (!process.env.OPENAI_API_KEY) {
      return fallbackResponse(messages, answerFromSiteContent(lastQuestion));
    }

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: buildSiteSystemPrompt(),
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return new Response(message, { status: 500 });
  }
}
