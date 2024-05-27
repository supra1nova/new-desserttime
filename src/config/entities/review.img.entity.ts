import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Img } from "./img.entity";
import { Review } from "./review.entity";


@Entity()
export class ReviewImg {
  @PrimaryGeneratedColumn()
  rIId: number;

  @ManyToOne(()=>Img, img=>img.rImg)
  img:Img;

  @ManyToOne(()=>Review,review=>review.rImg)
  review:Review
}