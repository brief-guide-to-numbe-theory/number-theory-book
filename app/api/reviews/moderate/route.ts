import { NextResponse } from "next/server";
import { moderateReview } from "../../../../lib/reviews-store";
import { checkAdminRateLimit } from "../../../../lib/ratelimit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const rateLimit = await checkAdminRateLimit(request);
    if (!rateLimit.success) {
      return NextResponse.json(
        { success: false, error: "Too many admin attempts. Please wait 5 minutes." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { passcode, id, action } = body;

    if (!passcode || typeof passcode !== "string") {
      return NextResponse.json(
        { success: false, error: "Admin passcode is required" },
        { status: 401 }
      );
    }

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { success: false, error: "Review ID is required" },
        { status: 400 }
      );
    }

    if (!action || !["approve", "reject", "delete"].includes(action)) {
      return NextResponse.json(
        { success: false, error: "Invalid action. Must be approve, reject, or delete" },
        { status: 400 }
      );
    }

    const result = await moderateReview(id, action, passcode);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Moderation failed" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      action,
      id,
      item: result.item,
    });
  } catch (error) {
    console.error("POST /api/reviews/moderate error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error during moderation" },
      { status: 500 }
    );
  }
}
