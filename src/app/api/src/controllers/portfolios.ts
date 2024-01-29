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
		userEmail: string
	): Promise<ControllerResponse<Item[]>> {
		const userModel = new UsersModel();
		const userController = new UsersController(userModel);

		const { success, body, message } = await userController.getByKey(
			"email",
			userEmail
		);

		if (!success) return { success, message };

		return await this.model.getAllFromAUser(body?.id as string) ;
	}
}
