import { getServerSession } from "next-auth";
import { PortfoliosController } from "../src/controllers/portfolios";
import { PortfoliosModel } from "../src/models/portfolios";
import { authOptions } from "../auth/config";
import { UsersModel } from "../src/models/users";
import { UsersController } from "../src/controllers/users";

const model = new PortfoliosModel();
const controller = new PortfoliosController(model);

export async function GET() {
	const portfolios = await controller.getAll();

	return Response.json(portfolios);
}

export async function POST(req: Request) {
	const session = await getServerSession(authOptions);
	console.log(session);
	const userEmail = session?.user?.email;
	if (!userEmail) {
		return new Response("User is not authenticated", { status: 401 });
	}

	const userModel = new UsersModel();
	const userController = new UsersController(userModel);

	const user: any = userController.get(userEmail);

	if (!user) return new Response("User is not in database", { status: 401 });

	const portfolioToCreate = { ...req.json(), created_by: user.id };
	const portfolioCreated = await controller.create(portfolioToCreate);

	return Response.json(portfolioCreated);
}
