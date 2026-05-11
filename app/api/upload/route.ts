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
  try {
    console.log("=== Upload API Starting ===");
    
    // Verify request is coming with form data
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      console.log("Invalid content-type:", contentType);
      return NextResponse.json(
        { error: "Invalid request format. Expected multipart/form-data" },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      console.log("No file found in form data");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    console.log(`Processing file: name=${file.name}, type=${file.type}, size=${file.size}`);

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      console.log("File too large:", file.size);
      return NextResponse.json(
        { error: `File too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Max size is 5MB` },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      console.log("Invalid file type:", file.type);
      return NextResponse.json(
        { error: `Invalid file type (${file.type}). Allowed: JPG, JPEG, PNG, WEBP, SVG, ICO` },
        { status: 400 }
      );
    }

    // Convert file to Base64
    console.log("Converting file to Base64...");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;
    
    console.log(`Success! Base64 data URL created, length=${dataUrl.length}`);
    
    // Ensure valid JSON response
    const responseBody = { url: dataUrl };
    console.log("Sending response:", JSON.stringify(responseBody).substring(0, 100) + "...");
    
    return NextResponse.json(responseBody, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      }
    });
    
  } catch (error: any) {
    console.error("=== UPLOAD API ERROR ===");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Stack:", error.stack);
    
    const errorMessage = error.message || "Unknown error occurred";
    return NextResponse.json(
      { error: `Failed to upload image: ${errorMessage}` },
      { 
        status: 500,
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      }
    );
  }
}
