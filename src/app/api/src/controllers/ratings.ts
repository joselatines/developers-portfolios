import AbstractController from ".";
import { RatingsDocument } from "../database/models/interfaces";
import { UsersModel } from "../models/users";
import { ControllerResponse, Item } from "./interfaces";
import { UsersController } from "./users";

export class RatingsController extends AbstractController {
	async getAllFromPortfolio(
		portfolioId: string
	): Promise<ControllerResponse<RatingsDocument[]>> {
		const { success, body } = await this.model.getAll();

		if (!success || !body) return { success };

		const ratings = body as unknown as RatingsDocument[];
		const ratingsFromPortfolio = ratings.filter(
			rating => rating.portfolio_id === portfolioId
		);

		return { success, body: ratingsFromPortfolio };
	}

	async createRating(
		body: RatingsDocument,
		userEmail: string
	): Promise<ControllerResponse<Item>> {
		const userModel = new UsersModel();
		const userController = new UsersController(userModel);

		const userRes = await userController.getByKey("email", userEmail);

		if (!userRes.success) return { success: userRes.success };

		const userId = userRes.body?.id;

		const bodyParsed = { ...body, rated_by: userId };

		return await this.create(bodyParsed);
	}
}
