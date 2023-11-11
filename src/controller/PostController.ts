import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Post } from "../entity/Post"
import { User } from "../entity/User"
import { Section } from "../entity/Section"
import * as fileUpload  from "express-fileupload"
import * as mime from 'mime'

export class PostController {

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
            return {error: '500'};   
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
            return {error: '500'};   
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        
        try {
            let user = await this.userRepository.findOneBy({ id: request.userId });
            
            const { id, title, content, categoryId, sectionId } = request.body;

            let category = user.role.categories.find(x => x.id = categoryId);

            let section = await this.sectionRepository.findOneBy({ id: sectionId });

            let imageUrl = '';

            let post = new Post();
            if(id){
                post = await this.postRepository.findOneBy({ id })
            }

            const entity = Object.assign(post, {
                title,
                content,
                user,
                category,
                section,
                imageUrl
            })


            let fileOk = true;
                
            // When a file has been uploaded 
            if (request.files && Object.keys(request.files).length !== 0) { 
                
                // Uploaded path 
                let uploadedFile = request.files.uploadFile; 

                let max = Number.MAX_SAFE_INTEGER;
                let randomNumber = Math.floor(Math.random() * max);
                let extension = mime.extension(uploadedFile.mimetype);
                      
                let new_name = "/images/" + randomNumber + '.'+  extension;

                // Upload path 
                const uploadPath = process.cwd() + new_name; //__dirname 

                //uploadedFile.name
                
                // To save the file using mv() function 
                uploadedFile.mv(uploadPath, (err) => { 
                    if (err) { 
                        console.log(err); 
                        //response.send("Failed !!"); 
                        fileOk = false
                    }
                }); 

                if(fileOk) {
                    entity.imageUrl = new_name;
                    //uploadedFile.name
                }

            } 



            if(fileOk){
                return this.postRepository.save(entity);
            }

        } catch (e){
            console.log(e);
            return {error: '500'};   
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
            return {error: '500'};   
        }
    }


    async upload (request: Request, response: Response, next: NextFunction) {
        
        
         // When a file has been uploaded 
        if (request.files && Object.keys(request.files).length !== 0) { 
            
            // Uploaded path 
            const uploadedFile = request.files.uploadFile; 
        
            // Logging uploading file 
            //console.log(uploadedFile); 
        
            // Upload path 
            const uploadPath = process.cwd() //__dirname 
                + "/uploads/" + uploadedFile.name; 
        
            // To save the file using mv() function 
            uploadedFile.mv(uploadPath, function (err) { 
            if (err) { 
                console.log(err); 
                response.send("Failed !!"); 
            } else response.send("Successfully Uploaded !!"); 
            }); 
        } else response.send("No file uploaded !!"); 




    }

}