import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
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
    
    @ManyToOne(() => Role, (r) => r.users)
    role: Role

    @OneToMany(() => Post, (p) => p.user)
    posts: Post[]

}
