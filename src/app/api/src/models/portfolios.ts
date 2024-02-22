import { QueryTypes } from "sequelize";
import AbstractModel from ".";
import { Item } from "../controllers/interfaces";
import { sequelize } from "../database/connection";
import { PortfolioDocument } from "../database/models/interfaces";
import { Portfolio, Ratings } from "../database/models/rating-portfolio";
import { User } from "../database/models/user";
import { buildImageName } from "../utils";
import { firebase } from "../utils/firebase/firebase";
import { ModelResponse } from "./interfaces";

export class PortfoliosModel extends AbstractModel {
	async getAll(): Promise<ModelResponse<Item[]>> {
		const portfolios = await this.fetchPortfolios({});
		const portfoliosWithAverageRating = await this.getPortfoliosWithRatings(
			portfolios
		);
		return { success: true, body: portfoliosWithAverageRating };
	}

	async getAllFromAUser(userId: string): Promise<ModelResponse<Item[]>> {
		const portfolios = await this.fetchPortfolios({ created_by: userId });
		const portfoliosWithAverageRating = await this.getPortfoliosWithRatings(
			portfolios
		);
		return { success: true, body: portfoliosWithAverageRating };
	}

	async fetchPortfolios(whereClause: object): Promise<PortfolioDocument[]> {
		const portfolios = await Portfolio.findAll({
			order: [
				["createdAt", "ASC"],
				["updatedAt", "ASC"],
			],
			where: whereClause as any,
			include: [
				{
					model: User,
					attributes: {
						exclude: ["password", "role", "createdAt", "updatedAt"],
					},
				},
			],
		});

		return portfolios as PortfolioDocument[];
	}

	async getPortfoliosWithRatings(
		portfolios: PortfolioDocument[]
	): Promise<any[]> {
		const portfolioPromises = portfolios.map(
			async (portfolio: PortfolioDocument) => {
				const ratingsResult = await Ratings.findOne({
					attributes: [
						[sequelize.fn("AVG", sequelize.col("rating")), "averageRating"],
					],
					where: {
						portfolio_id: portfolio.id,
					},
				});

				if (!ratingsResult) return null;

				const peopleRatedQuery = `SELECT COUNT(rating) AS peopleRated FROM ratings WHERE portfolio_id = "${portfolio.id}";`;
				const [peopleRatedResult] = await sequelize.query(peopleRatedQuery, {
					type: QueryTypes.SELECT,
				});

				const avgRating = Number(ratingsResult.dataValues.averageRating) || 10;
				const peopleRated = (peopleRatedResult as any)?.peopleRated || 0;

				return {
					...portfolio.toJSON(),
					avgRating: Number(avgRating.toFixed(2)),
					peopleRated,
				};
			}
		);

		return Promise.all(portfolioPromises);
	}

	async create(body: PortfolioDocument): Promise<ModelResponse<Item>> {
		const { thumbnail, title } = body;

		const name = buildImageName(title, thumbnail);
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
			return { success: false, message: "Not found in database" };

		const imgFileName = portfolioFound.dataValues.file_name;

		const portfolioDeleted = await Portfolio.destroy({
			where: { id },
		});

		await firebase.deleteFile(imgFileName);

		const message =
			portfolioDeleted > 0 ? "Item deleted" : "Item could'n be deleted";

		return { success: true, message };
	}

	async get(id: string): Promise<ModelResponse<PortfolioDocument>> {
		const portfolioFound = await Portfolio.findByPk(id);

		if (!portfolioFound)
			return { success: false, message: "Not found in database" };

		return { success: true, body: portfolioFound as any };
	}

	async edit(
		id: string,
		body: Partial<PortfolioDocument>
	): Promise<ModelResponse<null>> {
		const { thumbnail, title } = body;

		if (!thumbnail) {
			const [portfolioEdited] = await Portfolio.update(body, {
				where: { id: id },
			});
			return { success: portfolioEdited > 0 };
		}

		const thumbnailSaved = thumbnail.includes("firebasestorage");

		// no new image
		if (thumbnailSaved) {
			const [portfolioEdited] = await Portfolio.update(body, {
				where: { id: id },
			});
			return { success: portfolioEdited > 0 };
		}

		// delete the old image
		const portfolio = await Portfolio.findByPk(id);
		if (!portfolio) {
			return {
				success: false,
				message: `Current image couldn't be deleted from firebase (${id} couldn't be found in database)`,
			};
		}
		const imgFileName = portfolio.dataValues.file_name;

		await firebase.deleteFile(imgFileName);

		// upload new image
		const name = buildImageName(title, thumbnail);
		const imgUrl = await firebase.uploadFile({
			name,
			ImageBase64: thumbnail,
		});

		const portfolioToEdit = {
			...body,
			thumbnail: imgUrl,
			file_name: name,
		};

		const [portfolioEdited] = await Portfolio.update(portfolioToEdit, {
			where: { id: id },
		});
		return { success: portfolioEdited > 0 };
	}
}
