import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Document } from "../entity/Document"

export class DocumentController {

    private documentRepository = AppDataSource.getRepository(Document);

    async all(request: Request, response: Response, next: NextFunction) {
        let page = parseInt(request.query.page)
        if(!page){ 
            page = 0; 
        } else {
            page--;
        }

        let quantity  = parseInt(request.query.quantity);
        if(!quantity){ quantity = 10; }

        return await this.documentRepository.createQueryBuilder("document").skip(page*quantity).take(quantity).getMany()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const subject = await this.documentRepository.findOne({
            where: { id }
        })

        if (!subject) {
            return "unregistered"
        }
        return subject
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, subjectId } = request.body;

        const entity = Object.assign(new Document(), {
            name,
            subjectId
        })

        return this.documentRepository.save(entity)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let toRemove = await this.documentRepository.findOneBy({ id })

        if (!toRemove) {
            return "this not exist"
        }

        await this.documentRepository.remove(toRemove)

        return { message: "has been removed"}
    }

}