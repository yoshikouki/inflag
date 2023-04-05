import { generateBattleCharacter } from "../repositories/character. repository";

import { type BattleCharacter } from "~/types/character.type";
import { constants } from "~/constants";

export const startBattle = () => {
  const player: BattleCharacter = generateBattleCharacter();
  const enemy: BattleCharacter = generateBattleCharacter();
  const { isPlayerWin, battleLogs, endPlayer, endEnemy } = executeBattle({ player, enemy });
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
      return { isPlayerWin: false, battleLogs: actionLogs };
    }

    const { attacker, defender } = determineNextActor({
      player: latestAction.player,
      enemy: latestAction.enemy,
    });
    latestAction = {
      player: latestAction.player,
      enemy: latestAction.enemy,
      log: performCharacterAction({ attacker, defender }),
    };
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

  if (
    actionPointUpperBound <= nextPlayer.actionPoints &&
    actionPointUpperBound <= nextEnemy.actionPoints
  ) {
    if (nextEnemy.actionPoints <= nextPlayer.actionPoints) {
      nextPlayer.actionPoints = 0;
      attacker = nextPlayer;
      defender = nextEnemy;
    } else {
      nextEnemy.actionPoints = 0;
      attacker = nextEnemy;
      defender = nextPlayer;
    }
  } else if (actionPointUpperBound <= nextPlayer.actionPoints) {
    nextPlayer.actionPoints = 0;
    attacker = nextPlayer;
    defender = nextEnemy;
  } else if (actionPointUpperBound <= nextEnemy.actionPoints) {
    nextEnemy.actionPoints = 0;
    attacker = nextEnemy;
    defender = nextPlayer;
  }
  return {
    attacker,
    defender,
  };
};

const calculateActionPoints = (
  character: BattleCharacter,
  actionPointLowerBound: number = constants.battle.actionPointLowerBound,
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
}: {
  attacker: BattleCharacter;
  defender: BattleCharacter;
}) => {
  const damage = Math.max(attacker.attack - defender.defense, 0);
  defender.hitPoint = Math.max(defender.hitPoint - damage, 0);
  return {
    attacker,
    defender,
    damage,
  }
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
