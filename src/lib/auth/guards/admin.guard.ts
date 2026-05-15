import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { User } from '../../user/models/user.model';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(@InjectModel(User) private readonly users: typeof User) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request & { userId?: string }>();
    const userId = req.userId;
    if (!userId) {
      throw new ForbiddenException({ error: 'Forbidden' });
    }
    const row = await this.users.findByPk(userId, { attributes: ['is_admin'] });
    if (!row?.is_admin) {
      throw new ForbiddenException({ error: 'Forbidden' });
    }
    return true;
  }
}
