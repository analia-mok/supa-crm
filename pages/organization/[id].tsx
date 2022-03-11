import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import { GetStaticProps } from 'next';
import { Organization } from '../../lib/types';
import { ParsedUrlQuery } from 'querystring';
import { supabase } from '../../utils/supabase';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Video from 'react-player';

interface OrganizationDetailsProps {
  organization: Organization;
}

const OrganizationDetails = (props: OrganizationDetailsProps) => {
  const { organization } = props;
  const [videoUrl, setVideoUrl] = useState();

  // @todo replace with actual CRM features.
  // Done for the sake of tutorial.
  const getPremiumContent = async () => {
    const { data } = await supabase
      .from('premium_content')
      .select('video')
      .eq('id', organization.id)
      .single();

    setVideoUrl(data?.video);
  };

  useEffect(() => {
    getPremiumContent();
  });

  return (
    <div>
      <section className="mb-8">
        <Link href="/organizations">
          <a className="inline-flex content-center items-center text-slate-800 transition-colors duration-100 hover:text-slate-600 hover:underline">
            <ArrowNarrowLeftIcon className="mr-2 h-5 w-5 text-slate-800" /> Back to Organizations
          </a>
        </Link>
      </section>
      <article>
        <h1 className="mb-4 text-3xl font-bold">{organization.name}</h1>
        <p>{organization.address1}</p>
        {!!videoUrl && <Video url={videoUrl} width="100%" />}
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
