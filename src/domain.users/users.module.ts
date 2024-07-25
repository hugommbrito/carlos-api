import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { emailProvider } from '../providers/nodemailer/mailer.provider';
import { LocalStrategy } from './auth/strategy/local.strategy';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/typeorm/user.repository';
import { UsersController } from './usecase/CRUD/users.controller';
import { UsersService } from './usecase/CRUD/users.service';
import { LoginController } from './usecase/auth/commands/login/login.controller';
import { LoginUseCase } from './usecase/auth/commands/login/login.usecase';
import { RequestRecoverEmailController } from './usecase/auth/commands/password-recover-email/request-recover-email.controller';
import { RequestRecoverEmailUsecase } from './usecase/auth/commands/password-recover-email/request-recover-email.usecase';
import { PasswordRecoverUpdateController } from './usecase/auth/commands/password-recover-update /password-recover-update.controller';
import { PasswordRecoverUpdateUseCase } from './usecase/auth/commands/password-recover-update /password-recover-update.usecase';
import { PasswordUpdateController } from './usecase/auth/commands/password-update/password-update.controller';
import { PasswordUpdateUseCase } from './usecase/auth/commands/password-update/password-update.usecase';
import { WatchLectureUseCase } from './usecase/commands/watch-lecture/watch-lecture.usecase';
import { WatchLectureController } from './usecase/commands/watch-lecture/whatch-lecture.controller';
import { LectureDao } from './dao/typeorm/lecture.dao';
import { LectureRepository } from '../domain.courses/repository/typeorm/lecture.repository';
import { CoursesModule } from '../domain.courses/courses.module';
import { Lecture } from '../domain.courses/entity/lecture.entity';
import { Module as ModuleEntity } from '../domain.courses/entity/module.entity';

const userUseCases = [
  LoginUseCase,
  PasswordUpdateUseCase,
  RequestRecoverEmailUsecase,
  PasswordRecoverUpdateUseCase,
  WatchLectureUseCase,
]

const userControllers = [
  LoginController,
  PasswordUpdateController,
  PasswordRecoverUpdateController,
  RequestRecoverEmailController,
  WatchLectureController
];

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Lecture, ModuleEntity]),
    JwtModule.register({
      global: true
    }),
    PassportModule,
    CoursesModule,
  ],
  providers: [
    UsersService,
    {
      provide: 'user_repository',
      useClass: UserRepository
    },
    {
      provide: 'lecture_dao',
      useClass: LectureDao
    },
    LocalStrategy,
    emailProvider,
    ...userUseCases
  ],
  controllers: [...userControllers, UsersController],
})
export class UsersModule {}
