import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../utils/supabase';

export default function CreateOrganization() {
  const [error, setError] = useState();
  const [result, setResult] = useState('');

  // TODO: Auth protect page.
  const create = async (event: FormEvent) => {
    event.preventDefault();

    setError(null);
    setResult('');

    // TODO: Implement handler to create organization in supabase.
    const formData = new FormData(event.target as HTMLFormElement);
    const organization: { [key: string]: any } = {};

    for (var pair of formData.entries()) {
      const column: string = pair[0];
      organization[column] = pair[1];
    }

    const { data, error } = await supabase.from('organization').insert(organization);

    if (error) {
      setError(error.message);
    } else {
      setResult('Success!');
    }

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
        <form onSubmit={create} className="max-w-lg">
          <div className="mb-6 flex flex-wrap md:flex-nowrap">
            <label htmlFor="name" className="block w-full">
              <span>
                Company Name{' '}
                <abbr title="required" className="font-semibold text-purple-600">
                  *
                </abbr>
              </span>
              <input
                type="text"
                name="name"
                className="mt-2 block w-full rounded-md border-slate-300 shadow-sm focus:ring-purple-600"
                required
                autoComplete="false"
              />
            </label>
          </div>
          <div className="mb-6 flex flex-wrap gap-6 md:flex-nowrap">
            <label htmlFor="email" className="flex-1">
              <span>
                Email{' '}
                <abbr title="required" className="font-semibold text-purple-600">
                  *
                </abbr>
              </span>
              <input
                type="email"
                name="email"
                className="mt-2 block w-full rounded-md border-slate-300 placeholder-slate-400 shadow-sm focus:ring-purple-600"
                placeholder="johndoe@email.com"
                required
              />
            </label>
            <label htmlFor="phone" className="flex-1">
              <span>Phone Number</span>
              <input
                type="tel"
                name="phone"
                className="mt-2 block w-full rounded-md border-slate-300 placeholder-slate-400 shadow-sm focus:ring-purple-600"
                placeholder="###-###-####"
              />
            </label>
          </div>
          <div className="mb-6 flex flex-wrap md:flex-nowrap">
            <label htmlFor="address1" className="flex-1">
              <span>Address Line 1</span>
              <input
                type="text"
                name="address1"
                className="mt-2 block w-full rounded-md border-slate-300 shadow-sm focus:ring-purple-600"
              />
            </label>
          </div>
          <div className="mb-6 flex flex-wrap md:flex-nowrap">
            <label htmlFor="address2" className="flex-1">
              <span>Address Line 2</span>
              <input
                type="text"
                name="address2"
                className="mt-2 block w-full rounded-md border-slate-300 shadow-sm focus:ring-purple-600"
              />
            </label>
          </div>
          <div className="mb-6 flex flex-wrap gap-6 md:flex-nowrap">
            <label htmlFor="city" className="w-1/2">
              <span>City</span>
              <input
                type="text"
                name="city"
                className="mt-2 block w-full rounded-md border-slate-300 shadow-sm focus:ring-purple-600"
              />
            </label>
            {/* TODO: Lookup more general name? Locality? Administrative Area? */}
            {/* TODO: Switch to a dropdown */}
            <label htmlFor="state" className="w-1/2">
              <span>State/Province</span>
              <input
                type="text"
                name="state"
                className="mt-2 block w-full rounded-md border-slate-300 shadow-sm focus:ring-purple-600"
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-6 md:flex-nowrap">
            <label htmlFor="postal_code" className="w-1/2">
              <span>Postal Code</span>
              <input
                type="text"
                name="postal_code"
                className="mt-2 block w-full rounded-md border-slate-300 shadow-sm focus:ring-purple-600"
              />
            </label>
            <div className="w-1/2" aria-hidden></div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="inline-block rounded-md bg-indigo-600 py-2 px-4 text-white text-opacity-95"
            >
              Create
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
