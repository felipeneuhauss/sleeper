import { CurrentUser } from '@app/common';
import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserEntity } from './users/entities/users.entity';

// Add this interface to extend the Request type
interface RequestWithUser extends Request {
  logout(): void;
  user?: UserEntity;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(
    @CurrentUser() user: UserEntity,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(user, res);
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  logout(@Request() req: RequestWithUser) {
    req.logout();
    return { message: 'Logged out successfully' };
  }

  @MessagePattern('authenticate')
  async authenticate(
    @Payload() data: { Authentication: string },
  ): Promise<UserEntity> {
    console.log('data', data);
    // Handle JWT authentication directly here
    return this.authService.authenticate(data.Authentication);
  }
}
