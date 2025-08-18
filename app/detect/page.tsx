"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, ArrowLeft, Brain, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { motion, AnimatePresence } from "framer-motion"

interface PredictionResult {
  prediction: "bullying" | "safe"
  confidence: number
  emotions: {
    anger: number
    fear: number
    sadness: number
    neutral: number
    joy: number
  }
}

const models = [
  { value: "mock", label: "Mock Model (Keyword-based)", description: "Simple keyword detection for demo purposes" },
  {
    value: "cnn",
    label: "CNN (89% Accuracy)",
    description: "Convolutional Neural Network - 0.88 precision, 0.88 recall",
  },
  { value: "rnn", label: "RNN (80% Accuracy)", description: "Recurrent Neural Network - 0.78 precision, 0.79 recall" },
  { value: "lstm", label: "LSTM (87% Accuracy)", description: "Long Short-Term Memory - 0.86 precision, 0.86 recall" },
  {
    value: "bi_lstm",
    label: "Bi-LSTM (90% Accuracy)",
    description: "Bidirectional LSTM - 0.89 precision, 0.89 recall",
  },
  { value: "gru", label: "GRU (88% Accuracy)", description: "Gated Recurrent Unit - 0.87 precision, 0.87 recall" },
  {
    value: "roberta",
    label: "RoBERTa (94% Accuracy)",
    description: "State-of-the-art transformer model - highest performance",
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

const resultVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
}

export default function DetectPage() {
  const [text, setText] = useState("")
  const [selectedModel, setSelectedModel] = useState("mock")
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    setIsLoading(true)
    setResult(null) // Clear previous results
    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, model: selectedModel }),
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Classification error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const emotionData = result
    ? [
        { name: "Anger", value: result.emotions.anger },
        { name: "Fear", value: result.emotions.fear },
        { name: "Sadness", value: result.emotions.sadness },
        { name: "Neutral", value: result.emotions.neutral },
        { name: "Joy", value: result.emotions.joy },
      ]
    : []

  const selectedModelInfo = models.find((m) => m.value === selectedModel)

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
              <Button variant="outline" asChild>
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </motion.div>
          </nav>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          {/* Page Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">AI Cyberbullying Detection</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter text below and select an AI model to analyze potential cyberbullying content with confidence scores
              and emotional analysis.
            </p>
          </motion.div>

          {/* Input Form */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Text Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Model Selection */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-foreground">Select AI Model</label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a model" />
                      </SelectTrigger>
                      <SelectContent>
                        {models.map((model) => (
                          <SelectItem key={model.value} value={model.value}>
                            <div className="flex flex-col">
                              <span className="font-medium">{model.label}</span>
                              <span className="text-xs text-muted-foreground">{model.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedModelInfo && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-muted-foreground"
                      >
                        {selectedModelInfo.description}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Text Input */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-foreground">Text to Analyze</label>
                    <Textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Enter the text you want to analyze for cyberbullying content..."
                      className="min-h-32 resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                      maxLength={1000}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Enter text to analyze for potential cyberbullying</span>
                      <span>{text.length}/1000</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button type="submit" disabled={!text.trim() || isLoading} className="w-full">
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Analyze Text"
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                variants={resultVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid md:grid-cols-2 gap-6"
              >
                {/* Prediction Result */}
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          {result.prediction === "bullying" ? (
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </motion.div>
                        Prediction Result
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Classification:</span>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <Badge variant={result.prediction === "bullying" ? "destructive" : "secondary"}>
                            {result.prediction === "bullying" ? "Cyberbullying Detected" : "Safe Content"}
                          </Badge>
                        </motion.div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Confidence:</span>
                          <span className="text-sm font-mono">{result.confidence}%</span>
                        </div>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                        >
                          <Progress value={result.confidence} className="h-2" />
                        </motion.div>
                      </div>

                      <div className="text-xs text-muted-foreground">Model: {selectedModelInfo?.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Emotion Analysis */}
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Emotional Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="h-64"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={emotionData}>
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                            <Tooltip
                              formatter={(value) => [`${value}%`, "Intensity"]}
                              labelStyle={{ color: "hsl(var(--foreground))" }}
                              contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "6px",
                              }}
                            />
                            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sample Texts */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Try These Sample Texts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-foreground">Safe Content Examples:</h4>
                    <div className="space-y-2">
                      {[
                        "Great job on your presentation! You did amazing work.",
                        "Looking forward to working together on this project.",
                      ].map((sampleText, index) => (
                        <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-left justify-start h-auto p-3 bg-transparent"
                            onClick={() => setText(sampleText)}
                          >
                            "{sampleText}"
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-foreground">Potentially Harmful Examples:</h4>
                    <div className="space-y-2">
                      {[
                        "You're so stupid and worthless. Nobody likes you.",
                        "Kill yourself, loser. The world would be better without you.",
                      ].map((sampleText, index) => (
                        <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-left justify-start h-auto p-3 bg-transparent"
                            onClick={() => setText(sampleText)}
                          >
                            "{sampleText}"
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
