import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AccountLink } from './link.entity';

@Injectable()
export class IdentityService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    @InjectRepository(AccountLink) private links: Repository<AccountLink>,
  ) {}

  async upsertUserByEmailOrPhone(payload: { email?: string; phone?: string; role?: User['role']; profile?: Record<string, any> }) {
    const { email, phone } = payload;
    let user = await this.users.findOne({ where: [{ email }, { phone }] });
    if (!user) {
      user = this.users.create({ ...payload });
    } else {
      Object.assign(user, payload);
    }
    return this.users.save(user);
  }

  async linkProvider(userId: string, provider: string, providerId: string, meta: Record<string, any> = {}) {
    const link = this.links.create({ user: { id: userId } as any, provider, providerId, meta });
    return this.links.save(link);
  }

  async getUser(id: string) {
    return this.users.findOne({ where: { id } });
  }
}
