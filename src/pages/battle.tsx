import { type NextPage } from "next";
import { BattleCharacterDetails } from "~/components/battle/BattleCharacterDetails";
import { BattleStatus } from "~/components/battle/BattleStatus";
import { api } from "~/utils/api";
import { useSWR } from "~/utils/swr";

const Home: NextPage = () => {
  const { data: result } = useSWR("/battle", async () =>
    api.battle.start.mutate()
  );

  return (
    <main className="p-6">
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
    </main>
  );
};

export default Home;
