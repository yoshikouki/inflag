import { faFire, faGaugeSimple, faHeart, faShield } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const statusIcons = {
  hitPoint: <FontAwesomeIcon icon={faHeart} />,
  attack: <FontAwesomeIcon icon={faFire} />,
  defense: <FontAwesomeIcon icon={faShield} />,
  speed: <FontAwesomeIcon icon={faGaugeSimple} />,
};

interface Props {
  statusName: keyof typeof statusIcons;
  value: number;
  max: number;
}

export const BattleCharacterStatusBar = ({ statusName, value, max }: Props) => {
  const percentage = (value / max) * 100;

  return (
    <>
      <div className="w-full overflow-hidden rounded-lg bg-gray-400">
        <div
          className="flex h-10 items-center rounded-lg  bg-green-500"
          style={{ width: `${percentage}%` }}
        >
          <div className="whitespace-nowrap pl-4 text-white">
            <span className="mr-1">
              {statusIcons[statusName] || statusName}
            </span>
            {value}
          </div>
        </div>
      </div>
    </>
  );
};
