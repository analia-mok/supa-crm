import '../styles/globals.css';
import type { AppProps } from 'next/app';
import UserProvider from '../context/user';
import Nav from '../components/nav';
import Sidebar from '../components/sidebar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className='flex-grow'>
          <Nav />
          <main className='px-10 py-8 max-w-5xl'>
            <Component {...pageProps} />
          </main>
        </div>
      </div>
    </UserProvider>
  );
}

export default MyApp
