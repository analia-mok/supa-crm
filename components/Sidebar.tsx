import Link from 'next/link';
import { useUser } from '../context/user';
import { CreditCardIcon, HomeIcon, OfficeBuildingIcon } from '@heroicons/react/solid';

const Sidebar = () => {
  const { user } = useUser();

  return (
    <nav className="w-52 max-w-xs bg-gray-100 p-6 pt-16" aria-label="Side Navigation">
      <ul>
        <li className="mb-1">
          <Link href="/">
            <a className="inline-flex content-center items-center text-slate-700">
              <HomeIcon className="mr-2 h-5 w-5 text-slate-500" />
              Home
            </a>
          </Link>
        </li>
        <li className="mb-1">
          <Link href="/pricing">
            <a className="inline-flex content-center items-center text-slate-700">
              <CreditCardIcon className="mr-2 h-5 w-5 text-slate-500" />
              Pricing
            </a>
          </Link>
        </li>
        {user && (
          <li>
            <Link href="/organizations">
              <a className="inline-flex content-center items-center text-slate-700">
                <OfficeBuildingIcon className="mr-2 h-5 w-5 text-slate-500" /> Organizations
              </a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
