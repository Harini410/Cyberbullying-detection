import { type NextRequest, NextResponse } from "next/server"

interface ClassificationRequest {
  text: string
  model: string
}

interface ClassificationResponse {
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

// Keywords that indicate potential cyberbullying
const bullyingKeywords = [
  "stupid",
  "idiot",
  "loser",
  "worthless",
  "hate",
  "kill",
  "die",
  "ugly",
  "fat",
  "dumb",
  "retard",
  "freak",
  "weirdo",
  "pathetic",
  "useless",
  "nobody",
  "failure",
  "disgusting",
  "gross",
  "annoying",
  "shut up",
  "go away",
  "leave me alone",
]

// Generate mock emotions based on prediction
function generateEmotions(prediction: "bullying" | "safe", model: string): ClassificationResponse["emotions"] {
  // True positive rates from provided data
  const emotionAccuracy = {
    anger: 0.85,
    fear: 0.82,
    sadness: 0.81,
    // Adding neutral and joy for completeness
    neutral: 0.88,
    joy: 0.84,
  }

  if (prediction === "bullying") {
    // Apply true positive rates to emotion detection
    const baseAnger = (Math.random() * 40 + 30) * emotionAccuracy.anger
    const baseFear = (Math.random() * 30 + 15) * emotionAccuracy.fear
    const baseSadness = (Math.random() * 35 + 20) * emotionAccuracy.sadness
    const remaining = 100 - baseAnger - baseFear - baseSadness
    const neutral = Math.random() * remaining * 0.7
    const joy = remaining - neutral

    return {
      anger: Math.round(baseAnger),
      fear: Math.round(baseFear),
      sadness: Math.round(baseSadness),
      neutral: Math.round(neutral),
      joy: Math.round(Math.max(0, joy)),
    }
  } else {
    // Higher positive/neutral emotions for safe content with accuracy rates
    const baseJoy = (Math.random() * 50 + 20) * emotionAccuracy.joy
    const baseNeutral = (Math.random() * 40 + 20) * emotionAccuracy.neutral
    const remaining = 100 - baseJoy - baseNeutral
    const anger = Math.random() * remaining * 0.3
    const fear = Math.random() * (remaining - anger) * 0.4
    const sadness = remaining - anger - fear

    return {
      anger: Math.round(Math.max(0, anger)),
      fear: Math.round(Math.max(0, fear)),
      sadness: Math.round(Math.max(0, sadness)),
      neutral: Math.round(baseNeutral),
      joy: Math.round(baseJoy),
    }
  }
}

// Mock model implementations with different behaviors
function classifyText(text: string, model: string): ClassificationResponse {
  const lowerText = text.toLowerCase()

  // Check for bullying keywords
  const hasBullyingKeywords = bullyingKeywords.some((keyword) => lowerText.includes(keyword))

  let prediction: "bullying" | "safe"
  let baseConfidence: number

  switch (model) {
    case "mock":
      // Simple keyword-based detection
      prediction = hasBullyingKeywords ? "bullying" : "safe"
      baseConfidence = hasBullyingKeywords
        ? Math.random() * 20 + 70
        : // 70-90% for bullying
          Math.random() * 15 + 80 // 80-95% for safe
      break

    case "logistic":
      // Logistic regression - moderate accuracy
      prediction = hasBullyingKeywords ? "bullying" : "safe"
      // Add some noise to make it less perfect
      if (Math.random() < 0.15) prediction = prediction === "bullying" ? "safe" : "bullying"
      baseConfidence = Math.random() * 25 + 60 // 60-85%
      break

    case "naive_bayes":
      // Naïve Bayes - decent but not great
      prediction = hasBullyingKeywords ? "bullying" : "safe"
      if (Math.random() < 0.2) prediction = prediction === "bullying" ? "safe" : "bullying"
      baseConfidence = Math.random() * 20 + 55 // 55-75%
      break

    case "svm":
      // SVM - good performance
      prediction = hasBullyingKeywords ? "bullying" : "safe"
      if (Math.random() < 0.12) prediction = prediction === "bullying" ? "safe" : "bullying"
      baseConfidence = Math.random() * 20 + 65 // 65-85%
      break

    case "random_forest":
      // Random Forest - very good
      prediction = hasBullyingKeywords ? "bullying" : "safe"
      if (Math.random() < 0.1) prediction = prediction === "bullying" ? "safe" : "bullying"
      baseConfidence = Math.random() * 20 + 70 // 70-90%
      break

    case "cnn":
      // CNN - 89% accuracy
      prediction = hasBullyingKeywords ? "bullying" : "safe"
      if (Math.random() < 0.11) prediction = prediction === "bullying" ? "safe" : "bullying"
      baseConfidence = Math.random() * 15 + 80 // 80-95%
      break

    case "rnn":
      // RNN - 80% accuracy (lowest performing)
      prediction = hasBullyingKeywords ? "bullying" : "safe"
      if (Math.random() < 0.2) prediction = prediction === "bullying" ? "safe" : "bullying"
      baseConfidence = Math.random() * 20 + 60 // 60-80%
      break

    case "lstm":
      // LSTM - 87% accuracy
      prediction = hasBullyingKeywords ? "bullying" : "safe"
      if (Math.random() < 0.13) prediction = prediction === "bullying" ? "safe" : "bullying"
      baseConfidence = Math.random() * 18 + 75 // 75-93%
      break

    case "bi_lstm":
      // Bi-LSTM - 90% accuracy
      prediction = hasBullyingKeywords ? "bullying" : "safe"
      if (Math.random() < 0.1) prediction = prediction === "bullying" ? "safe" : "bullying"
      baseConfidence = Math.random() * 15 + 82 // 82-97%
      break

    case "gru":
      // GRU - 88% accuracy
      prediction = hasBullyingKeywords ? "bullying" : "safe"
      if (Math.random() < 0.12) prediction = prediction === "bullying" ? "safe" : "bullying"
      baseConfidence = Math.random() * 17 + 78 // 78-95%
      break

    case "roberta":
      // RoBERTa - 94% accuracy (best performance)
      prediction = hasBullyingKeywords ? "bullying" : "safe"
      if (Math.random() < 0.06) prediction = prediction === "bullying" ? "safe" : "bullying"
      baseConfidence = Math.random() * 10 + 88 // 88-98%
      break

    default:
      prediction = "safe"
      baseConfidence = 50
  }

  // Adjust confidence based on text length and complexity
  const textLength = text.length
  const confidenceAdjustment = Math.min(textLength / 100, 1) * 5 // Up to 5% boost for longer texts
  const finalConfidence = Math.min(100, Math.round(baseConfidence + confidenceAdjustment))

  return {
    prediction,
    confidence: finalConfidence,
    emotions: generateEmotions(prediction, model),
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ClassificationRequest = await request.json()

    if (!body.text || !body.model) {
      return NextResponse.json({ error: "Missing required fields: text and model" }, { status: 400 })
    }

    if (body.text.length > 1000) {
      return NextResponse.json({ error: "Text too long. Maximum 1000 characters allowed." }, { status: 400 })
    }

    // Simulate processing delay for realism
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 + 500))

    const result = classifyText(body.text, body.model)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Classification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Cyberbullying Classification API",
    version: "1.0.0",
    models: [
      "mock",
      "logistic",
      "naive_bayes",
      "svm",
      "random_forest",
      "cnn",
      "rnn",
      "lstm",
      "bi_lstm",
      "gru",
      "roberta",
    ],
  })
}
