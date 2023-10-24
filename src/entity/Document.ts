import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { Subject } from "./Subject"

@Entity()
export class Document {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToOne(() => Subject, (subject) => subject.documents)
   subject: Subject

}
