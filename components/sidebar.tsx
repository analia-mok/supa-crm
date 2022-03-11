import Link from 'next/link';
import { useUser } from '../context/user';
import { CreditCardIcon, HomeIcon, OfficeBuildingIcon } from '@heroicons/react/solid';

const Sidebar = () => {
  const { user } = useUser();

  return (
    <nav className='bg-gray-100 p-6 w-52 max-w-xs pt-16' aria-label='Side Navigation'>
      <ul>
        <li className='mb-1'>
          <Link href='/'>
            <a className='inline-flex items-center content-center text-slate-700'><HomeIcon className='w-5 h-5 mr-2 text-slate-500' />Home</a>
          </Link>
        </li>
        <li className='mb-1'>
          <Link href='/pricing'>
            <a className='inline-flex items-center content-center text-slate-700'><CreditCardIcon className='w-5 h-5 mr-2 text-slate-500' />Pricing</a>
          </Link>
        </li>
        {user && (
          <li>
            <Link href='/organizations'>
              <a className='inline-flex items-center content-center text-slate-700'><OfficeBuildingIcon className='w-5 h-5 mr-2 text-slate-500' /> Organizations</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
};

export default Sidebar;
