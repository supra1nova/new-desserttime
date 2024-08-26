import { Test, TestingModule } from '@nestjs/testing';
import { AccusationController } from './accusation.controller';

describe('AccusationController', () => {
  let controller: AccusationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccusationController],
    }).compile();

    controller = module.get<AccusationController>(AccusationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
