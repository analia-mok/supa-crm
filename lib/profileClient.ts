import BaseClient from './baseClient';
import { Profile } from './types';

export default class ProfileClient extends BaseClient {
  _table = 'profile';

  async update(id: string, profile: Partial<Profile>) {
    await super.update(id, profile);
  }

  async getSingle(id: string, columns = '*'): Promise<Profile> {
    const { data: profile } = await super.getSingle(id, columns);

    return {
      id: profile?.id,
      is_subscribed: profile?.is_subscribed,
      interval: profile?.interval,
      stripe_customer: profile?.stripe_customer,
      email: profile?.email,
    } as Profile;
  }

  async get(columns = '*'): Promise<Profile[]> {
    const data = await super.get(columns);

    return data;
  }
}
