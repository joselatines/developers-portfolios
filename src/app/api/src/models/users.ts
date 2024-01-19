import AbstractModel from ".";
import { Item } from "../controllers/interfaces";
import { User } from "../database/models/user";
import { ModelResponse } from "./interfaces";

export class UsersModel extends AbstractModel {
	async get(email: string): Promise<ModelResponse<Item>> {
		const user = await User.findOne({ where: { email } });
		return user?.dataValues;
	}
}
