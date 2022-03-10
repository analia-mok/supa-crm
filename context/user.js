import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from '../utils/supabase';
import { useRouter } from "next/router";
import axios from "axios";
import ProfileClient from "../lib/clients";

const Context = createContext();

const Provider = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(supabase.auth.user());

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user();

      if (sessionUser) {
        const profile = await (new ProfileClient).getSingle(sessionUser.id);

        setUser({
          ...sessionUser,
          ...profile
        });

        setIsLoading(false);
      }
    }

    // Grab user profile onMount & whenever auth state changes.
    getUserProfile();

    supabase.auth.onAuthStateChange(() => {
      getUserProfile();
    })
  }, []);

  // Update supabase cookie whenever the user object changes.
  useEffect(() => {
    axios.post('/api/set-supabase-cookie', {
      event: user ? 'SIGNED_IN' : 'SIGNED_OUT',
      session: supabase.auth.session()
    })
  }, [user]);

  const login = async () => {
    await supabase.auth.signIn({
      provider: 'github'
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  const exposed = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <Context.Provider value={exposed}>
      {children}
    </Context.Provider>
  )
};

export const useUser = () => useContext(Context);

export default Provider;
