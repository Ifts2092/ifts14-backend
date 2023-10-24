import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from "typeorm"
import { Site } from "./Site"

@Entity()
export class SocialNetwork {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    url: string

    @ManyToOne(() => Site, (s) => s.socialNet)
    site: Site
}