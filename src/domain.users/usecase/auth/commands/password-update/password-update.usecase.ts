import { BadRequestException, Inject, NotFoundException } from "@nestjs/common";
import { UserRepositoryInterface } from "src/domain.users/repository/user.repository.interface";
import { passwordUpdateDto } from "./password-update.dto";
import { UserDomain } from "src/domain.users/domains/user.domain";
import { NotFoundError } from "rxjs";
import { UserMapper } from "src/domain.users/mappers/user.mappers";

export class PasswordUpdateUseCase {
  constructor(
    @Inject('user_repository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async updatePassword(data: passwordUpdateDto, userId: string): Promise<any> {
    const userDomain: UserDomain = await this.userRepository.findById(userId)
    if (!userDomain){
      throw new NotFoundException({}, { description: 'Usuário não encontrado', cause: 'password-update.usecase' });
    }

    const isCheckPassword = userDomain.checkPassword(data.password)
    if(!isCheckPassword){
      throw new BadRequestException({}, { description: 'Senha atual não corresopnde', cause: 'password-update.usecase' });
    }

    userDomain.updateSelf({password: data.newPassword})
    userDomain.encryptPassword()
    const userUpdated = await this.userRepository.update(userId, userDomain)

    return UserMapper.EntityOrDomainToReturn(userUpdated)
  }


}