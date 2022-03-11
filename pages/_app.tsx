import '../styles/globals.css';
import type { AppProps } from 'next/app';
import UserProvider from '../context/user';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-grow">
          <Nav />
          <main className="max-w-5xl px-10 py-8">
            <Component {...pageProps} />
          </main>
        </div>
      </div>
    </UserProvider>
  );
}

export default MyApp;
