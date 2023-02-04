export interface IToken {
    id: string
}

export interface ICreateUser {
    fullName: string
    email: string
    password: string
    telephone: string
}

export interface IUpdateUser {
    fullName?: string
    email?: string
    password?: string
    telephone?: string
}