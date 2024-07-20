import { Test, TestingModule } from '@nestjs/testing';
import { RewardRegisterController } from './reward-register.controller';

describe('RewardRegisterController', () => {
  let controller: RewardRegisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardRegisterController]
    }).compile();

    controller = module.get<RewardRegisterController>(RewardRegisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
