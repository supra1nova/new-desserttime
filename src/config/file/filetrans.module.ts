import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileTransController } from './filetrans.controller';
import { FileTransService } from './filetrans.service';
import { multerOptionsFactory } from './multer.option.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory,
    }),
  ],

  controllers: [FileTransController],
  providers: [FileTransService],
  exports: [FileTransService, TypeOrmModule],
})
export class FileTransModule {}
