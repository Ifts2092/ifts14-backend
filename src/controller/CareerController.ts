import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Career } from "../entity/Career"

export class CareerController {

    private careerRepository = AppDataSource.getRepository(Career)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.careerRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const entity = await this.careerRepository.findOne({
            where: { id }
        })

        if (!entity) {
            return "unregistered"
        }
        return entity
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, description } = request.body;

        const entity = Object.assign(new Career(), {
            name,
            description
        })

        return this.careerRepository.save(entity)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let toRemove = await this.careerRepository.findOneBy({ id })

        if (!toRemove) {
            return "this not exist"
        }

        await this.careerRepository.remove(toRemove)

        return "has been removed"
    }

}