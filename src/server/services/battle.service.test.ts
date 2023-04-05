import { describe, expect, it } from "vitest";

import { calculateActionPoints } from "./battle.service";
import { generateBattleCharacter } from "../repositories/character.repository";

describe("#calculateActionPoints", () => {
  it("should add action points calculated from speed.", () => {
    const character = generateBattleCharacter({
      actionPoints: 0,
      currentSpeed: 10,
    });
    const newCharacter = calculateActionPoints(character);
    expect(newCharacter.actionPoints).not.toBe(0);
    expect(character.actionPoints).toBe(0); // immutable
  });

  it("calculate action points based on random factor.", () => {
    const character = generateBattleCharacter({
      actionPoints: 10,
      currentSpeed: 10,
    });
    const randomFixation = calculateActionPoints(character, 10, 1);
    expect(randomFixation.actionPoints).toBe(20);
    const randomZero = calculateActionPoints(character, 10, 0);
    expect(randomZero.actionPoints).toBe(10);
  });

  it("character speed has lower bound.", () => {
    const character = generateBattleCharacter({
      actionPoints: 0,
      currentSpeed: 1,
    });
    const lowerBound10 = calculateActionPoints(character, 10, 1);
    expect(lowerBound10.actionPoints).toBe(10);
    const lowerBound1 = calculateActionPoints(character, 1, 1);
    expect(lowerBound1.actionPoints).toBe(1);
  });
});
