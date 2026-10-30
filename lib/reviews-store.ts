import fs from "fs";
import path from "path";
import { ReviewItem, ReviewSubmissionPayload, ReviewsStats } from "./types";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "abgnt2026";
const REDIS_KEY = "abgnt_reviews";

// Path definitions for local/disk fallback
const PRIMARY_DATA_PATH = path.join(process.cwd(), "data", "reviews.json");
const FALLBACK_TMP_PATH = path.join("/tmp", "reviews.json");

// In-memory cache for ultra-fast response
let memoryCache: ReviewItem[] | null = null;

const DEFAULT_SEEDS: ReviewItem[] = [];

function cleanEnvValue(str: string | undefined): string {
  if (!str) return "";
  let s = str.trim();
  // If the user accidentally pasted "KEY=VALUE" into the value field in Vercel
  if (s.includes("=")) {
    const parts = s.split("=");
    if (parts.length > 1) {
      s = parts.slice(1).join("=").trim();
    }
  }
  // Strip leading and trailing quotes (both double and single)
  s = s.replace(/^["']+|["']+$/g, "").trim();
  return s;
}

/**
 * Check whether Upstash Redis (or Vercel KV) environment variables are available.
 */
function getUpstashCredentials(): { url: string; token: string } | null {
  const rawUrl =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_URL ||
    process.env.UPSTASH_REST_API_URL ||
    process.env.REDIS_REST_URL ||
    "";

  const rawToken =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_TOKEN ||
    process.env.UPSTASH_REST_API_TOKEN ||
    process.env.REDIS_REST_TOKEN ||
    "";

  let url = cleanEnvValue(rawUrl).replace(/\/+$/, "");
  const token = cleanEnvValue(rawToken);

  if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  if (url && token) {
    return { url, token };
  }
  return null;
}

export function isUpstashConfigured(): boolean {
  return getUpstashCredentials() !== null;
}

export async function testUpstashConnection(): Promise<any> {
  const creds = getUpstashCredentials();
  if (!creds) {
    return { configured: false, reason: "Credentials missing or null" };
  }

  try {
    const res = await fetch(creds.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${creds.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["PING"]),
      cache: "no-store",
    });

    const bodyText = await res.text().catch(() => "");
    return {
      configured: true,
      url: creds.url,
      tokenLength: creds.token.length,
      status: res.status,
      statusText: res.statusText,
      response: bodyText.slice(0, 300),
    };
  } catch (err: any) {
    return {
      configured: true,
      url: creds.url,
      tokenLength: creds.token.length,
      error: err.message,
    };
  }
}

/**
 * Execute a command against Upstash Redis REST API.
 */
async function upstashCommand(command: (string | number)[]): Promise<any> {
  const creds = getUpstashCredentials();
  if (!creds) return null;

  try {
    const res = await fetch(creds.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${creds.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => "");
      console.warn(
        `Upstash REST API returned HTTP ${res.status} ${res.statusText}:`,
        errorText
      );
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Upstash Redis fetch error:", err);
    return null;
  }
}

/**
 * Read reviews from Upstash Redis.
 * Returns ReviewItem[] if found, null if key doesn't exist or error.
 */
async function readFromUpstash(): Promise<ReviewItem[] | null> {
  try {
    const data = await upstashCommand(["GET", REDIS_KEY]);
    if (!data || data.result === null || data.result === undefined) {
      return null;
    }

    let parsed = data.result;
    if (typeof parsed === "string") {
      try {
        parsed = JSON.parse(parsed);
      } catch (e) {
        console.warn("Failed to parse Upstash Redis string as JSON:", e);
        return null;
      }
    }

    if (Array.isArray(parsed)) {
      return parsed as ReviewItem[];
    }

    return null;
  } catch (err) {
    console.error("Failed to read from Upstash:", err);
    return null;
  }
}

/**
 * Write reviews to Upstash Redis.
 */
async function writeToUpstash(items: ReviewItem[]): Promise<boolean> {
  try {
    const data = await upstashCommand([
      "SET",
      REDIS_KEY,
      JSON.stringify(items),
    ]);
    return Boolean(data && data.result === "OK");
  } catch (err) {
    console.error("Failed to write to Upstash:", err);
    return false;
  }
}

/**
 * Read reviews from local disk (or /tmp).
 */
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

/**
 * Write reviews to local disk (or /tmp).
 */
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

/**
 * Write to both local storage and Upstash Redis (if configured).
 */
async function writeToStorage(items: ReviewItem[]): Promise<void> {
  // Always update memory and disk
  writeToDisk(items);

  // If Upstash is configured, save to Upstash cloud
  if (isUpstashConfigured()) {
    await writeToUpstash(items);
  }
}

/**
 * Retrieve all reviews (pending, approved, rejected).
 * Reads from Upstash Redis if available, with graceful fallback to disk.
 */
export async function getAllReviews(): Promise<ReviewItem[]> {
  if (isUpstashConfigured()) {
    const upstashData = await readFromUpstash();
    if (Array.isArray(upstashData)) {
      memoryCache = upstashData;
      return upstashData;
    }

    // If key didn't exist in Upstash yet, seed it with disk/default data
    const diskData = readFromDisk();
    await writeToUpstash(diskData);
    memoryCache = diskData;
    return diskData;
  }

  // Fallback when Upstash is not configured (e.g. offline or local development)
  memoryCache = readFromDisk();
  return memoryCache;
}

export function calculateStats(reviews: ReviewItem[]): ReviewsStats {
  const approvedReviewsWithRating = reviews.filter(
    (r) =>
      r.status === "approved" &&
      r.type === "review" &&
      typeof r.rating === "number" &&
      r.rating > 0
  );

  const totalRatings = approvedReviewsWithRating.length;
  const ratingSum = approvedReviewsWithRating.reduce(
    (acc, curr) => acc + (curr.rating || 0),
    0
  );
  const averageRating =
    totalRatings > 0 ? Number((ratingSum / totalRatings).toFixed(1)) : 0;

  const totalReviews = reviews.filter(
    (r) => r.status === "approved" && r.type === "review"
  ).length;
  const totalComments = reviews.filter(
    (r) => r.status === "approved" && r.type === "comment"
  ).length;

  return {
    averageRating,
    totalRatings,
    totalReviews,
    totalComments,
  };
}

export async function getApprovedData(): Promise<{
  reviews: ReviewItem[];
  comments: ReviewItem[];
  stats: ReviewsStats;
}> {
  const all = await getAllReviews();
  const approved = all.filter((item) => item.status === "approved");

  // Sort newest first
  approved.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const reviews = approved.filter((item) => item.type === "review");
  const comments = approved.filter((item) => item.type === "comment");
  const stats = calculateStats(all);

  return { reviews, comments, stats };
}

export function verifyAdminPasscode(inputPasscode: string): boolean {
  if (!inputPasscode) return false;
  return inputPasscode.trim() === ADMIN_PASSCODE.trim();
}

export async function createReviewSubmission(
  payload: ReviewSubmissionPayload
): Promise<ReviewItem> {
  const all = await getAllReviews();

  const newItem: ReviewItem = {
    id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type: payload.type === "comment" ? "comment" : "review",
    name: payload.name.trim(),
    role: payload.role?.trim() || undefined,
    hasBought: Boolean(payload.hasBought),
    rating:
      payload.type === "review" && payload.rating
        ? Math.max(1, Math.min(5, Number(payload.rating)))
        : undefined,
    content: payload.content.trim(),
    status: "pending", // ALWAYS pending approval!
    createdAt: new Date().toISOString(),
  };

  const updated = [newItem, ...all];
  await writeToStorage(updated);
  return newItem;
}

export async function moderateReview(
  id: string,
  action: "approve" | "reject" | "delete",
  passcode: string
): Promise<{ success: boolean; error?: string; item?: ReviewItem }> {
  if (!verifyAdminPasscode(passcode)) {
    return { success: false, error: "Unauthorized: Invalid admin passcode" };
  }

  const all = await getAllReviews();
  const index = all.findIndex((r) => r.id === id);

  if (index === -1) {
    return { success: false, error: "Item not found" };
  }

  if (action === "delete") {
    const updated = all.filter((r) => r.id !== id);
    await writeToStorage(updated);
    return { success: true };
  }

  const updatedStatus = action === "approve" ? "approved" : "rejected";
  all[index] = {
    ...all[index],
    status: updatedStatus,
  };

  await writeToStorage(all);
  return { success: true, item: all[index] };
}
