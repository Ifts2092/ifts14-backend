import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Role } from "../entity/Role";


export class RoleController {

    private roleRepository = AppDataSource.getRepository(Role)

    async all(request: Request, response: Response, next: NextFunction) {
        try{
            return this.roleRepository.find();
        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const id = parseInt(request.params.id)

            const role = await this.roleRepository.findOne({
                where: { id }
            })

            if (!role) {
                return "unregistered"
            }
            return role
        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try{ 
            const { id, name } = request.body;

            let role = new Role();
            if(id){
                role = await this.roleRepository.findOneBy({ id })
            }

            const entity = Object.assign(role, {
                name
            });

            return this.roleRepository.save(entity)
        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const id = parseInt(request.params.id)

            let toRemove = await this.roleRepository.findOneBy({ id })

            if (!toRemove) {
                return "this not exist"
            }

            await this.roleRepository.remove(toRemove)

            return "has been removed"
            
        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }

}