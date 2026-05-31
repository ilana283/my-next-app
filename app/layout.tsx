import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ChatWidgetRoot } from "./components/ChatWidgetRoot";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ilana Priev · AIDD",
    template: "%s · Ilana Priev AIDD",
  },
  description:
    "Ilana Priev — Hardware & Embedded Systems Engineer. Portfolio: PCB design, embedded systems, validation and engineering projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <ChatWidgetRoot />
      </body>
    </html>
  );
}
