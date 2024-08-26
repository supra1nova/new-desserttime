import { Test, TestingModule } from '@nestjs/testing';
import { AccusationService } from './accusation.service';

describe('AccusationService', () => {
  let service: AccusationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccusationService],
    }).compile();

    service = module.get<AccusationService>(AccusationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
