import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "../src/utils/rate-limit";



export async function POST(request: NextRequest) {
	try {
		const data = await request.json();
		const ratelimit = rateLimit();
		const ip = request.headers.get("x-forwarded-for") ?? "";
		const { success } = await ratelimit.limit(ip);

		if (!success) {
			return new NextResponse("You can only send a request 10 times per hour.", {
				status: 429,
			});
		}

		return new NextResponse("Your data: " + JSON.stringify(data), {
			status: 200,
		});
	} catch (err: any) {
		return new NextResponse(err.message, {
			status: 400,
		});
	}
}
