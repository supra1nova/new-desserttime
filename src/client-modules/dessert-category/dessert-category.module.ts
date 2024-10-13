import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DessertCategoryService } from './dessert-category.service';
import { DessertCategoryController } from './dessert-category.controller';
import { DessertCategoryRepository } from './dessert-category.repository';
import { DessertCategory } from 'src/config/entities/dessert.category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DessertCategory])],
  exports: [DessertCategoryService],
  controllers: [DessertCategoryController],
  providers: [DessertCategoryService, DessertCategoryRepository],
})
export class DessertCategoryModule {}
