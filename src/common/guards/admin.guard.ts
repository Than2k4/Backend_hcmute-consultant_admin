import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) throw new ForbiddenException('Missing token');

    const token = authHeader.split(' ')[1];
    const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });

    if (decoded.role !== 'ADMIN') throw new ForbiddenException('Access denied');
    request.user = decoded;
    return true;
  }
}
