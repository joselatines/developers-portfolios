import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export function rateLimit(requests = 10, minutes = 60): Ratelimit {
	const ratelimitObject = new Ratelimit({
		redis: Redis.fromEnv(),
		limiter: Ratelimit.slidingWindow(requests, `${minutes} m`),
	});

	return ratelimitObject;
}
