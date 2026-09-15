"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Brain,
  Layers,
  Database,
  Lock,
  Sparkles,
  Bot,
  Activity,
  ArrowRight,
  CheckCircle2,
  Server,
  FileCode2,
  Cpu,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-10">
        {/* Back Navigation */}
        <div className="flex items-center justify-start">
          <Button asChild variant="ghost" size="sm" className="text-xs font-semibold gap-1.5 h-8 text-muted-foreground hover:text-foreground">
            <Link href="/">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>

        {/* Header / Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
            <Cpu className="h-3.5 w-3.5" />
            <span>ENTERPRISE AI AGENTIC SYSTEM</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            About CyberSafe AI
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            An enterprise-grade, privacy-preserving AI platform engineering autonomous multi-agent orchestration,
            fine-tuned RoBERTa transformer inference, dense vector RAG knowledge retrieval, and real-time affective risk matrices.
          </p>
        </div>

        {/* Core Product Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-border/70 shadow-xs">
            <CardHeader className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Brain className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">RoBERTa — Active Primary Model</CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Fine-tuned bidirectional transformer sequence classification specifically trained for nuanced cyberbullying detection, derogatory harassment, and hostile intent.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>512-token bidirectional contextual attention window</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>Calibrated probability outputs for Safe vs Cyberbullying</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>Single active production model powering all live inferences</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 shadow-xs">
            <CardHeader className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                <Layers className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">7-Agent Autonomous Pipeline</CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Asynchronous stateful execution DAG coordinating specialized micro-agents to provide multidimensional analysis rather than opaque black-box predictions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                <span>Sequential DAG: Detection → Emotion → Context → Risk → RAG → Explanation → Response</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                <span>Sub-100ms pipeline execution with granular per-agent latency profiling</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                <span>Typed CyberbullyingState schema ensuring fault isolation</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 shadow-xs">
            <CardHeader className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500">
                <Activity className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">Affective NLP (5 Emotion Classes)</CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Granular affective emotion extraction distinguishing Anger, Fear, Sadness, Neutral, and Joy combined with VADER compound sentiment polarity analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-yellow-500 shrink-0" />
                <span>Hostile emotional surge and aggression pattern detection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-yellow-500 shrink-0" />
                <span>VADER compound sentiment score [-1.0 to +1.0]</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-yellow-500 shrink-0" />
                <span>Context nuance parsing for sarcasm, shouting, and covert toxicity</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 shadow-xs">
            <CardHeader className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                <Database className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">Dense Vector RAG & Grounded AI</CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Persistent local vector index powered by all-MiniLM-L6-v2 embeddings grounding moderation explanations and safety guidance in verified guidelines.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>Authoritative safety documentation indexed in chunked vectors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>Exact cosine similarity retrieval with cited source chunks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <span>24/7 crisis hotlines and platform escalation protocols</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Support Agent & Privacy Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-border/70 shadow-xs">
            <CardHeader className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
                <Bot className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">AI Support Agent (CyberSafe Copilot)</CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Global conversational assistant available across all pages to guide victims, explain moderation decisions, and answer reporting inquiries.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-purple-500 shrink-0" />
                <span>SQLite-backed multi-turn conversation memory</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-purple-500 shrink-0" />
                <span>Strict prompt injection and system prompt leak defense</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-purple-500 shrink-0" />
                <span>Interactive Next.js page routing navigation pills</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 shadow-xs">
            <CardHeader className="space-y-2">
              <div className="h-10 w-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500">
                <Lock className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">Privacy & Security Guardrails</CardTitle>
              <CardDescription className="text-xs leading-relaxed">
                Built-in identity protection ensuring user personal data is never retained in plain text or logged to external third parties.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                <span>Deterministic regex PII redaction (email, phone, IP, usernames)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                <span>Sanitized-only text persistence in local database</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                <span>SQLAlchemy ORM supporting SQLite and production PostgreSQL</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technology Stack Specifications */}
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Server className="h-4 w-4 text-primary" />
              <span>Full-Stack Architecture & Technology Stack</span>
            </CardTitle>
            <CardDescription className="text-xs">
              Engineered with modern decoupled services for scalability and edge redundancy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-muted/40 border border-border/50 space-y-1">
                <span className="font-semibold text-foreground">Machine Learning</span>
                <p className="text-muted-foreground">PyTorch, Hugging Face Transformers, RoBERTa sequence classification, VADER sentiment</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border/50 space-y-1">
                <span className="font-semibold text-foreground">Backend Services</span>
                <p className="text-muted-foreground">Python 3.9+, FastAPI, Pydantic v2 strict schemas, Uvicorn ASGI server</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border/50 space-y-1">
                <span className="font-semibold text-foreground">Database & Storage</span>
                <p className="text-muted-foreground">SQLAlchemy ORM, SQLite (local) / PostgreSQL (cloud), JSON dense vector store</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border/50 space-y-1">
                <span className="font-semibold text-foreground">Frontend Platform</span>
                <p className="text-muted-foreground">Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border/50 space-y-1">
                <span className="font-semibold text-foreground">Visualization</span>
                <p className="text-muted-foreground">Recharts real-time responsive analytics, Lucide UI icons</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/40 border border-border/50 space-y-1">
                <span className="font-semibold text-foreground">Edge Redundancy</span>
                <p className="text-muted-foreground">Seamless zero-downtime serverless analyzer fallbacks for serverless deployments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Direct Action Hub */}
        <div className="text-center pt-4 space-y-4">
          <h3 className="text-xl font-bold text-foreground">Experience the System</h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="default" className="font-semibold gap-1.5 h-10 px-6">
              <Link href="/detect">
                <Brain className="h-4 w-4" />
                <span>Launch Detector</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="default" className="font-semibold gap-1.5 h-10 px-6">
              <Link href="/dashboard">
                <Activity className="h-4 w-4" />
                <span>Live Analytics Dashboard</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="default" className="font-semibold gap-1.5 h-10 px-6">
              <a href="#contact">
                <span>Contact &rarr;</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
