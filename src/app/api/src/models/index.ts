import { Item } from "../controllers/interfaces";
import { Model, ModelResponse } from "./interfaces";

abstract class AbstractModel implements Model<Item> {
	async create(body: any): Promise<ModelResponse<Item>> {
		return { success: false, message: "", body: { id: "" } };
	}
	async get(id: string): Promise<ModelResponse<Item>> {
		return { success: false, message: "", body: { id: "" } };
	}

	async getAll(): Promise<ModelResponse<Item[]>> {
		return { success: false, message: "", body: [{ id: "" }] };
	}

	async edit(id: string, body: any): Promise<ModelResponse<null>> {
		return { success: false, message: "" };
	}

	async delete(id: string): Promise<ModelResponse<null>> {
		return { success: false, message: "" };
	}
}

export default AbstractModel;
