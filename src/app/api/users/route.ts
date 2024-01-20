import { NextRequest, NextResponse } from "next/server";
import { UsersController } from "../src/controllers/users";
import { UsersModel } from "../src/models/users";

const model = new UsersModel();
const controller = new UsersController(model);

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const id = searchParams.get("id");
	if (id) {
		const item = await controller.get(id);
		return Response.json(item);
	}

	const users = await controller.getAll();

	return Response.json(users);
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
				message: "Pass an id in search params please. /api/users?id=64564",
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
				message: "Pass an id in search params please. /api/users?id=64564",
			},
			{ status: 400 }
		);

	const itemDeleted = await controller.delete(id);

	return NextResponse.json(itemDeleted);
}
