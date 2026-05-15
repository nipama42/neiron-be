import { HttpException, HttpStatus } from '@nestjs/common';

export function notImplemented(feature: string): never {
  throw new HttpException(
    `${feature} is not ported yet — see server/src (Express)`,
    HttpStatus.NOT_IMPLEMENTED,
  );
}
