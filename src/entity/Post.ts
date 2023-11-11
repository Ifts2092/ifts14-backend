import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"
import { Category } from "./Category"
import { Section } from "./Section"

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ type: "longtext" })
    content: string
    
    @ManyToOne(() => User, (u) => u.posts)
    user: User

    @ManyToOne(() => Category, (c) => c.posts)
    category: Category

    @ManyToOne(() => Section, (s) => s.posts)
    section: Section

    @Column()
    categoryId: number

    @Column()
    sectionId: number

    @Column({type:"text", default:""})
    imageUrl: string


}
