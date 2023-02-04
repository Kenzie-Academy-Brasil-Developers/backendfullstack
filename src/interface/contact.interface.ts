import Users from "../entities/users.entity"

export interface IAddContact {
    fullName: string
    email: string
    telephone: string
    user: Users
}

export interface IUpdateContact {
    fullName?: string
    email?: string
    telephone?: string
}