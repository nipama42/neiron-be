import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { BEARER_SCHEME } from '../../swagger/constants';
import { JwtAuthGuard } from '../../lib/auth/guards/jwt-auth.guard';
import { CurrentUserId } from '../../lib/decorators/current-user-id.decorator';
import { notImplemented } from '../../lib/common/not-implemented.util';

@ApiTags('public')
@Controller()
export class PublicController {
  @Get('public/profiles/:identifier')
  getProfile(@Param('identifier') _identifier: string) {
    return notImplemented('GET /public/profiles/:identifier');
  }

  @Throttle({ default: { limit: 150, ttl: 60_000 } })
  @Get('public/feed')
  publicFeed() {
    return notImplemented('GET /public/feed');
  }

  @Get('public/generations/:id/file')
  generationFile(@Param('id') _id: string) {
    return notImplemented('GET /public/generations/:id/file');
  }

  @Throttle({ default: { limit: 150, ttl: 60_000 } })
  @Get('feed/public-generations')
  feedAlias() {
    return notImplemented('GET /feed/public-generations');
  }

  @ApiBearerAuth(BEARER_SCHEME)
  @UseGuards(JwtAuthGuard)
  @Post('public/generations/:id/like')
  like(@Param('id') _id: string, @CurrentUserId() _userId: string) {
    return notImplemented('POST /public/generations/:id/like');
  }

  @ApiBearerAuth(BEARER_SCHEME)
  @UseGuards(JwtAuthGuard)
  @Post('public/generations/:id/unlike')
  unlike(@Param('id') _id: string, @CurrentUserId() _userId: string) {
    return notImplemented('POST /public/generations/:id/unlike');
  }

  @Get('public/avatar-proxy')
  avatarProxy() {
    return notImplemented('GET /public/avatar-proxy');
  }
}
