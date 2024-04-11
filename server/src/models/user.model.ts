import { Schema, model } from "mongoose";

export interface IUserSchema extends Document {
    name: string,
    username: string,
    email: string,
    password: string,
    newPassword?: string,
    role: string,
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            default: "user"
        }
    },
    {
        timestamps: true
    }
);

const userModel = model<IUserSchema>("User", userSchema);

export default userModel;