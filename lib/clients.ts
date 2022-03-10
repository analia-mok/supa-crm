import { supabase } from "../utils/supabase";
import { Profile } from "./types";

class BaseClient {

  _table = '';

  async create(value: any) {
    const { error } = await supabase
      .from(this._table)
      .insert([value]);

    if (error) {
      console.error(error.message);
    }
  }

  async update(id: string, value: any) {
    const { error } = await supabase
      .from(this._table)
      .update(value)
      .eq('id', id);

    if (error) {
      console.error(error.message);
    }
  }

  async delete(id: string, value: any) {
    const { error } = await supabase
      .from(this._table)
      .delete(value)
      .eq('id', id);

    if (error) {
      console.error(error.message);
    }
  }

  /**
   * Retrieve a single row.
   *
   * @param id Row ID.
   * @param columns Comma-separated list of columns to retrieve.
   * @returns A row object.
   */
  async getSingle(id: string, columns = '*'): Promise<any> {
    const result = await supabase
      .from(this._table)
      .select(columns)
      .eq('id', id)
      .single();

    return result;
  }

  /**
   * Retrieve multiple rows.
   *
   * @param columns Comma-separated list of columns to retrieve.
   * @returns List of all discovered rows.
   */
  async get(columns = '*'): Promise<any> {
    // @todo refactor method to accept multiple conditions.
    const results = await supabase
      .from(this._table)
      .select(columns);

    return results;
  }

}

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
      email: profile?.email
    } as Profile;
  }

  async get(columns = '*'): Promise<Profile[]> {
    const profiles = await super.get(columns);

    return profiles;
  }

}
