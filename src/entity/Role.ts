import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Subject } from "./Subject"
import { Post } from "./Post"
import { User } from "./User"

@Entity()
export class Role  {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => User, (u) => u.role)
    users: User[]

}
