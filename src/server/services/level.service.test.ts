import { calculateCumulativeExpForLevel, calculateCumulativeExpForNextLevel, levelUp } from "./level.service";
import { describe, expect, it } from "vitest";

import { generateBattleCharacter } from "../repositories/character.repository";

describe("#levelUp", () => {
  it("should level up once and have remaining exp", () => {
    const initializeExp = calculateCumulativeExpForNextLevel(1) - 1;
    const character = generateBattleCharacter({
      level: 1,
      exp: initializeExp,
    });

    const result = levelUp(character, 1);
    expect(result.level).toBe(2);
    expect(result.exp).toBe(character.exp + 1);
    expect(character.exp).toBe(initializeExp); // immutable
  });

  it("should level up multiple times and have remaining exp", () => {
    const character = generateBattleCharacter({
      level: 1,
      exp: 0,
    });

    const result = levelUp(character, calculateCumulativeExpForLevel(4));
    expect(result.level).toBe(4);
    expect(result.exp).toBe(calculateCumulativeExpForLevel(4));
  });

  it("should not level up if not enough exp", () => {
    const character = generateBattleCharacter({
      level: 1,
      exp: calculateCumulativeExpForNextLevel(1) - 1,
    });

    const result = levelUp(character, 0);
    expect(result.level).toBe(1);
    expect(result.exp).toBe(character.exp);
  });
});
