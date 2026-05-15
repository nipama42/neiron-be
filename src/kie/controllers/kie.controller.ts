import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('kie')
@Controller()
export class KieController {
  @SkipThrottle()
  @Post('api/kie/suno-callback')
  sunoCallback() {
    return { ok: true };
  }
}
