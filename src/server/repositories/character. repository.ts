import { type BattleCharacter, type Character } from "~/types/character.type";

import { faker } from "@faker-js/faker";

export const generateCharacter = (): Character => {
  return {
    id: faker.datatype.uuid(),
    name: faker.internet.userName(),
    level: faker.datatype.number({ min: 1000, max: 5000 }),
    hitPoint: faker.datatype.number({ min: 10000, max: 50000 }),
    attack: faker.datatype.number({ min: 3000, max: 8000 }),
    defense: faker.datatype.number({ min: 1000, max: 5000 }),
    speed: faker.datatype.number({ min: 1000, max: 5000 }),
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
