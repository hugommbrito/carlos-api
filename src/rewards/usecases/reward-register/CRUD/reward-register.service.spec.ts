import { Test, TestingModule } from '@nestjs/testing';
import { RewardRegisterService } from './reward-register.service';

describe('RewardRegisterService', () => {
  let service: RewardRegisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewardRegisterService]
    }).compile();

    service = module.get<RewardRegisterService>(RewardRegisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
