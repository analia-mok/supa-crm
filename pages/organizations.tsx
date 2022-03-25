import { Organization } from '../lib/types';
import { supabase } from '../utils/supabase';
import Link from 'next/link';
import OrganizationClient from '../lib/organizationClient';
import { GetServerSideProps } from 'next';

interface OrganizationsProps {
  organizations: Organization[];
  totalPages?: number;
}

export default function Organizations(props: OrganizationsProps) {
  const { organizations, totalPages } = props;

  const pagination: number[] = [];
  const maximum = totalPages || 0;

  for (let i = 0; i < maximum; i++) {
    pagination.push(i);
  }

  // @todo create dedicated table component.
  // @todo Create a modal component for create content.
  // @todo Create a modal component to verify deletion.
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

      {totalPages && (
        <ul className="mt-8 flex">
          {pagination.map((e) => (
            <li key={`page_${e}`}>
              <Link href={`/organizations?page=${e + 1}`}>
                <a className="rounded-md border border-slate-300 py-2 px-4">{e + 1}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res, query } = context;
  const user = await supabase.auth.api.getUserByCookie(req, res);

  if (!user.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  let pageNumber = 1;

  // TODO: Research how to make pagination not require full page refreshes.
  if (query.page) {
    pageNumber = parseInt(query.page);
  }

  const { data: organizations, totalRows } = await new OrganizationClient().get(
    '*',
    pageNumber - 1,
    5
  );

  const totalPages = totalRows ? Math.ceil(totalRows / 5) : null;

  return {
    props: {
      organizations,
      totalPages,
    },
  };
};
