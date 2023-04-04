import { type NextPage } from "next";
import DefaultLayout from "~/components/layout/DefaultLayout";

const HomePage: NextPage = () => {
  return (
    <DefaultLayout>
      <h2 className="text-5xl font-extrabold">Home</h2>
    </DefaultLayout>
  );
};

export default HomePage;
