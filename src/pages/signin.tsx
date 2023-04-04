import type { GetServerSidePropsContext } from "next";
import PublicLayout from "~/components/layout/PublicLayout";
import SignIn from "~/components/SignIn";
import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth/next";

export default function SignInPage() {
  return (
    <PublicLayout>
      <SignIn />
    </PublicLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return { redirect: { destination: "/home" } };
  }

  return { props: {} };
}
