import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/typeorm/user.repository';
import { LoginController } from './usecase/auth/commands/login/login.controller';
import { LoginUseCase } from './usecase/auth/commands/login/login.usecase';
import { UsersController } from './usecase/CRUD/users.controller';
import { UsersService } from './usecase/CRUD/users.service';
import { LocalStrategy } from './auth/strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { RequestRecoverEmailUsecase } from './usecase/auth/commands/password-recover-email/request-recover-email.usecase';
import { RequestRecoverEmailController } from './usecase/auth/commands/password-recover-email/request-recover-email.controller';
import { emailProvider } from 'src/providers/nodemailer/mailer.provider';

const userUseCases = [LoginUseCase, RequestRecoverEmailUsecase];
const userControllers = [LoginController, RequestRecoverEmailController];

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true
    }),
    PassportModule
  ],
  providers: [
    UsersService,
    {
      provide: 'user_repository',
      useClass: UserRepository
    },
    LocalStrategy,
    emailProvider,
    ...userUseCases
  ],
  controllers: [...userControllers, UsersController]
})
export class UsersModule {}
