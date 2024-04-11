import { Schema, model } from "mongoose";

export interface IProductSchema extends Document {
    name: string,
	price: number,
    description: string,
	category: string,
	quantity: number,
    createdAt: Date,
    updatedAt: Date
}

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
			type: Number,
			required: true,
            min: 1
		},
        description : {
            type: String,
            required: true
        },
        category : {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
			min: 0,
			default: 0
        }
    },
    {
        timestamps: true
    }
);

const productModel = model<IProductSchema>("Product", productSchema);

export default productModel;