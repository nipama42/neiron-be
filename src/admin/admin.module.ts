import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../lib/user/models/user.model';
import { SiteEvent } from '../lib/admin/models/site-event.model';
import { SupportMessage } from '../lib/support/models/support-message.model';
import { PromoCode } from '../lib/wallet/models/promo-code.model';
import { GenerationPublishBan } from '../lib/feed/models/generation-publish-ban.model';
import { Partner } from '../lib/partner/models/partner.model';
import { PartnerApplication } from '../lib/partner/models/partner-application.model';
import { PartnerPayout } from '../lib/partner/models/partner-payout.model';
import { AdminController } from './controllers/admin.controller';
import { AuthGuardsModule } from '../auth/auth-guards.module';

@Module({
  imports: [
    AuthGuardsModule,
    SequelizeModule.forFeature([
      User,
      SiteEvent,
      SupportMessage,
      PromoCode,
      GenerationPublishBan,
      Partner,
      PartnerApplication,
      PartnerPayout,
    ]),
  ],
  controllers: [AdminController],
})
export class AdminModule {}
