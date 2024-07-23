import { prisma } from ".";

export const getPortfolioAvgReview = async (portfolioId: string) => {
	const ratingsResult = await prisma.reviews.aggregate({
		_avg: {
			rating: true,
		},
		where: {
			portfolio_id: portfolioId,
		},
	});
	return ratingsResult._avg.rating || 10;
};

export async function getNumberOfPeopleRatedPortfolio(portfolioId: string) {
	const count = await prisma.reviews.count({
		where: {
			portfolio_id: portfolioId,
		},
	});

	return count || 0;
}
