export interface Item {
	id: string;
}

export interface ControllerResponse<T> {
	success: boolean;
	body?: T;
	message?: string;
}

export interface Controller {
	get(id: string): Promise<ControllerResponse<Item>>;
	getByKey(key: string, value: string): Promise<ControllerResponse<Item>>;
	getAll(): Promise<ControllerResponse<Item[]>>;
	getAllFromAUser(userId: string): Promise<ControllerResponse<Item[]>>;
	create(body: any): Promise<ControllerResponse<Item>>;
	edit(id: string, body: any): Promise<ControllerResponse<null>>;
	delete(id: string): Promise<ControllerResponse<null>>;
}
