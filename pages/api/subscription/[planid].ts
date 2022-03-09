import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from "../../../utils/supabase";
import cookie from 'cookie';
import { Session } from '@supabase/supabase-js';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user || !req.headers.cookie) {
    return res.status(401).send('Unauthorized');
  }

  // Note: NextJS APIs are handled server side, not the client.
  // And the user's session token is on the client.
  // Using the cookie library to grab the current user's session
  // token to then pass row-level security on the profile table.
  const token: string = cookie.parse(req.headers.cookie)['sb:token'];
  supabase.auth.session = () => {
    const session: Session = {
      access_token: token,
      token_type: 'bearer',
      user
     };

    return session;
  };

  const { data: { stripe_customer }} = await supabase
    .from('profile')
    .select('stripe_customer')
    .eq('id', user.id)
    .single();

  res.send({
    ...user,
    stripe_customer
  });
};

export default handler;
