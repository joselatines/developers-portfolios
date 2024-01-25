export interface Response {
	success: boolean;
	message?: string;
	body?: any;
}

export interface ParamsRequest {
  portfolioId?: string;
  // Add more parameters as needed
}