import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

describe('PaymentsController', () => {
  let paymentsController: PaymentsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [PaymentsService],
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
