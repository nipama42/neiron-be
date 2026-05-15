import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PinoLogger } from 'nestjs-pino';

type RequestWithUser = Request & { userId?: string };

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(AllExceptionsFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<RequestWithUser>();
    const res = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody =
      exception instanceof HttpException
        ? exception.getResponse()
        : { error: 'Internal server error' };

    const logContext = {
      userId: req.userId ?? null,
      method: req.method,
      url: req.originalUrl ?? req.url,
      statusCode: status,
    };

    if (status >= 500) {
      this.logger.error(
        { ...logContext, err: exception },
        `Unhandled error: ${(exception as Error)?.message ?? String(exception)}`,
      );
    } else if (status >= 400) {
      const msg =
        exception instanceof HttpException ? exception.message : String(exception);
      this.logger.warn(logContext, `Client error: ${msg}`);
    }

    res.status(status).json(responseBody);
  }
}
