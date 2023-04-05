import { describe, expect, it } from "vitest";

import { calculateActionPoints } from "./battle.service";
import { generateBattleCharacter } from "../repositories/character.repository";

describe("#calculateActionPoints", () => {
  it("test determineNextActor", () => {
    const character = generateBattleCharacter({
      actionPoints: 0,
      initialSpeed: 10,
    });
    const newCharacter = calculateActionPoints(character);
    expect(newCharacter.actionPoints).not.toBe(0);
    expect(character.actionPoints).toBe(0); // immutable
  });
});
