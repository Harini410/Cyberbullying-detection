import { type NextRequest, NextResponse } from "next/server"
import { runServerlessChat } from "@/lib/serverless-chat"

const BACKEND_URL = process.env.BACKEND_API_URL || "http://127.0.0.1:8000"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.message || typeof body.message !== "string" || !body.message.trim()) {
      return NextResponse.json({ error: "Message field is required." }, { status: 400 })
    }

    // 1. Attempt FastAPI backend if available
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3500)

      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: body.message,
          conversation_id: body.conversation_id || null,
          analysis_id: body.analysis_id || null,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        return NextResponse.json(data)
      }
    } catch (backendError) {
      console.warn("FastAPI backend not reachable for chat, using built-in serverless chatbot engine.")
    }

    // 2. Seamless serverless chat fallback
    const serverlessReply = runServerlessChat(
      body.message,
      body.conversation_id,
      body.analysis_id
    )

    return NextResponse.json(serverlessReply)
  } catch (error: any) {
    console.error("Chat route error:", error)
    return NextResponse.json(
      { error: "Internal processing error: " + error.message },
      { status: 500 }
    )
  }
}
