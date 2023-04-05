import { type BattleCharacter } from "~/types/character.type";
import { BattleCharacterStatusBar } from "./BattleCharacterStatusBar";

interface Props {
  character: BattleCharacter;
  maxHitPoint: number;
  maxCharacterStatus: number;
}

export const BattleCharacterStatus = ({ character, maxHitPoint, maxCharacterStatus }: Props) => {

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-scroll">
        <h3 className="mb-2 text-4xl font-bold">{character.name}</h3>
      </div>

      <div className="mb-2">
        <span className="text-gray-400 mr-1">Lv</span>
        <span className="font-bold"> {character.level}</span>
      </div>

      <div className="mb-2">
        <BattleCharacterStatusBar
          statusName="hitPoint"
          value={character.initialHitPoint}
          max={maxHitPoint}
        />
      </div>
      <div className="mb-2">
        <BattleCharacterStatusBar
          statusName="attack"
          value={character.initialAttack}
          max={maxCharacterStatus}
        />
      </div>
      <div className="mb-2">
        <BattleCharacterStatusBar
          statusName="defense"
          value={character.initialDefense}
          max={maxCharacterStatus}
        />
      </div>
      <div className="mb-2">
        <BattleCharacterStatusBar
          statusName="speed"
          value={character.initialSpeed}
          max={maxCharacterStatus}
        />
      </div>
    </div>
  );
};
