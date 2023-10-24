import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { SocialNetwork } from "../entity/SocialNetwork";

export class SiteController {

    private socialNetworkRepo = AppDataSource.getRepository(SocialNetwork)

    async all(request: Request, response: Response, next: NextFunction) {

        return this.socialNetworkRepo.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const socialNet = await this.socialNetworkRepo.findOne({
            where: { id }
        })

        if (!socialNet) {
            return "unregistered"
        }
        return socialNet
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, url, siteId} = request.body;

        const entity = Object.assign(new SocialNetwork(), {
            name,
            url,
            siteId
        })

        return this.socialNetworkRepo.save(entity)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let toRemove = await this.socialNetworkRepo.findOneBy({ id })

        if (!toRemove) {
            return "this not exist"
        }

        await this.socialNetworkRepo.remove(toRemove)

        return "has been removed"
    }

}