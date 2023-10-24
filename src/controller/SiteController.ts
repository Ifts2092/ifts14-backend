import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Site } from "../entity/Site"

export class SiteController {

    private siteRepository = AppDataSource.getRepository(Site)

    async all(request: Request, response: Response, next: NextFunction) {

        return this.siteRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        const site = await this.siteRepository.findOne({
            where: { id }
        })

        if (!site) {
            return "unregistered"
        }
        return site
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, mail, phone, address, schedule } = request.body;

        const entity = Object.assign(new Site(), {
            name,
            mail,
            phone,
            address,
            schedule
        })

        return this.siteRepository.save(entity)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let toRemove = await this.siteRepository.findOneBy({ id })

        if (!toRemove) {
            return "this not exist"
        }

        await this.siteRepository.remove(toRemove)

        return "has been removed"
    }

}