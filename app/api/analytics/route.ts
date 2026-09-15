import { NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_API_URL || "http://127.0.0.1:8000"

export async function GET() {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3500)

    const response = await fetch(`${BACKEND_URL}/api/analytics`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json(data)
    }

    return NextResponse.json({
      total_messages: 0,
      cyberbullying_count: 0,
      safe_count: 0,
      cyberbullying_ratio: 0.0,
      safe_ratio: 0.0,
      risk_breakdown: { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 }
    })
  } catch (error) {
    return NextResponse.json({
      total_messages: 0,
      cyberbullying_count: 0,
      safe_count: 0,
      cyberbullying_ratio: 0.0,
      safe_ratio: 0.0,
      risk_breakdown: { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 }
    })
  }
}
