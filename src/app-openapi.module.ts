import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configuration from './config/configuration';
import { sequelizeModels } from './lib/database/sequelize-models';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CatalogModule } from './catalog/catalog.module';
import { PublicModule } from './public/public.module';
import { PaymentModule } from './payment/payment.module';
import { PartnerModule } from './partner/partner.module';
import { AdminModule } from './admin/admin.module';
import { KieModule } from './kie/kie.module';
import { HealthController } from './health/health.controller';

/**
 * Облегчённый модуль для генерации OpenAPI без PostgreSQL.
 * SQLite :memory: — только чтобы Sequelize инициализировал модели.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [path.join(__dirname, '../.env')],
      load: [configuration],
    }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: ':memory:',
      models: sequelizeModels,
      autoLoadModels: true,
      logging: false,
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
})
export class AppOpenApiModule {}
