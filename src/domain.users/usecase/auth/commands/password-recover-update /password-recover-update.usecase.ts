import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { UserRepositoryInterface } from 'src/domain.users/repository/user.repository.interface';
import { passwordRecoverUpdateDto } from './password-recover-update.dto';
import { UserDomain } from 'src/domain.users/domains/user.domain';
import { NotFoundError } from 'rxjs';
import { UserMapper } from 'src/domain.users/mappers/user.mappers';
import { JwtService } from '@nestjs/jwt';

export class PasswordRecoverUpdateUseCase {
  constructor(
    @Inject('user_repository')
    private readonly userRepository: UserRepositoryInterface,
    
    private readonly jwtService: JwtService
  ) {}

  async updatePassword(data: passwordRecoverUpdateDto, token: string): Promise<any> {
    const userId = this.jwtService.verify(token, {secret: process.env.JWT_SECRET}).sub

    const userDomain: UserDomain = await this.userRepository.findById(userId);
    if (!userDomain) {
      throw new NotFoundException({}, { description: 'Usuário não encontrado', cause: 'password-update.usecase' });
    }

    userDomain.updateSelf({ password: data.newPassword });
    userDomain.encryptPassword();
    const userUpdated = await this.userRepository.update(userId, userDomain);

    return UserMapper.EntityOrDomainToReturn(userUpdated);
  }
}
