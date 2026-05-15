import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Partner } from '../lib/partner/models/partner.model';
import { PartnerApplication } from '../lib/partner/models/partner-application.model';
import { PartnerEarning } from '../lib/partner/models/partner-earning.model';
import { PartnerPayout } from '../lib/partner/models/partner-payout.model';
import { PartnerController } from './controllers/partner.controller';
import { AuthGuardsModule } from '../auth/auth-guards.module';

@Module({
  imports: [
    AuthGuardsModule,
    SequelizeModule.forFeature([
      Partner,
      PartnerApplication,
      PartnerEarning,
      PartnerPayout,
    ]),
  ],
  controllers: [PartnerController],
})
export class PartnerModule {}
