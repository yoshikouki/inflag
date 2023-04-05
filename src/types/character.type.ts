export type Character = {
  id: string;
  name: string;
  level: number;
  hitPoint: number;
  attack: number;
  defense: number;
  speed: number;
}

export type BattleCharacter = Character & {
  actionPoints: number;
}
