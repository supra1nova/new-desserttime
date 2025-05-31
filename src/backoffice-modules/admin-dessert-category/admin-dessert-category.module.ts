import { Module } from '@nestjs/common';
import { AdminDessertCategoryService } from './admin-dessert-category.service';
import { AdminDessertCategoryController } from './admin-dessert-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DessertCategory } from '../../config/entities/dessert-category.entity';
import { AdminDessertCategoryRepository } from './admin-dessert-category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DessertCategory])],
  exports: [],
  controllers: [AdminDessertCategoryController],
  providers: [AdminDessertCategoryService, AdminDessertCategoryRepository],
})
export class AdminDessertCategoryModule {}
