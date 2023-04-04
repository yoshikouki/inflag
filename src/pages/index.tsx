import { type NextPage } from "next";
import DefaultLayout from "~/components/layout/DefaultLayout";

const RootPage: NextPage = () => {
  return (
    <DefaultLayout>
      <h2 className="text-5xl font-extrabold">InflaG</h2>
    </DefaultLayout>
  );
};

export default RootPage;
