import { type BattleCharacter, type Character } from "~/types/character.type";

import { faker } from "@faker-js/faker";
import { calculateCumulativeExpForNextLevel } from "../services/level.service";

export const generateCharacter = (attr?: Partial<Character>): Character => {
  const level = attr?.level ?? faker.datatype.number({ min: 1000, max: 1000 });
  return {
    id: attr?.id ?? faker.datatype.uuid(),
    name: attr?.name ?? faker.internet.userName(),
    level,
    exp: calculateCumulativeExpForNextLevel(level) - 1,
    hitPoint: attr?.hitPoint ?? Math.round(level * Math.random() * 10),
    attack: attr?.attack ?? Math.round(level * Math.random() * 2),
    defense: attr?.defense ?? Math.round(level * Math.random() * 1),
    speed: attr?.speed ?? Math.round(level * Math.random() * 1),
  };
};

export const generateBattleCharacter = (
  attr?: Partial<BattleCharacter> & { character?: Character }
): BattleCharacter => {
  const character = attr?.character ?? generateCharacter();
  const level = attr?.level ?? character.level;
  return {
    id: attr?.id ?? character.id,
    name: attr?.name ?? character.name,
    level,
    exp: attr?.exp ?? calculateCumulativeExpForNextLevel(level) - 1,
    actionPoints: attr?.actionPoints ?? 0,
    initialHitPoint: attr?.initialHitPoint ?? character.hitPoint,
    currentHitPoint: attr?.currentHitPoint ?? character.hitPoint,
    initialAttack: attr?.initialAttack ?? character.attack,
    currentAttack: attr?.currentAttack ?? character.attack,
    initialDefense: attr?.initialDefense ?? character.defense,
    currentDefense: attr?.currentDefense ?? character.defense,
    initialSpeed: attr?.initialSpeed ?? character.speed,
    currentSpeed: attr?.currentSpeed ?? character.speed,
  };
};
