// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Review } from './review.entity';
import { ReviewImg } from './review.img.entity';

@Entity()
export class Img {
  @PrimaryGeneratedColumn()
  imgId: number;

  @Column()
  middlepath: string;
  @Column()
  path: string;
  @Column()
  extention: string;
  @Column()
  imgName: string;ß
  @CreateDateColumn()
  createdDate: Date;
  
  @UpdateDateColumn()
  updateDate: Date;

  @OneToOne(()=>User, user => user.img)
  user:User

  @OneToMany(()=>ReviewImg, rImg => rImg.img)
  rImg:ReviewImg[]
}
