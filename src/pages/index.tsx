import { type NextPage } from "next";
import PublicLayout from "~/components/layout/PublicLayout";

const RootPage: NextPage = () => {
  return (
    <PublicLayout>
      <h2 className="text-5xl font-extrabold">InflaG</h2>
    </PublicLayout>
  );
};

export default RootPage;
