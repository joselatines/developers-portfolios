export interface ModelResponse<T> {
	success: boolean;
	message?: string;
	body?: T;
}

export interface Model<T> {
	get(id: string): Promise<ModelResponse<T>>;
	getAll(): Promise<ModelResponse<T[]>>;
	create(body: any): Promise<ModelResponse<T>>;
	edit(id: string, body: any): Promise<ModelResponse<null>>;
	delete(id: string): Promise<ModelResponse<null>>;
}
