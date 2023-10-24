import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken"
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { Post } from "./entity/Post";
import { Category } from "./entity/Category";

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {

    try {
    const token =  req.header('Authorization')?.replace('Bearer ', '');
    const payload = jwt.verify(token, process.env.TOKEN_SECRET ||'tokentest');

    req.userId = payload.id;

    next();
    
    } catch (ex) {
        return res.status(401).json('Access denied');   
    }
}


export const PostPermissionValidation = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
   
        let userRepository = AppDataSource.getRepository(User);
        let postRepository = AppDataSource.getRepository(Post);

        let userId = req.userId;
        let postId = req.params.postId;

        let user = await userRepository.findOne({
            where: { id: userId }
        });

        let post = await postRepository.findOne({
            where: { id: postId }
        });

        if(user &&  post.category.roles.includes(user.role)){
            next();
        } else {
            return res.status(401).json('Access denied');
        }
        
    } catch (ex) {
        return res.status(401).json('Access denied');   
    }
    
}


export const CategoryPermissionValidation = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
   
        let userRepository = AppDataSource.getRepository(User);
        let categoryRepository = AppDataSource.getRepository(Category);

        let userId = req.userId;
        let categoryId = req.body.postId;

        let user = await userRepository.findOne({
            where: { id: userId }
        });

        let category = await categoryRepository.findOne({
            where: { id: categoryId }
        });

        if(user && category.roles.includes(user.role)){
            next();
        } else {
            return res.status(401).json('Access denied');
        }
        
    } catch (ex) {
        return res.status(401).json('Access denied');   
    }
    
}