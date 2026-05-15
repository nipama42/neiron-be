import { Injectable } from '@nestjs/common';
import { UserInternalService } from './user.internal.service';
import { toProfileDto } from '../../lib/user/user.mapper';
import { notImplemented } from '../../lib/common/not-implemented.util';

@Injectable()
export class UserService {
  constructor(private readonly users: UserInternalService) {}

  async getMe(userId: string) {
    const user = await this.users.findById(userId);
    if (!user) return null;
    return { user: await toProfileDto(user) };
  }

  getGenerationsLog(_userId: string, _limit?: unknown, _offset?: unknown) {
    return notImplemented('GET /me/generations-log');
  }

  updateProfile() {
    return notImplemented('PATCH /me/profile');
  }

  updateTag() {
    return notImplemented('PATCH /me/tag');
  }
}
