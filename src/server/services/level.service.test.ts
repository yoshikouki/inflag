import { calculateCumulativeExpForLevel, calculateCumulativeExpForNextLevel, levelUp } from "./level.service";
import { describe, expect, it } from "vitest";

import { generateBattleCharacter } from "../repositories/character.repository";

describe("#levelUp", () => {
  it("should level up once and have remaining exp", () => {
    const character = generateBattleCharacter({
      level: 1,
      exp: calculateCumulativeExpForNextLevel(1),
    });

    const { character: newCharacter, hasLeveledUp } = levelUp(character, 1);
    expect(newCharacter.level).toBe(2);
    expect(newCharacter.exp).toBe(character.exp + 1);
    expect(hasLeveledUp).toBe(true);
    expect(character.exp).toBe(calculateCumulativeExpForNextLevel(1)); // immutable
  });

  it("should level up multiple times and have remaining exp", () => {
    const character = generateBattleCharacter({
      level: 1,
      exp: 0,
    });

    const { character: newCharacter, hasLeveledUp } = levelUp(
      character,
      calculateCumulativeExpForLevel(4)
    );
    expect(newCharacter.level).toBe(4);
    expect(newCharacter.exp).toBe(calculateCumulativeExpForLevel(4));
    expect(hasLeveledUp).toBe(true);
  });

  it("should not level up if not enough exp", () => {
    const character = generateBattleCharacter({
      level: 1,
      exp: calculateCumulativeExpForNextLevel(1) - 1,
    });

    const { character: newCharacter, hasLeveledUp } = levelUp(character, 0);
    expect(newCharacter.level).toBe(1);
    expect(newCharacter.exp).toBe(character.exp);
    expect(hasLeveledUp).toBe(false);
  });
});
