import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BEARER_SCHEME } from '../../swagger/constants';
import { JwtAuthGuard } from '../../lib/auth/guards/jwt-auth.guard';
import { CurrentUserId } from '../../lib/decorators/current-user-id.decorator';
import { UserService } from '../services/user.service';
import { SupportService } from '../services/support.service';
import { notImplemented } from '../../lib/common/not-implemented.util';

@ApiTags('me')
@ApiBearerAuth(BEARER_SCHEME)
@Controller()
@UseGuards(JwtAuthGuard)
export class MeController {
  constructor(
    private readonly userService: UserService,
    private readonly supportService: SupportService,
  ) {}

  @Get('me')
  @ApiOperation({ summary: 'Текущий профиль' })
  async getMe(@CurrentUserId() userId: string) {
    const out = await this.userService.getMe(userId);
    if (!out) {
      throw new UnauthorizedException({
        error: 'Сессия недействительна. Войдите снова.',
      });
    }
    return out;
  }

  @Get('me/generations-log')
  getGenerationsLog(
    @CurrentUserId() userId: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.userService.getGenerationsLog(userId, limit, offset);
  }

  @Post('me/avatar')
  uploadAvatar() {
    return notImplemented('POST /me/avatar');
  }

  @Patch('me/profile')
  updateProfile() {
    return this.userService.updateProfile();
  }

  @Post('me/generations')
  createGeneration() {
    return notImplemented('POST /me/generations');
  }

  @Delete('me/public-generations/:id')
  deletePublicGeneration() {
    return notImplemented('DELETE /me/public-generations/:id');
  }

  @Patch('me/generations/:id/public')
  patchGenerationPublic() {
    return notImplemented('PATCH /me/generations/:id/public');
  }

  @Delete('me/generations/:id')
  deleteGeneration() {
    return notImplemented('DELETE /me/generations/:id');
  }

  @Patch('me/tag')
  updateTag() {
    return this.userService.updateTag();
  }

  @Post('me/wallet/topup')
  walletTopup() {
    return notImplemented('POST /me/wallet/topup');
  }

  @Post('me/wallet/promo')
  walletPromo() {
    return notImplemented('POST /me/wallet/promo');
  }

  @Post('me/wallet/roulette')
  walletRoulette() {
    return notImplemented('POST /me/wallet/roulette');
  }

  @Post('me/public-portfolio')
  addPortfolio() {
    return notImplemented('POST /me/public-portfolio');
  }

  @Delete('me/public-portfolio/:id')
  deletePortfolio(@Param('id') _id: string) {
    return notImplemented('DELETE /me/public-portfolio/:id');
  }

  @Get('me/support/unread')
  @ApiOperation({ summary: 'Кол-во непрочитанных сообщений поддержки' })
  async supportUnread(@CurrentUserId() userId: string) {
    const unread = await this.supportService.countUnreadSupportForUser(userId);
    return { unread };
  }

  @Get('me/support/messages')
  @ApiOperation({ summary: 'История сообщений поддержки (маркирует как прочитанные)' })
  async supportMessages(@CurrentUserId() userId: string) {
    const messages = await this.supportService.listUserSupportMessages(userId);
    await this.supportService.markSupportReadByUser(userId);
    return { messages, unread: 0 };
  }

  @Post('me/support/typing')
  supportTypingPost() {
    return notImplemented('POST /me/support/typing');
  }

  @Get('me/support/typing')
  supportTypingGet() {
    return notImplemented('GET /me/support/typing');
  }

  @Post('me/support/messages')
  supportMessagesPost() {
    return notImplemented('POST /me/support/messages');
  }

  @Post('me/generations/reject')
  rejectGeneration() {
    return notImplemented('POST /me/generations/reject');
  }

  @Get('me/public-feed')
  myPublicFeed() {
    return notImplemented('GET /me/public-feed');
  }

  @Post('me/public-feed/:id/like')
  likeMyFeed(@Param('id') _id: string) {
    return notImplemented('POST /me/public-feed/:id/like');
  }

  @Post('me/public-feed/:id/unlike')
  unlikeMyFeed(@Param('id') _id: string) {
    return notImplemented('POST /me/public-feed/:id/unlike');
  }

  @Get('me/chats')
  listChats() {
    return notImplemented('GET /me/chats');
  }

  @Post('me/chats')
  createChat() {
    return notImplemented('POST /me/chats');
  }

  @Delete('me/chats/:chatId')
  deleteChat(@Param('chatId') _chatId: string) {
    return notImplemented('DELETE /me/chats/:chatId');
  }

  @Patch('me/chats/:chatId')
  patchChat(@Param('chatId') _chatId: string) {
    return notImplemented('PATCH /me/chats/:chatId');
  }

  @Get('me/chats/:chatId/messages')
  chatMessages(@Param('chatId') _chatId: string) {
    return notImplemented('GET /me/chats/:chatId/messages');
  }

  @Post('me/chats/paid-mode/enable')
  enablePaidMode() {
    return notImplemented('POST /me/chats/paid-mode/enable');
  }

  @Post('me/chats/:chatId/messages')
  postChatMessage(@Param('chatId') _chatId: string) {
    return notImplemented('POST /me/chats/:chatId/messages');
  }
}
