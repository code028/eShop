import express, { Application } from "express";
import "dotenv/config";
import cors from "cors";
import errorBodyHandler from "./utils/errorBodyHandler";
import Routes from "./routes/index";
import connectionDB from "./database/connection";

const PORT: string | undefined = process.env.SERVER_PORT;
const HOST: string = process.env.HOST!;
const Server: Application = express();

Server.use(cors());
Server.use(express.json());
Server.use(errorBodyHandler);
Server.use(express.urlencoded({ extended: false, limit: "4mb" }));

Routes(Server);

Server.listen(PORT, () => {
	console.clear();
	connectionDB();
	console.log(`\n\tSERVER  [${new Date().toLocaleTimeString()}]\n\n\tServer is started on:\n\t ‣ http://${HOST}:${PORT}`);
});
