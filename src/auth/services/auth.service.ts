import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserInternalService } from '../../user/services/user.internal.service';
import { TelegramUserService } from '../../user/services/telegram-user.service';
import { TokenService } from './token.service';
import { BotLoginService } from './bot-login.service';
import { TelegramVerifyService } from './telegram-verify.service';
import { toAuthUserDto } from '../../lib/user/user.mapper';
import { notImplemented } from '../../lib/common/not-implemented.util';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly users: UserInternalService,
    private readonly telegramUsers: TelegramUserService,
    private readonly tokens: TokenService,
    private readonly botLogin: BotLoginService,
    private readonly telegramVerify: TelegramVerifyService,
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

  async telegramAuth(body: {
    initData?: string;
    refCode?: string;
    partnerSlug?: string;
    partnerCode?: string;
    telegramStartCode?: string;
  }) {
    const { initData, refCode, partnerSlug, partnerCode, telegramStartCode } = body ?? {};

    if (!initData) {
      throw new BadRequestException({ error: 'initData is required' });
    }

    const tgUser = this.telegramVerify.verify(initData);
    if (!tgUser) {
      const peek = this.telegramVerify.peekForLog(initData);
      this.logger.warn(
        `[auth/telegram] Invalid initData` +
        ` bot_token=${this.telegramVerify['config'].get('botToken') ? 'set' : 'missing'}` +
        (peek.telegramUserId != null ? ` telegram_user_id=${peek.telegramUserId}` : '') +
        (peek.authAgeSec != null ? ` auth_age_sec=${peek.authAgeSec}` : '') +
        (peek.hasHash === false ? ' hash=missing' : '') +
        (!peek.ok ? ` peek_reason=${peek.reason}` : ''),
      );
      throw new UnauthorizedException({ error: 'Invalid initData' });
    }

    let user = await this.telegramUsers.findByTelegramId(tgUser.id);
    if (!user) {
      user = await this.telegramUsers.createUserFromTelegram(tgUser, {
        refCode,
        partnerSlug,
        partnerCode,
        telegramStartCode,
      });
    } else {
      this.telegramUsers.syncTelegramUserData(user.id as string, tgUser).catch(() => {});
    }

    if (!user) {
      throw new UnauthorizedException({ error: 'Failed to resolve user' });
    }

    const signed = this.tokens.signTokens(user.id as string);
    return {
      token: signed.token,
      refreshToken: signed.refreshToken,
      user: toAuthUserDto(user),
    };
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

  async tokenRefresh(refreshToken: string) {
    const userId = this.tokens.verifyRefreshToken(refreshToken);
    if (!userId) {
      throw new UnauthorizedException({ error: 'Invalid or expired refresh token' });
    }
    const user = await this.users.findById(userId);
    if (!user) {
      throw new UnauthorizedException({ error: 'User not found' });
    }
    const signed = this.tokens.signTokens(user.id as string);
    return { token: signed.token, refreshToken: signed.refreshToken };
  }

  botLoginUrl(partnerSlug?: string) {
    return this.botLogin.createSession(partnerSlug);
  }

  botLoginPoll(token?: string) {
    if (!token || typeof token !== 'string') {
      throw new BadRequestException({ error: 'token required' });
    }
    return this.botLogin.pollSession(token);
  }
}
