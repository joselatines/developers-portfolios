import { prisma } from "@/database";
import {
	getNumberOfPeopleRatedPortfolio,
	getPortfolioAvgReview,
} from "@/database/utils";
import { hashPassword } from "@/helpers/encrypt";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const userId = searchParams.get("id");

	if (!userId) {
		const users = await prisma.users.findMany();
		return Response.json({
			success: true,
			data: users,
			message: "All users",
		});
	}
	const user = await prisma.users.findFirst({
		where: { id: userId },
	});

	if (!user)
		return Response.json({ success: false, message: "User not found in db" });

	const portfolios = await prisma.portfolios.findMany({
		where: { created_by: user.id },
	});

	let totalRating = 0;
	let totalPeopleRated = 0;

	for (const portfolio of portfolios) {
		const avgRating = await getPortfolioAvgReview(portfolio.id);
		const peopleRated = await getNumberOfPeopleRatedPortfolio(portfolio.id);

		totalPeopleRated += peopleRated;
		totalRating += avgRating;
	}

	const portfoliosAvgRating = Number(
		(totalRating / portfolios.length).toFixed(2) || 0
	);

	return Response.json({
		success: true,
		data: {
			...user,
			portfoliosAvgRating,
			totalPeopleRated,
			portfoliosUploaded: portfolios.length,
		},
	});
}

export async function PATCH(req: Request) {
	let body = await req.json();
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");

	if (!id)
		return Response.json(
			{
				message: "Pass an id in search params please. /api/users?id=64564",
			},
			{ status: 400 }
		);

	if (body.password.length > 0) {
		const hashedPassword = await hashPassword(body.password);
		body = { ...body, password: hashedPassword };
	}

	try {
		const itemCreated = await prisma.users.update({
			data: body,
			where: { id: id },
		});
		return Response.json({
			data: itemCreated,
			success: true,
			message: "user updated",
		});
	} catch (error: any) {
		return Response.json(
			{
				success: false,
				message: error?.message || error?.meta?.cause,
				error,
			},
			{ status: 500 }
		);
	}
}
