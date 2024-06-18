import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserInterestDessert } from './user.interest.dessert.entity';

@Entity()
export class DessertCategory {
  @PrimaryGeneratedColumn()
  DCId: number;

  @Column()
  dessertName: string;

  @Column()
  sessionNum: number;

  @CreateDateColumn()
  createdDate: Date;
  
  @UpdateDateColumn()
  updateDate: Date;

  @OneToMany(()=>UserInterestDessert,uid=>uid.dc)
  uid:UserInterestDessert[];

}
