import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Exclude } from 'class-transformer'
import Contact from "./contact.entity"

@Entity("users")
export default class Users {
    @PrimaryGeneratedColumn("uuid")
        id:string
    @Column({ length:100 })
        fullName:string
    @Column({ length:150, unique:true })
    @Exclude()
        email: string
    @Column({ length:150 })
    @Exclude()
        password: string
    @Column()
        telephone: string
    @CreateDateColumn()
        createdAt: string
    @UpdateDateColumn()
        updatedAt: string
    @OneToMany(()=>Contact, contact => contact.user)
        contacts: Contact[]
}   