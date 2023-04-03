import { type Character } from "~/server/services/battle.service";

interface Props {
  character: Character;
}

export const CharacterDetails = ({ character }: Props) => {
  return (
    <ul className="text-xl">
      <li className="mb-2">
        <span className="text-4x">{character.name}</span>
      </li>
      <li className="mb-2">
        <span className="text-gray-400">Lv</span>
        {character.level}
      </li>
      <li className="mb-2">
        <span className="text-gray-400">HP</span>
        {character.hitPoints}
      </li>
      <li className="mb-2">
        <span className="text-gray-400">Attack</span>
        {character.attack}
      </li>
      <li className="mb-2">
        <span className="text-gray-400">Defense</span>
        {character.defense}
      </li>
      <li className="mb-2">
        <span className="text-gray-400">Speed</span>
        {character.speed}
      </li>
    </ul>
  );
};
