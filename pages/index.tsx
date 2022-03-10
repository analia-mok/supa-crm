import { supabase } from '../utils/supabase';
import { useUser } from '../context/user';
import Link from 'next/link';
import { Organization } from '../lib/clients';

interface HomeProps {
  organizations: Organization[]
}

export default function Home(props: HomeProps) {
  const { organizations } = props;
  const { user } = useUser();
  console.log(user);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      {organizations.map(org => (
        <Link key={org.id} href={`/${org.id}`}>
          <a className='hover:underline'>{org.name}</a>
        </Link>
      ))}
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
