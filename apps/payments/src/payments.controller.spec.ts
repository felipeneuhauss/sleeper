import { NOTIFICATIONS_SERVICE } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

describe('PaymentsController', () => {
  let paymentsController: PaymentsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        PaymentsService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const config = {
                STRIPE_SECRET_KEY: 'sk_test_fake_key',
                PORT: 3003,
              };
              return config[key];
            }),
          },
        },
        {
          provide: NOTIFICATIONS_SERVICE,
          useValue: {
            emit: jest.fn(),
          },
        },
      ],
    }).compile();

    paymentsController = app.get<PaymentsController>(PaymentsController);
  });

  it('should be defined', () => {
    expect(paymentsController).toBeDefined();
  });

  it('should create a charge', () => {
    const charge = paymentsController.createCharge({
      amount: 100,
      card: {
        number: '4242424242424242',
        exp_month: 1,
        exp_year: 2025,
        cvc: '123',
      },
      email: 'test@test.com',
    });

    expect(charge).toBeDefined();
  });
});
