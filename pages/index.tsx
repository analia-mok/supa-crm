import { supabase } from '../utils/supabase';
import Link from 'next/link';

// TODO: Move into a types folder.
interface Organization {
  id: string,
  name: string,
  email?: string,
  phone?: string,
  address1?: string,
  address2?: string,
  city?: string,
  state?: string,
  postal_code?: string,
}

interface HomeProps {
  organizations: Organization[]
}

export default function Home(props: HomeProps) {
  const { organizations } = props;
  console.log(supabase.auth.user());

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
