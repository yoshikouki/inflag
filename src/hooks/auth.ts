import { type SignInResponse, type SignOutResponse, signIn, signOut, useSession } from "next-auth/react";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const { user } = session && 'user' in session ? session : {  user: null }
  const login = async () => await signIn()
  const logout = async () => await signOut();

  return {
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    login,
    logout,
    user,
  };
};
