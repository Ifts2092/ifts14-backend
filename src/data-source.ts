import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Career } from "./entity/Career"
import { Post } from "./entity/Post"
import { Subject } from "./entity/Subject"
import { Category } from "./entity/Category"
import { Section } from "./entity/Section"
import { Role } from "./entity/Role"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "mysql-f5cf037-monichoza-b0ee.aivencloud.com",
    port: 12149,
    username: "avnadmin",
    password: "AVNS_63FkWuRemnGsPtfIWii",
    database: "defaultdb",
    synchronize: true,
    logging: false,
    entities: [User, Category, Section, Role, Post, Career, Subject],
    migrations: [],
    subscribers: [],
})
