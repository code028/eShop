export interface ISession {
    accessToken: string,
    refreshToken: string,
    user: any
}

export interface IUserSchema {
    name: string,
    username: string,
    email: string,
    createdAt: Date,
    updatedAt: Date
}

export interface IProductSchema {
    id: string,
    name: string,
    price: number,
    description: string,
    category: string,
    quantity: number,
    createdAt: Date,
    updatedAt: Date,
    products: IProductSchema[]
}

