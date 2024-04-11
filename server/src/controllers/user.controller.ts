import { Request, Response } from "express";
import { registerUser, loginUser, logoutUser, getUserById, updateUser } from "../services/user.service";

export const handleGetUserById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        // @ts-ignore
        const user = await getUserById(id);

        return res.status(200).send(user);
        
    } catch (error: any) {
        return res.status(error.status || 500).send(error);
    }
}

export const handleUpdateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = { ...req.body };
        
        // @ts-ignore
        const response = await updateUser(id, user);

        return res.status(200).send(response);
        
    } catch (error: any) {
        return res.status(error.status || 500).send(error);
    }
}

export const handleUserRegister = async (req: Request, res: Response) => {
    try {
        const newUser = { ...req.body };
        
        const user = await registerUser(newUser);

        return res.status(200).send(user);

    } catch (error: any) {
        return res.status(error.status || 500).send(error);
    }
}

export const handleUserLogin = async (req: Request, res: Response) => {
    try {
        const user = { ...req.body };
        const userAgent = req.headers["user-agent"];

        const session = await loginUser(user, userAgent!);

        return res.status(200).send(session);

    } catch (error: any) {
        return res.status(error.status || 500).send(error);
    }
}

export const handleUserLogout = async (req: Request, res: Response) => {
    try {
        const session = { ...req.body };
        const userAgent = req.headers["user-agent"];

        const logout = await logoutUser(session, userAgent!);

        return res.status(200).send(logout);
        
    } catch (error: any) {
        return res.status(error.status || 500).send(error);
    }
}