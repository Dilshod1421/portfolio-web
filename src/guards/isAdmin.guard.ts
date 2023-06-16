import {
  Injectable,
  ExecutionContext,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log(req.user)
    if (req.user.is_admin != true) {
      throw new UnauthorizedException({
        message: 'Admin is not match!',
      });
    }
    return true;
  }
}
