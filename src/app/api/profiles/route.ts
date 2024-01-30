import { NextRequest, NextResponse } from "next/server";
import { PortfoliosController } from "../src/controllers/portfolios";
import { PortfoliosModel } from "../src/models/portfolios";
import { UsersController } from "../src/controllers/users";
import { UsersModel } from "../src/models/users";
import { PortfolioDocument } from "../src/database/models/interfaces";

const portfolioModel = new PortfoliosModel();
const portfolioController = new PortfoliosController(portfolioModel);
const userModel = new UsersModel();
const userController = new UsersController(userModel);

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const userId = searchParams.get("userId");

	if (userId) {
		const { success, body: user } = await userController.get(userId);

		if (!success)
			return NextResponse.json({
				success: false,
				message: "User doesn't exits ",
			});

		const { body: portfolios } = await portfolioController.getAllFromAUser(
			"id",
			userId
		);

		let globalAvgRating = 10;

		if (portfolios) {
			const calculateGlobalAvgRating = (portfolios: PortfolioDocument[]) => {
				const totalRatings = portfolios.reduce(
					(sum, portfolio) => sum + (portfolio.avgRating || 0),
					0
				);

				const globalAvgRating = totalRatings / portfolios.length;

				return Number(globalAvgRating.toFixed(2));
			};

			globalAvgRating = calculateGlobalAvgRating(
				portfolios as PortfolioDocument[]
			);
		}

		return NextResponse.json({
			success: true,
			body: {
				user,
				portfolios,
				globalAvgRating,
			},
		});
	}
}
