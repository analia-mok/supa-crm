import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import { GetStaticProps } from 'next';
import { Organization } from '../../lib/types';
import { ParsedUrlQuery } from 'querystring';
import { supabase } from '../../utils/supabase';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import OrganizationForm from '../../components/forms/OrganizationForm';

interface OrganizationDetailsProps {
  organization: Organization;
}

const OrganizationDetails = (props: OrganizationDetailsProps) => {
  const { organization } = props;
  const [error, setError] = useState();
  const [result, setResult] = useState('');

  const update = async (event: FormEvent) => {
    event.preventDefault();

    setError(null);
    setResult('');

    const formData = new FormData(event.target as HTMLFormElement);
    const updatedOrganization: { [key: string]: any } = {};

    for (var pair of formData.entries()) {
      const column: string = pair[0];
      updatedOrganization[column] = pair[1];
    }

    const { data, error } = await supabase
      .from('organization')
      .update(updatedOrganization)
      .eq('id', `${organization.id}`);

    if (error) {
      setError(error.message);
    } else {
      setResult('Successfully updated!');
    }

    return true;
  };

  // const [videoUrl, setVideoUrl] = useState();

  // // @todo replace with actual CRM features.
  // // Done for the sake of tutorial.
  // const getPremiumContent = async () => {
  //   const { data } = await supabase
  //     .from('premium_content')
  //     .select('video')
  //     .eq('id', organization.id)
  //     .single();

  //   setVideoUrl(data?.video);
  // };

  // useEffect(() => {
  //   getPremiumContent();
  // });

  return (
    <div className="max-w-5xl">
      <section className="mb-8">
        <Link href="/organizations">
          <a className="inline-flex content-center items-center text-slate-800 transition-colors duration-100 hover:text-slate-600 hover:underline">
            <ArrowNarrowLeftIcon className="mr-2 h-5 w-5 text-slate-800" /> Back to Organizations
          </a>
        </Link>
      </section>
      <article>
        {error && (
          <p className="mb-8 max-w-lg rounded-md bg-rose-200 px-4 py-2 text-rose-800">{error}</p>
        )}
        {result && (
          <p className="mb-8 max-w-lg rounded-md bg-green-200 px-4 py-2 text-green-800">{result}</p>
        )}
        <h1 className="mb-4 text-3xl font-bold">{organization.name}</h1>
        <OrganizationForm submitCallback={update} organization={organization} />
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
  const { data: organization } = await supabase
    .from('organization')
    .select('*')
    .eq('id', id)
    .single();

  return {
    props: {
      organization,
    },
  };
};

export default OrganizationDetails;
