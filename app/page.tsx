"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Brain,
  Cpu,
  Database,
  Lock,
  ArrowRight,
  Sparkles,
  Bot,
  Activity,
  CheckCircle2,
  Terminal,
  Server,
  Layers,
  Search,
  MessageSquare,
  AlertTriangle,
  HeartHandshake,
  TrendingUp,
  FileCode2,
  Zap,
  CheckCircle,
  Mail
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const PIPELINE_STEPS = [
  {
    step: "01",
    name: "Detection Agent",
    role: "RoBERTa Sequence Classifier",
    description: "Executes deep bidirectional transformer classification on the 512-token input sequence for hostility and cyberbullying.",
    icon: Brain,
    latency: "~ 35ms",
    highlight: true,
  },
  {
    step: "02",
    name: "Emotion Agent",
    role: "5-Dimension Affective NLP",
    description: "Computes 5-dimension emotional distribution (Anger, Fear, Sadness, Neutral, Joy) alongside VADER compound sentiment polarity.",
    icon: Activity,
    latency: "~ 12ms",
  },
  {
    step: "03",
    name: "Context Agent",
    role: "Nuance & Sarcasm Assessment",
    description: "Evaluates covert toxicity, uppercase shouting cues, hostility markers, and threat indicators.",
    icon: Search,
    latency: "~ 10ms",
  },
  {
    step: "04",
    name: "Risk Agent",
    role: "Deterministic Risk Tiering",
    description: "Synthesizes classifier confidence, affective intensity, and threat signals into a calibrated 4-tier risk score (LOW to CRITICAL).",
    icon: AlertTriangle,
    latency: "< 2ms",
  },
  {
    step: "05",
    name: "RAG Agent",
    role: "Dense Knowledge Retrieval",
    description: "Queries persistent vector store via MiniLM embeddings to retrieve verified platform safety guidelines and evidence protocols.",
    icon: Database,
    latency: "~ 18ms",
  },
  {
    step: "06",
    name: "Explanation Agent",
    role: "Explainable AI Synthesis",
    description: "Synthesizes transparent, human-readable explanations detailing exactly why content was flagged without black-box opacity.",
    icon: Sparkles,
    latency: "~ 20ms",
  },
  {
    step: "07",
    name: "Response Agent",
    role: "Actionable Safety Protocols",
    description: "Generates step-by-step guidance for victims and moderators, including evidence preservation and platform reporting procedures.",
    icon: Shield,
    latency: "~ 8ms",
  },
]

const SYSTEM_CAPABILITIES = [
  {
    icon: Brain,
    title: "RoBERTa — Active Primary Model",
    badge: "Active Live Model",
    description: "Fine-tuned deep bidirectional transformer engineered for high-precision sequence classification of cyberbullying and online hostility.",
    specs: ["Sequence length: 512 tokens", "CardiffNLP twitter-roberta base", "Calibrated probability outputs", "Sub-100ms multi-agent DAG latency"]
  },
  {
    icon: Layers,
    title: "Autonomous Multi-Agent Architecture",
    badge: "7 Autonomous Agents",
    description: "Stateful agentic orchestration coordinating detection, affect, context, risk, RAG retrieval, and explanation in an asynchronous DAG.",
    specs: ["Asynchronous task chaining", "Typed CyberbullyingState schema", "Individual agent latency profiling", "Fault-tolerant fallback paths"]
  },
  {
    icon: Activity,
    title: "Affective Emotion & Sentiment Vector",
    badge: "5 Emotional Classes",
    description: "Granular emotional profiling distinguishing anger, fear, sadness, neutral, and joy alongside VADER compound sentiment.",
    specs: ["Multi-class probability distribution", "Hostile emotional surge detection", "Sarcasm & tone divergence flags", "Psychological distress indicators"]
  },
  {
    icon: Database,
    title: "Dense Vector RAG Knowledge Base",
    badge: "MiniLM Cosine Similarity",
    description: "Grounding moderation and chatbot responses in verified literature on digital civility, evidence preservation, and crisis hotlines.",
    specs: ["all-MiniLM-L6-v2 embeddings", "Exact dot-product cosine ranking", "Chunked markdown knowledge docs", "Citations in every API response"]
  },
  {
    icon: Shield,
    title: "Enterprise Privacy & Security",
    badge: "PII Redacted + Anti-Jailbreak",
    description: "Zero raw PII storage, regex identity anonymization, input sanitization, and adversarial prompt injection interception.",
    specs: ["Email, phone, IP & URL redaction", "Heuristic prompt injection shields", "SQLite local encrypted persistence", "Zero data leak to external third parties"]
  },
  {
    icon: Server,
    title: "Production Full-Stack Engineering",
    badge: "FastAPI + Next.js Edge",
    description: "Decoupled architecture pairing a high-throughput Python FastAPI backend with a Next.js App Router frontend and serverless fallbacks.",
    specs: ["Pydantic v2 strict typing", "Zero-downtime Vercel fallback", "Sub-100ms pipeline execution", "Standardized REST endpoints"]
  }
]

export default function HomePage() {
  const [activePipelineStep, setActivePipelineStep] = useState(1)

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 border-b border-border/60">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Top Product Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 border border-primary/25 text-primary shadow-sm"
            >
              <Cpu className="h-3.5 w-3.5 animate-pulse" />
              <span>PRODUCTION MULTI-AGENT ARCHITECTURE &bull; FULL-STACK AI SYSTEM</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-5xl leading-[1.12]"
            >
              CyberSafe AI —{" "}
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                Agentic AI-Powered
              </span>{" "}
              Cyberbullying Detection Platform
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed"
            >
              An enterprise-grade, privacy-preserving AI software system orchestrating an autonomous{" "}
              <strong className="text-foreground font-semibold">7-agent pipeline</strong>, fine-tuned{" "}
              <strong className="text-foreground font-semibold">RoBERTa transformer inference</strong>,{" "}
              dense <strong className="text-foreground font-semibold">RAG knowledge retrieval</strong>, real-time affective risk matrices, and global conversational safety support.
            </motion.p>

            {/* Tech Stack Pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-2 pt-2 max-w-3xl"
            >
              {[
                "FastAPI (Python 3.9+)",
                "RoBERTa Transformer Active",
                "Next.js 16 (App Router)",
                "7-Agent Orchestrator",
                "MiniLM Dense Vector RAG",
                "Differential Privacy & PII Redaction",
                "Zero-Downtime Fallback"
              ].map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-muted/70 text-muted-foreground border border-border/70"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* Core Action Hub: Test the Multi-Agent Detection Pipeline in Real Time (UP in Home) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="w-full max-w-4xl pt-6 pb-2 text-center space-y-4"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>CENTRAL APPLICATION HUB</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                  Test the Multi-Agent Detection Pipeline in Real Time
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Evaluate realistic sample texts, inspect the full 7-agent trace, observe affective distribution, and test the persistent AI assistant copilot.
                </p>
              </div>

              {/* Direct Navigation Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <Button asChild size="lg" className="h-11 sm:h-12 px-7 text-sm font-semibold shadow-lg shadow-primary/20 gap-2">
                  <Link href="/detect">
                    <Brain className="h-4 w-4" />
                    <span>Launch Detector</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-11 sm:h-12 px-6 text-sm font-semibold border-border/80 hover:bg-muted/50 gap-2">
                  <Link href="/dashboard">
                    <Activity className="h-4 w-4 text-primary" />
                    <span>Analytics Dashboard</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-11 sm:h-12 px-6 text-sm font-semibold border-border/80 hover:bg-muted/50 gap-2">
                  <Link href="/about">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>About the System</span>
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* 3 Core Architectural Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full pt-4 text-left"
            >
              {/* Card 1: AI Detection */}
              <Card className="group relative flex flex-col justify-between border-border/80 hover:border-primary/50 transition-all duration-200 hover:shadow-xl hover:shadow-primary/5 bg-card/90 backdrop-blur-sm p-1 cursor-pointer">
                <CardHeader className="space-y-2.5 pb-3">
                  <div className="h-11 w-11 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <Badge variant="outline" className="text-[10px] uppercase font-mono border-primary/30 text-primary">Active Live Model</Badge>
                    <CardTitle className="text-lg font-bold text-foreground">RoBERTa Detection</CardTitle>
                  </div>
                  <CardDescription className="text-xs leading-relaxed text-muted-foreground">
                    Deep bidirectional sequence classification analyzing 512-token context windows for subtle cyberbullying nuances and harassment.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild className="w-full text-xs font-semibold gap-1.5 h-10 shadow-xs">
                    <Link href="/detect">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <span>Launch Detector</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Card 2: Autonomous Multi-Agent DAG */}
              <Card className="group relative flex flex-col justify-between border-border/80 hover:border-blue-500/50 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/5 bg-card/90 backdrop-blur-sm p-1 cursor-pointer">
                <CardHeader className="space-y-2.5 pb-3">
                  <div className="h-11 w-11 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-500 group-hover:scale-105 transition-transform">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <Badge variant="outline" className="text-[10px] uppercase font-mono border-blue-500/30 text-blue-500">7 Autonomous Agents</Badge>
                    <CardTitle className="text-lg font-bold text-foreground">Multi-Agent DAG</CardTitle>
                  </div>
                  <CardDescription className="text-xs leading-relaxed text-muted-foreground">
                    Stateful orchestration coordinating PII sanitization, RoBERTa inference, affect NLP, context nuance, and deterministic risk scoring.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild variant="outline" className="w-full text-xs font-semibold gap-1.5 h-10 border-border/80 hover:bg-muted/50 hover:text-foreground">
                    <Link href="/dashboard">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <span>Open Dashboard &rarr;</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Card 3: Privacy & RAG Knowledge */}
              <Card className="group relative flex flex-col justify-between border-border/80 hover:border-emerald-500/50 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-500/5 bg-card/90 backdrop-blur-sm p-1 cursor-pointer">
                <CardHeader className="space-y-2.5 pb-3">
                  <div className="h-11 w-11 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-500 group-hover:scale-105 transition-transform">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <Badge variant="outline" className="text-[10px] uppercase font-mono border-emerald-500/30 text-emerald-500">Zero-Leakage Privacy</Badge>
                    <CardTitle className="text-lg font-bold text-foreground">Privacy & Grounding</CardTitle>
                  </div>
                  <CardDescription className="text-xs leading-relaxed text-muted-foreground">
                    Automatic regex redaction for all personally identifiable info paired with dense vector RAG knowledge retrieval and prompt injection shields.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild variant="outline" className="w-full text-xs font-semibold gap-1.5 h-10 border-border/80 hover:bg-muted/50 hover:text-foreground">
                    <Link href="/about">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <span>About the System &rarr;</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Real-Time Live Architecture Simulation Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            id="pipeline"
            className="mt-12 rounded-2xl border border-border/80 bg-card/80 p-5 md:p-7 shadow-2xl backdrop-blur-sm"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-5 border-b border-border/60">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  cybersafe-pipeline-orchestrator.ts &bull; live inference telemetry
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] font-mono border-emerald-500/40 text-emerald-600 bg-emerald-500/10">
                  HEALTHY &bull; 0.0% ERROR
                </Badge>
                <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary">
                  TOTAL PIPELINE: 78ms
                </Badge>
              </div>
            </div>

            {/* Simulated Live Processing Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
              {/* Box 1: Input Sample */}
              <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                  <span>Input Ingestion</span>
                  <span className="text-emerald-600 font-mono">Sanitized</span>
                </div>
                <div className="text-xs font-mono text-foreground bg-background/80 p-2.5 rounded border border-border/40">
                  "You are worthless and nobody likes you."
                </div>
                <div className="text-[10px] text-muted-foreground flex justify-between">
                  <span>PII Check: Clean (0 hits)</span>
                  <span>Tokens: 8</span>
                </div>
              </div>

              {/* Box 2: RoBERTa Classification */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/25 space-y-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-primary flex items-center justify-between">
                  <span>RoBERTa Primary Model</span>
                  <Badge className="bg-destructive text-white text-[9px] h-4">Cyberbullying</Badge>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between font-mono">
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className="font-bold text-destructive">75.6%</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-bold text-emerald-600">Active</span>
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-muted-foreground pt-1">
                    <span>Dominant Affect:</span>
                    <span className="text-foreground">Anger (31.2%)</span>
                  </div>
                </div>
              </div>

              {/* Box 3: Agentic Synthesis & RAG */}
              <div className="p-4 rounded-xl bg-muted/40 border border-border/60 space-y-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                  <span>Agentic Risk & Grounding</span>
                  <Badge className="bg-orange-500 text-white text-[9px] h-4">MEDIUM RISK</Badge>
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">
                  XAI Explanation: Hostile lexical patterns detected. RAG cited platform evidence preservation protocol.
                </p>
                <div className="text-[10px] text-primary flex items-center gap-1 font-mono pt-1">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>7 Agents Executed Sequentially</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Visual Explanation of the Multi-Agent Pipeline */}
      <section id="pipeline" className="py-20 px-4 bg-muted/30 border-b border-border/60">
        <div className="container mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              <Layers className="h-3.5 w-3.5" />
              <span>AGENTIC EXECUTION FLOW</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Concise Visual Architecture: The 7-Agent Autonomous Pipeline
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Every message passes through a deterministic, high-throughput multi-agent DAG that decouples detection, affect, contextual threat, deterministic risk gating, and verified RAG knowledge.
            </p>
          </div>

          {/* Pipeline Diagram Flow Strip */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 md:p-8 shadow-sm space-y-6">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center justify-between">
              <span>Interactive Pipeline Diagram (Click any step to inspect responsibilities)</span>
              <span className="font-mono text-primary">Total SLA: &lt; 100ms</span>
            </div>

            {/* Horizontal flow line of icons */}
            <div className="overflow-x-auto pb-3">
              <div className="flex items-center justify-between min-w-[760px] gap-2">
                {PIPELINE_STEPS.map((item, idx) => {
                  const Icon = item.icon
                  const isSelected = activePipelineStep === idx + 1
                  return (
                    <React.Fragment key={item.step}>
                      <button
                        onClick={() => setActivePipelineStep(idx + 1)}
                        className={`flex flex-col items-center gap-2 p-2.5 rounded-xl transition-all duration-200 group text-center shrink-0 w-20 sm:w-24 ${
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-md scale-105"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div
                          className={`h-10 w-10 rounded-lg flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-primary-foreground/20 text-primary-foreground"
                              : "bg-muted/80 text-foreground group-hover:bg-primary/10 group-hover:text-primary"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-[11px] font-bold leading-none truncate max-w-full">
                          {item.name.replace(" Agent", "")}
                        </span>
                        <span className="text-[9px] opacity-80 font-mono">
                          {item.step}
                        </span>
                      </button>

                      {idx < PIPELINE_STEPS.length - 1 && (
                        <div className="h-0.5 w-6 bg-border/80 shrink-0 relative">
                          <span className="absolute -top-1 right-0 text-[8px] text-muted-foreground">▶</span>
                        </div>
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
            </div>

            {/* Selected Step Deep Dive Card */}
            {(() => {
              const current = PIPELINE_STEPS[activePipelineStep - 1]
              const Icon = current.icon
              return (
                <div className="p-5 rounded-xl border border-primary/30 bg-primary/5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-foreground text-base">Stage {current.step}: {current.name}</span>
                          <Badge variant="outline" className="text-[10px] font-semibold text-primary border-primary/40">
                            {current.role}
                          </Badge>
                          {current.highlight && (
                            <Badge className="bg-emerald-600 text-white text-[10px]">Active Live</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{current.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                      <span className="text-xs text-muted-foreground font-mono">Expected Latency:</span>
                      <Badge variant="secondary" className="font-mono text-xs">{current.latency}</Badge>
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* Pipeline Text Formula */}
            <div className="p-3 rounded-lg bg-muted/40 border border-border/60 text-center font-mono text-xs text-foreground flex flex-wrap items-center justify-center gap-1.5">
              <span className="font-semibold text-primary">Detection Agent</span>
              <span>→</span>
              <span className="font-semibold text-primary">Emotion Agent</span>
              <span>→</span>
              <span>Context Agent</span>
              <span>→</span>
              <span>Risk Agent</span>
              <span>→</span>
              <span>RAG Agent</span>
              <span>→</span>
              <span>Explanation Agent</span>
              <span>→</span>
              <span className="font-semibold text-primary">Response Agent</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Software Engineering Capabilities */}
      <section id="capabilities" className="py-20 px-4 border-b border-border/60">
        <div className="container mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              <Cpu className="h-3.5 w-3.5" />
              <span>PRODUCTION-ORIENTED CAPABILITIES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Real AI Software Engineering & Systems Integration
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Engineered beyond simple wrapper scripts. Built with real asynchronous micro-services, transformer sequence modeling, vector retrieval, and zero-downtime edge redundancy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SYSTEM_CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon
              return (
                <Card key={i} className="border-border/70 hover:border-primary/50 transition-all duration-200 hover:shadow-md flex flex-col justify-between">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="secondary" className="text-[10px] font-mono">
                        {cap.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{cap.title}</CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {cap.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="border-t border-border/50 pt-3 space-y-1.5">
                      {cap.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. Full-Stack System Architecture & API Gating */}
      <section className="py-20 px-4 bg-muted/20 border-b border-border/60">
        <div className="container mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              <Server className="h-3.5 w-3.5" />
              <span>FULL-STACK ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Decoupled FastAPI Engine + Next.js Edge
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Production deployment architecture supporting both local Python execution and standalone Vercel deployments via resilient zero-downtime serverless analyzer fallbacks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Backend Architecture Card */}
            <Card className="border-border/80">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                  <Server className="h-4 w-4" />
                  <span>Backend Core & Machine Learning Engine</span>
                </div>
                <CardTitle className="text-xl">FastAPI + PyTorch + Transformers</CardTitle>
                <CardDescription>
                  High-throughput asynchronous service running on Python 3.9+ with persistent vector embeddings and conversation memory.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-xs font-mono">
                <div className="p-3.5 rounded-lg bg-background border border-border/60 space-y-2">
                  <div className="text-primary font-bold">API Routes Specification:</div>
                  <div className="text-muted-foreground space-y-1">
                    <div>POST /api/analyze &bull; 7-Agent DAG Pipeline</div>
                    <div>POST /api/detect  &bull; Raw RoBERTa sequence inference</div>
                    <div>POST /api/chat    &bull; LLM + RAG Grounded Copilot</div>
                    <div>POST /api/rag/search &bull; Dense MiniLM vector similarity</div>
                    <div>GET  /api/health  &bull; System uptime & model status</div>
                  </div>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>SQLite Conversation Memory</span>
                  <span className="text-foreground font-semibold">Enabled</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Vector Index Format</span>
                  <span className="text-foreground font-semibold">Dense Cosine MiniLM JSON</span>
                </div>
              </CardContent>
            </Card>

            {/* Frontend Edge Card */}
            <Card className="border-border/80">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                  <FileCode2 className="h-4 w-4" />
                  <span>Frontend Platform & Edge Fallback Engine</span>
                </div>
                <CardTitle className="text-xl">Next.js 16 + Turbopack + Tailwind</CardTitle>
                <CardDescription>
                  Modern App Router with client-side interactive telemetry, global floating assistant, and dual-mode resilient proxying.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-xs font-mono">
                <div className="p-3.5 rounded-lg bg-background border border-border/60 space-y-2">
                  <div className="text-primary font-bold">Edge Redundancy Strategy:</div>
                  <p className="text-muted-foreground leading-relaxed">
                    Proxy routes attempt the external FastAPI server with a 3.5s timeout. If unavailable (e.g. running standalone on Vercel), execution gracefully shifts to built-in TypeScript serverless analyzer engines with zero downtime.
                  </p>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Global Assistant Icon</span>
                  <span className="text-emerald-600 font-semibold">Mounted on All Pages</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Active Live Model</span>
                  <span className="text-foreground font-semibold">RoBERTa Active Model</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. Bottom Ready to Explore Call to Action */}
      <section className="py-16 px-4 border-t border-border/60">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Ready to Explore the Platform?
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Test live text samples, inspect the 7-agent DAG execution trace, or explore our complete system architecture.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="default" className="h-10 px-6 text-xs font-semibold shadow-sm">
              <Link href="/detect">Launch Detector</Link>
            </Button>
            <Button asChild variant="outline" size="default" className="h-10 px-6 text-xs font-semibold">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild variant="outline" size="default" className="h-10 px-6 text-xs font-semibold">
              <Link href="/about">About the System</Link>
            </Button>
            <Button asChild variant="ghost" size="default" className="h-10 px-6 text-xs font-semibold">
              <a href="#contact">Contact &rarr;</a>
            </Button>
          </div>

          <div className="pt-4 border-t border-border/40 max-w-lg mx-auto text-xs text-muted-foreground">
            RoBERTa (Active Live Model) is the sole active detection model powering live inference across the 7-agent pipeline.
          </div>
        </div>
      </section>
    </div>
  )
}
