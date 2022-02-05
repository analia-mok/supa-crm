import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import Video from 'react-player';

const OrganizationDetails = ({ organization }) => {
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
  }, []);

  return (
    <article className='container mx-auto max-w-5xl px-8 py-12'>
      <h1 className='text-3xl mb-8'>{organization.name}</h1>
      <p>{organization.address1}</p>
      {!!videoUrl && <Video url={videoUrl} width="100%" />}
    </article>
  );
};

export const getStaticPaths = async () => {
  const { data: organizations } = await supabase.from('organization').select('id');

  const paths = organizations.map(({ id }) => {
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

export const getStaticProps = async ({ params: { id } }) => {
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
