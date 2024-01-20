import { IUserDomain, IUserDomainReturn, UserDomain } from "../domains/user.domain";
import { User } from "../entities/user.entity";

export class UserMapper {
  static EntityToDomain(userEntity: User): UserDomain {
    return UserDomain.load({...userEntity})
  }

  static DomainToPersistence(userDomain: UserDomain): IUserDomain {
    return {...userDomain.getAllPropsCopy()}
  }

  static EntityOrDomainToReturn(userEntityOrDomain: User | UserDomain | IUserDomain): IUserDomainReturn {
    if (userEntityOrDomain instanceof UserDomain) {
      return userEntityOrDomain.getPropsCopy()
    }

    if (userEntityOrDomain instanceof User) {
      delete userEntityOrDomain.password
      delete userEntityOrDomain.deletedAt
      return userEntityOrDomain
    }
  }
}