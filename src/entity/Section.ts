import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Subject } from "./Subject"
import { Post } from "./Post"

@Entity()
export class Section {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Subject, (subject) => subject.career)
    subjects: Subject[]

    @OneToMany(() => Post, (p) => p.section)
    posts: Post[]

}
