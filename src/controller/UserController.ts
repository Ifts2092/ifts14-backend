import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async auth(request: Request, response: Response, next: NextFunction) {
        
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
            return { access_token: token };
        } else {
            return { messege: "Auth Fail"};
        }
        
    }

    async all(request: Request, response: Response, next: NextFunction) {
        console.log(request.userId);
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const entity = await this.userRepository.findOne({
            where: { id }
        })

        if (!entity) {
            return "unregistered user"
        }
        return entity
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { username, password } = request.body;

        const entity = Object.assign(new User(), {
            username,
            password
        })

        return this.userRepository.save(entity)
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

}