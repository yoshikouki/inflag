import { faFire, faGaugeSimple, faHeart, faShield } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

const statuses = {
  hitPoint: {
    icon: <FontAwesomeIcon icon={faHeart} />,
    className: "bg-primary",
  },
  attack: {
    icon: <FontAwesomeIcon icon={faFire} />,
    className: "bg-base-content opacity-80",
  },
  defense: {
    icon: <FontAwesomeIcon icon={faShield} />,
    className: "bg-base-content opacity-80",
  },
  speed: {
    icon: <FontAwesomeIcon icon={faGaugeSimple} />,
    className: "bg-base-content opacity-80",
  },
};

interface Props {
  statusName: keyof typeof statuses;
  value: number;
  max: number;
}

export const BattleCharacterStatusBar = ({ statusName, value, max }: Props) => {
  const percentage = (value / max) * 100;

  return (
    <>
      <div className="overflow-hiddenflex relative h-10 w-full rounded-lg bg-base-200">
        <div
          className={classNames([
            "absolute h-10 animate-slide-right rounded-lg",
            statuses[statusName]?.className,
          ])}
          style={{ width: `${percentage}%` }}
        />
        <div className="absolute py-2 pl-4 text-white opacity-90">
          <span className="mr-2">
            {statuses[statusName]?.icon || statusName}
          </span>
          <span className="font-bold">{value}</span>
        </div>
      </div>
    </>
  );
};
