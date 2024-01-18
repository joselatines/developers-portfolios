import AbstractModel from ".";
import { Item } from "../controllers/controllers.interface";
import { sequelize } from "../database/connection";
import { PortfolioDocument } from "../database/models/interfaces";
import { Portfolio, Ratings } from "../database/models/rating-portfolio.model";
import { User } from "../database/models/user.model";
import { buildImageName } from "../utils";
import { firebase } from "../utils/firebase/firebase";

interface BodyPortfolio extends PortfolioDocument {
	createdBy: string;
}

export class PortfoliosModel extends AbstractModel {
	async getAll(): Promise<Item[]> {
		const portfolios = await Portfolio.findAll({
			include: [
				{
					model: User,
					attributes: {
						exclude: ["password", "role", "createdAt", "updatedAt"],
					},
				},
			],
		});

		const portfoliosWithAverageRating = await this.getPortfoliosWithRatings(
			portfolios as any
		);

		return portfoliosWithAverageRating;
	}

	getPortfoliosWithRatings = async (portfolios: PortfolioDocument[]) => {
		const portfolioPromises = portfolios.map(
			async (portfolio: PortfolioDocument) => {
				const averageRating: any = await Ratings.findOne({
					attributes: [
						[sequelize.fn("AVG", sequelize.col("rating")), "averageRating"],
					],
					where: {
						portfolio_id: portfolio.id,
					},
				});

				const avgRating = averageRating?.get("averageRating") | 10;
				return {
					...portfolio.toJSON(),
					avgRating: Number(avgRating.toFixed(2)),
				};
			}
		);

		return Promise.all(portfolioPromises);
	};

	async create(body: BodyPortfolio): Promise<Item> {
		const thumbnail = body.thumbnail;

		const name = buildImageName(body.title, thumbnail);
		const imgUrl = await firebase.uploadFile({
			name,
			ImageBase64: thumbnail,
		});

		body.thumbnail = imgUrl;

		const portfolio = {
			...body,
			thumbnail: imgUrl,
			file_name: name,
			created_by: body.createdBy,
		};

		const portfolioCreated = await Portfolio.create(portfolio);

		return portfolioCreated.dataValues;
	}
}
