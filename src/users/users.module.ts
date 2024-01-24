import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/typeorm/user.repository';
import { LoginController } from './usecase/auth/commands/login/login.controller';
import { LoginUseCase } from './usecase/auth/commands/login/login.usecase';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const userUseCases = [
  LoginUseCase
]
const userControllers = [
  LoginController
]

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true
    })
  ],
  providers: [
    UsersService,
    {
      provide: 'user_repository',
      useClass: UserRepository
    },
    ...userUseCases,
  ],
  controllers: [
    ...userControllers,
    UsersController,
  ]
})
export class UsersModule {}
