import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

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
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large. Max size is 5MB" }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Allowed types: JPG, JPEG, PNG, WEBP, SVG, ICO" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename - ensure proper extension handling
    let extension = path.extname(file.name).toLowerCase();
    if (!extension) {
      // Map mime type to extension if no extension in filename
      const mimeToExt: { [key: string]: string } = {
        "image/jpeg": ".jpg",
        "image/jpg": ".jpg",
        "image/png": ".png",
        "image/webp": ".webp",
        "image/svg+xml": ".svg",
        "image/x-icon": ".ico"
      };
      extension = mimeToExt[file.type] || ".jpg";
    }

    const safeFilename = file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.-]/g, "");
    const filename = `${uuidv4()}-${safeFilename}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    // Ensure directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // Ignore if directory already exists
    }

    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const fileUrl = `/uploads/${filename}`;
    
    console.log(`File uploaded successfully: ${fileUrl}`);
    return NextResponse.json({ url: fileUrl });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload image: " + error.message }, { status: 500 });
  }
}
