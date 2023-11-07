import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Post } from "../entity/Post"
import { User } from "../entity/User"
import { Section } from "../entity/Section"

export class FrontendController {

    private postRepository = AppDataSource.getRepository(Post)
    private sectionRepository = AppDataSource.getRepository(Section)
    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        try{
            let     page = parseInt(request.query.page)
            if(!page){ page = 0; }
            
            let quantity  = parseInt(request.query.quantity);
            if(!quantity){ quantity = 10; }

            return await this.postRepository.createQueryBuilder("post").skip(page*quantity).take(quantity).getMany()
        } catch (e){
            console.log(e);
            return response.status(500).json('Server Fail');   
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const id = parseInt(request.params.id)

            let post = await this.postRepository.findOne({
                where: { id }
            })

            if (!post) {
                return "unregistered"
            }
            return post
        } catch (e){
            console.log(e);
            return response.status(500).json('Server Fail');   
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        
        try {
            let user = await this.userRepository.findOneBy({ id: request.userId });
            
            const { id, title, content, categoryId, sectionId } = request.body;

            let category = user.role.categories.find(x => x.id = categoryId);

            let section = await this.sectionRepository.findOneBy({ id: sectionId });

            let post = new Post();
            if(id){
                post = await this.postRepository.findOneBy({ id })
            }

            const entity = Object.assign(post, {
                title,
                content,
                user,
                category,
                section
            })

            return this.postRepository.save(entity)

        } catch (e){
            console.log(e);
            return response.status(500).json('Server Fail');   
        }

    }

    async remove(request: Request, response: Response, next: NextFunction) {
            try { 
            const id = parseInt(request.params.id)

            let toRemove = await this.postRepository.findOneBy({ id })

            if (!toRemove) {
                return "this not exist"
            }

            await this.postRepository.remove(toRemove)

            return "has been removed"
        } catch (e){
            console.log(e);
            return response.status(500).json('Server Fail');   
        }
    }

}