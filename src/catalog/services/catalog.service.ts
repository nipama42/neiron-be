import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { Banner } from '../../lib/catalog/models/banner.model';
import { GenerationModel } from '../../lib/catalog/models/generation-model.model';
import { KieEconomicsSettings } from '../../lib/catalog/models/kie-economics-settings.model';
import { KiePhotoModelPrice } from '../../lib/catalog/models/kie-photo-model-price.model';
import { KieVideoModelPrice } from '../../lib/catalog/models/kie-video-model-price.model';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(KiePhotoModelPrice)
    private readonly photoPrices: typeof KiePhotoModelPrice,
    @InjectModel(KieVideoModelPrice)
    private readonly videoPrices: typeof KieVideoModelPrice,
    @InjectModel(GenerationModel) private readonly models: typeof GenerationModel,
    @InjectModel(KieEconomicsSettings)
    private readonly economics: typeof KieEconomicsSettings,
    @InjectModel(Banner) private readonly banners: typeof Banner,
    private readonly config: ConfigService,
  ) {}

  async getPhotoPrices() {
    const rows = await this.photoPrices.findAll({ raw: true });
    const map: Record<string, Record<string, number>> = {};
    for (const r of rows) {
      const row = r as { model_id: string; quality_key: string; coins: number };
      if (!map[row.model_id]) map[row.model_id] = {};
      map[row.model_id][row.quality_key] = row.coins;
    }
    return map;
  }

  async getVideoPrices() {
    const rows = await this.videoPrices.findAll({ raw: true });
    const map: Record<string, Record<string, number>> = {};
    for (const r of rows) {
      const row = r as { model_id: string; tier_key: string; coins: number };
      if (!map[row.model_id]) map[row.model_id] = {};
      map[row.model_id][row.tier_key] = row.coins;
    }
    return map;
  }

  async listModels() {
    const rows = await this.models.findAll({
      where: { is_active: true },
      order: [['sort_order', 'ASC']],
      raw: true,
    });
    return rows.map((m) => {
      const r = m as {
        id: string;
        label: string;
        modes: unknown;
        show_duration: boolean;
        aspect_ratios: unknown;
        quality_opts: unknown;
        media_max_files: number;
        media_accept: string;
        media_max_size_mb: number;
        media_hint: string;
        sort_order: number;
      };
      return {
        id: r.id,
        label: r.label,
        modes: r.modes,
        showDuration: r.show_duration,
        aspectRatios: r.aspect_ratios,
        qualityOpts: r.quality_opts,
        mediaMaxFiles: r.media_max_files,
        mediaAccept: r.media_accept,
        mediaMaxSizeMb: r.media_max_size_mb,
        mediaHint: r.media_hint,
        sortOrder: r.sort_order,
      };
    });
  }

  async listDisabledModelIds() {
    const rows = await this.models.findAll({
      where: { is_active: false },
      attributes: ['id'],
      raw: true,
    });
    return rows.map((r) => (r as { id: string }).id);
  }

  async getProviderMode() {
    const row = await this.economics.findByPk(1, { raw: true });
    const photoProviderMode =
      (row as { photo_provider_mode?: string } | null)?.photo_provider_mode ?? 'kie';
    const apimartForced = this.config.get<boolean>('apimartForceAllTraffic') ?? false;
    return { photoProviderMode, apimartForced };
  }

  async listBanners() {
    const rows = await this.banners.findAll({ order: [['slot', 'ASC']], raw: true });
    return rows.map((b) => ({
      slot: (b as { slot: number }).slot,
      imageUrl: (b as { image_url: string | null }).image_url,
      linkUrl: (b as { link_url: string | null }).link_url,
    }));
  }
}
