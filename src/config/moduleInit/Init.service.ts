import { Injectable, OnModuleInit } from '@nestjs/common';
import { InitRepository } from './init.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class InitService implements OnModuleInit {
  constructor(
    //private initRepository: InitRepository) {}
  private readonly dataSource: DataSource) {}

  onModuleInit() {
    //this.initRepository.insertAdmin();

    // this.dataSource.query('ALTER SYSTEM FLUSH SHARED_POOL');
  
}
}