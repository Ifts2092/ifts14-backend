import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Site } from "../entity/Site"
import { Category } from "../entity/Category";
import { Section } from "../entity/Section";

export class SectionController {

    private sectionRepository = AppDataSource.getRepository(Section)

    async all(request: Request, response: Response, next: NextFunction) {
        try{
            return this.sectionRepository.find();
        } catch (e){
            console.log(e);
            return response.status(500).json('Server Fail');   
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const id = parseInt(request.params.id)

            const site = await this.sectionRepository.findOne({
                where: { id }
            })

            if (!site) {
                return "unregistered"
            }
            return site
        } catch (e){
            console.log(e);
            return response.status(500).json('Server Fail');   
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try{ 
            const { name } = request.body;

            const entity = Object.assign(new Section(), {
                name
            })

            return this.sectionRepository.save(entity)
        } catch (e){
            console.log(e);
            return response.status(500).json('Server Fail');   
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try {
            const id = parseInt(request.params.id)

            let toRemove = await this.sectionRepository.findOneBy({ id })

            if (!toRemove) {
                return "this not exist"
            }

            await this.sectionRepository.remove(toRemove)

            return "has been removed"
            
        } catch (e){
            console.log(e);
            return response.status(500).json('Server Fail');   
        }
    }

}