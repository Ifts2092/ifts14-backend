import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Post } from "../entity/Post"

export class PostController {

    private postRepository = AppDataSource.getRepository(Post)

    async all(request: Request, response: Response, next: NextFunction) {
        let page = parseInt(request.query.page)
        if(!page){ page = 1; }
        
        let quantity  = parseInt(request.query.quantity);
        if(!quantity){ quantity = 10; }

        return await this.postRepository.createQueryBuilder("post").skip(page*quantity).take(quantity).getMany()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const subject = await this.postRepository.findOne({
            where: { id }
        })

        if (!subject) {
            return "unregistered"
        }
        return subject
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { title, content } = request.body;

        const entity = Object.assign(new Post(), {
            title,
            content
        })

        return this.postRepository.save(entity)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let toRemove = await this.postRepository.findOneBy({ id })

        if (!toRemove) {
            return "this not exist"
        }

        await this.postRepository.remove(toRemove)

        return "has been removed"
    }

}