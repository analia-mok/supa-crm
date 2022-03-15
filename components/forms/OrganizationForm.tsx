import { FormEvent } from 'react';
import { Organization } from '../../lib/types';

export interface OrganizationFormProps {
  submitCallback: (event: FormEvent) => Promise<boolean>;
  organization?: Organization;
  children?: React.ReactNode;
}

const OrganizationForm = (props: OrganizationFormProps) => {
  const { organization, children } = props;

  return (
    <form onSubmit={props.submitCallback} className="max-w-lg">
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
            defaultValue={organization?.name ?? ''}
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
            defaultValue={organization?.email ?? ''}
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
            defaultValue={organization?.phone ?? ''}
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
            defaultValue={organization?.address1 ?? ''}
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
            defaultValue={organization?.address2 ?? ''}
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
            defaultValue={organization?.city ?? ''}
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
            defaultValue={organization?.state ?? ''}
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
            defaultValue={organization?.postal_code ?? ''}
          />
        </label>
        <div className="w-1/2" aria-hidden></div>
      </div>
      <div className="mt-8 flex justify-between">
        <button
          type="submit"
          className="
            inline-block rounded-md bg-indigo-600 py-2 px-4 text-white text-opacity-95
            transition-colors duration-300
            hover:bg-indigo-100 hover:text-indigo-600
            focus:bg-indigo-100 focus:text-indigo-600"
        >
          {organization ? 'Update' : 'Create'}
        </button>
        {children}
      </div>
    </form>
  );
};

export default OrganizationForm;
