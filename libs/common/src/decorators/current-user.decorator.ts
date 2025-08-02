import { UserDto } from '@app/common';
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

const getCurrentUserByContext = (ctx: ExecutionContext): UserDto => {
  const request = ctx
    .switchToHttp()
    .getRequest<Request & { user: UserDto }>();
  if (!request) {
    throw new UnauthorizedException('User not found');
  }
  return request.user as unknown as UserDto;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => getCurrentUserByContext(ctx),
);
