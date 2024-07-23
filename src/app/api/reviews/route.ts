import { prisma } from "../../../database";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const portfolioId = searchParams.get("portfolio");

	let reviews = [];
	if (portfolioId) {
		reviews = await prisma.reviews.findMany({
			include: {
				users: {
					select: {
						id: true,
						githubUsername: true,
						email: true,
						profilePic: true,
					},
				},
			},
			where: {
				portfolio_id: portfolioId,
			},
		});
	} else {
		reviews = await prisma.reviews.findMany({
			include: {
				users: {
					select: {
						id: true,
						githubUsername: true,
						email: true,
						profilePic: true,
					},
				},
			},
		});
	}

	// rename the 'users' field to 'user'
	reviews = reviews.map(review => ({
		...review,
		users: undefined,
		user: review.users,
	}));

	return Response.json({ success: true, data: reviews });
}
