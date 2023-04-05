export type Character = {
  id: string;
  name: string;
  level: number;
  hitPoint: number;
  attack: number;
  defense: number;
  speed: number;
}

export type BattleCharacter = {
  id: string;
  name: string;
  level: number;
  actionPoints: number;
  initialHitPoint: number;
  currentHitPoint: number;
  initialAttack: number;
  currentAttack: number;
  initialDefense: number;
  currentDefense: number;
  initialSpeed: number;
  currentSpeed: number;
};
