import { SetMetadata } from "@nestjs/common";
import { Role } from "./role.enum";

export const ROLES_KEY = 'roles';
export type RolesType = 'admin' | 'staff' | 'user'
export const Roles = (...roles: RolesType[]) => SetMetadata(ROLES_KEY, roles)