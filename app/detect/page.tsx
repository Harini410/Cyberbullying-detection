"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  ArrowLeft,
  Brain,
  AlertTriangle,
  CheckCircle,
  Loader2,
  MessageSquare,
  BookOpen,
  Activity,
  AlertOctagon,
  LifeBuoy,
  FileText
} from "lucide-react"
import Link from "next/link"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { motion, AnimatePresence } from "framer-motion"

interface DocumentSource {
  chunk_id: string
  text: string
  source: string
  title: string
  category: string
  score?: number
}

interface AgentTraceItem {
  agent: string
  status: string
  latency_ms: number
  summary?: string
}

interface AnalysisResult {
  request_id: string
  prediction: {
    label: string
    confidence: number
    probabilities: {
      cyberbullying?: number
      non_bullying?: number
    }
    model_name?: string
    model_version?: string
  }
  affective_analysis: {
    sentiment: {
      sentiment: string
      score: number
      details?: {
        compound?: number
        positive?: number
        neutral?: number
        negative?: number
      }
    }
    emotions: Array<{
      label: string
      score: number
    }>
  }
  context: {
    sarcasm_detected?: boolean
    threat_detected?: boolean
    high_aggression_signals?: boolean
    llm_nuance_assessment?: string
  }
  risk: {
    level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
    score: number
    reasons: string[]
  }
  explanation: string
  recommendations: string[]
  sources: DocumentSource[]
  agent_trace: AgentTraceItem[]
  latency_ms: number
}

export default function DetectPage() {
  const [text, setText] = useState("")
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    setIsLoading(true)
    setErrorMsg(null)
    setResult(null)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          include_trace: true,
        }),
      })

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (err: any) {
      console.error("Analysis request failed:", err)
      setErrorMsg("Failed to connect to analysis engine. Ensure backend is running.")
    } finally {
      setIsLoading(false)
    }
  }

  const emotionChartData = result
    ? result.affective_analysis.emotions.map((e) => ({
        name: e.label.charAt(0).toUpperCase() + e.label.slice(1),
        value: Math.round(e.score * 100),
      }))
    : []

  const isBullying = result?.prediction.label === "cyberbullying"

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case "CRITICAL":
        return "bg-red-600 text-white hover:bg-red-700"
      case "HIGH":
        return "bg-orange-500 text-white hover:bg-orange-600"
      case "MEDIUM":
        return "bg-yellow-500 text-black hover:bg-yellow-600"
      default:
        return "bg-emerald-600 text-white hover:bg-emerald-700"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex items-center justify-between pb-2">
          <Button asChild variant="ghost" size="sm" className="text-xs font-semibold gap-1.5 h-8 text-muted-foreground hover:text-foreground">
            <Link href="/">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="text-xs font-semibold gap-1.5 h-8">
            <Link href="/dashboard">
              <Activity className="h-3.5 w-3.5 text-primary" />
              <span>Dashboard</span>
            </Link>
          </Button>
        </div>
        <div className="space-y-8">
          {/* Page Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-2">
              <Brain className="h-3.5 w-3.5" />
              RoBERTa Transformer + Multi-Agent Orchestration + RAG
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
              Cyberbullying Detection & Deep Analysis
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Inspect messages using real-time RoBERTa sequence classification, affective emotion profiling,
              deterministic risk scoring, and verified RAG safety knowledge retrieval.
            </p>
          </div>

          {/* Input Form */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Brain className="h-5 w-5 text-primary" />
                Message Inspection
              </CardTitle>
              <CardDescription>
                Type or paste content to evaluate risk, emotions, and policy compliance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Active Model Indicator */}
                <div className="rounded-xl border border-primary/25 bg-primary/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-3.5 w-3.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-foreground text-sm sm:text-base">RoBERTa — Active Primary Model</span>
                        <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] uppercase font-semibold px-2 py-0.5">
                          Live Primary Model
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Deep bidirectional sequence classifier with multi-agent affective & RAG grounding.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-foreground">Message Content</label>
                    <span className="text-xs text-muted-foreground">{text.length}/1000 characters</span>
                  </div>
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter the message you want to evaluate for harassment, threats, or cyberbullying..."
                    className="min-h-32 resize-none text-base focus:ring-2 focus:ring-primary/30"
                    maxLength={1000}
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 text-sm rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
                    {errorMsg}
                  </div>
                )}

                <Button type="submit" disabled={!text.trim() || isLoading} className="w-full h-12 text-base font-semibold">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Analyzing with RoBERTa & 7-Agent Pipeline...
                    </>
                  ) : (
                    "Analyze Message with CyberSafe AI"
                  )}
                </Button>
              </form>

              {/* Sample Texts */}
              <div className="pt-3 border-t border-border">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Try Sample Cases:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start text-xs text-left h-auto py-2 px-3 truncate bg-transparent"
                    onClick={() => setText("You are worthless and nobody likes you.")}
                  >
                    ⚠️ "You are worthless and nobody likes you."
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start text-xs text-left h-auto py-2 px-3 truncate bg-transparent"
                    onClick={() => setText("Great job on your presentation! You did amazing work.")}
                  >
                    ✅ "Great job on your presentation! You did amazing work."
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Results Display */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Top Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Primary RoBERTa Prediction */}
                  <Card className="border-border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-primary flex items-center justify-between">
                        <span>RoBERTa — Active Primary Model</span>
                        <Badge variant="outline" className="text-[10px] text-emerald-600 border-emerald-500/40 font-semibold">
                          Active Primary Model
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        {isBullying ? (
                          <AlertTriangle className="h-6 w-6 text-destructive" />
                        ) : (
                          <CheckCircle className="h-6 w-6 text-emerald-500" />
                        )}
                        <span className="text-xl font-bold">
                          {isBullying ? "Cyberbullying Detected" : "Safe Content"}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground font-medium">
                          <span>Confidence Score</span>
                          <span>{Math.round(result.prediction.confidence * 100)}%</span>
                        </div>
                        <Progress value={result.prediction.confidence * 100} className="h-2" />
                      </div>
                      <div className="text-xs text-muted-foreground pt-1 border-t border-border/60 flex justify-between">
                        <span>Active Model: {result.prediction.model_name || "RoBERTa — Active Primary Model"}</span>
                        <span>{result.latency_ms}ms</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Risk Tier */}
                  <Card className="border-border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Threat & Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge className={`text-sm px-3 py-1 font-bold ${getRiskBadgeColor(result.risk.level)}`}>
                          {result.risk.level} RISK
                        </Badge>
                        <span className="text-xs font-mono text-muted-foreground">Score: {result.risk.score} / 1.0</span>
                      </div>
                      <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                        {result.risk.reasons.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Affective Sentiment Polarity */}
                  <Card className="border-border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Affective Polarity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold capitalize text-foreground">
                          {result.affective_analysis.sentiment.sentiment} Sentiment
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {Math.round(result.affective_analysis.sentiment.score * 100)}% intensity
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>Compound: {result.affective_analysis.sentiment.details?.compound}</div>
                        <div>Negative: {Math.round((result.affective_analysis.sentiment.details?.negative || 0) * 100)}%</div>
                        <div>Positive: {Math.round((result.affective_analysis.sentiment.details?.positive || 0) * 100)}%</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Second Row: Emotions Chart & Grounded Explanation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Emotional Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        Affective Emotional Distribution
                      </CardTitle>
                      <CardDescription>Anger, fear, sadness, neutral, and joy intensities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={emotionChartData}>
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                            <Tooltip formatter={(val) => [`${val}%`, "Intensity"]} />
                            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Grounded Explanation */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        Explainable AI Analysis
                      </CardTitle>
                      <CardDescription>Model reasoning synthesized by ExplanationAgent</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm leading-relaxed text-foreground bg-muted/30 p-3 rounded-lg border border-border/50">
                        {result.explanation}
                      </p>
                      {result.context.llm_nuance_assessment && (
                        <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                          <span className="font-semibold text-foreground">Nuance & Threat Signals: </span>
                          {result.context.llm_nuance_assessment}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Third Row: Safety Recommendations & RAG Sources */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <LifeBuoy className="h-5 w-5 text-primary" />
                        Recommended Safety Actions
                      </CardTitle>
                      <CardDescription>Actionable protocols for victims and moderators</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2.5">
                        {result.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="text-foreground">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Grounding RAG Knowledge Sources */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        Retrieved RAG Sources
                      </CardTitle>
                      <CardDescription>Verified knowledge documents cited by RAGAgent</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {result.sources.length === 0 ? (
                        <p className="text-xs text-muted-foreground">No specific reference chunks required.</p>
                      ) : (
                        result.sources.map((src, i) => (
                          <div key={i} className="p-2.5 rounded-lg bg-muted/40 border border-border/60 text-xs space-y-1">
                            <div className="flex justify-between items-center font-medium">
                              <span className="text-primary font-semibold">{src.title}</span>
                              <Badge variant="outline" className="text-[10px]">
                                {Math.round((src.score || 0) * 100)}% match
                              </Badge>
                            </div>
                            <p className="text-muted-foreground line-clamp-2">{src.text}</p>
                            <div className="text-[10px] text-muted-foreground font-mono">Source: {src.source}</div>
                          </div>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Multi-Agent Latency & Execution Trace */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Activity className="h-4 w-4 text-primary" />
                      Multi-Agent Pipeline Execution Trace
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Telemetry for all 7 autonomous agents in sequence (Total Pipeline: {result.latency_ms}ms)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                      {result.agent_trace.map((t, idx) => (
                        <div key={idx} className="p-2 rounded bg-muted/30 border border-border/50 text-center space-y-1">
                          <div className="text-xs font-semibold text-foreground truncate">{t.agent.replace("Agent", "")}</div>
                          <Badge variant="secondary" className="text-[10px] py-0 px-1 font-mono">
                            {t.latency_ms}ms
                          </Badge>
                          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">✓ {t.status}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Call to Action: Connect with Chatbot */}
                <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 via-background to-primary/5 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <h3 className="font-bold text-lg text-foreground">Have questions about this classification?</h3>
                    <p className="text-sm text-muted-foreground">
                      Ask CyberSafe AI assistant to explain the model's logic, query reporting policies, or discuss safe next steps.
                    </p>
                  </div>
                  <Button asChild size="lg" className="shrink-0 gap-2">
                    <Link href={`/chat?analysis_id=${result.request_id}`}>
                      <MessageSquare className="h-4 w-4" />
                      Chat with CyberSafe AI
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
