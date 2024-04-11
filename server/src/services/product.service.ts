import productModel, { IProductSchema } from "../models/product.model";
import throwErrorHandler from "../utils/throwErrorHandler";


export const getProductById = async (id: string) => {
	const product = await productModel.findById({_id: id});

	if (!product) throwErrorHandler(404,"Product not found!");

	return {status: 200, product}
}

export const getProducts = async () => {
	const products = await productModel.find();

	return { products }
}

export const registerProduct = async (product: IProductSchema) => {
	const { name, description, price,  category, quantity } = product;
	
	if (!name || !description || !category || !quantity || !price)  throwErrorHandler(400, "Bad request! Missing properties!");

	await productModel.create(product);
	
	return{ status: 200, message: "Product successfully created", product};
}

export const updateProduct = async (id: string, product: IProductSchema) => {
	const productExist = await productModel.findOne({_id: id});
	
	if(!productExist) throwErrorHandler(404, "Product doesn`t exist!");
	
	const {name, description, price, category, quantity} = product;
	
	if (!name || !description || !category || !quantity || !price)  throwErrorHandler(400, "Bad request!")

	// @ts-ignore
	productExist?.name = name;
	// @ts-ignore
	productExist?.description = description;
	// @ts-ignore
	productExist?.category = category;
	// @ts-ignore
	productExist?.quantity = quantity;
	// @ts-ignore
	productExist?.price = price;

	productExist?.save();

	return{ status: 200, message: "Product successfully updated", productExist};
}