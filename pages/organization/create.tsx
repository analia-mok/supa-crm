import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../utils/supabase';
import { withAuthRequired } from '@supabase/supabase-auth-helpers/nextjs';
import OrganizationForm from '../../components/forms/OrganizationForm';

export default function CreateOrganization() {
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const create = async (event: FormEvent) => {
    event.preventDefault();

    setError('');
    setResult('');
    setIsLoading(true);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const organization: { [key: string]: any } = {};

    for (var pair of formData.entries()) {
      const column: string = pair[0];
      organization[column] = pair[1];
    }

    const { error } = await supabase.from('organization').insert(organization);

    if (error) {
      setError(error.message);
    } else {
      form.reset();
      setResult('Success!');
    }

    setIsLoading(false);

    return true;
  };

  return (
    <div>
      <section className="mb-8">
        <Link href="/organizations">
          <a className="inline-flex content-center items-center text-slate-800 transition-colors duration-100 hover:text-slate-600 hover:underline">
            <ArrowNarrowLeftIcon className="mr-2 h-5 w-5 text-slate-800" /> Back to Organizations
          </a>
        </Link>
      </section>
      <section className="max-w-5xl">
        {error && (
          <p className="mb-8 max-w-lg rounded-md bg-rose-200 px-4 py-2 text-rose-800">{error}</p>
        )}
        {result && (
          <p className="mb-8 max-w-lg rounded-md bg-green-200 px-4 py-2 text-green-800">{result}</p>
        )}
        <OrganizationForm submitCallback={create} isLoading={isLoading} />
      </section>
    </div>
  );
}

export const getServerSideProps = withAuthRequired({ redirectTo: '/' });
