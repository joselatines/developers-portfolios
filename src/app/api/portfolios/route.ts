import { NextRequest, NextResponse } from "next/server";
import { PortfoliosController } from "../src/controllers/portfolios";
import { PortfoliosModel } from "../src/models/portfolios";

const model = new PortfoliosModel();
const controller = new PortfoliosController(model);

export async function GET() {
	const portfolios = await controller.getAll();

	return Response.json(portfolios);
}

export async function POST(req: Request) {
	const body = await req.json();

	const portfolioCreated = await controller.create(body);

	return Response.json(portfolioCreated);
}

export async function DELETE(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const id = searchParams.get("id");

	if (!id)
		return NextResponse.json(
			{
				message: "Pass an id in search params please. /api/portfolios?id=64564",
			},
			{ status: 400 }
		);

	const portfolioDeleted = await controller.delete(id);

	return NextResponse.json(portfolioDeleted);
}
