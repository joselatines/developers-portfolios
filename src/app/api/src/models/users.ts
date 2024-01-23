import AbstractModel from ".";
import { Item } from "../controllers/interfaces";
import { User } from "../database/models/user";
import { ModelResponse } from "./interfaces";

export class UsersModel extends AbstractModel {
	async getAll(): Promise<ModelResponse<Item[]>> {
		const users = await User.findAll();

		if (!users) return { success: false };

		return { success: true, body: users as any };
	}

	async get(id: string): Promise<ModelResponse<Item>> {
		const user = await User.findByPk(id);

		if (!user) return { success: false };

		return { success: true, body: user as any };
	}

	async getByKey(key: string, value: string): Promise<ModelResponse<Item>> {
		const user = await User.findOne({ where: { [key]: value } });

		if (!user) return { success: false };

		return { success: true, body: user as any };
	}

	async create(body: any): Promise<ModelResponse<Item>> {
		const userCreated = await User.create(body);

		if (!userCreated) return { success: false };

		return { success: true, body: userCreated as any };
	}

	async delete(id: string): Promise<ModelResponse<null>> {
		const userFound = await User.findByPk(id);

		if (!userFound) return { success: false, message: "not found in database" };

		const userDeleted = await User.destroy({
			where: { id },
		});

		const message =
			userDeleted > 0 ? `${id} deleted` : `${id} couldn't be deleted`;

		return { success: true, message };
	}

	async edit(id: string, body: any): Promise<ModelResponse<null>> {
		const userEdited = await User.update(body, {
			where: { id },
			returning: true,
		});

		if (!userEdited) return { success: false };

		return { success: true, body: userEdited as any };
	}
}
