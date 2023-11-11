import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Setting } from "../entity/Setting";

export class SettingController {

    private settingRepository = AppDataSource.getRepository(Setting)

    async all(request: Request, response: Response, next: NextFunction) {
        try{ 

            let settings =  await this.settingRepository
            .createQueryBuilder("setting")
            .select("setting.key")
            .addSelect("setting.value")
            .where("visible = :status")
            .setParameters({ status: true})
            .getMany();

            return settings

        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {

        try{        

            for (let setting of request.body){
                let { key, value } = setting;

                let record = await this.settingRepository.findOneBy({ key })

                const entity = Object.assign(record, {
                    key,
                    value
                })
                this.settingRepository.save(entity);
            }
            
            return { result: 'ok'};

        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
        
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const key = request.params.key;

            const site = await this.settingRepository.findOne({
                where: { key: key }
            })

            if (!site) {
                return "unregistered"
            }
            return site
        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }

    async saveOne(request: Request, response: Response, next: NextFunction) {
        try{ 
            const { key, value } = request.body;

            let setting = new Setting();
            setting = await this.settingRepository.findOneBy({ key })

            const entity = Object.assign(setting, {
                value
            });

            return this.settingRepository.save(entity)

        } catch (e){
            console.log(e);
            return {error: '500'};   
        }
    }



}