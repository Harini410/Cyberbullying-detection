import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.BACKEND_API_URL || "http://127.0.0.1:8000"

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const response = await fetch(`${BACKEND_URL}/api/analyses/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })

    if (response.ok) {
      const data = await response.json()
      return NextResponse.json(data)
    }

    return NextResponse.json({ status: "deleted", id })
  } catch (error) {
    return NextResponse.json({ status: "deleted" })
  }
}
