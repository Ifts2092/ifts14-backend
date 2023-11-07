import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm"
import { Subject } from "./Subject"
import { Post } from "./Post"
import { User } from "./User"
import { Category } from "./Category"

@Entity()
export class Role  {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => User, (u) => u.role)
    users: User[]

    @ManyToMany(() => Category, (category) => category.roles, {
        eager: true,
    })
    categories: Category[]

}
