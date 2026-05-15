import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { json } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger/setup-swagger';

const TELEGRAM_WEB_ORIGINS = new Set(['https://web.telegram.org', 'https://telegram.org']);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    bodyParser: false,
  });
  app.useLogger(app.get(Logger));
  const config = app.get(ConfigService);

  if (config.get<boolean>('trustProxy')) {
    app.set('trust proxy', 1);
  }

  app.use(
    json({
      limit: '50mb',
      verify: (req, _res, buf) => {
        if (req.url === '/payments/webhook/cryptobot') {
          (req as { rawBody?: string }).rawBody = buf.toString('utf8');
        }
      },
    }),
  );

  const corsOrigins = config.get<string[] | null>('corsOrigins');
  if (corsOrigins?.length) {
    app.enableCors({
      origin(origin, callback) {
        if (!origin) return callback(null, true);
        if (corsOrigins.includes(origin)) return callback(null, true);
        if (TELEGRAM_WEB_ORIGINS.has(origin)) return callback(null, true);
        return callback(null, false);
      },
    });
  } else {
    app.enableCors();
  }

  setupSwagger(app);

  const port = config.get<number>('port') ?? 3000;
  await app.listen(port);
  const logger = app.get(Logger);
  logger.log(`Listening on :${port}`, 'Bootstrap');
  logger.log(`OpenAPI UI: http://localhost:${port}/docs`, 'Bootstrap');
  logger.log(`OpenAPI JSON: http://localhost:${port}/openapi.json`, 'Bootstrap');
}

bootstrap();
