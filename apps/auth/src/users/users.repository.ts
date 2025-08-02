import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from './entities/users.entity';

@Injectable()
export class UsersRepository extends AbstractRepository<UserEntity> {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(@InjectModel(UserEntity.name) userModel: Model<UserEntity>) {
    super(userModel);
  }
}
