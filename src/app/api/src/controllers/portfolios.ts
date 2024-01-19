import { getServerSession } from "next-auth";
import AbstractController from ".";
import { UsersModel } from "../models/users";
import { ControllerResponse, Item } from "./interfaces";
import { UsersController } from "./users";
import { authOptions } from "../../auth/config";

export class PortfoliosController extends AbstractController {
	async create(body: any): Promise<ControllerResponse<Item>> {
		const session = await getServerSession(authOptions);

		const userEmail = session?.user?.email;

		if (!userEmail) return { message: "user not logged" };

		const userModel = new UsersModel();
		const userController = new UsersController(userModel);

		const user = await userController.get(userEmail);

		if (!user) return { message: "user not in database" };

		const portfolioToCreate = { ...body, created_by: user.body?.id };
		const createdItem = await this.model.create(portfolioToCreate);

		return {
			body: createdItem,
			message: "success",
		};
	}
}
