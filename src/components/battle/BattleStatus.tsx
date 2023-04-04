import { type Character } from "~/server/services/battle.service";
import { BattleCharacterStatus } from "./BattleCharacterStatus";

interface Props {
  character: Character;
  enemy: Character;
}

export const BattleStatus = ({ character, enemy }: Props) => {
  const getCharacterStatus = ({ attack, defense, speed }: Character) => [
    attack,
    defense,
    speed,
  ];
  const maxCharacterStatus = Math.max(
    ...getCharacterStatus(character),
    ...getCharacterStatus(enemy)
  );
  const maxHitPoint = Math.max(character.hitPoint, enemy.hitPoint);
  return (
    <>
      <BattleCharacterStatus
        character={character}
        maxHitPoint={maxHitPoint}
        maxCharacterStatus={maxCharacterStatus}
      />

      <div className="mb-12 mt-4 animate-pulse text-center text-4xl font-extrabold opacity-60">
        vs
      </div>

      <BattleCharacterStatus
        character={enemy}
        maxHitPoint={maxHitPoint}
        maxCharacterStatus={maxCharacterStatus}
      />
    </>
  );
};
