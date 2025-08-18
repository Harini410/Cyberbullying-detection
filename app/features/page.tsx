"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Shield, TrendingUp, Eye, BarChart3, Settings } from "lucide-react"
import { motion } from "framer-motion"

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

export default function FeaturesPage() {
  const features = [
    {
      icon: Brain,
      title: "Multiple AI Models",
      description: "Choose from 7 different machine learning models including RoBERTa, LSTM, CNN, and more.",
      badge: "Core Feature",
      details: ["RoBERTa: 94% accuracy", "Bi-LSTM: 90% accuracy", "CNN: 89% accuracy", "Real-time processing"],
    },
    {
      icon: Shield,
      title: "Real-Time Detection",
      description: "Instant analysis of text content with confidence scores and detailed breakdowns.",
      badge: "Performance",
      details: [
        "Sub-second response times",
        "Batch processing support",
        "API integration ready",
        "Scalable architecture",
      ],
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Comprehensive dashboards with trends, patterns, and actionable insights.",
      badge: "Analytics",
      details: [
        "Trend analysis over time",
        "Model performance metrics",
        "Content distribution charts",
        "Export capabilities",
      ],
    },
    {
      icon: Eye,
      title: "Emotional Analysis",
      description: "Understand the emotional context behind text with detailed sentiment breakdowns.",
      badge: "Insight",
      details: ["5 emotion categories", "Intensity scoring", "Visual representations", "Pattern recognition"],
    },
    {
      icon: BarChart3,
      title: "Model Benchmarking",
      description: "Compare performance across different AI models to choose the best fit.",
      badge: "Comparison",
      details: [
        "Accuracy comparisons",
        "Precision & recall metrics",
        "F1-score analysis",
        "Performance recommendations",
      ],
    },
    {
      icon: Settings,
      title: "Customizable Thresholds",
      description: "Adjust sensitivity levels and confidence thresholds for your specific needs.",
      badge: "Flexibility",
      details: [
        "Adjustable confidence levels",
        "Custom keyword filters",
        "Severity classifications",
        "White-label options",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-16">
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Powerful Features</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the comprehensive suite of AI-powered tools designed to detect, analyze, and prevent
              cyberbullying across digital platforms.
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={containerVariants} className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <feature.icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {feature.badge}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-foreground">Key Capabilities:</h4>
                      <ul className="space-y-1">
                        {feature.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div variants={itemVariants} className="bg-muted/50 rounded-lg p-8">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Platform Statistics</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { value: "7", label: "AI Models", sublabel: "Available for comparison" },
                  { value: "94%", label: "Peak Accuracy", sublabel: "With RoBERTa model" },
                  { value: "10K+", label: "Daily Analyses", sublabel: "Text processing volume" },
                  { value: "<1s", label: "Response Time", sublabel: "Average processing speed" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                    <div className="text-lg font-semibold text-foreground">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
