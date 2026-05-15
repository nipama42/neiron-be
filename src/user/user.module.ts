import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../lib/user/models/user.model';
import { MeController } from './controllers/me.controller';
import { UserService } from './services/user.service';
import { UserInternalService } from './services/user.internal.service';
import { AuthGuardsModule } from '../auth/auth-guards.module';

@Module({
  imports: [AuthGuardsModule, SequelizeModule.forFeature([User])],
  controllers: [MeController],
  providers: [UserService, UserInternalService],
  exports: [UserInternalService],
})
export class UserModule {}
