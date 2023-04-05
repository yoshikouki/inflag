import { type BattleCharacter, type Character } from "~/types/character.type";

import { faker } from "@faker-js/faker";

export const generateCharacter = (): Character => {
  return {
    id: faker.datatype.uuid(),
    name: faker.internet.userName(),
    level: faker.datatype.number({ min: 1, max: 100 }),
    hitPoint: faker.datatype.number({ min: 10, max: 100 }),
    attack: faker.datatype.number({ min: 5, max: 10 }),
    defense: faker.datatype.number({ min: 1, max: 6 }),
    speed: faker.datatype.number({ min: 1, max: 10 }),
  };
};

export const generateBattleCharacter = (): BattleCharacter => {
  const character = generateCharacter();
  return {
    id: character.id,
    name: character.name,
    level: character.level,
    actionPoints: 0,
    initialHitPoint: character.hitPoint,
    currentHitPoint: character.hitPoint,
    initialAttack: character.attack,
    currentAttack: character.attack,
    initialDefense: character.defense,
    currentDefense: character.defense,
    initialSpeed: character.speed,
    currentSpeed: character.speed,
  };
};
