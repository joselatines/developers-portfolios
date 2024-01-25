import AbstractModel from "../models";
import { Controller, ControllerResponse, Item } from "./interfaces";

abstract class AbstractController implements Controller {
	constructor(protected model: AbstractModel) {}

	async get(id: string): Promise<ControllerResponse<Item>> {
		const response = await this.model.get(id);
		return response;
	}

	async getByKey(
		key: string,
		value: string
	): Promise<ControllerResponse<Item>> {
		const response = await this.model.getByKey(key, value);
		return response;
	}

	async getAll(): Promise<ControllerResponse<Item[]>> {
		const response = await this.model.getAll();
		return response;
	}

	async create(body: any): Promise<ControllerResponse<Item>> {
		const createdItem = await this.model.create(body);
		return createdItem;
	}

	async edit(id: string, body: any): Promise<ControllerResponse<null>> {
		const response = await this.model.edit(id, body);
		return response;
	}

	async delete(id: string): Promise<ControllerResponse<null>> {
		const response = await this.model.delete(id);

		return response;
	}
}

export default AbstractController;
