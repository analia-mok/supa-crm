import { supabase } from '../utils/supabase';

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

export default function Home(props: { organizations: Organization[] }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      {props.organizations.map(org => (
        <p key={org.id}>{org.name}</p>
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
