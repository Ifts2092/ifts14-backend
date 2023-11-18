import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Subject } from "../entity/Subject"
import { Career } from "../entity/Career"

export class SubjectController {

    private subjectRepository = AppDataSource.getRepository(Subject)
    private careerRepository = AppDataSource.getRepository(Career)

    async all(request: Request, response: Response, next: NextFunction) {
        try {
            return this.subjectRepository.find()
        } catch (e){
            console.log(e);
            return {error: '500'};   
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
            return {error: '500'};   
        }
    }

    async some(request:Request,response:Response){
        try {
            let id = request.params.careerId;
            let result =  await this.subjectRepository
            .createQueryBuilder("subject")
            .innerJoinAndSelect("subject.career", "career")
            //.innerJoinAndSelect("post.category", "category")
            .where("career.id = :id")
            .setParameters({ id: id })
            //.skip(page*quantity)
            //.take(quantity)
            .getMany()
            return result;
        } catch (error) {
            console.log(error)
            return {error: '500'};   
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        try { 
            const {id, name, year, type,careerId } = request.body;
            let career = await this.careerRepository.findOne({
                where: { id: careerId }
            });

            let subject = new Subject();
            if(id){
                subject = await this.subjectRepository.findOneBy({ id })
            }

            const entity = Object.assign(subject, {
                name,
                year,
                type,
                career
            })
            return this.subjectRepository.save(entity)
        } catch (e){
            console.log(e);
            return {error: '500'};   
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

            return { message: "has been removed"}
        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }

}