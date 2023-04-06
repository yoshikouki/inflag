import { calculateActionPoints, calculateRewards, determineNextActor, executeBattle, performCharacterAction } from "./battle.service";
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

describe("#performCharacterAction", () => {
  it("should correctly update defender hit points based on attacker damage", () => {
    const attacker = generateBattleCharacter({ currentAttack: 20 });
    const defender = generateBattleCharacter({
      currentDefense: 5,
      currentHitPoint: 15,
    });

    const initialAttacker = { ...attacker };
    const initialDefender = { ...defender };

    const result = performCharacterAction({
      attacker,
      defender,
      isPlayerAttack: true,
      actionsNumber: 1,
    });

    expect(result.player.currentHitPoint).toEqual(
      initialAttacker.currentHitPoint
    );
    expect(result.enemy.currentHitPoint).toEqual(
      Math.max(
        initialDefender.currentHitPoint -
          (initialAttacker.currentAttack - initialDefender.currentDefense),
        0
      )
    );
    expect(result.log.damage).toEqual(
      Math.max(
        initialAttacker.currentAttack - initialDefender.currentDefense,
        0
      )
    );
    expect(result.log.actionsNumber).toEqual(1);

    expect(attacker).toEqual(initialAttacker);
    expect(defender).toEqual(initialDefender);
  });

  it("should not update defender hit points if attacker damage is less than defender defense", () => {
    const attacker = generateBattleCharacter({ currentAttack: 5 });
    const defender = generateBattleCharacter({
      currentDefense: 10,
      currentHitPoint: 10,
    });

    const initialAttacker = { ...attacker };
    const initialDefender = { ...defender };

    const result = performCharacterAction({
      attacker,
      defender,
      isPlayerAttack: true,
      actionsNumber: 1,
    });

    expect(result.player.currentHitPoint).toEqual(
      initialAttacker.currentHitPoint
    );
    expect(result.enemy.currentHitPoint).toEqual(
      initialDefender.currentHitPoint
    );
    expect(result.log.damage).toEqual(0);
    expect(result.log.actionsNumber).toEqual(1);

    expect(attacker).toEqual(initialAttacker);
    expect(defender).toEqual(initialDefender);
  });
});

describe("#calculateRewards", () => {
  it("should return correct rewards when player wins", () => {
    const enemy = generateBattleCharacter({
      level: 5,
      currentHitPoint: 100,
      currentAttack: 50,
      currentDefense: 30,
      currentSpeed: 20,
    });
    const result = calculateRewards(enemy, true);
    expect(result.exp).toEqual(enemy.level * 10);
    expect(result.gold).toEqual(
      enemy.currentHitPoint +
        enemy.currentAttack +
        enemy.currentDefense +
        enemy.currentSpeed
    );
  });

  it("should return only exp based enemy level when player loses", () => {
    const enemy = generateBattleCharacter({ level: 5 });
    const result = calculateRewards(enemy, false);
    expect(result.exp).toEqual(enemy.level);
    expect(result.gold).toEqual(0);
  });
});

describe('#executeBattle', () => {
  it("should return an object containing logs of each action", () => {
    const player = generateBattleCharacter();
    const enemy = generateBattleCharacter();

    const result = executeBattle({ player, enemy });

    expect(result.battleLogs).toBeDefined();
    expect(result.battleLogs.length).toBeGreaterThan(0);
    expect(result.battleLogs.every((log) => log.actionsNumber > 0)).toBe(true);
  });

  it("should set isPlayerWin to true when player wins the battle", () => {
    const player = generateBattleCharacter();
    const enemy = generateBattleCharacter({
      actionPoints: 0,
      currentHitPoint: 1,
      currentAttack: 1,
      currentDefense: 1,
    });

    const result = executeBattle({ player, enemy });

    expect(result.isPlayerWin).toBe(true);
    expect(result.endEnemy.currentHitPoint).toEqual(0);
  });

  it("should set isPlayerWin to false when player loses the battle", () => {
    const player = generateBattleCharacter({
      actionPoints: 0,
      currentHitPoint: 1,
      currentAttack: 1,
      currentDefense: 1,
    });
    const enemy = generateBattleCharacter();

    const result = executeBattle({ player, enemy });

    expect(result.isPlayerWin).toBe(false);
    expect(result.endPlayer.currentHitPoint).toEqual(0);
  });

  it("should return an object containing the start and end state of each character", () => {
    const player = generateBattleCharacter({
      currentHitPoint: 20,
      currentAttack: 2,
      currentDefense: 1,
    });
    const enemy = generateBattleCharacter({
      currentHitPoint: 20,
      currentAttack: 2,
      currentDefense: 1,
    });

    const result = executeBattle({ player, enemy });

    expect(result.endPlayer).toBeDefined();
    expect(result.endPlayer).not.toEqual(player);
    expect(result.endPlayer.currentHitPoint).toBeDefined();
    expect(result.endEnemy).toBeDefined();
    expect(result.endEnemy).not.toEqual(enemy);
    expect(result.endEnemy.currentHitPoint).toBeDefined();
  });

  it("should stop the battle after 100 actions and return isPlayerWin false", () => {
    const player = generateBattleCharacter({ currentAttack: 1 });
    const enemy = generateBattleCharacter({ currentAttack: 1 });

    const result = executeBattle({ player, enemy });

    expect(result.isPlayerWin).toBe(false);
    expect(result.battleLogs.length).toBe(100);
  });
});
