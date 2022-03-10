import { supabase } from '../utils/supabase';
import { useUser } from '../context/user';
import { Organization } from '../lib/types';

interface HomeProps {
  organizations: Organization[]
}

export default function Home(props: HomeProps) {
  const { user } = useUser();
  console.log(user);

  return (
    <div>
      {user && <h1>Welcome back, {user?.identities[0]?.identity_data?.full_name}!</h1>}
    </div>
  )
}

export const getStaticProps = async () => {
  const { data: organizations } = await supabase.from('organization').select('*');

  return {
    props: {
      organizations
    }
  };
}
