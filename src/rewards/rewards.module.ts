import { Module } from '@nestjs/common';
import { RewardOptionController } from './usecases/reward-options/CRUD/reward-option.controller';
import { RewardOptionService } from './usecases/reward-options/CRUD/reward-option.service';
import { RewardOptionRepository } from './repository/typeorm/reward-option.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RewardOption } from './entity/reward-option';

import { SwitchActiveStatusUsecase } from './usecases/reward-options/commands/switch-active-status.usecase';
import { SwitchActiveStatusController } from './usecases/reward-options/commands/switch-active-status.controller';
import { RewardRegister } from './entity/reward-register';

const RewardOptionsUseCases = {
  controllers: [
    SwitchActiveStatusController,
  ],
  services: [
    SwitchActiveStatusUsecase
  ]
}

@Module({
  imports: [
    TypeOrmModule.forFeature([RewardOption, RewardRegister])
  ],
  controllers: [
    RewardOptionController,
    ...RewardOptionsUseCases.controllers,
  ],
  providers: [
    RewardOptionService,
    ...RewardOptionsUseCases.services,
    {
      provide: 'reward-option_repository',
      useClass: RewardOptionRepository
    }
  ]
})
export class RewardsModule {}
