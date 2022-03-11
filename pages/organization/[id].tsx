import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import { GetStaticProps } from 'next';
import { Organization } from '../../lib/types';
import { ParsedUrlQuery } from 'querystring';
import { supabase } from '../../utils/supabase';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Video from 'react-player';

interface OrganizationDetailsProps {
  organization: Organization
}

const OrganizationDetails = (props: OrganizationDetailsProps) => {
  const { organization } = props;
  const [videoUrl, setVideoUrl] = useState();

  // @todo replace with actual CRM features.
  // Done for the sake of tutorial.
  const getPremiumContent = async () => {
    const { data } = await supabase.from('premium_content')
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
      <section className='mb-8'>
        <Link href="/organizations">
          <a className='inline-flex text-slate-800 items-center content-center hover:underline hover:text-slate-600 transition-colors duration-100'><ArrowNarrowLeftIcon className='w-5 h-5 text-slate-800 mr-2'/> Back to Organizations</a>
        </Link>
      </section>
      <article>
        <h1 className='text-3xl mb-4 font-bold'>{organization.name}</h1>
        <p>{organization.address1}</p>
        {!!videoUrl && <Video url={videoUrl} width="100%" />}
      </article>
    </div>
  );
};

export const getStaticPaths = async () => {
  const { data: organizations } = await supabase
    .from('organization')
    .select('id');

  const paths = organizations?.map(({ id }) => {
    return {
      params: {
        id: id.toString()
      }
    };
  });

  return {
    paths,
    fallback: false
  };
};

interface OrganizationDetailParams extends ParsedUrlQuery {
  id: string
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
      organization
    }
  };
};

export default OrganizationDetails;
