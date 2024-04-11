import { Request, Response } from "express";
import { getProductById, getProducts, registerProduct, updateProduct } from "../services/product.service";

export const handleGetProductById = async (req: Request, res: Response) => {
	try {
		const {id} = req.params;

		const response = await getProductById(id);
		
		return res.status(200).send(response);
		
	} catch (error: any) {
		return res.status(error.status || 500).send(error);
	}
}

export const handleGetProducts = async (req: Request, res: Response) => {
	try {
		const products = await getProducts();

		return res.status(200).send(products);
	} catch (error: any) {
		return res.status(error.status || 500).send(error);
	}
}

export const handleProductRegister = async (req: Request, res: Response) => {
	try {
		const newProduct = { ...req.body };

		const product = await registerProduct(newProduct);
		
		return res.status(200).send(product);

	} catch (error: any) {
		return res.status(error.status || 500).send(error);
	}
}

export const handleUpdateProduct = async (req: Request, res: Response) => {
	try {
		const product = req.body;
		const {id} = req.params;

		const response = await updateProduct(id,product);
		
		return res.status(200).send(response);

	} catch (error: any) {
		return res.status(error.status || 500).send(error);
	}
}

export const handleProductDelete = async (req: Request, res: Response) => {
	// product delete logic
}
