import AbstractModel from ".";
import { Item } from "../controllers/interfaces";
import { User } from "../database/models/user";

export class UsersModel extends AbstractModel {
	async get(email: string): Promise<Item> {
		const user = await User.findOne({ where: { email } });
		return user?.dataValues;
	}
}
