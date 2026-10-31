import { NextResponse } from "next/server";
import { checkReaderRateLimit } from "../../../../lib/ratelimit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const rateLimit = await checkReaderRateLimit(request);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          valid: false,
          error: "Too many verification attempts. Please wait a few minutes.",
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { code } = body;

    const expectedCode = process.env.READER_ACCESS_CODE || "F6z@";

    if (!code || typeof code !== "string") {
      return NextResponse.json({ valid: false, error: "Code is required" }, { status: 400 });
    }

    const cleanInput = code.trim();
    const cleanExpected = expectedCode.trim();

    if (cleanInput === cleanExpected) {
      return NextResponse.json({ valid: true });
    }

    return NextResponse.json({
      valid: false,
      error: "Incorrect code. Please check the back of your book or scan the QR code.",
    });
  } catch (error) {
    console.error("POST /api/reviews/verify-code error:", error);
    return NextResponse.json(
      { valid: false, error: "Server error during verification" },
      { status: 500 }
    );
  }
}
