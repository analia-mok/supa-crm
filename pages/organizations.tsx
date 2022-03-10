import Link from "next/link";
import { Organization } from "../lib/types";
import { supabase } from "../utils/supabase";

interface OrganizationsProps {
  organizations: Organization[]
}

export default function Organizations (props: OrganizationsProps) {
  const { organizations } = props;

  // @todo research how to auth restrict pages?
  // @todo create dedicated table component.
  return (
    <div>
      <button>Add Organization</button>

      <table>
        <thead className="border border-slate-300 border-b-0">
          <th className="text-left border-b border-slate-300 bg-slate-100 px-6 py-2">Name</th>
          <th className="text-left border-b border-slate-300 bg-slate-100 px-6 py-2">Email</th>
          <th className="text-left border-b border-slate-300 bg-slate-100 px-6 py-2">City</th>
          <th className="text-left border-b border-slate-300 bg-slate-100 px-6 py-2">State</th>
        </thead>
        <tbody className="border-l border-r border-slate-300">
          {organizations.map(org => (
            <tr>
              <td className="border-b border-slate-300 px-6 py-4">
                <Link key={org.id} href={`/${org.id}`}>
                  <a className='hover:underline text-indigo-600'>{org.name}</a>
                </Link>
              </td>
              <td className="border-b border-slate-300 px-6 py-4">{org.email}</td>
              <td className="border-b border-slate-300 px-6 py-4">{org.city}</td>
              <td className="border-b border-slate-300 px-6 py-4">{org.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
