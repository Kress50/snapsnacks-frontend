import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserRole } from "../api/types/globalTypes";
import { useMeQuery } from "../hooks/useMeQuery";
import { Logo } from "./UI/Logo";

const Header = () => {
  const { data } = useMeQuery();
  const [barsHover, setBarsHover] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      {!data?.me.verified && (
        <div className="fixed z-50 flex w-full -translate-y-7 select-none justify-center bg-amber-500 py-1 text-white transition-transform hover:translate-y-0">
          <Link
            to={`/confirm/code=${data?.me.verification?.code}`}
            className="font-bold"
          >
            Please verify your email
          </Link>
        </div>
      )}
      <header className="fixed z-10 mx-auto flex w-full items-center justify-between bg-white px-4 py-2 xl:px-80">
        <Link className="flex items-center outline-none" to="/">
          <Logo size="w-16" />
          <h1 className="ml-4 select-none text-3xl font-bold text-amber-500">
            Snap
            <span className="text-slate-800">Snacks</span>
          </h1>
        </Link>
        <div
          onMouseEnter={() => setBarsHover(true)}
          onMouseLeave={() => setBarsHover(false)}
          className="relative"
        >
          {data?.me.role === UserRole.Delivery && (
            <div className="flex items-center justify-end gap-4">
              <Link
                to="/edit-profile"
                className="p-1 px-2 hover:text-amber-500 active:text-amber-500"
              >
                Profile
              </Link>
              <span
                onClick={logoutHandler}
                className="cursor-pointer p-1 px-2 hover:text-amber-500 active:text-amber-500"
              >
                Logout
              </span>
            </div>
          )}
          {data?.me.role !== UserRole.Delivery && (
            <>
              <FontAwesomeIcon
                icon={faBars}
                className="cursor-pointer p-4 text-xl text-slate-800 hover:text-amber-500  active:text-orange-500"
              />
              {barsHover && (
                <div className="absolute right-2 flex cursor-pointer select-none flex-col gap-2 rounded-md border-2 border-amber-500 bg-white p-5 text-center shadow-lg">
                  <Link
                    to="/edit-profile"
                    className="p-1 px-2 hover:text-amber-500 active:text-amber-500"
                  >
                    Profile
                  </Link>
                  <span
                    onClick={logoutHandler}
                    className="border-t p-1 px-2 pt-2 hover:text-amber-500 active:text-amber-500"
                  >
                    Logout
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
