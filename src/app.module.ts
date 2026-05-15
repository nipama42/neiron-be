import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import pg from 'pg';
import configuration from './config/configuration';
import { sequelizeModels } from './lib/database/sequelize-models';
import { AppLoggerModule } from './lib/logger/app-logger.module';
import { AllExceptionsFilter } from './lib/filters/all-exceptions.filter';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CatalogModule } from './catalog/catalog.module';
import { PublicModule } from './public/public.module';
import { PaymentModule } from './payment/payment.module';
import { PartnerModule } from './partner/partner.module';
import { AdminModule } from './admin/admin.module';
import { KieModule } from './kie/kie.module';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    AppLoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [path.join(process.cwd(), '.env')],
      load: [configuration],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get<number>('apiGlobalRateLimitWindowMs') ?? 60_000,
          limit: config.get<number>('apiGlobalRateLimitMax') ?? 800,
          skipIf: (context) => {
            const req = context.switchToHttp().getRequest<{ method?: string; url?: string }>();
            const p = (req.url ?? '').split('?')[0];
            const method = (req.method ?? '').toUpperCase();
            // Swagger UI / spec
            if (p.startsWith('/docs') || p.startsWith('/openapi')) return true;
            // Health check
            if (p === '/health' || p === '/health/') return true;
            // Webhooks — raw body needed, no rate limit
            if (p === '/payments/webhook/cryptobot') return true;
            // Kie callback
            if (p === '/api/kie/suno-callback') return true;
            // Static media served by NestJS (if any)
            if (
              method === 'GET' &&
              (p.startsWith('/public/avatars') ||
                p.startsWith('/public/media') ||
                p.startsWith('/public/support-media'))
            ) {
              return true;
            }
            return false;
          },
        },
      ],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const db = config.get<{ host: string; port: number; username: string; password: string; database: string }>('db');
        if (!db) {
          throw new Error('DATABASE_URL is not set (PostgreSQL required)');
        }
        return {
          dialect: 'postgres',
          dialectModule: pg,
          host: db.host,
          port: db.port,
          username: db.username,
          password: db.password,
          database: db.database,
          models: sequelizeModels,
          autoLoadModels: true,
          logging: config.get<string>('nodeEnv') === 'development' ? console.log : false,
          define: {
            underscored: true,
          },
        };
      },
    }),
    AuthModule,
    UserModule,
    CatalogModule,
    PublicModule,
    PaymentModule,
    PartnerModule,
    AdminModule,
    KieModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
