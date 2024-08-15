import { getServerSession } from "next-auth";
import { prisma } from "../../../database";
import { authConfig } from "@/lib/auth";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const portfolioId = searchParams.get("portfolio");

	const include = {
		users: {
			select: {
				id: true,
				username: true,
				githubUsername: true,
				email: true,
				profilePic: true,
			},
		},
	};
	let reviews = [];
	if (portfolioId) {
		reviews = await prisma.reviews.findMany({
			orderBy: {
				updatedAt: "desc",
			},
			include: include,
			where: {
				portfolio_id: portfolioId,
			},
		});
	} else {
		reviews = await prisma.reviews.findMany({
			include: include,
		});
	}

	// rename the 'users' field to 'user'
	reviews = reviews.map(review => ({
		...review,
		user: review.users,
		users: undefined,
	}));

	console.log({reviews})

	return Response.json({ success: true, data: reviews });
}
export async function POST(req: Request) {
	const data = await req.json();
	const { searchParams } = new URL(req.url);
	const portfolioId = searchParams.get("portfolioId");

	const session = await getServerSession(authConfig);
	const user = session?.user as any;

	if (!user)
		return Response.json(
			{ success: false, message: "User not authenticated" },
			{ status: 401 }
		);

	const reviewCreated = await prisma.reviews.create({
		data: { ...data, rated_by: user.id, portfolio_id: portfolioId },
	});

	if (!reviewCreated)
		return Response.json(
			{ success: false, message: "Review not created" },
			{ status: 400 }
		);

	return Response.json({
		success: true,
		data: reviewCreated,
		message: "Review created",
	});
}

export async function DELETE(req: Request) {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");

	if (!id)
		return Response.json(
			{
				message: "Pass an id in search params please. /api/portfolios?id=64564",
				success: false,
			},
			{ status: 400 }
		);
	try {
		const itemDeleted = await prisma.reviews.delete({ where: { id: id } });
		return Response.json({
			data: itemDeleted,
			success: true,
			message: "Review deleted",
		});
	} catch (error: any) {
		return Response.json({
			success: false,
			message: error?.message || error?.meta?.cause,
			error,
		});
	}
}
