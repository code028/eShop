import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel, { IUserSchema } from "../models/user.model";
import sessionModel, { ISessionSchema } from "../models/session.model";
import throwErrorHandler from "../utils/throwErrorHandler";
import emailValidation from "../utils/emailValidation";
import { request } from "express";

export const registerUser = async (user: IUserSchema) => {
    try {
        const { name, username, email, password } = user;
        user.role = "user";
        
        (!name || !username || !email || !password) ? throwErrorHandler(400, "Bad request!") : undefined;

        name.length < 8 ? throwErrorHandler( 400, "Name must contain more than 7 characters!" ) : undefined;
        username.length < 8 ? throwErrorHandler( 400, "Username must contain more than 7 characters!" ) : undefined;
        password!.length < 8 ? throwErrorHandler( 400, "Password must contain more than 7 characters!" ) : undefined;
        
        !emailValidation(email) ? throwErrorHandler( 400, "Your email is not valid!" ) : undefined;

        const userExists = await userModel.findOne({ $or: [{ email: email }, { username: username }] });

        userExists ? throwErrorHandler(400, "Invalid credentials!") : undefined; 

        const hashPassword = await bcrypt.hash( password!, 10 );

        user.password = hashPassword;

        const userLook: Partial<IUserSchema> = {
            name,
            username,
            email,
            role: user.role
        };
        
        await userModel.create(user);

        return { status: 200, message: "User successfully created!", userLook };
    } catch (error: any) {
        throw error;
    }
}

export const loginUser = async (user: IUserSchema, userAgent: string) => {
    try {
        const { username, password } = user;
        const expiresIn: number = parseInt(process.env.TOKEN_EXPIRE!);

        (!username) ? throwErrorHandler(400, "Bad request!") : undefined;
        
        if ( username.length < 8 ) throwErrorHandler( 400, "Username must contain more than 7 characters!");

        const userExists = await userModel.findOne({ $or: [{ email: username }, { username }] });

        if (!userExists) throwErrorHandler(400, "Invalid credentials!");

        const passwordMatch = await bcrypt.compare( password!, userExists?.password! );

        if (!passwordMatch) throwErrorHandler(400, "Invalid credentials!")
        
        const accessToken = jwt.sign(
            { id: userExists?._id, email: userExists?.email, role: userExists?.role }, 
            process.env.ACCESS_SECRET as string, 
            { expiresIn }
        );
        
        const refreshToken = jwt.sign(
            { id: userExists?._id, username: userExists?.username, email: userExists?.email, role: userExists?.role },
			process.env.REFRESH_SECRET as string
        );

        const newSession : Partial<ISessionSchema> = {
            userId: userExists?._id!,
            refreshToken,
            active: true,
            userAgent
        }
        const userDetails: any = {
            id: userExists?._id,
            name: userExists?.name,
            username: userExists?.username,
            email: userExists?.email,
            role: userExists?.role,
            createdAt: userExists?.createdAt,
            updatedAt: userExists?.updatedAt
        }

        const sessionExist = await sessionModel.findOne({ userId: userExists?._id, userAgent: userAgent });

        (!sessionExist) 
            ? await sessionModel.create(newSession)
            : await sessionModel.updateOne({ _id: sessionExist._id }, {refreshToken, active: true, userAgent});

        return { status: 200, message: "User successfully logged", refreshToken, accessToken, user: userDetails };
    } catch (error) {
        throw error;
    }

}

export const logoutUser = async (session: ISessionSchema, userAgent: string) => {
    try {
        const { refreshToken } = session;

        (!refreshToken) ? throwErrorHandler(400, "Bad request! REF_TOKEN") : undefined;
        (!userAgent) ? throwErrorHandler(400, "Bad request! USER_AGENT") : undefined;
        
        const sessionExist = await sessionModel.findOne({ refreshToken,  active: true, userAgent });

        !sessionExist ? throwErrorHandler(401, "User is not logged in!"): undefined;

        sessionExist!.active = false;

        sessionExist!.save();

        return { status: 200, message: "User is successfully logged out!"};
    } catch (error) {
        throw error;
    }
};

export const getUserById = async (_id: string) => {
    try {

        const user = await userModel.findOne({ _id }, {
            password: 0,
        });
    
        if (!user) throw throwErrorHandler(404, 'User not found!');

        return user;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (id: string, user: IUserSchema) => {
    try {
        const userExists = await userModel.findOne({ _id: id });
        
        if (!userExists) throw throwErrorHandler(404, 'User not found!');
        
        const {name, username, email, password, newPassword } = user;
        
        if(!name || !username || !email || !password) throwErrorHandler(400, "Bad request!");
       
        const passwordMatch = await bcrypt.compare( password, userExists?.password!);

        if( !passwordMatch ) throwErrorHandler(400,"Invalid credentials!");

        userExists.name = name;
        userExists.username = username;
        userExists.email = email;

        if( newPassword ) {
            const hashNewPassword = await bcrypt.hash(newPassword,10);
            userExists.password = hashNewPassword;
        }

        userExists.save();

        return userExists;

    } catch (error) {
        throw error;
    }
};

