import Link from 'next/link';
import { useUser } from '../context/user';

const Nav = () => {
  const { user } = useUser();

  return (
    <nav className='px-8 py-4 border-b-2 border-gray-200' aria-label='Main Navigation'>
      <div className="container mx-auto">
        <div className="flex">
          <Link href={user ? '/logout' : '/login'}>
            <a className='ml-auto'>{user ? 'Logout' : 'Login'}</a>
          </Link>
        </div>
      </div>
    </nav>
  )
};

export default Nav;
