import fs from "fs";
import path from "path";
import { ReviewItem, ReviewSubmissionPayload, ReviewsStats } from "./types";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "abgnt2026";

// Path definitions
const PRIMARY_DATA_PATH = path.join(process.cwd(), "data", "reviews.json");
const FALLBACK_TMP_PATH = path.join("/tmp", "reviews.json");

// In-memory cache for ultra-fast response
let memoryCache: ReviewItem[] | null = null;

const DEFAULT_SEEDS: ReviewItem[] = [];

function readFromDisk(): ReviewItem[] {
  // Check primary data path
  try {
    if (fs.existsSync(PRIMARY_DATA_PATH)) {
      const raw = fs.readFileSync(PRIMARY_DATA_PATH, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn("Could not read primary reviews file:", err);
  }

  // Check fallback tmp path (for serverless environments)
  try {
    if (fs.existsSync(FALLBACK_TMP_PATH)) {
      const raw = fs.readFileSync(FALLBACK_TMP_PATH, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn("Could not read fallback reviews file:", err);
  }

  return DEFAULT_SEEDS;
}

function writeToDisk(items: ReviewItem[]): void {
  let written = false;

  // Try writing to primary data path
  try {
    const dir = path.dirname(PRIMARY_DATA_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(PRIMARY_DATA_PATH, JSON.stringify(items, null, 2), "utf8");
    written = true;
  } catch {
    // Expected on read-only serverless lambdas
  }

  // If primary write failed or in serverless environment, write to /tmp
  if (!written) {
    try {
      fs.writeFileSync(FALLBACK_TMP_PATH, JSON.stringify(items, null, 2), "utf8");
    } catch (err) {
      console.warn("Could not write to fallback tmp path:", err);
    }
  }

  // Always update in-memory cache
  memoryCache = items;
}

export function getAllReviews(): ReviewItem[] {
  if (!memoryCache) {
    memoryCache = readFromDisk();
  }
  return memoryCache;
}

export function calculateStats(reviews: ReviewItem[]): ReviewsStats {
  const approvedReviewsWithRating = reviews.filter(
    (r) => r.status === "approved" && r.type === "review" && typeof r.rating === "number" && r.rating > 0
  );

  const totalRatings = approvedReviewsWithRating.length;
  const ratingSum = approvedReviewsWithRating.reduce((acc, curr) => acc + (curr.rating || 0), 0);
  const averageRating = totalRatings > 0 ? Number((ratingSum / totalRatings).toFixed(1)) : 0;

  const totalReviews = reviews.filter((r) => r.status === "approved" && r.type === "review").length;
  const totalComments = reviews.filter((r) => r.status === "approved" && r.type === "comment").length;

  return {
    averageRating,
    totalRatings,
    totalReviews,
    totalComments,
  };
}

export function getApprovedData(): {
  reviews: ReviewItem[];
  comments: ReviewItem[];
  stats: ReviewsStats;
} {
  const all = getAllReviews();
  const approved = all.filter((item) => item.status === "approved");

  // Sort newest first
  approved.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const reviews = approved.filter((item) => item.type === "review");
  const comments = approved.filter((item) => item.type === "comment");
  const stats = calculateStats(all);

  return { reviews, comments, stats };
}

export function verifyAdminPasscode(inputPasscode: string): boolean {
  if (!inputPasscode) return false;
  return inputPasscode.trim() === ADMIN_PASSCODE.trim();
}

export function createReviewSubmission(payload: ReviewSubmissionPayload): ReviewItem {
  const all = getAllReviews();

  const newItem: ReviewItem = {
    id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type: payload.type === "comment" ? "comment" : "review",
    name: payload.name.trim(),
    role: payload.role?.trim() || undefined,
    hasBought: Boolean(payload.hasBought),
    rating: payload.type === "review" && payload.rating ? Math.max(1, Math.min(5, Number(payload.rating))) : undefined,
    content: payload.content.trim(),
    status: "pending", // ALWAYS pending approval!
    createdAt: new Date().toISOString(),
  };

  const updated = [newItem, ...all];
  writeToDisk(updated);
  return newItem;
}

export function moderateReview(
  id: string,
  action: "approve" | "reject" | "delete",
  passcode: string
): { success: boolean; error?: string; item?: ReviewItem } {
  if (!verifyAdminPasscode(passcode)) {
    return { success: false, error: "Unauthorized: Invalid admin passcode" };
  }

  const all = getAllReviews();
  const index = all.findIndex((r) => r.id === id);

  if (index === -1) {
    return { success: false, error: "Item not found" };
  }

  if (action === "delete") {
    const updated = all.filter((r) => r.id !== id);
    writeToDisk(updated);
    return { success: true };
  }

  const updatedStatus = action === "approve" ? "approved" : "rejected";
  all[index] = {
    ...all[index],
    status: updatedStatus,
  };

  writeToDisk(all);
  return { success: true, item: all[index] };
}
