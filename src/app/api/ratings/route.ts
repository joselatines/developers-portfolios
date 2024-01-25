import { NextRequest, NextResponse } from "next/server";
import { RatingsController } from "../src/controllers/ratings";
import { RatingsModel } from "../src/models/ratings";

const model = new RatingsModel();
const controller = new RatingsController(model);

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const id = searchParams.get("id");

	if (id) {
		const item = await controller.getByKey("id", id);
		return Response.json(item);
	}

	const ratings = await controller.getAll();

	return Response.json(ratings);
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
