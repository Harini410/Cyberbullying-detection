"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowUpRight, ExternalLink, Sparkles, Mail, Home, Activity, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatMessageContentProps {
  content: string
  isAssistant?: boolean
  onNavigate?: () => void
}

function parseNavigationUrl(rawUrl: string): { path: string; isInternal: boolean } {
  let url = rawUrl.trim()
  // Strip any hardcoded localhost, 127.0.0.1, or deployment base URLs
  url = url.replace(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i, "")
  url = url.replace(/^https?:\/\/(cyberbullying-detection[^\/]*\.vercel\.app)/i, "")
  if (!url) url = "/"

  const isInternal = url.startsWith("/") || url.startsWith("#")
  return { path: url, isInternal }
}

function renderFormattedInline(
  text: string,
  keyPrefix: string,
  router: ReturnType<typeof useRouter>,
  onNavigate?: () => void
): React.ReactNode[] {
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*)/g
  const elements: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index))
    }

    if (match[0].startsWith("[")) {
      const linkText = match[2]
      const rawUrl = match[3]
      const { path, isInternal } = parseNavigationUrl(rawUrl)

      if (isInternal) {
        if (path.startsWith("#")) {
          elements.push(
            <a
              key={`${keyPrefix}-link-${match.index}`}
              href={path}
              onClick={() => onNavigate?.()}
              className="inline-flex items-center gap-0.5 font-semibold text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
            >
              <span>{linkText}</span>
            </a>
          )
        } else {
          elements.push(
            <Link
              key={`${keyPrefix}-link-${match.index}`}
              href={path}
              onClick={(e) => {
                e.preventDefault()
                onNavigate?.()
                router.push(path)
              }}
              className="inline-flex items-center gap-0.5 font-semibold text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
            >
              <span>{linkText}</span>
              <ArrowUpRight className="h-3 w-3 inline shrink-0" />
            </Link>
          )
        }
      } else {
        elements.push(
          <a
            key={`${keyPrefix}-link-${match.index}`}
            href={rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 font-semibold text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
          >
            <span>{linkText}</span>
            <ExternalLink className="h-3 w-3 inline shrink-0" />
          </a>
        )
      }
    } else if (match[0].startsWith("**")) {
      elements.push(
        <strong key={`${keyPrefix}-bold-${match.index}`} className="font-semibold text-foreground">
          {match[4]}
        </strong>
      )
    }

    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex))
  }

  return elements
}

export function ChatMessageContent({ content, isAssistant, onNavigate }: ChatMessageContentProps) {
  const router = useRouter()
  const lower = content.toLowerCase()
  const hasDetect =
    isAssistant &&
    (content.includes("/detect") ||
      lower.includes("go to detection") ||
      lower.includes("launch live detector") ||
      lower.includes("launch detector") ||
      lower.includes("live detector") ||
      lower.includes("detection suite") ||
      lower.includes("detection page"))

  const hasDashboard =
    isAssistant &&
    (content.includes("/dashboard") ||
      lower.includes("open dashboard") ||
      lower.includes("analytics dashboard") ||
      lower.includes("dashboard") ||
      lower.includes("telemetry"))

  const hasAbout =
    isAssistant &&
    (content.includes("/about") ||
      lower.includes("about the system") ||
      lower.includes("about platform") ||
      lower.includes("about system") ||
      lower.includes("architecture"))

  const hasHome =
    isAssistant &&
    (content.includes("(/)") ||
      lower.includes("return to home") ||
      lower.includes("home page") ||
      lower.includes("home showcase") ||
      lower.includes("home hub") ||
      lower.includes("home"))

  const hasContact =
    isAssistant &&
    (content.includes("#contact") ||
      content.includes("/contact") ||
      lower.includes("contact info") ||
      lower.includes("contact developer") ||
      lower.includes("contact the team"))

  const paragraphs = content.split("\n\n")

  return (
    <div className="space-y-2">
      {paragraphs.map((para, pIdx) => {
        const lines = para.split("\n")
        return (
          <div key={`p-${pIdx}`} className="leading-relaxed">
            {lines.map((line, lIdx) => (
              <React.Fragment key={`l-${pIdx}-${lIdx}`}>
                {renderFormattedInline(line, `p${pIdx}-l${lIdx}`, router, onNavigate)}
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
        )
      })}

      {/* Quick Navigation Action Pills for Assistant */}
      {isAssistant && (hasDetect || hasDashboard || hasAbout || hasContact || hasHome) && (
        <div className="flex flex-wrap items-center gap-1.5 pt-2.5 mt-2.5 border-t border-border/40">
          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mr-0.5">
            Quick Actions:
          </span>
          {hasDetect && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-6 px-2 text-[10px] font-medium gap-1 border-primary/30 text-primary bg-primary/5 hover:bg-primary/15 transition-all shadow-xs"
              onClick={() => {
                onNavigate?.()
                router.push("/detect")
              }}
            >
              <Sparkles className="h-2.5 w-2.5" />
              Go to Detection
            </Button>
          )}
          {hasDashboard && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-6 px-2 text-[10px] font-medium gap-1 border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5 hover:bg-blue-500/15 transition-all shadow-xs"
              onClick={() => {
                onNavigate?.()
                router.push("/dashboard")
              }}
            >
              <Activity className="h-2.5 w-2.5" />
              Open Dashboard
            </Button>
          )}
          {hasAbout && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-6 px-2 text-[10px] font-medium gap-1 border-purple-500/30 text-purple-600 dark:text-purple-400 bg-purple-500/5 hover:bg-purple-500/15 transition-all shadow-xs"
              onClick={() => {
                onNavigate?.()
                router.push("/about")
              }}
            >
              <BookOpen className="h-2.5 w-2.5" />
              About the System
            </Button>
          )}
          {hasHome && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-6 px-2 text-[10px] font-medium gap-1 border-primary/30 text-primary bg-primary/5 hover:bg-primary/15 transition-all shadow-xs"
              onClick={() => {
                onNavigate?.()
                router.push("/")
              }}
            >
              <Home className="h-2.5 w-2.5" />
              Home
            </Button>
          )}
          {hasContact && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-6 px-2 text-[10px] font-medium gap-1 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/15 transition-all shadow-xs"
              onClick={() => {
                onNavigate?.()
                router.push("/#contact")
              }}
            >
              <Mail className="h-2.5 w-2.5" />
              Contact
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
