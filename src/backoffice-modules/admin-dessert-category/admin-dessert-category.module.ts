import { Module } from '@nestjs/common';
import { AdminDessertCategoryService } from './admin-dessert-category.service';
import { AdminDessertCategoryController } from './admin-dessert-category.controller';
import { DessertCategoryModule } from '../../client-modules/dessert-category/dessert-category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DessertCategory } from '../../config/entities/dessert.category.entity';
import { AdminDessertCategoryRepository } from './admin-dessert-category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DessertCategory]), DessertCategoryModule],
  exports: [],
  controllers: [AdminDessertCategoryController],
  providers: [AdminDessertCategoryService, AdminDessertCategoryRepository],
})
export class AdminDessertCategoryModule {}
