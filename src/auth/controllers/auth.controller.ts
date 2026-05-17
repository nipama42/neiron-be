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
  @ApiOperation({ summary: 'Вход через Telegram Web App (initData)' })
  @Throttle({ default: { limit: 60, ttl: 900_000 } })
  telegramAuth(
    @Body()
    body: {
      initData?: string;
      refCode?: string;
      partnerSlug?: string;
      partnerCode?: string;
      telegramStartCode?: string;
    },
  ) {
    return this.authService.telegramAuth(body);
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

  @Post('token/refresh')
  @ApiOperation({ summary: 'Обновить access-токен по refresh-токену' })
  @Throttle({ default: { limit: 30, ttl: 900_000 } })
  tokenRefresh(@Body() body: { refreshToken?: string }) {
    if (!body?.refreshToken) {
      throw new BadRequestException({ error: 'refreshToken required' });
    }
    return this.authService.tokenRefresh(body.refreshToken);
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
  @ApiOperation({ summary: 'Создать ссылку для входа через Telegram-бот' })
  botLoginUrl(@Query('partnerSlug') partnerSlug?: string) {
    return this.authService.botLoginUrl(partnerSlug);
  }

  @Get('telegram/bot-login-poll')
  @ApiOperation({ summary: 'Опросить результат бот-авторизации' })
  botLoginPoll(@Query('token') token?: string) {
    return this.authService.botLoginPoll(token);
  }
}
