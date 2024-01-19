import { UserDomain } from "../domains/user.domain";

export interface UserRepositoryInterface {
  create(user: UserDomain): Promise<UserDomain>;
  findAll(): Promise<UserDomain[]>;
  findOne(id: string): Promise<UserDomain>;
  update(id: string, user: UserDomain): Promise<UserDomain>;
  remove(id: string): Promise<void>;
}