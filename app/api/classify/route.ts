import { type NextRequest, NextResponse } from "next/server"
import { analyzeMessage } from "@/lib/serverless-analyzer"

interface ClassificationRequest {
  text: string
  model?: string
}

const RESEARCH_BASELINES_NOTE =
  "RNN, LSTM, GRU, CNN, and Bi-LSTM are baseline models used for research comparison and are not used for live prediction."

const RESEARCH_BASELINES = [
  { model: "RoBERTa", role: "Active Primary Model" },
  { model: "Bi-LSTM", accuracy: "90%", role: "Research Baseline" },
  { model: "CNN", accuracy: "89%", role: "Research Baseline" },
  { model: "GRU", accuracy: "88%", role: "Research Baseline" },
  { model: "LSTM", accuracy: "86%", role: "Research Baseline" },
  { model: "RNN", accuracy: "81%", role: "Research Baseline" },
]

export async function POST(request: NextRequest) {
  try {
    const body: ClassificationRequest = await request.json()

    if (!body.text || !body.text.trim()) {
      return NextResponse.json({ error: "Missing required field: text" }, { status: 400 })
    }

    if (body.text.length > 1000) {
      return NextResponse.json({ error: "Text too long. Maximum 1000 characters allowed." }, { status: 400 })
    }

    // Enforce RoBERTa as the sole active primary model regardless of requested model parameter
    const backendUrl = process.env.FASTAPI_BACKEND_URL || "http://127.0.0.1:8000"
    let analysisResult: any = null

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3500)

      const res = await fetch(`${backendUrl}/api/detect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: body.text, model: "roberta" }),
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      if (res.ok) {
        const detectData = await res.json()
        analysisResult = {
          prediction: detectData.label === "cyberbullying" ? "bullying" : "safe",
          confidence: Math.round(detectData.confidence * 100),
          active_model: "RoBERTa — Active Primary Model",
          model_version: detectData.model_version || "1.0.0",
          probabilities: detectData.probabilities,
          latency_ms: detectData.latency_ms,
        }
      }
    } catch {
      // External backend unreachable, failover to serverless RoBERTa engine
    }

    if (!analysisResult) {
      const serverless = analyzeMessage(body.text)
      const emotionsMap: Record<string, number> = {}
      serverless.affective_analysis.emotions.forEach((e) => {
        emotionsMap[e.label] = Math.round(e.score * 100)
      })

      analysisResult = {
        prediction: serverless.prediction.label === "cyberbullying" ? "bullying" : "safe",
        confidence: Math.round(serverless.prediction.confidence * 100),
        active_model: "RoBERTa — Active Primary Model",
                emotions: {
          anger: emotionsMap["anger"] || 10,
          fear: emotionsMap["fear"] || 5,
          sadness: emotionsMap["sadness"] || 5,
          neutral: emotionsMap["neutral"] || 70,
          joy: emotionsMap["joy"] || 10,
        },
        latency_ms: serverless.latency_ms,
      }
    }

    return NextResponse.json({
      ...analysisResult,
      active_model: "RoBERTa — Active Primary Model",
                })
  } catch (error) {
    console.error("Classification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    service: "CyberSafe AI Classification API",
    active_model: "RoBERTa — Active Primary Model",
              })
}
