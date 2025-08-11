import { CreateChargeDto } from '@app/common';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsObject,
  ValidateNested
} from 'class-validator';

export class CreateReservationDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumber()
  amount: number;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto;
}
