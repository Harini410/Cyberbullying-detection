"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  ArrowLeft,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Brain,
  Users,
  Calendar,
  Database,
} from "lucide-react"
import Link from "next/link"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts"
import { motion } from "framer-motion"

// Mock data for dashboard
const pieData = [
  { name: "Safe Content", value: 78, color: "hsl(var(--chart-3))" },
  { name: "Cyberbullying", value: 22, color: "hsl(var(--chart-4))" },
]

const classDistributionData = [
  { name: "Religion", samples: 7998, color: "hsl(var(--chart-1))" },
  { name: "Age", samples: 7992, color: "hsl(var(--chart-2))" },
  { name: "Gender", samples: 7973, color: "hsl(var(--chart-3))" },
  { name: "Ethnicity", samples: 7961, color: "hsl(var(--chart-4))" },
  { name: "Not Cyberbullying", samples: 7945, color: "hsl(var(--chart-5))" },
  { name: "Other Cyberbullying", samples: 7823, color: "hsl(var(--destructive))" },
]

const timelineData = [
  { date: "Jan", safe: 120, bullying: 25 },
  { date: "Feb", safe: 135, bullying: 30 },
  { date: "Mar", safe: 148, bullying: 28 },
  { date: "Apr", safe: 162, bullying: 35 },
  { date: "May", safe: 175, bullying: 32 },
  { date: "Jun", safe: 188, bullying: 29 },
  { date: "Jul", safe: 195, bullying: 31 },
  { date: "Aug", safe: 210, bullying: 27 },
  { date: "Sep", safe: 225, bullying: 33 },
  { date: "Oct", safe: 240, bullying: 30 },
  { date: "Nov", safe: 255, bullying: 28 },
  { date: "Dec", safe: 268, bullying: 25 },
]

const modelBenchmarkData = [
  { name: "RNN", accuracy: 80, color: "hsl(var(--chart-1))" },
  { name: "LSTM", accuracy: 87, color: "hsl(var(--chart-2))" },
  { name: "GRU", accuracy: 88, color: "hsl(var(--chart-3))" },
  { name: "CNN", accuracy: 89, color: "hsl(var(--chart-5))" },
  { name: "Bi-LSTM", accuracy: 90, color: "hsl(var(--chart-4))" },
  { name: "RoBERTa", accuracy: 94, color: "hsl(var(--primary))", highlight: true },
]

const recentAnalyses = [
  {
    id: 1,
    text: "Great job on your presentation! You did amazing work.",
    prediction: "safe" as const,
    confidence: 92,
    timestamp: "2 minutes ago",
    model: "RoBERTa",
  },
  {
    id: 2,
    text: "You're so stupid and worthless. Nobody likes you.",
    prediction: "bullying" as const,
    confidence: 88,
    timestamp: "5 minutes ago",
    model: "Bi-LSTM",
  },
  {
    id: 3,
    text: "Looking forward to working together on this project.",
    prediction: "safe" as const,
    confidence: 95,
    timestamp: "12 minutes ago",
    model: "CNN",
  },
  {
    id: 4,
    text: "Kill yourself, loser. The world would be better without you.",
    prediction: "bullying" as const,
    confidence: 97,
    timestamp: "18 minutes ago",
    model: "RoBERTa",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.02,
    y: -2,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
}

const statsVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export default function DashboardPage() {
  const totalAnalyses = timelineData.reduce((acc, curr) => acc + curr.safe + curr.bullying, 0)
  const totalBullying = timelineData.reduce((acc, curr) => acc + curr.bullying, 0)
  const totalSafe = timelineData.reduce((acc, curr) => acc + curr.safe, 0)
  const bullyingRate = ((totalBullying / totalAnalyses) * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold text-foreground">SafeGuard AI</span>
              </motion.div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild>
                <Link href="/detect">Analyze Text</Link>
              </Button>
            </motion.div>
          </nav>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          {/* Page Header */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-lg text-muted-foreground">
              Monitor cyberbullying detection patterns, model performance, and content analysis trends.
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Total Analyses",
                value: "2,674",
                change: "+12% from last month",
                icon: Brain,
                color: "primary",
              },
              {
                title: "Bullying Rate",
                value: "13.2%",
                change: "-2.3% from last month",
                icon: AlertTriangle,
                color: "destructive",
              },
              {
                title: "Safe Content",
                value: "2,321",
                change: "+15% from last month",
                icon: CheckCircle,
                color: "green",
              },
              {
                title: "Active Users",
                value: "1,247",
                change: "+8% from last month",
                icon: Users,
                color: "primary",
              },
            ].map((stat, index) => (
              <motion.div key={index} variants={cardVariants} whileHover="hover">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <motion.p
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          className="text-2xl font-bold text-foreground"
                        >
                          {stat.value}
                        </motion.p>
                      </div>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`h-12 w-12 bg-${stat.color === "green" ? "green-500" : stat.color}/10 rounded-lg flex items-center justify-center`}
                      >
                        <stat.icon className={`h-6 w-6 text-${stat.color === "green" ? "green-500" : stat.color}`} />
                      </motion.div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{stat.change}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Real-Time Analytics Section Divider */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="border-t border-border pt-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Real-Time Analytics</h2>
              <p className="text-muted-foreground">Live performance metrics and content analysis trends</p>
            </div>
          </motion.div>

          {/* Charts Row */}
          <motion.div variants={containerVariants} className="grid lg:grid-cols-2 gap-6">
            {/* Content Distribution Pie Chart */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Content Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Percentage"]}
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Model Benchmark Bar Chart */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Model Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={modelBenchmarkData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                        <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Accuracy"]}
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                          }}
                        />
                        <Bar dataKey="accuracy" radius={[0, 4, 4, 0]}>
                          {modelBenchmarkData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.highlight ? "hsl(var(--primary))" : entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-4 text-sm text-muted-foreground"
                  >
                    <span className="inline-flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-sm"></div>
                      RoBERTa achieves 94% accuracy with the highest precision and recall
                    </span>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Timeline Chart */}
          <motion.div variants={cardVariants} whileHover="hover">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Analysis Trends Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timelineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "6px",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="safe"
                        stroke="hsl(var(--chart-3))"
                        strokeWidth={3}
                        name="Safe Content"
                        dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="bullying"
                        stroke="hsl(var(--chart-4))"
                        strokeWidth={3}
                        name="Cyberbullying"
                        dot={{ fill: "hsl(var(--chart-4))", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Training Dataset Information Section Divider */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="border-t border-border pt-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Training Dataset Information</h2>
              <p className="text-muted-foreground">Details about the machine learning model training data</p>
            </div>
          </motion.div>

          {/* Training Dataset Section */}
          <motion.div variants={containerVariants} className="grid lg:grid-cols-2 gap-6">
            {/* Training Dataset Distribution Bar Chart */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Dataset Distribution by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={classDistributionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          formatter={(value) => [`${value.toLocaleString()}`, "Samples"]}
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "6px",
                          }}
                        />
                        <Bar dataKey="samples" radius={[4, 4, 0, 0]}>
                          {classDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Dataset Sample Counts */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    Exact Sample Counts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {classDistributionData.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: item.color }}></div>
                          <span className="font-medium text-foreground">{item.name}</span>
                        </div>
                        <span className="text-lg font-bold text-primary">{item.samples.toLocaleString()}</span>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-foreground">Total Training Samples:</span>
                      <span className="text-2xl font-bold text-primary">47,692</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Balanced dataset across 6 cyberbullying categories for comprehensive model training
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Recent Analyses */}
          <motion.div variants={cardVariants} whileHover="hover">
            <Card>
              <CardHeader>
                <CardTitle>Recent Analyses</CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div variants={containerVariants} className="space-y-4">
                  {recentAnalyses.map((analysis, index) => (
                    <motion.div
                      key={analysis.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.01, x: 5 }}
                      className="flex items-start gap-4 p-4 border border-border rounded-lg transition-all duration-200"
                    >
                      <div className="flex-shrink-0">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          {analysis.prediction === "bullying" ? (
                            <AlertTriangle className="h-5 w-5 text-destructive mt-1" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                          )}
                        </motion.div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="text-sm text-foreground line-clamp-2">{analysis.text}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <Badge variant={analysis.prediction === "bullying" ? "destructive" : "secondary"}>
                            {analysis.prediction === "bullying" ? "Cyberbullying" : "Safe"}
                          </Badge>
                          <span>Confidence: {analysis.confidence}%</span>
                          <span>Model: {analysis.model}</span>
                          <span>{analysis.timestamp}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
