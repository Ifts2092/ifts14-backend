import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Post } from "../entity/Post"
import { User } from "../entity/User"
import { Section } from "../entity/Section"

export class FrontendController {

    private postRepository = AppDataSource.getRepository(Post)
    private sectionRepository = AppDataSource.getRepository(Section)
    private userRepository = AppDataSource.getRepository(User)

    async all_posts(request: Request, response: Response, next: NextFunction) {
        try{
            let page = parseInt(request.query.page)
            if(!page){ page = 0; }
            
            let quantity  = parseInt(request.query.quantity);
            if(!quantity){ quantity = 10; }

            return await this.postRepository.createQueryBuilder("post").skip(page*quantity).take(quantity).getMany()
        } catch (e){
            console.log(e);
            return response.status(500).json('Server Fail');   
        }
    }

    async all_(request: Request, response: Response, next: NextFunction) {
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
    
}