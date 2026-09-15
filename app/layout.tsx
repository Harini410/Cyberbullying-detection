import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FloatingChatAssistant } from "@/components/floating-chat-assistant"

export const metadata: Metadata = {
  title: "CyberSafe AI — Agentic AI-Powered Cyberbullying Detection Platform",
  description:
    "Production-grade multi-agent AI system combining fine-tuned RoBERTa transformer inference, RAG knowledge retrieval, affective emotion vectors, and conversational safety support.",
  generator: "CyberSafe AI",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="flex min-h-screen flex-col justify-between">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingChatAssistant />
      </body>
    </html>
  )
}
