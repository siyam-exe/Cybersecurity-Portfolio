const limit = 3
const windowSeconds = 600
const memory = new Map<string, { count: number; resetAt: number }>()

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  retryAfter: number
  durable: boolean
}

function checkMemory(identifier: string): RateLimitResult {
  const now = Date.now()
  const existing = memory.get(identifier)
  const record = !existing || existing.resetAt <= now ? { count: 0, resetAt: now + windowSeconds * 1000 } : existing
  record.count += 1
  memory.set(identifier, record)

  if (memory.size > 500) {
    for (const [key, value] of memory) {
      if (value.resetAt <= now) memory.delete(key)
    }
  }

  return {
    allowed: record.count <= limit,
    remaining: Math.max(0, limit - record.count),
    retryAfter: Math.max(1, Math.ceil((record.resetAt - now) / 1000)),
    durable: false,
  }
}

export async function checkContactRateLimit(identifier: string): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN
  if (!url || !token) return checkMemory(identifier)

  const now = Math.floor(Date.now() / 1000)
  const bucket = Math.floor(now / windowSeconds)
  const key = `portfolio:contact:${bucket}:${identifier}`
  const response = await fetch(`${url.replace(/\/$/, "")}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify([["INCR", key], ["EXPIRE", key, windowSeconds + 60]]),
    cache: "no-store",
  })

  if (!response.ok) throw new Error("Rate-limit service failed")
  const results = await response.json() as Array<{ result?: number | string; error?: string }>
  if (results.some((result) => result.error)) throw new Error("Rate-limit service failed")

  const count = Number(results[0]?.result)
  if (!Number.isFinite(count)) throw new Error("Rate-limit service returned an invalid response")

  return {
    allowed: count <= limit,
    remaining: Math.max(0, limit - count),
    retryAfter: windowSeconds - now % windowSeconds,
    durable: true,
  }
}
