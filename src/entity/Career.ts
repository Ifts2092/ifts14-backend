import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Subject } from "./Subject"

@Entity()
export class Career {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ type: "longtext" })
    description: string

    @OneToMany(() => Subject, (subject) => subject.career)
    subjects: Subject[]

}
