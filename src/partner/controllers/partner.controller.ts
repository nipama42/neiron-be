import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BEARER_SCHEME } from '../../swagger/constants';
import { JwtAuthGuard } from '../../lib/auth/guards/jwt-auth.guard';
import { CurrentUserId } from '../../lib/decorators/current-user-id.decorator';
import { notImplemented } from '../../lib/common/not-implemented.util';

@ApiTags('partner')
@ApiBearerAuth(BEARER_SCHEME)
@Controller()
@UseGuards(JwtAuthGuard)
export class PartnerController {
  @Post('partner/apply')
  apply(@CurrentUserId() _userId: string, @Body() _body: unknown) {
    return notImplemented('POST /partner/apply');
  }

  @Get('partner/application')
  application(@CurrentUserId() _userId: string) {
    return notImplemented('GET /partner/application');
  }

  @Get('partner/dashboard')
  dashboard(@CurrentUserId() _userId: string) {
    return notImplemented('GET /partner/dashboard');
  }

  @Post('partner/payout')
  payout(@CurrentUserId() _userId: string, @Body() _body: unknown) {
    return notImplemented('POST /partner/payout');
  }

  @Post('partner/payout-wallet')
  payoutWallet(@CurrentUserId() _userId: string, @Body() _body: unknown) {
    return notImplemented('POST /partner/payout-wallet');
  }

  @Post('partner/currency')
  currency(@CurrentUserId() _userId: string, @Body() _body: unknown) {
    return notImplemented('POST /partner/currency');
  }
}
