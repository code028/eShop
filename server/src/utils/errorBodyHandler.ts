import { Request, Response, NextFunction } from "express";

const errorBodyHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	// @ts-ignore
	if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
		const formattedError = {
			status: 400,
			message: err.message,
		};
		return res.status(400).json(formattedError);
	}
	next();
};

export default errorBodyHandler;
