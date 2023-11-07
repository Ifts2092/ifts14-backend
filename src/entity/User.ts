import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { Post } from "./Post"
import { Role } from "./Role"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string
    
    @ManyToOne(() => Role, (r) => r.users, {
        eager: true,
    })
    @JoinColumn()
    role: Role

    @OneToMany(() => Post, (p) => p.user)
    posts: Post[]

}
