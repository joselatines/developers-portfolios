import { NextRequest, NextResponse } from "next/server";
import { RatingsController } from "../src/controllers/ratings";
import { RatingsModel } from "../src/models/ratings";

const model = new RatingsModel();
const controller = new RatingsController(model);

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const id = searchParams.get("id");
	if (id) {
		const item = await controller.get(id);
		return Response.json(item);
	}

	const ratings = await controller.getAll();

	return Response.json(ratings);
}

export async function POST(req: Request) {
	const body = await req.json();

	const itemCreated = await controller.create(body);

	return Response.json(itemCreated);
}

export async function PUT(req: NextRequest) {
	const body = await req.json();
	const searchParams = req.nextUrl.searchParams;
	const id = searchParams.get("id");

	if (!id)
		return NextResponse.json(
			{
				message: "Pass an id in search params please. /api/ratings?id=64564",
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
				message: "Pass an id in search params please. /api/ratings?id=64564",
			},
			{ status: 400 }
		);

	const itemDeleted = await controller.delete(id);

	return NextResponse.json(itemDeleted);
}
