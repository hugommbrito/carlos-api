import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ROLES_KEY } from '../rolesConfig/role.decorator';
import { Role } from '../rolesConfig/role.enum';

async function getRoleFromRequestToken(request: Request): Promise<string | undefined> {
  const jwtService = new JwtService({});

  const [type, reqToken] = request.headers.authorization?.split(' ') ?? [];
  const token = type === 'Bearer' ? reqToken : undefined;

  if (!token) {
    throw new UnauthorizedException('Token não informado');
  }

  try {
    const payload = await jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
    return payload.role;
  } catch (error) {
    throw new UnauthorizedException('Token não pode ser validado');
  }
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredRoles) {
      return true;
    }
    const userRole = await getRoleFromRequestToken(context.switchToHttp().getRequest());
    return requiredRoles.some((requiredRole) => userRole === requiredRole);
  }
}

@Injectable()
export class SelfOrRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user, body, params } = context.switchToHttp().getRequest();

    const isRoleAuthorized = requiredRoles.some((requiredRole) => user.role === requiredRole);
    const isBodyAuthorized = user.sub === body.id;
    const isParamAuthorized = user.sub === params.id;

    if (isRoleAuthorized || isBodyAuthorized || isParamAuthorized) {
      return true;
    } else {
      throw new UnauthorizedException(
        {},
        {
          cause: 'roles.guards.self-or-role',
          description: `Usuário deve ser o dono do recurso ou ter a role necessária => ${requiredRoles}`
        }
      );
    }
  }
}
