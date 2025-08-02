import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, Observable, of, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';
import { UserDto } from '../dto';

interface RequestWithUser extends Request {
  user?: unknown;
  cookies?: {
    Authentication?: string;
  };
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const jwt = request.cookies?.Authentication;
    if (!jwt) {
      return of(false);
    }

    return this.authClient
      .send<UserDto>('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        tap((res) => {
          request.user = res;
          context.switchToHttp().getResponse().user = res;
        }),
        map(() => {
          return true;
        }),
      );
  }
}
