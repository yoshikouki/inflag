import { type NextPage } from "next";
import { BattleStatus } from "~/components/battle/BattleStatus";
import DefaultLayout from "~/components/layout/DefaultLayout";
import { api } from "~/utils/api";
import { useSWR } from "~/utils/swr";

const Home: NextPage = () => {
  const { data: result } = useSWR("/battle", async () =>
    api.battle.start.mutate()
  );

  return (
    <DefaultLayout>
      {result && (
        <>
          <BattleStatus character={result.character} enemy={result.enemy} />

          <p className="mb-4 mt-8 text-8xl">
            {result.isPlayerWin ? "Win" : "Lose"}
          </p>

          <ul className="text-xl">
            <li className="mb-2">
              <span className="text-yellow-500">EXP</span> {result?.rewards.exp}
            </li>
            <li className="mb-2">
              <span className="text-yellow-500">Gold</span>{" "}
              {result?.rewards.gold}
            </li>
          </ul>
        </>
      )}
    </DefaultLayout>
  );
};

export default Home;
