import { randomUUID } from "crypto";
import * as bcrypt from 'bcrypt'
import { MethodNotAllowedException } from "@nestjs/common";

export class UserDomain {
  private readonly props: IUserDomain;

  constructor(inputProps: IUserDomainInput, id?: string, isActive?: boolean, createdAt?: Date, updatedAt?: Date, deletedAt?: Date) {
    const now = new Date();
    this.props = {
      ...inputProps,
      id: id || randomUUID(),
      isActive: isActive || true,
      createdAt: createdAt || now,
      updatedAt: updatedAt || now,
      deletedAt: deletedAt || null,
    };
    this.validate();
  }

  private validate(): void {
    if (!this.props.name)  throw new Error("Name is required");
    if (!this.props.surname)  throw new Error("Surname is required");
    if (!this.props.birthdate)  throw new Error("Birthdate is required");
    if (this.props.birthdate > new Date())  throw new Error("Birthdate must not be in the future")
    if (!this.props.email)  throw new Error("Email is required");
    if (!this.props.password)  throw new Error("Password is required");

  }

  static create(inputProps: IUserDomainInput): UserDomain {
    return new UserDomain(inputProps);
  }

  static load(props: IUserDomain): UserDomain {
    return new UserDomain(props, props.id);
  }

  public updateSelf(props: Partial<IUserDomainInput>): void {
    Object.keys(props).forEach(propKey => {
      if(
        propKey === 'createdAt' ||
        propKey === 'updatedAt' ||
        propKey === 'deletedAt' ||
        propKey === 'id'
      ){
        throw new MethodNotAllowedException(`${propKey} não pode ser atualizado por este método`)
      }
      if(propKey === 'password') this.encryptPassword()
      this.props[propKey] = props[propKey]
    })
  }

  public encryptPassword(): void {
    const isEmcrypted = /^\$2a\$/.test(this.props.password) || /^\$2b\$/.test(this.props.password);
    if (!isEmcrypted) {
      this.props.password = bcrypt.hashSync(this.props.password, 10);
    }
  }

  public checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.props.password);
  }

  public getAllPropsCopy(): IUserDomain {
    return Object.freeze({...this.props})
  }
  public getPropsCopy(): IUserDomainReturn {
    const { password, deletedAt, ...otherProps } = this.props;
    return Object.freeze(otherProps);
  }

}

export interface IUserDomain extends IUserDomainInput {
  id?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface IUserDomainInput {
  name: string;
  surname: string;
  birthdate: Date;
  email: string;
  password: string;
  role?: "admin" | "staff" | "user";
}

export interface IUserDomainReturn extends Omit<IUserDomain, 'password'> {}