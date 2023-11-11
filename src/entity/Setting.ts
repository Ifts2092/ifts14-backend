import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from "typeorm"

@Entity()
export class Setting {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    key: string

    @Column()
    value: string

    @Column('boolean', {default: true})
    visible: Boolean

}