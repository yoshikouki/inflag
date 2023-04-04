import { faker } from "@faker-js/faker";

export const startBattle = () => {
  const player = generateCharacter();
  const enemy = generateCharacter();
  const isPlayerWin = executeBattle({ player, enemy });
  const rewards = calculateRewards(enemy, isPlayerWin);
  return {
    player,
    enemy,
    isPlayerWin,
    rewards,
  };
};

const generateCharacter = () => {
  return {
    id: faker.datatype.uuid(),
    name: faker.internet.userName(),
    level: faker.datatype.number({ min: 1, max: 100 }),
    hitPoint: faker.datatype.number({ min: 10, max: 100 }),
    attack: faker.datatype.number({ min: 1, max: 10 }),
    defense: faker.datatype.number({ min: 1, max: 10 }),
    speed: faker.datatype.number({ min: 1, max: 10 }),
  };
};
export type Character = ReturnType<typeof generateCharacter>;

const executeBattle = ({
  player,
  enemy,
}: {
  player: Character;
  enemy: Character;
}) => {
  const playerSpeed = player.speed;
  const enemySpeed = enemy.speed;
  const isPlayerWin = playerSpeed > enemySpeed;
  return isPlayerWin;
};

const calculateRewards = (enemy: Character, isPlayerWin: boolean) => {
  const rewards = isPlayerWin
    ? {
        exp: enemy.level * 10,
        gold: enemy.hitPoint + enemy.attack + enemy.defense + enemy.speed,
      }
    : {
        exp: enemy.level,
        gold: 0,
      };
  return rewards;
};
