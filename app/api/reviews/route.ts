import { NextResponse } from "next/server";
import {
  getApprovedData,
  getAllReviews,
  verifyAdminPasscode,
  createReviewSubmission,
  calculateStats,
  isUpstashConfigured,
  testUpstashConnection,
} from "../../../lib/reviews-store";
import { ReviewSubmissionPayload } from "../../../lib/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

export async function GET(request: Request) {
  try {
    const adminPasscode = request.headers.get("x-admin-passcode");

    // If valid admin passcode supplied in header, return all reviews (pending, approved, rejected)
    if (adminPasscode && verifyAdminPasscode(adminPasscode)) {
      const all = await getAllReviews();
      const stats = calculateStats(all);
      const connTest = await testUpstashConnection();
      return NextResponse.json(
        {
          success: true,
          isAdmin: true,
          items: all,
          stats,
          debug: {
            configured: isUpstashConfigured(),
            connection: connTest,
          },
        },
        { headers: NO_CACHE_HEADERS }
      );
    }

    // Otherwise, return only public approved reviews & comments
    const data = await getApprovedData();
    return NextResponse.json(
      {
        success: true,
        isAdmin: false,
        reviews: data.reviews,
        comments: data.comments,
        stats: data.stats,
      },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (error) {
    console.error("GET /api/reviews error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve reviews" },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, role, hasBought, rating, content, readerCode } = body;

    // Verify Reader Access Code (F6z@)
    const READER_ACCESS_CODE = "F6z@";
    const providedCode = (readerCode || request.headers.get("x-reader-code") || "").trim();

    if (providedCode !== READER_ACCESS_CODE) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Verification required: Only readers with the 4-character code from the back of the book (or who scanned the QR code) can submit reviews or comments.",
        },
        { status: 403 }
      );
    }

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Comment or review content is required" },
        { status: 400 }
      );
    }

    if (name.trim().length > 100) {
      return NextResponse.json(
        { success: false, error: "Name must be less than 100 characters" },
        { status: 400 }
      );
    }

    if (content.trim().length > 3000) {
      return NextResponse.json(
        { success: false, error: "Content must be less than 3,000 characters" },
        { status: 400 }
      );
    }

    const payload: ReviewSubmissionPayload = {
      type: type === "comment" ? "comment" : "review",
      name: name.trim(),
      role: role && typeof role === "string" ? role.trim() : undefined,
      hasBought: Boolean(hasBought),
      rating:
        type !== "comment" && rating
          ? Math.max(1, Math.min(5, Number(rating)))
          : undefined,
      content: content.trim(),
    };

    const created = await createReviewSubmission(payload);

    return NextResponse.json({
      success: true,
      message:
        "Your submission has been received and is pending author approval. It will appear once reviewed.",
      id: created.id,
    });
  } catch (error) {
    console.error("POST /api/reviews error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
