import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InitService } from './Init.service';
import { InitRepository } from './init.repository';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [],
  providers: [InitService, InitRepository],
  exports: [],
})
export class InitModule {}
