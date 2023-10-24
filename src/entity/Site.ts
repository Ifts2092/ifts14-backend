import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { SocialNetwork } from "./SocialNetwork"

@Entity()
export class Site {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    mail: string

    @Column()
    phone: string

    @Column()
    address: string

    @Column()
    schedule: string

    @OneToMany(() => SocialNetwork, (p) => p.site)
    socialNet: SocialNetwork[]


}
