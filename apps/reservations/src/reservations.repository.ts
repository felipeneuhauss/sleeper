import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReservationEntity } from './entities/reservation.entity';

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationEntity> {
  protected readonly logger = new Logger(ReservationsRepository.name);

  constructor(
    @InjectModel(ReservationEntity.name)
    reservationModel: Model<ReservationEntity>,
  ) {
    super(reservationModel);
  }
}
