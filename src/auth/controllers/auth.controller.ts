import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
@Throttle({ default: { limit: 120, ttl: 900_000 } })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('telegram')
  telegramAuth(@Body() body: Record<string, unknown>) {
    return this.authService.telegramAuth();
  }

  @Post('email/register')
  emailRegister(@Body() body: Record<string, unknown>) {
    return this.authService.emailRegister();
  }

  @Post('email/request-code')
  @Throttle({ default: { limit: 24, ttl: 3_600_000 } })
  emailRequestCode(@Body() body: Record<string, unknown>) {
    return this.authService.emailRequestCode();
  }

  @Post('email/verify-code')
  @Throttle({ default: { limit: 24, ttl: 3_600_000 } })
  emailVerifyCode(@Body() body: Record<string, unknown>) {
    return this.authService.emailVerifyCode();
  }

  @Post('email/recovery/request-code')
  @Throttle({ default: { limit: 24, ttl: 3_600_000 } })
  recoveryRequestCode(@Body() body: Record<string, unknown>) {
    return this.authService.recoveryRequestCode();
  }

  @Post('email/recovery/verify-code')
  @Throttle({ default: { limit: 24, ttl: 3_600_000 } })
  recoveryVerifyCode(@Body() body: Record<string, unknown>) {
    return this.authService.recoveryVerifyCode();
  }

  @Post('email/recovery/set-password')
  recoverySetPassword(@Body() body: Record<string, unknown>) {
    return this.authService.recoverySetPassword();
  }

  @Post('email/login')
  @ApiOperation({ summary: 'Вход по email и паролю' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  emailLogin(@Body() body: { email?: string; password?: string }) {
    if (!body?.email || !body?.password) {
      throw new BadRequestException({ error: 'email and password required' });
    }
    return this.authService.emailLogin(body.email, body.password);
  }

  @Get('telegram/bot-login-url')
  botLoginUrl(@Query('partnerSlug') _partnerSlug?: string) {
    return this.authService.botLoginUrl();
  }

  @Get('telegram/bot-login-poll')
  botLoginPoll(@Query('token') _token?: string) {
    return this.authService.botLoginPoll();
  }
}
