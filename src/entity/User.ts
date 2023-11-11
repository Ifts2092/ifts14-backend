import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { Post } from "./Post"
import { Role } from "./Role"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column({ select: false })
    password: string
    
    @ManyToOne(() => Role, (r) => r.users, {
        eager: true,
    })
    @JoinColumn()
    role: Role

    @Column()
    roleId: number

    @OneToMany(() => Post, (p) => p.user)
    posts: Post[]

}
