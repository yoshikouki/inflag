import Head from "next/head";
import HeaderNavigation from "./HeaderNavigation";
import MainNavigation from "./MainNavigation";
import { type ReactNode } from "react";

interface Props {
  pageTitle?: string;
  children?: ReactNode;
}

const DefaultLayout = ({ pageTitle, children }: Props) => {
  const baseTitle = "InflaG";
  return (
    <>
      <Head>
        <title>{pageTitle ? `${pageTitle} - ${baseTitle}` : baseTitle}</title>
        <meta name="description" content="InflaG is Open Source game." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeaderNavigation />
      <MainNavigation />

      <main className="mx-auto mt-12 sm:ml-24 lg:ml-80">{children}</main>
    </>
  );
};

export default DefaultLayout;
