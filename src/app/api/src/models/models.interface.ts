export interface Model<T> {
	get(id: string): Promise<T>;
	getAll(): Promise<T[]>;
	create(body: any): Promise<T>;
	edit(id: string, body: any): Promise<boolean>;
	delete(id: string): Promise<boolean>;
}
