import { Application, Request, Response, Router } from "express"
import { userRoutes } from "./user.route";
import { productRoutes } from "./product.route";

const Routes = (server: Application) => {

	// Main route 🔻
		server.get("/", async (req: Request, res: Response) => {
			res.status(200).send({ Server: "Hello World" });
		});

	// User routes 🔻
		userRoutes(server);

	// Product routes 🔻
		productRoutes(server);

	// Unknown endpoint 🔻
		server.get("*", async (req: Request, res: Response) => {
			res.status(404).send({ Message: `Unknown endpoint - ${res.statusCode}!` });
		});
}

export default Routes;