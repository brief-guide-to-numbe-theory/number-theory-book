import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let adminRatelimit: Ratelimit | null = null;
let readerRatelimit: Ratelimit | null = null;

function getRedisInstance(): Redis | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_TOKEN;

  if (!url || !token) return null;

  try {
    return new Redis({
      url: url.trim(),
      token: token.trim(),
    });
  } catch {
    return null;
  }
}

export function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const ip = xff.split(",")[0]?.trim();
    if (ip) return ip;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

/**
 * 5 attempts / 5 minutes per IP for admin endpoints
 */
export async function checkAdminRateLimit(request: Request): Promise<{ success: boolean }> {
  const redis = getRedisInstance();
  if (!redis) return { success: true };

  try {
    if (!adminRatelimit) {
      adminRatelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "5 m"),
        analytics: false,
        prefix: "ratelimit:admin",
      });
    }

    const ip = getClientIp(request);
    const result = await adminRatelimit.limit(ip);
    return { success: result.success };
  } catch (err) {
    console.warn("Admin ratelimit error (failing open):", err);
    return { success: true };
  }
}

/**
 * Generous rate limit (20 attempts / 5 minutes per IP) for reader code verification
 * so genuine readers never hit a 429
 */
export async function checkReaderRateLimit(request: Request): Promise<{ success: boolean }> {
  const redis = getRedisInstance();
  if (!redis) return { success: true };

  try {
    if (!readerRatelimit) {
      readerRatelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(20, "5 m"),
        analytics: false,
        prefix: "ratelimit:reader",
      });
    }

    const ip = getClientIp(request);
    const result = await readerRatelimit.limit(ip);
    return { success: result.success };
  } catch (err) {
    console.warn("Reader ratelimit error (failing open):", err);
    return { success: true };
  }
}
