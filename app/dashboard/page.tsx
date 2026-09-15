"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  ArrowLeft,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Brain,
  Trash2,
  RefreshCw,
  Activity,
  Layers,
  ArrowRight,
  Sparkles,
  Lock
} from "lucide-react"
import Link from "next/link"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { motion } from "framer-motion"

interface AnalysisItem {
  id: string
  request_id: string
  sanitized_text: string
  label: string
  confidence: number
  risk_level: string
  risk_score: number
  explanation?: string
  created_at?: string
}

interface AnalyticsData {
  total_messages: number
  cyberbullying_count: number
  safe_count: number
  cyberbullying_ratio: number
  safe_ratio: number
  risk_breakdown: {
    LOW: number
    MEDIUM: number
    HIGH: number
    CRITICAL: number
  }
}

export default function DashboardPage() {
  const [analyses, setAnalyses] = useState<AnalysisItem[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    total_messages: 0,
    cyberbullying_count: 0,
    safe_count: 0,
    cyberbullying_ratio: 0.0,
    safe_ratio: 0.0,
    risk_breakdown: { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 },
  })
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [analysesRes, analyticsRes] = await Promise.all([
        fetch("/api/analyses"),
        fetch("/api/analytics"),
      ])

      if (analysesRes.ok) {
        const analysesData = await analysesRes.json()
        if (Array.isArray(analysesData)) {
          setAnalyses(analysesData)
        }
      }

      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json()
        if (analyticsData && typeof analyticsData.total_messages === "number") {
          setAnalytics(analyticsData)
        }
      }
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      const res = await fetch(`/api/analyses/${id}`, { method: "DELETE" })
      if (res.ok) {
        // Optimistically remove from list
        setAnalyses((prev) => prev.filter((item) => item.id !== id && item.request_id !== id))
        // Refresh analytics summary
        const analyticsRes = await fetch("/api/analytics")
        if (analyticsRes.ok) {
          const freshAnalytics = await analyticsRes.json()
          setAnalytics(freshAnalytics)
        }
      }
    } catch (error) {
      console.error("Failed to delete analysis record:", error)
    } finally {
      setDeletingId(null)
    }
  }

  // Chart data from real backend analytics
  const pieData = [
    { name: "Safe Content", value: analytics.safe_count, color: "#10b981" },
    { name: "Cyberbullying", value: analytics.cyberbullying_count, color: "#ef4444" },
  ]

  const riskChartData = [
    { name: "Low", count: analytics.risk_breakdown.LOW || 0, fill: "#10b981" },
    { name: "Medium", count: analytics.risk_breakdown.MEDIUM || 0, fill: "#eab308" },
    { name: "High", count: analytics.risk_breakdown.HIGH || 0, fill: "#f97316" },
    { name: "Critical", count: analytics.risk_breakdown.CRITICAL || 0, fill: "#ef4444" },
  ]

  const getRiskBadgeColor = (level: string) => {
    switch (level?.toUpperCase()) {
      case "CRITICAL":
        return "bg-red-600 text-white"
      case "HIGH":
        return "bg-orange-500 text-white"
      case "MEDIUM":
        return "bg-yellow-500 text-black"
      default:
        return "bg-emerald-600 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-1">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>PRODUCTION TELEMETRY & PERSISTENCE</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Analytics & Telemetry Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Real-time evaluation statistics, risk breakdown, and audit log stored in local database.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button asChild variant="ghost" size="sm" className="text-xs font-semibold gap-1.5 h-9">
              <Link href="/">
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Home</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchData}
              disabled={isLoading}
              className="text-xs font-semibold gap-1.5 h-9"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </Button>
            <Button asChild size="sm" className="text-xs font-semibold gap-1.5 h-9">
              <Link href="/detect">
                <Brain className="h-3.5 w-3.5" />
                <span>Launch Detector</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* 4 Key Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="border-border/70 shadow-xs">
            <CardHeader className="pb-2 space-y-1">
              <CardDescription className="text-xs uppercase font-medium tracking-wider">
                Total Evaluated
              </CardDescription>
              <CardTitle className="text-3xl font-extrabold text-foreground">
                {analytics.total_messages.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-primary" />
                <span>Messages processed by pipeline</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 shadow-xs">
            <CardHeader className="pb-2 space-y-1">
              <CardDescription className="text-xs uppercase font-medium tracking-wider text-destructive">
                Cyberbullying Flagged
              </CardDescription>
              <CardTitle className="text-3xl font-extrabold text-destructive">
                {analytics.cyberbullying_count.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground flex items-center justify-between">
                <span>Threat Ratio:</span>
                <span className="font-semibold text-destructive">{analytics.cyberbullying_ratio}%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 shadow-xs">
            <CardHeader className="pb-2 space-y-1">
              <CardDescription className="text-xs uppercase font-medium tracking-wider text-emerald-600">
                Safe Messages
              </CardDescription>
              <CardTitle className="text-3xl font-extrabold text-emerald-600">
                {analytics.safe_count.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground flex items-center justify-between">
                <span>Safe Ratio:</span>
                <span className="font-semibold text-emerald-600">{analytics.safe_ratio}%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 shadow-xs">
            <CardHeader className="pb-2 space-y-1">
              <CardDescription className="text-xs uppercase font-medium tracking-wider">
                Active Architecture
              </CardDescription>
              <CardTitle className="text-xl font-bold text-primary pt-1">
                RoBERTa + 7 Agents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-emerald-600" />
                <span>PII Redacted & Vector RAG</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Tier Distribution Bar Chart */}
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-primary" />
                <span>Threat & Risk Tier Breakdown</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Distribution across Low, Medium, High, and Critical risk tiers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={riskChartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis allowDecimals={false} fontSize={12} />
                    <Tooltip
                      formatter={(val: any) => [`${val} messages`, "Count"]}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {riskChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Content Ratio Pie Chart */}
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <PieChart className="h-4 w-4 text-primary" />
                <span>Content Classification Ratio</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Safe content vs cyberbullying classifications in database history.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analytics.total_messages === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center p-4">
                  <Activity className="h-10 w-10 text-muted-foreground/50 mb-2" />
                  <p className="text-sm font-medium text-muted-foreground">No evaluation records logged yet.</p>
                  <p className="text-xs text-muted-foreground/80 mt-1">
                    Run your first test on the Detect page to populate live statistics.
                  </p>
                </div>
              ) : (
                <div className="h-64 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData.filter((d) => d.value > 0)}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`pie-cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(val: any) => [`${val} messages`, "Total"]}
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Analysis History Table with Real Deletion */}
        <Card className="border-border/70 shadow-xs">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Lock className="h-4 w-4 text-emerald-600" />
                <span>Recent Analysis Audit Log</span>
              </CardTitle>
              <CardDescription className="text-xs">
                Persisted historical records with sanitized text (PII redacted) and deletion capabilities.
              </CardDescription>
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              Showing {analyses.length} recent records
            </span>
          </CardHeader>
          <CardContent>
            {analyses.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle className="h-10 w-10 text-muted-foreground/40 mx-auto" />
                <h3 className="text-base font-semibold text-foreground">No Analysis Records Found</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Evaluate messages using the RoBERTa multi-agent pipeline to see persistent logs appear here.
                </p>
                <Button asChild size="sm" className="mt-2">
                  <Link href="/detect">Go to Detect Page</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {analyses.map((item) => {
                  const isBullying = item.label === "cyberbullying"
                  const confPct = Math.round(item.confidence * 100)
                  return (
                    <motion.div
                      key={item.id || item.request_id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 rounded-xl border border-border/70 hover:border-primary/40 bg-card/60 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={isBullying ? "destructive" : "secondary"} className="text-[11px] font-semibold">
                            {isBullying ? "Cyberbullying" : "Safe Content"}
                          </Badge>
                          <Badge className={`text-[10px] uppercase font-bold ${getRiskBadgeColor(item.risk_level)}`}>
                            {item.risk_level} RISK
                          </Badge>
                          <span className="text-xs font-mono text-muted-foreground">
                            Conf: {confPct}%
                          </span>
                          {item.created_at && (
                            <span className="text-[11px] text-muted-foreground font-mono">
                              &bull; {new Date(item.created_at).toLocaleString()}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-mono text-foreground bg-muted/40 p-2 rounded border border-border/40 truncate max-w-2xl">
                          "{item.sanitized_text}"
                        </p>
                        {item.explanation && (
                          <p className="text-[11px] text-muted-foreground line-clamp-1">
                            {item.explanation}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={deletingId === item.id}
                          onClick={() => handleDelete(item.id)}
                          className="h-8 px-2.5 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          title="Delete from database"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="ml-1 hidden sm:inline">Delete</span>
                        </Button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
