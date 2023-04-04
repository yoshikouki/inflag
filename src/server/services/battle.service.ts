import { constants } from "~/constants";
import { faker } from "@faker-js/faker";

export const startBattle = () => {
  const player = generateCharacter();
  const enemy = generateCharacter();
  const { isPlayerWin, battleLogs } = executeBattle({ player, enemy });
  const rewards = calculateRewards(enemy, isPlayerWin);
  return {
    player,
    enemy,
    isPlayerWin,
    battleLogs,
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
  const { actionPointLowerBound, actionPointUpperBound } = constants.battle;
  let playerActionPoints = 0;
  let enemyActionPoints = 0;
  let actionsNumber = 0;
  const actionLogs = [];
  let attacker: Character = player;
  let defender: Character = enemy;

  while (player.hitPoint > 0 && enemy.hitPoint > 0) {
    actionsNumber++;
    if (actionsNumber > 100) {
      return { isPlayerWin: false, battleLogs: actionLogs };
    }

    const playerSpeed = Math.max(player.speed, actionPointLowerBound);
    const enemySpeed = Math.max(enemy.speed, actionPointLowerBound);

    playerActionPoints += playerSpeed + Math.random() * 10;
    enemyActionPoints += enemySpeed + Math.random() * 10;

    if (
      actionPointUpperBound <= playerActionPoints &&
      actionPointUpperBound <= enemyActionPoints
    ) {
      if (enemyActionPoints <= playerActionPoints) {
        playerActionPoints = 0;
        attacker = player;
        defender = enemy;
      } else {
        enemyActionPoints = 0;
        attacker = enemy;
        defender = player;
      }
    } else if (actionPointUpperBound <= playerActionPoints) {
      playerActionPoints = 0;
      attacker = player;
      defender = enemy;
    } else if (actionPointUpperBound <= enemyActionPoints) {
      enemyActionPoints = 0;
      attacker = enemy;
      defender = player;
    }
    const actionLog = performCharacterAction({ attacker, defender });
    actionLogs.push(actionLog);
  }

  return { isPlayerWin: player.hitPoint > 0, battleLogs: actionLogs };
};

const performCharacterAction = ({
  attacker,
  defender,
}: {
  attacker: Character;
  defender: Character;
}) => {
  const damage = Math.max(attacker.attack - defender.defense, 0);
  defender.hitPoint = Math.max(defender.hitPoint - damage, 0);
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
