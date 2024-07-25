import { prisma } from "@/database";
import {
	getNumberOfPeopleRatedPortfolio,
	getPortfolioAvgReview,
} from "@/database/utils";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const userId = searchParams.get("id");
	if (!userId)
		return Response.json(
			{
				success: false,
				message: "Id is required",
			},
			{ status: 401 }
		);

	const user = await prisma.users.findFirst({
		where: { id: userId },
		select: {
			id: true,
			githubUsername: true,
			email: true,
			profilePic: true,
			provider: true,
			role: true,
		},
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
