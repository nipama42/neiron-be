import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BEARER_SCHEME } from '../../swagger/constants';
import { JwtAuthGuard } from '../../lib/auth/guards/jwt-auth.guard';
import { AdminGuard } from '../../lib/auth/guards/admin.guard';
import { CurrentUserId } from '../../lib/decorators/current-user-id.decorator';
import { notImplemented } from '../../lib/common/not-implemented.util';

@ApiTags('admin')
@ApiBearerAuth(BEARER_SCHEME)
@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  @Get('summary')
  summary() {
    return notImplemented('GET /admin/summary');
  }

  @Get('kie-economics')
  getKieEconomics() {
    return notImplemented('GET /admin/kie-economics');
  }

  @Patch('kie-economics')
  patchKieEconomics(@Body() _body: unknown) {
    return notImplemented('PATCH /admin/kie-economics');
  }

  @Put('kie-economics')
  putKieEconomics(@Body() _body: unknown) {
    return notImplemented('PUT /admin/kie-economics');
  }

  @Get('openai-vless')
  getVless() {
    return notImplemented('GET /admin/openai-vless');
  }

  @Put('openai-vless')
  putVless(@Body() _body: unknown) {
    return notImplemented('PUT /admin/openai-vless');
  }

  @Get('apimart')
  getApimart() {
    return notImplemented('GET /admin/apimart');
  }

  @Put('apimart')
  putApimart(@Body() _body: unknown) {
    return notImplemented('PUT /admin/apimart');
  }

  @Get('events')
  events(@Query() _q: Record<string, string>) {
    return notImplemented('GET /admin/events');
  }

  @Get('support/threads')
  supportThreads() {
    return notImplemented('GET /admin/support/threads');
  }

  @Get('support/:userId/messages')
  supportMessages(@Param('userId') _userId: string) {
    return notImplemented('GET /admin/support/:userId/messages');
  }

  @Post('support/:userId/typing')
  supportTypingPost(@Param('userId') _userId: string) {
    return notImplemented('POST /admin/support/:userId/typing');
  }

  @Get('support/:userId/typing')
  supportTypingGet(@Param('userId') _userId: string) {
    return notImplemented('GET /admin/support/:userId/typing');
  }

  @Post('support/:userId/messages')
  supportMessagesPost(@Param('userId') _userId: string) {
    return notImplemented('POST /admin/support/:userId/messages');
  }

  @Post('support/:userId/read')
  supportRead(@Param('userId') _userId: string) {
    return notImplemented('POST /admin/support/:userId/read');
  }

  @Post('support/:userId/close')
  supportClose(@Param('userId') _userId: string) {
    return notImplemented('POST /admin/support/:userId/close');
  }

  @Get('promo-codes')
  promoCodes() {
    return notImplemented('GET /admin/promo-codes');
  }

  @Post('promo-codes')
  createPromo(@Body() _body: unknown) {
    return notImplemented('POST /admin/promo-codes');
  }

  @Post('users/grant')
  grantUser(@Body() _body: unknown) {
    return notImplemented('POST /admin/users/grant');
  }

  @Get('users/search')
  searchUsers(@Query() _q: Record<string, string>) {
    return notImplemented('GET /admin/users/search');
  }

  @Delete('users/:userId')
  deleteUser(@Param('userId') _userId: string) {
    return notImplemented('DELETE /admin/users/:userId');
  }

  @Get('kie-photo-prices')
  photoPrices() {
    return notImplemented('GET /admin/kie-photo-prices');
  }

  @Put('kie-photo-prices')
  putPhotoPrices(@Body() _body: unknown) {
    return notImplemented('PUT /admin/kie-photo-prices');
  }

  @Get('kie-video-prices')
  videoPrices() {
    return notImplemented('GET /admin/kie-video-prices');
  }

  @Put('kie-video-prices')
  putVideoPrices(@Body() _body: unknown) {
    return notImplemented('PUT /admin/kie-video-prices');
  }

  @Get('models')
  models() {
    return notImplemented('GET /admin/models');
  }

  @Put('models/:id')
  putModel(@Param('id') _id: string, @Body() _body: unknown) {
    return notImplemented('PUT /admin/models/:id');
  }

  @Patch('models/:id/active')
  patchModelActive(@Param('id') _id: string, @Body() _body: unknown) {
    return notImplemented('PATCH /admin/models/:id/active');
  }

  @Get('publish-bans')
  publishBans() {
    return notImplemented('GET /admin/publish-bans');
  }

  @Post('feed/remove')
  feedRemove(@Body() _body: unknown) {
    return notImplemented('POST /admin/feed/remove');
  }

  @Post('publish-bans/restore')
  bansRestore(@Body() _body: unknown) {
    return notImplemented('POST /admin/publish-bans/restore');
  }

  @Post('publish-bans/dismiss')
  bansDismiss(@Body() _body: unknown) {
    return notImplemented('POST /admin/publish-bans/dismiss');
  }

  @Post('banners/:slot')
  upsertBanner(@Param('slot') _slot: string, @Body() _body: unknown) {
    return notImplemented('POST /admin/banners/:slot');
  }

  @Delete('banners/:slot')
  deleteBanner(@Param('slot') _slot: string) {
    return notImplemented('DELETE /admin/banners/:slot');
  }

  @Get('partner/applications')
  partnerApplications() {
    return notImplemented('GET /admin/partner/applications');
  }

  @Post('partner/applications/:id/approve')
  approveApplication(@Param('id') _id: string) {
    return notImplemented('POST /admin/partner/applications/:id/approve');
  }

  @Post('partner/applications/:id/reject')
  rejectApplication(@Param('id') _id: string) {
    return notImplemented('POST /admin/partner/applications/:id/reject');
  }

  @Get('partner/list')
  partnerList() {
    return notImplemented('GET /admin/partner/list');
  }

  @Get('partner/payouts')
  partnerPayouts() {
    return notImplemented('GET /admin/partner/payouts');
  }

  @Get('partner/:id')
  partnerDetail(@Param('id') _id: string) {
    return notImplemented('GET /admin/partner/:id');
  }

  @Post('partner/:id/sub-partners')
  addSubPartner(@Param('id') _id: string, @Body() _body: unknown) {
    return notImplemented('POST /admin/partner/:id/sub-partners');
  }

  @Delete('partner/:id/sub-partners/:childId')
  removeSubPartner(@Param('id') _id: string, @Param('childId') _childId: string) {
    return notImplemented('DELETE /admin/partner/:id/sub-partners/:childId');
  }

  @Patch('partner/:id')
  patchPartner(@Param('id') _id: string, @Body() _body: unknown) {
    return notImplemented('PATCH /admin/partner/:id');
  }

  @Post('partner/payouts/:id/process')
  processPayout(@Param('id') _id: string, @Body() _body: unknown) {
    return notImplemented('POST /admin/partner/payouts/:id/process');
  }
}
