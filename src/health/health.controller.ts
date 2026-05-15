import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';

@ApiTags('health')
@Controller()
export class HealthController {
  @SkipThrottle()
  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  health() {
    return { ok: true };
  }
}
