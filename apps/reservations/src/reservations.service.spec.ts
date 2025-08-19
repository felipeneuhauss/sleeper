import { Test, TestingModule } from '@nestjs/testing';
import { PAYMENTS_SERVICE } from '@app/common';
import { ReservationsService } from './reservations.service';
import { ReservationsRepository } from './reservations.repository';

describe('ReservationsService', () => {
  let service: ReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: ReservationsRepository,
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findOneAndDelete: jest.fn(),
          },
        },
        {
          provide: PAYMENTS_SERVICE,
          useValue: {
            send: jest.fn(() => ({ id: 'test-payment-id' })),
          },
        },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
