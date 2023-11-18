import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Career } from "../entity/Career"

export class CareerController {

    private careerRepository = AppDataSource.getRepository(Career)

    async all(request: Request, response: Response, next: NextFunction) {
        try {
            return this.careerRepository.find()
        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const id = parseInt(request.params.id)

            const entity = await this.careerRepository.findOne({
                where: { id }
            })

            if (!entity) {
                return "unregistered"
            }
            return entity
        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try { 
            const { name, description } = request.body;

            const entity = Object.assign(new Career(), {
                name,
                description
            })

            return this.careerRepository.save(entity)
        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try { 
            const id = parseInt(request.params.id)

            let toRemove = await this.careerRepository.findOneBy({ id })

            if (!toRemove) {
                return "this not exist"
            }

            await this.careerRepository.remove(toRemove)

            return { message: "has been removed"}
        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }

}