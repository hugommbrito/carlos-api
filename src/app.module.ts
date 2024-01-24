import { Controller, Get, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { RoleGuard } from './users/auth/guards/roles.guard';

@Controller('')
class DeployMessageController {
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
      entities: [User],
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development',
    }),
    UsersModule,
  ],
  controllers: [DeployMessageController],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: RoleGuard,
    }
  ],
})
export class AppModule {}