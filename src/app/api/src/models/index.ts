import { Item } from "../controllers/controllers.interface";
import { Model } from "./models.interface";

abstract class AbstractModel implements Model<Item> {
	async create(body: any): Promise<Item> {
		return { id: "" };
	}
	async get(id: string): Promise<Item> {
		return { id: "" };
	}

	async getAll(): Promise<Item[]> {
		return [{ id: "" }];
	}

	async edit(id: string, body: any): Promise<boolean> {
		return false;
	}

	async delete(id: string): Promise<boolean> {
		return false;
	}
}

export default AbstractModel;
