import { type Character } from "~/server/services/battle.service";
import { BattleCharacterDetails } from "./BattleCharacterDetails";
import { BattleCharacterStatusBar } from "./BattleCharacterStatusBar";

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
      {[character, enemy].map((c, index) => (
        <div key={index} className="mb-16">
          <h3 className="mb-2 text-4xl font-bold">{c.name}</h3>

          <div className="mb-2">
            <span className="text-gray-400">Lv:</span> {c.level}
          </div>

          <div className="mb-2">
            <BattleCharacterStatusBar
              statusName="HP"
              value={c.hitPoint}
              max={maxHitPoint}
            />
          </div>
          <div className="mb-2">
            <BattleCharacterStatusBar
              statusName="Attack"
              value={c.attack}
              max={maxCharacterStatus}
            />
          </div>
          <div className="mb-2">
            <BattleCharacterStatusBar
              statusName="Defense"
              value={c.defense}
              max={maxCharacterStatus}
            />
          </div>
          <div className="mb-2">
            <BattleCharacterStatusBar
              statusName="Speed"
              value={c.speed}
              max={maxCharacterStatus}
            />
          </div>
        </div>
      ))}
    </>
  );
};
