import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import { FormEvent } from "react";
import Link from "next/link";

export default function CreateOrganization() {
  const create = async (event: FormEvent) => {
    event.preventDefault();

    // TODO: Implement handler to create organization in supabase.
    // TODO: Implement success & error states.
    return true;
  }

  return (
    <div>
      <section className='mb-8'>
        <Link href="/organizations">
          <a className='inline-flex text-slate-800 items-center content-center hover:underline hover:text-slate-600 transition-colors duration-100'><ArrowNarrowLeftIcon className='w-5 h-5 text-slate-800 mr-2'/> Back to Organizations</a>
        </Link>
      </section>
      <section className="max-w-5xl">
        <form onSubmit={create} className="max-w-lg">
          <div className="flex flex-wrap md:flex-nowrap mb-6">
            <label htmlFor="name" className="block w-full">
              <span>Company Name <abbr title="required" className="text-purple-600 font-semibold">*</abbr></span>
              <input type="text"
                name="name"
                className="block w-full rounded-md mt-2 border-slate-300 shadow-sm focus:ring-purple-600"
                required
                autoComplete="false"
              />
            </label>
          </div>
          <div className="flex flex-wrap md:flex-nowrap mb-6 gap-6">
            <label htmlFor="email" className="flex-1">
              <span>Email <abbr title="required" className="text-purple-600 font-semibold">*</abbr></span>
              <input type="email"
                name="email"
                className="block w-full rounded-md mt-2 border-slate-300 shadow-sm focus:ring-purple-600 placeholder-slate-400"
                placeholder="johndoe@email.com"
                required
              />
            </label>
            <label htmlFor="phone" className="flex-1">
              <span>Phone Number</span>
              <input type="tel"
                name="phone"
                className="block w-full rounded-md mt-2 border-slate-300 shadow-sm focus:ring-purple-600 placeholder-slate-400"
                placeholder="###-###-####"
              />
            </label>
          </div>
          <div className="flex flex-wrap md:flex-nowrap mb-6">
            <label htmlFor="address1" className="flex-1">
              <span>Address Line 1</span>
              <input type="text"
                name="address1"
                className="block w-full rounded-md mt-2 border-slate-300 shadow-sm focus:ring-purple-600"
              />
            </label>
          </div>
          <div className="flex flex-wrap md:flex-nowrap mb-6">
            <label htmlFor="address2" className="flex-1">
              <span>Address Line 2</span>
              <input type="text"
                name="address2"
                className="block w-full rounded-md mt-2 border-slate-300 shadow-sm focus:ring-purple-600"
              />
            </label>
          </div>
          <div className="flex flex-wrap md:flex-nowrap mb-6 gap-6">
            <label htmlFor="city" className="w-1/2">
              <span>City</span>
              <input type="text"
                name="city"
                className="block w-full rounded-md mt-2 border-slate-300 shadow-sm focus:ring-purple-600"
              />
            </label>
            {/* TODO: Lookup more general name? Locality? Administrative Area? */}
            {/* TODO: Switch to a dropdown */}
            <label htmlFor="state" className="w-1/2">
              <span>State/Province</span>
              <input type="text"
                name="state"
                className="block w-full rounded-md mt-2 border-slate-300 shadow-sm focus:ring-purple-600"
              />
            </label>
          </div>
          <div className="flex flex-wrap md:flex-nowrap gap-6">
            <label htmlFor="postal_code" className="w-1/2">
              <span>Postal Code</span>
              <input type="text"
                name="postal_code"
                className="block w-full rounded-md mt-2 border-slate-300 shadow-sm focus:ring-purple-600"
              />
            </label>
            <div className="w-1/2" aria-hidden></div>
          </div>
          <div className="mt-8">
            <button type="submit" className="inline-block bg-indigo-600 text-white text-opacity-95 py-2 px-4 rounded-md">Create</button>
          </div>
        </form>
      </section>
    </div>
  )
};
