import { count } from 'console';
import { supabase } from '../utils/supabase';

export default class BaseClient {
  _table = '';

  async create(value: any) {
    const { error } = await supabase.from(this._table).insert([value]);

    if (error) {
      console.error(error.message);
    }
  }

  async update(id: string, value: any) {
    return await supabase.from(this._table).update(value).eq('id', id);
  }

  async delete(id: string) {
    return await supabase.from(this._table).delete().eq('id', id);
  }

  /**
   * Retrieve a single row.
   *
   * @param id Row ID.
   * @param columns Comma-separated list of columns to retrieve.
   * @returns A row object.
   */
  async getSingle(id: string, columns = '*'): Promise<any> {
    const result = await supabase.from(this._table).select(columns).eq('id', id).single();

    return result;
  }

  /**
   * Retrieve multiple rows.
   *
   * @param columns Comma-separated list of columns to retrieve.
   * @returns List of all discovered rows.
   */
  async get(columns = '*', page = 0, limit = 10): Promise<any> {
    // @todo refactor method to accept multiple conditions.

    const from = page * limit;
    const to = (page + 1) * limit - 1;

    const { count } = await supabase.from(this._table).select('id', { count: 'estimated' });
    const results = await supabase.from(this._table).select(columns).range(from, to);

    return {
      data: results.data,
      totalRows: count,
    };
  }
}
