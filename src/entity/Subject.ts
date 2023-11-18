import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Career } from "./Career"
import { Document } from "./Document";

export type PeriodType = "Cuatrimestral" | "Anual";


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
        enum: ["Anual", "Cuatrimestral"],
        default: "Cuatrimestral"
    })
    type: PeriodType

    @ManyToOne(() => Career, (career) => career.subjects)
    career: Career

    @OneToMany(() => Document, (document) => document.subject)
    documents: Document[]
    
    @Column()
    careerId: number

}
