import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import Users from "./users.entity"

@Entity("contact")
export default class Contact {
    @PrimaryGeneratedColumn("uuid")
        id:string
    @Column({ length:100 })
        fullName:string
    @Column({ length:150 })
        email: string
    @Column()
        telephone: string
    @CreateDateColumn()
        createdAt: string
    @UpdateDateColumn()
        updatedAt: string
    @ManyToOne(()=>Users, { onDelete:"CASCADE" })
        user:Users
}   