import classNames from "classnames";
import { type BattleCharacter } from "~/types/character.type";
import { RouterOutputs } from "~/utils/api";

interface Props {
  battleLogs: RouterOutputs["battle"]["start"]["battleLogs"];
}

export const BattleLogs = ({ battleLogs }: Props) => {
  return (
    <div className="flex flex-col space-y-12">
      {battleLogs.map((log) => (
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
              <span className="badge-ghost badge">{log.actionsNumber}</span>
            </div>
            <div className="mb-2">
              <span className="mr-1 font-bold">{log.attacker.name}</span>
              の攻撃！
            </div>
            <div className="mb-4">
              <span className="mr-1 text-4xl font-extrabold">{log.damage}</span>
              のダメージ！
            </div>
            <div
              className={classNames(
                "overflow-hiddenflex relative mb-2 h-4 w-full rounded-lg bg-base-200",
                "tooltip tooltip-bottom",
                {
                  "tooltip-accent": log.isPlayerAttack,
                  "tooltip-primary": !log.isPlayerAttack,
                }
              )}
              data-tip={`${log.defender.currentHitPoint} / ${log.defender.initialHitPoint}`}
            >
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
  );
};
