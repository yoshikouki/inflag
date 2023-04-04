import { signIn, signOut, useSession } from "next-auth/react";

import { useEffect } from 'react';
import { useRouter } from "next/router";

export const useAuth = (accessibleWithoutAuth = false) => {
  const { data: session, status } = useSession();
  const { user } = session && "user" in session ? session : { user: null };

  const router = useRouter();
  useEffect(() => {
    if (!user && !accessibleWithoutAuth) {
      void router.push("/signin");
    }
  }, [accessibleWithoutAuth, router, user]);

  return {
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    login: signIn,
    logout: signOut,
    user,
  };
};
