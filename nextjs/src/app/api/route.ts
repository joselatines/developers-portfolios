import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
	return new Response("Hello, Next.js!", {
		status: 200,
	});
}
