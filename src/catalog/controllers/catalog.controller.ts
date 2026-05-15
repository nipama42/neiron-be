import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CatalogService } from '../services/catalog.service';

@ApiTags('catalog')
@Controller()
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Get('kie-photo-prices')
  photoPrices() {
    return this.catalog.getPhotoPrices();
  }

  @Get('kie-video-prices')
  videoPrices() {
    return this.catalog.getVideoPrices();
  }

  @Get('models')
  models() {
    return this.catalog.listModels();
  }

  @Get('models/disabled-ids')
  disabledIds() {
    return this.catalog.listDisabledModelIds();
  }

  @Get('runtime/provider-mode')
  providerMode() {
    return this.catalog.getProviderMode();
  }

  @Get('banners')
  banners() {
    return this.catalog.listBanners();
  }
}
