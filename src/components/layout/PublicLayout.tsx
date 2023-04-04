import Head from "next/head";
import HeaderNavigation from "./HeaderNavigation";
import { type ReactNode } from "react";

interface Props {
  pageTitle?: string;
  children?: ReactNode;
}

const PublicLayout = ({ pageTitle, children }: Props) => {
  const baseTitle = "InflaG";
  return (
    <>
      <Head>
        <title>{pageTitle ? `${pageTitle} - ${baseTitle}` : baseTitle}</title>
        <meta name="description" content="InflaG is Open Source game." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderNavigation accessibleWithoutAuth />

      <main className="mx-auto mb-40 mt-12">{children}</main>
    </>
  );
};

export default PublicLayout;
