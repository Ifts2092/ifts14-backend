import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { Post } from "./Post"
import { Role } from "./Role"

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Post, (p) => p.category)
    posts: Post[]

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[]

}
