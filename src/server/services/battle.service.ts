import { generateBattleCharacter } from "../repositories/character. repository";

import { type BattleCharacter } from "~/types/character.type";
import { constants } from "~/constants";

type BattleResult = {
  player: BattleCharacter;
  enemy: BattleCharacter;
  endPlayer: BattleCharacter;
  endEnemy: BattleCharacter;
  isPlayerWin: boolean;
  battleLogs: BattleLog[];
  rewards: Rewards;
};

type BattleLog = {
  attacker: BattleCharacter;
  defender: BattleCharacter;
  damage: number;
};

type Rewards = {
  exp: number;
  gold: number;
};

export const startBattle = (): BattleResult => {
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
    player: player,
    enemy: enemy,
    log: {
      attacker: player,
      defender: enemy,
      damage: 0,
    },
  };

  while (latestAction.player.hitPoint > 0 && latestAction.enemy.hitPoint > 0) {
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
    });
    actionLogs.push(latestAction.log);
  }

  return {
    isPlayerWin: latestAction.player.hitPoint > 0,
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

const calculateActionPoints = (
  character: BattleCharacter,
  actionPointLowerBound: number = constants.battle.actionPointLowerBound
) => {
  const speed = Math.max(character.speed, actionPointLowerBound);
  return {
    ...character,
    actionPoints: character.actionPoints + speed + Math.random() * 10,
  };
};

const performCharacterAction = ({
  attacker,
  defender,
  isPlayerAttack,
}: {
  attacker: BattleCharacter;
  defender: BattleCharacter;
  isPlayerAttack: boolean;
}) => {
  const damage = Math.max(attacker.attack - defender.defense, 0);
  const defenderHitPoint = Math.max(defender.hitPoint - damage, 0);
  const latestDefender = { ...defender, hitPoint: defenderHitPoint };
  return {
    player: isPlayerAttack ? attacker : latestDefender,
    enemy: isPlayerAttack ? latestDefender : attacker,
    log: {
      attacker,
      defender: latestDefender,
      damage,
    },
  };
};

const calculateRewards = (
  enemy: BattleCharacter,
  isPlayerWin: boolean
): Rewards => {
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
