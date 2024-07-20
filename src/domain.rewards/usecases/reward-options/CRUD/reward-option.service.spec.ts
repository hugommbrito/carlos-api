import { Test, TestingModule } from '@nestjs/testing';
import { RewardOptionService } from './reward-option.service';

describe('RewardOptionService', () => {
  let service: RewardOptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewardOptionService]
    }).compile();

    service = module.get<RewardOptionService>(RewardOptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
