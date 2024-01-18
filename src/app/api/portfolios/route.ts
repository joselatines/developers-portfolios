import { PortfoliosController } from "../src/controllers/portfolios";
import { PortfoliosModel } from "../src/models/portfolios";

const model = new PortfoliosModel();
const controller = new PortfoliosController(model);

export async function GET(req: Request) {
	const portfolios = await controller.getAll();

	return Response.json(portfolios);
}
