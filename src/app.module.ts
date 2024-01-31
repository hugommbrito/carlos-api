import { Controller, Get, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { RoleGuard } from './users/auth/guards/roles.guard';
import { RewardsModule } from './rewards/rewards.module';
import { RewardOption } from './rewards/entity/reward-option';
import { ApiTags } from '@nestjs/swagger';

@Controller('')
class DeployMessageController {
  @ApiTags('.')
  @Get()
  deployMsg() {
    return {
      Project: 'API Plataforma Carlos Ferreira Team',
      status: 'Successfully Deployed!',
      dateChecked: new Date(),
    };
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, RewardOption],
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development',
    }),
    // TypeOrmModule.forFeature([User, RewardOption]),
    UsersModule,
    RewardsModule,
  ],
  controllers: [DeployMessageController],
  providers: [
    {
      provide: 'ROLE_GUARD',
      useClass: RoleGuard,
    },
    {
      provide: 'SELF_ROLE_GUARD',
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
