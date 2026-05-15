import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Banner } from '../lib/catalog/models/banner.model';
import { GenerationModel } from '../lib/catalog/models/generation-model.model';
import { KieEconomicsSettings } from '../lib/catalog/models/kie-economics-settings.model';
import { KiePhotoModelPrice } from '../lib/catalog/models/kie-photo-model-price.model';
import { KieVideoModelPrice } from '../lib/catalog/models/kie-video-model-price.model';
import { CatalogController } from './controllers/catalog.controller';
import { CatalogService } from './services/catalog.service';

@Module({
  imports: [
    SequelizeModule.forFeature([
      KiePhotoModelPrice,
      KieVideoModelPrice,
      GenerationModel,
      KieEconomicsSettings,
      Banner,
    ]),
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
  exports: [CatalogService],
})
export class CatalogModule {}
