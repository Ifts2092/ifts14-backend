import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken"
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { Post } from "./entity/Post";

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const token =  req.header('Authorization')?.replace('Bearer ', '');

    if ( !token) {
        return res.status(401).json('Access denied');
    }

    const payload = jwt.verify(token, process.env.TOKEN_SECRET ||'tokentest');
    req.userId = payload.id;
    //console.log(payload);
    next();
}


export const PostPermissionValidation = async (req: Request, res: Response, next: NextFunction) => {
    
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
      
    
}
