import { generateBattleCharacter } from "../repositories/character.repository";

import { type BattleCharacter } from "~/types/character.type";
import { constants } from "~/constants";

export const startBattle = () => {
  const player: BattleCharacter = generateBattleCharacter();
  const enemy: BattleCharacter = generateBattleCharacter();
  const { isPlayerWin, battleLogs, endPlayer, endEnemy } = executeBattle({
    player,
    enemy,
  });
  const rewards = calculateRewards(enemy, isPlayerWin);
  return {
    player,
    enemy,
    endPlayer,
    endEnemy,
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
  let actionsNumber = 0;
  const actionLogs = [];
  let latestAction = {
    player,
    enemy,
    log: {
      attacker: player,
      defender: enemy,
      damage: 0,
      actionsNumber,
      isPlayerAttack: true,
    },
  };

  while (
    latestAction.player.currentHitPoint > 0 &&
    latestAction.enemy.currentHitPoint > 0
  ) {
    actionsNumber++;
    if (actionsNumber > 100) {
      return {
        isPlayerWin: false,
        battleLogs: actionLogs,
        endPlayer: latestAction.player,
        endEnemy: latestAction.enemy,
      };
    }

    const { attacker, defender, isPlayerAttack } = determineNextActor({
      player: latestAction.player,
      enemy: latestAction.enemy,
    });
    latestAction = performCharacterAction({
      attacker,
      defender,
      isPlayerAttack,
      actionsNumber,
    });
    actionLogs.push(latestAction.log);
  }

  return {
    isPlayerWin: latestAction.player.currentHitPoint > 0,
    battleLogs: actionLogs,
    endPlayer: latestAction.player,
    endEnemy: latestAction.enemy,
  };
};

const determineNextActor = ({
  player,
  enemy,
  actionPointUpperBound = constants.battle.actionPointUpperBound,
}: {
  player: BattleCharacter;
  enemy: BattleCharacter;
  actionPointUpperBound?: number;
}) => {
  const nextPlayer = calculateActionPoints(player);
  const nextEnemy = calculateActionPoints(enemy);
  let attacker: BattleCharacter = nextPlayer;
  let defender: BattleCharacter = nextEnemy;
  let isPlayerAttack = true;

  if (
    actionPointUpperBound <= nextPlayer.actionPoints &&
    actionPointUpperBound <= nextEnemy.actionPoints
  ) {
    if (nextEnemy.actionPoints <= nextPlayer.actionPoints) {
      attacker = { ...nextPlayer, actionPoints: 0 };
      defender = nextEnemy;
      isPlayerAttack = true;
    } else {
      attacker = { ...nextEnemy, actionPoints: 0 };
      defender = nextPlayer;
      isPlayerAttack = false;
    }
  } else if (actionPointUpperBound <= nextPlayer.actionPoints) {
    attacker = { ...nextPlayer, actionPoints: 0 };
    defender = nextEnemy;
    isPlayerAttack = true;
  } else if (actionPointUpperBound <= nextEnemy.actionPoints) {
    attacker = { ...nextEnemy, actionPoints: 0 };
    defender = nextPlayer;
    isPlayerAttack = false;
  }

  return {
    attacker,
    defender,
    isPlayerAttack,
  };
};

export const calculateActionPoints = (
  character: BattleCharacter,
  actionPointLowerBound: number = constants.battle.actionPointLowerBound,
  randomFactor: number = Math.random() * 10
) => {
  const speed = Math.max(character.currentSpeed, actionPointLowerBound);
  const actionPoints = character.actionPoints + speed * randomFactor;
  return {
    ...character,
    actionPoints,
  };
};

const performCharacterAction = ({
  attacker,
  defender,
  isPlayerAttack,
  actionsNumber,
}: {
  attacker: BattleCharacter;
  defender: BattleCharacter;
  isPlayerAttack: boolean;
  actionsNumber: number;
}) => {
  const damage = Math.max(attacker.currentAttack - defender.currentDefense, 0);
  const defenderHitPoint = Math.max(defender.currentHitPoint - damage, 0);
  const latestDefender = { ...defender, currentHitPoint: defenderHitPoint };
  return {
    player: isPlayerAttack ? attacker : latestDefender,
    enemy: isPlayerAttack ? latestDefender : attacker,
    log: {
      attacker,
      defender: latestDefender,
      isPlayerAttack,
      damage,
      actionsNumber,
    },
  };
};

const calculateRewards = (enemy: BattleCharacter, isPlayerWin: boolean) => {
  const rewards = isPlayerWin
    ? {
        exp: enemy.level * 10,
        gold:
          enemy.currentHitPoint +
          enemy.currentAttack +
          enemy.currentDefense +
          enemy.currentSpeed,
      }
    : {
        exp: enemy.level,
        gold: 0,
      };
  return rewards;
};
