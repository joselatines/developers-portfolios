import AbstractModel from ".";
import { Item } from "../controllers/interfaces";
import { sequelize } from "../database/connection";
import { PortfolioDocument } from "../database/models/interfaces";
import { Portfolio, Ratings } from "../database/models/rating-portfolio";
import { User } from "../database/models/user";
import { buildImageName } from "../utils";
import { firebase } from "../utils/firebase/firebase";
import { ModelResponse } from "./interfaces";

interface BodyPortfolio extends PortfolioDocument {
	createdBy: string;
}

export class PortfoliosModel extends AbstractModel {
	async getAll(): Promise<ModelResponse<Item[]>> {
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
		return { success: true, body: portfoliosWithAverageRating };
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

	async create(body: BodyPortfolio): Promise<ModelResponse<Item>> {
		const thumbnail = body.thumbnail;

		const name = buildImageName(body.title, thumbnail);
		const imgUrl = await firebase.uploadFile({
			name,
			ImageBase64: thumbnail,
		});

		const portfolio = {
			...body,
			thumbnail: imgUrl,
			file_name: name,
		};

		const portfolioCreated = await Portfolio.create(portfolio);

		return { success: true, body: portfolioCreated.dataValues };
	}

	async delete(id: string): Promise<ModelResponse<null>> {
		const portfolioFound = await Portfolio.findByPk(id);

		if (!portfolioFound)
			return { success: false, message: "not found in database" };

		const imgFileName = portfolioFound.dataValues.file_name;

		const portfolioDeleted = await Portfolio.destroy({
			where: { id },
		});

		// TODO: FIRABASE FAILING
		//await firebase.deleteFile(imgFileName);

		const message =
			portfolioDeleted > 0 ? `${id} deleted` : `${id} couldn't be deleted`;

		return { success: true, message };
	}
}
