import { PartialType } from '@nestjs/mapped-types';
import { CreateReservationDto } from './create-reservation.dto';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  startDate: string;

  endDate: string;

  userId: string;

  placeId: string;

  invoiceId: string;
}
