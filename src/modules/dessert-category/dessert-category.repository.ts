import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DessertCategory } from "src/config/entities/dessert.category.entity";
import { Repository } from "typeorm";
import { DessertSessionDto } from "./dto/dessertsession.dto";
import { FirstCategoryAppendDto } from "./dto/firstcategory.append.dto";
import { ParentIdDto } from "./dto/parent.id.dto";

@Injectable()
export class DessertCategoryRepository{
    constructor(@InjectRepository(DessertCategory) private dessertCategory:Repository<DessertCategory> ){
    }

        //수정필요 조건절
        async findAllDessertCategoryList(){
            return await this.dessertCategory.find({select :{dessertName:true, sessionNum:true, DessertCatrgoryId:true, parentDCId:true}})
        }
        
    async findDessertCategoryList(dessertSessionDto : DessertSessionDto){
        return await this.dessertCategory.find({select :{dessertName:true, sessionNum:true, DessertCatrgoryId:true, parentDCId:true}, where :{sessionNum:dessertSessionDto.sessionNum}})
    }

    async findSessionSubDessertCategoryList(parentIdDto :ParentIdDto){
        return await this.dessertCategory.find({select :{dessertName:true, sessionNum:true, DessertCatrgoryId:true, parentDCId:true},where :{parentDCId:parentIdDto.parentDCId}})
    }
    async insertDessertCategory(firstCategoryAppendDto:FirstCategoryAppendDto){
        await this.dessertCategory.insert(firstCategoryAppendDto)

    }
}