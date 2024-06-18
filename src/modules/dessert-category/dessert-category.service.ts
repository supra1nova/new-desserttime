import { Injectable } from "@nestjs/common";
import { DessertCategoryRepository } from "./dessert-category.repository";
import { DessertSessionDto } from "./dto/dessertsession.dto";
import { FirstCategoryAppendDto } from "./dto/firstcategory.append.dto.ts/firstcategory.append.dto";

@Injectable()
export class DessertCategoryService{
    constructor(private dessertCategoryRepository:DessertCategoryRepository){
    }
    async getDessertCategory(dessertSessionDto : DessertSessionDto){
     try {
        const firstCategoryList = await this.dessertCategoryRepository.selectDessertCategory(dessertSessionDto);  
        const result ={
            resultStatus:true,
            firstCategoryList
        }
        return result;
     } catch (error) {
        throw error;
     }
      }

      async postDessertCategory(firstCategoryAppendDto:FirstCategoryAppendDto){
        try {
            await this.dessertCategoryRepository.insertDessertCategory(firstCategoryAppendDto);
            return {
                resultStatus:true,
            }
        } catch (error) {
            throw error;
        }
      }
}