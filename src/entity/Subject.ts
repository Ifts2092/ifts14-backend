import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Career } from "./Career"
import { Document } from "./Document";

export type PeriodType = "quarterly" | "annual";


@Entity()
export class Subject {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column('int')
    year: number

    @Column({
        type: "enum",
        enum: ["annual", "quarterly"],
        default: "quarterly"
    })
    type: PeriodType

    @ManyToOne(() => Career, (career) => career.subjects)
    career: Career

    @OneToMany(() => Document, (document) => document.subject)
    documents: Document[]

}
