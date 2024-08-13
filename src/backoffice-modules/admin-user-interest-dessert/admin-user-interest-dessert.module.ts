import { Module } from '@nestjs/common';
import { UserInterestDessert } from '../../config/entities/user.interest.dessert.entity';
import { AdminUserInterestDessertService } from './admin-user-interest-dessert.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUserInterestDessertRepository } from './admin-user-interest-dessert.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserInterestDessert])],
  exports: [AdminUserInterestDessertService],
  controllers: [],
  providers: [AdminUserInterestDessertService, AdminUserInterestDessertRepository],
})
export class AdminUserInterestDessertModule {}
