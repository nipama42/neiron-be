import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { BEARER_SCHEME } from '../../swagger/constants';
import { JwtAuthGuard } from '../../lib/auth/guards/jwt-auth.guard';
import { CurrentUserId } from '../../lib/decorators/current-user-id.decorator';
import { SkipThrottle } from '@nestjs/throttler';
import { notImplemented } from '../../lib/common/not-implemented.util';

@ApiTags('payments')
@Controller()
export class PaymentController {
  @Get('payments/packages')
  packages() {
    return notImplemented('GET /payments/packages');
  }

  @ApiBearerAuth(BEARER_SCHEME)
  @UseGuards(JwtAuthGuard)
  @Post('payments/order/create')
  createOrder(@CurrentUserId() _userId: string, @Body() _body: unknown) {
    return notImplemented('POST /payments/order/create');
  }

  @ApiBearerAuth(BEARER_SCHEME)
  @UseGuards(JwtAuthGuard)
  @Get('payments/order/:orderId')
  getOrder(@CurrentUserId() _userId: string, @Param('orderId') _orderId: string) {
    return notImplemented('GET /payments/order/:orderId');
  }

  @SkipThrottle()
  @Post('payments/webhook/cryptobot')
  cryptobotWebhook(@Req() _req: Request & { rawBody?: string }) {
    return notImplemented('POST /payments/webhook/cryptobot');
  }
}
