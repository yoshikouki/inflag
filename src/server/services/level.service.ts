import { type BattleCharacter } from "~/types/character.type";

export const calculateCumulativeExpForLevel = (level: number): number => {
  return level * (level - 1) / 2 * 10;
};
export const calculateCumulativeExpForNextLevel = (level: number): number =>
  calculateCumulativeExpForLevel(level + 1);


export const levelUp = (
  character: BattleCharacter,
  gainedExp: number
): BattleCharacter => {
  const newExp = character.exp + gainedExp;
  let newLevel = character.level;

  while (newExp >= calculateCumulativeExpForNextLevel(newLevel)) {
    newLevel++;
  }

  return {
    ...character,
    level: newLevel,
    exp: newExp,
  };
};
