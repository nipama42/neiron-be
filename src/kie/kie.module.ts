import { Module } from '@nestjs/common';
import { KieController } from './controllers/kie.controller';

@Module({
  controllers: [KieController],
})
export class KieModule {}
