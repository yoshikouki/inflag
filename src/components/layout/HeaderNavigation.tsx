/* eslint-disable @typescript-eslint/no-misused-promises */
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderProfile from "./HeaderProfile";
import Link from "next/link";
import { useAuth } from "~/hooks/auth";
import useTheme from "~/hooks/theme";

const HeaderNavigation = () => {
  const themeCtx = useTheme();
  const { isLoading, user, login, logout } = useAuth();

  return (
    <>
      <div className="sticky top-0 z-50 w-full">
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
              <HeaderProfile user={user} logout={logout} />
            ) : (
              <>
                <button
                  onClick={login}
                  className="btn-ghost btn"
                  type="button"
                >
                  Login
                </button>
              </>
            )}
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
          </div>
        </header>
      </div>
    </>
  );
};

export default HeaderNavigation;
