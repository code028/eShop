import { Application, Request, Response, request, response } from "express";
import { handleGetUserById, handleUserRegister, handleUserLogin, handleUserLogout, handleUpdateUser } from "../controllers/user.controller";

export const userRoutes = async (server: Application) => {

	server.get("/api/user/:id", async (req: Request, res: Response) => {
		handleGetUserById(req, res);
	});
	server.get("/api/users", async (req: Request, res: Response) => {
		/* handleGetUsers */
	});
	server.patch("/api/user/:id", async (req: Request, res: Response) => {
		handleUpdateUser(req, res);
	});
	server.post("/api/user/login", async (req: Request, res: Response) => {
		handleUserLogin(req, res);
	});
	server.post("/api/user/logout", async (req: Request, res: Response) => { 
		handleUserLogout(req, res);
	});
	server.post("/api/user/register", async (req: Request, res: Response) => { 
		handleUserRegister(req, res);
	});
	server.delete("/api/user/:id", async (req: Request, res: Response) => {
		/* handleUserDelete */
	});

};
