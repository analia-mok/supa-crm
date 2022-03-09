import { supabase } from "../../utils/supabase";

export interface Profile {
  id: string,
  is_subscribed: boolean,
  interval?: string,
  stripe_customer?: string,
  email: string
}

export interface ProfileUpdateData {
  is_subscribed?: boolean,
  interval?: string,
  stripe_customer?: string,
  email?: string
}

export default class ProfileClient {

  public static table = 'profile';

  static async update(id: string, profile: ProfileUpdateData) {
    await supabase.from('profile')
      .update(profile)
      .eq('id', id);
  }

  static async getSingle(id: string, columns = '*'): Promise<Profile> {
    const { data: profile } = await supabase
      .from(this.table)
      .select(columns)
      .eq('id', id)
      .single();

    const data = {
      id: profile?.id,
      is_subscribed: profile?.is_subscribed,
      interval: profile?.interval,
      stripe_customer: profile?.stripe_customer,
      email: profile?.email
    } as Profile;

    return data;
  }

  static async get(id: string, columns = '*') {
    // Will not be typed.
    // Don't want to re-iterate over all found profiles
    // in order to map to the Profile model.
    const profiles = await supabase
      .from(this.table)
      .select(columns)
      .eq('id', id);

    return profiles;
  }


}
