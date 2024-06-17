import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QnA } from "src/config/entities/qna.entity";
import { Repository } from "typeorm";
import { CreateQnADto } from "./dto/create.qna.dto";
import { QnAIdDto } from "./dto/qna.id.dto";

@Injectable()
export class QnARepository{
    constructor(@InjectRepository(QnA) private qna:Repository<QnA>){
    }
    async insertQnA(createQnADto:CreateQnADto){
        await this.qna.insert(createQnADto);
    }

    async findQnAList(){
       return await this.qna.find({select:{content:true,createdDate:true}});//QnAId:true,email:true,    ,where:{usable:true}
    }

    async findQnA(qnAIdDto:QnAIdDto){
       return await this.qna.findOne({select:{title:true,content:true,createdDate:true}});//QnAId:true,email:true,    ,where:{usable:true}
    }
}