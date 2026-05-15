import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IncomingMessage } from 'http';

interface TrackedRequest extends IncomingMessage {
  userId?: string;
}

const SKIP_PATHS = new Set(['/health', '/health/']);
const SENSITIVE_FIELDS = new Set(['password', 'token', 'secret', 'refreshToken', 'code']);

function sanitizeBody(body: unknown): unknown {
  if (!body || typeof body !== 'object') return body;
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(body as Record<string, unknown>)) {
    result[key] = SENSITIVE_FIELDS.has(key) ? '[REDACTED]' : value;
  }
  return result;
}

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isDev = config.get<string>('nodeEnv') === 'development';

        return {
          pinoHttp: {
            level: isDev ? 'debug' : 'info',

            transport: isDev
              ? {
                  target: 'pino-pretty',
                  options: {
                    colorize: true,
                    singleLine: false,
                    translateTime: 'SYS:HH:MM:ss.l',
                    ignore: 'pid,hostname',
                    messageFormat: '{msg}',
                  },
                }
              : undefined,

            customProps: (req: TrackedRequest) => ({
              userId: req.userId ?? null,
            }),

            autoLogging: {
              ignore: (req: TrackedRequest) => SKIP_PATHS.has(req.url ?? ''),
            },

            customLogLevel: (_req: TrackedRequest, res, err) => {
              if (err || res.statusCode >= 500) return 'error';
              if (res.statusCode >= 400) return 'warn';
              return 'info';
            },

            customSuccessMessage: (req: TrackedRequest, res) =>
              `${req.method} ${req.url} → ${res.statusCode}`,

            customErrorMessage: (req: TrackedRequest, res, err) =>
              `${req.method} ${req.url} → ${res.statusCode} — ${(err as Error)?.message ?? 'unknown error'}`,

            serializers: {
              req(req) {
                return {
                  method: req.method,
                  url: req.url,
                  userId: (req.raw as TrackedRequest)?.userId ?? null,
                  ip:
                    req.headers?.['x-forwarded-for'] ??
                    req.headers?.['x-real-ip'] ??
                    req.remoteAddress,
                  userAgent: req.headers?.['user-agent'],
                  body: sanitizeBody((req.raw as { body?: unknown })?.body),
                };
              },
              res(res) {
                return { statusCode: res.statusCode };
              },
            },
          },
        };
      },
    }),
  ],
  exports: [LoggerModule],
})
export class AppLoggerModule {}
