import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DessertCategory } from "src/config/entities/dessert.category.entity";
import { Repository } from "typeorm";
import { DessertSessionDto } from "./dto/dessertsession.dto";
import { CategoryAppendDto } from "./dto/category.append.dto";

@Injectable()
export class DessertCategoryRepository{
    constructor(@InjectRepository(DessertCategory) private dessertCategory:Repository<DessertCategory> ){
    }
    async selectDessertCategory(dessertSessionDto : DessertSessionDto){
        return await this.dessertCategory.find({select :{dessertName:true, sessionNum:true, DCId:true}, where :{sessionNum:dessertSessionDto.sessionNum}})
    }
    async insertDessertCategory(categoryAppendDto:CategoryAppendDto){
        await this.dessertCategory.insert(categoryAppendDto)

    }
}