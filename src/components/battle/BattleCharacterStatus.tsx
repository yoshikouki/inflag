import { BattleCharacterStatusBar } from "./BattleCharacterStatusBar";
import { type Character } from "~/server/services/battle.service";

interface Props {
  character: Character;
  maxHitPoint: number;
  maxCharacterStatus: number;
}

export const BattleCharacterStatus = ({ character, maxHitPoint, maxCharacterStatus }: Props) => {

  return (
    <div className="overflow-hidden">
      <h3 className="mb-2 text-4xl font-bold">{character.name}</h3>

      <div className="mb-2">
        <span className="text-gray-400">Lv:</span> {character.level}
      </div>

      <div className="mb-2">
        <BattleCharacterStatusBar
          statusName="hitPoint"
          value={character.hitPoint}
          max={maxHitPoint}
        />
      </div>
      <div className="mb-2">
        <BattleCharacterStatusBar
          statusName="attack"
          value={character.attack}
          max={maxCharacterStatus}
        />
      </div>
      <div className="mb-2">
        <BattleCharacterStatusBar
          statusName="defense"
          value={character.defense}
          max={maxCharacterStatus}
        />
      </div>
      <div className="mb-2">
        <BattleCharacterStatusBar
          statusName="speed"
          value={character.speed}
          max={maxCharacterStatus}
        />
      </div>
    </div>
  );
};
