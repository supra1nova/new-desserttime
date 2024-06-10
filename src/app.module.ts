import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Accusation } from './config/entities/accusation.entity';
import { UserInterestDessert } from './config/entities/user.interest.dessert.entity';
import { Img } from './config/entities/img.entity';
import { Like } from './config/entities/like.entity';
import { Point } from './config/entities/point.entity';
import { QnA } from './config/entities/qna.entity';
import { Review } from './config/entities/review.entity';
import { ReviewImg } from './config/entities/review.img.entity';
import { Member } from './config/entities/member.entity';
import { DessertCategory } from './config/entities/dessert.category.entity';
import { Notice } from './config/entities/notice.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'oracle',
    connectString: `(DESCRIPTION=(ADDRESS=(PROTOCOL=TCPS)(HOST=localhost)(PORT=1522))(CONNECT_DATA=(SERVICE_NAME=db_desserttime)))`,
    username: 'admin',
    password: 'DTelwjxmxkdla8*',
    entities: [Accusation,UserInterestDessert,Img,Like,Point,QnA,Review,ReviewImg,Member,DessertCategory,Notice],
    synchronize: true,
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
