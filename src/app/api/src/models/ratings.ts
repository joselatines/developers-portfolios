import AbstractModel from ".";
import { Item } from "../controllers/interfaces";
import { Ratings } from "../database/models//rating-portfolio";
import { User } from "../database/models/user";
import { ModelResponse } from "./interfaces";

export class RatingsModel extends AbstractModel {
	async getAll(): Promise<ModelResponse<Item[]>> {
		const ratings = await Ratings.findAll({
			order: [["createdAt", "DESC"]],
			include: [
				{
					model: User,
					attributes: {
						exclude: ["password", "role", "createdAt", "updatedAt", "provider"],
					},
				},
			],
		});

		if (!ratings) return { success: false };

		return { success: true, body: ratings as any };
	}

	async getAllFromAPortfolio(
		portfolioId: string
	): Promise<ModelResponse<Item[]>> {
		const ratings = await Ratings.findAll({
			where: { portfolio_id: portfolioId },
			order: [
				["updatedAt", "ASC"],
				["createdAt", "ASC"],
			],
		});

		if (!ratings) return { success: false };

		return { success: true, body: ratings as any };
	}

	async get(id: string): Promise<ModelResponse<Item>> {
		const rating = await Ratings.findByPk(id);

		if (!rating) return { success: false };

		return { success: true, body: rating as any };
	}

	async create(body: any): Promise<ModelResponse<Item>> {
		const ratingCreated = await Ratings.create(body);

		if (!ratingCreated)
			return {
				success: false,
				message: "Error creating a rating to portfolio",
			};

		return {
			success: true,
			body: ratingCreated as any,
			message: "Portfolio rated successfully",
		};
	}

	async delete(id: string): Promise<ModelResponse<null>> {
		const ratingFound = await Ratings.findByPk(id);

		if (!ratingFound)
			return { success: false, message: "Not found in database" };

		const ratingDeleted = await Ratings.destroy({
			where: { id },
		});

		const message =
			ratingDeleted > 0 ? "Item deleted" : "Item could'n be deleted";

		return { success: true, message };
	}

	async edit(id: string, body: any): Promise<ModelResponse<null>> {
		const ratingEdited = await Ratings.update(body, {
			where: { id },
			returning: true,
		});

		if (!ratingEdited) return { success: false };

		return { success: true, body: ratingEdited as any };
	}
}
