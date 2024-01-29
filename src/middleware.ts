import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

const { NEXTAUTH_SECRET } = process.env;

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
	const session = await getToken({ req, secret: NEXTAUTH_SECRET });

	if (!session) {
		const requestedPage = req.nextUrl.pathname;
		const url = req.nextUrl.clone();
		url.pathname = "/auth";
		url.search = `p=${requestedPage}`;

		return NextResponse.redirect(url);
	}
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
