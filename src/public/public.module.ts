import { Module } from '@nestjs/common';
import { AuthGuardsModule } from '../auth/auth-guards.module';
import { PublicController } from './controllers/public.controller';

@Module({
  imports: [AuthGuardsModule],
  controllers: [PublicController],
})
export class PublicModule {}
