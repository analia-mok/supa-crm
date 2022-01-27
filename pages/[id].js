import { supabase } from '../utils/supabase';

const OrganizationDetails = ({ organization }) => {
  return (
    <article className='container mx-auto max-w-5xl px-8 py-12'>
      <h1 className='text-3xl mb-8'>{organization.name}</h1>
      <p>{organization.address1}</p>
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
