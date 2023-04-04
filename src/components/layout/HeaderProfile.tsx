import { faGear, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { type User } from "next-auth";

interface Props {
  user: User;
  logout: () => void;
}

const HeaderProfile = ({ user, logout }: Props) => {
  return (
    <>
      <div className="dropdown-hover dropdown-end dropdown">
        <label tabIndex={0} className="btn-ghost btn-circle btn">
          <Link href="/settings">
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
          </Link>
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
            <a onClick={logout}>
              <FontAwesomeIcon icon={faSignOut} size="lg" />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default HeaderProfile;
