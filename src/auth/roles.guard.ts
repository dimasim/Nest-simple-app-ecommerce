import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/users/entities/user.entity';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Dapatkan role yang dibutuhkan dari decorator @Roles
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Jika tidak ada decorator @Roles, endpoint ini tidak dijaga oleh role
    if (!requiredRoles) {
      return true;
    }

    // 2. Dapatkan data user dari request (yang sudah divalidasi oleh JwtAuthGuard)
    const { user } = context.switchToHttp().getRequest();

    // 3. Bandingkan role user dengan role yang dibutuhkan
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}