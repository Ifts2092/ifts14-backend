import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Controllers } from "./routes"
import { User } from "./entity/User"
import * as bcrypt from "bcryptjs";
import { Category } from "./entity/Category"
import { Section } from "./entity/Section"
import { Role } from "./entity/Role"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

    // register express routes from defined application routes
    // Routes.forEach(route => {
    //     if(route.middleware == null){
    //         route.middleware = (req: Request, res: Response, next: Function) => { next()};
    //     }
    //     (app as any)[route.method](route.route, route.middleware , (req: Request, res: Response, next: Function) => {
    //         const result = (new (route.controller as any))[route.action](req, res, next)
    //         if (result instanceof Promise) {
    //             result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

    //         } else if (result !== null && result !== undefined) {
    //             res.json(result)
    //         }
    //     })
    // })

    Controllers.forEach(c => {
        c.routes.forEach(route => {
            if(route.middlewares == null){
                route.middlewares = [(req: Request, res: Response, next: Function) => { next()}];
            }
            (app as any)[route.method](route.route, ...route.middlewares , (req: Request, res: Response, next: Function) => {
                const result = (new (c.controller as any))[route.action](req, res, next)
                if (result instanceof Promise) {
                    result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
    
                } else if (result !== null && result !== undefined) {
                    res.json(result)
                }
            })
        })
    })

    // setup express app here
    // ...

    // start express server
    app.listen(3000)

    await start();

    console.log("IFTS14 BACKEND has started on port 3000. Open http://localhost:3000/")

}).catch(error => console.log(error))





//  Seeds

export let start = async () => {

    // ROLES

    let roleRepository = AppDataSource.getRepository(Role);

    let roles = ['Admin', 'Energia', 'Robotica', 'General'];
    
    for( var role of roles){    
        let r = await roleRepository.findOne({
            where: { name: role }
        });
        if(r == null){
            await roleRepository.save(
                roleRepository.create({
                    name: role
                })
            );
        }
    }

    //ADMIN

    let userRepository = AppDataSource.getRepository(User);

    let u = await userRepository.findOne({
        where: { username: 'admin' }
    });

    if(u == null){

        let rol = await roleRepository.findOne({
            where: { name: 'Admin' }
        });
        if(rol != null){

            let password = await bcrypt.hash("admin",10);
            await userRepository.save(
                userRepository.create({
                    username: "admin",
                    password: password,
                    role: rol
                })
            );
        }
        
    }

    //SECTION

    let sectionRepository = AppDataSource.getRepository(Section);

    let sections = ['Becas', 'Articulaciones', 'Novedades'];

    for( var section of sections) {    
        let s = await sectionRepository.findOne({
            where: { name: section }
        });
        if(s == null){
            await sectionRepository.save(
                sectionRepository.create({
                    name: section
                })
            );
        }
    }



    //CATEGORIAS

    let categoryRepository = AppDataSource.getRepository(Category);

    let categories = ['Energia', 'Robotica', 'General'];

    for( var category of categories) { 
           
        let c = await categoryRepository.findOne({
            where: { name: category }
        });
        if(c == null){

            let rs = await roleRepository.find({
                where: [
                        { name: category }, 
                        { name: 'Admin'}
                ]
            });

            await categoryRepository.save(
                categoryRepository.create({
                    name: category,
                    roles: rs
                })
            );
        }
    }



    
}