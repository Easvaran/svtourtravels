import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  console.log("========== TEST API CALLED ==========");
  
  return NextResponse.json(
    {
      success: true,
      message: "TEST API WORKING!",
      data: { test: "Hello World!", timestamp: new Date().toISOString() }
    },
    {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    }
  );
}
