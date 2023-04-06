import { calculateActionPoints, determineNextActor } from "./battle.service";
import { describe, expect, it } from "vitest";

import { generateBattleCharacter } from "../repositories/character.repository";

describe("#determineNextActor", () => {
  it("should return the player as the attacker when their action points are greater than the enemy", () => {
    const player = generateBattleCharacter({ actionPoints: 1 });
    const enemy = generateBattleCharacter({ actionPoints: 0 });
    const result = determineNextActor({ player, enemy });
    expect(result.isPlayerAttack).toBe(true);
    expect(result.attacker.actionPoints).toBe(0);
    expect(result.attacker.id).toBe(player.id);
    expect(result.attacker).not.toBe(player); // Attacker is different character object
    expect(player.actionPoints).toBe(1); // But character is immutable
    expect(result.defender).toBe(enemy); // Defender is same character object, so immutable.
  });

  it("should return the enemy as the attacker when their action points are greater than the player", () => {
    const player = generateBattleCharacter({ actionPoints: 9 });
    const enemy = generateBattleCharacter({ actionPoints: 10 });

    const result = determineNextActor({ player, enemy });

    expect(result.isPlayerAttack).toBe(false);
    expect(result.attacker.id).toBe(enemy.id);
    expect(result.defender).toBe(player);
  });

  it("should return the player as the attacker when their action points are equal to the enemy", () => {
    const player = generateBattleCharacter({actionPoints: 10});
    const enemy = generateBattleCharacter({actionPoints: 10});

    const result = determineNextActor({ player, enemy });

    expect(result.isPlayerAttack).toBe(true);
    expect(result.attacker.id).toBe(player.id);
    expect(result.defender).toBe(enemy);
  });
});

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
