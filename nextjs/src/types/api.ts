export interface ResponseData {
	message?: string;
	success: boolean;
	data?: object | object[] | string | string[];
	error?: object;
}
