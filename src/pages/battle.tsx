import classNames from "classnames";
import { type NextPage } from "next";
import { ScrollToBottomButton } from "~/components/ScrollToBottomButton";
import { BattleLogs } from "~/components/battle/BattleLogs";
import { BattleStatus } from "~/components/battle/BattleStatus";
import DefaultLayout from "~/components/layout/DefaultLayout";
import { api } from "~/utils/api";
import { useSWR } from "~/utils/swr";

const BattlePage: NextPage = () => {
  const { data: result } = useSWR("/battle", async () =>
    api.battle.start.mutate()
  );

  return (
    <DefaultLayout>
      {result && (
        <>
          <div className="mb-12">
            <BattleStatus player={result.player} enemy={result.enemy} />
          </div>

          {result.battleLogs && <BattleLogs battleLogs={result.battleLogs} />}

          <div
            className={classNames(
              "mb-12 mt-20 animate-pulse text-center text-8xl font-extrabold",
              { "text-accent": result.isPlayerWin }
            )}
          >
            {result.isPlayerWin ? "Win" : "Lose"}
          </div>

          <ul className="text-xl">
            <li className="mb-2">
              <span
                className={classNames("mr-2", {
                  "text-accent": result.isPlayerWin,
                })}
              >
                EXP
              </span>
              <span className="font-bold">{result?.rewards.exp}</span>
            </li>
            <li className="mb-2">
              <span
                className={classNames("mr-2", {
                  "text-accent": result.isPlayerWin,
                })}
              >
                Gold
              </span>
              <span className="font-bold">{result?.rewards.gold}</span>
            </li>
          </ul>

          <ScrollToBottomButton />
        </>
      )}
    </DefaultLayout>
  );
};

export default BattlePage;
