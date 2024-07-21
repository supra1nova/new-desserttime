import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { UserInterestDessert } from '../entities/user.interest.dessert.entity';
import { Member } from '../entities/member.entity';
import { MemberImg } from '../entities/member.img.entity';
import { Review } from '../entities/review.entity';
import { ReviewImg } from '../entities/review.img.entity';
import { QnA } from '../entities/qna.entity';
import { Notice } from '../entities/notice.entity';
import { Accusation } from '../entities/accusation.entity';
import { DessertCategory } from '../entities/dessert.category.entity';
import { Like } from '../entities/like.entity';
import { PointTotalCount } from '../entities/point.total.count.entity';
import { PointHistory } from '../entities/point.history.entity';
import { ReceiptImg } from '../entities/receipt.Img.entity';

export const typeORMConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    //keepConnectionAlive: false,
    type: 'oracle',
    connectString: `(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1521)(host=adb.ap-chuncheon-1.oraclecloud.com))(connect_data=(service_name=ga0c4cbf63f5084_dbdesserttime_medium.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))`,
    username: 'admin',
    password: 'DTelwjxmxkdla8*',
    entities: [
      UserInterestDessert,
      Member,
      MemberImg,
      Like,
      Review,
      ReviewImg,
      QnA,
      Notice,
      Accusation,
      DessertCategory,
      PointTotalCount,
      PointHistory,
      ReceiptImg,
    ],
    synchronize: true,
    logging: true,
    //connectTimeout: 30, //30초가 지나면 트랜잭션을 롤백한다.
    // migrations: [process.cwd() + '\\src\\database\\migrations\\*.ts'],
    // migrationsRun: true, //자동적으로 처음 migration이 실행되도록 한다.
  };
};
