import BaseClient from './baseClient';
import { Organization } from './types';

export interface OrganizationResponse {
  data: Organization[];
  totalRows: number;
}

export default class OrganizationClient extends BaseClient {
  _table = 'organization';

  async update(id: string, organization: Partial<Organization>) {
    return await super.update(id, organization);
  }

  async getSingle(id: string, columns = '*'): Promise<Organization> {
    const { data: organization } = await super.getSingle(id, columns);

    return {
      id: organization?.id,
      name: organization.name,
      email: organization?.email,
      phone: organization?.phone,
      address1: organization?.address1,
      address2: organization?.address2,
      city: organization?.city,
      state: organization?.state,
      postal_code: organization?.postal_code,
    } as Organization;
  }

  async get(columns = '*', page = 0, limit = 10): Promise<OrganizationResponse> {
    const results = await super.get(columns, page, limit);

    return results;
  }
}
