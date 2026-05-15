import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserInternalService } from '../../user/services/user.internal.service';
import { TokenService } from './token.service';
import { toAuthUserDto } from '../../lib/user/user.mapper';
import { notImplemented } from '../../lib/common/not-implemented.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UserInternalService,
    private readonly tokens: TokenService,
  ) {}

  async emailLogin(email: string, password: string) {
    const raw = String(email).trim();
    let user = await this.users.findByEmail(raw);
    if (!user) user = await this.users.findByLogin(raw);
    if (!user || !(await this.users.verifyEmailPassword(user, password))) {
      throw new UnauthorizedException({ error: 'Invalid credentials' });
    }
    const signed = this.tokens.signTokens(user.id as string);
    return {
      token: signed.token,
      refreshToken: signed.refreshToken,
      user: toAuthUserDto(user),
    };
  }

  telegramAuth() {
    return notImplemented('POST /auth/telegram');
  }

  emailRegister() {
    return notImplemented('POST /auth/email/register');
  }

  emailRequestCode() {
    return notImplemented('POST /auth/email/request-code');
  }

  emailVerifyCode() {
    return notImplemented('POST /auth/email/verify-code');
  }

  recoveryRequestCode() {
    return notImplemented('POST /auth/email/recovery/request-code');
  }

  recoveryVerifyCode() {
    return notImplemented('POST /auth/email/recovery/verify-code');
  }

  recoverySetPassword() {
    return notImplemented('POST /auth/email/recovery/set-password');
  }

  botLoginUrl() {
    return notImplemented('GET /auth/telegram/bot-login-url');
  }

  botLoginPoll() {
    return notImplemented('GET /auth/telegram/bot-login-poll');
  }
}
