import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  private readonly logger = new Logger(ReservationsService.name);

  constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}

  async create(createReservationDto: CreateReservationDto, user: UserDto) {
    try {
      this.logger.log(`Creating reservation for user: ${user.email}`);
      this.logger.log(`Reservation data: ${JSON.stringify(createReservationDto)}`);
      
      console.log('Attempting to create payment charge...');
      const paymentResponse: any = await firstValueFrom(
        this.paymentsService.send('create_charge', {
          ...createReservationDto.charge,
          email: user.email,
        }),
      );
      console.log('Payment charge created successfully:', paymentResponse);

      console.log('Creating reservation...');
      const reservation = await this.reservationsRepository.create({
        ...createReservationDto,
        startDate: new Date(createReservationDto.startDate),
        endDate: new Date(createReservationDto.endDate),
        timestamp: new Date(),
        invoiceId: paymentResponse.id,
        userId: user._id,
      });
      
      this.logger.log(`Reservation created successfully: ${reservation._id}`);
      return reservation;
    } catch (error) {
      this.logger.error(`Error in create reservation: ${error.message}`, error.stack);
      console.error('Error in create reservation:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(
        `Reservation creation failed: ${(error as Error).message}`,
      );
    }
  }

  async findAll() {
    return this.reservationsRepository.find({});
  }

  async findOne(id: string) {
    return this.reservationsRepository.findOne({ _id: id });
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id: id },
      { $set: updateReservationDto },
    );
  }

  async remove(id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id: id });
  }
}
