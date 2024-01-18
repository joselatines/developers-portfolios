export interface Item {
	id: string;
}

export interface ControllerResponse<T> {
	body?: T;
	message?: string; // Corrected type of "message"
}

export interface Controller {
	get(id: string): Promise<ControllerResponse<Item>>;
	getAll(): Promise<ControllerResponse<Item[]>>;
	create(body: any): Promise<ControllerResponse<Item>>;
	edit(id: string, body: any): Promise<ControllerResponse<boolean>>;
	delete(id: string): Promise<ControllerResponse<boolean>>;
}
