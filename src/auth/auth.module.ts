import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../lib/user/models/user.model';
import { EmailVerification } from '../lib/auth/models/email-verification.model';
import { BotLoginSession } from '../lib/auth/models/bot-login-session.model';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { BotLoginService } from './services/bot-login.service';
import { TelegramVerifyService } from './services/telegram-verify.service';
import { UserModule } from '../user/user.module';
import { AuthGuardsModule } from './auth-guards.module';

@Module({
  imports: [
    AuthGuardsModule,
    UserModule,
    SequelizeModule.forFeature([User, EmailVerification, BotLoginSession]),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, BotLoginService, TelegramVerifyService],
  exports: [AuthGuardsModule, TokenService, AuthService],
})
export class AuthModule {}
