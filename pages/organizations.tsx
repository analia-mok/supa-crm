import { Organization } from "../lib/types";
import { supabase } from "../utils/supabase";
import Link from "next/link";

interface OrganizationsProps {
  organizations: Organization[]
}

export default function Organizations (props: OrganizationsProps) {
  const { organizations } = props;

  // @todo research how to auth restrict pages?
  // @todo create dedicated table component.
  // @todo Create a modal component for create content.
  // @todo Create a modal component to verify deletion.
  return (
    <section>
      <section className="mb-8">
        <Link href='/organization/create'>
          <a className="inline-block bg-indigo-600 text-white text-opacity-95 py-2 px-4 rounded-md">Add Organization</a>
        </Link>
      </section>

      <div className="rounded-xl overflow-hidden border border-slate-300">
        <table className="w-full border-collapse text-slate-900 table-auto">
          <thead>
            <th className="text-left bg-slate-100 px-6 py-2">Name</th>
            <th className="text-left bg-slate-100 px-6 py-2">Contact</th>
            <th className="text-left bg-slate-100 px-6 py-2">Location</th>
            <th className="text-left bg-slate-100 px-6 py-2"></th>
          </thead>
          <tbody>
            {organizations.map(org => (
              <tr key={org.id}>
                <td className="border-t border-slate-300 px-6 py-3">{org.name}</td>
                <td className="border-t border-slate-300 px-6 py-3">{org.email}</td>
                <td className="border-t border-slate-300 px-6 py-3">{org.city}, {org.state}</td>
                <td className="border-t border-slate-300 px-6 py-3">
                  <Link key={org.id} href={`/organization/${org.id}`}>
                    <a className='hover:underline text-indigo-600'>Edit</a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </section>
  )
};

export const getStaticProps = async () => {
  const { data: organizations } = await supabase.from('organization').select('*');

  return {
    props: {
      organizations
    }
  };
}
