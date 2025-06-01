import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UserInterestDessert } from '../entities/user-interest-dessert.entity';
import { Member } from '../entities/member.entity';
import { ProfileImg } from '../entities/profile-img.entity';
import { Review } from '../entities/review.entity';
import { ReviewImg } from '../entities/review-img.entity';
import { Qna } from '../entities/qna.entity';
import { Notice } from '../entities/notice.entity';
import { Accusation } from '../entities/accusation.entity';
import { DessertCategory } from '../entities/dessert-category.entity';
import { Like } from '../entities/like.entity';
import { Point } from '../entities/point.entity';
import { PointHistory } from '../entities/point-history.entity';
import { ReceiptImg } from '../entities/receipt-img.entity';
import { ReviewIngredient } from '../entities/review-ingredient.entity';
import { Ingredient } from '../entities/ingredient.entity';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeORMConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
  return {
    //keepConnectionAlive: false,
    type: process.env.DB_TYPE as DataSourceOptions['type'],
    connectString: process.env.DB_TNS_ALIAS,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: Boolean(process.env.DB_SYNCHRONIZE),
    logging: Boolean(process.env.DB_LOGGING),
    connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT),
    namingStrategy: new SnakeNamingStrategy(),
    // migrations: [process.cwd() + '\\src\\database\\migrations\\*.ts'],
    // migrationsRun: true, //자동적으로 처음 migration이 실행되도록 한다.
    entities: [UserInterestDessert, Member, ProfileImg, Like, Review, ReviewImg, Qna, Notice, Accusation, DessertCategory, Point, PointHistory, ReceiptImg, Ingredient, ReviewIngredient],
  };
};
