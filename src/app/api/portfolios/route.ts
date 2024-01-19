import { PortfoliosController } from "../src/controllers/portfolios";
import { PortfoliosModel } from "../src/models/portfolios";

const model = new PortfoliosModel();
const controller = new PortfoliosController(model);

export async function GET() {
	const portfolios = await controller.getAll();

	return Response.json(portfolios);
}

export async function POST(req: Request) {
	const body = await req.json();

	const portfolioCreated = await controller.create(body);

	return Response.json(portfolioCreated);
}
