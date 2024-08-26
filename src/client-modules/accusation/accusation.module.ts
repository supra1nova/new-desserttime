import { Module } from '@nestjs/common';
import { AccusationController } from './accusation.controller';
import { AccusationService } from './accusation.service';
import { AccusationRepository } from './accusation.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accusation } from 'src/config/entities/accusation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accusation])],
  controllers: [AccusationController],
  providers: [AccusationService, AccusationRepository],
})
export class AccusationModule {}
