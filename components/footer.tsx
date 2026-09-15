"use client"

import Link from "next/link"
import { Shield, Mail, Linkedin, ExternalLink, Github } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border/80 bg-card/70 py-12 px-4 text-xs text-muted-foreground transition-colors">
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Shield className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-foreground text-sm tracking-tight">CyberSafe AI</span>
                <span className="text-[11px] text-muted-foreground font-mono">Autonomous Multi-Agent System</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              An AI Agentic Software Engineering platform combining fine-tuned RoBERTa sequence classification, dense vector RAG, and affective risk evaluation for safer digital communities.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">Navigation</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/detect" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
                  <span>Detect</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
                  <span>About</span>
                </Link>
              </li>
              <li>
                <a href="#contact" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Section */}
          <div className="space-y-3">
            <div className="space-y-1">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">Contact</h3>
              <p className="text-xs text-muted-foreground">
                Questions, feedback, or engineering collaboration inquiries:
              </p>
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <a
                href="mailto:harini.lts8@gmail.com"
                className="inline-flex items-center gap-2 text-xs text-primary hover:underline hover:text-primary/90 transition-colors font-medium"
              >
                <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>harini.lts8@gmail.com</span>
              </a>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                <a
                  href="https://www.linkedin.com/in/harini-lakshmanan-04/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors hover:underline"
                >
                  <Linkedin className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>LinkedIn</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
                <span className="text-border">&bull;</span>
                <a
                  href="https://github.com/harini-lakshmanan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors hover:underline"
                >
                  <Github className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>GitHub</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
                <span className="text-border">&bull;</span>
                <a
                  href="https://port-folio-02.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors hover:underline"
                >
                  <span>Portfolio</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} CyberSafe AI &bull; Built by Harini L
          </div>
          <div className="font-mono text-muted-foreground">
            FastAPI &bull; PyTorch RoBERTa &bull; Next.js 16
          </div>
        </div>
      </div>
    </footer>
  )
}
