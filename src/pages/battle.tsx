import { type NextPage } from "next";
import { CharacterDetails } from "~/components/battle/CharacterDetails";
import { api } from "~/utils/api";
import { useSWR } from "~/utils/swr";

const Home: NextPage = () => {
  const { data: result } = useSWR("/battle", async (url) =>
    api.battle.start.mutate()
  );

  return (
    <main className="rounded-lg bg-gray-800 p-6 text-white">
      <h2 className="mb-6 text-3xl font-bold">Battle!!1</h2>

      {result && (
        <>
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex-1">
              <CharacterDetails character={result.character} />
            </div>
            <div className="flex-1">
              <CharacterDetails character={result.enemy} />
            </div>
          </div>

          <p className="mb-4 mt-8 text-2xl">
            {result.isPlayerWin ? "You win!" : "You lose!"}
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
