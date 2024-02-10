import { UserDomain } from '../domains/user.domain';

export interface UserRepositoryInterface {
  create(user: UserDomain): Promise<UserDomain>;
  findAll(): Promise<UserDomain[]>;
  findById(id: string): Promise<UserDomain>;
  findByEmail(email: string): Promise<UserDomain>;
  update(id: string, user: UserDomain): Promise<UserDomain>;
  remove(id: string): Promise<void>;
}
