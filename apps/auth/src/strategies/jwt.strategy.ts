import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { UserEntity } from '../users/entities/users.entity';
import { UsersService } from '../users/users.service';

interface RequestWithCookies {
  cookies?: {
    Authentication?: string;
  };
  Authentication?: string;
}

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    if (!configService) {
      throw new Error('ConfigService is not injected');
    }

    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: RequestWithCookies) => {
          console.log('request', request);
          console.log('request?.cookies', request?.cookies);
          console.log('request?.Authentication', request?.Authentication);
          return (
            request?.cookies?.Authentication ||
            request?.Authentication ||
            null
          );
        },
      ]),
      secretOrKey: jwtSecret,
    });
  }

  async validate({ userId }: TokenPayload): Promise<UserEntity> {
    return this.usersService.getUserById({ _id: userId });
  }
}
