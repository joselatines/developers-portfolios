import { NextRequest, NextResponse } from "next/server";
import { PortfoliosController } from "../src/controllers/portfolios";
import { PortfoliosModel } from "../src/models/portfolios";

const model = new PortfoliosModel();
const controller = new PortfoliosController(model);

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const id = searchParams.get("id");
	if (id) {
		const portfolio = await controller.get(id);
		return Response.json(portfolio);
	}

	const item = await controller.getAll();

	return Response.json(item);
}

export async function POST(req: Request) {
	const data = await req.json();

	const itemCreated = await controller.create(data);

	return Response.json(itemCreated);
}

export async function PUT(req: NextRequest) {
	const body = await req.json();
	const searchParams = req.nextUrl.searchParams;
	const id = searchParams.get("id");

	if (!id)
		return NextResponse.json(
			{
				message: "Pass an id in search params please. /api/portfolios?id=64564",
			},
			{ status: 400 }
		);

	const itemCreated = await controller.edit(id, body);

	return Response.json(itemCreated);
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

	const itemDeleted = await controller.delete(id);

	return NextResponse.json(itemDeleted);
}
