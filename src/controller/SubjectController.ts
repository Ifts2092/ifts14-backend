import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Subject } from "../entity/Subject"

export class SubjectController {

    private subjectRepository = AppDataSource.getRepository(Subject)

    async all(request: Request, response: Response, next: NextFunction) {
        try {
            return this.subjectRepository.find()
        } catch (e){
            console.log(e);
            return response.status(500).json('Server Fail');   
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try { 
            const id = parseInt(request.params.id)

            const subject = await this.subjectRepository.findOne({
                where: { id }
            })

            if (!subject) {
                return "unregistered"
            }
            return subject
        } catch (e){
            console.log(e);
            return response.status(500).json('Server Fail');   
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try { 
            const { name, year, type } = request.body;

            const entity = Object.assign(new Subject(), {
                name,
                year,
                type
            })

            return this.subjectRepository.save(entity)
        } catch (e){
            console.log(e);
            return response.status(500).json('Server Fail');   
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        try  { 
            const id = parseInt(request.params.id)

            let toRemove = await this.subjectRepository.findOneBy({ id })

            if (!toRemove) {
                return "this not exist"
            }

            await this.subjectRepository.remove(toRemove)

            return "has been removed"
        } catch (e){
            console.log(e);
            return response.status(500).json('Server Fail');   
        }
    }

}