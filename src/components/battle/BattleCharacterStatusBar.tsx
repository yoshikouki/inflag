import { type Character } from "~/server/services/battle.service";

interface Props {
  statusName: string;
  value: number;
  max: number;
}

export const BattleCharacterStatusBar = ({ statusName, value, max }: Props) => {
  const percentage = (value / max) * 100;
  return (
    <>
      <div>
        <span className="text-gray-400">{statusName}: </span>
        {value}
      </div>

      <div className="h-4 w-full rounded-full bg-gray-400">
        <div
          className="h-4 rounded-full bg-green-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </>
  );
};
