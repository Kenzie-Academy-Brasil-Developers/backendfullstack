export interface IAddContact {
    fullName: string
    email: string
    telephone: string
}

export interface IUpdateContact {
    fullName?: string
    email?: string
    telephone?: string
}