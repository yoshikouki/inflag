import classNames from "classnames";
import { type NextPage } from "next";
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

          <div className="flex flex-col space-y-12">
            {result?.battleLogs.map((log) => (
              <div
                key={log.actionsNumber}
                className={classNames("flex items-center space-x-2 p-2", {
                  "justify-start": log.isPlayerAttack,
                  "justify-end": !log.isPlayerAttack,
                })}
              >
                <div
                  className={classNames("flex-1", {
                    "text-left": log.isPlayerAttack,
                    "text-right": !log.isPlayerAttack,
                  })}
                >
                  <div className="mb-3 w-full text-center">
                    <span className="badge-ghost badge">
                      {log.actionsNumber}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="font-bold mr-1">
                      {log.attacker.name}
                    </span>
                    の攻撃！
                  </div>
                  <div className="mb-4">
                    <span className="text-4xl font-extrabold mr-1">
                      {log.damage}
                    </span>
                    のダメージ！
                  </div>
                  <div className="overflow-hiddenflex relative mb-2 h-4 w-full rounded-lg bg-base-200">
                    <div
                      className={classNames([
                        "absolute h-4 rounded-lg",
                        {
                          "right-0 bg-accent": log.isPlayerAttack,
                          "justify-start bg-primary": !log.isPlayerAttack,
                        },
                      ])}
                      style={{
                        width: `${
                          (log.defender.currentHitPoint /
                            log.defender.initialHitPoint) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

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
        </>
      )}
    </DefaultLayout>
  );
};

export default BattlePage;
