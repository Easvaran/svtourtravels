import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/x-icon"
];

export async function POST(request: Request) {
  console.log("========== POST /api/upload ==========");

  try {
    console.log("Step 1: Starting upload...");

    const contentType = request.headers.get("content-type") || "";
    console.log("Step 1: Content-Type:", contentType);

    if (!contentType.includes("multipart/form-data")) {
      console.error("Step 1: Invalid content-type!");
      return NextResponse.json(
        { error: "Invalid request format. Expected multipart/form-data" },
        { status: 400, headers: { "Content-Type": "application/json; charset=utf-8" } }
      );
    }

    console.log("Step 2: Parsing form data...");
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      console.error("Step 2: No file found!");
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400, headers: { "Content-Type": "application/json; charset=utf-8" } }
      );
    }

    console.log("Step 3: File info - name:", file.name, "type:", file.type, "size:", file.size);

    if (file.size > MAX_FILE_SIZE) {
      console.error("Step 3: File too large!");
      return NextResponse.json(
        { error: `File too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Max size is 5MB` },
        { status: 400, headers: { "Content-Type": "application/json; charset=utf-8" } }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      console.error("Step 3: Invalid file type!");
      return NextResponse.json(
        { error: `Invalid file type (${file.type}). Allowed: JPG, JPEG, PNG, WEBP, SVG, ICO` },
        { status: 400, headers: { "Content-Type": "application/json; charset=utf-8" } }
      );
    }

    console.log("Step 4: Converting to Base64...");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    console.log("Step 5: Base64 conversion complete! Length:", dataUrl.length);

    const response = NextResponse.json(
      { url: dataUrl },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-cache, no-store, must-revalidate"
        }
      }
    );

    console.log("========== POST /api/upload SUCCESS ==========");
    return response;

  } catch (error: any) {
    console.error("========== POST /api/upload ERROR ==========");
    console.error("Error type:", error?.constructor?.name || "Unknown");
    console.error("Error message:", error?.message || "No message");
    console.error("Error stack:", error?.stack || "No stack");

    const errorResponse = NextResponse.json(
      { error: `Failed to upload image: ${error?.message || "Unknown error"}` },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      }
    );

    console.log("Returning error response");
    return errorResponse;
  }
}
