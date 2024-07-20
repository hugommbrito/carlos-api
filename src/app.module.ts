import { Controller, Get, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './domain.users/users.module';
import { User } from './domain.users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { RoleGuard, SelfOrRoleGuard } from './domain.users/auth/guards/roles.guard';
import { RewardsModule } from './domain.rewards/rewards.module';
import { RewardOption } from './domain.rewards/entity/reward-option.entity';
import { ApiTags } from '@nestjs/swagger';
import { RewardRegister } from './domain.rewards/entity/reward-register.entity';
import { CoursesModule } from './domain.courses/courses.module';

@Controller('')
class DeployMessageController {
  @ApiTags('.')
  @Get()
  deployMsg() {
    return {
      Project: 'API Plataforma Carlos Ferreira Team',
      status: 'Successfully Deployed!',
      dateChecked: new Date()
    };
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, RewardOption, RewardRegister],
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development'
    }),
    // TypeOrmModule.forFeature([User, RewardOption]),
    UsersModule,
    // RewardsModule,
    CoursesModule
  ],
  providers: [
    {
      provide: 'ROLE_GUARD',
      useClass: RoleGuard
    },
    {
      provide: 'SELF_ROLE_GUARD',
      useClass: SelfOrRoleGuard
    }
  ]
})
export class AppModule {}
