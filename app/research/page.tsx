"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

const methodologySteps = [
  {
    step: "Data Collection",
    description: "47,692 annotated tweets from Wikipedia, Twitter, and social media platforms",
    status: "completed",
  },
  {
    step: "Preprocessing",
    description: "Tokenization, noise removal, SMOTE for class balancing",
    status: "completed",
  },
  {
    step: "Feature Extraction",
    description: "RoBERTa embeddings + emotion analysis + sentiment features",
    status: "completed",
  },
  {
    step: "Model Training",
    description: "Fine-tuned RoBERTa with federated learning framework",
    status: "completed",
  },
  {
    step: "Privacy Integration",
    description: "Differential privacy mechanisms during gradient updates",
    status: "completed",
  },
  {
    step: "Evaluation",
    description: "Comprehensive comparison with CNN, RNN, LSTM, BiLSTM, GRU",
    status: "completed",
  },
]

const federatedLearningMetrics = [
  { client: "Client 1", accuracy: 91, privacy_score: 95 },
  { client: "Client 2", accuracy: 89, privacy_score: 93 },
  { client: "Client 3", accuracy: 92, privacy_score: 96 },
  { client: "Client 4", accuracy: 90, privacy_score: 94 },
  { client: "Global Model", accuracy: 93, privacy_score: 98 },
]

const radarData = [
  { metric: "Accuracy", CNN: 89, RNN: 80, LSTM: 87, BiLSTM: 90, GRU: 88, RoBERTa: 93 },
  { metric: "Precision", CNN: 88, RNN: 78, LSTM: 86, BiLSTM: 89, GRU: 87, RoBERTa: 94 },
  { metric: "Recall", CNN: 88, RNN: 79, LSTM: 86, BiLSTM: 89, GRU: 87, RoBERTa: 93 },
  { metric: "F1-Score", CNN: 88, RNN: 78, LSTM: 86, BiLSTM: 89, GRU: 87, RoBERTa: 94 },
]

const modelPerformanceData = [
  { model: "CNN", accuracy: 89, precision: 88, recall: 88, f1: 88 },
  { model: "RNN", accuracy: 80, precision: 78, recall: 79, f1: 78 },
  { model: "LSTM", accuracy: 87, precision: 86, recall: 86, f1: 86 },
  { model: "BiLSTM", accuracy: 90, precision: 89, recall: 89, f1: 89 },
  { model: "GRU", accuracy: 88, precision: 87, recall: 87, f1: 87 },
  { model: "RoBERTa", accuracy: 93, precision: 94, recall: 93, f1: 94 },
]

const trainingCurves = {
  RoBERTa: [
    { epoch: 1, train_acc: 0.75, val_acc: 0.73, train_loss: 0.65, val_loss: 0.68 },
    { epoch: 2, train_acc: 0.82, val_acc: 0.8, train_loss: 0.45, val_loss: 0.48 },
    { epoch: 3, train_acc: 0.87, val_acc: 0.85, train_loss: 0.32, val_loss: 0.35 },
    { epoch: 4, train_acc: 0.9, val_acc: 0.88, train_loss: 0.25, val_loss: 0.28 },
    { epoch: 5, train_acc: 0.92, val_acc: 0.91, train_loss: 0.2, val_loss: 0.23 },
    { epoch: 6, train_acc: 0.93, val_acc: 0.93, train_loss: 0.18, val_loss: 0.2 },
  ],
  BiLSTM: [
    { epoch: 1, train_acc: 0.7, val_acc: 0.68, train_loss: 0.72, val_loss: 0.75 },
    { epoch: 2, train_acc: 0.78, val_acc: 0.76, train_loss: 0.55, val_loss: 0.58 },
    { epoch: 3, train_acc: 0.83, val_acc: 0.81, train_loss: 0.42, val_loss: 0.45 },
    { epoch: 4, train_acc: 0.87, val_acc: 0.85, train_loss: 0.35, val_loss: 0.38 },
    { epoch: 5, train_acc: 0.89, val_acc: 0.88, train_loss: 0.3, val_loss: 0.33 },
    { epoch: 6, train_acc: 0.9, val_acc: 0.9, train_loss: 0.28, val_loss: 0.3 },
  ],
  LSTM: [
    { epoch: 1, train_acc: 0.68, val_acc: 0.66, train_loss: 0.75, val_loss: 0.78 },
    { epoch: 2, train_acc: 0.75, val_acc: 0.73, train_loss: 0.58, val_loss: 0.61 },
    { epoch: 3, train_acc: 0.8, val_acc: 0.78, train_loss: 0.48, val_loss: 0.51 },
    { epoch: 4, train_acc: 0.84, val_acc: 0.82, train_loss: 0.4, val_loss: 0.43 },
    { epoch: 5, train_acc: 0.86, val_acc: 0.85, train_loss: 0.35, val_loss: 0.38 },
    { epoch: 6, train_acc: 0.87, val_acc: 0.87, train_loss: 0.32, val_loss: 0.35 },
  ],
  CNN: [
    { epoch: 1, train_acc: 0.72, val_acc: 0.7, train_loss: 0.7, val_loss: 0.73 },
    { epoch: 2, train_acc: 0.79, val_acc: 0.77, train_loss: 0.52, val_loss: 0.55 },
    { epoch: 3, train_acc: 0.84, val_acc: 0.82, train_loss: 0.4, val_loss: 0.43 },
    { epoch: 4, train_acc: 0.87, val_acc: 0.85, train_loss: 0.33, val_loss: 0.36 },
    { epoch: 5, train_acc: 0.88, val_acc: 0.87, train_loss: 0.3, val_loss: 0.33 },
    { epoch: 6, train_acc: 0.89, val_acc: 0.89, train_loss: 0.28, val_loss: 0.3 },
  ],
  RNN: [
    { epoch: 1, train_acc: 0.62, val_acc: 0.6, train_loss: 0.85, val_loss: 0.88 },
    { epoch: 2, train_acc: 0.68, val_acc: 0.66, train_loss: 0.72, val_loss: 0.75 },
    { epoch: 3, train_acc: 0.73, val_acc: 0.71, train_loss: 0.62, val_loss: 0.65 },
    { epoch: 4, train_acc: 0.76, val_acc: 0.74, train_loss: 0.55, val_loss: 0.58 },
    { epoch: 5, train_acc: 0.78, val_acc: 0.77, train_loss: 0.5, val_loss: 0.53 },
    { epoch: 6, train_acc: 0.8, val_acc: 0.8, train_loss: 0.47, val_loss: 0.5 },
  ],
  GRU: [
    { epoch: 1, train_acc: 0.69, val_acc: 0.67, train_loss: 0.74, val_loss: 0.77 },
    { epoch: 2, train_acc: 0.76, val_acc: 0.74, train_loss: 0.57, val_loss: 0.6 },
    { epoch: 3, train_acc: 0.81, val_acc: 0.79, train_loss: 0.46, val_loss: 0.49 },
    { epoch: 4, train_acc: 0.85, val_acc: 0.83, train_loss: 0.38, val_loss: 0.41 },
    { epoch: 5, train_acc: 0.87, val_acc: 0.86, train_loss: 0.33, val_loss: 0.36 },
    { epoch: 6, train_acc: 0.88, val_acc: 0.88, train_loss: 0.3, val_loss: 0.33 },
  ],
}

const confusionMatrixData = [
  { predicted: "Not Bullying", actual: "Not Bullying", value: 1847, color: "#10b981" },
  { predicted: "Not Bullying", actual: "Bullying", value: 98, color: "#ef4444" },
  { predicted: "Bullying", actual: "Not Bullying", value: 142, color: "#ef4444" },
  { predicted: "Bullying", actual: "Bullying", value: 1587, color: "#10b981" },
]

const heatmapData = [
  { model: "CNN", metric: "Accuracy", value: 89 },
  { model: "CNN", metric: "Precision", value: 88 },
  { model: "CNN", metric: "Recall", value: 88 },
  { model: "CNN", metric: "F1-Score", value: 88 },
  { model: "RNN", metric: "Accuracy", value: 80 },
  { model: "RNN", metric: "Precision", value: 78 },
  { model: "RNN", metric: "Recall", value: 79 },
  { model: "RNN", metric: "F1-Score", value: 78 },
  { model: "LSTM", metric: "Accuracy", value: 87 },
  { model: "LSTM", metric: "Precision", value: 86 },
  { model: "LSTM", metric: "Recall", value: 86 },
  { model: "LSTM", metric: "F1-Score", value: 86 },
  { model: "BiLSTM", metric: "Accuracy", value: 90 },
  { model: "BiLSTM", metric: "Precision", value: 89 },
  { model: "BiLSTM", metric: "Recall", value: 89 },
  { model: "BiLSTM", metric: "F1-Score", value: 89 },
  { model: "GRU", metric: "Accuracy", value: 88 },
  { model: "GRU", metric: "Precision", value: 87 },
  { model: "GRU", metric: "Recall", value: 87 },
  { model: "GRU", metric: "F1-Score", value: 87 },
  { model: "RoBERTa", metric: "Accuracy", value: 93 },
  { model: "RoBERTa", metric: "Precision", value: 94 },
  { model: "RoBERTa", metric: "Recall", value: 93 },
  { model: "RoBERTa", metric: "F1-Score", value: 94 },
]

const privacyFeatures = [
  {
    title: "Federated Learning",
    description: "Decentralized training across multiple clients without sharing raw data",
    implementation: "FedAvg algorithm with local model updates",
  },
  {
    title: "Differential Privacy",
    description: "Gaussian noise injection during gradient aggregation",
    implementation: "ε-differential privacy with σ² variance control",
  },
  {
    title: "Data Anonymization",
    description: "Removal of personally identifiable information from training data",
    implementation: "Automated PII detection and masking",
  },
  {
    title: "Secure Aggregation",
    description: "Encrypted model parameter updates during federated training",
    implementation: "Homomorphic encryption for gradient sharing",
  },
]

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Research Methodology & Framework</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A Hybrid Privacy-Preserving Cyberbullying Detection Framework Using RoBERTa
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="secondary">RoBERTa</Badge>
            <Badge variant="secondary">Federated Learning</Badge>
            <Badge variant="secondary">Differential Privacy</Badge>
            <Badge variant="secondary">Emotion Analysis</Badge>
          </div>
        </motion.div>

        <Tabs defaultValue="methodology" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="methodology">Methodology</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="training">Training Curves</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="federated">Federated Learning</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Features</TabsTrigger>
          </TabsList>

          <TabsContent value="methodology" className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Research Pipeline</CardTitle>
                  <CardDescription>Six-stage methodology for robust cyberbullying detection</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {methodologySteps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 bg-white rounded-lg border"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-semibold text-gray-900">{step.step}</h3>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          ✓ {step.status}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dataset Composition</CardTitle>
                    <CardDescription>47,692 total samples across 6 categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Religion</span>
                        <span className="text-sm text-gray-600">7,998 samples</span>
                      </div>
                      <Progress value={16.8} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Age</span>
                        <span className="text-sm text-gray-600">7,992 samples</span>
                      </div>
                      <Progress value={16.7} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Gender</span>
                        <span className="text-sm text-gray-600">7,973 samples</span>
                      </div>
                      <Progress value={16.7} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Ethnicity</span>
                        <span className="text-sm text-gray-600">7,961 samples</span>
                      </div>
                      <Progress value={16.7} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Not Cyberbullying</span>
                        <span className="text-sm text-gray-600">7,945 samples</span>
                      </div>
                      <Progress value={16.6} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Other Cyberbullying</span>
                        <span className="text-sm text-gray-600">7,823 samples</span>
                      </div>
                      <Progress value={16.4} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Emotion Detection Accuracy</CardTitle>
                    <CardDescription>True Positive Rates by emotion category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Anger</span>
                        <span className="text-sm text-gray-600">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Fear</span>
                        <span className="text-sm text-gray-600">82%</span>
                      </div>
                      <Progress value={82} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Sadness</span>
                        <span className="text-sm text-gray-600">81%</span>
                      </div>
                      <Progress value={81} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Guilt</span>
                        <span className="text-sm text-gray-600">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Surprise</span>
                        <span className="text-sm text-gray-600">76%</span>
                      </div>
                      <Progress value={76} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>RoBERTa Confusion Matrix</CardTitle>
                    <CardDescription>Classification results on test dataset</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
                      <div className="text-center text-sm font-medium mb-2 col-span-2">Predicted</div>
                      <div className="bg-green-100 p-4 rounded text-center">
                        <div className="text-2xl font-bold text-green-800">1847</div>
                        <div className="text-xs text-green-600">True Negative</div>
                      </div>
                      <div className="bg-red-100 p-4 rounded text-center">
                        <div className="text-2xl font-bold text-red-800">98</div>
                        <div className="text-xs text-red-600">False Positive</div>
                      </div>
                      <div className="bg-red-100 p-4 rounded text-center">
                        <div className="text-2xl font-bold text-red-800">142</div>
                        <div className="text-xs text-red-600">False Negative</div>
                      </div>
                      <div className="bg-green-100 p-4 rounded text-center">
                        <div className="text-2xl font-bold text-green-800">1587</div>
                        <div className="text-xs text-green-600">True Positive</div>
                      </div>
                      <div className="text-center text-sm font-medium mt-2 col-span-2 rotate-90 absolute -left-8 top-1/2">
                        Actual
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>RoBERTa model evaluation results</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <span className="font-medium">Accuracy</span>
                        <span className="text-2xl font-bold text-purple-600">93%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">Precision</span>
                        <span className="text-2xl font-bold text-blue-600">94%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">Recall</span>
                        <span className="text-2xl font-bold text-green-600">93%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                        <span className="font-medium">F1-Score</span>
                        <span className="text-2xl font-bold text-orange-600">94%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Model Performance Heatmap</CardTitle>
                  <CardDescription>Comprehensive comparison across all models and metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-1 max-w-2xl mx-auto">
                    <div></div>
                    <div className="text-center text-sm font-medium p-2">Accuracy</div>
                    <div className="text-center text-sm font-medium p-2">Precision</div>
                    <div className="text-center text-sm font-medium p-2">Recall</div>
                    <div className="text-center text-sm font-medium p-2">F1-Score</div>

                    {["CNN", "RNN", "LSTM", "BiLSTM", "GRU", "RoBERTa"].map((model) => (
                      <>
                        <div key={model} className="text-sm font-medium p-2 text-right">
                          {model}
                        </div>
                        {["Accuracy", "Precision", "Recall", "F1-Score"].map((metric) => {
                          const data = heatmapData.find((d) => d.model === model && d.metric === metric)
                          const intensity = data ? data.value / 100 : 0
                          return (
                            <div
                              key={`${model}-${metric}`}
                              className="p-2 text-center text-sm font-medium rounded"
                              style={{
                                backgroundColor: `rgba(139, 92, 246, ${intensity})`,
                                color: intensity > 0.5 ? "white" : "black",
                              }}
                            >
                              {data?.value}%
                            </div>
                          )
                        })}
                      </>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(trainingCurves).map(([modelName, data]) => (
                  <Card key={modelName}>
                    <CardHeader>
                      <CardTitle>{modelName} Training Progress</CardTitle>
                      <CardDescription>Training and validation accuracy/loss curves</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="epoch" />
                            <YAxis />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="train_acc"
                              stroke="#8b5cf6"
                              name="Training Accuracy"
                              strokeWidth={2}
                            />
                            <Line
                              type="monotone"
                              dataKey="val_acc"
                              stroke="#06b6d4"
                              name="Validation Accuracy"
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Model Performance Radar Chart</CardTitle>
                  <CardDescription>Comprehensive comparison across all evaluation metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="metric" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar
                          name="RoBERTa"
                          dataKey="RoBERTa"
                          stroke="#8b5cf6"
                          fill="#8b5cf6"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                        <Radar
                          name="BiLSTM"
                          dataKey="BiLSTM"
                          stroke="#06b6d4"
                          fill="#06b6d4"
                          fillOpacity={0.2}
                          strokeWidth={2}
                        />
                        <Radar
                          name="LSTM"
                          dataKey="LSTM"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.2}
                          strokeWidth={2}
                        />
                        <Radar
                          name="CNN"
                          dataKey="CNN"
                          stroke="#f59e0b"
                          fill="#f59e0b"
                          fillOpacity={0.2}
                          strokeWidth={2}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Grouped Bar Chart Comparison</CardTitle>
                    <CardDescription>Side-by-side metric comparison</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={modelPerformanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="model" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="accuracy" fill="#8b5cf6" name="Accuracy" />
                          <Bar dataKey="precision" fill="#06b6d4" name="Precision" />
                          <Bar dataKey="recall" fill="#10b981" name="Recall" />
                          <Bar dataKey="f1" fill="#f59e0b" name="F1-Score" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Trends</CardTitle>
                    <CardDescription>Line chart showing metric trends across models</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={modelPerformanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="model" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="accuracy" stroke="#8b5cf6" strokeWidth={2} />
                          <Line type="monotone" dataKey="precision" stroke="#06b6d4" strokeWidth={2} />
                          <Line type="monotone" dataKey="recall" stroke="#10b981" strokeWidth={2} />
                          <Line type="monotone" dataKey="f1" stroke="#f59e0b" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Findings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        RoBERTa achieves 93% accuracy
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        BiLSTM best among traditional models
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Emotion features improve detection
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Privacy-preserving training viable
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Computational Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Training Time</span>
                        <span className="text-sm font-medium">2.3 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Inference Speed</span>
                        <span className="text-sm font-medium">45ms/sample</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Memory Usage</span>
                        <span className="text-sm font-medium">1.2GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Model Size</span>
                        <span className="text-sm font-medium">355MB</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Deployment Readiness</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Scalability</span>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Ready
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Real-time Processing</span>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Ready
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Privacy Compliance</span>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          GDPR
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Multi-platform</span>
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          Compatible
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="federated" className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Federated Learning Performance</CardTitle>
                  <CardDescription>Decentralized training results across multiple clients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={federatedLearningMetrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="client" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="accuracy" fill="#8b5cf6" name="Accuracy %" />
                        <Bar dataKey="privacy_score" fill="#06b6d4" name="Privacy Score %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>FedAvg Algorithm</CardTitle>
                    <CardDescription>Federated averaging for model aggregation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                      <div className="text-purple-600 font-semibold mb-2">Global Update Formula:</div>
                      <div>
                        θ<sub>t+1</sub> = (1/K) Σ<sub>k=1</sub>
                        <sup>K</sup> (n<sub>k</sub>/n) θ<sub>t</sub>
                        <sup>k</sup>
                      </div>
                      <div className="mt-3 text-gray-600 text-xs">
                        Where K = number of clients, n<sub>k</sub> = samples per client
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Preservation</CardTitle>
                    <CardDescription>Differential privacy during training</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                      <div className="text-purple-600 font-semibold mb-2">Noise Injection:</div>
                      <div>M(x) = f(x) + N(0, σ²)</div>
                      <div className="mt-3 text-gray-600 text-xs">
                        Gaussian noise with variance σ² for ε-differential privacy
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="grid md:grid-cols-2 gap-6">
                {privacyFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          {feature.title}
                        </CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-sm font-medium text-blue-900 mb-1">Implementation:</div>
                          <div className="text-sm text-blue-700">{feature.implementation}</div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy-Accuracy Trade-off</CardTitle>
                  <CardDescription>Balancing model performance with privacy preservation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { privacy_level: "Low (ε=10)", accuracy: 93, privacy_score: 60 },
                          { privacy_level: "Medium (ε=5)", accuracy: 91, privacy_score: 80 },
                          { privacy_level: "High (ε=1)", accuracy: 87, privacy_score: 95 },
                          { privacy_level: "Very High (ε=0.1)", accuracy: 82, privacy_score: 98 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="privacy_level" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="accuracy" stroke="#8b5cf6" name="Accuracy %" strokeWidth={2} />
                        <Line
                          type="monotone"
                          dataKey="privacy_score"
                          stroke="#06b6d4"
                          name="Privacy Score %"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
