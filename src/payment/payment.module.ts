import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentOrder } from '../lib/payment/models/payment-order.model';
import { PaymentController } from './controllers/payment.controller';
import { AuthGuardsModule } from '../auth/auth-guards.module';

@Module({
  imports: [AuthGuardsModule, SequelizeModule.forFeature([PaymentOrder])],
  controllers: [PaymentController],
})
export class PaymentModule {}
