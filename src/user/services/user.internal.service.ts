import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { User } from '../../lib/user/models/user.model';
import { hydrateUserDates, userFromModel } from '../../lib/user/user.mapper';

@Injectable()
export class UserInternalService {
  constructor(@InjectModel(User) private readonly users: typeof User) {}

  async findById(id: string) {
    const row = await this.users.findByPk(id);
    return hydrateUserDates(userFromModel(row));
  }

  async findByEmail(email: string) {
    const normalized = String(email).trim().toLowerCase();
    const row = await this.users.findOne({
      where: { email: { [Op.iLike]: normalized } },
    });
    return hydrateUserDates(userFromModel(row));
  }

  async findByLogin(login: string) {
    const row = await this.users.findOne({
      where: { login: String(login).trim() },
    });
    return hydrateUserDates(userFromModel(row));
  }

  async verifyEmailPassword(
    user: NonNullable<Awaited<ReturnType<typeof this.findById>>>,
    password: string,
  ): Promise<boolean> {
    const bcrypt = await import('bcryptjs');
    const hash = user.passwordHash;
    if (!hash) return false;
    return bcrypt.compare(String(password), hash);
  }
}
