import { faDungeon, faHome } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";

const navigationItems = [
  {
    title: "Home",
    path: "/home",
    icon: <FontAwesomeIcon icon={faHome} size="lg" />,
  },
  {
    title: "Battle",
    path: "/Battle",
    icon: <FontAwesomeIcon icon={faDungeon} size="lg" />,
  },
];

const MainNavigation = () => {
  const router = useRouter();
  const isCurrentPage = (path: string) => router.pathname.startsWith(path);

  return (
    <>
      <div className="btm-nav z-20 sm:hidden">
        {navigationItems.map((item, i) => (
          <Link
            href={item.path}
            key={i}
            className={classNames({ active: isCurrentPage(item.path) })}
          >
            {item.icon}
          </Link>
        ))}
      </div>

      <div className="fixed z-20 hidden h-full overflow-y-auto sm:block lg:w-80">
        <ul className="menu mt-12 p-0 px-4 text-base-content lg:w-80">
          {navigationItems.map((item, i) => (
            <li key={i}>
              <Link
                href={item.path}
                className={classNames({ active: isCurrentPage(item.path) })}
              >
                {item.icon}
                <span className="hidden lg:inline">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MainNavigation;
