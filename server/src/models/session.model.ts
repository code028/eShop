import { Document, Schema, Types, model } from "mongoose";

export interface ISessionSchema extends Document {
    userId: Types.ObjectId,
    refreshToken: string,
    active: boolean,
    userAgent: string
}

const sessionSchema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            ref: "User",
            required: true
        },
        refreshToken: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        },
        userAgent: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const sessionModel = model<ISessionSchema>("Session", sessionSchema);

export default sessionModel;