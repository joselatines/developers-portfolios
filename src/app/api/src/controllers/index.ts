import AbstractModel from "../models";
import { Controller, ControllerResponse, Item } from "./interfaces";

abstract class AbstractController implements Controller {
	constructor(protected model: AbstractModel) {}

	async get(id: string): Promise<ControllerResponse<Item>> {
		const item = await this.model.get(id);
		return { body: item, message: "success" };
	}

	async getAll(): Promise<ControllerResponse<Item[]>> {
		const allItems = await this.model.getAll();
		return {
			body: allItems,
			message: "success",
		};
	}

	async create(body: any): Promise<ControllerResponse<Item>> {
		const createdItem = await this.model.create(body);
		return {
			body: createdItem,
			message: "success",
		};
	}

	async edit(id: string, body: any): Promise<ControllerResponse<boolean>> {
		const editedItem = await this.model.edit(id, body);
		return {
			body: editedItem,
			message: "success",
		};
	}

	async delete(id: string): Promise<ControllerResponse<boolean>> {
		const isDeleted = await this.model.delete(id);
		return {
			body: isDeleted,
			message: "success",
		};
	}
}

export default AbstractController;
