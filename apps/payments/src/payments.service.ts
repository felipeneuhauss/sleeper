import { NOTIFICATIONS_SERVICE } from '@app/common';
import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentCreateChargeDto } from './dto/payment-create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  async createCharge({ card, amount, email }: PaymentCreateChargeDto) {
    try {
      this.logger.log(`Processing payment for amount: ${amount}`);
      this.logger.log(`Card details: ${JSON.stringify({ ...card, number: '****' })}`);

      // Mock payment for testing - simulate successful payment
      console.log('Processing payment:', {
        amount,
        card: { ...card, number: '****' },
      });

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 100));

      const paymentResult = {
        id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'succeeded',
        amount,
        currency: 'usd',
        created: new Date().toISOString(),
        invoice: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      };

      this.logger.log(`Payment processed successfully: ${paymentResult.id}`);
      this.notificationsService.emit('notify_email', {
        email,
        text: 'Payment successful',
      });
      return paymentResult;
    } catch (error) {
      this.logger.error(`Payment error: ${error.message}`, error.stack);
      console.error('Payment error:', error);
      throw new BadRequestException(
        `Payment failed: ${(error as Error).message}`,
      );
    }
  }
}
