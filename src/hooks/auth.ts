import { signIn, signOut, useSession } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const { user } = session && "user" in session ? session : { user: null };

  return {
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    login: signIn,
    logout: signOut,
    user,
  };
};
