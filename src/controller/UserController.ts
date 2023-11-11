import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken"
import { Role } from "../entity/Role";

export class UserController {

    private userRepository = AppDataSource.getRepository(User)
    private roleRepository = AppDataSource.getRepository(Role)

    async auth(request: Request, response: Response, next: NextFunction) {
        
        try {
            const { username, password } = request.body;

            const user = await this.userRepository
                        .createQueryBuilder("user")
                        .select("user.id")
                        .addSelect("user.username")
                        .addSelect("user.password")        
                        .where("username = :username")
                        .setParameters({ username: username})
                        .getOne();

            // const user = await this.userRepository.findOne({
            //     where: { username: username }
            // })

            if (!user) {
                return { messege: "Auth Fail"};
            }

            let result = await bcrypt.compare( password, user.password);

            if(result){
                const token = jwt.sign({id:user.id}, process.env.TOKEN_SECRET ||'tokentest')
                return { token: token };
            } else {
                return { messege: "Auth Fail"};
            }
        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
        
    }

    async all(request: Request, response: Response, next: NextFunction) {
        try{
            let users =  await this.userRepository
            .createQueryBuilder("user")
            .select("user.id")
            .addSelect("user.username")
            .addSelect("user.roleId")        
            //.where("id != :id")
            //.setParameters({ id: request.userId})
            .getMany();

            return users;

        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try{
            const id = parseInt(request.params.id)

            const entity = await this.userRepository.findOne({
                where: { id }
            })

            if (!entity) {
                return "unregistered user"
            }
            return entity
        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try{
            let {id, username, password,passwordRepeat, roleId } = request.body;

            let user = new User();

            if(id){    
                user = await this.userRepository
                    .createQueryBuilder("user")
                    .select("user.id")
                    .addSelect("user.username")
                    .addSelect("user.password")        
                    .where("id = :id")
                    .setParameters({ id: id})
                    .getOne();
            }
  

            let role = await this.roleRepository.findOneBy({ id:roleId })

            const entity = Object.assign(user, {
                username            
            })

            if(entity.id != request.userId){
                entity.role = role;
            }
            
            if(password == passwordRepeat){

                if(password != ""){
                    password = await bcrypt.hash(password,10);
                    entity.password = password;
                    return this.userRepository.save(entity)
                } else {
                    if(entity.id){
                        return this.userRepository.save(entity)
                    } else {
                        return {error: 'New user needs password'};           
                    }
                }               
                
                
            } else {
                
                return {error: 'Password not match'};   
            }         
            
            
        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let toRemove = await this.userRepository.findOneBy({ id })

        if(toRemove.id == request.userId){
            return { error: "No puedes remover tu propio usuario"}
        }

        if (!toRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(toRemove)

        return "user has been removed"
    }

    async categories(request: Request, response: Response, next: NextFunction) {
        try{ 
            let user = await this.userRepository.findOne({
                where: { id: request.userId }
            });

            let c = user.role.categories;

            return c;
        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }

}