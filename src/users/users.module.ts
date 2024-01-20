import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repository/typeorm/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

const userUseCases = []
const userControllers = []

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    {
      provide: 'user_repository',
      useClass: UserRepository
    },
    ...userUseCases,
  ],
  controllers: [
    UsersController,
    ...userControllers
  ]
})
export class UsersModule {}
