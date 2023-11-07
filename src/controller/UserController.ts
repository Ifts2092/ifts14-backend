import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async auth(request: Request, response: Response, next: NextFunction) {
        
        try {
            const { username, password } = request.body;

            const user = await this.userRepository.findOne({
                where: { username: username }
            })

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
            return response.status(500).json('Server Fail');   
        }
        
    }

    async all(request: Request, response: Response, next: NextFunction) {
        try{
            return this.userRepository.find()
        } catch (e){
            console.log(e);
            return response.status(500).json('Server Fail');   
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
            return response.status(500).json('Server Fail');   
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try{
            const {id, username, password } = request.body;

            let user = new User();
            if(id){
                user = await this.userRepository.findOneBy({ id })
            }

            const entity = Object.assign(user, {
                username,
                password
            })

            return this.userRepository.save(entity)
        } catch (e){
            console.log(e);
            return response.status(500).json('Server Fail');   
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let toRemove = await this.userRepository.findOneBy({ id })

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
            return response.status(500).json('Server Fail');   
        }
    }

}