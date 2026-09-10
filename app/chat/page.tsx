"use client"

import type React from "react"
import { useState, useEffect, useRef, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  ArrowLeft,
  MessageSquare,
  Send,
  Loader2,
  Bot,
  User,
  BookOpen,
  RefreshCw,
  Sparkles,
  ExternalLink,
  LifeBuoy
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface SourceItem {
  chunk_id: string
  title: string
  source: string
  text: string
  category: string
  score?: number
}

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  sources?: SourceItem[]
  timestamp: string
}

const SAMPLE_PROMPTS = [
  "Why was this classified as cyberbullying?",
  "What should I do if someone is threatening me online?",
  "How do I report harassment on Instagram and preserve evidence?",
  "Explain the active bystander 4Ds framework.",
  "What crisis hotlines and support resources are available?",
]

function ChatComponent() {
  const searchParams = useSearchParams()
  const boundAnalysisId = searchParams.get("analysis_id")

  const [conversationId, setConversationId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I am CyberSafe AI, your conversational assistant for cyberbullying detection, explainable AI moderation, and online safety guidance. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage
    if (!text.trim() || isLoading) return

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversation_id: conversationId,
          analysis_id: boundAnalysisId || null,
        }),
      })

      if (!response.ok) {
        throw new Error(`Chat API error: HTTP ${response.status}`)
      }

      const data = await response.json()
      if (data.conversation_id) {
        setConversationId(data.conversation_id)
      }

      const assistantMsg: ChatMessage = {
        id: `ast_${Date.now()}`,
        role: "assistant",
        content: data.message,
        sources: data.sources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => [...prev, assistantMsg])
    } catch (err: any) {
      console.error("Chat error:", err)
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: "assistant",
          content:
            "I apologize, but I encountered an issue connecting to the AI backend. Please verify that the FastAPI backend server is running.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetChat = () => {
    setConversationId(null)
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Conversation restarted. Feel free to ask questions about cyberbullying prevention, digital civility, or our RoBERTa analysis system.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ])
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur shrink-0">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/detect" className="flex items-center gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                Detector
              </Link>
            </Button>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-sm font-bold leading-none">CyberSafe AI Assistant</h1>
                <span className="text-[11px] text-muted-foreground">LLM + RAG Grounded Support</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleResetChat} className="text-xs gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" />
              New Chat
            </Button>
            <Button variant="default" size="sm" asChild className="text-xs">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Chat Workspace */}
      <div className="container mx-auto px-4 py-6 max-w-4xl flex-1 flex flex-col">
        {/* Bound Analysis Alert Banner */}
        {boundAnalysisId && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary shrink-0" />
              <span>
                <strong>Previous Analysis Linked:</strong> The assistant is primed with context from analysis{" "}
                <code className="bg-background px-1.5 py-0.5 rounded font-mono text-[10px]">{boundAnalysisId}</code>
              </span>
            </div>
            <Badge variant="secondary" className="text-[10px]">Context Active</Badge>
          </motion.div>
        )}

        {/* Message Log */}
        <Card className="flex-1 flex flex-col overflow-hidden border-border shadow-sm">
          <CardContent className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${msg.role === "user" ? "ml-auto justify-end" : "mr-auto justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div className={`space-y-2 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-xs"
                        : "bg-muted/70 text-foreground border border-border/60 rounded-tl-xs"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>

                  {/* Grounding Sources Cards */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="p-3 rounded-lg bg-muted/30 border border-border/40 text-xs space-y-2 mt-2">
                      <div className="flex items-center gap-1.5 font-semibold text-muted-foreground">
                        <BookOpen className="h-3.5 w-3.5 text-primary" />
                        <span>Grounded Knowledge Sources Cited:</span>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5">
                        {msg.sources.map((src, sIdx) => (
                          <div key={sIdx} className="p-2 rounded bg-background/80 border border-border/50 text-[11px]">
                            <div className="font-semibold text-primary">{src.title}</div>
                            <div className="text-muted-foreground line-clamp-1">{src.text}</div>
                            <div className="text-[9px] text-muted-foreground font-mono mt-0.5">Ref: {src.source}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-[10px] text-muted-foreground px-1">{msg.timestamp}</div>
                </div>

                {msg.role === "user" && (
                  <div className="h-8 w-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0 mt-0.5">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 mr-auto items-center text-sm text-muted-foreground">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 bg-muted/50 py-2 px-4 rounded-xl border border-border/50">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                  <span>Consulting RoBERTa analysis and safety knowledge base...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </CardContent>

          {/* Prompt Suggestions */}
          <div className="px-4 py-2 border-t border-border bg-muted/20 overflow-x-auto">
            <div className="flex gap-2 text-xs">
              <span className="text-muted-foreground shrink-0 py-1 font-medium">Suggested:</span>
              {SAMPLE_PROMPTS.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading}
                  className="shrink-0 px-2.5 py-1 rounded-full bg-background border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 border-t border-border bg-background">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex gap-2"
            >
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about cyberbullying classification, reporting procedures, safety policies..."
                className="flex-1 text-sm focus-visible:ring-1"
                disabled={isLoading}
                maxLength={2000}
              />
              <Button type="submit" disabled={!inputMessage.trim() || isLoading} className="gap-1.5 px-4">
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Send</span>
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading CyberSafe AI Chat...</div>}>
      <ChatComponent />
    </Suspense>
  )
}
