import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Category } from "../entity/Category";

export class CategoryController {

    private categoryRepository = AppDataSource.getRepository(Category)

    async all(request: Request, response: Response, next: NextFunction) {

        return this.categoryRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const site = await this.categoryRepository.findOne({
            where: { id }
        })

        if (!site) {
            return "unregistered"
        }
        return site
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name } = request.body;

        const entity = Object.assign(new Category(), {
            name
        })

        return this.categoryRepository.save(entity)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let toRemove = await this.categoryRepository.findOneBy({ id })

        if (!toRemove) {
            return "this not exist"
        }

        await this.categoryRepository.remove(toRemove)

        return "has been removed"
    }

}