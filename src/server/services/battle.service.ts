import { generateBattleCharacter } from "../repositories/character. repository";

import { type BattleCharacter } from "~/types/character.type";
import { constants } from "~/constants";

export const startBattle = () => {
  const player: BattleCharacter = generateBattleCharacter();
  const enemy: BattleCharacter = generateBattleCharacter();
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

const executeBattle = ({
  player,
  enemy,
}: {
  player: BattleCharacter;
  enemy: BattleCharacter;
}) => {
  const { actionPointLowerBound, actionPointUpperBound } = constants.battle;
  let actionsNumber = 0;
  const actionLogs = [];
  let attacker: BattleCharacter = player;
  let defender: BattleCharacter = enemy;

  while (player.hitPoint > 0 && enemy.hitPoint > 0) {
    actionsNumber++;
    if (actionsNumber > 100) {
      return { isPlayerWin: false, battleLogs: actionLogs };
    }

    const playerSpeed = Math.max(player.speed, actionPointLowerBound);
    const enemySpeed = Math.max(enemy.speed, actionPointLowerBound);

    player.actionPoints += playerSpeed + Math.random() * 10;
    enemy.actionPoints += enemySpeed + Math.random() * 10;

    if (
      actionPointUpperBound <= player.actionPoints &&
      actionPointUpperBound <= enemy.actionPoints
    ) {
      if (enemy.actionPoints <= player.actionPoints) {
        player.actionPoints = 0;
        attacker = player;
        defender = enemy;
      } else {
        enemy.actionPoints = 0;
        attacker = enemy;
        defender = player;
      }
    } else if (actionPointUpperBound <= player.actionPoints) {
      player.actionPoints = 0;
      attacker = player;
      defender = enemy;
    } else if (actionPointUpperBound <= enemy.actionPoints) {
      enemy.actionPoints = 0;
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
  attacker: BattleCharacter;
  defender: BattleCharacter;
}) => {
  const damage = Math.max(attacker.attack - defender.defense, 0);
  defender.hitPoint = Math.max(defender.hitPoint - damage, 0);
};

const calculateRewards = (enemy: BattleCharacter, isPlayerWin: boolean) => {
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
