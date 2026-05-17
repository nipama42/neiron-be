import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../lib/user/models/user.model';
import { SupportMessage } from '../lib/support/models/support-message.model';
import { Partner } from '../lib/partner/models/partner.model';
import { SiteEvent } from '../lib/admin/models/site-event.model';
import { MeController } from './controllers/me.controller';
import { UserService } from './services/user.service';
import { UserInternalService } from './services/user.internal.service';
import { SupportService } from './services/support.service';
import { TelegramUserService } from './services/telegram-user.service';
import { AuthGuardsModule } from '../auth/auth-guards.module';

@Module({
  imports: [
    AuthGuardsModule,
    SequelizeModule.forFeature([User, SupportMessage, Partner, SiteEvent]),
  ],
  controllers: [MeController],
  providers: [UserService, UserInternalService, SupportService, TelegramUserService],
  exports: [UserInternalService, SupportService, TelegramUserService],
})
export class UserModule {}
