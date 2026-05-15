import { User } from '../user/models/user.model';
import { EmailVerification } from '../auth/models/email-verification.model';
import { Partner } from '../partner/models/partner.model';
import { PartnerApplication } from '../partner/models/partner-application.model';
import { PartnerEarning } from '../partner/models/partner-earning.model';
import { PartnerPayout } from '../partner/models/partner-payout.model';
import { SupportMessage } from '../support/models/support-message.model';
import { PromoCode } from '../wallet/models/promo-code.model';
import { SiteEvent } from '../admin/models/site-event.model';
import { Chat } from '../chat/models/chat.model';
import { ChatMessage } from '../chat/models/chat-message.model';
import { GenerationJob } from '../generation/models/generation-job.model';
import { PaymentOrder } from '../payment/models/payment-order.model';
import { KiePhotoModelPrice } from '../catalog/models/kie-photo-model-price.model';
import { KieVideoModelPrice } from '../catalog/models/kie-video-model-price.model';
import { KieEconomicsSettings } from '../catalog/models/kie-economics-settings.model';
import { GenerationModel } from '../catalog/models/generation-model.model';
import { Banner } from '../catalog/models/banner.model';
import { SitePage } from '../catalog/models/site-page.model';
import { PublicFeedItem } from '../feed/models/public-feed-item.model';
import { GenerationPublishBan } from '../feed/models/generation-publish-ban.model';

export const sequelizeModels = [
  User,
  EmailVerification,
  Partner,
  PartnerApplication,
  PartnerEarning,
  PartnerPayout,
  SupportMessage,
  PromoCode,
  SiteEvent,
  Chat,
  ChatMessage,
  GenerationJob,
  PaymentOrder,
  KiePhotoModelPrice,
  KieVideoModelPrice,
  KieEconomicsSettings,
  GenerationModel,
  Banner,
  SitePage,
  PublicFeedItem,
  GenerationPublishBan,
];
