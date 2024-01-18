import AbstractModel from ".";
import { Item } from "../controllers/controllers.interface";
import { User } from "../database/models/user.model";

export class UsersModel extends AbstractModel {
	async get(email: string): Promise<Item> {
		const user = await User.findOne({ where: { email } });
		console.log({ user, i: user?.dataValues });
		return user?.dataValues;
	}
}
