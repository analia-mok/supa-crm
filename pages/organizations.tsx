import { Organization } from '../lib/types';
import { supabase } from '../utils/supabase';
import Link from 'next/link';
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs';
import OrganizationClient from '../lib/organizationClient';

interface OrganizationsProps {
  organizations: Organization[];
}

export default function Organizations(props: OrganizationsProps) {
  const { organizations } = props;

  // @todo research how to auth restrict pages?
  // @todo create dedicated table component.
  // @todo Create a modal component for create content.
  // @todo Create a modal component to verify deletion.
  // @todo Switch to useSWR instead of static props?
  return (
    <section>
      <section className="mb-8">
        <Link href="/organization/create">
          <a className="inline-block rounded-md bg-indigo-600 py-2 px-4 text-white text-opacity-95">
            Add Organization
          </a>
        </Link>
      </section>

      <div className="overflow-hidden rounded-xl border border-slate-300">
        <table className="w-full table-auto border-collapse text-slate-900">
          <thead>
            <th className="bg-slate-100 px-6 py-2 text-left">Name</th>
            <th className="bg-slate-100 px-6 py-2 text-left">Contact</th>
            <th className="bg-slate-100 px-6 py-2 text-left">Location</th>
            <th className="bg-slate-100 px-6 py-2 text-left"></th>
          </thead>
          <tbody>
            {organizations.map((org) => (
              <tr key={org.id}>
                <td className="border-t border-slate-300 px-6 py-3">{org.name}</td>
                <td className="border-t border-slate-300 px-6 py-3">{org.email}</td>
                <td className="border-t border-slate-300 px-6 py-3">
                  {org.city}
                  {org.city && org.state && ', '}
                  {org.state}
                </td>
                <td className="border-t border-slate-300 px-6 py-3">
                  <Link key={org.id} href={`/organization/${org.id}`}>
                    <a className="text-indigo-600 hover:underline">Edit</a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// @todo Research methods to auth protect this page.
// export const getServerSideProps = withAuthRequired({ redirectTo: '/' });

export const getStaticProps = async () => {
  const organizations = await new OrganizationClient().get();

  return {
    props: {
      organizations,
    },
  };
};
