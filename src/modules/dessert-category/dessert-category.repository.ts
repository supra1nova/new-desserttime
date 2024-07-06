import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DessertCategory } from "src/config/entities/dessert.category.entity";
import { Repository } from "typeorm";
import { DessertSessionDto } from "./dto/dessertsession.dto";
import { FirstCategoryAppendDto } from "./dto/firstcategory.append.dto.ts/firstcategory.append.dto";

@Injectable()
export class DessertCategoryRepository{
    constructor(@InjectRepository(DessertCategory) private dessertCategory:Repository<DessertCategory> ){
    }
    async selectDessertCategory(dessertSessionDto : DessertSessionDto){
        return await this.dessertCategory.find({select :{dessertName:true, sessionNum:true, DessertCatrgoryId:true}, where :{sessionNum:dessertSessionDto.sessionNum}})
    }
    async insertDessertCategory(firstCategoryAppendDto:FirstCategoryAppendDto){
        await this.dessertCategory.insert(firstCategoryAppendDto)

    }
}