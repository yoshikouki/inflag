/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  faGear,
  faMoon,
  faSignOut,
  faSun,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "~/hooks/auth";
import useTheme from "~/hooks/theme";

const HeaderNavigation = () => {
  const themeCtx = useTheme();
  const { isLoading, user, login, logout } = useAuth();

  return (
    <>
      <div className="sticky top-0 z-50 w-full backdrop-blur-md">
        <header className="navbar h-10 p-4">
          <div className="flex-1">
            <Link href="/">
              <div className="text-2xl font-bold text-primary">InflaG</div>
            </Link>
          </div>
          <div className="flex-none">
            {isLoading ? (
              <div className="btn-disabled btn-circle btn">Loading</div>
            ) : user ? (
              <div className="dropdown-hover dropdown-end dropdown">
                <label tabIndex={0} className="btn-ghost btn-circle btn">
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name || "プロフィール画像"}
                          width={32}
                          height={32}
                        />
                      ) : (
                        <FontAwesomeIcon icon={faUser} size="lg" />
                      )}
                    </div>
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu w-40 rounded bg-base-100 shadow-md"
                >
                  <li className="menu-title">
                    <span>{user.name}</span>
                  </li>
                  <li>
                    <Link href="/settings">
                      <FontAwesomeIcon icon={faGear} size="lg" />
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button onClick={themeCtx.toggleTheme} type="button">
                      {themeCtx.theme === "light" ? (
                        <>
                          <FontAwesomeIcon icon={faSun} size="lg" />
                          Light
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faMoon} size="lg" />
                          Dark
                        </>
                      )}
                    </button>
                  </li>
                  <li>
                    <a onClick={logout}>
                      <FontAwesomeIcon icon={faSignOut} size="lg" />
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <button onClick={login} className="btn-ghost btn" type="button">
                  Login
                </button>
                <button
                  onClick={themeCtx.toggleTheme}
                  className="btn-ghost btn-circle btn"
                  type="button"
                >
                  {themeCtx.theme === "light" ? (
                    <FontAwesomeIcon icon={faSun} size="lg" />
                  ) : (
                    <FontAwesomeIcon icon={faMoon} size="lg" />
                  )}
                </button>
              </>
            )}
          </div>
        </header>
      </div>
    </>
  );
};

export default HeaderNavigation;
