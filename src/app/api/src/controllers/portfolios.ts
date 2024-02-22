import { getServerSession } from "next-auth";
import AbstractController from ".";
import { UsersModel } from "../models/users";
import { ControllerResponse, Item } from "./interfaces";
import { UsersController } from "./users";
import { authOptions } from "../../auth/config";

export class PortfoliosController extends AbstractController {
	async getAll(): Promise<ControllerResponse<Item[]>> {
		const { body } = await this.model.getAll();

		if (!body)
			return {
				success: true,
				message: "There is no portfolios in yet",
			};

		const orderedPortfolios = body.sort((a: any, b: any) => {
			// First compare avgRating
			if (a.avgRating !== b.avgRating) {
				return b.avgRating - a.avgRating; // Sort by avgRating in descending order
			}

			// If avgRating is the same, compare peopleRated
			if (a.peopleRated !== b.peopleRated) {
				return b.peopleRated - a.peopleRated; // Sort by peopleRated in descending order
			}

			// If both peopleRated and avgRating are the same, compare updatedAt
			return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
		});

		return {
			body: orderedPortfolios,
			success: true,
			message: "All portfolios",
		};
	}

	async create(body: any): Promise<ControllerResponse<Item>> {
		const session = await getServerSession(authOptions);

		const userEmail = session?.user?.email;

		if (!userEmail) return { success: false, message: "user not logged" };

		const userModel = new UsersModel();
		const userController = new UsersController(userModel);

		const user = await userController.getByKey("email", userEmail);

		if (!user.success)
			return { success: false, message: "user not in database" };

		const portfolioToCreate = { ...body, created_by: user.body?.id };
		const createdItem = await this.model.create(portfolioToCreate);
		const x: any = createdItem;

		return {
			body: x,
			success: true,
			message: "Portfolio created",
		};
	}

	async getAllFromAUser(
		key: string,
		value: string
	): Promise<ControllerResponse<Item[]>> {
		const userModel = new UsersModel();
		const userController = new UsersController(userModel);

		const { success, body, message } = await userController.getByKey(
			key,
			value
		);

		if (!success) return { success, message };

		return await this.model.getAllFromAUser(body?.id as string);
	}
}
