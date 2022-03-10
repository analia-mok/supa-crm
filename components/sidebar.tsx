import Link from 'next/link';
import { useUser } from '../context/user';

const Sidebar = () => {
  const { user } = useUser();

  return (
    <nav className='bg-gray-100 p-6 w-52 max-w-xs' aria-label='Side Navigation'>
      <ul>
        <li>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href='/pricing'>
            <a>Pricing</a>
          </Link>
        </li>
        {user && (
          <li>
            <Link href='/organizations'>
              <a>Organizations</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
};

export default Sidebar;
