import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

function normalizeJwtSub(sub: unknown): string | null {
  if (typeof sub !== 'string') return null;
  const s = sub.trim();
  return s || null;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request & { userId?: string }>();
    const header = req.headers.authorization;
    const raw = header?.startsWith('Bearer ') ? header.slice(7) : null;
    const token = raw?.trim();
    if (!token) {
      throw new UnauthorizedException({ error: 'Unauthorized' });
    }
    try {
      const payload = this.jwt.verify(token, {
        secret: this.config.get<string>('jwtSecret'),
      }) as { sub?: string; type?: string };
      if (payload?.type === 'refresh') {
        throw new UnauthorizedException({ error: 'Invalid token' });
      }
      const sub = normalizeJwtSub(payload.sub);
      if (!sub) {
        throw new UnauthorizedException({ error: 'Invalid token' });
      }
      req.userId = sub;
      return true;
    } catch (e) {
      if (e instanceof UnauthorizedException) throw e;
      throw new UnauthorizedException({ error: 'Invalid token' });
    }
  }
}
