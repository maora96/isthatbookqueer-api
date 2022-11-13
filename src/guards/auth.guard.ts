import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    console.log('hy');
    const request = context.switchToHttp().getRequest();
    return request.session.userId;
  }
}
