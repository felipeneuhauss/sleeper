import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CardDto {
  @IsNotEmpty()
  @IsString()
  @IsCreditCard()
  number: string;

  @IsNotEmpty()
  @IsNumber()
  exp_month: number;

  @IsNotEmpty()
  @IsNumber()
  exp_year: number;

  @IsNotEmpty()
  @IsString()
  cvc: string;
}
