import { Application, Request, Response } from "express";
import { handleGetProductById, handleGetProducts, handleUpdateProduct, handleProductDelete, handleProductRegister } from "../controllers/product.controller";

export const productRoutes = (server: Application) => {

	server.get(["/api/product/:id", "/api/product"], async (req: Request, res: Response) => {
		handleGetProductById(req, res);
	});
	server.get("/api/products", async (req: Request, res: Response) => {
		handleGetProducts(req, res);
	});
	server.post("/api/product/add", async (req: Request, res: Response) => {
		handleProductRegister(req, res);
	});
	server.patch("/api/product/:id", async (req: Request, res: Response) => {
		handleUpdateProduct(req, res);
	});
	server.delete("/api/product/:id", async (req: Request, res: Response) => {
		// handleProductDelete(req, res);
	});
};
