import * as express from "express"
import * as bodyParser from "body-parser"
import * as cors  from 'cors';
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Controllers } from "./routes"
import { User } from "./entity/User"
import * as bcrypt from "bcryptjs";
import { Category } from "./entity/Category"
import { Section } from "./entity/Section"
import { Role } from "./entity/Role"
import * as fileUpload  from "express-fileupload"
import { Setting } from "./entity/Setting";
import { Subject } from "./entity/Subject";
import { Career } from "./entity/Career";


AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json())
    app.use(fileUpload());
    app.use(cors());
    app.use('/api/images', express.static('images'));

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
            (app as any)[route.method]('/api/' + route.route, ...route.middlewares , (req: Request, res: Response, next: Function) => {
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

    let settingRepository = AppDataSource.getRepository(Setting);
    let settings = await settingRepository.find();
    if(settings.length == 0){
        await settingRepository.save(settingRepository.create({ key: 'Requisitos',    value:'Para ser alumno del instituto' , visible: false  }));
        await settingRepository.save(settingRepository.create({ key: 'Email',    value:'ifts@gmail.com'  }));
        await settingRepository.save(settingRepository.create({ key: 'Telefono',    value:'+54 11 1234 5678'  }));
        await settingRepository.save(settingRepository.create({ key: 'Direccion',    value:'Callao 1234'  }));
        await settingRepository.save(settingRepository.create({ key: 'Horario',    value:'Horario 13hs a 20hs'  }));
        await settingRepository.save(settingRepository.create({ key: 'Facebook',    value:'http://facebook.com/'  }));
        await settingRepository.save(settingRepository.create({ key: 'X',    value:'http://x.com/'  }));
    }

    let careerRepository = AppDataSource.getRepository(Career);
    let carees = await careerRepository.find();
    if(carees.length == 0){

        let subjectRepository = AppDataSource.getRepository(Subject);

        let energia = await careerRepository.save(careerRepository.create({ name: 'Energia', description: 'Estudia Energia'  }));

        await subjectRepository.save(subjectRepository.create({ name: 'Análisis Matemático', year: 1, type: 'Cuatrimestral', career: energia }));
        await subjectRepository.save(subjectRepository.create({ name: 'Física', year: 1, type: 'Cuatrimestral', career: energia }));
        await subjectRepository.save(subjectRepository.create({ name: 'Diseno y Evaluación de Proyectos', year: 1, type: 'Cuatrimestral', career: energia }));
        await subjectRepository.save(subjectRepository.create({ name: 'Ambiente, Sociedad y Energía', year: 1, type: 'Cuatrimestral', career: energia }));
        await subjectRepository.save(subjectRepository.create({ name: 'Sistemas de Representación ', year: 1, type: 'Cuatrimestral', career: energia }));
        await subjectRepository.save(subjectRepository.create({ name: 'Representación Gráfica Especifica', year: 1, type: 'Cuatrimestral', career: energia }));
        await subjectRepository.save(subjectRepository.create({ name: 'Inglés', year: 1, type: 'Cuatrimestral', career: energia }));
        await subjectRepository.save(subjectRepository.create({ name: 'Práctica', year: 1, type: 'Anual', career: energia }));

        await subjectRepository.save(subjectRepository.create({ name: 'Algebra Lineal', year: 2, type: 'Cuatrimestral', career: energia }));
        await subjectRepository.save(subjectRepository.create({ name: 'Principios de los Circuitos', year: 2, type: 'Cuatrimestral', career: energia }));
        await subjectRepository.save(subjectRepository.create({ name: 'Evaluacion Energetica de Edificios', year: 2, type: 'Cuatrimestral', career: energia }));
        await subjectRepository.save(subjectRepository.create({ name: 'Instalaciones Electricas', year: 2, type: 'Cuatrimestral', career: energia }));
        await subjectRepository.save(subjectRepository.create({ name: 'Electricidad y Magnetismo', year: 2, type: 'Cuatrimestral', career: energia }));
        await subjectRepository.save(subjectRepository.create({ name: 'Sistemas de Climatizacion', year: 2, type: 'Anual', career: energia }));
        await subjectRepository.save(subjectRepository.create({ name: 'Inglés Técnico', year: 2, type: 'Anual', career: energia }));
        await subjectRepository.save(subjectRepository.create({ name: 'Práctica Profesionalizante II ', year: 2, type: 'Cuatrimestral', career: energia }));

        await subjectRepository.save(subjectRepository.create({ name: 'Instalaciones Industriales', year: 3, type: 'Cuatrimestral', career: energia }));
        await subjectRepository.save(subjectRepository.create({ name: 'Uso Racional de la Energía en Edificios', year: 3, type: 'Cuatrimestral', career: energia }));
        await subjectRepository.save(subjectRepository.create({ name: 'Gestion Energetica', year: 3, type: 'Cuatrimestral', career: energia }));
        await subjectRepository.save(subjectRepository.create({ name: 'Termodinamica y Maquinas termicas', year: 3, type: 'Cuatrimestral', career: energia }));
        await subjectRepository.save(subjectRepository.create({ name: 'Instalaciones y aplicaciones de Energías renovables', year: 3, type: 'Cuatrimestral', career: energia }));
        await subjectRepository.save(subjectRepository.create({ name: 'Problematicas Socioec. de la Energía', year: 3, type: 'Cuatrimestral', career: energia }));
        await subjectRepository.save(subjectRepository.create({ name: 'Práctica Profesionalizante III', year: 3, type: 'Cuatrimestral', career: energia }));
        


        
        let robotica = await careerRepository.save(careerRepository.create({ name: 'Robotica', description: 'Estudia Robotica'  }));

        await subjectRepository.save(subjectRepository.create({ name: 'Teoría de los Circuito', year: 1, type: 'Cuatrimestral', career: robotica }));
        await subjectRepository.save(subjectRepository.create({ name: 'Técnicas Digitales', year: 1, type: 'Cuatrimestral', career: robotica }));
        await subjectRepository.save(subjectRepository.create({ name: 'Análisis Matemático', year: 1, type: 'Cuatrimestral', career: robotica }));
        await subjectRepository.save(subjectRepository.create({ name: 'Mecánica Técnica', year: 1, type: 'Cuatrimestral', career: robotica }));
        await subjectRepository.save(subjectRepository.create({ name: 'Electrónica I', year: 1, type: 'Cuatrimestral', career: robotica }));
        await subjectRepository.save(subjectRepository.create({ name: 'Lógica Simbólica', year: 1, type: 'Cuatrimestral', career: robotica }));
        await subjectRepository.save(subjectRepository.create({ name: 'Laboratorio I', year: 1, type: 'Cuatrimestral', career: robotica }));

        await subjectRepository.save(subjectRepository.create({ name: 'Máquinas Eléctricas', year: 2, type: 'Cuatrimestral', career: robotica }));
        await subjectRepository.save(subjectRepository.create({ name: 'Circuitos Hidráulicos y Neumáticos', year: 2, type: 'Cuatrimestral', career: robotica }));
        await subjectRepository.save(subjectRepository.create({ name: 'Matemática Aplicada', year: 2, type: 'Cuatrimestral', career: robotica }));
        await subjectRepository.save(subjectRepository.create({ name: 'Electrónica II', year: 2, type: 'Cuatrimestral', career: robotica }));
        await subjectRepository.save(subjectRepository.create({ name: 'Laboratorio II', year: 2, type: 'Cuatrimestral', career: robotica }));
        await subjectRepository.save(subjectRepository.create({ name: 'Resistencia y Cálculo de Elementos de Máquinas', year: 2, type: 'Cuatrimestral', career: robotica }));
        await subjectRepository.save(subjectRepository.create({ name: 'Microprocesadores I', year: 2, type: 'Cuatrimestral', career: robotica }));
        await subjectRepository.save(subjectRepository.create({ name: 'Epistemología de la Ciencia', year: 2, type: 'Cuatrimestral', career: robotica }));
        
        await subjectRepository.save(subjectRepository.create({ name: 'Computación Aplicada', year: 3, type: 'Cuatrimestral', career: robotica }));
        await subjectRepository.save(subjectRepository.create({ name: 'Sistemas de Control', year: 3, type: 'Cuatrimestral', career: robotica }));
        await subjectRepository.save(subjectRepository.create({ name: 'Microprocesadores II', year: 3, type: 'Cuatrimestral', career: robotica }));
        await subjectRepository.save(subjectRepository.create({ name: 'Tecnología y Aplicación de los Robots', year: 3, type: 'Cuatrimestral', career: robotica }));
        await subjectRepository.save(subjectRepository.create({ name: 'Sensores y Servomecanismos', year: 3, type: 'Cuatrimestral', career: robotica }));
        await subjectRepository.save(subjectRepository.create({ name: 'Laboratorio III', year: 3, type: 'Cuatrimestral', career: robotica }));



        
        
    }

    // let subjectRepository = AppDataSource.getRepository(Subject);
    // let subjects = await subjectRepository.find();
    // if(subjects.length == 0){
        
    // }

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