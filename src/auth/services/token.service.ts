import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  signTokens(userId: string) {
    const secret = this.config.get<string>('jwtSecret')!;
    const token = this.jwt.sign({ sub: userId }, { secret, expiresIn: '7d' });
    const refreshToken = this.jwt.sign(
      { sub: userId, type: 'refresh' },
      { secret, expiresIn: '30d' },
    );
    return { token, refreshToken };
  }

  signEmailVerificationToken(email: string) {
    const secret = this.config.get<string>('jwtSecret')!;
    const ttl = this.config.get<number>('emailVerificationTokenTtlMinutes') ?? 60;
    return this.jwt.sign(
      { type: 'email-verified', email },
      { secret, expiresIn: `${ttl}m` },
    );
  }

  signPasswordRecoveryToken(email: string) {
    const secret = this.config.get<string>('jwtSecret')!;
    const ttl = this.config.get<number>('emailVerificationTokenTtlMinutes') ?? 60;
    return this.jwt.sign(
      { type: 'password-recovery', email },
      { secret, expiresIn: `${ttl}m` },
    );
  }
}
