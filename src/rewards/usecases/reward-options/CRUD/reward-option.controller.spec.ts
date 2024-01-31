import { Test, TestingModule } from '@nestjs/testing';
import { RewardOptionController } from './reward-option.controller';

describe('RewardOptionController', () => {
  let controller: RewardOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardOptionController]
    }).compile();

    controller = module.get<RewardOptionController>(RewardOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
