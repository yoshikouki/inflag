import { type BattleCharacter } from "~/types/character.type";
import { BattleCharacterStatus } from "./BattleCharacterStatus";

interface Props {
  player: BattleCharacter;
  enemy: BattleCharacter;
}

export const BattleStatus = ({ player: player, enemy }: Props) => {
  const getCharacterStatus = ({
    initialAttack,
    initialDefense,
    initialSpeed,
  }: BattleCharacter) => [initialAttack, initialDefense, initialSpeed];
  const maxCharacterStatus = Math.max(
    ...getCharacterStatus(player),
    ...getCharacterStatus(enemy)
  );
  const maxHitPoint = Math.max(player.initialHitPoint, enemy.initialHitPoint);
  return (
    <>
      <BattleCharacterStatus
        character={player}
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
