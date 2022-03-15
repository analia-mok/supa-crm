import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import { GetStaticProps } from 'next';
import { Organization } from '../../lib/types';
import { ParsedUrlQuery } from 'querystring';
import { supabase } from '../../utils/supabase';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import OrganizationForm from '../../components/forms/OrganizationForm';
import OrganizationClient from '../../lib/organizationClient';
import { useRouter } from 'next/router';

interface OrganizationDetailsProps {
  organization: Organization;
}

const OrganizationDetails = (props: OrganizationDetailsProps) => {
  const { organization } = props;
  const router = useRouter();
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const update = async (event: FormEvent) => {
    event.preventDefault();

    setError('');
    setResult('');

    const formData = new FormData(event.target as HTMLFormElement);
    const updatedOrganization: { [key: string]: any } = {};

    for (var pair of formData.entries()) {
      const column: string = pair[0];
      updatedOrganization[column] = pair[1];
    }

    const { error } = await new OrganizationClient().update(organization.id, updatedOrganization);

    if (error) {
      setError(error.message);
    } else {
      setResult('Successfully updated!');
    }

    return true;
  };

  const deleteOrg = async (event: FormEvent) => {
    event.preventDefault();

    setError('');
    setResult('');

    const { error } = await new OrganizationClient().delete(organization.id);

    if (error) {
      setError(error.message);
    } else {
      // @todo add support for toast notifications in redirect page.
      setResult('Successfully deleted!');
      console.log('Successfully deleted!');
      router.push('/organizations');
    }
  };

  return (
    <div className="max-w-5xl">
      <section className="mb-8">
        <Link href="/organizations">
          <a className="inline-flex content-center items-center text-slate-800 transition-colors duration-100 hover:text-slate-600 hover:underline">
            <ArrowNarrowLeftIcon className="mr-2 h-5 w-5 text-slate-800" /> Back to Organizations
          </a>
        </Link>
      </section>
      <article className="pb-8">
        {error && (
          <p className="mb-8 max-w-lg rounded-md bg-rose-200 px-4 py-2 text-rose-800">{error}</p>
        )}
        {result && (
          <p className="mb-8 max-w-lg rounded-md bg-green-200 px-4 py-2 text-green-800">{result}</p>
        )}
        <h1 className="mb-4 text-3xl font-bold">{organization.name}</h1>
        <OrganizationForm submitCallback={update} organization={organization}>
          {/* @todo Add a delete confirmation modal */}
          {/* @todo Add disabled state */}
          <button
            className="
              inline-block rounded-md border border-slate-700 py-2 px-4 text-slate-700
              transition-colors duration-300
              hover:bg-slate-700 hover:text-slate-100
              focus:bg-slate-700 focus:text-slate-100"
            onClick={deleteOrg}
          >
            Delete
          </button>
        </OrganizationForm>
      </article>
    </div>
  );
};

export const getStaticPaths = async () => {
  const { data: organizations } = await supabase.from('organization').select('id');

  const paths = organizations?.map(({ id }) => {
    return {
      params: {
        id: id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

interface OrganizationDetailParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as OrganizationDetailParams;
  const organization = await new OrganizationClient().getSingle(id);

  return {
    props: {
      organization,
    },
  };
};

export default OrganizationDetails;
