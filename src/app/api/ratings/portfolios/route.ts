import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { RatingsModel } from "@/app/api/src/models/ratings";
import { RatingsController } from "@/app/api/src/controllers/ratings";

const model = new RatingsModel();
const controller = new RatingsController(model);

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const portfolioId = searchParams.get("portfolioId");

	if (portfolioId) {
		const item = await controller.getAllFromPortfolio(portfolioId);
		return Response.json(item);
	}

	const ratings = await controller.getAll();

	return Response.json(ratings);
}

// /ratings/portfolios?portfolioId=46546
export async function POST(req: NextRequest) {
	const body = await req.json();
	const searchParams = req.nextUrl.searchParams;
	const portfolioId = searchParams.get("portfolioId");

	const session = await getServerSession();

	if (!session?.user?.email)
		return NextResponse.json(
			{
				message: "To rate a portfolio you have to be logged in",
			},
			{ status: 400 }
		);

	if (!portfolioId)
		return NextResponse.json(
			{
				message:
					"Pass an portfolioId in search params please. /api/ratings/portfolios?portfolioId=64564",
			},
			{ status: 400 }
		);

	const itemCreated = await controller.createRating(body, session.user.email);
	console.log({ itemCreated });
	return Response.json(itemCreated);
}
