import { signIn, signOut, useSession } from "next-auth/react";

import { useEffect } from 'react';
import { useRouter } from "next/router";

export const useAuth = (accessibleWithoutAuth = false) => {
  const { data: session, status } = useSession();
  const { user } = session && "user" in session ? session : { user: null };
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated && !accessibleWithoutAuth && !isLoading) {
      void router.push("/signin");
    }
  }, [accessibleWithoutAuth, isAuthenticated, isLoading, router]);

  return {
    isAuthenticated,
    isLoading,
    login: signIn,
    logout: signOut,
    user,
  };
};
