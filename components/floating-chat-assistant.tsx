"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bot,
  X,
  Send,
  Loader2,
  Maximize2,
  Sparkles,
  Shield,
  BookOpen,
  RefreshCw,
  MessageSquare
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ChatMessageContent } from "@/components/chat-message-content"

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

const QUICK_PROMPTS = [
  "How this content is safe?",
  "Why is content marked not safe?",
  "Take me to the Detection page",
  "How does the RoBERTa model work?",
  "How do I report online harassment?",
  "How can I contact or collaborate?"
]

export function FloatingChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
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
  const [conversationId, setConversationId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen])

  const handleSendMessage = async (customText?: string) => {
    const text = (customText || inputMessage).trim()
    if (!text || isLoading) return

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!customText) setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversation_id: conversationId,
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
      console.error("Floating assistant chat error:", err)
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        role: "assistant",
        content:
          "I encountered an issue processing your request. Please ensure the backend is reachable or try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, errorMsg])
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
          "Conversation restarted. Ask me anything about cyberbullying risk assessment, RoBERTa classifications, or safe escalation steps.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ])
  }

  return (
    <>
      {/* Floating Action Button (Always fixed at bottom-right) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <button
                onClick={() => setIsOpen(true)}
                aria-label="Open CyberSafe AI Assistant"
                className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:scale-105 active:scale-95 transition-all duration-200 border border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {/* Pulsing online indicator dot */}
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>

                <Bot className="h-5 w-5 text-primary-foreground group-hover:rotate-12 transition-transform duration-200" />
                <span className="text-sm font-semibold tracking-wide pr-1">AI Assistant</span>

                <Sparkles className="h-3.5 w-3.5 text-primary-foreground/80" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Chat Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] sm:w-[410px] max-w-[calc(100vw-32px)] h-[560px] max-h-[calc(100vh-48px)] flex flex-col rounded-2xl bg-card border border-border/80 shadow-2xl overflow-hidden backdrop-blur-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-muted/60 border-b border-border/70 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative h-8 w-8 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-primary">
                  <Bot className="h-4 w-4" />
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-card" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-foreground">CyberSafe AI</span>
                    <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 border-primary/30 text-primary font-semibold">
                      Support Agent
                    </Badge>
                  </div>
                  <span className="text-[10px] text-muted-foreground leading-none">RAG-Grounded Safety Copilot</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={handleResetChat}
                  title="Reset conversation"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                  asChild
                  title="Open full page chat"
                >
                  <Link href="/chat">
                    <Maximize2 className="h-3.5 w-3.5" />
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => setIsOpen(false)}
                  title="Close assistant"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Message Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground font-medium rounded-br-none"
                        : "bg-muted/70 text-foreground border border-border/60 rounded-bl-none"
                    }`}
                  >
                    <div className="text-xs">
                      <ChatMessageContent content={msg.content} isAssistant={msg.role === "assistant"} onNavigate={() => setIsOpen(false)} />
                    </div>

                    {/* Grounded sources snippet if available */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-border/40 space-y-1 text-[10px]">
                        <div className="flex items-center gap-1 text-primary font-semibold">
                          <BookOpen className="h-3 w-3" />
                          <span>Cited Safety Knowledge:</span>
                        </div>
                        {msg.sources.slice(0, 2).map((s, idx) => (
                          <div key={idx} className="text-muted-foreground truncate">
                            &bull; {s.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-muted-foreground/70 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/40 text-muted-foreground w-fit">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                  <span className="text-[11px]">Reasoning with multi-agent knowledge...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length <= 2 && (
              <div className="px-3 py-2 border-t border-border/50 bg-background/50 space-y-1">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block px-1">
                  Suggested Questions:
                </span>
                <div className="flex flex-col gap-1">
                  {QUICK_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-left text-[11px] text-foreground/80 hover:text-primary hover:bg-primary/10 p-1.5 rounded transition-colors text-ellipsis overflow-hidden whitespace-nowrap"
                    >
                      &rsaquo; {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <div className="p-3 border-t border-border/70 bg-card shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex items-center gap-2"
              >
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask CyberSafe AI Assistant..."
                  disabled={isLoading}
                  className="text-xs h-9 focus-visible:ring-primary/40"
                  maxLength={500}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!inputMessage.trim() || isLoading}
                  className="h-9 w-9 shrink-0 shadow-sm"
                >
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
