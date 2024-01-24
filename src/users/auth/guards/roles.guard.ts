import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "../rolesConfig/role.enum";
import { ROLES_KEY, RolesType } from "../rolesConfig/role.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ){}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RolesType[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if(!requiredRoles){
      return true
    }
    console.log(requiredRoles);
    const user = context.switchToHttp().getRequest()
    // console.log(user);
    return requiredRoles.some(role => user.user.role?.includes(role))
  }
}

@Injectable()
export class SelfOrRoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ){}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if(!requiredRoles){
      return true
    }

    const { user, Body, Param } = context.switchToHttp().getRequest()
    console.log(user, Body, Param);
    const isRoleAuthorized =  requiredRoles.some(role => user.roles?.includes(role))
    const isBodyAuthorized = user.id === Body.id
    const isParamAuthorized = user.id === Param.id
    return isRoleAuthorized || isBodyAuthorized || isParamAuthorized
  }
}