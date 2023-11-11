import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Post } from "../entity/Post"
import { User } from "../entity/User"
import { Section } from "../entity/Section"
import { Category } from "../entity/Category"
import { Setting } from "../entity/Setting"
import { Career } from "../entity/Career"
import { Subject } from "../entity/Subject"

export class FrontendController {

    private postRepository = AppDataSource.getRepository(Post)
    private categoryRepository = AppDataSource.getRepository(Category)
    private sectionRepository = AppDataSource.getRepository(Section)
    private userRepository = AppDataSource.getRepository(User)
    private settingRepository = AppDataSource.getRepository(Setting)
    private careerRepository = AppDataSource.getRepository(Career)
    private subjectRepository = AppDataSource.getRepository(Subject)


    async getPostsBySection(request: Request, response: Response, next: NextFunction) {
        try{

            let section = request.params.section;

            // let page = parseInt(request.query.page)
            // if(!page){ page = 0; }
            
            // let quantity  = parseInt(request.query.quantity);
            // if(!quantity){ quantity = 10; }

            let result =  await this.postRepository
                             .createQueryBuilder("post")
                             .innerJoinAndSelect("post.section", "section")
                             .where("section.name = :name")
                             .setParameters({ name: section})
                             //.skip(page*quantity)
                             //.take(quantity)
                             .getMany()
            return result;

        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }

    async getPostsBySectionAndCategory(request: Request, response: Response, next: NextFunction) {
        try{

            let section = request.params.section;
            let category = request.params.category;

            // let page = parseInt(request.query.page)
            // if(!page){ page = 0; }
            
            // let quantity  = parseInt(request.query.quantity);
            // if(!quantity){ quantity = 10; }

            let result =  await this.postRepository
                             .createQueryBuilder("post")
                             .innerJoinAndSelect("post.section", "section")
                             .innerJoinAndSelect("post.category", "category")
                             .where("section.name = :section")
                             .andWhere("category.name = :category")
                             .setParameters({ section: section, category: category})
                             //.skip(page*quantity)
                             //.take(quantity)
                             .getMany()
            return result;

        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }


    async getCategories(request: Request, response: Response, next: NextFunction) {
        try{    
            return await this.categoryRepository.find();
        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }

    async getSections(request: Request, response: Response, next: NextFunction) {
        try{    
            return await this.sectionRepository.find();
        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }

    async getPostById(request: Request, response: Response, next: NextFunction) {
        try{    
            let id = request.params.id;
            return await this.postRepository.findOneBy({ id });
        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }

    async getSettings(request: Request, response: Response, next: NextFunction) {
        try{ 
            return this.settingRepository.find();
        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }

    async getCareers(request: Request, response: Response, next: NextFunction) {
        try{ 
            return this.careerRepository.find();
        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }
    
    async getSubjectsByCareer(request: Request, response: Response, next: NextFunction) {
        try{ 

            let id = request.params.id;

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

        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }

    
}