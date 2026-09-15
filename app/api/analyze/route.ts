import { type NextRequest, NextResponse } from "next/server"
import { runServerlessAnalysis } from "@/lib/serverless-analyzer"

const BACKEND_URL = process.env.BACKEND_API_URL || "http://127.0.0.1:8000"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.text || typeof body.text !== "string" || !body.text.trim()) {
      return NextResponse.json({ error: "Text field is required." }, { status: 400 })
    }

    // 1. If backend URL is specified or available, attempt FastAPI backend first
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3500)

      const response = await fetch(`${BACKEND_URL}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: body.text,
          include_trace: body.include_trace !== false,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        return NextResponse.json(data)
      }
    } catch (backendError) {
      // Backend unreachable or timed out (e.g. running standalone on Vercel without a cloud backend)
      console.warn("FastAPI backend not reachable, using built-in serverless RoBERTa & multi-agent engine.")
    }

    // 2. Seamless zero-downtime serverless fallback
    const serverlessResult = runServerlessAnalysis(body.text)
    return NextResponse.json(serverlessResult)
  } catch (error: any) {
    console.error("Analysis route error:", error)
    return NextResponse.json(
      { error: "Internal processing error: " + error.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    service: "CyberSafe AI Analysis & Multi-Agent Engine",
    active_model: "RoBERTa — Active Primary Model",
    pipeline: [
      "DetectionAgent (RoBERTa)",
      "EmotionAgent",
      "ContextAgent",
      "RiskAgent",
      "RAGAgent",
      "ExplanationAgent",
      "ResponseAgent"
    ]
  })
}
