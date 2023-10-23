import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Subject } from "../entity/Subject"

export class SubjectController {

    private subjectRepository = AppDataSource.getRepository(Subject)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.subjectRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const subject = await this.subjectRepository.findOne({
            where: { id }
        })

        if (!subject) {
            return "unregistered"
        }
        return subject
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, year, type } = request.body;

        const entity = Object.assign(new Subject(), {
            name,
            year,
            type
        })

        return this.subjectRepository.save(entity)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let toRemove = await this.subjectRepository.findOneBy({ id })

        if (!toRemove) {
            return "this not exist"
        }

        await this.subjectRepository.remove(toRemove)

        return "has been removed"
    }

}