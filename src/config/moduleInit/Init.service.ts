import { Injectable, OnModuleInit } from '@nestjs/common';
import { InitRepository } from './init.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class InitService implements OnModuleInit {
  constructor(
    private initRepository: InitRepository) {}

  onModuleInit() {
    this.initRepository.insertAdmin();  
}
}